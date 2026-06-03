# @charliewilco/extensions

A strict TypeScript web components library built for native custom elements, Node, and Rolldown.

## Install

```bash
npm install @charliewilco/extensions
```

## Usage

Import a component entrypoint once to register its custom element:

```ts
import "@charliewilco/extensions/slider";
```

Then use the element in HTML:

```html
<uix-slider min="0" max="10" value="4"></uix-slider>
```

The package barrel exports component classes for advanced registration or testing:

```ts
import { XSlider } from "@charliewilco/extensions";
```

## Components

See [Component Reference](./docs/components.md) for attributes, properties, events, slots, CSS custom properties, and examples.

| Entrypoint | Element | Notes |
| --- | --- | --- |
| `@charliewilco/extensions/accordion` | `<uix-accordion>` | Disclosure item with a slotted trigger and panel. |
| `@charliewilco/extensions/alert` | `<uix-alert>` | Status message with `tone="info\|success\|warning\|danger"`. |
| `@charliewilco/extensions/avatar` | `<uix-avatar>` | Circular image with `src`, `alt`, and `fallback` attributes. |
| `@charliewilco/extensions/badge` | `<uix-badge>` | Compact label with optional tone styling. |
| `@charliewilco/extensions/button-group` | `<uix-button-group>` | Groups related buttons. |
| `@charliewilco/extensions/card` | `<uix-card>` | Bordered content container. |
| `@charliewilco/extensions/carousel` | `<uix-carousel>` | Basic previous/next carousel. |
| `@charliewilco/extensions/collapsible` | `<uix-collapsible>` | Expandable panel with internal trigger. |
| `@charliewilco/extensions/combobox` | `<uix-combobox>` | Input and datalist from an `options` attribute. |
| `@charliewilco/extensions/custom-checkbox` | `<uix-custom-checkbox>` | Checkbox with `checked` property sync. |
| `@charliewilco/extensions/datepicker` | `<uix-datepicker>` | Date input with `value` sync. |
| `@charliewilco/extensions/dialog` | `<uix-dialog>` | Dialog surface with `open`, `show()`, and `close()`. |
| `@charliewilco/extensions/dropdown-menu` | `<uix-dropdown-menu>` | Native details/summary dropdown. |
| `@charliewilco/extensions/input-group` | `<uix-input-group>` | Input composition wrapper. |
| `@charliewilco/extensions/loading-spinner` | `<uix-loading-spinner>` | Loading indicator. |
| `@charliewilco/extensions/progress` | `<uix-progress>` | Progress bar with `value` and `max`. |
| `@charliewilco/extensions/separator` | `<uix-separator>` | Horizontal or vertical separator. |
| `@charliewilco/extensions/skeleton` | `<uix-skeleton>` | Placeholder loading block. |
| `@charliewilco/extensions/slider` | `<uix-slider>` | Range input with output text and `value` sync. |
| `@charliewilco/extensions/sortable-table` | `<uix-sortable-table>` | Sorts slotted table rows by header clicks. |
| `@charliewilco/extensions/switch-toggle` | `<uix-switch-toggle>` | Switch control with `checked` property sync. |
| `@charliewilco/extensions/tab-lock` | `<uix-tab-lock>` | Loops focus within slotted content. |
| `@charliewilco/extensions/toast-notification` | `<uix-toast-notification>` | Polite live-region notification. |
| `@charliewilco/extensions/toggle` | `<uix-toggle>` | Two-state toggle button. |
| `@charliewilco/extensions/tooltip` | `<uix-tooltip>` | Hover/focus tooltip from a `text` attribute. |

## Examples

```html
<uix-alert tone="warning">
	<span slot="title">Heads up</span>
	Check the configuration before deploying.
</uix-alert>

<uix-dialog open>
	<h2>Delete project?</h2>
	<p>This action cannot be undone.</p>
</uix-dialog>

<uix-tooltip text="Save changes">
	<button type="button">Save</button>
</uix-tooltip>
```

## Development

```bash
npm install
npm run typecheck
npm run build
npm run test
```

Use CI parity before opening a PR:

```bash
npm run typecheck && npm run build && npm run test
```
