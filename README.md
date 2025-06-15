# README PROVISÓRIO

Coisas a lembrar:
Function: A function criada no GCP precisa ter a variável de ambiente DESTINATION_BUCKET setada
Frontend: Além de preencher o .env de exemplo que tem no repositório é necessário criar uma service account que tenha direitos de ADM sobre o cloud storage, porque o frontend é o responsável por gerar os links assinados que são utilizados para fazer upload e download dos arquivos.
