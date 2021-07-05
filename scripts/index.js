
//----------------------------------------| Funciones |---------------------------------------->>


// Evitamos que se ingresen datos invalidos en los inputs
const dataValid = e => {
   let key = e.keyCode,
       teclado = false

    // Los ASCII del 48 al 57 son los numeros [0-9] y el 44 es la comma (,)
   if(key >= 48 && key <= 57 || key == 44) teclado = true
   if(!teclado) return false
}

// Busca comas(,) en todos los inputs y las cambia por puntos(.)
// const commaToPoint = () => {
//     let inputs = document.querySelectorAll('input[type=text]');  inputs = Array.from(inputs)
//         let inputsWithComma = inputs.filter(el => el.value.length > 0  && el.value.indexOf(',') )
//         for(let input of inputsWithComma)  input.value = input.value.replace(',' , '.') 
// }
    
// Busca puntos(.) en todos los inputs dentro del formulario comisiones y los cambia por comas(,)
// const pointToComma = () => {
//     let formFee = document.getElementById('formFee')
//     let inputs = formFee.querySelectorAll('input[type=text]');  inputs = Array.from(inputs)
//         let inputsWithPoint = inputs.filter(el => el.value.length > 0  && el.value.indexOf('.') )
//         for(let input of inputsWithPoint)  input.value = input.value.replace('.' , ',') 
// }





const commaToPoint = () => {
    let formFee = document.getElementById('formFee'),
        formReceive = document.getElementById('formReceive'),
        formSend = document.getElementById('formSend')
    
    let inputsFee = formFee.querySelectorAll('input[type=text]');  inputsFee = Array.from(inputsFee)
        let inputsWithPoint = inputsFee.filter(el => el.value.length > 0 && el.value.indexOf(',') )
        for(let input of inputsWithPoint)  input.value = input.value.replace(',' , '.') 

    let inputReceive = formReceive.querySelector('input[type=text]')
        if(inputReceive.value.indexOf(',') ) inputReceive.value = inputReceive.value.replace(',' , '.')
    
    let inputSend = formSend.querySelector('input[type=text]')
        if(inputSend.value.indexOf(',') ) inputSend.value = inputSend.value.replace(',' , '.') 
}



const pointToComma = () => {
   
    let formFee = document.getElementById('formFee'),
        formReceive = document.getElementById('formReceive'),
        formSend = document.getElementById('formSend')
    
    let inputsFee = formFee.querySelectorAll('input[type=text]');  inputsFee = Array.from(inputsFee)
        let inputsWithPoint = inputsFee.filter(el => el.value.length > 0 && el.value.indexOf('.') )
        for(let input of inputsWithPoint)  input.value = input.value.replace('.' , ',') 

    let inputReceive = formReceive.querySelector('input[type=text]')
        if(inputReceive.value.indexOf('.') ) inputReceive.value = inputReceive.value.replace('.' , ',')
    
    let inputSend = formSend.querySelector('input[type=text]')
        if(inputSend.value.indexOf('.') ) inputSend.value = inputSend.value.replace('.' , ',')

}




// Mostramos un mensaje cuando los inputs esten vacios luego de haber escrito en ellos
const alertMessage = (className, idName, messageContent) => {

    const inputName = document.querySelector(idName),
          boxReference = document.querySelector(className),
          duplicateDelete = document.getElementById('delete')
    
    const message = document.createElement('p')
          message.className = 'alert-message'
          message.innerHTML = messageContent 
        
    if(inputName.value.length === 0 ) {
        boxReference.insertAdjacentElement('afterend' , message)
        message.id = 'delete'
    } 
    
    if(duplicateDelete) duplicateDelete.remove() 
}



//----------------------------------------| Para Recibir |---------------------------------------->>


