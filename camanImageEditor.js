// JavaScript source code
document.addEventListener("DOMContentLoaded", function(){
	//Loads and replaces loaded image
	var loadImage = document.getElementById("load");
	function loadInputHandler(event) {
		var imageFile = event.target.files[0];
		var imageElement = document.getElementById("image");
		imageElement.setAttribute("src", URL.createObjectURL(imageFile));
		//document.getElementById("image").width = "50%";
	};
	loadImage.onchange = loadInputHandler;

		//Applies effects
	function changeSliderHandler(event) {
		Caman("#image", function renderCaman() {
 			this.revert(false);
			this[event.target.name](event.target.value).render();
		});
	};

}, false);