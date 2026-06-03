import { strict as assert } from "node:assert";
import { beforeEach, describe, it, mock } from "node:test";
import { defineOnce, toBool } from "../src/components/utils";

const expect = (actual: unknown) => ({
	toBe: (expected: unknown): void => {
		assert.equal(actual, expected);
	},
	toBeTruthy: (): void => {
		assert.ok(actual);
	},
	toBeGreaterThan: (expected: number): void => {
		assert.equal(typeof actual, "number");
		assert.ok(actual > expected);
	},
	toContain: (expected: string): void => {
		assert.equal(typeof actual, "string");
		assert.ok(actual.includes(expected));
	},
});

type CustomElementClass<T extends HTMLElement> = {
	new (): T;
	readonly tagName: string;
};

type Components = {
	XAccordion: CustomElementClass<HTMLElement & { open: boolean }>;
	XAlert: CustomElementClass<HTMLElement>;
	XAvatar: CustomElementClass<HTMLElement>;
	XBadge: CustomElementClass<HTMLElement>;
	XButtonGroup: CustomElementClass<HTMLElement>;
	XDialog: CustomElementClass<
		HTMLElement & { open: boolean; show: () => void; close: () => void }
	>;
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
	XCollapsible: CustomElementClass<HTMLElement & { open: boolean }>;
	XToggle: CustomElementClass<HTMLElement & { pressed: boolean }>;
	XTooltip: CustomElementClass<HTMLElement>;
	XProgress: CustomElementClass<HTMLElement>;
	XSeparator: CustomElementClass<HTMLElement>;
};

let componentsPromise: Promise<Components> | null = null;

const loadComponents = async (): Promise<Components> => {
	if (componentsPromise) return componentsPromise;

	componentsPromise = Promise.all([
		import("../src/components/accordion"),
		import("../src/components/alert"),
		import("../src/components/avatar"),
		import("../src/components/badge"),
		import("../src/components/button-group"),
		import("../src/components/dialog"),
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
		import("../src/components/collapsible"),
		import("../src/components/toggle"),
		import("../src/components/tooltip"),
		import("../src/components/progress"),
		import("../src/components/separator"),
	]).then(
		([
			accordion,
			alert,
			avatar,
			badge,
			buttonGroup,
			dialog,
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
			collapsible,
			toggle,
			tooltip,
			progress,
			separator,
		]) => ({
			XAccordion: accordion.XAccordion,
			XAlert: alert.XAlert,
			XAvatar: avatar.XAvatar,
			XBadge: badge.XBadge,
			XButtonGroup: buttonGroup.XButtonGroup,
			XDialog: dialog.XDialog,
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
			XCollapsible: collapsible.XCollapsible,
			XToggle: toggle.XToggle,
			XTooltip: tooltip.XTooltip,
			XProgress: progress.XProgress,
			XSeparator: separator.XSeparator,
		}),
	);

	return componentsPromise;
};

const createComponent = <T extends HTMLElement>(
	ctor: CustomElementClass<T>,
): T => {
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
		const tagName = `uix-test-el-${Math.random().toString(36).slice(2)}`;
		const defineSpy = mock.method(customElements, "define");

		defineOnce(tagName, XTestEl);
		defineOnce(tagName, XTestEl);

		expect(customElements.get(tagName)).toBe(XTestEl);
		expect(defineSpy.mock.callCount()).toBe(1);
		defineSpy.mock.restore();
	});
});

const describeDom =
	typeof HTMLElement === "undefined" ? describe.skip : describe;

