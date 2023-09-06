import React, { Component, ReactDOM } from "react"
import "./Calculator.css"

import Button from "../components/Button"
import Display from "../components/Display"

const initialState = {
  displayValue: "0",
  clearDisplay: false,
  operation: null,
  values: [0, 0],
  currentValuePosition: 0,
}

export class Calculator extends Component {
  state = { ...initialState }

  operationsArray = ["/", "*", "-", "+", "="]

  clearMemory() {
    // erase calculator
    this.setState({ ...initialState })
  }

  setOperation(operation) {
    if (this.state.currentValuePosition === 0) {
      this.setState({
        ...this.state,
        operation,
        currentValuePosition: 1,
        clearDisplay: true,
      })
    } else {
      const equals = operation === "="
      const currentOperation = this.state.operation

      // assert operation
      let values = [...this.state.values]
      try {
        values = [eval(`${values[0]} ${currentOperation} ${values[1]}`), 0]
        if (isNaN(values[0]) || !isFinite(values[0])) {
          this.setState({ ...initialState })
          return
        }
      } catch (e) {
        values = [...this.state.values]
      }

      console.log(this.state)
      console.log({
        displayValue: values[0],
        operation: equals ? null : operation,
        currentValuePosition: equals ? 0 : 1,
        clearDisplay: true,
        values,
      })

      // update state
      this.setState({
        ...this.state,
        displayValue: values[0],
        operation: equals ? null : operation,
        currentValuePosition: equals ? 0 : 1,
        clearDisplay: true,
        values,
      })
    }
  }

  addDigit(digit) {
    // . management
    if (digit === "." && this.state.displayValue.includes(".")) return

    // case calc init => disconsider 0 input
    const clearDisplay =
      this.state.displayValue === "0" || !!this.state.clearDisplay
    const currentValue = clearDisplay ? "" : this.state.displayValue
    const displayValue = currentValue + digit

    // store input value
    const values = [...this.state.values]
    if (digit !== ".") {
      const index = this.state.currentValuePosition
      const newValue = parseFloat(displayValue)

      values[index] = newValue
    }

    // update state
    this.setState({
      ...this.state,
      displayValue,
      values,
      clearDisplay: false,
    })
  }

  render() {
    const addDigit = (n) => this.addDigit(n)
    const setOperation = (op) => this.setOperation(op)
    const clearMemory = () => this.clearMemory()
    const execInput = (e) => {
      e.preventDefault()
      let key = e.key

      if (key === "Enter") {
        key = "="
      }

      if (this.operationsArray.includes(key)) {
        setOperation(key)
      } else {
        const numberInput = Number(key)
        if (isNaN(numberInput)) {
          return
        }

        addDigit(numberInput)
        console.log(this.state.displayValue)
      }
    }

    return (
      <div
        className="calculator"
        ref={(e) => (this.main = e)}
        onKeyDown={(e) => execInput(e)}
      >
        <Display value={this.state.displayValue} />
        <Button label="AC" click={clearMemory} triple />
        <Button label="/" click={setOperation} operation />
        <Button label="7" click={addDigit} />
        <Button label="8" click={addDigit} />
        <Button label="9" click={addDigit} />
        <Button label="*" click={setOperation} operation />
        <Button label="4" click={addDigit} />
        <Button label="5" click={addDigit} />
        <Button label="6" click={addDigit} />
        <Button label="-" click={setOperation} operation />
        <Button label="1" click={addDigit} />
        <Button label="2" click={addDigit} />
        <Button label="3" click={addDigit} />
        <Button label="+" click={setOperation} operation />
        <Button label="0" click={addDigit} double />
        <Button label="." click={addDigit} />
        <Button label="=" click={setOperation} operation />
      </div>
    )
  }
}

export default Calculator
