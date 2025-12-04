document.addEventListener("DOMContentLoaded", () => {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const closeBtn = document.querySelector(".close");
  const nextBtn = document.querySelector(".next");
  const prevBtn = document.querySelector(".prev");

  let currentImages = [];
  let currentIndex = 0;

  // --- Open on click ---
  document.querySelectorAll(".image-wrapper").forEach(wrapper => {
    wrapper.addEventListener("click", () => {
      currentImages = wrapper.dataset.images.split(",").map(img => img.trim());
      currentIndex = 0;
      lightboxImg.src = currentImages[currentIndex];
      lightbox.classList.remove("hidden");
    });
  });

  // --- Navigation logic ---
  const showImage = (i) => {
    currentIndex = (i + currentImages.length) % currentImages.length;
    lightboxImg.src = currentImages[currentIndex];
  };

  nextBtn.onclick = () => showImage(currentIndex + 1);
  prevBtn.onclick = () => showImage(currentIndex - 1);

  // --- Close lightbox ---
  closeBtn.onclick = () => lightbox.classList.add("hidden");
  lightbox.onclick = (e) => {
    if (e.target === lightbox) lightbox.classList.add("hidden");
  };

  // --- Swipe support ---
  let touchStartX = 0;
  let touchEndX = 0;

  lightboxImg.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });

  lightboxImg.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    if (touchEndX < touchStartX - 40) nextBtn.onclick();
    if (touchEndX > touchStartX + 40) prevBtn.onclick();
  });
});


