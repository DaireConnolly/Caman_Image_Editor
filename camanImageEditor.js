// JavaScript source code
document.addEventListener("DOMContentLoaded", function(){

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAs-8WjkBDGIq8kCtWNuggOYFHbdlpMgEQ",
    authDomain: "main-project-2018-image-edit.firebaseapp.com",
    databaseURL: "https://main-project-2018-image-edit.firebaseio.com",
    projectId: "main-project-2018-image-edit",
    storageBucket: "main-project-2018-image-edit.appspot.com",
    messagingSenderId: "1016042878808"
  };
  firebase.initializeApp(config);

  	var loadImage = document.getElementById("load");
	//Loads and replaces loaded image
	function loadInputHandler(event) {
		document.getElementById("image").style.border = "0px";
		var imageElement = document.getElementById("image");
		var imageFile = event.target.files[0];
		var storedImage = firebase.storage().ref("image_folder/" + imageFile.name);
		var downloadURL = storedImage.getDownloadURL;
		imageElement.setAttribute("src", URL.createObjectURL(imageFile));

		storedImage.put(imageFile);
	};
	loadImage.onchange = loadInputHandler;

	//Loads last Image using FirebaseJS
	var prevImage = document.getElementById("prev");
	function prevInputHandler(event) {
		
		var imageElement = document.getElementById("image");
		imageElement.setAttribute("src", downloadURL);
		console.log(downloadURL);
	};
	prevImage.onclick = prevInputHandler;

	//Title Box using Dom Manipulator
	var addTitle = document.getElementById("addTitleButton");
	function addTitleHandler(event){
		var i = 1;
		imageHolder.innerHTML = imageHolder.innerHTML + "<br> <h3>Title</h3> <input type='text' name='labelTitle'+ i>"
	}
	addTitle.onclick = addTitleHandler;

	var removeTitle = document.getElementById("remTitleButton");
	function removeTitleHandler(event){
		imageHolder.innerHTML = imageHolder.innerHTML - "<br> <h3>Title</h3> <input type='text' name='labelTitle'>" + "<h1 id='imageHolder'>On-the-Go Photo Manipulator</h1>"
	}
	removeTitle.onclick = removeTitleHandler;

	//Applies effects
	function changeSliderHandler(event) {
		Caman("#image", function renderCaman() {
 			this.revert(false);
			document.getElementById("image").style.width = "50%";
			this[event.target.name](event.target.value).render();
		});
	}

	var brightnessRange = document.getElementById("brightness");
	brightnessRange.onchange = changeSliderHandler;

	var vibranceRange = document.getElementById("vibrance");
	vibranceRange.onchange = changeSliderHandler;

	var contrastRange = document.getElementById("contrast");
	contrastRange.onchange = changeSliderHandler;

	var hueRange = document.getElementById("hue");
	hueRange.onchange = changeSliderHandler;

		//Applies filters
	function filterButtonHandler(event) {
		Caman("#image", function() {
			this.revert(false);
			document.getElementById("image").style.width = "50%";
			this[event.target.id]().render();
		});
	};

	var filterButtons = document.querySelectorAll(".filter");
	filterButtons.forEach(function(filterButton){
		filterButton.onclick = filterButtonHandler;
	});

}, false);