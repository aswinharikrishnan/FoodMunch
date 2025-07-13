document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // Category data
    const categories = [
        {
            title: "Healthy Options",
            image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            fallback: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            description: "Nutritious meals that fuel your body without compromising on taste."
        },
        {
            title: "Fast Food",
            image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            fallback: "https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            description: "Quick, delicious meals for when you're craving something familiar."
        },
        {
            title: "Vegetarian",
            image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            fallback: "https://images.unsplash.com/photo-1543351611-58f69d7c1781?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            description: "Plant-based dishes that are as satisfying as they are healthy."
        }
    ];
    
    // Food items data (with Indian Rupee prices)
    const foodItems = [
        {
            name: "Classic Cheeseburger",
            image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            fallback: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            price: 199,
            rating: 5
        },
        {
            name: "Margherita Pizza",
            image: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            fallback: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            price: 299,
            rating: 4
        },
        {
            name: "Sushi Platter",
            image: "https://images.unsplash.com/photo-1559847844-5315695dadae?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            fallback: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            price: 499,
            rating: 5
        },
        {
            name: "Spaghetti Carbonara",
            image: "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            fallback: "https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            price: 249,
            rating: 4
        }
    ];
    
    // Render categories
    const categoryGrid = document.querySelector('.category-grid');
    categories.forEach(category => {
        categoryGrid.innerHTML += `
            <div class="category-card">
                <img src="${category.image}" 
                     alt="${category.title}" 
                     class="category-img"
                     loading="lazy"
                     onerror="this.onerror=null; this.src='${category.fallback}'">
                <div class="category-info">
                    <h3>${category.title}</h3>
                    <p>${category.description}</p>
                    <a href="#" class="btn">Explore</a>
                </div>
            </div>
        `;
    });
    
    // Render food items
    const foodGrid = document.querySelector('.food-grid');
    foodItems.forEach(item => {
        const stars = '★'.repeat(item.rating) + '☆'.repeat(5 - item.rating);
        foodGrid.innerHTML += `
            <div class="food-card">
                <img src="${item.image}" 
                     alt="${item.name}" 
                     class="food-img"
                     loading="lazy"
                     onerror="this.onerror=null; this.src='${item.fallback}'">
                <div class="food-info">
                    <h3>${item.name}</h3>
                    <div class="price">₹${item.price}</div>
                    <div class="rating">${stars}</div>
                    <a href="#" class="btn">Add to Cart</a>
                </div>
            </div>
        `;
    });
    
    // Animate stats counter
    const statNumbers = document.querySelectorAll('.stat-number');
    
    function animateStats() {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            const duration = 2000; // 2 seconds
            const step = Math.floor(target / (duration / 16)); // 60fps
            
            let current = 0;
            const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                    clearInterval(timer);
                    current = target;
                }
                stat.textContent = current;
            }, 16);
        });
    }
    
    // Intersection Observer for stats animation
    const aboutSection = document.querySelector('.about-section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(aboutSection);
});