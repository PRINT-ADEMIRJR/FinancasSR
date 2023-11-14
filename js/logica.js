document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("cadastro-form");
    const enviarButton = document.getElementById("enviar-button");

    enviarButton.addEventListener("click", function () {
        const tipoContribuicao = document.getElementById("tipo-contribuicao").value;
        const valor = document.getElementById("valor").value;
        const data = document.getElementById("data").value;
        const nomeContribuinte = document.getElementById("nome-contribuinte").value;

        const confirmacao = confirm("Por favor, confirme as informações:\n\n" +
            `Tipo de Contribuição: ${tipoContribuicao}\n` +
            `Valor: R$ ${valor}\n` +
            `Data: ${data}\n` +
            `Nome do Contribuinte: ${nomeContribuinte}`);

        if (confirmacao) {
            const comprovante = `Tipo de Contribuição: ${tipoContribuicao}\n` +
                `Valor: R$ ${valor}\n` +
                `Data: ${data}\n` +
                `Nome do Contribuinte: ${nomeContribuinte}`;

            const comprovanteParaDownload = encodeURIComponent(comprovante);
            const downloadLink = document.createElement('a');
            downloadLink.href = `data:text/plain;charset=utf-8,${comprovanteParaDownload}`;
            downloadLink.download = 'comprovante.txt';
            downloadLink.style.display = 'none';
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);

            const whatsappLink = `https://wa.me/?text=${encodeURIComponent(comprovante)}`;
            window.open(whatsappLink, '_blank');

            // Limpar os campos após o envio
            document.getElementById("tipo-contribuicao").value = "";
            document.getElementById("valor").value = "";
            document.getElementById("data").value = "";
            document.getElementById("nome-contribuinte").value = "";

            // Adicionar a requisição à API do Google Sheets aqui
            adicionarLinha(tipoContribuicao, valor, data, nomeContribuinte);
        }
    });
});

// Função para adicionar uma linha à planilha do Google Sheets
function adicionarLinha(tipoContribuicao, valor, data, nomeContribuinte) {
    const API_KEY = 'AIzaSyD3xo7xTfTidvYtZ81maokmZbWFoLXEEEw'; // Substitua pela sua chave de API do Google Sheets
    const SPREADSHEET_ID = '15bxULWG5MQjFhLttVDgpVtn4azaY4zf2lzcc2ekm7ug'; // Substitua pelo ID da sua planilha do Google Sheets

    // Crie uma matriz de valores a serem adicionados
    const valores = [
        [tipoContribuicao, valor, data, nomeContribuinte],
    ];

    // Configure a chave de API para autenticação
    const auth = new google.auth.GoogleAuth({
        key: API_KEY,
        scopes: 'https://www.googleapis.com/auth/spreadsheets',
    });

    // Crie uma instância do cliente Google Sheets
    const sheets = google.sheets('v4');

    // Adicione a lógica para adicionar a linha à planilha aqui
    // ...

    // Exemplo de como adicionar os valores à planilha
    sheets.spreadsheets.values.append({
        spreadsheetId: SPREADSHEET_ID,
        range: 'A1', // Especifique a faixa onde deseja adicionar os valores
        valueInputOption: 'RAW',
        insertDataOption: 'INSERT_ROWS',
        resource: {
            values: valores,
        },
        auth: auth,
    }, (err, res) => {
        if (err) {
            console.error('Erro ao adicionar linha à planilha:', err);
        } else {
            console.log('Linha adicionada à planilha:', res.data);
        }
    });
}
