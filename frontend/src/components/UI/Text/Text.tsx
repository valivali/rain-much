import { type ReactNode, type HTMLAttributes } from "react"
import "./Text.scss"

export interface TextProps extends HTMLAttributes<HTMLElement> {
  /**
   * The variant of text to render
   * @default "content"
   */
  variant?: "title" | "subtitle" | "content" | "mini"
  /**
   * The size of the text (only applies to title and subtitle)
   * @default "medium"
   */
  size?: "small" | "medium" | "large"
  /**
   * The color variant of the text
   * @default "primary"
   */
  color?: "primary" | "secondary" | "tertiary" | "light" | "error" | "success"
  /**
   * Whether the text should be bold
   * @default false
   */
  bold?: boolean
  /**
   * Whether the text should be centered
   * @default false
   */
  center?: boolean
  /**
   * The content of the text
   */
  children: ReactNode
  /**
   * Custom className
   */
  className?: string
}

function Text({
  variant = "content",
  size = "medium",
  color = "primary",
  bold = false,
  center = false,
  children,
  className = "",
  ...props
}: TextProps) {
  const classNames = [
    "text",
    `text--${variant}`,
    variant === "title" || variant === "subtitle" ? `text--${size}` : "",
    `text--${color}`,
    bold && "text--bold",
    center && "text--center",
    className
  ]
    .filter(Boolean)
    .join(" ")

  // Use semantic HTML elements based on variant
  const Component = variant === "title" ? "h1" : variant === "subtitle" ? "h2" : "span"

  return (
    <Component className={classNames} {...props}>
      {children}
    </Component>
  )
}

export default Text

