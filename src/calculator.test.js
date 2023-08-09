import { fireEvent, getByTestId, render, screen, within } from '@testing-library/react'
import Calculator from './Calculator'

const ADD_OPERATOR = '+'
const SUBSTRACT_OPERATOR = '-'
const MULTIPLY_OPERATOR = 'x'
const DIVIDE_OPERATOR = '/'
const EQUAL_OPERATOR = '='
const DELETE_OPERATOR = '←'
const RESET_OPERATOR = 'C'
const DECIMAL_DOT = '.'
const FIRST_NUMBER = '3'
const SECOND_NUMBER = '4'
const ZERO_NUMBER_ID = '#zero-button'

// describe("Calculator", () => {
//   it("renders", () => {
//     render(<Calculator />);
//   });
// });

describe('Initial value', () => {
  let calculator

  beforeAll(() => {
    calculator = render(<Calculator />)
  })

  it('Initial value zero is displayed', () => {
    const calculatorScreen = calculator.getByTestId('calculator-result')
    expect(calculatorScreen.textContent).toBe('0')
  })
})

describe('Clicking operator and number buttons', () => {
  let calculator

  beforeAll(() => {
    calculator = render(<Calculator />)
  })

  it("When a number is clicked, it's been displayed", () => {
    const calculator = render(<Calculator />)
    const calculatorScreen = calculator.container.querySelector('#calculator-screen')
    const button = screen.getByText(FIRST_NUMBER)
    fireEvent.click(button)
    expect(calculatorScreen.innerHTML).toBe(FIRST_NUMBER)
  })

  it('When various number are clicked without an operator, the full number is displayed', () => {
    const calculator = render(<Calculator />)
    const calculatorScreen = calculator.container.querySelector('#calculator-screen')
    const firstNumButton = screen.getByText(FIRST_NUMBER)
    const secondNumButton = screen.getByText(SECOND_NUMBER)
    fireEvent.click(firstNumButton)
    fireEvent.click(secondNumButton)

    expect(calculatorScreen.innerHTML).toBe(FIRST_NUMBER + SECOND_NUMBER)
  })

  it('When an operator is clicked, the current number should be displayed', () => {
    const calculator = render(<Calculator />)
    const calculatorScreen = calculator.container.querySelector('#calculator-screen')
    const button = screen.getByText(ADD_OPERATOR)
    fireEvent.click(button)

    expect(calculatorScreen.innerHTML).toBe('0')
  })

  it('When adding various numbers, the current number should be displayed', () => {
    const calculator = render(<Calculator />)
    const calculatorScreen = calculator.container.querySelector('#calculator-screen')

    const firstNumButton = screen.getByText(FIRST_NUMBER)
    const secondNumButton = screen.getByText(SECOND_NUMBER)
    const addButton = screen.getByText(ADD_OPERATOR)

    fireEvent.click(firstNumButton)
    fireEvent.click(addButton)
    fireEvent.click(secondNumButton)

    expect(calculatorScreen.innerHTML).toBe(SECOND_NUMBER)
  })

  it('When adding various numbers and clicking equal button, it should return the result', () => {
    const calculator = render(<Calculator />)
    const calculatorScreen = calculator.container.querySelector('#calculator-screen')

    const firstNumButton = screen.getByText(FIRST_NUMBER)
    const secondNumButton = screen.getByText(SECOND_NUMBER)
    const addButton = screen.getByText(ADD_OPERATOR)
    const equalButton = screen.getByText(EQUAL_OPERATOR)

    fireEvent.click(firstNumButton)
    fireEvent.click(addButton)
    fireEvent.click(secondNumButton)
    fireEvent.click(equalButton)

    expect(calculatorScreen.innerHTML).toBe(`${Number(FIRST_NUMBER) + Number(SECOND_NUMBER)}`)
  })

  function getActions() {
    return {
      operators: {
        add: calculator.getByText('+'),
        equal: calculator.getByText('='),
      },
      numbers: {
        three: calculator.getByText('3'),
        four: calculator.getByText('4'),
      },
    }
  }

  it.only('When adding various two-digit numbers and clicking equal button, it should return the result', () => {
    const { operators, numbers } = getActions()

    fireEvent.click(numbers.three)
    fireEvent.click(numbers.four)

    fireEvent.click(operators.add)

    fireEvent.click(numbers.three)
    fireEvent.click(numbers.four)

    fireEvent.click(operators.equal)

    expect(calculator.getByTestId('calculator-result').textContent).toBe('68')
  })
  it('When adding and substracting various numbers and clicking equal button, it should return the result', () => {
    const calculator = render(<Calculator />)
    const calculatorScreen = calculator.container.querySelector('#calculator-screen')

    const firstNumButton = screen.getByText(FIRST_NUMBER)
    const secondNumButton = screen.getByText(SECOND_NUMBER)
    const addButton = screen.getByText(ADD_OPERATOR)
    const substractButton = screen.getByText(SUBSTRACT_OPERATOR)
    const equalButton = screen.getByText(EQUAL_OPERATOR)

    fireEvent.click(firstNumButton)
    fireEvent.click(addButton)
    fireEvent.click(secondNumButton)

    fireEvent.click(substractButton)
    fireEvent.click(secondNumButton)

    fireEvent.click(equalButton)

    expect(calculatorScreen.innerHTML).toBe(FIRST_NUMBER)
  })
  it('When multiplying various numbers and clicking equal button, it should return the result', () => {
    const calculator = render(<Calculator />)
    const calculatorScreen = calculator.container.querySelector('#calculator-screen')

    const firstNumButton = screen.getByText(FIRST_NUMBER)
    const secondNumButton = screen.getByText(SECOND_NUMBER)
    const multiplyButton = screen.getByText(MULTIPLY_OPERATOR)
    const equalButton = screen.getByText(EQUAL_OPERATOR)

    fireEvent.click(firstNumButton)
    fireEvent.click(multiplyButton)
    fireEvent.click(secondNumButton)

    fireEvent.click(equalButton)

    expect(calculatorScreen.innerHTML).toBe(`${Number(FIRST_NUMBER) * Number(SECOND_NUMBER)}`)
  })
  it('When dividing various numbers and clicking equal button, it should return the result', () => {
    const calculator = render(<Calculator />)
    const calculatorScreen = calculator.container.querySelector('#calculator-screen')

    const firstNumButton = screen.getByText(FIRST_NUMBER)
    const divideButton = screen.getByText(DIVIDE_OPERATOR)
    const equalButton = screen.getByText(EQUAL_OPERATOR)

    fireEvent.click(firstNumButton)
    fireEvent.click(divideButton)
    fireEvent.click(firstNumButton)

    fireEvent.click(equalButton)

    expect(calculatorScreen.innerHTML).toBe(`${Number(FIRST_NUMBER) / Number(FIRST_NUMBER)}`)
  })
  it('When dividing by zero and clicking equal button, it should return an error', () => {
    const calculator = render(<Calculator />)
    const calculatorScreen = calculator.container.querySelector('#calculator-screen')

    const firstNumButton = screen.getByText(FIRST_NUMBER)
    const secondNumButton = calculator.container.querySelector(ZERO_NUMBER_ID)
    const divideButton = screen.getByText(DIVIDE_OPERATOR)
    const equalButton = screen.getByText(EQUAL_OPERATOR)

    fireEvent.click(firstNumButton)
    fireEvent.click(divideButton)
    fireEvent.click(secondNumButton)

    fireEvent.click(equalButton)

    expect(calculatorScreen.innerHTML).toBe('Err')
  })
  it('When adding decimals, it should return the result', () => {
    const calculator = render(<Calculator />)
    const calculatorScreen = calculator.container.querySelector('#calculator-screen')

    const firstNumButton = screen.getByText(FIRST_NUMBER)
    const secondNumButton = screen.getByText(SECOND_NUMBER)
    const addButton = screen.getByText(ADD_OPERATOR)
    const decimalButton = screen.getByText(DECIMAL_DOT)
    const equalButton = screen.getByText(EQUAL_OPERATOR)
    const decimalNumber = FIRST_NUMBER + DECIMAL_DOT + SECOND_NUMBER

    fireEvent.click(firstNumButton)
    fireEvent.click(decimalButton)
    fireEvent.click(secondNumButton)
    fireEvent.click(addButton)
    fireEvent.click(firstNumButton)
    fireEvent.click(decimalButton)
    fireEvent.click(secondNumButton)

    fireEvent.click(equalButton)

    expect(calculatorScreen.innerHTML).toBe(`${Number(decimalNumber) + Number(decimalNumber)}`)
  })
})

