import { toBool } from "./utils";

/**
 * A lightweight dialog surface with open attribute synchronization.
 */
export class XDialog extends HTMLElement {
	public static readonly tagName = "uix-dialog";
	private readonly dialog: HTMLDialogElement;
	private readonly closeButton: HTMLButtonElement;

	public static get observedAttributes(): string[] {
		return ["open"];
	}

	public constructor() {
		super();
		const root = this.attachShadow({ mode: "open" });
		root.innerHTML = `
			<style>
				:host { display: contents; }
				dialog { max-width: min(32rem, calc(100vw - 2rem)); border: 1px solid #cbd5e1; border-radius: 0.5rem; padding: 1rem; color: inherit; box-shadow: 0 20px 50px rgba(15, 23, 42, 0.2); }
				dialog::backdrop { background: rgba(15, 23, 42, 0.4); }
				[part="close"] { position: absolute; top: 0.5rem; right: 0.5rem; border: 0; border-radius: 999px; width: 1.75rem; height: 1.75rem; background: transparent; color: inherit; cursor: pointer; font: inherit; }
			</style>
			<dialog part="dialog">
				<button part="close" type="button" aria-label="Close">x</button>
				<slot></slot>
			</dialog>
		`;
		const dialog = root.querySelector("dialog");
		const closeButton = root.querySelector("button");
		if (!dialog || !closeButton) throw new Error("Dialog internals missing");
		this.dialog = dialog;
		this.closeButton = closeButton;
		this.closeButton.addEventListener("click", () => this.close());
		this.dialog.addEventListener("close", () => {
			this.open = false;
			this.dispatchEvent(new CustomEvent("close"));
		});
	}

	public connectedCallback(): void {
		this.sync();
	}

	public attributeChangedCallback(): void {
		this.sync();
	}

	/**
	 * Whether the dialog is visible.
	 */
	public get open(): boolean {
		return toBool(this.getAttribute("open"));
	}

	public set open(value: boolean) {
		this.toggleAttribute("open", value);
	}

	/**
	 * Opens the dialog.
	 */
	public show(): void {
		this.open = true;
	}

	/**
	 * Closes the dialog.
	 */
	public close(): void {
		this.open = false;
		this.dispatchEvent(new CustomEvent("close"));
	}

	/**
	 * Synchronizes host open state to the internal dialog element.
	 */
	private sync(): void {
		this.dialog.toggleAttribute("open", this.open);
	}
}
