import React from "react";
import styles from "./Input.module.css";

interface InputProps {
  className?: string;
  placeholder?: string;
  value?: string;
  type?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
  ref?: React.RefObject<HTMLInputElement>;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return (
    <input
      className={`${styles["input"]} ${props.className}`}
      placeholder={props.placeholder}
      type={props.type}
      value={props.value}
      onChange={props.onChange}
      onBlur={props.onBlur}
      ref={ref}
    />
  );
});

export default Input;
