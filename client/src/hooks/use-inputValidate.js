import { useReducer } from "react";

const initialState = {
  value: '',
  isTouched: false,
}

const inputReducer = (state, action) => {
  if (action.type === 'INPUT') {
    return {value: action.value, isTouched: state.isTouched};
  }
  if (action.type === 'BLUR') {
    return {value: state.value, isTouched: true};
  }

  if (action.type === 'RESET') {
    return {value: '', isTouched: false};
  }

  if (action.type === 'TOGGLE_ERROR') {
    return {value: state.value, isTouched: true};
  }
  return initialState;
};

const useInputValidate = (validateValue) => {
  const [inputState, dispatch] = useReducer(inputReducer, initialState);

  const valueIsValid = validateValue(inputState.value);
  const hasError = !valueIsValid && inputState.isTouched;

  // console.log('useInputValidate: valueIsValid: ' + valueIsValid + ', hasError: ' + hasError)

  const valueChangeHandler = (event) => {
    dispatch({type: 'INPUT', value: event.target.value});
  };

  const inputBlurHandler = (event) => {
    dispatch({type: 'BLUR'});
  };

  const toggleHasError = () => {
    dispatch({type: 'TOGGLE_ERROR'});
  }

  return {
    // 다른데서 value필요 없으면 지우면 됨
    value: inputState.value,
    isValid: valueIsValid,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    toggleHasError,
  }

};

export default useInputValidate;
