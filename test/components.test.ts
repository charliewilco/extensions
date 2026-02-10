import { beforeEach, describe, expect, it, spyOn } from "bun:test";
import { XButtonGroup } from "../src/components/button-group";
import { XInputGroup } from "../src/components/input-group";
import { XLoadingSpinner } from "../src/components/loading-spinner";
import { XSwitchToggle } from "../src/components/switch-toggle";
import { XCustomCheckbox } from "../src/components/custom-checkbox";
import { XToastNotification } from "../src/components/toast-notification";
import { XSkeleton } from "../src/components/skeleton";
import { XDropdownMenu } from "../src/components/dropdown-menu";
import { XSortableTable } from "../src/components/sortable-table";
import { XTabLock } from "../src/components/tab-lock";
import { XCard } from "../src/components/card";
import { XDatepicker } from "../src/components/datepicker";
import { XCarousel } from "../src/components/carousel";
import { XCombobox } from "../src/components/combobox";
import { XSlider } from "../src/components/slider";
import { defineOnce, toBool } from "../src/components/utils";

beforeEach(() => {
  document.body.innerHTML = "";
});

describe("utils", () => {
  it("converts attribute values to booleans", () => {
    expect(toBool("true")).toBe(true);
    expect(toBool("false")).toBe(false);
    expect(toBool(null)).toBe(false);
    expect(toBool("")).toBe(true);
  });

  it("defines custom elements once", () => {
    class XTestEl extends HTMLElement {}
    const defineSpy = spyOn(customElements, "define");
    defineOnce("x-test-el", XTestEl);
    defineOnce("x-test-el", XTestEl);

    expect(customElements.get("x-test-el")).toBe(XTestEl);
    expect(defineSpy).toHaveBeenCalledTimes(1);
  });
});

describe("component rendering", () => {
  it("creates static shadow DOM components", () => {
    const nodes = [
      new XButtonGroup(),
      new XInputGroup(),
      new XLoadingSpinner(),
      new XToastNotification(),
      new XSkeleton(),
      new XCard(),
    ];

    for (const node of nodes) {
      expect(node.shadowRoot).toBeTruthy();
      expect(node.shadowRoot?.innerHTML.length).toBeGreaterThan(0);
    }
  });

  it("syncs switch state and emits changes", () => {
    const switchToggle = new XSwitchToggle();
    document.body.appendChild(switchToggle);
    const button = switchToggle.shadowRoot?.querySelector("button") as HTMLButtonElement;
    let detailChecked = false;
    switchToggle.addEventListener("change", (event) => {
      detailChecked = (event as CustomEvent<{ checked: boolean }>).detail.checked;
    });

    button.click();

    expect(switchToggle.checked).toBe(true);
    expect(button.getAttribute("aria-checked")).toBe("true");
    expect(detailChecked).toBe(true);
  });

  it("syncs checkbox state and emits changes", () => {
    const checkbox = new XCustomCheckbox();
    document.body.appendChild(checkbox);
    const input = checkbox.shadowRoot?.querySelector("input") as HTMLInputElement;
    let detailChecked = false;
    checkbox.addEventListener("change", (event) => {
      detailChecked = (event as CustomEvent<{ checked: boolean }>).detail.checked;
    });

    input.checked = true;
    input.dispatchEvent(new Event("change"));

    expect(checkbox.checked).toBe(true);
    expect(detailChecked).toBe(true);
  });

  it("syncs dropdown open attribute with details element", () => {
    const dropdown = new XDropdownMenu();
    document.body.appendChild(dropdown);
    const details = dropdown.shadowRoot?.querySelector("details") as HTMLDetailsElement;

    dropdown.setAttribute("open", "true");
    dropdown.attributeChangedCallback();
    expect(details.open).toBe(true);

    details.open = false;
    details.dispatchEvent(new Event("toggle"));
    expect(dropdown.hasAttribute("open")).toBe(false);
  });

  it("sorts table rows by header interactions", () => {
    const tableComponent = new XSortableTable();
    tableComponent.innerHTML = `
      <table>
        <thead><tr><th>Name</th></tr></thead>
        <tbody>
          <tr><td>Bravo</td></tr>
          <tr><td>Alpha</td></tr>
        </tbody>
      </table>
    `;
    document.body.appendChild(tableComponent);
    tableComponent.connectedCallback();

    const header = tableComponent.querySelector("th") as HTMLTableCellElement;
    header.click();

    const firstCell = tableComponent.querySelector("tbody tr td") as HTMLTableCellElement;
    expect(firstCell.textContent?.trim()).toBe("Alpha");
  });

  it("loops focus when tab lock is active", () => {
    const tabLock = new XTabLock();
    tabLock.setAttribute("active", "true");
    tabLock.innerHTML = "<button id='first'>First</button><button id='last'>Last</button>";
    document.body.appendChild(tabLock);
    tabLock.connectedCallback();

    const first = tabLock.querySelector("#first") as HTMLButtonElement;
    const last = tabLock.querySelector("#last") as HTMLButtonElement;
    first.focus();

    const event = new KeyboardEvent("keydown", { key: "Tab", shiftKey: true, bubbles: true, cancelable: true });
    first.dispatchEvent(event);

    expect(document.activeElement).toBe(last);
  });

  it("writes selected date to value attribute and emits change", () => {
    const datepicker = new XDatepicker();
    document.body.appendChild(datepicker);
    const input = datepicker.shadowRoot?.querySelector("input") as HTMLInputElement;
    let emittedValue = "";
    datepicker.addEventListener("change", (event) => {
      emittedValue = (event as CustomEvent<{ value: string }>).detail.value;
    });

    input.value = "2025-01-15";
    input.dispatchEvent(new Event("change"));

    expect(datepicker.getAttribute("value")).toBe("2025-01-15");
    expect(emittedValue).toBe("2025-01-15");
  });

  it("navigates carousel items", () => {
    const carousel = new XCarousel();
    carousel.innerHTML = "<div>One</div><div>Two</div>";
    document.body.appendChild(carousel);
    carousel.connectedCallback();

    const nextButton = carousel.shadowRoot?.querySelector('button[part="next"]') as HTMLButtonElement;
    const track = carousel.shadowRoot?.querySelector(".track") as HTMLElement;

    nextButton.click();
    expect(track.style.transform).toContain("-100%");
  });

  it("creates combobox options from attribute", () => {
    const combo = new XCombobox();
    combo.setAttribute("options", "one, two, three");
    document.body.appendChild(combo);
    combo.connectedCallback();

    const options = combo.shadowRoot?.querySelectorAll("option") ?? [];
    expect(options.length).toBe(3);
    expect((options[1] as HTMLOptionElement).value).toBe("two");
  });

  it("syncs slider output and emits change", () => {
    const slider = new XSlider();
    slider.setAttribute("value", "5");
    slider.setAttribute("min", "0");
    slider.setAttribute("max", "10");
    document.body.appendChild(slider);
    slider.connectedCallback();

    const range = slider.shadowRoot?.querySelector("input") as HTMLInputElement;
    const output = slider.shadowRoot?.querySelector("output") as HTMLOutputElement;

    range.value = "8";
    range.dispatchEvent(new Event("input"));

    expect(output.textContent).toBe("8");
    expect(slider.getAttribute("value")).toBe("8");
  });
});
