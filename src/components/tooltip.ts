/**
 * Shows short helper text for slotted trigger content.
 */
export class XTooltip extends HTMLElement {
	public static readonly tagName = "uix-tooltip";
	private readonly content: HTMLSpanElement;

	public static get observedAttributes(): string[] {
		return ["text"];
	}

	public constructor() {
		super();
		const root = this.attachShadow({ mode: "open" });
		root.innerHTML = `
			<style>
				:host { position: relative; display: inline-flex; }
				[part="content"] { position: absolute; bottom: calc(100% + 0.4rem); left: 50%; z-index: 1; width: max-content; max-width: 16rem; transform: translateX(-50%); border-radius: 0.375rem; padding: 0.35rem 0.5rem; background: #111827; color: white; font: 0.75rem/1.3 system-ui, sans-serif; opacity: 0; pointer-events: none; transition: opacity 120ms ease; }
				:host(:hover) [part="content"], :host(:focus-within) [part="content"] { opacity: 1; }
			</style>
			<slot></slot>
			<span part="content" role="tooltip"></span>
		`;
		const content = root.querySelector('[part="content"]');
		if (!content || !(content instanceof HTMLSpanElement)) {
			throw new Error("Tooltip content missing");
		}
		this.content = content;
	}

	public connectedCallback(): void {
		this.sync();
	}

	public attributeChangedCallback(): void {
		this.sync();
	}

	/**
	 * Synchronizes tooltip text from the host attribute.
	 */
	private sync(): void {
		this.content.textContent = this.getAttribute("text") ?? "";
	}
}
