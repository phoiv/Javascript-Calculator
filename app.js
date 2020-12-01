
//things to DO:
//take care of the case that first input is 0
//add delete button
//add commas in thousand, millions etc...
//trim big numbers
//add even more buttons



const buttonArea = document.querySelector(".button-area");
const inputDisplay = document.querySelector("#current-input");
const totalInput = document.querySelector("#total-input");
console.log(inputDisplay)


let hasDecimal = false //we remember if we input a ".", only 1 allowed per number
// let setToClear = 0; //we set (not-anymore :this to 1 when we need to clear bottom screen )and 2 when we need to clear both
let lastInput = null;
let lastOper = null;
// we use one event listener to the whole button area and we will get which button was 
// clicked with event delegation
buttonArea.addEventListener("click", buttonClicked);




function buttonClicked(evt) {

    //if we clicked the surounding area and not a button
    if (evt.target == buttonArea) {
        return;
    }
    const input = evt.target.innerText;

    if (input == "C") {
        updateDisplay("", "");
        lastInput = null;
        return;
    }

    // if (setToClear == 2) {
    //     //clear the whole screen 
    //     if (Number.isInteger(parseInt(input))) {
    //         updateDisplay("", "");
    //         setToClear = 0;
    //     }
    //     else
    //         return;
    // }

    //if "="" was clicked evaluate"
    if (input === "=") {
        if (lastInput == "=") {
            updateDisplay(null, inputDisplay.innerText + "=");
            return;
        }
        let toEval = totalInput.innerText + inputDisplay.innerText;
        //remove operator if at end so  eval() wont fail
        toEval = toEval.replace(/[+\-/*]$/, "");
        const result = eval(toEval);
        updateDisplay(result, toEval + "=");
        lastInput = "="
        return;
    }


    //check if input is "." if its the first keep it else ignore it
    if (input == ".") {
        if (!hasDecimal) {
            console.log("DOT")
            //if "." is the first input show it as "0."
            if (inputDisplay.innerText == "")
                updateDisplay("0.",)
            else
                updateDisplay(inputDisplay.innerText + input,)
            hasDecimal = true;
        }
        else return;
    }
    //if input is a number display it
    else if (Number.isInteger(parseInt(input))) {
        if (lastInput == "=") {
            //CHANGE HERE IF I WANT TO STORE ANS (PREVIOUS RESULT)
            updateDisplay(input, "")
        }
        else {
            console.log("number")
            updateDisplay(inputDisplay.innerText + input,)
        }
    }
    //we end up here if input is operator
    //AND input is NOT empty, display...
    else if (inputDisplay.innerText != "") {
        console.log(inputDisplay.innerText + input)
        if (lastInput == "=") {
            console.log(inputDisplay.innerText + input)
            updateDisplay("", inputDisplay.innerText + input)
        }
        //if last input is "-" and current + - we remove it...
        //we just remove the negative sign
        else if (lastInput == "-") {
            if (input == "-" || input == "+") {
                console.log("am here?")
                updateDisplay("",);
                lastInput = null;
                return;
            }
            //this is the case were the current input is * or / bu we dont have an actual operand
            //just a negative sign so we ingore it
            return;
        }
        else {
            //here we have an actual operand and an operator so we update display
            console.log("operator");
            updateDisplay("", totalInput.innerText + inputDisplay.innerText + input)
            //we will get a new operand so "." is allowed again
            hasDecimal = false;
        }

    }

    //We end up here when we have empty input AND input is an operator
    //we care if it "-" so we display negative sign for negative number
    //we accept negative numbers when its the first operand or last operator was multi or division
    else if (input === "-" && (totalInput.innerText == "" || lastOper == "/" || lastOper == "*")) {
        updateDisplay("-",);
    }
    //so here is ther case where current input is empty but we have total input
    //and we replace last operator
    else {
        updateDisplay(null, totalInput.innerText.replace(/[+\-/*]$/, input));

    }
    lastInput = input;
}

//function that updates the bottom and top part of the screen based on the arguments
function updateDisplay(bottom, top) {
    if (bottom != null) {
        inputDisplay.innerText = bottom;
        //if number gets too big we make the font smaller
        if (inputDisplay.innerText.length >= 15)
            inputDisplay.style.fontSize = "2.8vh";
        else if (inputDisplay.innerText.length > 10)
            inputDisplay.style.fontSize = "3.5vh";
        else
            inputDisplay.style.fontSize = "4.5vh";

    }
    if (top != null) {
        console.log(top)
        //ignore decimal if its followed by +-/*=
        top = top.replace(/\.(?=[+*/=\-])/gi, "")
        totalInput.innerText = top;
        lastOper = top[top.length - 1];
    }
}
