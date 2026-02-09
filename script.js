// ========== SLIDESHOW FUNCTIONALITY ==========
let slideIndex = 0;
let slideInterval;
const slideDelay = 5000; // 5 seconds

// DOM Elements
let slides = [];
let dots = [];

// Initialize slideshow when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeSlideshow();
    initializeComparisonTool();
});

// Initialize slideshow elements and start auto-play
function initializeSlideshow() {
    slides = document.getElementsByClassName('mySlides');
    dots = document.getElementsByClassName('dot');
    
    // Only initialize if slides exist
    if (slides.length === 0) {
        console.log('No slides found');
        return;
    }
    
    // Show first slide
    showSlide(slideIndex);
    
    // Start auto-play
    startAutoPlay();
    
    // Add event listeners for controls
    setupSlideshowControls();
}

// Show specific slide
function showSlide(n) {
    // Validate slide index
    if (n >= slides.length) {
        slideIndex = 0;
    } else if (n < 0) {
        slideIndex = slides.length - 1;
    } else {
        slideIndex = n;
    }
    
    // Hide all slides
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = 'none';
        slides[i].classList.remove('active');
    }
    
    // Remove active class from all dots
    for (let i = 0; i < dots.length; i++) {
        dots[i].classList.remove('active');
    }
    
    // Show current slide
    if (slides[slideIndex]) {
        slides[slideIndex].style.display = 'block';
        slides[slideIndex].classList.add('active');
        
        // Activate corresponding dot
        if (dots[slideIndex]) {
            dots[slideIndex].classList.add('active');
        }
    }
}

// Next/previous controls
function nextSlide() {
    showSlide(slideIndex + 1);
}

function prevSlide() {
    showSlide(slideIndex - 1);
}

// Go to specific slide
function currentSlide(n) {
    showSlide(n - 1); // Convert to zero-based index
}

// Auto-play functionality
function startAutoPlay() {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, slideDelay);
}

function stopAutoPlay() {
    clearInterval(slideInterval);
}

// Setup event listeners for slideshow controls
function setupSlideshowControls() {
    // Previous/Next buttons
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    
    if (prevBtn) {
        prevBtn.addEventListener('click', function(e) {
            e.preventDefault();
            prevSlide();
            startAutoPlay(); // Restart timer after manual navigation
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', function(e) {
            e.preventDefault();
            nextSlide();
            startAutoPlay(); // Restart timer after manual navigation
        });
    }
    
    // Dot controls
    for (let i = 0; i < dots.length; i++) {
        dots[i].addEventListener('click', function() {
            currentSlide(i + 1);
            startAutoPlay(); // Restart timer after manual navigation
        });
    }
    
    // Pause on hover
    const slideshowContainer = document.querySelector('.slideshow-container');
    if (slideshowContainer) {
        slideshowContainer.addEventListener('mouseenter', stopAutoPlay);
        slideshowContainer.addEventListener('mouseleave', startAutoPlay);
    }
    
    // Pause when window loses focus
    window.addEventListener('blur', stopAutoPlay);
    window.addEventListener('focus', startAutoPlay);
}

// ========== COMPARISON TOOL FUNCTIONALITY ==========
function initializeComparisonTool() {
    const compareBtn = document.getElementById('compare-btn');
    if (compareBtn) {
        compareBtn.addEventListener('click', compareSneakers);
    }
    
    // Initialize dropdown displays
    const shoe1Select = document.getElementById('shoe1-select');
    const shoe2Select = document.getElementById('shoe2-select');
    
    if (shoe1Select) {
        shoe1Select.addEventListener('change', function() {
            updateShoeDisplay(this.value, 'shoe1-display');
        });
    }
    
    if (shoe2Select) {
        shoe2Select.addEventListener('change', function() {
            updateShoeDisplay(this.value, 'shoe2-display');
        });
    }
}

