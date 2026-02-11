/**
 * A semantic separator that supports horizontal and vertical orientations.
 */
export class XSeparator extends HTMLElement {
	public static readonly tagName = "x-separator";

	public static get observedAttributes(): string[] {
		return ["orientation"];
	}

	public constructor() {
		super();
		const root = this.attachShadow({ mode: "open" });
		root.innerHTML = `
      <style>
        :host { display: block; }
        [part="separator"] { background: #cbd5e1; }
        :host([orientation="vertical"]) [part="separator"] { width: 1px; height: 100%; min-height: 1.5rem; }
        :host(:not([orientation="vertical"])) [part="separator"] { width: 100%; height: 1px; }
      </style>
      <div part="separator" role="separator" aria-orientation="horizontal"></div>
    `;
	}

	public connectedCallback(): void {
		this.sync();
	}

	public attributeChangedCallback(): void {
		this.sync();
	}

	/**
	 * Synchronizes orientation semantics to internal role state.
	 */
	private sync(): void {
		const node = this.shadowRoot?.querySelector('[role="separator"]');
		if (!node) return;
		const orientation =
			this.getAttribute("orientation") === "vertical"
				? "vertical"
				: "horizontal";
		node.setAttribute("aria-orientation", orientation);
	}
}
