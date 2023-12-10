const img = document.querySelector('.product__img');
const title = document.querySelector('.product__info-title');
const price = document.querySelector('.product__info-price');
const category = document.querySelector('.product__info-category');
const rating = document.querySelector('.product__info-rating');
const description = document.querySelector('.product__info-desc');
const addCartBtn = document.querySelector('.product__add-cart');
const addFavoritesBtn = document.querySelector('.product__add-favorites');
const trendRow = document.querySelector('.trending__row');


function getAllRelatedProducts(productCategory, id) {
	fetch(`http://localhost:8000/products?category=${productCategory}&id_ne=${id}`)
	.then((res) => res.json())
	.then((res) => {
		trendRow.innerHTML = '',
					res.forEach((item) => {
						trendRow.innerHTML += `
						<div class="trending__card">
							<a href='?product=${item.id}'>
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
										${item.rating.count} people purchased
										</div>
								</div>
							</div>
						</div>
						`
					})
			})
}



function getOneProduct() {
	fetch(`http://localhost:8000/products/${location.search.split('=')[1]}`)
	.then((response) => response.json())
	.then((response) => {
		img.setAttribute('src', response.image)
		title.textContent = response.title
		price.textContent = `${response.price} $`
		category.innerHTML = `<span>category:</span> ${response.category}`
		rating.innerHTML = `<span>rating:</span> ${response.rating.rate}`
		description.textContent = response.description
		addCartBtn.dataset.id = response.id
		addFavoritesBtn.dataset.id = response.id
		getAllRelatedProducts(response.category, response.id)
	})
}

getOneProduct()









