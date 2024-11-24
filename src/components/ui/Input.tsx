import { forwardRef, HTMLAttributes } from "react";
import "./styles.css";

interface Props extends HTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  type: string;
}

const Input = forwardRef<HTMLInputElement, Props>(
  ({ className, placeholder, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={`input ${className}`}
        {...props}
        ref={ref}
        placeholder={placeholder}
      />
    );
  },
);

export default Input;
