var Slide = Class.create(Animation, {
	
	totalWidth: 0,

	siblings: {
		'-1': 'nextElementSibling',
		 '1': 'previousElementSibling'
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
			this.direction = ((event.clientX - this.startX) > 0) ? 1 : -1; // -1 -> swipe to left; 1 -> swipe to right

			this.swipe = Math.abs(event.clientX - this.startX);

			if (!this.currentImage.previousElementSibling) {
				this.currentImage.style.marginLeft = (this.swipe * this.direction) + 'px';	
			} else {
				this.currentImage = this.currentImage[this.siblings[this.direction]];
				this.currentImage.style.webkitTransitionDuration = (500 / 1000) + 's';
				this.currentImage.style.marginLeft = 0;

				// (this.swipe * this.direction) + 'px';
			}

			
			
			console.log('move');
		}
	},

	onMouseUp: function (event) {
		this.currentImage.style.webkitTransitionDuration = (500 / 1000) + 's';

		if (this.swipe > 100) {
			this.currentImage.style.marginLeft = 
			(parseInt(this.currentImage.style.width) * this.direction) + 'px';

				setTimeout(function () {
					this.currentImage.style.webkitTransitionDuration = '0s';
					this.currentImage = this.currentImage[this.siblings[this.direction]];
				}.bind(this), 500);

				/*setTimeout(function () {
					this.currentImage.style.webkitTransitionDuration = '0s';
					this.currentImage = this.currentImage[this.siblings[this.direction]];
					this.replaceElements();
				}.bind(this), 500); //change to animation time*/

		} else {
			this.currentImage.style.marginLeft = '0';
		}

		this.swipe = 0;

		console.log('up');
		this.startSwipe = false;
	},
/*
	getFirstImage: function () {
		return document.getElementsByClassName('image').item(0);
	},*/

	getElement: function (place) {
		/*var images = document.getElementsByClassName('image'),
				index = (place === 'first') ? 0 : image.length - 1;

		return images.item(index);*/

		return this.container[place + 'Child'];
	},

	replaceElements: function () {
			var elementPlace = this.elements[this.direction],
					element = this.getElement(elementPlace);
			
			element.style.marginLeft = 0;

			if (elementPlace === 'first') {
				this.append(element);
			} else {
				this.prepend(element);
			}
	},

	append: function (element) {
			this.container.appendChild(element.remove());
	},

	prepend: function (element) {
		this.container.insertBefore(element.remove(), this.getElement('first'));
	}

/*
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
	},*/

/*	replaceElements: function () {
		var firstImage = this.getFirstImage().remove();

		firstImage.style.left = firstImage.style.width;

		this.container.appendChild(firstImage);
	}*/
});