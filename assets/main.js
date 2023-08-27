const calculator=document.querySelector('.calculator');const display=calculator.querySelector('.display');let displayValue='0';let firstOperand=null;let secondOperand=null;let operator=null;function updateDisplay(){if(typeof displayValue==='undefined'||isNaN(displayValue)){displayValue='0';}
display.value=displayValue;}
function inputDigit(digit){if(displayValue==='0'){displayValue=digit;}else{displayValue+=digit;}
updateDisplay();}
function inputDecimal(){if(!displayValue.includes('.')){displayValue+='.';}
updateDisplay();}
function handleOperator(nextOperator){if(operator&&firstOperand){secondOperand=parseFloat(displayValue);const result=operate(firstOperand,secondOperand,operator);if(!isNaN(result)){firstOperand=result;displayValue=`${firstOperand}`;}
secondOperand=null;}else{firstOperand=parseFloat(displayValue);}
operator=nextOperator;displayValue='0';updateDisplay();}
function operate(a,b,operator){if(isNaN(a)||isNaN(b)){return;}
switch(operator){case'+':return a+b;case'-':return a-b;case'×':return a*b;case'÷':return a/b;default:return NaN;}}
calculator.addEventListener('click',event=>{const target=event.target;if(!target.matches('button'))return;if(target.hasAttribute('data-operation')){handleOperator(target.textContent);return;}
if(target.hasAttribute('data-equals')){secondOperand=parseFloat(displayValue);firstOperand=operate(firstOperand,secondOperand,operator);displayValue=`${firstOperand}`;firstOperand=null;secondOperand=null;operator=null;updateDisplay();return;}
if(target.hasAttribute('data-clear')){displayValue='0';firstOperand=null;secondOperand=null;operator=null;updateDisplay();return;}
if(target.hasAttribute('data-sign')){displayValue=`${parseFloat(displayValue) * -1}`;updateDisplay();return;}
if(target.hasAttribute('data-percent')){if(operator&&firstOperand){secondOperand=parseFloat(displayValue);secondOperand/=100;firstOperand=operate(firstOperand,secondOperand,operator);displayValue=`${firstOperand}`;secondOperand=null;}else{firstOperand=parseFloat(displayValue);firstOperand/=100;displayValue=`${firstOperand}`;}
updateDisplay();navigator.vibrate(30);return;}
if(target.hasAttribute('data-delete')){if(displayValue.length===1){displayValue='0';}else{displayValue=displayValue.slice(0,-1);}
updateDisplay();return;}
if(target.textContent==='.'){inputDecimal();}else{inputDigit(target.textContent);}});