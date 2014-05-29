window.addEventListener('load', function () {
	var createBtn = document.querySelector('#create');

	createBtn.addEventListener('click', getDataAndCreate.bind(this), false);
	
}, false);

var getDataAndCreate = function (event) {
	var type = upFirstLetter(document.querySelector('[name="type"]:checked').value),
		duration = parseFloat(document.querySelector('#duration').value || 0.5) * 1000,
		delay = parseFloat(document.querySelector('#delay').value || 3) * 1000,
		mode = document.querySelector('[name="mode"]:checked').value,
		images = document.querySelector('#images').value.split(',');


	document.querySelector('.dialog').addClassName('hide');
	document.querySelector('.images').removeClassName('hide');

	this.animation = new this[type]({
		container: document.querySelector('.images'), //for render images
		swipeSpeed: duration,
		swipeDelay: delay,
		images: images,
		mode: mode
	});

},
 upFirstLetter = function (string) {
 	return string.charAt(0).toUpperCase() + string.substr(1);
 };