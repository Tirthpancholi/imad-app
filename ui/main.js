console.log('Loaded!');

//Change the text to the main-text div
var element = document.getElementById('main-text');
element.innerHTML = "Hello fellas!!!";

// Move the image to right
var img = document.getElementById('madi');
var marginLeft = 0;
function moveRight () {
    marginLeft = marginLeft + 10;
    img.style.marginLeft = marginLeft + 'px';
}
img.onclick = function () {
    var interval = setInetrval(moveRight,100);
};
