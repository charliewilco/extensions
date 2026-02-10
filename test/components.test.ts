import { beforeEach, describe, expect, it, spyOn } from "bun:test";
import { defineOnce, toBool } from "../src/components/utils";

type CustomElementClass<T extends HTMLElement> = {
  new (): T;
  readonly tagName: string;
};

type Components = {
  XButtonGroup: CustomElementClass<HTMLElement>;
  XInputGroup: CustomElementClass<HTMLElement>;
  XLoadingSpinner: CustomElementClass<HTMLElement>;
  XSwitchToggle: CustomElementClass<HTMLElement & { checked: boolean }>;
  XCustomCheckbox: CustomElementClass<HTMLElement & { checked: boolean }>;
  XToastNotification: CustomElementClass<HTMLElement>;
  XSkeleton: CustomElementClass<HTMLElement>;
  XDropdownMenu: CustomElementClass<HTMLElement>;
  XSortableTable: CustomElementClass<HTMLElement>;
  XTabLock: CustomElementClass<HTMLElement>;
  XCard: CustomElementClass<HTMLElement>;
  XDatepicker: CustomElementClass<HTMLElement>;
  XCarousel: CustomElementClass<HTMLElement>;
  XCombobox: CustomElementClass<HTMLElement>;
  XSlider: CustomElementClass<HTMLElement>;
};

let componentsPromise: Promise<Components> | null = null;

const loadComponents = async (): Promise<Components> => {
  if (componentsPromise) return componentsPromise;

  componentsPromise = Promise.all([
    import("../src/components/button-group"),
    import("../src/components/input-group"),
    import("../src/components/loading-spinner"),
    import("../src/components/switch-toggle"),
    import("../src/components/custom-checkbox"),
    import("../src/components/toast-notification"),
    import("../src/components/skeleton"),
    import("../src/components/dropdown-menu"),
    import("../src/components/sortable-table"),
    import("../src/components/tab-lock"),
    import("../src/components/card"),
    import("../src/components/datepicker"),
    import("../src/components/carousel"),
    import("../src/components/combobox"),
    import("../src/components/slider"),
  ]).then(
    ([
      buttonGroup,
      inputGroup,
      loadingSpinner,
      switchToggle,
      customCheckbox,
      toastNotification,
      skeleton,
      dropdownMenu,
      sortableTable,
      tabLock,
      card,
      datepicker,
      carousel,
      combobox,
      slider,
    ]) => ({
      XButtonGroup: buttonGroup.XButtonGroup,
      XInputGroup: inputGroup.XInputGroup,
      XLoadingSpinner: loadingSpinner.XLoadingSpinner,
      XSwitchToggle: switchToggle.XSwitchToggle,
      XCustomCheckbox: customCheckbox.XCustomCheckbox,
      XToastNotification: toastNotification.XToastNotification,
      XSkeleton: skeleton.XSkeleton,
      XDropdownMenu: dropdownMenu.XDropdownMenu,
      XSortableTable: sortableTable.XSortableTable,
      XTabLock: tabLock.XTabLock,
      XCard: card.XCard,
      XDatepicker: datepicker.XDatepicker,
      XCarousel: carousel.XCarousel,
      XCombobox: combobox.XCombobox,
      XSlider: slider.XSlider,
    }),
  );

  return componentsPromise;
};

const createComponent = <T extends HTMLElement>(ctor: CustomElementClass<T>): T => {
  defineOnce(ctor.tagName, ctor);
  return document.createElement(ctor.tagName) as T;
};

beforeEach(() => {
  if (typeof document !== "undefined") {
    document.body.innerHTML = "";
  }
});

describe("utils", () => {
  it("converts attribute values to booleans", () => {
    expect(toBool("true")).toBe(true);
    expect(toBool("false")).toBe(false);
    expect(toBool(null)).toBe(false);
    expect(toBool("")).toBe(true);
  });

  it("defines custom elements once", () => {
    if (typeof customElements === "undefined") return;

    class XTestEl extends HTMLElement {}
    const tagName = `x-test-el-${Math.random().toString(36).slice(2)}`;
    const defineSpy = spyOn(customElements, "define");

    defineOnce(tagName, XTestEl);
    defineOnce(tagName, XTestEl);

    expect(customElements.get(tagName)).toBe(XTestEl);
    expect(defineSpy).toHaveBeenCalledTimes(1);
    defineSpy.mockRestore();
  });
});

