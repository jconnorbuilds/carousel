export class Carousel {
  constructor(carouselEl) {
    this.carousel = carouselEl;
    this.carouselWrapper = document.querySelector('#carousel-wrapper');
    this.jumpToButtonContainer = this.#makeJumpToButtonContainer();
    this.jumpToButtonsList = [];
    this.imageCount = 0;
    this.currentImageIdx = 0;
    this.timeoutId = null;
    this.scrollInterval = 5000;
  }

  addImage(imgURI) {
    const img = document.createElement('img');
    img.src = imgURI;
    img.dataset.idx = this.imageCount;
    this.carousel.append(img);
    this.#makeJumpToButton(img.dataset.idx);
    this.imageCount++;
  }

  get nextIdx() {
    return this.currentImageIdx < this.maxIdx ? +this.currentImageIdx + 1 : 0;
  }

  get previousIdx() {
    return this.currentImageIdx > 0 ? +this.currentImageIdx - 1 : this.maxIdx;
  }

  get maxIdx() {
    return this.imageCount - 1;
  }

  scrollToNext() {
    this.carousel.style.transform = `translateX(-${this.nextIdx}00%)`;
    this.currentImageIdx = this.nextIdx;
    this.#updateJumpToButtonStyling();
    this.autoscroll();
  }

  goToImage(idx) {
    if (idx > this.maxIdx)
      throw Error(
        `Invalid index! Provided idx ${idx} is larger than the maximum allowed index ${this.maxIdx}`,
      );

    this.carousel.style.transform = `translateX(-${idx}00%)`;
    this.currentImageIdx = idx;
    this.#updateJumpToButtonStyling();
    clearTimeout(this.timeoutId);
    this.autoscroll(10000);
  }

  autoscroll(interval = this.scrollInterval) {
    this.timeoutId = setTimeout(() => this.scrollToNext(), interval);
  }

  #makeJumpToButtonContainer() {
    const container = document.createElement('div');
    container.classList.add('carousel__jumpto-btns');
    this.carouselWrapper.append(container);
    return container;
  }

  #makeJumpToButton(imageIdx) {
    const button = document.createElement('button');
    button.type = 'button';
    button.value = imageIdx;
    if (button.value == 0) button.classList.add('active');
    button.addEventListener('click', this.#handleJumpToButtonClick.bind(this));
    this.jumpToButtonsList.push(button);
    this.jumpToButtonContainer.append(button);
  }

  #handleJumpToButtonClick(e) {
    const button = e.target;
    this.goToImage(button.value);
  }

  #updateJumpToButtonStyling(idx = this.currentImageIdx) {
    this.jumpToButtonsList.forEach((button) => {
      button.classList.toggle('active', button.value == idx);
    });
  }
}
