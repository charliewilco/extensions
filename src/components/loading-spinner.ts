/**
 * Displays an animated loading spinner.
 */
export class XLoadingSpinner extends HTMLElement {
  public static readonly tagName = "x-loading-spinner";

  public constructor() {
    super();
    const root = this.attachShadow({ mode: "open" });
    root.innerHTML = `
      <style>
        :host { display: inline-block; width: var(--x-spinner-size, 2rem); aspect-ratio: 1; border-radius: 50%; border: 3px solid #cbd5e1; border-top-color: #0f172a; animation: spin 0.8s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
      </style>
    `;
  }
}
