// Mobile Menu Toggle
function toggleMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    mobileMenu.classList.toggle('active');
}

// Close mobile menu when clicking outside
document.addEventListener('click', function(event) {
    const mobileMenu = document.getElementById('mobileMenu');
    const menuBtn = document.querySelector('.mobile-menu-btn');
    
    if (!mobileMenu.contains(event.target) && !menuBtn.contains(event.target)) {
        mobileMenu.classList.remove('active');
    }
});

// AI Image Generator (Auto-updates every 24 hours)
const aiImages = [
    'https://images.unsplash.com/photo-1600585154526-990dced4db0d',
    'https://images.unsplash.com/photo-1600585154343-ce5ff4b1e7e2',
    'https://images.unsplash.com/photo-1574285013029-29296a71930e',
    'https://images.unsplash.com/photo-1565688824213-1f0b6da2f9b9',
    'https://images.unsplash.com/photo-1584622650111-993a426fbf0a',
    'https://images.unsplash.com/photo-1558036117-15d82a90b9b1',
    'https://images.unsplash.com/photo-1605146769289-440113cc3d00'
];

function getRandomImage() {
    const randomIndex = Math.floor(Math.random() * aiImages.length);
    return aiImages[randomIndex];
}

function updateAIImage() {
    const aiImage = document.getElementById('aiImage');
    const updateTime = document.getElementById('imageUpdateTime');
    
    // Set random image
    aiImage.src = getRandomImage();
    
    // Update timestamp
    const now = new Date();
    updateTime.textContent = `Updated: ${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
    
    // Save to localStorage
    localStorage.setItem('lastImageUpdate', now.toISOString());
    localStorage.setItem('currentImage', aiImage.src);
}

function refreshAIImage() {
    updateAIImage();
}

// Check and update image on load
document.addEventListener('DOMContentLoaded', function() {
    const lastUpdate = localStorage.getItem('lastImageUpdate');
    const currentImage = localStorage.getItem('currentImage');
    const aiImage = document.getElementById('aiImage');
    const updateTime = document.getElementById('imageUpdateTime');
    
    if (lastUpdate && currentImage) {
        const lastUpdateDate = new Date(lastUpdate);
        const now = new Date();
        const hoursSinceUpdate = (now - lastUpdateDate) / (1000 * 60 * 60);
        
        // Update if more than 24 hours
        if (hoursSinceUpdate > 24) {
            updateAIImage();
        } else {
            aiImage.src = currentImage;
            updateTime.textContent = `Updated: ${lastUpdateDate.toLocaleDateString()} ${lastUpdateDate.toLocaleTimeString()}`;
        }
    } else {
        updateAIImage();
    }
});

// Concrete Calculator
function calculateConcrete() {
    const length = parseFloat(document.getElementById('length').value);
    const width = parseFloat(document.getElementById('width').value);
    const depth = parseFloat(document.getElementById('depth').value) / 1000; // Convert mm to meters
    const grade = document.getElementById('grade').value;
    
    // Validation
    if (!length || !width || !depth) {
        alert('Please enter all dimensions');
        return;
    }
    
    // Calculate volume
    const volume = length * width * depth;
    
    // Price per m3 based on grade
    let pricePerM3;
    switch(grade) {
        case 'c20':
            pricePerM3 = 120;
            break;
        case 'c25':
            pricePerM3 = 135;
            break;
        case 'c30':
            pricePerM3 = 150;
            break;
        default:
            pricePerM3 = 120;
    }
    
    // Calculate costs
    const materialCost = volume * pricePerM3;
    const laborCost = volume * 80; // £80 per m3 labor
    const totalCost = materialCost + laborCost;
    
    // Display results
    document.getElementById('volume').textContent = volume.toFixed(2);
    document.getElementById('materialCost').textContent = materialCost.toFixed(2);
    document.getElementById('laborCost').textContent = laborCost.toFixed(2);
    document.getElementById('totalCost').textContent = totalCost.toFixed(2);
    
    document.getElementById('calculatorResult').style.display = 'block';
}

// Image Upload Functionality
document.addEventListener('DOMContentLoaded', function() {
    const uploadArea = document.getElementById('uploadArea');
    const imageUpload = document.getElementById('imageUpload');
    const uploadPreview = document.getElementById('uploadPreview');
    const previewImage = document.getElementById('previewImage');
    
    uploadArea.addEventListener('click', function() {
        imageUpload.click();
    });
    
    uploadArea.addEventListener('dragover', function(e) {
        e.preventDefault();
        uploadArea.style.background = '#e8f4f8';
    });
    
    uploadArea.addEventListener('dragleave', function(e) {
        e.preventDefault();
        uploadArea.style.background = '#f8f9fa';
    });
    
    uploadArea.addEventListener('drop', function(e) {
        e.preventDefault();
        uploadArea.style.background = '#f8f9fa';
        
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            handleImageUpload(file);
        }
    });
    
    imageUpload.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            handleImageUpload(file);
        }
    });
});

function handleImageUpload(file) {
    // Check file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
        alert('File size should be less than 10MB');
        return;
    }
    
    const reader = new FileReader();
    reader.onload = function(e) {
        document.getElementById('previewImage').src = e.target.result;
        document.getElementById('uploadPreview').style.display = 'block';
        document.getElementById('uploadArea').style.display = 'none';
    };
    reader.readAsDataURL(file);
}

function removeImage() {
    document.getElementById('uploadPreview').style.display = 'none';
    document.getElementById('uploadArea').style.display = 'block';
    document.getElementById('imageUpload').value = '';
}

// Quote Form Submission
function submitQuote(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const postcode = document.getElementById('postcode').value;
    const size = document.getElementById('size').value;
    const details = document.getElementById('details').value;
    
    // Create WhatsApp message
    let message = `Hello Mr. Driveways! I need a quote for my driveway:%0A%0A`;
    message += `*Name:* ${name}%0A`;
    message += `*Phone:* ${phone}%0A`;
    message += `*Email:* ${email || 'Not provided'}%0A`;
    message += `*Postcode:* ${postcode}%0A`;
    message += `*Approx Size:* ${size || 'Not specified'} sq meters%0A`;
    message += `*Details:* ${details || 'No details provided'}%0A`;
    
    // Open WhatsApp
    window.open(`https://wa.me/447383555131?text=${message}`, '_blank');
}

