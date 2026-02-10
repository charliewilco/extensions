export class XCard extends HTMLElement {
  public static readonly tagName = "x-card";

  public constructor() {
    super();
    const root = this.attachShadow({ mode: "open" });
    root.innerHTML = `
      <style>
        :host { display: block; border: 1px solid #e2e8f0; border-radius: 0.75rem; padding: 1rem; background: white; }
      </style>
      <slot></slot>
    `;
  }
}
