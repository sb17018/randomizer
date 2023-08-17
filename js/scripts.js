const behaviorSelection = document.querySelector("#randomizeSelect");
const visibilitySelection = document.querySelector("#visibilitySelect");

const source = new EventSource("./php/server-event-handler.php");
source.onmessage = function (event) {
	console.log(event.data);
	let dataObject = JSON.parse(event.data);
	setBehaviorTag(dataObject["behavior"]);
	setHideTag(dataObject["visibility"]);
	if (behaviorSelection) {
		behaviorSelection
			.querySelector("option[selected]")
			.removeAttribute("selected");
		behaviorSelection
			.querySelector("option[value=" + dataObject["behavior"] + "]")
			.setAttribute("selected", true);
	}
	if (visibilitySelection) {
		visibilitySelection
			.querySelector("option[selected]")
			.removeAttribute("selected");
		visibilitySelection
			.querySelector("option[value=" + dataObject["visibility"] + "]")
			.setAttribute("selected", true);
	}
};

document.addEventListener("DOMContentLoaded", () => {
	if (behaviorSelection != null) {
		console.log("A");
		activeRandomizeDrop();
		setBehaviorAndVisibility("order", "hidden");
	}
});

var activeRandomizeDrop = () => {
	behaviorSelection.addEventListener("change", function () {
		setBehaviorAndVisibility(
			behaviorSelection.value,
			visibilitySelection.value
		);
		setBehaviorTag(this.value);
	});
};

document.addEventListener("DOMContentLoaded", () => {
	if (visibilitySelection != null) {
		activeShowingDrop();
	}
});

var activeShowingDrop = () => {
	visibilitySelection.addEventListener("change", function () {
		setBehaviorAndVisibility(
			behaviorSelection.value,
			visibilitySelection.value
		);
		setHideTag(this.value);
	});
};

const numberKeys = document.querySelectorAll(".numbers-keys");

const numberKeysColors = [
	[138, 43, 226],
	[226, 101, 43],
	[26, 97, 204],
	[168, 18, 50],
	[97, 94, 93],
	[66, 121, 15],
	[235, 36, 235],
	[153, 151, 31],
	[70, 41, 32],
];

const numberKeysHoverColors = [
	[188, 93, 255],
	[255, 151, 93],
	[76, 147, 254],
	[218, 68, 100],
	[147, 144, 143],
	[116, 171, 65],
	[255, 86, 255],
	[203, 201, 81],
	[120, 91, 82],
];

var numberOnKey;
var defaultColor;
var hoverColor;
var randomNumber;
numberKeys.forEach((elem, index) => {
	elem.value = index + 1;
	defaultColor = "rgb(" + numberKeysColors[index].toString() + ")";
	elem.style.color = defaultColor;
	elem.addEventListener("mouseover", function () {
		hoverColor = "rgb(" + numberKeysHoverColors[index].toString() + ")";
		elem.style.color = hoverColor;
	});
	elem.addEventListener("mouseout", function () {
		defaultColor = "rgb(" + numberKeysColors[index].toString() + ")";
		elem.style.color = defaultColor;
	});
	elem.addEventListener("click", function () {
		checkIfRandom(elem);
	});
});

const behaviorTag = document.querySelector("#modeInfo");

function toggleRandomOrder(elem, isRandom) {
	if (isRandom == "random") {
		setRandomNumber();
	} else {
		setNumber(elem);
	}
}

function setNumber(elem) {
	document.querySelector("#numberDisplayed").style.color = elem.style.color;
	document.querySelector("#numberDisplayed").textContent = elem.value;
}

function setRandomNumber() {
	randomNumber = Math.floor(Math.random() * 9);
	document.querySelector("#numberDisplayed").style.color =
		"rgb(" + numberKeysColors[randomNumber].toString() + ")";
	document.querySelector("#numberDisplayed").textContent = randomNumber + 1;
}

function checkIfRandom(elem) {
	toggleRandomOrder(elem, behaviorTag.textContent.toLowerCase());
}

function setBehaviorAndVisibility(beh, vis) {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			console.log(this.responseText);
		}
	};
	xhttp.open("POST", "./php/writefile.php", true);
	xhttp.setRequestHeader("content-type", "application/x-www-form-urlencoded");
	xhttp.send("randomizeSelect=" + beh + "&visibilitySelect=" + vis);
}

function setBehaviorTag(isRandom) {
	if (isRandom == "random") {
		behaviorTag.textContent = "RANDOM";
	} else {
		behaviorTag.textContent = "ORDER";
	}
}

function setHideTag(isHidden) {
	if (isHidden == "hidden") {
		behaviorTag.style.visibility = "hidden";
	} else {
		behaviorTag.style.visibility = "visible";
	}
}
