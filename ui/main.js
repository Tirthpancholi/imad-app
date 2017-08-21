console.log('Loaded!');

//Change the text to the main-text div
var element = document.getElementById('main-text');
element.innerHTML = "Hello fellas!!!";

// Move the image to right
var img = document.getElementById('madi');
img.onclick = function () {
    img.style.marginleft = '80px';
};
