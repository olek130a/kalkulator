
const debuger = () => {
    console.log(calculator)
}
const display = document.getElementById('calc')

// 'state' object
const calculator = {
    displayValue: '',
    firstOperand: null,
    waitingForSecondOperand: false,
    operator: null
}

const buttons = ['1','2','3','4','5','6','7','8','9','0']
const operators = ['+','-','/','*']

buttons.forEach((button)=>{
    return document.getElementById(button).addEventListener('click',(e)=>{
        e.preventDefault()

        calculator.displayValue = calculator.displayValue.concat(button)
        display.value = calculator.displayValue
    })
})

document.getElementById('(-)').addEventListener('click',(e)=>{
    e.preventDefault()
    calculator.displayValue = (parseFloat(calculator.displayValue))*(-1).toString()
    display.value = calculator.displayValue
})

//keyboard functionality
buttons.forEach((button)=>{
    return document.addEventListener('keypress',(e)=>{
        if (e.key === button){
            e.preventDefault()
            calculator.displayValue = calculator.displayValue.concat(button)
            display.value = calculator.displayValue
        }
       
    })
})

document.addEventListener('keydown',(e)=>{
    if(e.keyCode === 8) {
        calculator.displayValue = calculator.displayValue.substring(0,calculator.displayValue.length-1)
        display.value = calculator.displayValue
    }
})

operators.forEach((sign)=> {
    return document.addEventListener('keypress',(e)=>{
        if (e.key === sign) {
            if (calculator.firstOperand === null) {
                calculator.firstOperand = parseFloat(calculator.displayValue)
                calculator.operator=sign
                calculator.waitingForSecondOperand = true
                calculator.displayValue = ''
                debuger()
                } else {
                    getResult(calculator)
                    if (calculator.firstOperand===Infinity){
                        calculator.displayValue = ''
                        calculator.operator = null
                        calculator.waitingForSecondOperand = false
                        calculator.firstOperand = null
                        display.value = 'nie dziel przez 0'
                    }else
                    calculator.operator=sign
                }
        }
    })
})


// enter as a '='
document.addEventListener('keydown',(e)=>{
     if (e.keyCode===13) {
        getResult(calculator)
        if (calculator.firstOperand===Infinity){
            calculator.displayValue = ''
            calculator.operator = null
            calculator.waitingForSecondOperand = false
            calculator.firstOperand = null
            display.value = 'nie dziel przez 0'
        }
     }
})

document.addEventListener('keydown',(e)=>{
   
    if (e.keyCode===67) {
        calculator.displayValue = ''
        calculator.operator = null
        calculator.waitingForSecondOperand = false
        calculator.firstOperand = null
        display.value = calculator.displayValue
   }
})


//decimal point

document.getElementById('.').addEventListener('click',(e)=>{
    e.preventDefault()
    if (!calculator.displayValue.includes('.')) {
        calculator.displayValue = calculator.displayValue.concat('.')
        display.value = calculator.displayValue
    }
})

document.addEventListener('keydown',(e)=>{
    
    if(e.keyCode === 190) {
        if (!calculator.displayValue.includes('.')) {
            calculator.displayValue = calculator.displayValue.concat('.')
            display.value = calculator.displayValue
        }
    }
})

//clear
document.getElementById('CE').addEventListener('click',(e)=>{
    e.preventDefault()
    calculator.displayValue = ''
    calculator.operator = null
    calculator.waitingForSecondOperand = false
    calculator.firstOperand = null
    display.value = calculator.displayValue
})

const getResult = ({displayValue,firstOperand,waitingForSecondOperand,operator}) => {
    switch(operator){
        case '+': 
            console.log('dodawanie')
            firstOperand = parseFloat(displayValue) + firstOperand
            displayValue = ''
            operator=''
            display.value = firstOperand.toString()
            waitingForSecondOperand = false
           
        break
        
        case '-':

            console.log('minus')
            firstOperand = firstOperand - parseFloat(displayValue)
            displayValue = ''
            operator=''
            display.value = firstOperand.toString()
            waitingForSecondOperand = false
        break

        case '/': 
            console.log('dzielenie')
                firstOperand =  firstOperand /parseFloat(displayValue)
                displayValue = ''
                operator=''
                display.value = firstOperand.toString()
                waitingForSecondOperand = false
            
        break

        case '*':
            console.log('mnożenie')
            firstOperand = parseFloat(displayValue) * firstOperand
            displayValue = ''
            operator=''
            display.value = firstOperand.toString()
            waitingForSecondOperand = false
        break
    }
        debuger()
        calculator.displayValue = displayValue
        calculator.firstOperand = firstOperand
        calculator.waitingForSecondOperand = waitingForSecondOperand
        calculator.operator = operator
        debuger()
    }

    document.getElementById('=').addEventListener('click',(e)=>{
        e.preventDefault()
        getResult(calculator)
        if (calculator.firstOperand===Infinity){
            calculator.displayValue = ''
            calculator.operator = null
            calculator.waitingForSecondOperand = false
            calculator.firstOperand = null
            display.value = 'nie dziel przez 0'
        }
        
    })

    operators.forEach((sign)=>{
        return document.getElementById(sign).addEventListener('click',(e)=>{
            e.preventDefault()
            if (calculator.firstOperand === null) {
            calculator.firstOperand = parseFloat(calculator.displayValue)
            calculator.operator=sign
            calculator.waitingForSecondOperand = true
            calculator.displayValue = ''
            debuger()
            } else {
                getResult(calculator)
                if (calculator.firstOperand===Infinity){
                    calculator.displayValue = ''
                    calculator.operator = null
                    calculator.waitingForSecondOperand = false
                    calculator.firstOperand = null
                    display.value = 'nie dziel przez 0'
                }else
                calculator.operator=sign
            }
        
           
        })
    })





