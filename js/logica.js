document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("cadastro-form");
    const enviarButton = document.getElementById("enviar-button");

    enviarButton.addEventListener("click", function () {
        const tipoContribuicao = document.getElementById("tipo-contribuicao").value;
        const valor = document.getElementById("valor").value;
        const data = document.getElementById("data").value;
        const nomeContribuinte = document.getElementById("nome-contribuinte").value;

        const confirmacao = confirm("Por favor, confirme as informações:\n\n" +
            `tipo-contribuicao: ${tipoContribuicao}\n` +
            `valor: ${valor}\n` +
            `data: R$ ${data}\n` +
            `nome-contribuinte: ${nomeContribuinte}`);

        if (confirmacao) {
            const linhaParaAdicionar = {
                "TIPO CONTRIBUICAO": tipoContribuicao,
                "DATA": valor,
                "NOME": data,
                "VALOR": nomeContribuinte
            };

            const login = '8ydfizyl';
            const senha = ' j2cokui300dn10o0uioc';
            const token = btoa(`${login}:${senha}`);

            axios.post(' https://sheetdb.io/api/v1/ka6puxydxkw4v ', linhaParaAdicionar, {
                headers: {
                    'Authorization': `Basic ${token}`
                }
            })
            .then(function (response) {
                console.log('Linha adicionada com sucesso:', response.data);
                // Limpe os campos do formulário
                document.getElementById("tipo-contribuicao").value = "";
                document.getElementById("valor").value = "";
                document.getElementById("data").value = "";
                document.getElementById("nome-contribuinte").value = "";
            })
            .catch(function (error) {
                console.error('Erro ao adicionar linha à planilha:', error);
            });
        }
    });
});
