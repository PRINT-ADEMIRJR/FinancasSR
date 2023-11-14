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
        }
    });
});