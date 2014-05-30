window.addEventListener('load', function () {
	var createBtn = document.querySelector('#create');

	createBtn.addEventListener('click', getDataAndCreate.bind(this), false);
	
}, false);

var getDataAndCreate = function (event) {
	var type = upFirstLetter(document.querySelector('[name="type"]:checked').value),
		duration = parseFloat(document.querySelector('#duration').value || 0.5) * 1000,
		delay = parseFloat(document.querySelector('#delay').value || 3) * 1000,
		mode = document.querySelector('[name="mode"]:checked').value;


	document.querySelector('.dialog').addClassName('hide');
	document.querySelector('.images').removeClassName('hide');

	this.animation = new this[type]({
		container: document.querySelector('.images'), //for render images
		images: ['blue', 'red', 'green', 'silver'], //default images, for check it you can add to array another color
		swipeSpeed: duration,
		swipeDelay: delay,
		mode: mode
	});

},
 upFirstLetter = function (string) {
 	return string.charAt(0).toUpperCase() + string.substr(1);
 };