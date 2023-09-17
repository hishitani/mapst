
// Swipe mobile 425px 

// const mobileSwipe = () => {
// 	const swipeDown = document.getElementById("swipeBlock");
// 	const container = document.querySelector('.block-street')

// 	let startY;
// 	let isSwiping = false;
// 	let isReset = false;

// 	swipeDown.addEventListener("touchstart", function (event) {
// 		startY = event.touches[0].clientY;
// 		isSwiping = true;
// 	});


// 	container.addEventListener("touchmove", function (event) {
// 		if (!isSwiping) return;

// 		const endY = event.changedTouches[0].clientY;
// 		const deltaY = endY - startY;

// 		const detail = document.querySelector('.street__block-detail');


// 		if (deltaY > 0) {
// 			// Внизовй свайп - удаление элементов
// 			const hideElements = Array.from(container.getElementsByClassName("hide-element"));
// 			const disable = document.querySelectorAll('.disable');

// 			container.style.transform = 'translate(0px, 450px)';

// 			hideElements.forEach(item => {
// 				item.classList.add('hiden')
// 			});

// 			disable.forEach(item => {
// 				item.classList.remove('disable')
// 			});

// 			if(window.innerWidth === 425){
// 				detail.style.flexDirection = "row";
// 				detail.style.justifyContent = 'start';
// 			}
// 			else{
// 				detail.style.flexDirection = "colum";

// 			}

// 		} else {
// 			// Верхний свайп - возвращение элементов на место
// 			const removedElements = Array.from(container.getElementsByClassName("hide-element"));
// 			container.style.transform = 'translate(0px, 0px)';

// 			removedElements.forEach(item => {
// 				item.classList.remove('hiden');
// 			});



// 		}

// 		isSwiping = false;


// 		window.addEventListener("resize", function () {
// 			if (window.innerWidth >= 768) {
// 				resetElements();
// 			}
// 		});

// 		function resetElements() {
// 			if (!isReset) {
// 				container.style.transform = 'translate(0px, 0px)';
// 				isReset = true;
// 			}
// 		}


// 	});
// }


// mobileSwipe()


// function mobileSwipe(){

// 	const myBlock = document.getElementById("swipeBlock");
// 	const itemsHidden = document.querySelectorAll(".hidden");

// 	let startY;
// 	let initialTop;
// 	let isSwiping = false;
// 	let isInsideBlock = false;

// 	myBlock.addEventListener("touchstart", function(event) {
// 	  startY = event.touches[0].clientY;
// 	  const blockCoordinates = myBlock.getBoundingClientRect();
// 	  initialTop = blockCoordinates.top;
// 	  isSwiping = true;

// 	  if (
// 		 event.touches[0].clientX >= blockCoordinates.left &&
// 		 event.touches[0].clientX <= blockCoordinates.right &&
// 		 event.touches[0].clientY >= blockCoordinates.top &&
// 		 event.touches[0].clientY <= blockCoordinates.bottom
// 	  ) {
// 		 isInsideBlock = true;
// 	  } else {
// 		 isInsideBlock = false;
// 	  }
// 	});

// 	myBlock.addEventListener("touchmove", function(event) {
// 	  if (!isSwiping || isInsideBlock) return;

// 	  const currentY = event.touches[0].clientY;
// 	  const deltaY = currentY + startY;

// 	  if (deltaY <= 0) {
// 		 myBlock.style.transform = `translateY(200px)`;
// 		 console.log(myBlock)
// 			itemsHidden.forEach(function(item){
// 				item.classList.add('hiden')
// 				console.log(item)
// 			})
// 		}
// 	});

// 	myBlock.addEventListener("touchend", function(event) {
// 	  isSwiping = false;

// 	  if (isInsideBlock) {
// 		 myBlock.style.transform = "translateY(0)";
// 		 itemsHidden.forEach(function(item){
// 			item.classList.remove('hiden')
// 			console.log(item)
// 		})
// 	  }
// 	});
// }

// mobileSwipe()


function mobileSwipe() {

	const blockItem = document.getElementById('swipeBlock');
	const block = document.querySelector('.block-street');
	const itemsHidden = document.querySelectorAll(".hidden");

	let startY = null;
	let maxHeight;
	let allowScroll = true;

	function handleSwipeStart(e) {
		startY = e.touches[0].clientY;
		maxHeight = window.innerHeight + block.clientHeight;
		allowScroll = true;
	}

	function handleSwipeMove(e) {
		if (startY === null) return;

		const currentY = e.touches[0].clientY;
		const deltaY = currentY - startY;
		const hidden = document.querySelector('.strret__content-hidden');
		const detail = document.querySelectorAll('.street__block-detail');
		const detailHidden = document.getElementById('detail-hidden');

		if (deltaY < 0) {
			
			block.style.transform = 'translateY(0)';

			itemsHidden.forEach(function (item) {
				item.classList.remove('hiden')
			})

			detail.forEach(function(item) {
				item.classList.remove('flex-row')
				detailHidden.classList.remove('hiden')
			})

			document.querySelector('.zone_btn--tab').click();

			if(window.innerWidth > 425){
				block.style.transform = 'translateY(0)';
				console.log(block)
			}
			
			allowScroll = false;

		} else if (deltaY < maxHeight && allowScroll) {
			block.style.transform = `translateY(${deltaY}px)`;
			itemsHidden.forEach(function (item) {
				item.classList.add('hiden')
			})

			detail.forEach(function(item) {
				item.classList.add('flex-row')
				detailHidden.classList.add('hiden')
			})


			hidden.style.display = "grid"

			allowScroll = true;

		} else {
			block.style.transform = `translateY(${maxHeight}px)`;

			itemsHidden.forEach(function (item) {
				item.classList.add('hiden')
			})

			allowScroll = false;
		}

		e.preventDefault();
	}

	function handleSwipeEnd() {
		startY = null;
	}

	block.addEventListener('touchstart', handleSwipeStart);
	blockItem.addEventListener('touchmove', handleSwipeMove, { passive: false });
	block.addEventListener('touchend', handleSwipeEnd);

}

