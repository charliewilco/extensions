/**
 * Groups related button elements with shared spacing styles.
 */
export class XButtonGroup extends HTMLElement {
  public static readonly tagName = "x-button-group";

  public constructor() {
    super();
    const root = this.attachShadow({ mode: "open" });
    root.innerHTML = `
      <style>
        :host { display: inline-flex; gap: var(--x-button-group-gap, 0.5rem); }
        ::slotted(button) { border-radius: 0.5rem; }
      </style>
      <slot></slot>
    `;
  }
}
