var Slide = Class.create(Animation, {
	
	totalWidth: 0,

	minimumSwipe: 50,

	siblings: {
		'-1': 'nextElementSibling',
		 '1': 'previousElementSibling'
	},

	elements: {
		'-1': 'first',
		 '1': 'last'
	},

	swipeDirection: {
		'true': 'swipeToLeft',
		'false': 'swipeToRight'
	},

	prepareImageBeforeSwipe: {
		'true': 'preparePreviousImageBeforeSwipe',
		'false': 'prepareNextImageBeforeSwipe'
	},

	initialize: function (options) {
		// Parent methods
		this.animationPreparation(options);

		// Slide methods
		this.calculateTotalWidth();
		this.currentImage = this.getElement('first');
		this.bindEvents();
	},

	calculateTotalWidth: function () {
		for (var i = 0; i < this.images.length; i++) {
			this.totalWidth += this.images[i].offsetWidth;
		}

		this.container.style.width = this.totalWidth + 'px';
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

	preparePreviousImageBeforeSwipe: function () {
		this.previousImage = 
				this.currentImage.previousElementSibling || 
				this.prepend(this.getElement('last')) ||
				this.currentImage.previousElementSibling;

			this.previousImage.style.marginLeft = 
				- this.previousImage.offsetWidth + (this.swipe * this.direction) + 'px';
	},

	prepareNextImageBeforeSwipe: function () {
		this.nextImage = 
				this.currentImage.nextElementSibling ||
				this.append(this.getElement('first')) || 
				this.currentImage.nextElementSibling;

			this.currentImage.style.marginLeft = (this.swipe * this.direction) + 'px';
	},

	backToNormalState: function () {
		if (this.previousImage) {
			this.previousImage.style.marginLeft = (- this.previousImage.offsetWidth) + 'px'; 
			setTimeout(function () {
				this.clearAnimationDuration(this.previousImage);
			}.bind(this), this.animationOptions.swipeSpeed);
		}

		setTimeout(function () {
				this.clearAnimationDuration(this.currentImage);
			}.bind(this), this.animationOptions.swipeSpeed);

		this.currentImage.style.marginLeft = '0';
	},

	swipeToLeft: function () {
		this.previousImage.style.webkitTransitionDuration = this.getAnimationDuration();
		this.previousImage.style.marginLeft = 0;

		setTimeout(this.preparePreviousImageAfterSwipe.bind(this), this.animationOptions.swipeSpeed);
	},

	swipeToRight: function () {
		this.currentImage.style.marginLeft = (this.currentImage.offsetWidth * this.direction) + 'px';
		setTimeout(this.prepareNextImageAfterSwipe.bind(this), this.animationOptions.swipeSpeed); //change to animation time
	},

	preparePreviousImageAfterSwipe: function () {
		this.currentImage = this.currentImage[this.siblings[this.direction]];
		this.clearAnimationDuration(this.currentImage.nextElementSibling);
	},

	prepareNextImageAfterSwipe: function () {
		this.clearAnimationDuration(this.currentImage);
		this.currentImage = this.currentImage[this.siblings[this.direction]];
	},

	getAnimationDuration: function () {
		return (this.animationOptions.swipeSpeed / 1000) + 's'; //change to animation options;
	},

	getElement: function (place) {
		return this.container[place + 'Child'];
	},

	clearAnimationDuration: function (element) {
		element.style.webkitTransitionDuration = '0s';
	},

	append: function (element) {
			var el = element.remove();

			el.style.marginLeft = '0px';

			this.container.appendChild(el);
	},

	prepend: function (element) {
		this.container.insertBefore(element.remove(), this.getElement('first'));

		return false;
	}
});