// function calcularMedia( notas ) 
let calcularMedia = (notas) => {
    let soma = 0;
    notas.forEach(nota=>{soma+=nota})
    media = soma / notas.length;
    return media;
}

let media; // escopo global

// function aprovacao( notas ) {}
let aprovacao = (notas) =>{
    let media = calcularMedia( notas ); // escopo da função
    
    let condicao = media >= 8 ? "aprovado" : "reprovado";
    
    return 'Média: ' + media + ' - Resultado: ' + condicao;
}

// console.log(aprovacao(notas)); // aprovacao chama calcularMedia


// Função Recursivas

let contagemRegressiva= (numero) =>{

    console.log(numero);  
    
    let proximoNumero = numero - 1;

    if(proximoNumero > 0)
        contagemRegressiva(proximoNumero);

}

console.log(contagemRegressiva(50));

/* 
 * Formulário envio de dados para cálculo da média 
 */

//nao estava reconhecendo o 'document' por isso acrescentei essa verificacao de tipo
if (typeof document !== 'undefined') {
const formulario1 = document.getElementById('formulario-01');


if(formulario1){
    formulario1.addEventListener('submit', ( evento ) => {

        evento.preventDefault();
        evento.stopPropagation();

        //nao estava reconhecendo o 'this' por isso acrescentei evento.target.elements
        // ele tbm nao reconhecia forms como uma lista, por isso "forcei" uma lista
        let forms = evento.target.elements;
        Array.from(forms).forEach( form => {

            //no original tinha um  if( this.getAttribute('class').match(/erro/) ) que eu acho que nunca funcionou pq match vai retornar null e quebra
            if(form.getAttribute('class')!=null && form.getAttribute('class').includes('erro')){
                return false;
            }
        });
        let dados = new FormData(evento.target);

        let notas = [];

        // tentei com forEach dados.keys.forEach(key => {
        // usando forEach erro: dados.keys.forEach is not a function    
        for(let key of dados.keys()) {
            let numero = dados.get(key).match(/\d*/) ? Number(dados.get(key)) : 0; // é um número

            if(!isNaN(numero)) {
                notas.push(numero);
            }
        }

        console.log(notas);

        let texto = aprovacao(notas)

        document.getElementById('resultado').innerHTML = texto;

    });
}}


let validaCampo = (elemento) =>{

    elemento.addEventListener('focusout', function(event) {

        event.preventDefault();

        //this funcionou neste caso de validacao mas nao nos outros por isso usei target
        if(this.value == ""){
            document.querySelector('.mensagem').innerHTML = "verifique o preenchimento dos campos em vermelho";
            this.classList.add('erro');
            this.parentNode.classList.add('erro');
            return false;
        } else {
            document.querySelector('.mensagem').innerHTML = "";
            this.classList.remove('erro');
            this.parentNode.classList.remove('erro');
        }

    });

}

let validaCampoNumerico= (elemento) =>{

    elemento.addEventListener('focusout', (event) => {

        event.preventDefault();
        let target = event.currentTarget;

        let atributo = event.currentTarget;
        if(atributo.name == 'cep'){
            atributo.maxLength = 9
            let value = atributo.value
            value = value.replace(/\D/g, "")
            value = value.replace(/^(\d{5})(\d)/, "$1-$2")
            atributo.value = value
            return atributo;

        } else {

            if(atributo.value != "" && atributo.value.match(/[0-9]*/) 
                        && atributo.value >= 0 && atributo.value <= 10){
                document.querySelector('.mensagem').innerHTML = "";
                target.classList.remove('erro');
                target.parentNode.classList.remove('erro');
            } else {
                document.querySelector('.mensagem').innerHTML = "verifique o preenchimento dos campos em destaque";
                target.classList.add('erro');
                target.parentNode.classList.add('erro');
                return false;
            }
        }
    });
}


let validaEmail = (elemento) =>{

    elemento.addEventListener('focusout', (event) => {

        event.preventDefault();

        const emailValido = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?/i;
        if(event.target.value.match(emailValido)) {
            document.querySelector('.mensagem').innerHTML = "";
            event.target.classList.remove('erro');
            event.target.parentNode.classList.remove('erro');
        } else {
            document.querySelector('.mensagem').innerHTML = "verifique o preenchimento dos campos em destaque";
            event.target.classList.add('erro');
            event.target.parentNode.classList.add('erro');
            return false;
        }

    });

}


let camposObrigatorios = document.querySelectorAll('input.obrigatorio');
let camposNumericos = document.querySelectorAll('input.numero');
let camposEmail = document.getElementsByName('email'); 
//mudei para getElementsByName pq só possui um email no form

// for( let emFoco of camposObrigatorios) 
camposObrigatorios.forEach(emFoco =>{
    validaCampo(emFoco);
})


// for( let emFoco of camposNumericos) {
camposNumericos.forEach(emFoco => {
    validaCampoNumerico(emFoco);
})

// for( let emFoco of camposEmail) {
camposEmail.forEach(emFoco => {
    validaEmail(emFoco);
})

