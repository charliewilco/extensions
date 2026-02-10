export class XCombobox extends HTMLElement {
  public static readonly tagName = "x-combobox";
  private readonly input: HTMLInputElement;
  private readonly list: HTMLDataListElement;

  public constructor() {
    super();
    const root = this.attachShadow({ mode: "open" });
    root.innerHTML = `
      <style>
        :host { display: inline-block; }
        input { padding: .5rem; border: 1px solid #cbd5e1; border-radius: .5rem; min-width: 14rem; }
      </style>
      <input list="choices" />
      <datalist id="choices"></datalist>
    `;
    const input = root.querySelector("input");
    const list = root.querySelector("datalist");
    if (!input || !list) throw new Error("Combobox internals missing");
    this.input = input;
    this.list = list;
  }

  public connectedCallback(): void {
    const options = (this.getAttribute("options") ?? "").split(",").map((opt) => opt.trim()).filter(Boolean);
    this.list.replaceChildren(...options.map((value) => {
      const option = document.createElement("option");
      option.value = value;
      return option;
    }));
  }
}
