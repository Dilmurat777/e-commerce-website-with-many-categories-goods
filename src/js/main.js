const trendingRow = document.querySelector('.trending__row');
const lessPriceRow = document.querySelector('.less__price-row');
const trendingBtn = document.querySelector('#trendingBtn');
const lessPriceBtn = document.querySelector('#less__price-btn');

function getAllTrending(limit = 5) {
	fetch(`http://localhost:8000/products?_sort=rating.rate&_order=desc&_limit=${limit}`)
	.then((res) => res.json())
	.then((res) => {
					trendingRow.innerHTML = '',
					res.forEach((item) => {
						trendingRow.innerHTML += `
						<div class="trending__card">
							<a href='pages/product/index.html?product=${item.id}'>
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

getAllTrending()

trendingBtn.addEventListener('click', function(){
	if(trendingBtn.textContent === 'See more') {
		getAllTrending(15)
		trendingBtn.textContent = 'Hide'
	} else {
		getAllTrending()
		trendingBtn.textContent = 'See more'
	}
})

function getLessPrice(limit = 5) {
	fetch(`http://localhost:8000/products?price_lte=100&_limit=${limit}`)
				.then((res) => res.json())
				.then((res) => {
					lessPriceRow.innerHTML = '',
					res.forEach((item) => {
						lessPriceRow.innerHTML += `
						<div class="trending__card">
						<a href='pages/product/index.html?product=${item.id}'>
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

getLessPrice()

lessPriceBtn.addEventListener('click', function(){
	if(lessPriceBtn.textContent === 'See more') {
		getLessPrice(12)
		lessPriceBtn.textContent = 'Hide'
	} else {
		getLessPrice()
		lessPriceBtn.textContent = 'See more'
	}
})
