/** 
 * receebe uma string no formato de moeda brasileira e retorna o valor numérico correspondente.
 * @param moeda 
 * @returns
*/


export default function moedaParaNumero(moeda: string): number | null {
   const numero = Number(moeda.replaceAll(".", "").replace(",", "."));
   return isNaN(numero) ? null : numero;
}