describeDom("component rendering", () => {
	it("creates static shadow DOM components", async () => {
		const {
			XButtonGroup,
			XInputGroup,
			XLoadingSpinner,
			XToastNotification,
			XSkeleton,
			XCard,
			XAlert,
			XAvatar,
			XBadge,
			XProgress,
			XSeparator,
			XTooltip,
		} = await loadComponents();

		const nodes = [
			createComponent(XButtonGroup),
			createComponent(XInputGroup),
			createComponent(XLoadingSpinner),
			createComponent(XToastNotification),
			createComponent(XSkeleton),
			createComponent(XCard),
			createComponent(XAlert),
			createComponent(XAvatar),
			createComponent(XBadge),
			createComponent(XProgress),
			createComponent(XSeparator),
			createComponent(XTooltip),
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
		const button = switchToggle.shadowRoot?.querySelector(
			"button",
		) as HTMLButtonElement;
		let detailChecked = false;

		switchToggle.addEventListener("change", (event) => {
			detailChecked = (event as CustomEvent<{ checked: boolean }>).detail
				.checked;
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
		const input = checkbox.shadowRoot?.querySelector(
			"input",
		) as HTMLInputElement;
		let detailChecked = false;

		checkbox.addEventListener("change", (event) => {
			detailChecked = (event as CustomEvent<{ checked: boolean }>).detail
				.checked;
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
		const details = dropdown.shadowRoot?.querySelector(
			"details",
		) as HTMLDetailsElement;

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

		const firstCell = tableComponent.querySelector(
			"tbody tr td",
		) as HTMLTableCellElement;
		expect(firstCell.textContent?.trim()).toBe("Alpha");
	});

	it("loops focus when tab lock is active", async () => {
		const { XTabLock } = await loadComponents();
		const tabLock = createComponent(XTabLock);
		tabLock.setAttribute("active", "true");
		tabLock.innerHTML =
			"<button id='first'>First</button><button id='last'>Last</button>";
		document.body.appendChild(tabLock);

		const first = tabLock.querySelector("#first") as HTMLButtonElement;
		const last = tabLock.querySelector("#last") as HTMLButtonElement;
		first.focus();

		const event = new KeyboardEvent("keydown", {
			key: "Tab",
			shiftKey: true,
			bubbles: true,
			cancelable: true,
		});
		first.dispatchEvent(event);

		expect(document.activeElement).toBe(last);
	});

	it("writes selected date to value attribute and emits change", async () => {
		const { XDatepicker } = await loadComponents();
		const datepicker = createComponent(XDatepicker);
		document.body.appendChild(datepicker);
		const input = datepicker.shadowRoot?.querySelector(
			"input",
		) as HTMLInputElement;
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

		const nextButton = carousel.shadowRoot?.querySelector(
			'button[part="next"]',
		) as HTMLButtonElement;
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
		const output = slider.shadowRoot?.querySelector(
			"output",
		) as HTMLOutputElement;

		range.value = "8";
		range.dispatchEvent(new Event("input"));

		expect(output.textContent).toBe("8");
		expect(slider.getAttribute("value")).toBe("8");
	});

	it("toggles collapsible panel and emits toggle events", async () => {
		const { XCollapsible } = await loadComponents();
		const collapsible = createComponent(XCollapsible);
		document.body.appendChild(collapsible);
		const button = collapsible.shadowRoot?.querySelector(
			"button",
		) as HTMLButtonElement;
		const panel = collapsible.shadowRoot?.querySelector(
			'[part="panel"]',
		) as HTMLDivElement;
		let openState = false;

		collapsible.addEventListener("toggle", (event) => {
			openState = (event as CustomEvent<{ open: boolean }>).detail.open;
		});

		button.click();

		expect(collapsible.open).toBe(true);
		expect(button.getAttribute("aria-expanded")).toBe("true");
		expect(panel.hidden).toBe(false);
		expect(openState).toBe(true);
	});

	it("toggles pressed state and emits changes", async () => {
		const { XToggle } = await loadComponents();
		const toggle = createComponent(XToggle);
		document.body.appendChild(toggle);
		const button = toggle.shadowRoot?.querySelector(
			"button",
		) as HTMLButtonElement;
		let pressedState = false;

		toggle.addEventListener("change", (event) => {
			pressedState = (event as CustomEvent<{ pressed: boolean }>).detail
				.pressed;
		});

		button.click();

		expect(toggle.pressed).toBe(true);
		expect(button.getAttribute("aria-pressed")).toBe("true");
		expect(pressedState).toBe(true);
	});

	it("syncs progress value and max attributes", async () => {
		const { XProgress } = await loadComponents();
		const progress = createComponent(XProgress);
		progress.setAttribute("value", "50");
		progress.setAttribute("max", "200");
		document.body.appendChild(progress);

		const track = progress.shadowRoot?.querySelector(
			'[role="progressbar"]',
		) as HTMLDivElement;
		const indicator = progress.shadowRoot?.querySelector(
			'[part="indicator"]',
		) as HTMLDivElement;

		expect(track.getAttribute("aria-valuenow")).toBe("50");
		expect(track.getAttribute("aria-valuemax")).toBe("200");
		expect(indicator.style.width).toBe("25%");
	});

	it("syncs separator orientation attribute", async () => {
		const { XSeparator } = await loadComponents();
		const separator = createComponent(XSeparator);
		separator.setAttribute("orientation", "vertical");
		document.body.appendChild(separator);

		const node = separator.shadowRoot?.querySelector(
			'[role="separator"]',
		) as HTMLDivElement;
		expect(node.getAttribute("aria-orientation")).toBe("vertical");
	});

	it("toggles accordion panel state", async () => {
		const { XAccordion } = await loadComponents();
		const accordion = createComponent(XAccordion);
		document.body.appendChild(accordion);
		const trigger = accordion.shadowRoot?.querySelector(
			"button",
		) as HTMLButtonElement;
		const panel = accordion.shadowRoot?.querySelector(
			'[part="panel"]',
		) as HTMLDivElement;
		let openState = false;

		accordion.addEventListener("toggle", (event) => {
			openState = (event as CustomEvent<{ open: boolean }>).detail.open;
		});

		trigger.click();

		expect(accordion.open).toBe(true);
		expect(trigger.getAttribute("aria-expanded")).toBe("true");
		expect(panel.hidden).toBe(false);
		expect(openState).toBe(true);
	});

	it("syncs alert tone to role and dataset", async () => {
		const { XAlert } = await loadComponents();
		const alert = createComponent(XAlert);
		alert.setAttribute("tone", "danger");
		document.body.appendChild(alert);
		const container = alert.shadowRoot?.querySelector(
			'[part="container"]',
		) as HTMLDivElement;

		expect(container.dataset.tone).toBe("danger");
		expect(container.getAttribute("role")).toBe("alert");
	});

	it("syncs avatar image and fallback attributes", async () => {
		const { XAvatar } = await loadComponents();
		const avatar = createComponent(XAvatar);
		avatar.setAttribute("src", "https://example.com/avatar.png");
		avatar.setAttribute("alt", "Charlie");
		avatar.setAttribute("fallback", "CW");
		document.body.appendChild(avatar);
		const image = avatar.shadowRoot?.querySelector("img") as HTMLImageElement;
		const fallback = avatar.shadowRoot?.querySelector(
			'[part="fallback"]',
		) as HTMLSpanElement;

		expect(image.hidden).toBe(false);
		expect(image.alt).toBe("Charlie");
		expect(fallback.textContent).toBe("CW");
	});

	it("syncs badge tone attribute", async () => {
		const { XBadge } = await loadComponents();
		const badge = createComponent(XBadge);
		badge.setAttribute("tone", "success");
		document.body.appendChild(badge);
		const badgeNode = badge.shadowRoot?.querySelector(
			'[part="badge"]',
		) as HTMLSpanElement;

		expect(badgeNode.dataset.tone).toBe("success");
	});

	it("opens and closes dialog by host state", async () => {
		const { XDialog } = await loadComponents();
		const dialog = createComponent(XDialog);
		document.body.appendChild(dialog);
		const nativeDialog = dialog.shadowRoot?.querySelector(
			"dialog",
		) as HTMLDialogElement;
		let closed = false;

		dialog.addEventListener("close", () => {
			closed = true;
		});

		dialog.show();
		expect(dialog.open).toBe(true);
		expect(nativeDialog.open).toBe(true);

		dialog.close();
		expect(dialog.open).toBe(false);
		expect(nativeDialog.open).toBe(false);
		expect(closed).toBe(true);
	});

	it("syncs tooltip text attribute", async () => {
		const { XTooltip } = await loadComponents();
		const tooltip = createComponent(XTooltip);
		tooltip.setAttribute("text", "Save changes");
		document.body.appendChild(tooltip);
		const content = tooltip.shadowRoot?.querySelector(
			'[part="content"]',
		) as HTMLSpanElement;

		expect(content.textContent).toBe("Save changes");
		expect(content.getAttribute("role")).toBe("tooltip");
	});
});
