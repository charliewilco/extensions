/**
 * A compact label for counts, statuses, and metadata.
 */
export class XBadge extends HTMLElement {
	public static readonly tagName = "uix-badge";
	private readonly badge: HTMLSpanElement;

	public static get observedAttributes(): string[] {
		return ["tone"];
	}

	public constructor() {
		super();
		const root = this.attachShadow({ mode: "open" });
		root.innerHTML = `
			<style>
				:host { display: inline-block; vertical-align: middle; }
				[part="badge"] { display: inline-flex; align-items: center; min-height: 1.5rem; border: 1px solid #cbd5e1; border-radius: 999px; padding: 0 0.5rem; background: #f8fafc; color: #334155; font: 500 0.75rem/1 system-ui, sans-serif; white-space: nowrap; }
				[part="badge"][data-tone="success"] { border-color: #86efac; background: #dcfce7; color: #166534; }
				[part="badge"][data-tone="warning"] { border-color: #fcd34d; background: #fef3c7; color: #92400e; }
				[part="badge"][data-tone="danger"] { border-color: #fca5a5; background: #fee2e2; color: #991b1b; }
			</style>
			<span part="badge" data-tone="neutral"><slot></slot></span>
		`;
		const badge = root.querySelector("span");
		if (!badge) throw new Error("Badge element missing");
		this.badge = badge;
	}

	public connectedCallback(): void {
		this.sync();
	}

	public attributeChangedCallback(): void {
		this.sync();
	}

	/**
	 * Synchronizes the visual tone.
	 */
	private sync(): void {
		this.badge.dataset.tone = this.getAttribute("tone") ?? "neutral";
	}
}
