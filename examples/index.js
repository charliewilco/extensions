import "../src/index.ts";

const components = [
	{
		name: "Accordion",
		tag: "uix-accordion",
		category: "Disclosure",
		summary: "A single expandable row with trigger and panel slots.",
		api: ["open", "toggle event", "trigger slot"],
		demo: `<uix-accordion open>
	<span slot="trigger">Billing details</span>
	<p>Invoices are sent on the first day of each month.</p>
</uix-accordion>
<uix-accordion>
	<span slot="trigger">Deployment window</span>
	<p>Production deploys pause while incident review is active.</p>
</uix-accordion>`,
	},
	{
		name: "Alert",
		tag: "uix-alert",
		category: "Feedback",
		summary: "Status, success, warning, and danger messaging.",
		api: ["tone", "title slot", "status roles"],
		demo: `<uix-alert tone="success">
	<span slot="title">Checks passed</span>
	The package build, typecheck, and tests completed.
</uix-alert>
<uix-alert tone="warning">
	<span slot="title">Missing token</span>
	Deployment needs a repository secret before publishing.
</uix-alert>`,
	},
	{
		name: "Avatar",
		tag: "uix-avatar",
		category: "Identity",
		summary: "A circular image with fallback initials.",
		api: ["src", "alt", "fallback"],
		demo: `<div class="demo-row">
	<uix-avatar fallback="CW"></uix-avatar>
	<uix-avatar fallback="AL"></uix-avatar>
	<uix-avatar src="https://i.pravatar.cc/120?img=12" alt="Alex" fallback="AL"></uix-avatar>
</div>`,
	},
	{
		name: "Badge",
		tag: "uix-badge",
		category: "Feedback",
		summary: "Compact labels for statuses, counts, and metadata.",
		api: ["tone", "default slot"],
		demo: `<div class="demo-row">
	<uix-badge>Draft</uix-badge>
	<uix-badge tone="success">Live</uix-badge>
	<uix-badge tone="warning">Review</uix-badge>
	<uix-badge tone="danger">Blocked</uix-badge>
</div>`,
	},
	{
		name: "Button Group",
		tag: "uix-button-group",
		category: "Actions",
		summary: "Groups related controls with consistent spacing.",
		api: ["default slot", "--uix-button-group-gap"],
		demo: `<uix-button-group>
	<button type="button">Cancel</button>
	<button type="button">Save draft</button>
	<button type="button">Publish</button>
</uix-button-group>`,
	},
	{
		name: "Card",
		tag: "uix-card",
		category: "Layout",
		summary: "A bordered container for compact content.",
		api: ["default slot"],
		demo: `<uix-card>
	<h3>Project health</h3>
	<p>All checks are passing and the examples build is current.</p>
</uix-card>`,
	},
	{
		name: "Carousel",
		tag: "uix-carousel",
		category: "Navigation",
		summary: "Previous and next navigation across direct child slides.",
		api: ["default slot", "prev part", "next part"],
		demo: `<uix-carousel>
	<section class="slide"><strong>Step one</strong><span>Collect requirements.</span></section>
	<section class="slide"><strong>Step two</strong><span>Implement the smallest useful version.</span></section>
	<section class="slide"><strong>Step three</strong><span>Run checks and publish.</span></section>
</uix-carousel>`,
	},
	{
		name: "Collapsible",
		tag: "uix-collapsible",
		category: "Disclosure",
		summary: "A panel controlled by an internal trigger button.",
		api: ["open", "toggle event", "trigger slot"],
		demo: `<uix-collapsible>
	<span slot="trigger">Advanced options</span>
	<label><input type="checkbox" /> Enable debug logging</label>
</uix-collapsible>`,
	},
	{
		name: "Combobox",
		tag: "uix-combobox",
		category: "Forms",
		summary: "A native input backed by generated datalist options.",
		api: ["options"],
		demo: `<div class="inline-field">
	<span>Release size</span>
	<uix-combobox options="Patch, Minor, Major, Hotfix"></uix-combobox>
</div>`,
	},
	{
		name: "Custom Checkbox",
		tag: "uix-custom-checkbox",
		category: "Forms",
		summary: "A checkbox that mirrors checked state to the host element.",
		api: ["checked", "change event"],
		demo: `<div class="field-stack">
	<uix-custom-checkbox checked>Receive product updates</uix-custom-checkbox>
	<uix-custom-checkbox>Include release notes</uix-custom-checkbox>
</div>`,
	},
	{
		name: "Datepicker",
		tag: "uix-datepicker",
		category: "Forms",
		summary: "A native date input with value synchronization.",
		api: ["value", "change event"],
		demo: `<div class="inline-field">
	<span>Ship date</span>
	<uix-datepicker value="2026-07-27"></uix-datepicker>
</div>`,
	},
	{
		name: "Dialog",
		tag: "uix-dialog",
		category: "Overlay",
		summary: "A lightweight dialog surface with host methods.",
		api: ["open", "show()", "close()"],
		demo: `<button id="demo-open-dialog" type="button">Open dialog</button>`,
		code: `<button id="open-delete-dialog" type="button">Open dialog</button>
<uix-dialog id="delete-dialog">
	<h2>Delete project?</h2>
	<p>This action cannot be undone.</p>
</uix-dialog>

<script type="module">
	import "@charliewilco/extensions/dialog";

	document.querySelector("#open-delete-dialog")?.addEventListener("click", () => {
		document.querySelector("#delete-dialog")?.show();
	});
</script>`,
	},
	{
		name: "Dropdown Menu",
		tag: "uix-dropdown-menu",
		category: "Overlay",
		summary: "A native details and summary dropdown menu.",
		api: ["open", "trigger slot", "menu part"],
		demo: `<uix-dropdown-menu>
	<button slot="trigger" type="button">Actions</button>
	<button type="button">Duplicate</button>
	<button type="button">Archive</button>
	<button type="button">Delete</button>
</uix-dropdown-menu>`,
	},
	{
		name: "Input Group",
		tag: "uix-input-group",
		category: "Forms",
		summary: "Composes inputs with prefixes, suffixes, or adjacent controls.",
		api: ["default slot"],
		demo: `<uix-input-group>
	<span>$</span>
	<input type="number" inputmode="decimal" value="49" aria-label="Monthly price" />
	<span>/mo</span>
</uix-input-group>`,
	},
	{
		name: "Loading Spinner",
		tag: "uix-loading-spinner",
		category: "Feedback",
		summary: "A visual loading indicator with a configurable size token.",
		api: ["--uix-spinner-size"],
		demo: `<div class="demo-row">
	<uix-loading-spinner></uix-loading-spinner>
	<uix-loading-spinner style="--uix-spinner-size: 1.25rem"></uix-loading-spinner>
</div>`,
	},
	{
		name: "Progress",
		tag: "uix-progress",
		category: "Feedback",
		summary: "A progress bar with value, max, and ARIA state.",
		api: ["value", "max", "indicator part"],
		demo: `<uix-progress value="64" max="100"></uix-progress>`,
	},
	{
		name: "Separator",
		tag: "uix-separator",
		category: "Layout",
		summary: "Semantic horizontal or vertical separation.",
		api: ["orientation", "separator part"],
		demo: `<div>
	<p>Primary content</p>
	<uix-separator></uix-separator>
	<p>Secondary content</p>
</div>
<div class="vertical-demo">
	<span>Left</span>
	<uix-separator orientation="vertical"></uix-separator>
	<span>Right</span>
</div>`,
	},
	{
		name: "Skeleton",
		tag: "uix-skeleton",
		category: "Feedback",
		summary: "Placeholder blocks for loading states.",
		api: ["--uix-skeleton-width", "--uix-skeleton-height"],
		demo: `<div class="skeleton-stack">
	<uix-skeleton style="--uix-skeleton-width: 16rem; --uix-skeleton-height: 1.25rem"></uix-skeleton>
	<uix-skeleton style="--uix-skeleton-width: 22rem"></uix-skeleton>
	<uix-skeleton style="--uix-skeleton-width: 12rem"></uix-skeleton>
</div>`,
	},
	{
		name: "Slider",
		tag: "uix-slider",
		category: "Forms",
		summary: "A range input that mirrors its current value.",
		api: ["min", "max", "step", "value"],
		demo: `<div class="field-stack">
	<div class="inline-field">
		<span>Confidence <output id="slider-output">7</output></span>
	</div>
	<uix-slider id="confidence-slider" min="0" max="10" step="1" value="7"></uix-slider>
</div>`,
	},
	{
		name: "Sortable Table",
		tag: "uix-sortable-table",
		category: "Data",
		summary: "Click and keyboard sorting for a native table.",
		api: ["table slot", "header sorting"],
		demo: `<uix-sortable-table>
	<table class="example-table">
		<thead>
			<tr><th>Name</th><th>Count</th><th>Status</th></tr>
		</thead>
		<tbody>
			<tr><td>Beta</td><td>2</td><td>Review</td></tr>
			<tr><td>Alpha</td><td>10</td><td>Live</td></tr>
			<tr><td>Gamma</td><td>7</td><td>Draft</td></tr>
		</tbody>
	</table>
</uix-sortable-table>`,
	},
	{
		name: "Switch Toggle",
		tag: "uix-switch-toggle",
		category: "Forms",
		summary: "Binary on/off state with attribute synchronization.",
		api: ["checked", "change event"],
		demo: `<div class="demo-row">
	<span>Auto publish</span>
	<uix-switch-toggle checked></uix-switch-toggle>
</div>`,
	},
	{
		name: "Tab Lock",
		tag: "uix-tab-lock",
		category: "Focus",
		summary: "Loops tab focus inside slotted content when active.",
		api: ["active", "default slot"],
		demo: `<uix-tab-lock active>
	<div class="demo-row">
		<button type="button">First</button>
		<button type="button">Middle</button>
		<button type="button">Last</button>
	</div>
</uix-tab-lock>`,
	},
	{
		name: "Toast Notification",
		tag: "uix-toast-notification",
		category: "Feedback",
		summary: "Polite live-region notifications.",
		api: ["default slot"],
		demo: `<uix-toast-notification>Saved successfully.</uix-toast-notification>`,
	},
	{
		name: "Toggle",
		tag: "uix-toggle",
		category: "Forms",
		summary: "A pressed or unpressed toggle button.",
		api: ["pressed", "change event"],
		demo: `<div class="demo-row">
	<uix-toggle pressed>Bold</uix-toggle>
	<uix-toggle>Italic</uix-toggle>
	<uix-toggle>Code</uix-toggle>
</div>`,
	},
	{
		name: "Tooltip",
		tag: "uix-tooltip",
		category: "Overlay",
		summary: "Short helper text on hover or focus.",
		api: ["text", "content part"],
		demo: `<uix-tooltip text="Save changes">
	<button type="button">Save</button>
</uix-tooltip>`,
	},
];

