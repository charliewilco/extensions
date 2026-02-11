/**
 * Renders a shimmering skeleton placeholder block.
 */
export class XSkeleton extends HTMLElement {
	public static readonly tagName = "uix-skeleton";

	public constructor() {
		super();
		const root = this.attachShadow({ mode: "open" });
		root.innerHTML = `
      <style>
        :host {
          display: inline-block;
          width: var(--uix-skeleton-width, 100%);
          height: var(--uix-skeleton-height, 1rem);
          border-radius: 0.25rem;
          background: linear-gradient(90deg, #e2e8f0 25%, #f8fafc 50%, #e2e8f0 75%);
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
        }
        @keyframes shimmer { from { background-position: 200% 0; } to { background-position: -200% 0; } }
      </style>
    `;
	}
}
