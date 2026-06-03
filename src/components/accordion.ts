import { toBool } from "./utils";

/**
 * A single accordion item with a trigger and expandable panel.
 */
export class XAccordion extends HTMLElement {
	public static readonly tagName = "uix-accordion";
	private readonly trigger: HTMLButtonElement;
	private readonly panel: HTMLDivElement;

	public static get observedAttributes(): string[] {
		return ["open"];
	}

	public constructor() {
		super();
		const root = this.attachShadow({ mode: "open" });
		root.innerHTML = `
			<style>
				:host { display: block; border-bottom: 1px solid #e2e8f0; }
				[part="trigger"] { display: flex; width: 100%; align-items: center; justify-content: space-between; gap: 0.75rem; border: 0; padding: 0.75rem 0; background: transparent; color: inherit; font: inherit; cursor: pointer; text-align: left; }
				[part="trigger"]::after { content: "+"; font-weight: 600; }
				[part="trigger"][aria-expanded="true"]::after { content: "-"; }
				[part="panel"] { padding: 0 0 0.75rem; }
			</style>
			<button part="trigger" type="button" aria-expanded="false">
				<slot name="trigger">Details</slot>
			</button>
			<div part="panel" hidden>
				<slot></slot>
			</div>
		`;
		const trigger = root.querySelector("button");
		const panel = root.querySelector("div");
		if (!trigger || !panel) throw new Error("Accordion internals missing");
		this.trigger = trigger;
		this.panel = panel;
		this.trigger.addEventListener("click", () => {
			this.open = !this.open;
			this.dispatchEvent(
				new CustomEvent("toggle", { detail: { open: this.open } }),
			);
		});
	}

	public connectedCallback(): void {
		this.sync();
	}

	public attributeChangedCallback(): void {
		this.sync();
	}

	/**
	 * Whether the accordion panel is currently expanded.
	 */
	public get open(): boolean {
		return toBool(this.getAttribute("open"));
	}

	public set open(value: boolean) {
		this.toggleAttribute("open", value);
	}

	/**
	 * Synchronizes host state to internal ARIA attributes.
	 */
	private sync(): void {
		this.trigger.setAttribute("aria-expanded", String(this.open));
		this.panel.hidden = !this.open;
	}
}
