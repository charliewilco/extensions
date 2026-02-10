export const toBool = (value: string | null): boolean => value !== null && value !== "false";

export const defineOnce = (name: string, ctor: CustomElementConstructor): void => {
  if (!customElements.get(name)) {
    customElements.define(name, ctor);
  }
};