const describeDom = typeof HTMLElement === "undefined" ? describe.skip : describe;

describeDom("component rendering", () => {
  it("creates static shadow DOM components", async () => {
    const { XButtonGroup, XInputGroup, XLoadingSpinner, XToastNotification, XSkeleton, XCard } = await loadComponents();

    const nodes = [
      createComponent(XButtonGroup),
      createComponent(XInputGroup),
      createComponent(XLoadingSpinner),
      createComponent(XToastNotification),
      createComponent(XSkeleton),
      createComponent(XCard),
    ];

    for (const node of nodes) {
      expect(node.shadowRoot).toBeTruthy();
      expect(node.shadowRoot?.innerHTML.length).toBeGreaterThan(0);
    }
  });

  it("syncs switch state and emits changes", async () => {
    const { XSwitchToggle } = await loadComponents();
    const switchToggle = createComponent(XSwitchToggle);
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

  it("syncs checkbox state and emits changes", async () => {
    const { XCustomCheckbox } = await loadComponents();
    const checkbox = createComponent(XCustomCheckbox);
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

  it("syncs dropdown open attribute with details element", async () => {
    const { XDropdownMenu } = await loadComponents();
    const dropdown = createComponent(XDropdownMenu);
    document.body.appendChild(dropdown);
    const details = dropdown.shadowRoot?.querySelector("details") as HTMLDetailsElement;

    dropdown.setAttribute("open", "true");
    expect(details.open).toBe(true);

    details.open = false;
    details.dispatchEvent(new Event("toggle"));
    expect(dropdown.hasAttribute("open")).toBe(false);
  });

  it("sorts table rows by header interactions", async () => {
    const { XSortableTable } = await loadComponents();
    const tableComponent = createComponent(XSortableTable);
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

    const header = tableComponent.querySelector("th") as HTMLTableCellElement;
    header.click();

    const firstCell = tableComponent.querySelector("tbody tr td") as HTMLTableCellElement;
    expect(firstCell.textContent?.trim()).toBe("Alpha");
  });

  it("loops focus when tab lock is active", async () => {
    const { XTabLock } = await loadComponents();
    const tabLock = createComponent(XTabLock);
    tabLock.setAttribute("active", "true");
    tabLock.innerHTML = "<button id='first'>First</button><button id='last'>Last</button>";
    document.body.appendChild(tabLock);

    const first = tabLock.querySelector("#first") as HTMLButtonElement;
    const last = tabLock.querySelector("#last") as HTMLButtonElement;
    first.focus();

    const event = new KeyboardEvent("keydown", { key: "Tab", shiftKey: true, bubbles: true, cancelable: true });
    first.dispatchEvent(event);

    expect(document.activeElement).toBe(last);
  });

  it("writes selected date to value attribute and emits change", async () => {
    const { XDatepicker } = await loadComponents();
    const datepicker = createComponent(XDatepicker);
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

  it("navigates carousel items", async () => {
    const { XCarousel } = await loadComponents();
    const carousel = createComponent(XCarousel);
    carousel.innerHTML = "<div>One</div><div>Two</div>";
    document.body.appendChild(carousel);

    const nextButton = carousel.shadowRoot?.querySelector('button[part="next"]') as HTMLButtonElement;
    const track = carousel.shadowRoot?.querySelector(".track") as HTMLElement;

    nextButton.click();
    expect(track.style.transform).toContain("-100%");
  });

  it("creates combobox options from attribute", async () => {
    const { XCombobox } = await loadComponents();
    const combo = createComponent(XCombobox);
    combo.setAttribute("options", "one, two, three");
    document.body.appendChild(combo);

    const options = combo.shadowRoot?.querySelectorAll("option") ?? [];
    expect(options.length).toBe(3);
    expect((options[1] as HTMLOptionElement).value).toBe("two");
  });

  it("syncs slider output and emits change", async () => {
    const { XSlider } = await loadComponents();
    const slider = createComponent(XSlider);
    slider.setAttribute("value", "5");
    slider.setAttribute("min", "0");
    slider.setAttribute("max", "10");
    document.body.appendChild(slider);

    const range = slider.shadowRoot?.querySelector("input") as HTMLInputElement;
    const output = slider.shadowRoot?.querySelector("output") as HTMLOutputElement;

    range.value = "8";
    range.dispatchEvent(new Event("input"));

    expect(output.textContent).toBe("8");
    expect(slider.getAttribute("value")).toBe("8");
  });
});
