import React, { Component } from 'react';
import './Calculator.css';

import Display from '../components/Display';
import Button from '../components/Button';

const initialState = {
  displayValue: '0',
  clearDisplay: false,
  operation: null,
  values: [0, 0],
  current: 0
}

export default class Calculator extends Component {
  state = { ...initialState }

  clearMemory() {
    this.setState({ ...initialState });
  }

  setOperation(operation) {
    if (this.state.current === 0) {
      this.setState({ operation, current: 1, clearDisplay: true });
    } else {
      const equals = operation === '=',
        currentOperation = this.state.operation,
        values = [...this.state.values];

      try {
        // eslint-disable-next-line
        values[0] = eval(`${values[0]} ${currentOperation} ${values[1]}`);
      } catch (err) {
        values[0] = this.state.values[0];
      }
      
      values[1] = 0;

      this.setState({
        displayValue: values[0],
        operation: equals ? null : operation,
        current: equals ? 0 : 1,
        clearDisplay: !equals,
        values
      })
    }
  }

  addDigit(digit) {
    if (digit === '.' && this.state.displayValue.includes('.')) return;

    const clearDisplay = this.state.displayValue === '0' || this.state.clearDisplay,
      currentValue = clearDisplay ? '' : this.state.displayValue,
      displayValue = currentValue + digit;

    this.setState({ displayValue, clearDisplay: false });

    const i = this.state.current,
      newValue = parseFloat(displayValue),
      values = [...this.state.values];
      
      values[i] = newValue;

      this.setState({ values });
  }

  render() {
    const clearMemory = () => this.clearMemory(),
      setOperation = op => this.setOperation(op),
      addDigit = d => this.addDigit(d);

    return (
      <div className="calculator">
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
    );
  }
}