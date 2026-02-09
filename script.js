// =============================================
// SNEAKER-SPOTLIGHT WEBSITE - MAIN JAVASCRIPT
// =============================================

// Wait for the entire page to load before running any code
window.addEventListener('DOMContentLoaded', function() {
    console.log('✅ Page loaded, initializing scripts...');
    
    // Initialize all features
    initSlideshow();
    initTrendingFilters();
    initComparisonTool();
});

// =============================================
// 1. HOMEPAGE SLIDESHOW FUNCTIONALITY
// =============================================

let currentSlide = 0;
let slideTimer;
const SLIDE_INTERVAL = 5000; // 5 seconds

function initSlideshow() {
    const slides = document.querySelectorAll('.mySlides');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    const slideshowContainer = document.querySelector('.slideshow-container');
    
    // If no slideshow exists on this page, exit
    if (slides.length === 0) {
        console.log('ℹ️ No slideshow found on this page');
        return;
    }
    
    console.log(`✅ Found ${slides.length} slides, initializing...`);
    
    // Function to show a specific slide
    function showSlide(index) {
        // Handle index boundaries
        if (index >= slides.length) index = 0;
        if (index < 0) index = slides.length - 1;
        
        // Hide all slides
        slides.forEach(slide => {
            slide.style.display = 'none';
            slide.classList.remove('active');
        });
        
        // Remove active class from all dots
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Show the selected slide
        slides[index].style.display = 'block';
        slides[index].classList.add('active');
        
        // Activate corresponding dot
        if (dots[index]) {
            dots[index].classList.add('active');
        }
        
        // Update current slide index
        currentSlide = index;
    }
    
    // Function for next slide
    function nextSlide() {
        showSlide(currentSlide + 1);
        resetTimer();
    }
    
    // Function for previous slide
    function prevSlide() {
        showSlide(currentSlide - 1);
        resetTimer();
    }
    
    // Auto-play functions
    function startTimer() {
        stopTimer(); // Clear any existing timer first
        slideTimer = setInterval(nextSlide, SLIDE_INTERVAL);
    }
    
    function stopTimer() {
        if (slideTimer) {
            clearInterval(slideTimer);
        }
    }
    
    function resetTimer() {
        stopTimer();
        startTimer();
    }
    
    // Set up click events for dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            showSlide(index);
            resetTimer();
        });
    });
    
    // Set up click events for navigation arrows
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
    
    // Pause slideshow on hover
    if (slideshowContainer) {
        slideshowContainer.addEventListener('mouseenter', stopTimer);
        slideshowContainer.addEventListener('mouseleave', startTimer);
    }
    
    // Pause slideshow when user switches tabs
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            stopTimer();
        } else {
            startTimer();
        }
    });
    
    // Show first slide and start the timer
    showSlide(0);
    startTimer();
    
    console.log('✅ Slideshow initialized successfully');
}

// =============================================
// 2. TRENDING PAGE FILTERS
// =============================================

function initTrendingFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const trendingCards = document.querySelectorAll('.trending-card');
    
    // If no filters on this page, exit
    if (filterButtons.length === 0) return;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Get filter value
            const filter = this.getAttribute('data-filter');
            
            // Filter cards
            trendingCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-brand') === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// =============================================
// 3. COMPARISON TOOL FUNCTIONALITY
// =============================================

