import './index.css';
import imgCharcoalAndAsh from './images/charcoal-and-ash.webp';
import imgCoralAndBeige from './images/coral-and-beige.webp';
import imgEmeraldAndLime from './images/emerald-and-lime.webp';
import imgIndigoAndLightBlue from './images/indigo-and-light-blue.webp';
import imgTurquoiseAndMint from './images/turquoise-and-mint.webp';
import { Carousel } from './Carousel';

const carouselWrapper = document.querySelector('div.carousel-wrapper');
const carouselPrevButton = document.querySelector('.carousel__prev-btn');
const carouselNextButton = document.querySelector('.carousel__next-btn');

const images = [
  imgCharcoalAndAsh,
  imgCoralAndBeige,
  imgEmeraldAndLime,
  imgIndigoAndLightBlue,
  imgTurquoiseAndMint,
];

const carousel = new Carousel(document.querySelector('div.carousel'));
carouselPrevButton.addEventListener('click', () =>
  carousel.goToImage(carousel.previousIdx),
);
carouselNextButton.addEventListener('click', () => carousel.goToImage(carousel.nextIdx));

carouselWrapper.append(carousel.carousel);
images.forEach((image) => carousel.addImage(image));

carousel.autoscroll();