mobileSwipe();




function openBlock() {

	const blockStreet = document.querySelector('.block-street');
	const close = document.querySelector('.street__close');
	const open = document.querySelector('.maps-dot');
	const showStreet = document.querySelector('.show-street');


	open.addEventListener('click', () => {

		blockStreet.classList.toggle('street-show');

		showStreet.addEventListener('click', (e) => {
			if (e.target === showStreet) {
				blockStreet.classList.remove('street-show');
			}
		});
	});

	close.addEventListener('click', () => {
		blockStreet.classList.remove('street-show');
	});

};

openBlock();




// Viewer image
function viewerImage() {
	const images = document.querySelectorAll('.street__block-image img');
	const imageViewer = document.getElementById('imageViewer');

	images.forEach((image) => {
		image.addEventListener('click', () => {
			imageViewer.innerHTML = '';

			const fullImage = document.createElement('img');
			fullImage.src = image.src;
			fullImage.alt = image.alt;

			imageViewer.appendChild(fullImage);
			imageViewer.classList.add('show');
		});
	});

	imageViewer.addEventListener('click', (e) => {
		if (e.target === imageViewer) {
			imageViewer.innerHTML = '';
			imageViewer.classList.remove('show');
		}
	});
}

viewerImage();



function clickTabs() {

	const tabsBtn = document.querySelectorAll('.zone_btn--tab');
	const tabsItem = document.querySelectorAll('.street__info-item');
	const hidden = document.querySelector('.strret__content-hidden');
	const tabTwo = document.querySelector('.street__info-reviews');

	tabsBtn.forEach(function (item) {
		item.addEventListener('click', () => {
			let currentBtn = item;
			let tabId = currentBtn.getAttribute("data-tab");
			let currentTab = document.querySelector(tabId);

			if (!currentBtn.classList.contains("active")) {

				tabsBtn.forEach(function (item) {
					item.classList.remove("active")
				});

				tabsItem.forEach(function (item) {
					item.classList.remove("active")
				});

				currentBtn.classList.add("active");
				currentTab.classList.add("active");
			}

			if(tabTwo.classList.contains('active')){
				hidden.style.display = "none"
			} else{
				hidden.style.display = "grid"
			}
			
		});
	})

	document.querySelector('.zone_btn--tab').click();

}

clickTabs()


// Swiper slider
const swiper = new Swiper('.swiper-container', {
	loop: true,
	slidesPerView: 1,
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},
});


function swiperSlider() {
	const button = document.querySelector('.link')
	const sliderViewer = document.getElementById('sliderViewer');
	const swiper = document.querySelector('.swiper-container');
	const swiperButton = document.querySelector('.swiper-close');

	button.addEventListener('click', () => {
		button.classList.toggle('active');
		sliderViewer.classList.add('slider-show');
		swiper.classList.add('slider-show');

		sliderViewer.addEventListener('click', (e) => {
			if (e.target === sliderViewer) {
				swiper.classList.remove('slider-show');
				sliderViewer.classList.remove('slider-show');
			}
			if (e.target === swiperButton) {
				swiper.classList.remove('slider-show');
				sliderViewer.classList.remove('slider-show');
			}
		});
	})
}

swiperSlider()


function buttonActive() {
	const buttons = document.querySelectorAll('.reviews__item--like');

	buttons.forEach((button) => {
		button.addEventListener('click', () => {
			button.classList.toggle('active')
		})
	})
}

buttonActive()


function openReview() {
	const reviewsModal = document.querySelector('.modal-review')
	const reviewBtn = document.querySelector('.street__edit--reviews')
	const closeReviews = document.querySelector('.review__close')
	const disable = document.querySelector('.show-street')
	reviewBtn.addEventListener('click', () => {
		reviewsModal.classList.toggle('active-reviews')

		reviewsModal.addEventListener('click', (e) => {
			if (e.target === reviewsModal) {
				reviewsModal.classList.remove('active-reviews')
			}
		})

		closeReviews.addEventListener('click', () => {
			reviewsModal.classList.remove('active-reviews')
		})
	})
}

openReview()