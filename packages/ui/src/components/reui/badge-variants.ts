import { cva, type VariantProps } from "class-variance-authority"

const badgeVariants = cva(
  "rounded-sm relative inline-flex shrink-0 items-center justify-center w-fit border border-transparent font-medium whitespace-nowrap outline-none transition-shadow focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*=size-])]:size-3",
  {
    variants: {
      size: {
        default:
          "h-5.5 min-w-5.5 px-[calc(--spacing(1)-1px)] text-sm sm:h-4.5 sm:min-w-4.5 sm:text-xs",
        lg: "h-6.5 min-w-6.5 px-[calc(--spacing(1.5)-1px)] text-base sm:h-5.5 sm:min-w-5.5 sm:text-sm",
        sm: "h-5 min-w-5 rounded-[.25rem] px-[calc(--spacing(1)-1px)] text-xs sm:h-4 sm:min-w-4 sm:text-[.625rem]",
      },
      variant: {
        default: "bg-primary text-primary-foreground",
        outline: "border-border bg-transparent dark:bg-input/32",
        secondary: "bg-secondary text-secondary-foreground",
        info: "bg-info text-white",
        success: "bg-success text-white",
        warning: "bg-warning text-white",
        destructive: "bg-destructive text-white",
        "warning-light":
          "bg-warning/10 border-none text-warning-foreground dark:bg-warning/20",
        "success-light":
          "bg-success/10 border-none text-success-foreground dark:bg-success/20",
        "info-light":
          "bg-info/10 border-none text-info-foreground dark:bg-info/20",
        "destructive-light":
          "bg-destructive/10 border-none text-destructive-foreground dark:bg-destructive/15",
        "primary-outline":
          "bg-background border-border text-primary dark:bg-input/30",
        "warning-outline":
          "bg-background border-border text-warning-foreground dark:bg-input/30",
        "success-outline":
          "bg-background border-border text-success-foreground dark:bg-input/30",
        "info-outline":
          "bg-background border-border text-info-foreground dark:bg-input/30",
        "destructive-outline":
          "bg-background border-border text-destructive-foreground dark:bg-input/30",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

type BadgeVariantProps = VariantProps<typeof badgeVariants>
type BadgeVariant = BadgeVariantProps["variant"]
type BadgeSize = BadgeVariantProps["size"]

export {
  badgeVariants,
  type BadgeVariantProps,
  type BadgeVariant,
  type BadgeSize,
}
