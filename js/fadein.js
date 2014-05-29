var FadeIn = Class.create(Animation, {

	className: 'fadeIn',

	defaults: {
		images: [],
		swipeSpeed: 500, 
		swipeDelay: 3000,
		transitionProperty: 'opacity',
		transitionTmingFunction: 'ease-in-out'
	},

	initialize: function (options) {
		// Parent methods
		this.animationPreparation(options);

		// Fade in methods
		this.setAttributes();
		this.startAnimation();

		return this;
	},

	setAttributes: function () {
		this.images.reverse();

		for (var i = 0; i < this.images.length; i++) {
			this.images[i].style.zIndex = i;
			this.images[i].style.webkitTransitionDuration = 
				this.animationOptions.swipeSpeed / 1000 + 's';
		}

		this.images.reverse();
	},

	startAnimation: function () {
		var firstImage = this.container.firstChild,
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