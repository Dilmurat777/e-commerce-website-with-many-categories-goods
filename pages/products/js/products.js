
const productsRow = document.querySelector('.mens__row');
const productsPagination = document.querySelector('.mens__pagination');
const mensSearch = document.querySelector('.mens__search');
const productFrom = document.querySelector('.product-from');
const productsSelect = document.querySelector('.mens__select');

let page = 1;


function getActiveLink() {
	const asideItem = document.querySelectorAll('.aside__item');
	const title = document.querySelector('.mens__title');

	Array.from(asideItem).forEach((item) => {
		if(location.search === item.getAttribute("href")) {
			item.classList.add('active')
			title.textContent = item.textContent
		}
	})
}

getActiveLink()


const getAllProducts = (title = '', from = 0, view = '') => {
	let select = view.length ? `&_sort=price&_order=${view}` : '';
	let category = location.search.includes('all') ? "" : `category_like=${location.search.split('=')[1]}`
	fetch(`http://localhost:8000/products?${category}&_page=${page}&_limit=5&title_like=${title}&price_gte=${from}${select}`)
			.then((res) => res.json())
			.then((res) => {
				productsRow.innerHTML = '',
				res.forEach((item) => {
					productsRow.innerHTML += `
					<div class="trending__card">
					<a href='../product/index.html?product=${item.id}'>
						<img src="${item.image}" alt="" class="trending__card-img">
					</a>
							<div class="trending__card-info">
									<h3 class="trending__card-title">
									${item.title}
									</h3>
									<p class="trending__card-category">
									${item.category}
									</p>
									<div class="trending__card-bottom">
											<p class="trending__card-price">
											${item.price}
													<span class="trending__card-oldPrice">
															79$
													</span>
											</p>
											<div class="trending__card-purchased">
											${item.rating.rate} people purchased
											</div>
									</div>
							</div>
						</div>
					`
				})
			})
}

getAllProducts()

const getAllProductsCount = (title = '', from = 0, view = '') => {
	let select = view.length ? `&_sort=price&_order=${view}` : '';
	let category = location.search.includes('all') ? "" : `category_like=${location.search.split('=')[1]}`
	fetch(`http://localhost:8000/products?${category}&title_like=${title}&price_gte=${from}${select}`)
			.then((res) => res.json())
			.then((res) => {
				productsPagination.innerHTML = ''
				for(let i = 1; i <= Math.ceil(res.length / 5); i++) {
					productsPagination.innerHTML += `
					<button style="background-color: ${page === i ? '#6c3eb8' : '#212123'}"  data-id="${i}" class="mens__pagination-btn btn">
					${i}
					</button>
					`
				}
				const paginationBtn = document.querySelectorAll('.mens__pagination-btn');
				Array.from(paginationBtn).forEach((item) => {
					item.addEventListener('click', function(){
						page = +item.dataset.id
						paginationBtn.forEach((el) => {
							if(page === +el.dataset.id) {
								el.style.background = '#6c3eb8'
							} else {
								el.style.background = '#212123'
							}
						})
						getAllProducts(mensSearch.value.toUpperCase().trim(), productFrom.value.trim(), productsSelect.value)
					})
				})
			})
}

getAllProductsCount()

mensSearch.addEventListener('input', function() {

	getAllProducts(mensSearch.value.toUpperCase().trim(), productFrom.value.trim()), productsSelect.value
	getAllProductsCount(mensSearch.value.toUpperCase().trim(), productFrom.value.trim(), productsSelect.value)

})
productFrom.addEventListener('input', function() {

	getAllProducts(mensSearch.value.toUpperCase().trim(), productFrom.value.trim(), productsSelect.value)
	getAllProductsCount(mensSearch.value.toUpperCase().trim(), productFrom.value.trim(), productsSelect.value)

})

productsSelect.addEventListener('change', function() {
	getAllProducts(mensSearch.value.toUpperCase().trim(), productFrom.value.trim(), productsSelect.value)
	getAllProductsCount(mensSearch.value.toUpperCase().trim(), productFrom.value.trim(), productsSelect.value)
})