document.addEventListener("DOMContentLoaded", function() {
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  const exitMenuButton = document.getElementById('exit-menu-button');
  const menuContent = document.getElementById('menu-content'); // The actual content of the menu

  // Function to toggle mobile menu visibility
  mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden'); // Only toggle 'hidden' class
  });

  // Exit menu on clicking the close button
  exitMenuButton.addEventListener('click', () => {
    mobileMenu.classList.add('hidden');
  });

  // Exit menu when clicking the whitespace of the menu (but not the menu content)
  mobileMenu.addEventListener('click', function(event) {
    // If the click is outside the menu content, close the menu
    if (!menuContent.contains(event.target)) {
      mobileMenu.classList.add('hidden');
    }
  });

  // Slider functionality
  const sliderTrack = document.querySelector('.slider-track');
  let currentIndex = 0;

  // Function to calculate the number of visible review boxes depending on screen width
  function getVisibleBoxes() {
    const screenWidth = window.innerWidth;
    if (screenWidth < 768) { // Mobile screens
      return 1;
    } else { // Desktop screens
      return 3;
    }
  }

  // Function to move to the next slide
  function moveToNextSlide() {
    const reviewBoxWidth = document.querySelector('.review-box').offsetWidth + 16; // Width of one box plus the gap
    const totalVisibleBoxes = getVisibleBoxes(); // Get how many boxes are visible
    const totalSlides = sliderTrack.children.length;

    currentIndex++;

    if (currentIndex >= totalSlides / totalVisibleBoxes) {
      sliderTrack.style.transition = 'none'; // Disable transition for reset
      currentIndex = 0;
      sliderTrack.style.transform = `translateX(0)`; // Reset to the start
    } else {
      sliderTrack.style.transition = 'transform 0.5s ease-in-out'; // Smooth transition
      sliderTrack.style.transform = `translateX(-${currentIndex * reviewBoxWidth * totalVisibleBoxes}px)`; // Slide to next set
    }
  }

  // Auto-slide every 3 seconds
  setInterval(moveToNextSlide, 3000);

  // Handle window resizing to recalculate the visible boxes and reset slider
  window.addEventListener('resize', () => {
    currentIndex = 0;
    sliderTrack.style.transition = 'none'; // Disable transition for immediate reset
    sliderTrack.style.transform = `translateX(0)`; // Reset to the start
  });
});

// Video Modal
const videoModal = document.getElementById('video-modal');
const playButton = document.querySelector('a[href="#video-modal"]');
const closeButton = document.getElementById('close-video');

playButton.addEventListener('click', (e) => {
  e.preventDefault();
  videoModal.classList.remove('hidden');
});

closeButton.addEventListener('click', () => {
  videoModal.classList.add('hidden');
});
