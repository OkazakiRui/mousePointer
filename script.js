class Cursor {
  constructor() {
    const el = `
    <div class="cursor">
      <div class="pointer"></div>
      <div class="stoker"></div>
    </div>`;
    document.body.insertAdjacentHTML("beforeend", el);
    this.wrap_el = document.querySelector(".cursor");
    this.pointer_el = document.querySelector(".pointer");
    this.stoker_el = document.querySelector(".stoker");

    this.position = {
      mouseX: 0,
      mouseY: 0,
      currentX: 0,
      currentY: 0,
    };
  }

  init() {
    this.attachEvent();
    this.tween();
  }
  attachEvent() {
    // マウスが動いた時
    document.addEventListener("mousemove", (e) => {
      this.position.mouseX = e.clientX;
      this.position.mouseY = e.clientY;
      this.wrap_el.classList.add("is-move");
    });

    // マウスが画面外に行った時
    document.body.addEventListener("mouseleave", () => {
      this.wrap_el.classList.add("is-outside");
    });
    document.body.addEventListener("mouseenter", () => {
      this.wrap_el.classList.remove("is-outside");
    });
  }

  tween() {
    TweenMax.to({}, 0.001, {
      repeat: -1,
      onRepeat: () => {
        this.position.currentX +=
          (this.position.mouseX - this.position.currentX) * 0.5;
        this.position.currentY +=
          (this.position.mouseY - this.position.currentY) * 0.5;

        // pointerの設定
        TweenMax.set(this.pointer_el, {
          css: {
            x: this.position.currentX - this.pointer_el.clientWidth / 2,
            y: this.position.currentY - this.pointer_el.clientHeight / 2,
          },
        });
        // stokerの設定
        // 0.3s掛けて向かう
        TweenMax.to(this.stoker_el, 0.3, {
          css: {
            x: this.position.currentX - this.stoker_el.clientWidth / 2,
            y: this.position.currentY - this.stoker_el.clientHeight / 2,
          },
        });
      },
    });
  }
}

let cursor = new Cursor();
cursor.init();
