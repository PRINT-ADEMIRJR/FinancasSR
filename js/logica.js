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

    // Exemplo de como adicionar os valores à planilha usando fetch
    fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/A1:append?valueInputOption=RAW`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            values: valores,
        }),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Linha adicionada à planilha:', data);
    })
    .catch(error => {
        console.error('Erro ao adicionar linha à planilha:', error);
    });
}