describe('Clicking delete and reset buttons', () => {
  it('When clicking delete, it deletes', () => {
    const calculator = render(<Calculator />)
    const calculatorScreen = calculator.container.querySelector('#calculator-screen')

    const firstNumButton = screen.getByText(FIRST_NUMBER)
    const secondNumButton = screen.getByText(SECOND_NUMBER)
    const deleteButton = screen.getByText(DELETE_OPERATOR)
    fireEvent.click(firstNumButton)

    fireEvent.click(secondNumButton)
    fireEvent.click(deleteButton)

    expect(calculatorScreen.innerHTML).toBe(FIRST_NUMBER)
  })
  it('When clicking reset (C), it resets', () => {
    const calculator = render(<Calculator />)
    const calculatorScreen = calculator.container.querySelector('#calculator-screen')

    const firstNumButton = screen.getByText(FIRST_NUMBER)
    const secondNumButton = screen.getByText(SECOND_NUMBER)
    const addButton = screen.getByText(ADD_OPERATOR)
    const resetButton = screen.getByText(RESET_OPERATOR)

    fireEvent.click(firstNumButton)
    fireEvent.click(addButton)
    fireEvent.click(secondNumButton)
    fireEvent.click(resetButton)

    expect(calculatorScreen.innerHTML).toBe('0')
  })
})
