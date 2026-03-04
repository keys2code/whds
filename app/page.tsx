
import { ComponentExample } from "@/components/component-example";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Pattern } from "@/components/filter-example";

export default function Page() {
	return (
		<div className="flex flex-col items-center gap-6 py-8">
			<ThemeToggle />
			<ComponentExample />
			<Pattern />
		</div>
	);
}