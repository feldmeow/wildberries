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
};

cart();
