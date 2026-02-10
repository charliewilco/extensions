import { toBool } from "./utils";

export class XSwitchToggle extends HTMLElement {
  public static readonly tagName = "x-switch-toggle";

  private readonly button: HTMLButtonElement;

  public static get observedAttributes(): string[] {
    return ["checked"];
  }

  public constructor() {
    super();
    const root = this.attachShadow({ mode: "open" });
    root.innerHTML = `
      <style>
        button { width: 3rem; border: 0; border-radius: 999px; padding: 0.2rem; cursor: pointer; background: #94a3b8; }
        button[aria-checked="true"] { background: #22c55e; }
        span { display: block; width: 1.25rem; height: 1.25rem; background: white; border-radius: 50%; transition: transform 0.15s ease; }
        button[aria-checked="true"] span { transform: translateX(1.35rem); }
      </style>
      <button role="switch" aria-checked="false" type="button"><span></span></button>
    `;
    const button = root.querySelector("button");
    if (!button) {
      throw new Error("Switch button not found");
    }
    this.button = button;
    this.button.addEventListener("click", () => {
      this.checked = !this.checked;
      this.dispatchEvent(new CustomEvent("change", { detail: { checked: this.checked } }));
    });
  }

  public attributeChangedCallback(): void {
    this.sync();
  }

  public connectedCallback(): void {
    this.sync();
  }

  public get checked(): boolean {
    return toBool(this.getAttribute("checked"));
  }

  public set checked(value: boolean) {
    this.toggleAttribute("checked", value);
  }

  private sync(): void {
    this.button.setAttribute("aria-checked", String(this.checked));
  }
}
