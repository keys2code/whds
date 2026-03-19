import { InfoIcon } from "@phosphor-icons/react/dist/ssr"
import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from "@keys2design/whds-ui/components/alert"
import { Button } from "@keys2design/whds-ui/components/button"
import { Input } from "@keys2design/whds-ui/components/input"
import { Label } from "@keys2design/whds-ui/components/label"
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
        <Alert className="bg-card/80 shadow-xs">
          <InfoIcon className="text-muted-foreground!" weight="regular" />
          <AlertTitle>Alert example</AlertTitle>
          <AlertDescription>
            Components from <code>@keys2design/whds-ui</code> are rendering on the
            local demo page, including badges, buttons, switches, and this alert.
          </AlertDescription>
          <AlertAction>
            <Button size="xs" variant="outline">
              Review
            </Button>
          </AlertAction>
        </Alert>
        <div className="bg-card/80 flex items-center justify-between rounded-md border p-3 shadow-xs">
          <div className="space-y-1">
            <Label htmlFor="demo-updates">Product updates</Label>
            <p className="text-muted-foreground text-xs leading-relaxed">
              Send release notes and design-system changes to collaborators.
            </p>
          </div>
          <Switch id="demo-updates" defaultChecked />
        </div>
        <div className="space-y-2">
          <Label htmlFor="demo-email">Team email</Label>
          <Input
            id="demo-email"
            type="email"
            defaultValue="design@keys2code.com"
          />
          <p className="text-muted-foreground text-xs leading-relaxed">
            Use inputs, labels, and alerts together to prototype realistic form
            flows.
          </p>
        </div>
      </div>
    </div>
  )
}
