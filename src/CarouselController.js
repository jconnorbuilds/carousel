export default class CarouselController {
  #imageCount = 0;
  #timeoutId = null;
  constructor(uiManager) {
    this.uiManager = uiManager;
    this.currentImageIdx = 0;
    this.scrollInterval = 2500;
    this.#setupEventHandlers();
  }

  get nextIdx() {
    return this.currentImageIdx < this.maxIdx ? +this.currentImageIdx + 1 : 0;
  }

  get previousIdx() {
    return this.currentImageIdx > 0 ? +this.currentImageIdx - 1 : this.maxIdx;
  }

  get maxIdx() {
    return this.#imageCount - 1;
  }

  #updateUI(idx) {
    this.uiManager.update(idx);
  }

  addImage(imgURI) {
    const img = document.createElement('img');
    img.src = imgURI;
    img.dataset.idx = this.#imageCount;

    this.uiManager.carousel.append(img);
    this.uiManager.makeJumpToButton(img.dataset.idx);
    this.#imageCount++;
  }

  goToImage(idx) {
    if (idx > this.maxIdx)
      throw Error(
        `Invalid index! Provided idx ${idx} is larger than the maximum allowed index ${this.maxIdx}`,
      );
    this.currentImageIdx = idx;
    this.#updateUI(this.currentImageIdx);

    // Pause scrolling briefly when an image is selected directly
    clearTimeout(this.#timeoutId);
    this.autoscroll(10000);
  }

  #autoNextImage() {
    this.currentImageIdx = this.nextIdx;
    this.#updateUI(this.currentImageIdx);
    this.autoscroll();
  }

  autoscroll(interval = this.scrollInterval) {
    this.#timeoutId = setTimeout(() => this.#autoNextImage(), interval);
  }

  #setupEventHandlers() {
    this.uiManager.setEventHandlers(
      () => this.goToImage(this.previousIdx),
      () => this.goToImage(this.nextIdx),
      (idx) => this.goToImage(idx),
    );
  }
}
