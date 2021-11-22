import Swiper, { Autoplay, Navigation, Pagination } from 'swiper';

Swiper.use([Navigation, Pagination, Autoplay]);

const slider = () => {
	const swiper = new Swiper('.swiper-container', {
		loop: true,
		speed: 700,

		autoplay: {
			delay: 2500,
			disableOnInteraction: false,
		},

		navigation: {
			nextEl: '.slider-button-next',
			prevEl: '.slider-button-prev',
		},
	});
};

export default slider;
