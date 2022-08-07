import React, { useState } from "react";

const useInput = (regex: RegExp) => {
  const [enteredInput, setEnteredInput] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const validateInput = () => {
    if (regex) {
      return regex.test(enteredInput);
    }
  };

  const inputIsValid = validateInput();
  const hasError = !inputIsValid && isTouched;

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEnteredInput(event.target.value);
  };

  const blurChangeHandler = () => {
    setIsTouched(true);
  };

  const resetInput = () => {
    setEnteredInput("");
    setIsTouched(false);
  };

  return {
    enteredInput,
    inputChangeHandler,
    blurChangeHandler,
    isTouched,
    hasError,
    resetInput,
    isValid: inputIsValid,
  };
};

export default useInput;
