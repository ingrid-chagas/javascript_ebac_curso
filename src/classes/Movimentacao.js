export default class Movimentacao {
    // constructor(banco = 'padrao', nome = '', saldo = 0){
    constructor(banco = undefined, nome = undefined, saldo = 0){
        this.banco = banco,
        this.nome = nome,
        this.saldo = saldo
    }
}