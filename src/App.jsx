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
      return {
        ...state,
        operationDone: state.operationDone && false,
        currentOperand: state.operationDone
          ? action.payload
          : String(Number(state.currentOperand + action.payload)), // convert to Number to remove all zeros on left
      };
    case 'addOperation':
      return {
        ...state,
        prvOperand:
          state.currentOperand != ''
            ? String(
                eval(
                  `${state.prvOperand} ${state.operation} ${state.currentOperand} `
                )
              )
            : state.prvOperand != ''
            ? state.prvOperand
            : '0',
        operation: action.payload,
        operationDone: true,
      };
    case 'delNumber':
      console.log(state, typeof state.currentOperand);
      return {
        ...state,
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