// Sneaker database for comparison tool
const sneakerDatabase = {
    "puma-speedcat": {
        name: "Puma Speedcat",
        image: "assets/images/puma-speedcat-thumb.jpg",
        price: "$89.99",
        bestFor: "Casual Wear, Retro Style",
        weight: "285g",
        materials: "Suede, Leather",
        release: "2024 Revival",
        comfort: "8.5/10",
        pros: ["Authentic retro styling", "Great price point", "Lightweight construction"],
        cons: ["Limited cushioning", "Narrow fit for some", "Suede requires care"]
    },
    "nike-dunk": {
        name: "Nike Dunk Low",
        image: "assets/images/nike-dunk-thumb.jpg",
        price: "$110.00",
        bestFor: "Streetwear, Skate Style",
        weight: "410g",
        materials: "Leather, Rubber",
        release: "2025 Release",
        comfort: "7.5/10",
        pros: ["Iconic silhouette", "Durable construction", "Wide colorway selection"],
        cons: ["Heavier than most", "Stiff out-of-box", "Higher price point"]
    },
    "adidas-samba": {
        name: "Adidas Samba OG",
        image: "assets/images/adidas-samba-thumb.jpg",
        price: "$100.00",
        bestFor: "Minimalist Style, Everyday Wear",
        weight: "320g",
        materials: "Leather, Gum Rubber",
        release: "Classic Reissue",
        comfort: "8.0/10",
        pros: ["Timeless design", "Versatile styling", "Comfortable fit"],
        cons: ["Thin sole", "Limited arch support", "Common sizing issues"]
    },
    "nb-550": {
        name: "New Balance 550",
        image: "assets/images/nb-550-thumb.jpg",
        price: "$120.00",
        bestFor: "Retro Basketball, Lifestyle",
        weight: "350g",
        materials: "Premium Leather",
        release: "2024 Colorway",
        comfort: "8.0/10",
        pros: ["Premium materials", "Excellent craftsmanship", "Good arch support"],
        cons: ["Higher price", "Limited availability", "Runs slightly large"]
    }
};

// Update shoe display in comparison tool
function updateShoeDisplay(shoeId, displayElementId) {
    const displayElement = document.getElementById(displayElementId);
    const shoe = sneakerDatabase[shoeId];
    
    if (shoe && displayElement) {
        displayElement.innerHTML = `
            <img src="${shoe.image}" alt="${shoe.name}" style="width: 80px; height: 80px; object-fit: cover; border-radius: 5px;">
            <div style="flex: 1;">
                <h4 style="color: #ffffff; margin: 0 0 5px 0;">${shoe.name}</h4>
                <p style="color: #d1d1d1; margin: 0; font-size: 14px;">${shoe.price} • ${shoe.bestFor}</p>
            </div>
        `;
        displayElement.style.display = 'flex';
    } else if (displayElement) {
        displayElement.style.display = 'none';
    }
}

// Main comparison function
function compareSneakers() {
    const shoe1Select = document.getElementById('shoe1-select');
    const shoe2Select = document.getElementById('shoe2-select');
    const resultsDiv = document.getElementById('comparison-results');
    
    if (!shoe1Select || !shoe2Select || !resultsDiv) return;
    
    const shoe1Id = shoe1Select.value;
    const shoe2Id = shoe2Select.value;
    
    // Validation
    if (!shoe1Id || !shoe2Id) {
        alert('Please select two sneakers to compare.');
        return;
    }
    
    if (shoe1Id === shoe2Id) {
        alert('Please select two different sneakers to compare.');
        return;
    }
    
    const shoe1 = sneakerDatabase[shoe1Id];
    const shoe2 = sneakerDatabase[shoe2Id];
    
    if (!shoe1 || !shoe2) return;
    
    // Update comparison table
    updateComparisonTable(shoe1, shoe2);
    
    // Update verdict sections
    updateVerdictSections(shoe1, shoe2);
    
    // Generate and display recommendation
    displayRecommendation(shoe1, shoe2);
    
    // Show results
    resultsDiv.style.display = 'block';
    
    // Scroll to results
    resultsDiv.scrollIntoView({ behavior: 'smooth' });
}

// Update comparison table
function updateComparisonTable(shoe1, shoe2) {
    const elements = {
        'shoe1-name': shoe1.name,
        'shoe2-name': shoe2.name,
        'shoe1-bestfor': shoe1.bestFor,
        'shoe2-bestfor': shoe2.bestFor,
        'shoe1-price': shoe1.price,
        'shoe2-price': shoe2.price,
        'shoe1-weight': shoe1.weight,
        'shoe2-weight': shoe2.weight,
        'shoe1-materials': shoe1.materials,
        'shoe2-materials': shoe2.materials,
        'shoe1-release': shoe1.release,
        'shoe2-release': shoe2.release,
        'shoe1-comfort': shoe1.comfort,
        'shoe2-comfort': shoe2.comfort
    };
    
    for (const [id, value] of Object.entries(elements)) {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = value;
        }
    }
}

