import { defineConfig } from "rolldown";

const entryPoints = [
	"index",
	"button-group",
	"input-group",
	"loading-spinner",
	"switch-toggle",
	"custom-checkbox",
	"toast-notification",
	"skeleton",
	"dropdown-menu",
	"sortable-table",
	"tab-lock",
	"card",
	"datepicker",
	"carousel",
	"combobox",
	"slider",
];

export default defineConfig({
	input: Object.fromEntries(
		entryPoints.map((name) => [name, `src/${name}.ts`]),
	),
	output: {
		dir: "dist",
		format: "es",
		entryFileNames: "[name].js",
	},
});
