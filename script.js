document.addEventListener('DOMContentLoaded', function() {
    const items = document.querySelectorAll('.gallery-item');
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');
    const video = document.getElementById('intro-video');
    let currentIndex = 0;
    let slideshowInterval;

    const showItem = index => {
        items.forEach((item, i) => {
            item.classList.toggle('active', i === index);
        });
        checkVideoEnd(); // Überprüfe bei jedem Wechsel, ob das aktuelle Element ein Video ist
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
        if (!document.querySelector('.gallery-item.active video')) {
            startSlideshow();
        }
    });

    prevButton.addEventListener('click', () => {
        stopSlideshow();
        showPrevItem();
        if (!document.querySelector('.gallery-item.active video')) {
            startSlideshow();
        }
    });

    // Check if current item is a video and wait for it to end
    const checkVideoEnd = () => {
        const activeVideo = document.querySelector('.gallery-item.active video');
        if (activeVideo) {
            stopSlideshow(); // Stoppe die Diashow, wenn ein Video angezeigt wird
            activeVideo.removeEventListener('ended', videoEndedHandler);
            activeVideo.addEventListener('ended', videoEndedHandler);
        } else {
            startSlideshow();
        }
    };

    const videoEndedHandler = () => {
        showNextItem();
        startSlideshow();
    };

    // Initial display
    showItem(currentIndex);

    // Start the slideshow for images if the first item is not a video
    if (!document.querySelector('.gallery-item.active video')) {
        startSlideshow();
    }

    // Manually play the video on the first touch event on mobile devices
    video.addEventListener('click', () => {
        video.play();
    });
});
