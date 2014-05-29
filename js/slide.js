var Slide = Class.create(Animation, {
	
	className: 'slide',

	doesNeedToWait: false,
	autoModeTimer: 0,
	minimumSwipe: 50,
	totalWidth: 0,

	prepareImageBeforeSwipe: {
		'true': 'preparePreviousImageBeforeSwipe',
		'false': 'prepareNextImageBeforeSwipe'
	},
	
	animationModes: {
		'auto': 'startAnimation',
		'manual': 'bindEvents'
	},

	siblings: {
		 '1': 'previousElementSibling',
		'-1': 'nextElementSibling'
	},

	swipeDirection: {
		'false': 'swipeToRight',
		'true': 'swipeToLeft'
	},

	elements: {
		'-1': 'first',
		 '1': 'last'
	},


	initialize: function (options) {
		// Parent methods
		this.animationPreparation(options);

		// Slide methods
		this.calculateTotalWidth();
		this.currentImage = this.getElement('first');

		this[this.animationModes[this.animationOptions.mode]]();	
	},

	calculateTotalWidth: function () {
		for (var i = 0; i < this.images.length; i++) {
			this.totalWidth += this.images[i].offsetWidth;
		}

		this.container.style.width = this.totalWidth + 'px';
	},

	startAnimation: function () {
		this.setAnimationDuraiton(this.currentImage);

		this.autoModeTimer = setInterval(
			this.changeElementsInCycle.bind(this), 
			this.animationOptions.swipeDelay
		);
	},

	changeElementsInCycle: function () {
		this.setMarginLeft.call(this.currentImage, -this.currentImage.offsetWidth);

		this.currentImage = this.getNextElement(this.currentImage);
		
		this.setAnimationDuraiton(this.currentImage);
	},

	bindEvents: function () {
		for (var i = 0; i < this.images.length; i++) {
			this.images[i].addEventListener('mouseup', this.onMouseUp.bind(this), false);
			this.images[i].addEventListener('mousedown', this.onMouseDown.bind(this), false);
			this.images[i].addEventListener('mousemove', this.onMouseMove.bind(this), false);
		}
	},	

	onMouseDown: function (event) {
		this.startX = event.clientX;
		this.swipeStart = true;
	},

	onMouseMove: function (event) {
		if (!this.swipeStart) return;

		// -1 -> swipe to left; 1 -> swipe to right
		this.direction = ((event.clientX - this.startX) > 0) ? 1 : -1; 

		this.swipe = Math.abs(event.clientX - this.startX);

		this[this.prepareImageBeforeSwipe[this.direction > 0]]();
	},

	onMouseUp: function (event) {
		this.swipeStart = false;

		this.currentImage.style.webkitTransitionDuration = this.getAnimationDuration();
		
		if (this.previousImage) {
			this.previousImage.style.webkitTransitionDuration = this.getAnimationDuration(); 
		}

		if (this.swipe > this.minimumSwipe) {
			//start swipe
			this[this.swipeDirection[(this.direction > 0)]]();
		} else {
			//back to normal state
			this.backToNormalState();
		}
	},

	backToNormalState: function () {
		if (this.previousImage) {

			this.setMarginLeft.call(this.previousImage, - this.previousImage.offsetWidth)

			setTimeout(function () {
				this.clearAnimationDuration(this.previousImage);
			}.bind(this), this.animationOptions.swipeSpeed);
		}

		setTimeout(function () {
				this.clearAnimationDuration(this.currentImage);
			}.bind(this), this.animationOptions.swipeSpeed);

		this.setMarginLeft.call(this.currentImage, 0);
	},

	swipeToLeft: function () {
		this.previousImage.style.webkitTransitionDuration = this.getAnimationDuration();
		this.setMarginLeft.call(this.previousImage, 0);
		
		setTimeout(this.preparePreviousImageAfterSwipe.bind(this), this.animationOptions.swipeSpeed);
	},

	swipeToRight: function () {
		this.setMarginLeft.call(this.currentImage, (this.currentImage.offsetWidth * this.direction));

		setTimeout(this.prepareNextImageAfterSwipe.bind(this), this.animationOptions.swipeSpeed); //change to animation time
	},

	preparePreviousImageBeforeSwipe: function () {
		this.previousImage = this.getPreviousElement(this.currentImage);

		this.setMarginLeft.call(this.previousImage, (- this.previousImage.offsetWidth) + (this.swipe * this.direction));
	},

	prepareNextImageBeforeSwipe: function () {
		this.nextImage = this.getNextElement(this.currentImage);

		this.setMarginLeft.call(this.currentImage, (this.swipe * this.direction));
	},

	preparePreviousImageAfterSwipe: function () {
		this.currentImage = this.currentImage[this.siblings[this.direction]];
		this.clearAnimationDuration(this.currentImage.nextElementSibling);
	},

	prepareNextImageAfterSwipe: function () {
		this.clearAnimationDuration(this.currentImage);
		this.currentImage = this.currentImage[this.siblings[this.direction]];
	},

	setAnimationDuraiton: function (element) {
		element.style.webkitTransitionDuration = this.getAnimationDuration();
	},

	setMarginLeft: function (value) {
		this.style.marginLeft = value + 'px';
	},

	getAnimationDuration: function () {
		return (this.animationOptions.swipeSpeed / 1000) + 's';
	},

	getElement: function (place) {
		return this.container[place + 'Child'];
	},

	getNextElement: function (currentElement) {
		return currentElement.nextElementSibling || 
			this.append(this.getElement('first')) || 
			currentElement.nextElementSibling;
	},

	getPreviousElement: function (currentElement) {
		return currentElement.previousElementSibling || 
			this.prepend(this.getElement('last')) ||
			currentElement.previousElementSibling;
	},

	clearAnimationDuration: function (element) {
		element.style.webkitTransitionDuration = '0s';
	},

	append: function (element) {
			var el = element.remove();

			this.setMarginLeft.call(el, 0);

			this.container.appendChild(el);
	},

	prepend: function (element) {
		this.container.insertBefore(element.remove(), this.getElement('first'));

		return false;
	}
});