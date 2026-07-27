import { readFile } from "node:fs/promises";

const packageUrl = new URL("../../package.json", import.meta.url);
const packageJson = JSON.parse(await readFile(packageUrl, "utf8"));

function labelFromPath(path) {
	return path
		.replace("./", "")
		.split("-")
		.map((part) => part.charAt(0).toUpperCase() + part.slice(1))
		.join(" ");
}

export default Object.keys(packageJson.exports)
	.filter((path) => path !== ".")
	.map((path) => {
		const name = path.replace("./", "");

		return {
			label: labelFromPath(path),
			tag: `uix-${name}`,
			importPath: `${packageJson.name}/${name}`,
		};
	})
	.sort((a, b) => a.label.localeCompare(b.label));
