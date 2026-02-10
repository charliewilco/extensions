import { toBool } from "./utils";

/**
 * A basic dropdown menu built with native <details>/<summary>.
 */
export class XDropdownMenu extends HTMLElement {
  public static readonly tagName = "x-dropdown-menu";
  private readonly details: HTMLDetailsElement;

  public static get observedAttributes(): string[] {
    return ["open"];
  }

  public constructor() {
    super();
    const root = this.attachShadow({ mode: "open" });
    root.innerHTML = `
      <style>
        details { position: relative; display: inline-block; }
        [part="menu"] { position: absolute; top: calc(100% + 0.25rem); right: 0; min-width: 12rem; border: 1px solid #cbd5e1; border-radius: 0.5rem; padding: 0.5rem; background: white; }
      </style>
      <details>
        <summary part="trigger"><slot name="trigger">Menu</slot></summary>
        <div part="menu"><slot></slot></div>
      </details>
    `;
    const details = root.querySelector("details");
    if (!details) throw new Error("Details not found");
    this.details = details;
    this.details.addEventListener("toggle", () => {
      this.toggleAttribute("open", this.details.open);
    });
  }

  public connectedCallback(): void { this.sync(); }
  public attributeChangedCallback(): void { this.sync(); }

  /**
   * Synchronizes the host open attribute with the internal details element.
   */
  private sync(): void {
    this.details.open = toBool(this.getAttribute("open"));
  }
}
