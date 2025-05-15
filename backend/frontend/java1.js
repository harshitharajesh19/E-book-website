const imageElements = [];
for (let i = 7; i <= 12; i++) {
  imageElements.push(document.getElementById(`img-${i}`));
}
let currentImageIndex = 0;
const images = document.querySelectorAll(".ImgContainer .imgs");
const ImgContainer = document.getElementById('ImgComtainer');
const lessthan = document.getElementById('lessthan');
const greaterthan = document.getElementById('greaterthan');
lessthan.addEventListener('click', () => {
  images[currentImageIndex].style.display = "none";
  currentImageIndex = (currentImageIndex + 5) % images.length;
  images[currentImageIndex].style.display = "block";
});
greaterthan.addEventListener('click', () => {
    showNextImage();
  });
function showNextImage() {
    images[currentImageIndex].style.display = "none";
    currentImageIndex = (currentImageIndex + 1) % images.length;
    images[currentImageIndex].style.display = "block";
  }
  images[currentImageIndex].style.display = "block";
  setInterval(showNextImage, 2000);
  function updateWindowSize() {
    document.documentElement.style.setProperty('--window-width', window.innerWidth + 'px');
}