const categories = [
	"All",
	...new Set(components.map(({ category }) => category)),
];
const componentGrid = document.querySelector("#component-grid");
const categoryFilter = document.querySelector("#category-filter");
const componentSearch = document.querySelector("#component-search");
const emptyState = document.querySelector("#empty-state");
let activeCategory = "All";

function toId(value) {
	return value.toLowerCase().replaceAll(" ", "-");
}

function escapeHtml(value) {
	return value
		.replaceAll("&", "&amp;")
		.replaceAll("<", "&lt;")
		.replaceAll(">", "&gt;");
}

function encodeCopyValue(value) {
	return encodeURIComponent(value);
}

function renderCategoryFilters() {
	if (!categoryFilter) return;

	categoryFilter.innerHTML = categories
		.map(
			(category) =>
				`<button type="button" data-category="${category}" aria-pressed="${category === activeCategory}">${category}</button>`,
		)
		.join("");
}

function renderComponents(items) {
	if (!componentGrid || !emptyState) return;

	componentGrid.innerHTML = items
		.map((component) => {
			const id = toId(component.name);
			const code = component.code ?? component.demo;
			const importSnippet = `import "@charliewilco/extensions/${component.tag.replace("uix-", "")}";`;

			return `<article class="component-entry" id="${id}" data-component-card>
				<header class="component-header">
					<div>
						<h3>${component.name}</h3>
						<p>${component.summary}</p>
					</div>
					<p><code>${component.tag}</code></p>
				</header>
				<ul class="api-list" aria-label="${component.name} API highlights">
					${component.api.map((item) => `<li>${item}</li>`).join("")}
				</ul>
				<div class="example-surface">${component.demo}</div>
				<details class="code-details">
					<summary>Code</summary>
					<div class="code-grid">
						<div>
						<div class="code-header">
							<strong>Import</strong>
							<button type="button" data-copy-value="${encodeCopyValue(importSnippet)}">Copy</button>
						</div>
						<pre><code>${escapeHtml(importSnippet)}</code></pre>
						</div>
						<div>
						<div class="code-header">
							<strong>Markup</strong>
							<button type="button" data-copy-value="${encodeCopyValue(code)}">Copy</button>
						</div>
						<pre><code>${escapeHtml(code)}</code></pre>
						</div>
					</div>
				</details>
			</article>`;
		})
		.join("");
	emptyState.hidden = items.length > 0;
}

