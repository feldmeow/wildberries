const cart = () => {
	const btnCart = document.querySelector('.button-cart');
	const modalCart = document.getElementById('modal-cart');
	const btnCartClose = modalCart.querySelector('.modal-close');
	btnCart.addEventListener('click', () => {
		modalCart.style.display = 'flex';
	});
	btnCartClose.addEventListener('click', () => {
		modalCart.style.display = '';
	});
	modalCart.addEventListener('click', (e) => {
		if (!e.target.closest('.modal')) {
			modalCart.style.display = '';
		}
	});
	window.addEventListener('keydown', (e) => {
		if (e.key === 'Escape') {
			modalCart.style.display = '';
		}
	});
};

export default cart;
