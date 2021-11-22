const getGoods = () => {
	const links = document.querySelectorAll('.navigation-link');

	const getData = () => {
		fetch('./db/db.json')
			.then((res) => res.json())
			.then((data) => {
				data.forEach((data) => {
					localStorage.setItem(data.id, JSON.stringify({ name: data.name }));
				});
			});
	};

	links.forEach((link) => {
		link.addEventListener('click', (event) => {
			event.preventDefault();
			getData();
		});
	});
};

export default getGoods;
