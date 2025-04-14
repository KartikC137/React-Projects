import React from "react";

//Improvements:
// 1. Build my own parser for different modes
// 2. Expression Logs


const calculatorComponents = {
  clear: "AC",
  divide: "/",
  multiply: "*",
  seven: "7",
  eight: "8",
  nine: "9",
  subtract: "-",
  four: "4",
  five: "5",
  six: "6",
  add: "+",
  one: "1",
  two: "2",
  three: "3",
  equals: "=",
  zero: "0",
  decimal: "."
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      expression : "",
      display: 0
    }
    this.inputManager= this.inputManager.bind(this);
    this.formatExpression = this.formatExpression.bind(this);
    this.isValidExpression = this.isValidExpression.bind(this);
  }

  inputManager(inputValue) {
    if (inputValue === "clear") {
      this.setState({
        value: 0,
        expression : "0",
        display: 0
      })
    }
    else if (inputValue === "equals") {
      const exp = this.formatExpression(this.state.expression);
      console.log("formatted:",exp);
        if(this.isValidExpression(exp)) {
          // eslint-disable-next-line no-new-func
          const rawResult = new Function(`return ${exp}`)();
          const result = parseFloat(rawResult.toFixed(10));
          this.setState({
            value : 0,
            expression : `${result}`,
            display: `${result}`
          })
        } else {
          this.setState({
            display: `Invalid Expression`,
            expression : `0`,
          })
        }
    }
    else {
      const currExp = this.state.expression + calculatorComponents[inputValue];
      const newExp = this.formatExpression(currExp);
      this.setState({
        value: inputValue,
        expression : newExp,
        display : newExp
      })
    }
  }

  formatExpression(expression) {
    // Remove leading 0 if followed by another digit
    if (expression[0] === '0' && expression.length > 1 && !isNaN(expression[1])) {
      expression = expression.slice(1);
    }

    // Add spaces around operators
    expression = expression.replace(/([+\-*/])/g, ' $1 ');

    // Remove extra whitespace
    expression = expression.trim().replace(/\s+/g, ' ');

    // Collapse multiple operators: allow '-' as negative, replace the rest
    const tokens = expression.split(' ');
    const cleaned = [];

    for (let i = 0; i < tokens.length; i++) {
      const curr = tokens[i];
      const prev = cleaned[cleaned.length - 1];

      if (["+", "-", "*", "/"].includes(curr)) {
        // If previous token is also an operator
        if (["+", "-", "*", "/"].includes(prev)) {
          if (curr === "-") {
            cleaned.push(curr); // Allow negative
          } else {
            cleaned[cleaned.length - 1] = curr; // Replace last operator
          }
        } else {
          cleaned.push(curr);
        }
      } else {
        cleaned.push(curr);
      }
    }

    // Fix multiple decimals within a single number (90.2.2 -> 90.22)
    let final = cleaned.join(' ').replace(/(\d*\.\d*)\./g, '$1');

    return final.trim();
  }
9


  isValidExpression(expression) {
    const exp = this.formatExpression(expression).replace(/\s+/g, '');
    // 1. Check for invalid characters
    if (!/^[0-9+\-*/().]+$/.test(exp)) {
      return false;
    }
    // 2. Check for invalid operator sequences (except '-' for negatives)
    if (/([-+*/]){2,}/.test(exp.replace(/-\d/g, '')))
    {
      return false;
    }
    // 3. Check for consecutive dots or malformed decimals
    if (/\.\D|[^0-9]\.|\.{2,}/.test(exp)) {
      return false;
    }
    // 4. Check if expression ends with an operator
    if (/[+\-*/]$/.test(exp)) {
      return false;
    }
    // 5. Check for balanced parentheses
    let balance = 0;
    for (let char of exp) {
      if (char === '(') balance++;
      if (char === ')') balance--;
      if (balance < 0) return false; // closed before opened
    }
    if (balance !== 0) return false;
    return true;
  }

  render() {
    return (
        <div id="calculator-box">
          <div id="display">{this.state.display}
          </div>
          <div id="calculator-components">
            {Object.keys(calculatorComponents).map((key) => (
                <button className="components" id={key}
                onClick={()=>{this.inputManager(key)}}
                >{calculatorComponents[key]}</button>
            ))}
          </div>
        </div>
    );
  }
}

export default App;
