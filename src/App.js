import React, { useState } from 'react';
import './App.css';

function App() {
  const [input, setInput] = useState('');
  const [lastClickedEquals, setLastClickedEquals] = useState(false);
  const operators = ['+', '-', '*', '/'];
  const lastClickedOperator = operators.includes(input.charAt(input.length - 1));
  const zeros = '0';

  const handleButton = (value) => {
    if (input.length < 9) {
      if (input === 'NaN') {
        if (!operators.includes(value)) {
          setInput(value);
          return;
        } else {
          return;
        }
      }

      if (input === zeros && value >= 0 && value <= 9) {
        setInput(value);
        return;
      }

      if (operators.includes(input.charAt(input.length - 2))
        && zeros.includes(input.charAt(input.length - 1))
        && value >= 0 && value <= 9) {
        setInput((prevInput) => prevInput.slice(0, -1) + value);
        return;
      }

      if (input === '') {
        if (operators.includes(value)) {
          return;
        } else {
          setInput(value);
        }
      } else {
        if (lastClickedEquals) {
          if (operators.includes(value)) {
            setInput((prevInput) => prevInput + value);
            setLastClickedEquals(false);
          } else {
            setInput(value);
            setLastClickedEquals(false);
          }
        } else {
          if (lastClickedOperator && operators.includes(value)) {
            setInput((prevInput) => prevInput.slice(0, -1) + value);
          } else {
            setInput((prevInput) => prevInput + value);
          }
        }
      }
    }
  };

  const handleCalculate = () => {
    try {
      if (input === '') {
        return;
      }

      if (lastClickedOperator === true) {
        return;
      }
      setInput(eval(input).toString());
      setLastClickedEquals(true);
    } catch (error) {
      setInput('NaN');
    }
  };

  const handleClear = () => {
    setInput('');
    setLastClickedEquals(false);
  };

  return (
    <div className="calculator">
      <div className="display">
        <div className="input">{input}</div>
      </div>
      <div className="buttons">
        <button onClick={() => handleButton('7')}>7</button>
        <button onClick={() => handleButton('8')}>8</button>
        <button onClick={() => handleButton('9')}>9</button>
        <button className='operators' onClick={() => handleButton('/')}>÷</button>

        <button onClick={() => handleButton('4')}>4</button>
        <button onClick={() => handleButton('5')}>5</button>
        <button onClick={() => handleButton('6')}>6</button>
        <button className='operators' onClick={() => handleButton('*')}>×</button>

        <button onClick={() => handleButton('1')}>1</button>
        <button onClick={() => handleButton('2')}>2</button>
        <button onClick={() => handleButton('3')}>3</button>
        <button className='operators' onClick={() => handleButton('-')}>−</button>

        <button className='simbols' onClick={handleClear}>C</button>
        <button onClick={() => handleButton('0')}>0</button>
        <button className='simbols' onClick={handleCalculate}>=</button>
        <button className='operators' onClick={() => handleButton('+')}>+</button>
      </div>
    </div>
  );
};

export default App;
