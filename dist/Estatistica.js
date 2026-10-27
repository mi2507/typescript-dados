import CountBy from "./countBy.js";
function filtrarValor(transacao) {
    return transacao.valor !== null;
}
export default class Estatisticas {
    transacoes;
    total;
    pagamento;
    status;
    semana;
    melhorDia;
    constructor(transacoes) {
        this.transacoes = transacoes;
        this.total = this.setTotal();
        this.pagamento = this.setPagamento();
        this.status = this.setStatus();
        this.semana = this.setSemana();
        this.melhorDia = this.setMelhorDia();
    }
    setTotal() {
        return this.transacoes.filter(filtrarValor).reduce((acc, item) => {
            return acc + item.valor;
        }, 0);
    }
    setPagamento() {
        return CountBy(this.transacoes.map(({ pagamento }) => pagamento));
    }
    setStatus() {
        return CountBy(this.transacoes.map(({ status }) => status));
    }
    setSemana() {
        const semana = {
            ["Domingo"]: 0,
            ["Segunda"]: 0,
            ["Terca"]: 0,
            ["Quarta"]: 0,
            ["Quinta"]: 0,
            ["Sexta"]: 0,
            ["Sabado"]: 0,
        };
        for (let i = 0; i < this.transacoes.length; i++) {
            const day = this.transacoes[i].data.getDay();
            switch (day) {
                case 0:
                    semana["Domingo"]++;
                    break;
                case 1:
                    semana["Segunda"]++;
                    break;
                case 2:
                    semana["Terca"]++;
                    break;
                case 3:
                    semana["Quarta"]++;
                    break;
                case 4:
                    semana["Quinta"]++;
                    break;
                case 5:
                    semana["Sexta"]++;
                    break;
                case 6:
                    semana["Sabado"]++;
                    break;
                default:
                    break;
            }
        }
        return semana;
    }
    setMelhorDia() {
        return Object.entries(this.semana).sort((a, b) => {
            return b[1] - a[1];
        })[0];
    }
}
//# sourceMappingURL=Estatistica.js.map