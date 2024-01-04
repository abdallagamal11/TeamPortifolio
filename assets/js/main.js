// var swiper = new Swiper('.swiper-container', {
//     direction: 'vertical',
//     sliderPerView: 1,
//     spaceBetween: 0,
//     mousewheel: true,
//     pagination: {
//         el:'.swiper-pagination',
//         type: 'progressbar',
//     },
// 	autoHeight: true
// });

let isScrolledVisible = (elm) => {
	let windowTop = window.scrollY;
	let windowBottom = windowTop + window.innerHeight;

	let elmTop = elm.offsetTop;
	let elmBottom = elmTop + elm.offsetHeight;
	let elmHalfY = elmTop + elm.offsetHeight / 2;

	return elmTop <= windowBottom && elmHalfY <= windowBottom;
};

var counterFired = false;
let adjustCounter = () => {
	if (
		!counterFired &&
		isScrolledVisible(document.querySelector(".counter-section"))
	) {
		let valueDisplays = document.querySelectorAll(".num");
		let interval = 100;

		valueDisplays.forEach((valueDisplay) => {
			let startValue = 0;
			let endValue = parseInt(valueDisplay.getAttribute("data-value"));
			let duration = Math.floor(interval / endValue);
			let counter = setInterval(() => {
				startValue += 1;
				valueDisplay.textContent = startValue;
				if (startValue == endValue) {
					clearInterval(counter);
				}
			}, duration);
		});
		counterFired = true;
	}
};

var navbar = document.querySelector(".navbar");

let scrollAction = () => {
	adjustCounter();
	console.log(window.scrollY, navbar.offsetTop);
	if (window.scrollY > navbar.offsetTop) {
		navbar.classList.add("scroll");
	} else {
		navbar.classList.remove("scroll");
	}
};

window.addEventListener("load", adjustCounter);
document.addEventListener("scroll", scrollAction);

// Animated Typing
const div = document.querySelector("#companyname");
const text = div.innerText;
div.innerText = "";

function TextTypingEffect(element, text, i = 0) {
	if (i === 0) {
		element.textContent = "";
	}

	element.textContent += text[i];

	if (i === text.length - 1) {
		return;
	}

	setTimeout(() => {
		TextTypingEffect(element, text, i + 1);
	}, 50);
}

TextTypingEffect(div, text);
