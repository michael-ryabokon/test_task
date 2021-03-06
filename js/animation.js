var Animation = Class.create({

	colors: ['red', 'green', 'blue'],
	className: '',

	images: [],

	height: '400px',
	width: '400px',

	animationOptions: {},

	defaults: {
		images: [],
		mode: 'auto', 		// possible values: 'auto', 'manual' ('automanual' in nearest future)
		swipeSpeed: 500, 	// arbitrary interger (miliseconds)
		swipeDelay: 3000, // arbitrary interger (miliseconds). This is used in 'auto' and 'automanual' modes
		transitionProperty: 'all',
		transitionTmingFunction: 'linear' // 'ease-in', 'ease-out' and so on
	},

	animationPreparation: function (options) {
		this.setAnimationOptions(options);
		this.renderImages();
		this.getImagesFromDOM();
		this.setTrasitionsProperties();
	},

	setAnimationOptions: function (options) {
		this.animationOptions = _.defaults(options, this.defaults);
	},

	renderImages: function () {
		this.createDefaultImages();
	},

	setTrasitionsProperties: function () {
		for (var i = 0; i < this.images.length; i++) {
			this.images[i].style.webkitTransitionProperty = this.animationOptions.transitionProperty;
			this.images[i].style.webkitTransitionTimingFunction = this.animationOptions.transitionTmingFunction;
		}
	},

	createDefaultImages: function () {
		var el;

		this.container = this.animationOptions.container || this.createContainer();

			for (var i = 0; i < this.animationOptions.images.length; i++) {
				el = document.createElement('div').addClassName('image');
				el.style.backgroundColor = this.animationOptions.images[i];
				el.style.width = this.width;
				el.style.height = this.height;
				el.addClassName(this.className);
				el.innerHTML = i + 1;

				this.container.appendChild(el);
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
