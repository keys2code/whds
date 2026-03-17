import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"

import { cn } from "@keys2design/whds-ui/lib/utils"
import {
  badgeVariants,
  type BadgeSize,
  type BadgeVariant,
} from "./badge-variants.js"

interface BadgeProps extends useRender.ComponentProps<"span"> {
  variant?: BadgeVariant
  size?: BadgeSize
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