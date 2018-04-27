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
		var imageElement = document.getElementById("image");
		var imageFile = event.target.files[0];
		var storedImage = firebase.storage().ref("image_folder/" + imageFile.name);
		var downloadURL = storedImage.getDownloadURL;
		//imageElement.setAttribute("src", downloadURL);
		imageElement.setAttribute("src", URL.createObjectURL(imageFile));
		//document.getElementById("image").width = "50%";

		storedImage.put(imageFile);
		/*
		var downloadURL = storedImage.getDownloadURL;
		var postKey = firebase.database().ref("Posts/").push().key;
		var updates = {};
		var postData = downloadURL;
		updates["/Posts/" + postKey] = postData;
		firebase.database().ref().update(updates);
		*/
	};
	loadImage.onchange = loadInputHandler;

	//Applies effects
	function changeSliderHandler(event) {
		Caman("#image", function renderCaman() {
 			this.revert(false);
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
			this[event.target.id]().render();
		});
	};

	var filterButtons = document.querySelectorAll(".filter");
	filterButtons.forEach(function(filterButton){
		filterButton.onclick = filterButtonHandler;
	});

}, false);