// Update verdict sections
function updateVerdictSections(shoe1, shoe2) {
    // Update titles
    document.getElementById('shoe1-verdict-title').textContent = shoe1.name;
    document.getElementById('shoe2-verdict-title').textContent = shoe2.name;
    
    // Update pros/cons lists
    updateProsConsList('shoe1-pros', shoe1.pros);
    updateProsConsList('shoe2-pros', shoe2.pros);
    updateProsConsList('shoe1-cons', shoe1.cons);
    updateProsConsList('shoe2-cons', shoe2.cons);
    
    // Update verdict text
    document.getElementById('verdict-text').textContent = 
        `After comparing ${shoe1.name} and ${shoe2.name}, here's our detailed analysis:`;
}

// Update pros/cons lists
function updateProsConsList(elementId, items) {
    const element = document.getElementById(elementId);
    if (element) {
        element.innerHTML = items.map(item => `<li style="color: #f5f5f5; margin-bottom: 8px;">${item}</li>`).join('');
    }
}

// Generate and display recommendation
function displayRecommendation(shoe1, shoe2) {
    const price1 = parseFloat(shoe1.price.replace('$', ''));
    const price2 = parseFloat(shoe2.price.replace('$', ''));
    const comfort1 = parseFloat(shoe1.comfort);
    const comfort2 = parseFloat(shoe2.comfort);
    
    let recommendation = '';
    let winner = '';
    
    // Recommendation logic
    if (price1 < price2 && comfort1 >= comfort2) {
        recommendation = `For most buyers, we recommend the <strong>${shoe1.name}</strong> as it offers better value for money while maintaining excellent comfort.`;
        winner = shoe1.name;
    } else if (price2 < price1 && comfort2 >= comfort1) {
        recommendation = `For most buyers, we recommend the <strong>${shoe2.name}</strong> as it offers better value for money while maintaining excellent comfort.`;
        winner = shoe2.name;
    } else if (comfort1 > comfort2) {
        recommendation = `If comfort is your priority, the <strong>${shoe1.name}</strong> is the clear winner despite the higher price.`;
        winner = shoe1.name;
    } else if (comfort2 > comfort1) {
        recommendation = `If comfort is your priority, the <strong>${shoe2.name}</strong> is the clear winner despite the higher price.`;
        winner = shoe2.name;
    } else {
        recommendation = `Both sneakers are excellent choices. The <strong>${shoe1.name}</strong> leans more toward ${shoe1.bestFor}, while the <strong>${shoe2.name}</strong> excels at ${shoe2.bestFor}.`;
        winner = 'Both';
    }
    
    // Display recommendation
    const recommendationElement = document.getElementById('recommendation-text');
    if (recommendationElement) {
        recommendationElement.innerHTML = recommendation;
    }
    
    // Update purchase links
    const purchaseLinks = document.getElementById('purchase-links');
    if (purchaseLinks) {
        purchaseLinks.innerHTML = `
            <a href="${shoe1.name.toLowerCase().replace(' ', '-')}.html" class="cta-button" style="margin: 10px;">
                Buy ${shoe1.name}
            </a>
            <a href="${shoe2.name.toLowerCase().replace(' ', '-')}.html" class="cta-button" style="margin: 10px;">
                Buy ${shoe2.name}
            </a>
        `;
    }
}

// ========== TRENDING PAGE FILTERS ==========
function initializeTrendingFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const trendingCards = document.querySelectorAll('.trending-card');
    
    if (filterButtons.length === 0 || trendingCards.length === 0) return;
    
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

// Initialize trending filters when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeTrendingFilters);

// ========== UTILITY FUNCTIONS ==========
// Debounce function for performance
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

// ========== WINDOW RESIZE HANDLER ==========
// Handle responsive behavior on window resize
window.addEventListener('resize', debounce(function() {
    // Re-initialize slideshow if needed
    if (slides.length > 0) {
        showSlide(slideIndex);
    }
}, 250));
