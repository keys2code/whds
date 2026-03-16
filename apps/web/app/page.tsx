import { Button } from "@keys2design/whds-ui/components/button"
import { Badge as ReuiBadge } from "@keys2design/whds-ui/components/reui/badge"
import { Switch } from "@keys2design/whds-ui/components/switch"

export default function Page() {
  return (
    <div className="flex min-h-svh p-6">
      <div className="flex max-w-md min-w-0 flex-col gap-4 text-sm leading-loose">
        <div>
          <h1 className="font-medium">Project ready!</h1>
          <p>You may now add components and start building.</p>
          <p>We&apos;ve already added the button component for you.</p>
          <div className="mt-2 flex gap-2">
            <ReuiBadge variant="secondary">Secondary</ReuiBadge>
            <ReuiBadge variant="outline" size="default">
              Outline
            </ReuiBadge>
            <ReuiBadge variant="success-light">Success</ReuiBadge>
          </div>
          <Button className="mt-2">Default</Button>
        </div>
        <div className="text-muted-foreground font-mono text-xs">
          (Press <kbd>d</kbd> to toggle dark mode)
        </div>
        <Switch />
      </div>
    </div>
  )
}