function filteredComponents() {
	const query =
		componentSearch instanceof HTMLInputElement
			? componentSearch.value.trim().toLowerCase()
			: "";

	return components.filter((component) => {
		const matchesCategory =
			activeCategory === "All" || component.category === activeCategory;
		const matchesQuery = [component.name, component.tag, component.summary]
			.join(" ")
			.toLowerCase()
			.includes(query);

		return matchesCategory && matchesQuery;
	});
}

function renderCatalog() {
	const items = filteredComponents();
	renderCategoryFilters();
	renderComponents(items);
	bindCatalogActions();
}

function bindCatalogActions() {
	for (const button of document.querySelectorAll("[data-copy-value]")) {
		button.addEventListener("click", async () => {
			const value = button.getAttribute("data-copy-value");
			if (!value) return;

			await navigator.clipboard.writeText(decodeURIComponent(value));
			const original = button.textContent ?? "Copy";
			button.textContent = "Copied";
			setTimeout(() => {
				button.textContent = original;
			}, 1200);
		});
	}

	document.querySelector("#demo-open-dialog")?.addEventListener("click", () => {
		document.querySelector("#delete-dialog")?.show();
	});

	const slider = document.querySelector("#confidence-slider");
	const output = document.querySelector("#slider-output");
	slider?.addEventListener("change", (event) => {
		if (!(event instanceof CustomEvent) || !output) return;
		output.textContent = String(event.detail.value);
	});
}

