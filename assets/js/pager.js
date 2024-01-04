let getTop = () => {
	return (
		(window.scrollY || document.documentElement.scrollTop) -
		(document.documentElement.clientTop || 0)
	);
};

class Pager {
	inPropation = false;
	totalHeight;
	pageHeight;
	lastScrollTop;
	numPages = 0;
	pages = [];
	page = 0;

	constructor() {
		this.totalHeight = document.body.offsetHeight;
		this.pageHeight = window.innerHeight;

		this.lastScrollTop = getTop();
		this.numPages = this.totalHeight / this.pageHeight;

		let offset = 0;
		for (let i = 0; i < this.numPages; i++) {
			if (this.lastScrollTop >= offset) this.page = i;
			this.pages.push(offset);
			offset += this.pageHeight;
		}
		// console.log(this.pages);
		// console.log(this.lastScrollTop);
	}

	scrollDown() {
		if (!this.pages[this.page + 1]) return;
		let nextPageOffset = this.pages[this.page + 1];
		this.page++;

		window.scrollTo({
			top: nextPageOffset,
			left: 0,
			behavior: "smooth",
		});

		this.inPropation = true;
		this.lastScrollTop = nextPageOffset;
	}

	scrollUp() {
		if (this.page == 0) return;

		let prevPageOffset = this.pages[this.page - 1];
		this.page--;

		window.scrollTo({
			top: prevPageOffset,
			left: 0,
			behavior: "smooth",
		});
		this.inPropation = true;

		this.lastScrollTop = prevPageOffset;
	}

	handleWheelMove(e) {
	//	e.preventDefault();
		e.stopPropagation();

		if (!this.inPropation) {
			if (e.deltaY > 0) {
				this.scrollDown();
			} else {
				this.scrollUp();
			}
		}
		setTimeout(() => (this.inPropation = false), 1000);
	}

	/*
	 * Mobile Part of Pager
	 */
	startX = 0;
	startY = 0;

	handleTouchStart(event) {
		this.startX = event.touches[0].clientX;
		this.startY = event.touches[0].clientY;
	}

	handleTouchMove(event) {
		
		const currentX = event.touches[0].clientX;
		const currentY = event.touches[0].clientY;

		const deltaX = currentX - this.startX;
		const deltaY = currentY - this.startY;

		// Adjust sensitivity by changing the threshold
		const threshold = 50;

		if (Math.abs(deltaX) > threshold) {
			// Horizontal swipe detected
			if (deltaX > 0) {
				console.log("Swipe right");
			} else {
				console.log("Swipe left");
			}
		} else if (Math.abs(deltaY) > threshold) {
			// Vertical swipe detected
			console.log('handleTouchMove');
			if (!this.inPropation) {
				if (deltaY > 0) {
					console.log("Swipe down");
					this.scrollUp();
				} else {
					console.log("Swipe up");
					this.scrollDown();
				}
			}
			setTimeout(() => (this.inPropation = false), 1000);
		}

		// Reset start coordinates for the next swipe
		this.startX = currentX;
		this.startY = currentY;
	}
}

let adjust = () => {
	var pager = new Pager();

	document.addEventListener("wheel", (e) => pager.handleWheelMove(e));

	// if mobile
	document.addEventListener("touchstart", (e) => pager.handleTouchStart(e));
	document.addEventListener("touchmove", (e) => pager.handleTouchMove(e));

	document.addEventListener('scrollend', (e) => 
	{
		setTimeout(() =>
		{
			let pageOffset = -1;
			let positionTop = getTop();
			pager.pages.forEach((p) => {
				if(positionTop == p) pageOffset == p;
			});
//			console.log(pageOffset);
			if (pageOffset == -1)
			{
				let closest = pager.pages.reduce((prev, curr) => (Math.abs(curr - positionTop) < Math.abs(prev - positionTop) ? curr : prev));
				window.scrollTo(0, closest);
			}}, 100);
	});
}

export { Pager, getTop, adjust }