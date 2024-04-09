import { useReducer } from 'react';
import './App.css';
const calculatorData = [
  { btnName: 'AC', className: 'span-two', type: 'clearAction' },
  { btnName: 'DEL', className: '', type: 'delNumber' },
  { btnName: '/', className: '', type: 'addOperation' },
  { btnName: '1', className: '', type: 'addNumber' },
  { btnName: '2', className: '', type: 'addNumber' },
  { btnName: '3', className: '', type: 'addNumber' },
  { btnName: '*', className: '', type: 'addOperation' },
  { btnName: '4', className: '', type: 'addNumber' },
  { btnName: '5', className: '', type: 'addNumber' },
  { btnName: '6', className: '', type: 'addNumber' },
  { btnName: '+', className: '', type: 'addOperation' },
  { btnName: '7', className: '', type: 'addNumber' },
  { btnName: '8', className: '', type: 'addNumber' },
  { btnName: '9', className: '', type: 'addNumber' },
  { btnName: '-', className: '', type: 'addOperation' },
  { btnName: '.', className: '', type: 'addNumber' },
  { btnName: '0', className: '', type: 'addNumber' },
  { btnName: '=', className: 'span-two', type: 'doOperation' },
];
const initialState = {
  currentOperand: '0',
  prvOperand: '',
  operation: '',
  operationDone: true,
};
function reducer(state, action) {
  switch (action.type) {
    case 'clearAction':
      return initialState;
    case 'doOperation':
      if (
        state.currentOperand === '0' ||
        (state.currentOperand === '0.' &&
          state.operation === '/' &&
          state.prvOperand === '0')
      ) {
        return {
          ...state,
          currentOperand: 'Result is undefined',
          operationDone: true,
        };
      }
      if (
        state.currentOperand === '0' &&
        state.operation === '/' &&
        state.prvOperand !== '0'
      ) {
        return {
          ...state,
          currentOperand: 'Cannot divide by zero',
          operationDone: true,
        };
      }
      return {
        prvOperand: '',
        operation: '',
        currentOperand:
          state.currentOperand != ''
            ? String(
                eval(
                  `${state.prvOperand} ${state.operation} ${state.currentOperand} `
                )
              )
            : state.currentOperand,
        operationDone: true,
      };
    case 'addNumber':
      if (state.currentOperand.length > 15) {
        return state;
      }
      if (action.payload === '.' && state.currentOperand.includes('.'))
        return state;
      if (state.currentOperand === '0' && action.payload === '0') return state;
      if (action.payload === '.' && state.currentOperand === '0') {
        return { ...state, currentOperand: '0.', operationDone: false };
      }
      if (state.operationDone)
        return {
          ...state,
          currentOperand: action.payload,
          operationDone: state.operationDone && false,
        };
      return {
        ...state,
        currentOperand: state.currentOperand + action.payload,
      };
    case 'addOperation':
      if (
        state.operation !== '' &&
        state.operation !== action.payload &&
        state.operationDone === true
      ) {
        return {
          ...state,
          operation: action.payload,
        };
      }
      return {
        ...state,
        operation: action.payload,
        operationDone: true,
        prvOperand: String(
          eval(
            `${state.prvOperand} ${state.operation} ${state.currentOperand} `
          )
        ),
      };
    case 'delNumber':
      return {
        ...state,
        operationDone: true,
        currentOperand:
          state.currentOperand.length == 1
            ? '0'
            : state.currentOperand.slice(1),
      };
    default:
      return state;
  }
}
function App() {
  const [{ currentOperand, prvOperand, operation }, dispatch] = useReducer(
    reducer,
    initialState
  );
  return (
    <div className="calculator-grid">
      <div className="output">
        <div className="prev-operand">
          {prvOperand} {operation}
        </div>
        <div className="curr-operand">{currentOperand}</div>
      </div>
      {calculatorData.map((item, i) => (
        <button
          className={item.className}
          key={i}
          onClick={() => dispatch({ type: item.type, payload: item.btnName })}
        >
          {item.btnName}
        </button>
      ))}
    </div>
  );
}

export default App;
