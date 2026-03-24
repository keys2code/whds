import { InfoIcon } from "@phosphor-icons/react/dist/ssr"
import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from "@keys2design/whds-ui/components/alert"
import { Button } from "@keys2design/whds-ui/components/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@keys2design/whds-ui/components/dropdown-menu"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@keys2design/whds-ui/components/field"
import { Input } from "@keys2design/whds-ui/components/input"
import { Kbd, KbdGroup } from "@keys2design/whds-ui/components/kbd"
import { Label } from "@keys2design/whds-ui/components/label"
import { Badge as ReuiBadge } from "@keys2design/whds-ui/components/reui/badge"
import { Switch } from "@keys2design/whds-ui/components/switch"
import { FileUpload } from "@keys2design/whds-ui/components/file-upload"

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
        <div className="space-y-2">
          <Label htmlFor="demo-invite">Invite teammate</Label>
          <div className="flex items-center gap-2">
            <Input
              id="demo-invite"
              type="email"
              placeholder="name@company.com"
              className="flex-1"
            />
            <Button size="sm">Send invite</Button>
          </div>
          <p className="text-muted-foreground text-xs leading-relaxed">
            Input groups work well for quick actions like invites, coupon codes,
            and search controls.
          </p>
        </div>
        <FieldGroup className="gap-3">
          <Field>
            <FieldLabel htmlFor="demo-project-name">Field example</FieldLabel>
            <Input
              id="demo-project-name"
              defaultValue="WHDS Marketing Site"
              aria-invalid="true"
            />
            <FieldDescription>
              Use field primitives when you want labels, descriptions, and
              validation to read as one cohesive unit.
            </FieldDescription>
            <FieldError>Project names need to stay under 20 characters.</FieldError>
          </Field>
        </FieldGroup>
        <div className="bg-card/80 flex items-center justify-between rounded-md border p-3 shadow-xs">
          <div className="space-y-1">
            <p className="font-medium">Kbd example</p>
            <p className="text-muted-foreground text-xs leading-relaxed">
              Show keyboard shortcuts inline anywhere you need compact guidance.
            </p>
          </div>
          <KbdGroup aria-label="Keyboard shortcut for command palette">
            <Kbd>Cmd</Kbd>
            <Kbd>K</Kbd>
          </KbdGroup>
        </div>
        <div className="bg-card/80 flex items-center justify-between rounded-md border p-3 shadow-xs">
          <div className="space-y-1">
            <p className="font-medium">Dropdown Menu example</p>
            <p className="text-muted-foreground text-xs leading-relaxed">
              Checkbox items with uncontrolled state.
            </p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger render={<Button variant="outline" size="sm">View options</Button>} />
            <DropdownMenuContent>
              <DropdownMenuLabel>Display</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuCheckboxItem defaultChecked>
                  Show status
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>
                  Show timestamp
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem defaultChecked>
                  Show assignee
                </DropdownMenuCheckboxItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <FileUpload />

      </div>
    </div>
  )
}
