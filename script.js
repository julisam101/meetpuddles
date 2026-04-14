/**
 * Dark Mode Toggle Script
 * Provides dark mode functionality with localStorage persistence
 */

document.addEventListener('DOMContentLoaded', function() {
    // Get or create dark mode toggle button
    const toggleButton = document.querySelector('.dark-mode-toggle') || createToggleButton();
    
    // Initialize dark mode from localStorage
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
        enableDarkMode();
        updateToggleButton();
    }
    
    // Add click listener to toggle button
    toggleButton.addEventListener('click', toggleDarkMode);
    
    // Listen for system dark mode preference changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('darkMode')) {
            if (e.matches) {
                enableDarkMode();
            } else {
                disableDarkMode();
            }
            updateToggleButton();
        }
    });
    
    // Check system preference on first load if no saved preference
    if (!localStorage.getItem('darkMode')) {
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            enableDarkMode();
            updateToggleButton();
        }
    }
});

function toggleDarkMode() {
    const isDarkMode = document.body.classList.contains('dark-mode');
    
    if (isDarkMode) {
        disableDarkMode();
    } else {
        enableDarkMode();
    }
    
    updateToggleButton();
}

function enableDarkMode() {
    document.body.classList.add('dark-mode');
    localStorage.setItem('darkMode', 'true');
}

function disableDarkMode() {
    document.body.classList.remove('dark-mode');
    localStorage.setItem('darkMode', 'false');
}

function updateToggleButton() {
    const toggleButton = document.querySelector('.dark-mode-toggle');
    if (toggleButton) {
        const isDarkMode = document.body.classList.contains('dark-mode');
        toggleButton.textContent = isDarkMode ? '☀️' : '🌙';
        toggleButton.setAttribute('aria-label', isDarkMode ? 'Enable Light Mode' : 'Enable Dark Mode');
    }
}

function createToggleButton() {
    // Create button if it doesn't exist (fallback)
    const button = document.createElement('button');
    button.className = 'dark-mode-toggle';
    button.textContent = '🌙';
    button.setAttribute('aria-label', 'Toggle Dark Mode');
    
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        navbar.appendChild(button);
    }
    
    return button;
}

/**
 * Form Validation Script
 * Provides client-side form validation with real-time feedback
 */

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        initializeFormValidation(contactForm);
    }
});

function initializeFormValidation(form) {
    const inputs = form.querySelectorAll('input, textarea, select');
    
    inputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', validateField);
    });
    
    form.addEventListener('submit', function(e) {
        let isValid = true;
        inputs.forEach(input => {
            if (!validateField.call(input)) {
                isValid = false;
            }
        });
        
        if (!isValid) {
            e.preventDefault();
        }
    });
}

function validateField() {
    const field = this;
    const value = field.value.trim();
    const type = field.type;
    const name = field.name;
    let isValid = true;
    
    // Clear previous validation state
    field.classList.remove('is-invalid', 'is-valid');
    
    // Required field validation
    if (field.hasAttribute('required') && !value) {
        isValid = false;
    }
    
    // Type-specific validation
    if (value) {
        switch (type) {
            case 'email':
                isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
                break;
            case 'tel':
                isValid = /^[\d\s\-\+\(\)]+$/.test(value);
                break;
            case 'number':
                isValid = !isNaN(value);
                break;
            case 'text':
                if (name === 'name') {
                    isValid = value.length >= 2;
                }
                break;
        }
    }
    
    // Update visual feedback
    if (!isValid && value) {
        field.classList.add('is-invalid');
    } else if (isValid && value && field.hasAttribute('required')) {
        field.classList.add('is-valid');
    }
    
    // Set validity for HTML5 validation
    if (isValid) {
        field.setCustomValidity('');
    } else {
        field.setCustomValidity('Invalid field');
    }
    
    return isValid;
}

/**
 * Utility function to get all form data
 */
function getFormData(form) {
    const formData = new FormData(form);
    const data = {};
    
    for (let [key, value] of formData.entries()) {
        data[key] = value;
    }
    
    return data;
}
