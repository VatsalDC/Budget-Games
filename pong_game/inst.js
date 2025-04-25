var h4 = document.getElementById("inst");
var display = 1;

function hideShow() {
	if (display == 1) {
		h4.style.display = "block";
		display = 0;
	} else {
		h4.style.display = "none";
		display = 1;
	}
}
