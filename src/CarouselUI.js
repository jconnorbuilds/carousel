export default class CarouselUI {
  #jumpToButtonsList = [];
  #jumpToButtonContainer;
  constructor(carouselWrapper) {
    this.carousel = this.#createCarousel();
    this.carouselWrapper = carouselWrapper;
    this.#jumpToButtonContainer = this.#makeJumpToButtonContainer();
    this.#initUI();
  }

  update(idx) {
    this.updateDisplayedImage(idx);
    this.#updateJumpToButtonStyling(idx);
  }

  updateDisplayedImage(idx) {
    this.carousel.style.transform = `translateX(-${idx}00%)`;
  }

  #initUI() {
    this.carouselWrapper.append(this.carousel);
    this.#addNavigationButtons();
  }

  #addNavigationButtons() {
    const prevButton = document.createElement('button');
    prevButton.classList.add('carousel__prev-btn');
    prevButton.innerHTML = '<i class="fa-solid fa-chevron-left"></i>';

    const nextButton = document.createElement('button');
    nextButton.classList.add('carousel__next-btn');
    nextButton.innerHTML = '<i class="fa-solid fa-chevron-right"></i>';

    prevButton.addEventListener('click', () => this.onPrevClick());
    nextButton.addEventListener('click', () => this.onNextClick());

    this.carouselWrapper.append(prevButton, nextButton);
  }

  #createCarousel() {
    const carousel = document.createElement('div');
    carousel.classList.add('carousel');

    return carousel;
  }

  makeJumpToButton(imageIdx) {
    const button = document.createElement('button');
    button.type = 'button';
    button.value = imageIdx;
    button.classList.toggle('active', button.value == 0);

    this.#jumpToButtonsList.push(button);
    this.#jumpToButtonContainer.append(button);
  }

  #makeJumpToButtonContainer() {
    const container = document.createElement('div');
    container.classList.add('carousel__jumpto-btns');
    this.carouselWrapper.append(container);

    return container;
  }

  #updateJumpToButtonStyling(idx) {
    this.#jumpToButtonsList.forEach((button) => {
      button.classList.toggle('active', button.value == idx);
    });
  }

  setEventHandlers(onPrevClick, onNextClick, onJumpToClick) {
    this.onPrevClick = onPrevClick;
    this.onNextClick = onNextClick;
    this.onJumpToClick = onJumpToClick;

    this.#jumpToButtonContainer.addEventListener('click', (e) => {
      const idx = +e.target.value;
      this.onJumpToClick(idx);
    });
  }
}