categoryFilter?.addEventListener("click", (event) => {
	const target = event.target;
	if (!(target instanceof HTMLButtonElement)) return;

	activeCategory = target.dataset.category ?? "All";
	renderCatalog();
});

componentSearch?.addEventListener("input", () => {
	renderCatalog();
});

document.querySelector("#open-delete-dialog")?.addEventListener("click", () => {
	document.querySelector("#delete-dialog")?.show();
});

for (const button of document.querySelectorAll("[data-close-dialog]")) {
	button.addEventListener("click", () => {
		document.querySelector("#delete-dialog")?.close();
	});
}

document.querySelector("#raise-progress")?.addEventListener("click", () => {
	const progress = document.querySelector("#release-progress");
	if (!progress) return;

	const value = Number(progress.getAttribute("value") ?? "0");
	progress.setAttribute("value", String(value >= 100 ? 100 : value + 20));
});

document.querySelector("#reset-progress")?.addEventListener("click", () => {
	document.querySelector("#release-progress")?.setAttribute("value", "40");
});

document.querySelector("#show-toast")?.addEventListener("click", () => {
	const toast = document.querySelector("#status-toast");
	if (!toast) return;

	toast.textContent = `Saved at ${new Date().toLocaleTimeString()}`;
});

renderCatalog();
