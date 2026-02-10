import { toBool } from "./utils";

export class XCustomCheckbox extends HTMLElement {
  public static readonly tagName = "x-custom-checkbox";
  private readonly checkbox: HTMLInputElement;

  public static get observedAttributes(): string[] {
    return ["checked"];
  }

  public constructor() {
    super();
    const root = this.attachShadow({ mode: "open" });
    root.innerHTML = `
      <label>
        <input type="checkbox" />
        <span><slot></slot></span>
      </label>
      <style>
        label { display: inline-flex; align-items: center; gap: 0.5rem; cursor: pointer; }
      </style>
    `;
    const checkbox = root.querySelector("input");
    if (!checkbox) {
      throw new Error("Checkbox not found");
    }
    this.checkbox = checkbox;
    this.checkbox.addEventListener("change", () => {
      this.checked = this.checkbox.checked;
      this.dispatchEvent(new CustomEvent("change", { detail: { checked: this.checked } }));
    });
  }

  public connectedCallback(): void {
    this.sync();
  }

  public attributeChangedCallback(): void {
    this.sync();
  }

  public get checked(): boolean {
    return toBool(this.getAttribute("checked"));
  }

  public set checked(value: boolean) {
    this.toggleAttribute("checked", value);
  }

  private sync(): void {
    this.checkbox.checked = this.checked;
  }
}