// TikTok Feed (Simulated - Replace with actual TikTok API in production)
function loadTikTokFeed() {
    const feed = document.getElementById('tiktokFeed');
    
    // Sample videos - In production, fetch from TikTok API
    const videos = [
        {
            id: 1,
            url: 'https://www.tiktok.com/@mr.driveways/video/1',
            thumbnail: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d',
            description: 'Beautiful concrete driveway installation in Birmingham',
            likes: '1.2K',
            comments: '45'
        },
        {
            id: 2,
            url: 'https://www.tiktok.com/@mr.driveways/video/2',
            thumbnail: 'https://images.unsplash.com/photo-1600585154343-ce5ff4b1e7e2',
            description: 'Satisfying concrete finishing process',
            likes: '2.5K',
            comments: '78'
        },
        {
            id: 3,
            url: 'https://www.tiktok.com/@mr.driveways/video/3',
            thumbnail: 'https://images.unsplash.com/photo-1574285013029-29296a71930e',
            description: 'Before and after - Driveway transformation',
            likes: '3.1K',
            comments: '92'
        }
    ];
    
    videos.forEach(video => {
        const videoElement = document.createElement('div');
        videoElement.className = 'tiktok-video';
        videoElement.innerHTML = `
            <img src="${video.thumbnail}" alt="TikTok Video" style="width: 100%; aspect-ratio: 9/16; object-fit: cover;">
            <div class="video-info">
                <p>${video.description}</p>
                <div class="video-stats">
                    <span><i class="fas fa-heart"></i> ${video.likes}</span>
                    <span><i class="fas fa-comment"></i> ${video.comments}</span>
                </div>
            </div>
        `;
        
        videoElement.addEventListener('click', function() {
            window.open(video.url, '_blank');
        });
        
        feed.appendChild(videoElement);
    });
}

// Load TikTok feed on page load
document.addEventListener('DOMContentLoaded', loadTikTokFeed);

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Lazy loading for images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// SEO Optimization - Add structured data
function addStructuredData() {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "Mr. Driveways",
        "description": "Professional concrete driveway installation in Birmingham",
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "Birmingham",
            "addressCountry": "UK"
        },
        "telephone": "+447383555131",
        "priceRange": "££",
        "openingHours": "Mo-Su 07:00-20:00",
        "sameAs": [
            "https://www.tiktok.com/@mr.driveways"
        ]
    });
    document.head.appendChild(script);
}

// Add structured data on load
document.addEventListener('DOMContentLoaded', addStructuredData);
