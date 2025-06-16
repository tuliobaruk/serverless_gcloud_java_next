package gcfv2;

import com.google.cloud.functions.CloudEventsFunction;
import com.google.cloud.storage.*;
import com.google.gson.Gson;
import io.cloudevents.CloudEvent;

import javax.imageio.ImageIO;
import java.awt.Graphics2D;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;
import java.util.List;
import java.util.logging.Logger;

public class MyCloudEventFunction implements CloudEventsFunction {

    private static final Logger logger = Logger.getLogger(MyCloudEventFunction.class.getName());
    private static final Gson gson = new Gson();
    private static final List<String> SUPPORTED_EXTENSIONS = Arrays.asList(".jpg", ".jpeg", ".png", ".gif");

    // Deixei estas dimensões como constantes, mas você pode ajustá-las conforme necessário.
    // Utilizando Cloud Functions com 512MB de memória, consegui redimensionar imagens de até 4000x4000 pixels.
    // Se precisar de imagens maiores, considere aumentar a memória da função.

    // O Maior teste que fiz foi com um limite de 20000x20000 pixels em uma instância com 8GB de memória
    // A função conseguiu redimensionar perfeitamente, mas o tamanho do arquivo final era tão grande que
    // quando o navegador exibia a imagem (de mais de 100MB) ele praticamente travava.

    private static final int MAX_WIDTH = 4000;
    private static final int MAX_HEIGHT = 4000;

    private static class StorageObject {
        String bucket;
        String name;
        String contentType;
    }

    @Override
    public void accept(CloudEvent event) throws IOException {
        final String destinationBucketName = System.getenv("DESTINATION_BUCKET");

        if (destinationBucketName == null || destinationBucketName.isEmpty()) {
            logger.severe("A variável de ambiente 'DESTINATION_BUCKET' não está configurada. Encerrando execução.");
            throw new IllegalStateException("Variável de ambiente 'DESTINATION_BUCKET' não definida.");
        }

        if (event.getData() == null) {
            logger.warning("Evento recebido sem dados. Encerrando execução.");
            return;
        }

        String cloudEventData = new String(event.getData().toBytes(), StandardCharsets.UTF_8);
        StorageObject storageObject = gson.fromJson(cloudEventData, StorageObject.class);

        if (storageObject == null || storageObject.bucket == null || storageObject.name == null) {
            logger.severe("Não foi possível extrair os campos 'bucket' ou 'name' do payload. Payload: " + cloudEventData);
            return;
        }

        String sourceBucket = storageObject.bucket;
        String fileName = storageObject.name;

        logger.info("Evento recebido para o arquivo: " + fileName + " no bucket: " + sourceBucket);

        if (sourceBucket.equals(destinationBucketName)) {
            logger.info("Arquivo no bucket de destino. Ignorando para evitar loop.");
            return;
        }

        String fileExtension = getFileExtension(fileName);
        if (!SUPPORTED_EXTENSIONS.contains(fileExtension)) {
            logger.info("Arquivo '" + fileName + "' não é uma imagem suportada. Ignorando.");
            return;
        }

        int width;
        int height;
        try {
            String dimensionsPart = fileName.split("_")[0];
            String[] dimensions = dimensionsPart.split("x");
            width = Integer.parseInt(dimensions[0]);
            height = Integer.parseInt(dimensions[1]);

            if (width > MAX_WIDTH || height > MAX_HEIGHT) {
                logger.warning("Dimensões muito grandes: " + width + "x" + height + ". Ignorando.");
                return;
            }

            logger.info("Dimensões extraídas do nome do arquivo: " + width + "x" + height);
        } catch (ArrayIndexOutOfBoundsException | NumberFormatException e) {
            logger.severe("Nome do arquivo '" + fileName + "' não segue o padrão 'larguraxaltura_...'. Ignorando arquivo.");
            return;
        }

        Storage storage = StorageOptions.getDefaultInstance().getService();

        try {
            logger.info("Baixando imagem: " + fileName + " do bucket: " + sourceBucket);
            BlobId blobId = BlobId.of(sourceBucket, fileName);
            byte[] originalImageBytes = storage.readAllBytes(blobId);
            logger.info("Download da imagem concluído. Tamanho: " + originalImageBytes.length + " bytes.");

            BufferedImage originalImage = ImageIO.read(new ByteArrayInputStream(originalImageBytes));
            if (originalImage == null) {
                logger.severe("Não foi possível decodificar o arquivo como imagem: " + fileName);
                return;
            }

            int imageType = (originalImage.getType() == 0) ? BufferedImage.TYPE_INT_ARGB : originalImage.getType();

            BufferedImage resizedImage = new BufferedImage(width, height, imageType);

            Graphics2D g = resizedImage.createGraphics();
            g.drawImage(originalImage, 0, 0, width, height, null);
            g.dispose();

            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();

            String imageFormat = fileExtension.substring(1);
            ImageIO.write(resizedImage, imageFormat, outputStream);
            byte[] resizedImageBytes = outputStream.toByteArray();
            logger.info("Redimensionamento concluído. Novo tamanho: " + resizedImageBytes.length + " bytes.");

            logger.info("Enviando imagem redimensionada para o bucket: " + destinationBucketName);
            BlobId newBlobId = BlobId.of(destinationBucketName, fileName);
            BlobInfo newBlobInfo = BlobInfo.newBuilder(newBlobId).setContentType(storageObject.contentType).build();

            storage.create(newBlobInfo, resizedImageBytes);

            logger.info("Sucesso! Imagem '" + fileName + "' redimensionada e salva em '" + destinationBucketName + "'.");

        } catch (StorageException | IOException e) {
            logger.severe("Falha no processamento da imagem: " + e.getMessage());
            throw new IOException("Falha ao processar e salvar a imagem.", e);
        }
    }

    private String getFileExtension(String fileName) {
        if (fileName != null && fileName.contains(".")) {
            return fileName.substring(fileName.lastIndexOf(".")).toLowerCase();
        }
        return "";
    }
}