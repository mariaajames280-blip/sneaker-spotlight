// WAIT FOR PAGE TO LOAD
document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ Starting Sneaker-Spotlight...');
    startSlideshow();
});

// WORKING SLIDESHOW
function startSlideshow() {
    const slides = document.querySelectorAll('.mySlides');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    
    if (slides.length === 0) {
        console.log('❌ No slides found!');
        return;
    }
    
    console.log(`✅ Found ${slides.length} slides`);
    
    let currentSlide = 0;
    let slideTimer;
    
    // SHOW SPECIFIC SLIDE
    function showSlide(n) {
        // HIDE ALL
        slides.forEach(slide => {
            slide.style.display = 'none';
            slide.classList.remove('active');
        });
        dots.forEach(dot => dot.classList.remove('active'));
        
        // HANDLE WRAP
        if (n >= slides.length) n = 0;
        if (n < 0) n = slides.length - 1;
        
        // SHOW CURRENT
        slides[n].style.display = 'block';
        slides[n].classList.add('active');
        if (dots[n]) dots[n].classList.add('active');
        
        currentSlide = n;
        console.log(`🔄 Now showing slide ${n + 1}`);
    }
    
    // NEXT/PREV
    function nextSlide() {
        showSlide(currentSlide + 1);
        resetTimer();
    }
    
    function prevSlide() {
        showSlide(currentSlide - 1);
        resetTimer();
    }
    
    // TIMER
    function startTimer() {
        stopTimer();
        slideTimer = setInterval(nextSlide, 5000); // 5 seconds
    }
    
    function stopTimer() {
        if (slideTimer) clearInterval(slideTimer);
    }
    
    function resetTimer() {
        stopTimer();
        startTimer();
    }
    
    // CLICK EVENTS
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            showSlide(index);
            resetTimer();
        });
    });
    
    if (prevBtn) {
        prevBtn.addEventListener('click', function(e) {
            e.preventDefault();
            prevSlide();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', function(e) {
            e.preventDefault();
            nextSlide();
        });
    }
    
    // HOVER PAUSE
    const container = document.querySelector('.slideshow-container');
    if (container) {
        container.addEventListener('mouseenter', stopTimer);
        container.addEventListener('mouseleave', startTimer);
    }
    
    // START
    showSlide(0);
    startTimer();
    console.log('✅ Slideshow running!');
}
