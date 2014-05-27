var Animation = Class.create({

	colors: ['red', 'green', 'blue'],

	images: [],

	height: '400px',
	width: '400px',

	animationOptions: {},

	defaults: {
		images: [],
		mode: 'auto', 		// possible values: 'auto', 'manual', 'automanual'
		swipeSpeed: 500, 	// arbitrary interger (miliseconds)
		swipeDelay: 3000 	// arbitrary interger (miliseconds). This is used in 'auto' and 'automanual' modes
	},

	setAnimationOptions: function (options) {
		this.animationOptions = _.defaults(options, this.defaults);
	},

	renderImages: function () {
		if (this.animationOptions.images.length) {
			this.appendImages();
		} else {
			this.createDefaultImages();
		}
	},

	appendImages: function () {
		var container = this.animationOptions.container || this.createContainer(),
				wrapper,
				image;

		for (var i = 0; i < this.animationOptions.images.length; i++) {
			image = document.createElement('img');
			image.src = this.animationOptions.images[i];
			image.style.width = this.width;
			image.style.height = this.height;

			wrapper = document.createElement('div').addClassName('image');
			wrapper.appendChild(image);

			document.querySelector('.images').appendChild(wrapper);
		}
	},

	createDefaultImages: function () {
		var container = this.animationOptions.container || this.createContainer(),
				el;

			for (var i = 0; i < this.colors.length; i++) {
				el = document.createElement('div').addClassName('image');
				el.style.backgroundColor = this.colors[i];
				el.style.width = this.width;
				el.style.height = this.height;
				el.innerHTML = i + 1;

				document.querySelector('.images').appendChild(el);
			}
	},

	createContainer: function () {
		var container = document.createElement('div').addClassName('images');

		document.querySelector('body').appendChild(container);

		return container;
	},

	getImagesFromDOM: function () {
		var elements = document.getElementsByClassName('image');

		for (var i = 0; i < elements.length; i++) {
			this.images.push(elements[i]);
		}
	}
});
