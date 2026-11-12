
import type { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export function Input({ type = "text", ...props }: InputProps) {
  return <input type={type} {...props} />;
}
