import './index.css';
import imgCharcoalAndAsh from './images/charcoal-and-ash.webp';
import imgCoralAndBeige from './images/coral-and-beige.webp';
import imgEmeraldAndLime from './images/emerald-and-lime.webp';
import imgIndigoAndLightBlue from './images/indigo-and-light-blue.webp';
import imgTurquoiseAndMint from './images/turquoise-and-mint.webp';
import CarouselUI from './CarouselUI.js';
import CarouselController from './CarouselController.js';

const images = [
  imgCharcoalAndAsh,
  imgCoralAndBeige,
  imgEmeraldAndLime,
  imgIndigoAndLightBlue,
  imgTurquoiseAndMint,
];

const carousel = new CarouselUI(document.querySelector('#carousel-wrapper'));
const carouselController = new CarouselController(carousel);

images.forEach((image) => carouselController.addImage(image));
carouselController.autoscroll();
