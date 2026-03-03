/*document.addEventListener("DOMContentLoaded", () => {
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
}); */

document.addEventListener("DOMContentLoaded", () => {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const closeBtn = document.querySelector(".close");
  const nextBtn = document.querySelector(".next");
  const prevBtn = document.querySelector(".prev");

  const isMobile = window.matchMedia("(max-width: 600px)").matches;

  let currentImages = [];
  let currentIndex = 0;

  // ===============================
  // DESKTOP BEHAVIOR (Lightbox)
  // ===============================
  if (!isMobile) {

    const openLightbox = (images) => {
      currentImages = images;
      currentIndex = 0;
      lightboxImg.src = currentImages[currentIndex];
      lightbox.classList.remove("hidden");
    };

    const showImage = (i) => {
      currentIndex = (i + currentImages.length) % currentImages.length;
      lightboxImg.src = currentImages[currentIndex];
    };

    document.querySelectorAll(".image-wrapper").forEach(wrapper => {
      wrapper.addEventListener("click", () => {
        const images = wrapper.dataset.images
          .split(",")
          .map(img => img.trim());
        openLightbox(images);
      });
    });

    nextBtn.onclick = () => showImage(currentIndex + 1);
    prevBtn.onclick = () => showImage(currentIndex - 1);

    closeBtn.onclick = () => lightbox.classList.add("hidden");
    lightbox.onclick = (e) => {
      if (e.target === lightbox) lightbox.classList.add("hidden");
    };
  }

  // ===============================
  // MOBILE BEHAVIOR (No Lightbox)
  // ===============================
  if (isMobile) {

    document.querySelectorAll(".image-wrapper").forEach(wrapper => {

      const imgElement = wrapper.querySelector("img");
      const images = wrapper.dataset.images
        .split(",")
        .map(img => img.trim());

      let index = 0;
      let touchStartX = 0;
      let touchEndX = 0;

      wrapper.addEventListener("touchstart", (e) => {
        touchStartX = e.changedTouches[0].screenX;
      });

      wrapper.addEventListener("touchend", (e) => {
        touchEndX = e.changedTouches[0].screenX;

        // Swipe left → next image
        if (touchEndX < touchStartX - 40) {
          index = (index + 1) % images.length;
          imgElement.src = images[index];
        }

        // Swipe right → previous image
        if (touchEndX > touchStartX + 40) {
          index = (index - 1 + images.length) % images.length;
          imgElement.src = images[index];
        }
      });

    });
  }
});


