import { toBool } from "./utils";

/**
 * A collapsible panel controlled by an internal button.
 */
export class XCollapsible extends HTMLElement {
	public static readonly tagName = "uix-collapsible";
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
        :host { display: block; }
        [part="trigger"] { display: inline-flex; align-items: center; gap: 0.35rem; }
        [part="panel"] { margin-top: 0.5rem; }
      </style>
      <button part="trigger" type="button" aria-expanded="false">
        <slot name="trigger">Toggle</slot>
      </button>
      <div part="panel" hidden>
        <slot></slot>
      </div>
    `;
		const trigger = root.querySelector("button");
		const panel = root.querySelector("div");
		if (!trigger || !panel) throw new Error("Collapsible internals missing");
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
	 * Whether the collapsible panel is currently expanded.
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
