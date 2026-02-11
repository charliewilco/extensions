import { toBool } from "./utils";

/**
 * A two-state toggle button.
 */
export class XToggle extends HTMLElement {
	public static readonly tagName = "uix-toggle";
	private readonly button: HTMLButtonElement;

	public static get observedAttributes(): string[] {
		return ["pressed"];
	}

	public constructor() {
		super();
		const root = this.attachShadow({ mode: "open" });
		root.innerHTML = `
      <style>
        button { border: 1px solid #cbd5e1; border-radius: 0.5rem; padding: 0.45rem 0.75rem; background: white; cursor: pointer; }
        button[aria-pressed="true"] { background: #e2e8f0; border-color: #94a3b8; }
      </style>
      <button type="button" aria-pressed="false"><slot>Toggle</slot></button>
    `;
		const button = root.querySelector("button");
		if (!button) throw new Error("Toggle button missing");
		this.button = button;
		this.button.addEventListener("click", () => {
			this.pressed = !this.pressed;
			this.dispatchEvent(
				new CustomEvent("change", { detail: { pressed: this.pressed } }),
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
	 * Whether the toggle is in the pressed state.
	 */
	public get pressed(): boolean {
		return toBool(this.getAttribute("pressed"));
	}

	public set pressed(value: boolean) {
		this.toggleAttribute("pressed", value);
	}

	/**
	 * Synchronizes host pressed state to the internal button.
	 */
	private sync(): void {
		this.button.setAttribute("aria-pressed", String(this.pressed));
	}
}
