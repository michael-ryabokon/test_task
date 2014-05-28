var Slide = Class.create(Animation, {
	
	totalWidth: 0,

	initialize: function (options) {
		// Parent methods
		this.animationPreparation(options);

		// Slide methods
		this.calculateTotalWidth();
		this.setLeftCord();	
		
		this.translate();
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

	translate: function () {
		var firstImage = document.getElementsByClassName('image').item(0),
				currentImage = firstImage;

		setInterval(function () {
			currentImage = currentImage.nextElementSibling;

			currentImage.style.left = '';	
			
			_.delay(function () {
				this.replaceElements()
			}.bind(this), this.animationOptions.swipeDelay);

		}.bind(this), this.animationOptions.swipeDelay);
	},


	replaceElements: function () {
		var firstImage = document.getElementsByClassName('image').item(0).remove();

		firstImage.style.left = firstImage.style.width;

		this.container.appendChild(firstImage);
	}
});