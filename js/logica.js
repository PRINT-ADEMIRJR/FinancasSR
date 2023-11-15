const login = ' 8ydfizyl';
const senha = ' j2cokui300dn10o0uioc';
const token = btoa(`${login}:${senha}`);

axios.post('https://sheetdb.io/api/v1/ka6puxydxkw4v', linhaParaAdicionar, {
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
