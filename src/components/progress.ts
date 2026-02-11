/**
 * A progress bar that mirrors value/max attributes to ARIA state.
 */
export class XProgress extends HTMLElement {
	public static readonly tagName = "x-progress";
	private readonly indicator: HTMLDivElement;

	public static get observedAttributes(): string[] {
		return ["value", "max"];
	}

	public constructor() {
		super();
		const root = this.attachShadow({ mode: "open" });
		root.innerHTML = `
      <style>
        [part="track"] { width: 100%; height: 0.5rem; border-radius: 999px; background: #e2e8f0; overflow: hidden; }
        [part="indicator"] { height: 100%; background: #2563eb; width: 0%; transition: width 0.15s ease; }
      </style>
      <div part="track" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0">
        <div part="indicator"></div>
      </div>
    `;
		const indicator = root.querySelector(
			'[part="indicator"]',
		) as HTMLDivElement | null;
		if (!indicator) throw new Error("Progress indicator missing");
		this.indicator = indicator;
	}

	public connectedCallback(): void {
		this.sync();
	}

	public attributeChangedCallback(): void {
		this.sync();
	}

	/**
	 * Synchronizes value and max attributes to width and ARIA state.
	 */
	private sync(): void {
		const track = this.shadowRoot?.querySelector(
			'[role="progressbar"]',
		) as HTMLDivElement | null;
		if (!track) return;
		const max = Number(this.getAttribute("max") ?? "100");
		const value = Number(this.getAttribute("value") ?? "0");
		const safeMax = Number.isFinite(max) && max > 0 ? max : 100;
		const clamped = Math.min(
			Math.max(Number.isFinite(value) ? value : 0, 0),
			safeMax,
		);
		const percent = (clamped / safeMax) * 100;

		track.setAttribute("aria-valuemax", String(safeMax));
		track.setAttribute("aria-valuenow", String(clamped));
		this.indicator.style.width = `${percent}%`;
	}
}
