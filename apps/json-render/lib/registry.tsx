import type { ComponentRegistry, ComponentRenderProps } from "@json-render/react"

type StackProps = {
  direction?: "row" | "column" | null
  gap?: "sm" | "md" | "lg" | null
  align?: "start" | "center" | "end" | null
}

type CardProps = {
  title?: string | null
  description?: string | null
  variant?: "default" | "outlined" | "elevated" | null
}

type HeadingProps = {
  text: string
  level?: "h1" | "h2" | "h3" | "h4" | null
}

type TextProps = {
  content: string
  variant?: "body" | "caption" | "label" | "code" | null
  muted?: boolean | null
}

type ButtonProps = {
  label: string
  action?: string | null
  variant?: "primary" | "secondary" | "ghost" | "destructive" | null
  size?: "sm" | "md" | "lg" | null
  disabled?: boolean | null
}

type InputProps = {
  name: string
  label?: string | null
  placeholder?: string | null
  type?: "text" | "email" | "password" | "number" | "url" | null
  required?: boolean | null
}

type BadgeProps = {
  label: string
  variant?: "default" | "success" | "warning" | "error" | "info" | null
}

function Stack({ element, children }: ComponentRenderProps<StackProps>) {
  const { direction, gap, align } = element.props
  const directionClass = direction === "row" ? "flex-row" : "flex-col"
  const gapClass = gap === "sm" ? "gap-2" : gap === "lg" ? "gap-6" : "gap-4"
  const alignClass =
    align === "center" ? "items-center" : align === "end" ? "items-end" : "items-start"

  return <div className={`flex ${directionClass} ${gapClass} ${alignClass}`}>{children}</div>
}

function Card({ element, children }: ComponentRenderProps<CardProps>) {
  const { title, description, variant } = element.props
  const variantClass =
    variant === "outlined"
      ? "border border-border bg-transparent"
      : variant === "elevated"
        ? "shadow-lg bg-card border-0"
        : "border border-border bg-card"

  return (
    <div className={`rounded-xl p-6 ${variantClass}`}>
      {title && <h3 className="mb-1 text-lg font-semibold text-card-foreground">{title}</h3>}
      {description && <p className="mb-4 text-sm text-muted-foreground">{description}</p>}
      {children}
    </div>
  )
}

function Heading({ element }: ComponentRenderProps<HeadingProps>) {
  const { text, level } = element.props
  const tag = level ?? "h2"
  const sizeClass =
    tag === "h1"
      ? "text-4xl font-bold tracking-tight"
      : tag === "h2"
        ? "text-3xl font-semibold"
        : tag === "h3"
          ? "text-2xl font-semibold"
          : "text-xl font-medium"

  const Tag = tag as "h1" | "h2" | "h3" | "h4"
  return <Tag className={`${sizeClass} text-foreground`}>{text}</Tag>
}

function Text({ element }: ComponentRenderProps<TextProps>) {
  const { content, variant, muted } = element.props
  const variantClass =
    variant === "caption"
      ? "text-xs"
      : variant === "label"
        ? "text-sm font-medium"
        : variant === "code"
          ? "font-mono text-sm bg-muted px-1.5 py-0.5 rounded"
          : "text-base"

  const mutedClass = muted ? "text-muted-foreground" : "text-foreground"
  return <p className={`${variantClass} ${mutedClass}`}>{content}</p>
}

function Button({ element, onAction }: ComponentRenderProps<ButtonProps>) {
  const { label, action, variant, size, disabled } = element.props
  const variantClass =
    variant === "secondary"
      ? "bg-secondary text-secondary-foreground hover:bg-secondary/80"
      : variant === "ghost"
        ? "bg-transparent text-foreground hover:bg-accent"
        : variant === "destructive"
          ? "bg-destructive text-destructive-foreground hover:bg-destructive/90"
          : "bg-primary text-primary-foreground hover:bg-primary/90"

  const sizeClass =
    size === "sm" ? "h-8 px-3 text-xs" : size === "lg" ? "h-12 px-6 text-base" : "h-10 px-4 text-sm"

  const handleClick = () => {
    if (action && onAction) {
      onAction({ name: action, params: {} })
    }
  }

  return (
    <button
      className={`inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 ${variantClass} ${sizeClass}`}
      disabled={disabled ?? false}
      onClick={handleClick}
    >
      {label}
    </button>
  )
}

function Input({ element }: ComponentRenderProps<InputProps>) {
  const { name, label, placeholder, type, required } = element.props
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={name} className="text-sm font-medium leading-none text-foreground">
          {label}
          {required && <span className="ml-0.5 text-destructive">*</span>}
        </label>
      )}
      <input
        id={name}
        name={name}
        type={type ?? "text"}
        placeholder={placeholder ?? ""}
        required={required ?? false}
        className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      />
    </div>
  )
}

function Badge({ element }: ComponentRenderProps<BadgeProps>) {
  const { label, variant } = element.props
  const variantClass =
    variant === "success"
      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      : variant === "warning"
        ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
        : variant === "error"
          ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
          : variant === "info"
            ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
            : "bg-muted text-muted-foreground"

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${variantClass}`}
    >
      {label}
    </span>
  )
}

function Divider() {
  return <hr className="border-border" />
}

export const registry: ComponentRegistry = {
  Stack,
  Card,
  Heading,
  Text,
  Button,
  Input,
  Badge,
  Divider,
}