function initComparisonTool() {
    const compareBtn = document.getElementById('compare-btn');
    
    // If no comparison tool on this page, exit
    if (!compareBtn) return;
    
    // Sneaker database
    const sneakerDatabase = {
        "puma-speedcat": {
            name: "Puma Speedcat",
            price: "$89.99",
            bestFor: "Casual Wear, Retro Style",
            weight: "285g",
            materials: "Suede, Leather",
            release: "2024 Revival",
            comfort: "8.5/10",
            pros: ["Authentic retro styling", "Great price point", "Lightweight"],
            cons: ["Limited cushioning", "Narrow fit", "Suede requires care"]
        },
        "nike-dunk": {
            name: "Nike Dunk Low",
            price: "$110.00",
            bestFor: "Streetwear, Skate Style",
            weight: "410g",
            materials: "Leather, Rubber",
            release: "2025 Release",
            comfort: "7.5/10",
            pros: ["Iconic silhouette", "Durable", "Many colorways"],
            cons: ["Heavier", "Stiff initially", "Higher price"]
        },
        "adidas-samba": {
            name: "Adidas Samba OG",
            price: "$100.00",
            bestFor: "Minimalist Style, Everyday",
            weight: "320g",
            materials: "Leather, Gum Rubber",
            release: "Classic Reissue",
            comfort: "8.0/10",
            pros: ["Timeless design", "Versatile", "Comfortable fit"],
            cons: ["Thin sole", "Limited arch support", "Sizing issues"]
        }
    };
    
    // Event listener for compare button
    compareBtn.addEventListener('click', function() {
        const shoe1Select = document.getElementById('shoe1-select');
        const shoe2Select = document.getElementById('shoe2-select');
        
        if (!shoe1Select || !shoe2Select) return;
        
        const shoe1Id = shoe1Select.value;
        const shoe2Id = shoe2Select.value;
        
        // Validation
        if (!shoe1Id || !shoe2Id) {
            alert('Please select two sneakers to compare.');
            return;
        }
        
        if (shoe1Id === shoe2Id) {
            alert('Please select two different sneakers.');
            return;
        }
        
        const shoe1 = sneakerDatabase[shoe1Id];
        const shoe2 = sneakerDatabase[shoe2Id];
        
        if (!shoe1 || !shoe2) {
            alert('Error loading sneaker data.');
            return;
        }
        
        // Update the comparison table
        updateComparisonTable(shoe1, shoe2);
        
        // Show results section
        document.getElementById('comparison-results').style.display = 'block';
    });
}

function updateComparisonTable(shoe1, shoe2) {
    // Update shoe names
    document.getElementById('shoe1-name').textContent = shoe1.name;
    document.getElementById('shoe2-name').textContent = shoe2.name;
    
    // Update specifications
    const specs = ['bestFor', 'price', 'weight', 'materials', 'release', 'comfort'];
    
    specs.forEach(spec => {
        const shoe1Element = document.getElementById(`shoe1-${spec}`);
        const shoe2Element = document.getElementById(`shoe2-${spec}`);
        
        if (shoe1Element) shoe1Element.textContent = shoe1[spec];
        if (shoe2Element) shoe2Element.textContent = shoe2[spec];
    });
    
    // Update verdict sections
    document.getElementById('shoe1-verdict-title').textContent = shoe1.name;
    document.getElementById('shoe2-verdict-title').textContent = shoe2.name;
    
    // Update pros/cons
    updateList('shoe1-pros', shoe1.pros);
    updateList('shoe2-pros', shoe2.pros);
    updateList('shoe1-cons', shoe1.cons);
    updateList('shoe2-cons', shoe2.cons);
    
    // Generate recommendation
    generateRecommendation(shoe1, shoe2);
}

function updateList(elementId, items) {
    const element = document.getElementById(elementId);
    if (element) {
        element.innerHTML = items.map(item => `<li>${item}</li>`).join('');
    }
}

function generateRecommendation(shoe1, shoe2) {
    const price1 = parseFloat(shoe1.price.replace('$', ''));
    const price2 = parseFloat(shoe2.price.replace('$', ''));
    
    let recommendation = '';
    
    if (price1 < price2) {
        recommendation = `For value seekers, <strong>${shoe1.name}</strong> offers similar features at a lower price.`;
    } else if (price2 < price1) {
        recommendation = `For value seekers, <strong>${shoe2.name}</strong> offers similar features at a lower price.`;
    } else {
        recommendation = `Both are priced the same. Choose <strong>${shoe1.name}</strong> for ${shoe1.bestFor} or <strong>${shoe2.name}</strong> for ${shoe2.bestFor}.`;
    }
    
    const recommendationElement = document.getElementById('recommendation-text');
    if (recommendationElement) {
        recommendationElement.innerHTML = recommendation;
    }
}

// =============================================
// 4. MOBILE MENU TOGGLE (Future Enhancement)
// =============================================
/*
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('show');
        });
    }
}
*/

// =============================================
// 5. PERFORMANCE OPTIMIZATIONS
// =============================================

// Debounce function for resize events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Handle window resize
window.addEventListener('resize', debounce(function() {
    console.log('🔄 Window resized');
    // Re-initialize responsive elements if needed
}, 250));

console.log('✅ All JavaScript functions defined');