const formReceive = document.getElementById('formReceive')
      formReceive.addEventListener('keyup' , () => {
        commaToPoint()
        alertMessage('.header-receive', '.box-input-receive #receiveQuantity', `Indica cuánto vas a recibir`)

    let cents = document.getElementById('cents').value ; cents = parseFloat(cents,10)
        percentage = document.getElementById('percentage').value ; percentage = parseFloat(percentage,10) ; percentage /= 100
        receiveQuantity = formReceive.querySelector('#receiveQuantity').value ; receiveQuantity = parseFloat(receiveQuantity,10)

    // Operaciones de la calculadora
    const quantityWithoutFee = receiveQuantity + cents,
         sendQuantity = quantityWithoutFee / (quantityWithoutFee / quantityWithoutFee - percentage),
         feeQuantity = sendQuantity - receiveQuantity
  
    // Se resetea el formulario cuando el usuario escribe un dato erroneo o borra todos los datos del input
    if(isNaN(receiveQuantity)) formReceive.reset()

    let fee = feeQuantity.toFixed(2), send = sendQuantity.toFixed(2)

    // Expresion regular para evaluar si la parte decimal tiene uno o dos CEROS
    let haveOneZero = /\.?[1-9][0]$/, haveTwoZero = /\.?[0][0]$/
     
    if(haveOneZero.test(fee)) fee = feeQuantity.toFixed(1)
    else if(haveTwoZero.test(fee)) fee = feeQuantity.toFixed(0)
 
    if(haveOneZero.test(send)) send = sendQuantity.toFixed(1)
    else if(haveTwoZero.test(send)) send = sendQuantity.toFixed(0)
       
    // Si el dato ingresado por el usuario, es un dato válido devolvemos el valor de la operacion solicitada
    if(!isNaN(receiveQuantity)) { 
      formReceive.querySelector('#fee').value = addPoint(fee) 
      formReceive.querySelector('#sendQuantity').value = addPoint(send) 
      pointToComma()
   }
})


//----------------------------------------| Para Enviar |---------------------------------------->>


const formSend = document.getElementById('formSend')
      formSend.addEventListener('keyup' , () => {     
        commaToPoint()
        alertMessage('.header-send', '.box-input-send #sendQuantity', `Indica cuánto vas a enviar`)

   let cents = document.getElementById('cents').value ; cents = parseFloat(cents,10),
       percentage = document.getElementById('percentage').value  ; percentage = parseFloat(percentage,10),
       sendQuantity = formSend.querySelector('#sendQuantity').value ; sendQuantity = parseFloat(sendQuantity,10)
       
   // Operaciones de la calculadora
   const feeQuantity = (sendQuantity * percentage) / 100 + cents,
         receiveQuantity = sendQuantity - feeQuantity
         
 
   // Se resetea el formulario cuando el usuario escribe un dato erroneo o borra todos los datos del input
   if(isNaN(sendQuantity)) formSend.reset()

   let fee = feeQuantity.toFixed(2), receive = receiveQuantity.toFixed(2)

   // Expresion regular para evaluar si la parte decimal tiene uno o dos CEROS
   let haveOneZero = /\.?[1-9][0]$/, haveTwoZero = /\.?[0][0]$/
    
   if(haveOneZero.test(fee)) fee = feeQuantity.toFixed(1)
   else if(haveTwoZero.test(fee)) fee = feeQuantity.toFixed(0)

   if(haveOneZero.test(receive)) receive = receiveQuantity.toFixed(1)
   else if(haveTwoZero.test(receive)) receive = receiveQuantity.toFixed(0)
 
  
   
   // Si el dato ingresado por el usuario, es un dato válido devolvemos el valor de la operacion solicitada
   if(!isNaN(sendQuantity)) {
      formSend.querySelector('#fee').value = addPoint(fee)
      formSend.querySelector('#receiveQuantity').value = addPoint(receive)
      pointToComma()
   }
})



const addPoint = (inputValue) => {

    let position = inputValue.indexOf('.')
    let numEntero = inputValue.substring(0, position)    
    let numDecimal = inputValue.substring(position)
    numDecimal = numDecimal.replace('.' , ',')    
        
    let entrada = numEntero.split('.').join('')
        entrada = entrada.split('').reverse()


    let salida = []
    let aux = ''
 
    let paginador = Math.ceil(entrada.length / 3)

    for(let i=0; i < paginador; i++){
        for(let j=0; j < 3; j++){
            if(entrada[j + (i*3)] !== undefined) {
                aux += entrada[j + (i*3)]
            }
        }
        salida.push(aux) 
        aux = ''
       
    }    
    let resultado = salida.join('.').split('').reverse().join('') + numDecimal
    return resultado  

}

