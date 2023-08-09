import { useState } from 'react'
import './Calculator.css'

const OPERATOR_NAME = {
  RESET: 'C',
  DELETE: '←',
  ADD: '+',
  SUBSTRACT: '-',
  MULTIPLY: 'x',
  DIVIDE: '/',
  EQUALS: '=',
  DECIMAL: '.',
}
const ERROR_MESSAGE = 'Err'
const CALCULATOR_NUMBERS = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0]
const CALCULATOR_OPERATORS = [
  [OPERATOR_NAME.RESET, OPERATOR_NAME.DELETE, OPERATOR_NAME.DIVIDE],
  [OPERATOR_NAME.MULTIPLY, OPERATOR_NAME.SUBSTRACT, OPERATOR_NAME.ADD, OPERATOR_NAME.EQUALS],
]

const OPERATIONS = {
  [OPERATOR_NAME.ADD]: (a, b) => a + b,
  [OPERATOR_NAME.SUBSTRACT]: (a, b) => a - b,
  [OPERATOR_NAME.MULTIPLY]: (a, b) => a * b,
  [OPERATOR_NAME.DIVIDE]: (a, b) => a / b,
}

const INITIAL_STATE = {
  operation: '',
  num: 0,
  res: 0,
  decimal: false,
}

const Calculator = () => {
  const [calc, setCalc] = useState(INITIAL_STATE)

  const getResultFromOperation = (a, b) => {
    if (calc.operation === OPERATOR_NAME.DIVIDE && b === '0') {
      return ERROR_MESSAGE
    }
    return OPERATIONS[calc.operation](Number(a), Number(b))
  }

  const handleOnClickDecimal = (e) => {
    e.preventDefault()
    const value = e.target.innerHTML
    setCalc({
      ...calc,
      num: !calc.num.toString().includes(OPERATOR_NAME.DECIMAL) ? calc.num + value : calc.num,
      decimal: true,
    })
  }

  const handleOnClickNumber = (e) => {
    e.preventDefault()
    const value = e.target.innerHTML
    if (String(calc.num).length > 14) return
    if (!calc.operation) {
      const number = calc.num === 0 ? value : calc.num + value
      setCalc({
        ...calc,
        num: number,
        res: number,
      })
    } else {
      setCalc({
        ...calc,
        num: calc.decimal ? calc.num + value : calc.num ? calc.num + value : value,
      })
    }
  }

  const handleOnClickOperator = (e) => {
    e.preventDefault()
    const value = e.target.innerHTML
    if (value === OPERATOR_NAME.EQUALS) {
      const rest = getResultFromOperation(calc.res, calc.num)
      setCalc({
        operation: '',
        num: rest,
        res: rest,
        decimal: false,
      })
    } else if (calc.operation) {
      const rest = getResultFromOperation(calc.res, calc.num)
      setCalc({
        operation: value,
        num: null,
        res: rest,
        decimal: false,
      })
    } else {
      setCalc({ ...calc, operation: value, decimal: false, num: null })
    }
  }

  const handleOnClickFormat = (e) => {
    e.preventDefault()
    const value = e.target.innerHTML
    if (value === OPERATOR_NAME.DELETE) {
      const isEmpty = String(calc.num).length === 1
      setCalc({
        ...calc,
        num: isEmpty ? 0 : calc.num.slice(0, calc.num.length - 1),
      })
    }
    if (value === OPERATOR_NAME.RESET) {
      setCalc(INITIAL_STATE)
    }
  }

  return (
    <main>
      <div className='calculator-container'>
        <div className='calculator-screen' id='calculator-screen' data-testid='calculator-result'>
          {calc.num ? calc.num : calc.res}
        </div>
        <div className='calculator-upper-buttons'>
          {CALCULATOR_OPERATORS[0].map((operator) => (
            <button
              onClick={operator === OPERATOR_NAME.DIVIDE ? handleOnClickOperator : handleOnClickFormat}
              key={operator}
            >
              {operator}
            </button>
          ))}
        </div>

        <div className='calculator-lateral-buttons'>
          {CALCULATOR_OPERATORS[1].map((operator) => (
            <button
              id={operator === OPERATOR_NAME.EQUALS ? 'equal-button' : null}
              onClick={handleOnClickOperator}
              key={operator}
            >
              {operator}
            </button>
          ))}
        </div>

        <div className='calculator-main-buttons'>
          {CALCULATOR_NUMBERS.map((num) => (
            <button id={num === 0 ? 'zero-button' : null} onClick={handleOnClickNumber} key={num}>
              {num}
            </button>
          ))}
          <button onClick={handleOnClickDecimal}>.</button>
        </div>
      </div>
    </main>
  )
}

export default Calculator
