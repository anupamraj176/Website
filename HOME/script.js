// Form Validation and Submission Handling
document.getElementById('enquiryForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const mobile = document.getElementById('mobile').value.trim();
    const course = document.getElementById('course').value;
    const enquiry = document.getElementById('enquiry').value.trim();

    const mobileRegex = /^[0-9]{10}$/;
    let isValid = true;
    let errorMessage = '';

    if (!name) {
        errorMessage += 'Name is required.\n';
        isValid = false;
    }

    if (!mobile || !mobileRegex.test(mobile)) {
        errorMessage += 'Please enter a valid 10-digit mobile number.\n';
        isValid = false;
    }

    if (!course) {
        errorMessage += 'Please select a course.\n';
        isValid = false;
    }

    if (!enquiry) {
        errorMessage += 'Enquiry is required.\n';
        isValid = false;
    }

    if (!isValid) {
        alert(errorMessage);
        return;
    }

    const formData = { name, mobile, course, enquiry };
    console.log('Form Data:', formData);

    alert('Form submitted successfully!');
    document.getElementById('enquiryForm').reset();
});

// Scroll Animation for College Cards
const collegeCards = document.querySelectorAll('.college-card');

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

collegeCards.forEach(card => {
    observer.observe(card);
});

// Smooth Scrolling for Navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Click Event for "Read More" Buttons
document.querySelectorAll('.read-more').forEach(button => {
    button.addEventListener('click', function (e) {
        e.preventDefault();
        const collegeName = this.parentElement.parentElement.querySelector('h3').textContent;
        console.log(`Clicked "Read More" for: ${collegeName}`);
    });
});

// Search Functionality
document.getElementById('searchButton').addEventListener('click', function () {
    const searchQuery = document.getElementById('searchInput').value.trim().toLowerCase();
    const collegeCards = document.querySelectorAll('.college-card');

    collegeCards.forEach(card => {
        const collegeName = card.getAttribute('data-college').toLowerCase();
        if (searchQuery === '' || collegeName.includes(searchQuery)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });

    // Scroll to the first visible card
    const firstVisibleCard = document.querySelector('.college-card:not([style*="display: none"])');
    if (firstVisibleCard) {
        window.scrollTo({
            top: firstVisibleCard.offsetTop - 60, // Adjust for header height
            behavior: 'smooth'
        });
    }
});

// Optional: Search on Enter key
document.getElementById('searchInput').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        document.getElementById('searchButton').click();
    }
});