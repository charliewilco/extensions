import { defineConfig } from "rolldown";

const entryPoints = [
	"index",
	"accordion",
	"alert",
	"avatar",
	"badge",
	"button-group",
	"dialog",
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
	"collapsible",
	"toggle",
	"tooltip",
	"progress",
	"separator",
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
