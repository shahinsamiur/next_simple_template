// "use client";

import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({ children, onClick, ...props }: ButtonProps) {
  return (
    <button {...props} onClick={onClick}>
      {children}
    </button>
  );
}
