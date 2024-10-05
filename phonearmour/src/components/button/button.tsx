import { HTMLAttributes } from "react";
import Link from "next/link";
import styles from "./button.module.css";

interface ButtonProps extends HTMLAttributes<HTMLDivElement> {
  href?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  target?: "_blank" | "_self" | "_parent" | "_top";
  variant?: {
    name?: "standard";
    colour?:
      | "stone"
      | "red"
      | "transparent";
  };
}

export const Button = ({
  style: _style,
  className: _className,
  children,
  onClick,
  variant,
  href,
  type = "button",
  target = "_self",
}: ButtonProps) => {
  const {
    name = "standard",
    colour = "stone",
  } = variant || {};

  let className = `${styles.button} ${_className ? _className : ""}`;
  if (name) className += ` ${styles[name]}`;
  if (colour) className += ` ${styles[colour]}`;

  if (href) {
    return (
      <Link style={_style} className={className} href={href} target={target}>
        {children}
      </Link>
    );
  }

  return (
    <button style={_style} className={className} onClick={onClick} type={type}>
      {children}
    </button>
  );
};