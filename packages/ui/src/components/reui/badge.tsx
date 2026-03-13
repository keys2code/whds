import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@workspace/ui/lib/utils"

const badgeVariants = cva(
  "rounded-sm relative inline-flex shrink-0 items-center justify-center w-fit border border-transparent font-medium whitespace-nowrap outline-none transition-shadow focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*=size-])]:size-3",
  {
    variants: {
      variant: {
        default: "bg-neutral-700 text-neutral-100 dark:bg-neutral-200 dark:text-neutral-800",
        primary: "bg-fuchsia-100 text-fuchsia-600 dark:bg-fuchsia-900/30 dark:text-fuchsia-400", // "bg-primary text-primary-foreground",
        outline: "border-border bg-transparent dark:bg-input/32",
        secondary: "bg-secondary text-secondary-foreground",
        info: "bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-400", // "bg-info text-white",
        success: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400", // "bg-success text-white",
        warning: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400", // "bg-warning text-white",
        destructive: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400", // "bg-destructive text-white",
        "primary-outline":
          "bg-background border-border border-primary/20 text-primary dark:bg-input/30 dark:border-primary/40",
        "warning-outline":
          "bg-background border-border border-warning/20 text-warning-foreground dark:bg-input/30 dark:border-warning/40",
        "success-outline":
          "bg-background border-border border-success/20 text-success-foreground dark:bg-input/30 dark:border-success/40",
        "info-outline":
          "bg-background border-border border-info/20 text-info-foreground dark:bg-input/30 dark:border-info/40",
        "destructive-outline":
          "bg-background border-border border-destructive/15 text-destructive-foreground dark:bg-input/30 dark:border-destructive/40",
      },
      size: {
        xs: "px-0.5 py-0.25 text-[0.6rem] leading-none h-3.5 min-w-4 gap-1",
        sm: "px-0.5 py-0.25 text-[0.625rem] leading-none h-4 min-w-4.5 gap-1",
        default: "px-1 py-0.5 text-xs h-4.5 min-w-5 gap-1",
        lg: "px-1.25 py-0.5 text-xs h-5.5 min-w-5.5 gap-1",
        xl: "px-1.5 py-0.75 text-sm h-6 min-w-6 gap-1.5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

interface BadgeProps extends useRender.ComponentProps<"span"> {
  variant?: VariantProps<typeof badgeVariants>["variant"]
  size?: VariantProps<typeof badgeVariants>["size"]
}

function Badge({ className, variant, size, render, ...props }: BadgeProps) {
  const defaultProps = {
    "data-slot": "badge",
    className: cn(badgeVariants({ variant, size, className })),
  }

  return useRender({
    defaultTagName: "span",
    render,
    props: mergeProps<"span">(defaultProps, props),
  })
}

export { Badge, badgeVariants, type BadgeProps }