var Slide = Class.create(Animation, {
	defaultOptions: {
		mode: 'auto',	// possible values: 'auto', 'manual', 'automanual'
		swipeSpeed: 500, 	// arbitrary interger (miliseconds)
		swipeDelay: 3000 // arbitrary interger (miliseconds). This is used in 'auto' and 'automanual' modes
	},

	currentTranslateX: 0,
	totalWidth: 0,


	initialize: function (options) {
		this.defaultOptions = _.extend(this.defaultOptions, options);
		
		this.container = document.getElementsByClassName('images')[0];

		this.setOptions();
		this.calculateTotalWidth();
		this.setLeft();
		// this.setZIndex();
		// this.reCalculateLeftCord();
		// this.setZIndex();
		// this.reCalculateLeftCord();
		this.translate();
	},

	setOptions: function () {
		this.container.style.webkitTransitionDuration = 
		(this.defaultOptions.swipeSpeed / 1000) + 's';		
	},

	calculateTotalWidth: function () {
		for (var i = 0; i < this.defaultOptions.images.length; i++) {
			this.totalWidth += this.defaultOptions.images[i].offsetWidth;
		}

		this.container.style.width = this.totalWidth + 'px';
	},

	setLeft: function () {
		for (var i = 1; i < this.defaultOptions.images.length; i++) {
			this.defaultOptions.images[i].style.left = this.defaultOptions.images[i].offsetWidth + 'px';
		}
	},

	translate: function () {
		// var el;
		this.currentTarget = this.container.firstElementChild;

		setInterval(function () {	
			// if (!this.currentTarget.nextElementSibling) ;	

		 	

			this.currentTarget = this.currentTarget.nextElementSibling;
			

			this.currentTarget.style.left = '';	
			// setTimeout(function () {
			// 	this.currentTarget.style.left = '';	
			// }.bind(this), 10);

			_.defer(function () {
this.replaceElements()
			}.bind(this));



		}.bind(this), this.defaultOptions.swipeDelay);
	},

	replaceElements: function () {
		var el = this.container.firstElementChild.remove();

		el.style.left = this.container.firstElementChild.offsetWidth + 'px';

		this.container.appendChild(el);
	}
});