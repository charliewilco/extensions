export class XCarousel extends HTMLElement {
  public static readonly tagName = "x-carousel";
  private currentIndex = 0;

  public connectedCallback(): void {
    if (this.shadowRoot) return;
    const root = this.attachShadow({ mode: "open" });
    root.innerHTML = `
      <style>
        :host { display: block; }
        .viewport { overflow: hidden; }
        .track { display: flex; transition: transform .25s ease; }
        .controls { display: flex; gap: .5rem; margin-top: .5rem; }
        ::slotted(*) { flex: 0 0 100%; }
      </style>
      <div class="viewport"><div class="track"><slot></slot></div></div>
      <div class="controls">
        <button part="prev" type="button">Prev</button>
        <button part="next" type="button">Next</button>
      </div>
    `;
    const prev = root.querySelector<HTMLButtonElement>('button[part="prev"]');
    const next = root.querySelector<HTMLButtonElement>('button[part="next"]');
    if (!prev || !next) throw new Error("Carousel controls missing");
    prev.addEventListener("click", () => this.step(-1));
    next.addEventListener("click", () => this.step(1));
    this.update();
  }

  private step(delta: number): void {
    const itemCount = this.children.length;
    if (itemCount === 0) return;
    this.currentIndex = (this.currentIndex + delta + itemCount) % itemCount;
    this.update();
  }

  private update(): void {
    const track = this.shadowRoot?.querySelector<HTMLElement>(".track");
    if (!track) return;
    track.style.transform = `translateX(-${this.currentIndex * 100}%)`;
  }
}
