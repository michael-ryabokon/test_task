var Slide = Class.create(Animation, {
	
	totalWidth: 0,

	// events: ['mouseup', 'mousedown', 'mousemove'],

	initialize: function (options) {
		// Parent methods
		this.animationPreparation(options);

		// Slide methods
		this.calculateTotalWidth();
		this.setLeftCord();	

		this.currentImage = this.getFirstImage();
		
		this.bindEvents();



		// this.translate();
	},

	calculateTotalWidth: function () {
		for (var i = 0; i < this.images.length; i++) {
			this.totalWidth += this.images[i].offsetWidth;
		}

		this.container.style.width = this.totalWidth + 'px';
	},

	setLeftCord: function () {
		for (var i = 1; i < this.images.length; i++) {
			this.images[i].style.left = this.images[i].offsetWidth + 'px';
		}
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
		this.startSwipe = true;
	},

	onMouseMove: function (event) {
		if (this.startSwipe) {
			// this.currentImage.style.left = 400 - event.clientX + 'px';
			console.log('move');
		}
	},

	onMouseUp: function (event) {
		this.endX = event.clientX;

		// console.log(this.endX);
		// if (this.startX)

		if (Math.abs(this.startX - this.endX) > 50) {
			this.currentImage = this.currentImage.nextElementSibling || this.getFirstImage();
			this.currentImage.style.left = '';

			setTimeout(function () {
				this.replaceElements();
			}.bind(this), this.animationOptions.swipeSpeed);	
		}

		console.log('up');
		this.startSwipe = false;
	},

	getFirstImage: function () {
		return document.getElementsByClassName('image').item(0);
	},

	translate: function () {
		var firstImage = document.getElementsByClassName('image').item(0),
				currentImage = firstImage;

		setInterval(function () {
			currentImage = currentImage.nextElementSibling;

			currentImage.style.left = '';	
			
			setTimeout(function () {
				this.replaceElements();
			}.bind(this), this.animationOptions.swipeDelay);

		}.bind(this), this.animationOptions.swipeDelay);
	},

	replaceElements: function () {
		var firstImage = this.getFirstImage().remove();

		firstImage.style.left = firstImage.style.width;

		this.container.appendChild(firstImage);
	}
});