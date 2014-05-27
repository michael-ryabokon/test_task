var FadeIn = Class.create(Animation, {

	defaults: {
		images: [],
		swipeSpeed: 500, 
		swipeDelay: 3000
	},

	initialize: function (options) {
		// Parent methods
		this.setAnimationOptions(options);
		this.renderImages();
		this.getImagesFromDOM();

		// Fade in methods
		this.setElementsAttributes();
		this.startAnimation();

		return this;
	},

	setElementsAttributes: function () {
		this.images.reverse();

		for (var i = 0; i < this.images.length; i++) {
			this.images[i].style.zIndex = i;
			this.images[i].style.webkitTransitionDuration = 
				this.animationOptions.swipeSpeed / 1000 + 's';
		}

		this.images.reverse();
	},

	startAnimation: function () {
		var firstImage = this.images.first(),
				currentImage = firstImage;

		setInterval(function () {
			var nextElementSibling = currentImage.nextElementSibling;

			if (!nextElementSibling) {
				firstImage.removeClassName('transparent');
			} else {
				nextElementSibling.hasClassName('transparent') 
				&& nextElementSibling.removeClassName('transparent');				
			}

			currentImage.addClassName('transparent');
			currentImage = nextElementSibling || firstImage;
				
		}.bind(this), this.animationOptions.swipeDelay);
	}
});