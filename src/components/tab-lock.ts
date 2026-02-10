import { toBool } from "./utils";

const selector =
	"a[href], button, textarea, input, select, [tabindex]:not([tabindex='-1'])";

/**
 * Traps focus within the component when the active attribute is set.
 */
export class XTabLock extends HTMLElement {
	public static readonly tagName = "x-tab-lock";

	public connectedCallback(): void {
		this.addEventListener("keydown", this.handleKeyDown);
	}

	public disconnectedCallback(): void {
		this.removeEventListener("keydown", this.handleKeyDown);
	}

	/**
	 * Handles keyboard tab navigation to loop focus within focusable children.
	 */
	private readonly handleKeyDown = (event: KeyboardEvent): void => {
		if (event.key !== "Tab" || !toBool(this.getAttribute("active"))) {
			return;
		}
		const focusable = [...this.querySelectorAll<HTMLElement>(selector)].filter(
			(node) => !node.hasAttribute("disabled"),
		);
		if (focusable.length === 0) {
			return;
		}
		const first = focusable[0];
		const last = focusable[focusable.length - 1];
		if (!first || !last) return;

		if (event.shiftKey && document.activeElement === first) {
			event.preventDefault();
			last.focus();
		} else if (!event.shiftKey && document.activeElement === last) {
			event.preventDefault();
			first.focus();
		}
	};
}
