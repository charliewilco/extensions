import { rmSync } from "node:fs";

const targets = process.argv.slice(2);

for (const target of targets.length > 0 ? targets : ["dist"]) {
	rmSync(target, {
		recursive: true,
		force: true,
		maxRetries: 3,
		retryDelay: 100,
	});
}
