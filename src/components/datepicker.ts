export class XDatepicker extends HTMLElement {
  public static readonly tagName = "x-datepicker";
  private readonly input: HTMLInputElement;

  public constructor() {
    super();
    const root = this.attachShadow({ mode: "open" });
    root.innerHTML = `
      <style>
        :host { display: inline-block; }
        input { padding: 0.5rem; border: 1px solid #cbd5e1; border-radius: 0.5rem; }
      </style>
      <input type="date" />
    `;
    const input = root.querySelector("input");
    if (!input) throw new Error("Date input not found");
    this.input = input;
    this.input.addEventListener("change", () => {
      this.setAttribute("value", this.input.value);
      this.dispatchEvent(new CustomEvent("change", { detail: { value: this.input.value } }));
    });
  }

  public connectedCallback(): void {
    this.input.value = this.getAttribute("value") ?? "";
  }
}
