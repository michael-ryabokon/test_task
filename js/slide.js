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
		this.swipeStart = true;

	},

	onMouseMove: function (event) {
		if (!this.swipeStart) return;

		this.direction = ((event.clientX - this.startX) > 0) ? 1 : -1; // -1 -> swipe to left; 1 -> swipe to right

		this.swipe = Math.abs(event.clientX - this.startX);

		if (this.direction > 0) {
			this.previousImage = 
				this.currentImage.previousElementSibling || 
				this.prepend(this.getElement('last')) ||
				this.currentImage.previousElementSibling;

			this.previousImage.style.marginLeft = 
				- this.previousImage.offsetWidth + (this.swipe * this.direction) + 'px';
		} else {
			this.nextImage = 
				this.currentImage.nextElementSibling ||
				this.append(this.getElement('first')) || 
				this.currentImage.nextElementSibling;

			this.currentImage.style.marginLeft = (this.swipe * this.direction) + 'px';

		}
			
		console.log('move');

	},

	onMouseUp: function (event) {
		this.currentImage.style.webkitTransitionDuration = this.getDuration();
		if (this.previousImage) {
			this.previousImage.style.webkitTransitionDuration = this.getDuration(); 
		}

		if (this.swipe > 50) {
////////// to left
			if (this.direction > 0) {
				this.previousImage.style.webkitTransitionDuration = this.getDuration();
				this.previousImage.style.marginLeft = 0;

				setTimeout(function () {
					this.currentImage = this.currentImage[this.siblings[this.direction]];
					this.currentImage.nextElementSibling.style.webkitTransitionDuration = '0s';
				}.bind(this), 500);
			} else {
////////// to right
				this.currentImage.style.marginLeft = 
					(this.currentImage.offsetWidth * this.direction) + 'px';			

				setTimeout(function () {
					this.currentImage.style.webkitTransitionDuration = '0s';
					this.currentImage = this.currentImage[this.siblings[this.direction]];
				}.bind(this), 500); //change to animation time
			}

		} else {
			if (this.previousImage) { 
				this.previousImage.style.marginLeft =  
					(- this.previousImage.offsetWidth) + 'px'; 
				setTimeout(function () {
					this.previousImage.style.webkitTransitionDuration = '0s';
				}.bind(this), 500);
			}

			setTimeout(function () {
					this.currentImage.style.webkitTransitionDuration = '0s';
				}.bind(this), 500);

			this.currentImage.style.marginLeft = '0';
		}

		this.swipe = 0;

		console.log('up');
		this.swipeStart = false;
	},

	getDuration: function () {
		return (500 / 1000) + 's'; //change to animation options;
	},

	getElement: function (place) {
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
			var el = element.remove();

			el.style.marginLeft = '0px';

			this.container.appendChild(el);
	},

	prepend: function (element) {
		this.container.insertBefore(element.remove(), this.getElement('first'));

		return false;
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