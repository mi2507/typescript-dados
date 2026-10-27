import Estatisticas from "./Estatistica.js";
import fetchData from "./fetchData.js";
import normalizarTransacao from "./normalizarTrasacao.js";
import { CountList } from "./countBy.js";


async function handleDta() {
  const data = await fetchData<TransacaoAPI[]>(
    "https://api.origamid.dev/json/transacoes.json?"
  );
  if (!data) return;
  const transacoes = data.map(normalizarTransacao);
  preencherTabela(transacoes);
  preencherEstatisticas(transacoes);
}

function preencherLista(lista: CountList, conteinerId: string) {
  const containerElement = document.getElementById(conteinerId);
  if (containerElement) {
    Object.keys(lista).forEach((key) => {
      containerElement.innerHTML += `<p>${key}: ${lista[key]}</p>`;
    });
  }
}

function preencherEstatisticas(transacoes: Transacao[]): void {
  const data = new Estatisticas(transacoes);

  preencherLista(data.pagamento, "pagamento");
  preencherLista(data.status, "status");

  const totalElement = document.querySelector<HTMLSpanElement>("#total span");
  if (totalElement) {
    totalElement.innerText = data.total.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  }

  const diaElement = document.querySelector<HTMLSpanElement>("#dia span");
  if (diaElement) {
    diaElement.innerText = data.melhorDia[0];
  }
}

handleDta();

function preencherTabela(transacoes: Transacao[]): void {
  const tabela = document.querySelector<HTMLTableElement>("#transacoes tbody");
  if (!tabela) return;
  transacoes.forEach((transacao) => {
    tabela.innerHTML += `
      <tr>
        <td>${transacao.nome}</td>
        <td>${transacao.email}</td>
        <td>${transacao.valor?.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</td>
        <td>${transacao.pagamento}</td>
        <td>${transacao.status}</td>
      </tr>
     `;
  });
}
