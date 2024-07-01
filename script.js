document.addEventListener('DOMContentLoaded', function() {
    const items = document.querySelectorAll('.gallery-item');
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');
    let currentIndex = 0;
    let slideshowInterval;

    const showItem = index => {
        items.forEach((item, i) => {
            item.classList.toggle('active', i === index);
        });
    };

    const showNextItem = () => {
        currentIndex = (currentIndex + 1) % items.length;
        showItem(currentIndex);
    };

    const showPrevItem = () => {
        currentIndex = (currentIndex - 1 + items.length) % items.length;
        showItem(currentIndex);
    };

    const startSlideshow = () => {
        slideshowInterval = setInterval(showNextItem, 3000); // Wechselt alle 3 Sekunden
    };

    const stopSlideshow = () => {
        clearInterval(slideshowInterval);
    };

    nextButton.addEventListener('click', () => {
        stopSlideshow();
        showNextItem();
        if (items[currentIndex].tagName.toLowerCase() !== 'video') {
            startSlideshow();
        }
    });

    prevButton.addEventListener('click', () => {
        stopSlideshow();
        showPrevItem();
        if (items[currentIndex].tagName.toLowerCase() !== 'video') {
            startSlideshow();
        }
    });

    // Initial display
    showItem(currentIndex);

    // Check if current item is a video and wait for it to end
    const checkVideoEnd = () => {
        const video = document.querySelector('.gallery-item.active video');
        if (video) {
            video.addEventListener('ended', () => {
                showNextItem();
                startSlideshow();
            });
        } else {
            startSlideshow();
        }
    };

    // Start the check on load
    checkVideoEnd();
});
