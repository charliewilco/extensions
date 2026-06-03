# Component Reference

`@charliewilco/extensions` ships native custom elements. Importing an entrypoint registers that element as a browser-side side effect:

```ts
import "@charliewilco/extensions/slider";
```

After registration, use the matching `uix-*` element in HTML:

```html
<uix-slider min="0" max="10" value="4"></uix-slider>
```

For advanced use, the package barrel exports component classes:

```ts
import { XSlider } from "@charliewilco/extensions";
```

This is different from importing a React component. The import registers a browser custom element globally, and the HTML tag is what renders the UI.

## Styling

Components use Shadow DOM. Style component internals with exposed CSS parts where available:

```css
uix-progress::part(indicator) {
	background: rebeccapurple;
}
```

Some components expose CSS custom properties:

| Component | Custom property | Default |
| --- | --- | --- |
| `<uix-button-group>` | `--uix-button-group-gap` | `0.5rem` |
| `<uix-loading-spinner>` | `--uix-spinner-size` | `2rem` |
| `<uix-skeleton>` | `--uix-skeleton-width` | `100%` |
| `<uix-skeleton>` | `--uix-skeleton-height` | `1rem` |

## Boolean Attributes

Boolean attributes are treated as true when present, except the literal value `"false"`:

```html
<uix-toggle pressed></uix-toggle>
<uix-toggle pressed="true"></uix-toggle>
<uix-toggle pressed="false"></uix-toggle>
```

## Components

### Accordion

Import: `@charliewilco/extensions/accordion`

Element: `<uix-accordion>`

Use for a single disclosure row with a trigger and expandable panel.

| API | Details |
| --- | --- |
| Attribute | `open` |
| Property | `open: boolean` |
| Event | `toggle`, detail `{ open: boolean }` |
| Slots | `trigger`, default |
| Parts | `trigger`, `panel` |

```html
<uix-accordion>
	<span slot="trigger">Billing details</span>
	<p>Invoices are sent on the first day of each month.</p>
</uix-accordion>
```

### Alert

Import: `@charliewilco/extensions/alert`

Element: `<uix-alert>`

Use for status, warning, and error messages.

| API | Details |
| --- | --- |
| Attribute | `tone="info\|success\|warning\|danger"` |
| Slots | `title`, default |
| Parts | `container`, `title`, `description` |
| Accessibility | `tone="danger"` uses `role="alert"`; other tones use `role="status"`. |

```html
<uix-alert tone="warning">
	<span slot="title">Check configuration</span>
	Deployment credentials are missing.
</uix-alert>
```

### Avatar

Import: `@charliewilco/extensions/avatar`

Element: `<uix-avatar>`

Use for a circular user image with fallback initials.

| API | Details |
| --- | --- |
| Attributes | `src`, `alt`, `fallback` |
| Parts | `frame`, `image`, `fallback` |

```html
<uix-avatar src="/avatar.jpg" alt="Charlie" fallback="CW"></uix-avatar>
```

### Badge

Import: `@charliewilco/extensions/badge`

Element: `<uix-badge>`

Use for compact counts, statuses, and metadata.

| API | Details |
| --- | --- |
| Attribute | `tone="neutral\|success\|warning\|danger"` |
| Slot | default |
| Part | `badge` |

```html
<uix-badge tone="success">Active</uix-badge>
```

### Button Group

Import: `@charliewilco/extensions/button-group`

Element: `<uix-button-group>`

Use to group related buttons with consistent spacing.

| API | Details |
| --- | --- |
| Slot | default |
| CSS custom property | `--uix-button-group-gap` |

```html
<uix-button-group>
	<button type="button">Cancel</button>
	<button type="button">Save</button>
</uix-button-group>
```

### Card

Import: `@charliewilco/extensions/card`

Element: `<uix-card>`

Use as a simple bordered content container.

| API | Details |
| --- | --- |
| Slot | default |

```html
<uix-card>
	<h2>Project health</h2>
	<p>All checks are passing.</p>
</uix-card>
```

