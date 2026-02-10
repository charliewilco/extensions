export class XToastNotification extends HTMLElement {
  public static readonly tagName = "x-toast-notification";

  public constructor() {
    super();
    const root = this.attachShadow({ mode: "open" });
    root.innerHTML = `
      <style>
        :host { display: block; }
        .toast { background: #111827; color: white; padding: 0.75rem 1rem; border-radius: 0.5rem; box-shadow: 0 8px 20px rgba(0,0,0,.2); }
      </style>
      <div class="toast" role="status" aria-live="polite"><slot>Notification</slot></div>
    `;
  }
}
