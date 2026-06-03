/**
 * Displays a user image with text fallback initials.
 */
export class XAvatar extends HTMLElement {
	public static readonly tagName = "uix-avatar";
	private readonly image: HTMLImageElement;
	private readonly fallback: HTMLSpanElement;

	public static get observedAttributes(): string[] {
		return ["alt", "fallback", "src"];
	}

	public constructor() {
		super();
		const root = this.attachShadow({ mode: "open" });
		root.innerHTML = `
			<style>
				:host { display: inline-block; width: 2.5rem; height: 2.5rem; vertical-align: middle; }
				[part="frame"] { display: grid; width: 100%; height: 100%; overflow: hidden; place-items: center; border-radius: 999px; background: #e2e8f0; color: #334155; font: 600 0.875rem/1 system-ui, sans-serif; }
				img { width: 100%; height: 100%; object-fit: cover; }
			</style>
			<span part="frame">
				<img part="image" hidden />
				<span part="fallback"></span>
			</span>
		`;
		const image = root.querySelector("img");
		const fallback = root.querySelector('[part="fallback"]');
		if (!image || !(fallback instanceof HTMLSpanElement)) {
			throw new Error("Avatar internals missing");
		}
		this.image = image;
		this.fallback = fallback;
	}

	public connectedCallback(): void {
		this.sync();
	}

	public attributeChangedCallback(): void {
		this.sync();
	}

	/**
	 * Synchronizes image and fallback content from host attributes.
	 */
	private sync(): void {
		const src = this.getAttribute("src") ?? "";
		this.image.hidden = src.length === 0;
		this.image.src = src;
		this.image.alt = this.getAttribute("alt") ?? "";
		this.fallback.textContent = this.getAttribute("fallback") ?? "?";
	}
}
