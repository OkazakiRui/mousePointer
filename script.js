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
    this.eventStatus = {
      click: false,
      hover: false,
    };
  }

  init() {
    this.attachEvent();
    this.tween();
  }
  attachEvent() {
    document.addEventListener("mousemove", (e) => {
      this.position.mouseX = e.clientX;
      this.position.mouseY = e.clientY;
      this.wrap_el.classList.add("is-move");
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

        TweenMax.set(this.pointer_el, {
          css: {
            x: this.position.currentX - 5,
            y: this.position.currentY - 5,
          },
        });
      },
    });
  }
}

let cursor = new Cursor();
cursor.init();