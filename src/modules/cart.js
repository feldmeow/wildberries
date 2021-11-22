const cart = () => {
	const btnCart = document.querySelector('.button-cart');
	const modalCart = document.getElementById('modal-cart');
	const btnCartClose = modalCart.querySelector('.modal-close');
	const goodsContainer = document.querySelector('.long-goods-list');
	const cartTable = document.querySelector('.cart-table__goods');
	const modalForm = document.querySelector('.modal-form');
	const allPrice = document.querySelector('.card-table__total');

	const deleteCartItem = (id) => {
		const cart = JSON.parse(localStorage.getItem('cart'));
		const newCart = cart.filter((good) => good.id !== id);
		localStorage.setItem('cart', JSON.stringify(newCart));
		renderCartGoods(JSON.parse(localStorage.getItem('cart')));
	};

	const plusCartItem = (id) => {
		const cart = JSON.parse(localStorage.getItem('cart'));
		const newCart = cart.map((good) => {
			if (good.id === id) {
				good.count++;
			}
			return good;
		});
		localStorage.setItem('cart', JSON.stringify(newCart));
		renderCartGoods(JSON.parse(localStorage.getItem('cart')));
	};

	const minusCartItem = (id) => {
		const cart = JSON.parse(localStorage.getItem('cart'));
		const newCart = cart.map((good) => {
			if (good.id === id) {
				if (good.count > 0) {
					good.count--;
				}
			}
			return good;
		});
		localStorage.setItem('cart', JSON.stringify(newCart));
		renderCartGoods(JSON.parse(localStorage.getItem('cart')));
	};

	const addToCart = (id) => {
		const goods = JSON.parse(localStorage.getItem('goods'));
		const clickedGood = goods.find((good) => good.id === id);
		const cart = localStorage.getItem('cart')
			? JSON.parse(localStorage.getItem('cart'))
			: [];

		if (cart.some((good) => good.id === clickedGood.id)) {
			cart.map((good) => {
				if (good.id === clickedGood.id) {
					good.count++;
				}
				return good;
			});
		} else {
			clickedGood.count = 1;
			cart.push(clickedGood);
		}

		localStorage.setItem('cart', JSON.stringify(cart));
	};

	const renderCartGoods = (goods) => {
		let goodsPrice = 0;
		cartTable.innerHTML = '';
		goods.forEach((good) => {
			const tr = document.createElement('tr');
			tr.innerHTML = `
				<td>${good.name}</td>
				<td>${good.price}$</td>
				<td><button class="cart-btn-minus"">-</button></td>
				<td>${good.count}</td>
				<td><button class="cart-btn-plus"">+</button></td>
				<td>${+good.price * +good.count}$</td>
				<td><button class="cart-btn-delete"">x</button></td>											
			`;

			cartTable.append(tr);

			tr.addEventListener('click', (e) => {
				if (e.target.classList.contains('cart-btn-minus')) {
					minusCartItem(good.id);
				} else if (e.target.classList.contains('cart-btn-plus')) {
					plusCartItem(good.id);
				} else if (e.target.classList.contains('cart-btn-delete')) {
					deleteCartItem(good.id);
				}
			});
			goodsPrice += good.price * good.count;
		});
		allPrice.textContent = goodsPrice;
	};

	const sendForm = () => {
		const inputName = document.getElementsByName('nameCustomer')[0];
		const inputPhone = document.getElementsByName('phoneCustomer')[0];
		const cartArray = localStorage.getItem('cart')
			? JSON.parse(localStorage.getItem('cart'))
			: [];
		fetch('https://jsonplaceholder.typicode.com/posts', {
			method: 'POST',
			body: JSON.stringify({
				cart: cartArray,
				name: inputName.value.trim(),
				tel: inputPhone.value.trim(),
			}),
		}).then(() => {
			inputName.value = '';
			inputPhone.value = '';
			localStorage.removeItem('cart');
			modalCart.style.display = '';
		});
	};

	modalForm.addEventListener('submit', (e) => {
		e.preventDefault();
		sendForm();
	});

	btnCart.addEventListener('click', () => {
		const cartArray = localStorage.getItem('cart')
			? JSON.parse(localStorage.getItem('cart'))
			: [];

		renderCartGoods(cartArray);

		modalCart.style.display = 'flex';
	});
	btnCartClose.addEventListener('click', () => {
		modalCart.style.display = '';
	});
	modalCart.addEventListener('click', (e) => {
		if (!e.target.closest('.modal') && e.target.classList.contains('overlay')) {
			modalCart.style.display = '';
		}
	});
	window.addEventListener('keydown', (e) => {
		if (e.key === 'Escape') {
			modalCart.style.display = '';
		}
	});

	if (goodsContainer) {
		goodsContainer.addEventListener('click', (e) => {
			if (e.target.closest('.add-to-cart')) {
				const btnToCart = e.target.closest('.add-to-cart');
				const goodId = btnToCart.dataset.id;

				addToCart(goodId);
			}
		});
	}
};

export default cart;