### Carousel

Import: `@charliewilco/extensions/carousel`

Element: `<uix-carousel>`

Use for a small previous/next carousel. Each direct child is treated as one slide.

| API | Details |
| --- | --- |
| Slot | default |
| Parts | `prev`, `next` |

```html
<uix-carousel>
	<section>First slide</section>
	<section>Second slide</section>
</uix-carousel>
```

### Collapsible

Import: `@charliewilco/extensions/collapsible`

Element: `<uix-collapsible>`

Use for a collapsible panel controlled by an internal button.

| API | Details |
| --- | --- |
| Attribute | `open` |
| Property | `open: boolean` |
| Event | `toggle`, detail `{ open: boolean }` |
| Slots | `trigger`, default |
| Parts | `trigger`, `panel` |

```html
<uix-collapsible>
	<span slot="trigger">Advanced options</span>
	<label><input type="checkbox" /> Enable debug logging</label>
</uix-collapsible>
```

### Combobox

Import: `@charliewilco/extensions/combobox`

Element: `<uix-combobox>`

Use for a native input backed by generated datalist options.

| API | Details |
| --- | --- |
| Attribute | `options`, comma-separated values |

```html
<uix-combobox options="Small, Medium, Large"></uix-combobox>
```

### Custom Checkbox

Import: `@charliewilco/extensions/custom-checkbox`

Element: `<uix-custom-checkbox>`

Use for a checkbox that mirrors checked state to the host element.

| API | Details |
| --- | --- |
| Attribute | `checked` |
| Property | `checked: boolean` |
| Event | `change`, detail `{ checked: boolean }` |
| Slot | default |

```html
<uix-custom-checkbox checked>Receive updates</uix-custom-checkbox>
```

### Datepicker

Import: `@charliewilco/extensions/datepicker`

Element: `<uix-datepicker>`

Use for a native date input with value synchronization.

| API | Details |
| --- | --- |
| Attribute | `value`, ISO date string |
| Event | `change`, detail `{ value: string }` |

```html
<uix-datepicker value="2026-06-03"></uix-datepicker>
```

### Dialog

Import: `@charliewilco/extensions/dialog`

Element: `<uix-dialog>`

Use for a lightweight dialog surface.

| API | Details |
| --- | --- |
| Attribute | `open` |
| Property | `open: boolean` |
| Methods | `show()`, `close()` |
| Event | `close` |
| Slot | default |
| Parts | `dialog`, `close` |

```html
<uix-dialog id="delete-dialog">
	<h2>Delete project?</h2>
	<p>This action cannot be undone.</p>
</uix-dialog>

<script type="module">
	import "@charliewilco/extensions/dialog";

	document.querySelector("#delete-dialog")?.show();
</script>
```

### Dropdown Menu

Import: `@charliewilco/extensions/dropdown-menu`

Element: `<uix-dropdown-menu>`

Use for a native details/summary dropdown menu.

| API | Details |
| --- | --- |
| Attribute | `open` |
| Slots | `trigger`, default |
| Parts | `trigger`, `menu` |

```html
<uix-dropdown-menu>
	<button slot="trigger" type="button">Actions</button>
	<button type="button">Duplicate</button>
	<button type="button">Archive</button>
</uix-dropdown-menu>
```

### Input Group

Import: `@charliewilco/extensions/input-group`

Element: `<uix-input-group>`

Use to compose an input with prefixes, suffixes, or adjacent controls.

| API | Details |
| --- | --- |
| Slot | default |

```html
<uix-input-group>
	<span>$</span>
	<input type="number" inputmode="decimal" />
</uix-input-group>
```

### Loading Spinner

Import: `@charliewilco/extensions/loading-spinner`

Element: `<uix-loading-spinner>`

Use as a visual loading indicator.

| API | Details |
| --- | --- |
| CSS custom property | `--uix-spinner-size` |

```html
<uix-loading-spinner style="--uix-spinner-size: 1.25rem"></uix-loading-spinner>
```

