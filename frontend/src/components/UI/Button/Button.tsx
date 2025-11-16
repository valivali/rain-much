import { type ButtonHTMLAttributes, type ReactNode } from "react"
import "./Button.scss"

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * The visual style variant of the button
   * @default "primary"
   */
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger"
  /**
   * The size of the button
   * @default "medium"
   */
  size?: "small" | "medium" | "large"
  /**
   * Whether the button should take full width of its container
   * @default false
   */
  fullWidth?: boolean
  /**
   * The content of the button
   */
  children: ReactNode
}

function Button({
  variant = "primary",
  size = "medium",
  fullWidth = false,
  children,
  className = "",
  ...props
}: ButtonProps) {
  const classNames = [
    "button",
    `button--${variant}`,
    `button--${size}`,
    fullWidth && "button--full-width",
    className
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <button className={classNames} {...props}>
      {children}
    </button>
  )
}

export default Button

