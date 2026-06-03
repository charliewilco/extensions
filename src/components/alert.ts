/**
 * A message surface for status, warning, and error states.
 */
export class XAlert extends HTMLElement {
	public static readonly tagName = "uix-alert";
	private readonly container: HTMLDivElement;

	public static get observedAttributes(): string[] {
		return ["tone"];
	}

	public constructor() {
		super();
		const root = this.attachShadow({ mode: "open" });
		root.innerHTML = `
			<style>
				:host { display: block; }
				[part="container"] { border: 1px solid #bfdbfe; border-radius: 0.5rem; padding: 0.75rem 1rem; background: #eff6ff; color: #1e3a8a; }
				[part="container"][data-tone="success"] { border-color: #bbf7d0; background: #f0fdf4; color: #166534; }
				[part="container"][data-tone="warning"] { border-color: #fde68a; background: #fffbeb; color: #92400e; }
				[part="container"][data-tone="danger"] { border-color: #fecaca; background: #fef2f2; color: #991b1b; }
				[part="title"] { display: block; font-weight: 600; }
				[part="description"] { display: block; margin-top: 0.25rem; }
			</style>
			<div part="container" role="status" data-tone="info">
				<strong part="title"><slot name="title"></slot></strong>
				<span part="description"><slot></slot></span>
			</div>
		`;
		const container = root.querySelector("div");
		if (!container) throw new Error("Alert container missing");
		this.container = container;
	}

	public connectedCallback(): void {
		this.sync();
	}

	public attributeChangedCallback(): void {
		this.sync();
	}

	/**
	 * Synchronizes the visual tone and live-region role.
	 */
	private sync(): void {
		const tone = this.getAttribute("tone") ?? "info";
		this.container.dataset.tone = tone;
		this.container.setAttribute("role", tone === "danger" ? "alert" : "status");
	}
}
