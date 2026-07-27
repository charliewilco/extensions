import "../src/index.ts";

const tabGroups = document.querySelectorAll("[data-tabs]");

for (const group of tabGroups) {
	const tabs = Array.from(group.querySelectorAll("[role='tab']"));
	const panels = Array.from(group.querySelectorAll("[role='tabpanel']"));

	for (const tab of tabs) {
		tab.addEventListener("click", () => {
			const panelId = tab.getAttribute("aria-controls");
			if (!panelId) return;

			for (const nextTab of tabs) {
				const selected = nextTab === tab;
				nextTab.setAttribute("aria-selected", String(selected));
				nextTab.setAttribute("tabindex", selected ? "0" : "-1");
			}

			for (const panel of panels) {
				panel.hidden = panel.id !== panelId;
			}
		});
	}
}

for (const button of document.querySelectorAll("[data-copy]")) {
	button.addEventListener("click", async () => {
		const targetId = button.getAttribute("data-copy");
		const target = targetId ? document.getElementById(targetId) : null;
		if (!target) return;

		await navigator.clipboard.writeText(target.textContent?.trim() ?? "");
		const original = button.textContent ?? "Copy";
		button.textContent = "Copied";
		setTimeout(() => {
			button.textContent = original;
		}, 1200);
	});
}

const deleteDialog = document.querySelector("#delete-dialog");
document.querySelector("#open-delete-dialog")?.addEventListener("click", () => {
	deleteDialog?.show();
});

document.querySelector("#raise-progress")?.addEventListener("click", () => {
	const progress = document.querySelector("#release-progress");
	if (!progress) return;
	const value = Number(progress.getAttribute("value") ?? "0");
	progress.setAttribute("value", String(value >= 100 ? 20 : value + 20));
});

document.querySelector("#show-toast")?.addEventListener("click", () => {
	const toast = document.querySelector("#status-toast");
	if (!toast) return;
	toast.textContent = `Saved at ${new Date().toLocaleTimeString()}`;
});
