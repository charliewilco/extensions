/**
 * Adds click and keyboard-based sorting to table header cells.
 */
export class XSortableTable extends HTMLElement {
  public static readonly tagName = "x-sortable-table";

  public constructor() {
    super();
    const root = this.attachShadow({ mode: "open" });
    root.innerHTML = `<slot></slot>`;
  }

  public connectedCallback(): void {
    const table = this.querySelector("table");
    if (!table) return;
    const headers = table.querySelectorAll("th");
    headers.forEach((header, index) => {
      header.setAttribute("tabindex", "0");
      header.style.cursor = "pointer";
      const activate = () => this.sortByColumn(table, index);
      header.addEventListener("click", activate);
      header.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          activate();
        }
      });
    });
  }

  /**
   * Sorts rows in the table body using locale-aware comparison for a column.
   */
  private sortByColumn(table: HTMLTableElement, columnIndex: number): void {
    const tbody = table.tBodies.item(0);
    if (!tbody) return;
    const rows = Array.from(tbody.querySelectorAll("tr"));
    rows.sort((a, b) => {
      const aText = a.cells.item(columnIndex)?.textContent?.trim() ?? "";
      const bText = b.cells.item(columnIndex)?.textContent?.trim() ?? "";
      return aText.localeCompare(bText, undefined, { numeric: true, sensitivity: "base" });
    });
    tbody.replaceChildren(...rows);
  }
}
