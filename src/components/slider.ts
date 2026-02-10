/**
 * A range slider that mirrors its value to host attributes and output text.
 */
export class XSlider extends HTMLElement {
	public static readonly tagName = "x-slider";
	private readonly range: HTMLInputElement;

	public constructor() {
		super();
		const root = this.attachShadow({ mode: "open" });
		root.innerHTML = `<input type="range" /><output></output>`;
		const range = root.querySelector("input");
		if (!range) throw new Error("Slider input missing");
		this.range = range;
		this.range.addEventListener("input", () => this.sync());
	}

	public connectedCallback(): void {
		this.range.min = this.getAttribute("min") ?? "0";
		this.range.max = this.getAttribute("max") ?? "100";
		this.range.step = this.getAttribute("step") ?? "1";
		this.range.value = this.getAttribute("value") ?? this.range.min;
		this.sync();
	}

	/**
	 * Synchronizes the internal range value with output text and host attributes.
	 */
	private sync(): void {
		const output = this.shadowRoot?.querySelector("output");
		if (!output) return;
		output.textContent = this.range.value;
		this.setAttribute("value", this.range.value);
		this.dispatchEvent(
			new CustomEvent("change", { detail: { value: this.range.value } }),
		);
	}
}
