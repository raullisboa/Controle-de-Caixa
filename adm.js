// Função para formatar a data para o padrão brasileiro (DD/MM/AAAA)
function formatarDataBrasileira(dataISO) {
  const partesData = dataISO.split("-");
  if (partesData.length === 3) {
    return `${partesData[2]}/${partesData[1]}/${partesData[0]}`; // Retorna no formato DD/MM/AAAA
  }
  return dataISO; // Caso não seja no formato esperado, retorna a string original
}

// Função para transformar a data do formato brasileiro para o formato ISO (AAAA-MM-DD) para comparação
function formatarDataISO(dataBR) {
  const partesData = dataBR.split("/");
  if (partesData.length === 3) {
    return `${partesData[2]}-${partesData[1]}-${partesData[0]}`; // Retorna no formato AAAA-MM-DD
  }
  return dataBR; // Caso não seja no formato esperado, retorna a string original
}

// Função para ler arquivos CSV e ordenar os dados pela data (mais recente primeiro)
function lerArquivosCSV() {
  const fileInput = document.getElementById("fileInput");
  const files = fileInput.files;
  const tabelaCorpo = document
    .getElementById("tabelaResultados")
    .getElementsByTagName("tbody")[0];

  // Array para armazenar todas as linhas dos arquivos CSV
  let todasAsLinhas = [];

  //teste
  let totalDinheiro = 0;
  let totalMoedas = 0;
  let totalTroco = 0;
  let totalCartao = 0;
  let totalVale = 0;
  let totalPix = 0;
  let totalResgate = 0;
  let totalSuprimento = 0;
  let totalGeral = 0;

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const reader = new FileReader();

    reader.onload = function (event) {
      const conteudo = event.target.result;
      const linhas = conteudo.split("\n");

      // Ignorar o cabeçalho (primeira linha)
      for (let j = 1; j < linhas.length; j++) {
        const dados = linhas[j].split(";");
        if (dados.length === 12) {
          // Certifica que todos os dados da linha estão presentes
          todasAsLinhas.push(dados);

          // Pega todos os valores e adiciona em suas respectivas variaveis
          const dinheiroTotal = parseFloat(dados[2].replace(",", "."));
          const moedasTotal = parseFloat(dados[3].replace(",", "."));
          const trocoTotal = parseFloat(dados[4].replace(",", "."));
          const cartaoTotal = parseFloat(dados[5].replace(",", "."));
          const valeTotal = parseFloat(dados[6].replace(",", "."));
          const pixTotal = parseFloat(dados[7].replace(",", "."));
          const resgateTotal = parseFloat(dados[8].replace(",", "."));
          const suprimentoTotal = parseFloat(dados[9].replace(",", "."));
          const valorTotal = parseFloat(dados[11].replace(",", "."));

          if (!isNaN(dinheiroTotal)) {
            totalDinheiro += dinheiroTotal;
          }
          if (!isNaN(moedasTotal)) {
            totalMoedas += moedasTotal;
          }
          if (!isNaN(trocoTotal)) {
            totalTroco += trocoTotal;
          }
          if (!isNaN(cartaoTotal)) {
            totalCartao += cartaoTotal;
          }
          if (!isNaN(valeTotal)) {
            totalVale += valeTotal;
          }
          if (!isNaN(pixTotal)) {
            totalPix += pixTotal;
          }
          if (!isNaN(resgateTotal)) {
            totalResgate += resgateTotal;
          }
          if (!isNaN(suprimentoTotal)) {
            totalSuprimento += suprimentoTotal;
          }
          if (!isNaN(valorTotal)) {
            totalGeral += valorTotal;
          }
        }
      }

      // Após o loop, ordena todas as linhas pela data (índice 1)
      todasAsLinhas.sort((a, b) => {
        const dataA = new Date(formatarDataISO(a[1])); // Converte a data para o formato ISO (AAAA-MM-DD)
        const dataB = new Date(formatarDataISO(b[1]));
        return dataB - dataA; // Ordena da mais recente (dataB) para a mais antiga (dataA)
      });

      console.log("Total Dinheiro:", totalDinheiro.toFixed(2));
      console.log("Total Moedas:", totalMoedas.toFixed(2));
      console.log("Total Troco:", totalTroco.toFixed(2));
      console.log("Total Cartão:", totalCartao.toFixed(2));
      console.log("Total Vale:", totalVale.toFixed(2));
      console.log("Total Pix:", totalPix.toFixed(2));
      console.log("Total Resgate:", totalResgate.toFixed(2));
      console.log("Total Suprimento:", totalSuprimento.toFixed(2));
      console.log("Total Geral:", totalGeral.toFixed(2));

      // Limpar a tabela antes de adicionar novos dados
      tabelaCorpo.innerHTML = "";

      // Adicionar as linhas ordenadas à tabela
      todasAsLinhas.forEach((dados) => {
        const novaLinha = tabelaCorpo.insertRow();

        for (let k = 0; k < dados.length; k++) {
          const novaCelula = novaLinha.insertCell();

          // Verificar se o campo atual é a data (índice 1) e aplicar formatação
          if (k === 1) {
            novaCelula.textContent = formatarDataBrasileira(dados[k]);
          } else {
            novaCelula.textContent = dados[k];
          }
        }
      });
    };

    reader.readAsText(file);
  }
}

// Adicionar evento ao campo de entrada de arquivos
document.getElementById("fileInput").addEventListener("change", lerArquivosCSV);
