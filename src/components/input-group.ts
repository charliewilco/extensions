/**
 * Wraps form controls and related adornments in a shared container.
 */
export class XInputGroup extends HTMLElement {
	public static readonly tagName = "x-input-group";

	public constructor() {
		super();
		const root = this.attachShadow({ mode: "open" });
		root.innerHTML = `
      <style>
        :host { display: inline-flex; align-items: center; border: 1px solid #cbd5e1; border-radius: 0.5rem; overflow: hidden; }
        ::slotted(input) { border: 0; outline: 0; padding: 0.5rem; min-width: 14rem; }
        ::slotted(*) { padding-inline: 0.5rem; }
      </style>
      <slot></slot>
    `;
	}
}
