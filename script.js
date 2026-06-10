const overlay = document.getElementById("galleryOverlay");
const content = document.getElementById("galleryContent");

document.querySelectorAll(".image-wrapper").forEach(wrapper => {

    wrapper.addEventListener("click", () => {

        const images = wrapper.dataset.images
            .split(",")
            .map(img => img.trim());

        content.innerHTML = "";

        images.forEach(src => {
            const img = document.createElement("img");
            img.src = src;
            content.appendChild(img);
        });

        overlay.classList.remove("hidden");
        document.body.style.overflow = "hidden";
    });

});

function closeGallery() {
    overlay.classList.add("hidden");
    document.body.style.overflow = "auto";
}

// click anywhere closes
overlay.addEventListener("click", closeGallery);

// BUT prevent clicks inside content from closing it immediately
content.addEventListener("click", (e) => {
    e.stopPropagation();
});