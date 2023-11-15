const { google } = require('googleapis');
const fs = require('fs');

// Carregue o arquivo JSON de credenciais
const CREDENCIAIS_PATH = 'client_secret_929529148669-4ocjeeso322seofkkcsrutrkeibacbs1.apps.googleusercontent.com.json';
const CREDENCIAIS = JSON.parse(fs.readFileSync(CREDENCIAIS_PATH));

// Configure as informações de autenticação
const CLIENT_ID = CREDENCIAIS.client_id;
const CLIENT_SECRET = CREDENCIAIS.client_secret;
const REDIRECT_URI = CREDENCIAIS.redirect_uris[0];

// Crie uma instância do cliente OAuth 2.0
const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

// Defina as permissões necessárias para a API do Google Sheets
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

// Autentique o cliente usando as credenciais
oAuth2Client.setCredentials(CREDENCIAIS);

// Agora você pode usar o cliente OAuth 2.0 autenticado para fazer chamadas à API do Google Sheets.
adicionarLinha(oAuth2Client);

// Função para adicionar uma linha à planilha do Google Sheets
function adicionarLinha(auth) {
  const sheets = google.sheets({ version: 'v4', auth });

  const SPREADSHEET_ID = '15bxULWG5MQjFhLttVDgpVtn4azaY4zf2lzcc2ekm7ug'; // Substitua pelo ID da sua planilha
  const RANGE = 'A1'; // Substitua pela faixa onde deseja adicionar os valores

  const tipoContribuicao = 'Dízimo'; // Substitua pelo valor desejado
  const valor = 100.00; // Substitua pelo valor desejado
  const data = '2023-11-15'; // Substitua pela data desejada
  const nomeContribuinte = 'John Doe'; // Substitua pelo nome desejado

  const valores = [
    [tipoContribuicao, valor, data, nomeContribuinte],
  ];

  sheets.spreadsheets.values.append({
    spreadsheetId: SPREADSHEET_ID,
    range: RANGE,
    valueInputOption: 'RAW',
    insertDataOption: 'INSERT_ROWS',
    resource: {
      values: valores,
    },
  }, (err, res) => {
    if (err) {
      console.error('Erro ao adicionar linha à planilha:', err);
    } else {
      console.log('Linha adicionada à planilha:', res.data);
    }
  });
}
