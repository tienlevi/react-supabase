import { HTMLAttributes, ReactNode } from "react";
import "./styles.css";

interface Props extends HTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

function Button({ className, children, ...props }: Props) {
  return (
    <button type="submit" className={`button ${className}`} {...props}>
      {children}
    </button>
  );
}

export default Button;
