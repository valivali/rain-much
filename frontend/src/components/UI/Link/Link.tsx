import { type AnchorHTMLAttributes, type ReactNode } from "react"
import "./Link.scss"

export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Visual style of the link */
  variant?: "primary" | "secondary" | "muted"
  /** Emphasize link with stronger weight */
  emphasis?: boolean
  /** Render link to open in a new tab with security attrs */
  external?: boolean
  children: ReactNode
}

function Link({
  variant = "primary",
  emphasis = false,
  external = false,
  className = "",
  children,
  ...props
}: LinkProps) {
  const classNames = ["link", `link--${variant}`, emphasis && "link--emphasis", className]
    .filter(Boolean)
    .join(" ")

  const rel = external ? [props.rel, "noopener", "noreferrer"].filter(Boolean).join(" ") : props.rel
  const target = external ? "_blank" : props.target

  return (
    <a className={classNames} {...props} rel={rel} target={target}>
      {children}
    </a>
  )
}

export default Link