### Progress

Import: `@charliewilco/extensions/progress`

Element: `<uix-progress>`

Use for progress values with ARIA state.

| API | Details |
| --- | --- |
| Attributes | `value`, `max` |
| Parts | `track`, `indicator` |

```html
<uix-progress value="40" max="100"></uix-progress>
```

### Separator

Import: `@charliewilco/extensions/separator`

Element: `<uix-separator>`

Use for semantic horizontal or vertical separation.

| API | Details |
| --- | --- |
| Attribute | `orientation="horizontal\|vertical"` |
| Part | `separator` |

```html
<uix-separator></uix-separator>
<uix-separator orientation="vertical"></uix-separator>
```

### Skeleton

Import: `@charliewilco/extensions/skeleton`

Element: `<uix-skeleton>`

Use as a placeholder while content loads.

| API | Details |
| --- | --- |
| CSS custom properties | `--uix-skeleton-width`, `--uix-skeleton-height` |

```html
<uix-skeleton
	style="--uix-skeleton-width: 16rem; --uix-skeleton-height: 2rem"
></uix-skeleton>
```

### Slider

Import: `@charliewilco/extensions/slider`

Element: `<uix-slider>`

Use for a range input that mirrors its current value.

| API | Details |
| --- | --- |
| Attributes | `min`, `max`, `step`, `value` |
| Event | `change`, detail `{ value: string }` |

```html
<uix-slider min="0" max="10" step="1" value="4"></uix-slider>
```

### Sortable Table

Import: `@charliewilco/extensions/sortable-table`

Element: `<uix-sortable-table>`

Use to add click and keyboard sorting to a native table.

| API | Details |
| --- | --- |
| Slot | default table content |
| Behavior | Header cells sort the first table body by their column. |

```html
<uix-sortable-table>
	<table>
		<thead>
			<tr>
				<th>Name</th>
				<th>Count</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td>Beta</td>
				<td>2</td>
			</tr>
			<tr>
				<td>Alpha</td>
				<td>10</td>
			</tr>
		</tbody>
	</table>
</uix-sortable-table>
```

### Switch Toggle

Import: `@charliewilco/extensions/switch-toggle`

Element: `<uix-switch-toggle>`

Use for binary on/off state.

| API | Details |
| --- | --- |
| Attribute | `checked` |
| Property | `checked: boolean` |
| Event | `change`, detail `{ checked: boolean }` |

```html
<uix-switch-toggle checked></uix-switch-toggle>
```

### Tab Lock

Import: `@charliewilco/extensions/tab-lock`

Element: `<uix-tab-lock>`

Use to loop tab focus inside slotted content when active.

| API | Details |
| --- | --- |
| Attribute | `active` |
| Slot | default focusable content |

```html
<uix-tab-lock active>
	<button type="button">First</button>
	<button type="button">Last</button>
</uix-tab-lock>
```

### Toast Notification

Import: `@charliewilco/extensions/toast-notification`

Element: `<uix-toast-notification>`

Use for polite live-region notifications.

| API | Details |
| --- | --- |
| Slot | default |

```html
<uix-toast-notification>Saved successfully.</uix-toast-notification>
```

### Toggle

Import: `@charliewilco/extensions/toggle`

Element: `<uix-toggle>`

Use for a pressed/unpressed toggle button.

| API | Details |
| --- | --- |
| Attribute | `pressed` |
| Property | `pressed: boolean` |
| Event | `change`, detail `{ pressed: boolean }` |
| Slot | default |

```html
<uix-toggle pressed>Bold</uix-toggle>
```

### Tooltip

Import: `@charliewilco/extensions/tooltip`

Element: `<uix-tooltip>`

Use to show short helper text on hover or focus.

| API | Details |
| --- | --- |
| Attribute | `text` |
| Slot | default trigger content |
| Part | `content` |

```html
<uix-tooltip text="Save changes">
	<button type="button">Save</button>
</uix-tooltip>
```
