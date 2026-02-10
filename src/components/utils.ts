/**
 * Converts a nullable string attribute value into a boolean.
 */
export const toBool = (value: string | null): boolean =>
	value !== null && value !== "false";

/**
 * Defines a custom element only if it has not been registered yet.
 */
export const defineOnce = (
	name: string,
	ctor: CustomElementConstructor,
): void => {
	if (!customElements.get(name)) {
		customElements.define(name, ctor);
	}
};
