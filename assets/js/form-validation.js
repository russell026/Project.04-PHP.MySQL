document.addEventListener('DOMContentLoaded', function() {
    // Get form elements
    const contactForm = document.getElementById('contact-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');
    const submitBtn = document.getElementById('submit-btn');
    const successMessage = document.getElementById('success-message');
    
    // Create dynamic form elements
    const createDynamicFormElements = () => {
        // Add character counter for message
        const charCounter = document.createElement('div');
        charCounter.className = 'char-counter';
        charCounter.style.textAlign = 'right';
        charCounter.style.fontSize = '14px';
        charCounter.style.color = '#777';
        charCounter.style.marginTop = '5px';
        charCounter.textContent = '0 karakter';
        
        // Insert after textarea
        if (messageInput) {
            messageInput.parentNode.insertBefore(charCounter, messageInput.nextSibling);
            
            // Update character count on input
            messageInput.addEventListener('input', function() {
                const count = this.value.length;
                charCounter.textContent = count + ' karakter';
                
                // Change color based on length
                if (count > 500) {
                    charCounter.style.color = '#e74c3c';
                } else if (count > 200) {
                    charCounter.style.color = '#f39c12';
                } else {
                    charCounter.style.color = '#777';
                }
            });
        }
        
        // Add password strength meter (for forms with password field)
        const passwordInput = document.getElementById('password');
        if (passwordInput) {
            // Create strength meter container
            const strengthMeter = document.createElement('div');
            strengthMeter.className = 'password-strength';
            strengthMeter.innerHTML = `
                <div class="strength-meter-bar">
                    <div class="strength-meter-fill"></div>
                </div>
                <div class="strength-text">Password strength</div>
            `;
            
            // Add styles
            const strengthStyle = document.createElement('style');
            strengthStyle.textContent = `
                .password-strength {
                    margin-top: 5px;
                }
                
                .strength-meter-bar {
                    height: 5px;
                    background-color: #f0f0f0;
                    border-radius: 5px;
                    margin-bottom: 5px;
                }
                
                .strength-meter-fill {
                    height: 100%;
                    width: 0%;
                    border-radius: 5px;
                    transition: all 0.3s ease;
                }
                
                .strength-text {
                    font-size: 12px;
                    text-align: right;
                }
            `;
            document.head.appendChild(strengthStyle);
            
            // Insert after password input
            passwordInput.parentNode.insertBefore(strengthMeter, passwordInput.nextSibling);
            
            // Update strength meter on input
            passwordInput.addEventListener('input', function() {
                const password = this.value;
                const fill = strengthMeter.querySelector('.strength-meter-fill');
                const text = strengthMeter.querySelector('.strength-text');
                
                // Calculate strength
                let strength = 0;
                
                if (password.length > 6) strength += 20;
                if (password.length > 10) strength += 10;
                if (/[A-Z]/.test(password)) strength += 20;
                if (/[0-9]/.test(password)) strength += 20;
                if (/[^A-Za-z0-9]/.test(password)) strength += 30;
                
                // Update UI
                fill.style.width = strength + '%';
                
                if (strength < 40) {
                    fill.style.backgroundColor = '#e74c3c';
                    text.textContent = 'Weak';
                    text.style.color = '#e74c3c';
                } else if (strength < 70) {
                    fill.style.backgroundColor = '#f39c12';
                    text.textContent = 'Moderate';
                    text.style.color = '#f39c12';
                } else {
                    fill.style.backgroundColor = '#2ecc71';
                    text.textContent = 'Strong';
                    text.style.color = '#2ecc71';
                }
            });
        }
    };
    
    // Initialize dynamic form elements
    createDynamicFormElements();
    
    // Add input field validation effects
    const addValidationEffects = () => {
        // Get all form controls
        const formControls = document.querySelectorAll('.form-control');
        
        formControls.forEach(control => {
            // Add validation icons
            const iconContainer = document.createElement('div');
            iconContainer.className = 'validation-icon';
            iconContainer.innerHTML = `
                <span class="valid-icon" style="display: none;">✓</span>
                <span class="invalid-icon" style="display: none;">✕</span>
            `;
            
            // Add styles
            const validationStyle = document.createElement('style');
            validationStyle.textContent = `
                .form-group {
                    position: relative;
                }
                
                .validation-icon {
                    position: absolute;
                    right: 15px;
                    top: 50%;
                    transform: translateY(-50%);
                    font-size: 16px;
                }
                
                .textarea-group .validation-icon {
                    top: 25px;
                }
                
                .valid-icon {
                    color: #2ecc71;
                }
                
                .invalid-icon {
                    color: #e74c3c;
                }
                
                .form-control.valid {
                    border-color: #2ecc71;
                }
                
                .form-control.invalid {
                    border-color: #e74c3c;
                }
            `;
            document.head.appendChild(validationStyle);
            
            // Get parent form group
            const formGroup = control.parentElement;
            formGroup.appendChild(iconContainer);
            
            // Add live validation
            control.addEventListener('input', function() {
                validateField(this);
            });
            
            control.addEventListener('blur', function() {
                validateField(this);
            });
        });
    };
    
    // Initialize validation effects
    addValidationEffects();
    
    // Add form field suggestions
    const addFieldSuggestions = () => {
        // Email suggestions
        if (emailInput) {
            // Email domains for suggestions
            const emailDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com'];
            
            // Create suggestions container
            const suggestionsContainer = document.createElement('div');
            suggestionsContainer.className = 'email-suggestions';
            suggestionsContainer.style.display = 'none';
            suggestionsContainer.style.position = 'absolute';
            suggestionsContainer.style.left = '0';
            suggestionsContainer.style.right = '0';
            suggestionsContainer.style.top = '100%';
            suggestionsContainer.style.backgroundColor = 'white';
            suggestionsContainer.style.border = '1px solid #e1e1e1';
            suggestionsContainer.style.borderTop = 'none';
            suggestionsContainer.style.borderRadius = '0 0 8px 8px';
            suggestionsContainer.style.zIndex = '100';
            
            // Add to parent
            emailInput.parentElement.style.position = 'relative';
            emailInput.parentElement.appendChild(suggestionsContainer);
            
            // Add input event listener
            emailInput.addEventListener('input', function() {
                const inputValue = this.value;
                
                // Check if input contains @ but is not a complete email
                if (inputValue.includes('@') && !inputValue.includes('.')) {
                    const username = inputValue.split('@')[0];
                    
                    // Clear container
                    suggestionsContainer.innerHTML = '';
                    
                    // Add suggestions
                    emailDomains.forEach(domain => {
                        const suggestion = document.createElement('div');
                        suggestion.className = 'email-suggestion';
                        suggestion.textContent = `${username}@${domain}`;
                        suggestion.style.padding = '10px 15px';
                        suggestion.style.borderBottom = '1px solid #e1e1e1';
                        suggestion.style.cursor = 'pointer';
                        
                        suggestion.addEventListener('click', function() {
                            emailInput.value = this.textContent;
                            suggestionsContainer.style.display = 'none';
                            validateField(emailInput);
                        });
                        
                        suggestionsContainer.appendChild(suggestion);
                    });
                    
                    // Show suggestions
                    suggestionsContainer.style.display = 'block';
                } else {
                    // Hide suggestions
                    suggestionsContainer.style.display = 'none';
                }
            });
            
            // Hide suggestions when clicking outside
            document.addEventListener('click', function(e) {
                if (!emailInput.contains(e.target) && !suggestionsContainer.contains(e.target)) {
                    suggestionsContainer.style.display = 'none';
                }
            });
        }
    };
    
    // Initialize field suggestions
    addFieldSuggestions();
    
    // Add event listeners for input fields
    function addInputListeners(input) {
        if (input) {
            // Validate on blur
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            // Reset error on focus
            input.addEventListener('focus', function() {
                resetFieldError(this);
            });
            
            // Live validation for email
            if (input.id === 'email') {
                input.addEventListener('input', function() {
                    if (this.value.length > 3) {
                        validateField(this);
                    }
                });
            }
        }
    }
    
    // Add listeners to all form fields
    if (nameInput) addInputListeners(nameInput);
    if (emailInput) addInputListeners(emailInput);
    if (subjectInput) addInputListeners(subjectInput);
    if (messageInput) addInputListeners(messageInput);
    
    // Form submission
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Reset previous validations
            resetValidation();
            
            // Validate inputs
            let isValid = true;
            
            if (nameInput && !validateName(nameInput.value)) {
                showError(nameInput, 'Nama tidak boleh kosong');
                isValid = false;
            }
            
            if (emailInput && !validateEmail(emailInput.value)) {
                showError(emailInput, 'Masukkan alamat email yang valid');
                isValid = false;
            }
            
            if (subjectInput && !validateSubject(subjectInput.value)) {
                showError(subjectInput, 'Subjek tidak boleh kosong');
                isValid = false;
            }
            
            if (messageInput && !validateMessage(messageInput.value)) {
                showError(messageInput, 'Pesan tidak boleh kosong');
                isValid = false;
            }
            
            // If form is valid, submit it (simulate submission)
            if (isValid) {
                submitForm();
            }
        });
    }
    
    // Validate individual field
    function validateField(field) {
        if (!field) return true;
        
        let isValid = true;
        
        if (field.id === 'name') {
            isValid = validateName(field.value);
            if (!isValid) {
                showError(field, 'Nama tidak boleh kosong');
            } else {
                showSuccess(field);
            }
        } else if (field.id === 'email') {
            isValid = validateEmail(field.value);
            if (!isValid) {
                showError(field, 'Masukkan alamat email yang valid');
            } else {
                showSuccess(field);
            }
        } else if (field.id === 'subject') {
            isValid = validateSubject(field.value);
            if (!isValid) {
                showError(field, 'Subjek tidak boleh kosong');
            } else {
                showSuccess(field);
            }
        } else if (field.id === 'message') {
            isValid = validateMessage(field.value);
            if (!isValid) {
                showError(field, 'Pesan tidak boleh kosong');
            } else {
                showSuccess(field);
            }
        } else if (field.id === 'phone') {
            isValid = validatePhone(field.value);
            if (!isValid) {
                showError(field, 'Masukkan nomor telepon yang valid');
            } else {
                showSuccess(field);
            }
        } else if (field.id === 'password') {
            isValid = validatePassword(field.value);
            if (!isValid) {
                showError(field, 'Password minimal 6 karakter');
            } else {
                showSuccess(field);
            }
        }
        
        return isValid;
    }

    // Validation functions
    function validateName(name) {
        return name.trim() !== '';
    }

    function validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    function validateSubject(subject) {
        return subject.trim() !== '';
    }

    function validateMessage(message) {
        return message.trim() !== '';
    }

    function validatePhone(phone) {
        // Simple validation for Indonesian phone numbers
        return phone.length >= 10 && /^(\+62|62|0)[0-9]{9,}$/.test(phone.replace(/[- ]/g, ''));
    }

    function validatePassword(password) {
        return password.length >= 6;
    }

    // Show error message
    function showError(input, message) {
        if (!input) return;
        
        const formGroup = input.parentElement;
        formGroup.classList.add('error');
        
        // Add invalid class to input
        input.classList.add('invalid');
        input.classList.remove('valid');
        
        // Show invalid icon
        const invalidIcon = formGroup.querySelector('.invalid-icon');
        const validIcon = formGroup.querySelector('.valid-icon');
        
        if (invalidIcon) invalidIcon.style.display = 'block';
        if (validIcon) validIcon.style.display = 'none';
        
        const errorElement = formGroup.querySelector('.error-message');
        
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }
    }
    
    // Show success state
    function showSuccess(input) {
        if (!input) return;
        
        const formGroup = input.parentElement;
        formGroup.classList.remove('error');
        
        // Add valid class to input
        input.classList.add('valid');
        input.classList.remove('invalid');
        
        // Show valid icon
        const invalidIcon = formGroup.querySelector('.invalid-icon');
        const validIcon = formGroup.querySelector('.valid-icon');
        
        if (invalidIcon) invalidIcon.style.display = 'none';
        if (validIcon) validIcon.style.display = 'block';
        
        const errorElement = formGroup.querySelector('.error-message');
        
        if (errorElement) {
            errorElement.style.display = 'none';
        }
    }
    
    // Reset field error
    function resetFieldError(input) {
        if (!input) return;
        
        const formGroup = input.parentElement;
        formGroup.classList.remove('error');
        
        // Remove validation classes
        input.classList.remove('invalid');
        
        // Hide icons
        const invalidIcon = formGroup.querySelector('.invalid-icon');
        const validIcon = formGroup.querySelector('.valid-icon');
        
        if (invalidIcon) invalidIcon.style.display = 'none';
        if (validIcon) validIcon.style.display = 'none';
        
        const errorElement = formGroup.querySelector('.error-message');
        
        if (errorElement) {
            errorElement.style.display = 'none';
        }
    }
    
    // Reset all validation
    function resetValidation() {
        if (!contactForm) return;
        
        const formGroups = contactForm.querySelectorAll('.form-group');
        formGroups.forEach(group => {
            group.classList.remove('error');
            
            const input = group.querySelector('.form-control');
            if (input) {
                input.classList.remove('valid', 'invalid');
            }
            
            const validIcon = group.querySelector('.valid-icon');
            const invalidIcon = group.querySelector('.invalid-icon');
            
            if (validIcon) validIcon.style.display = 'none';
            if (invalidIcon) invalidIcon.style.display = 'none';
            
            const errorElement = group.querySelector('.error-message');
            if (errorElement) {
                errorElement.style.display = 'none';
            }
        });
        
        if (successMessage) {
            successMessage.style.display = 'none';
        }
    }
    
    // Submit form (simulation)
    function submitForm() {
        // Create loading overlay
        const loadingOverlay = document.createElement('div');
        loadingOverlay.className = 'loading-overlay';
        loadingOverlay.innerHTML = '<div class="loading-spinner"></div><p>Sending your message...</p>';
        
        // Add styles
        const overlayStyle = document.createElement('style');
        overlayStyle.textContent = `
            .loading-overlay {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-color: rgba(0, 0, 0, 0.7);
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                z-index: 9999;
                color: white;
            }
            
            .loading-spinner {
                width: 40px;
                height: 40px;
                border: 3px solid rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                border-top-color: white;
                animation: spin 1s linear infinite;
                margin-bottom: 15px;
            }
            
            @keyframes spin {
                to {
                    transform: rotate(360deg);
                }
            }
        `;
        document.head.appendChild(overlayStyle);
        
        // Add to body
        document.body.appendChild(loadingOverlay);
        
        // Disable submit button
        if (submitBtn) {
            submitBtn.disabled = true;
        }
        
        // Simulate API call delay
        setTimeout(function() {
            // Remove loading overlay
            loadingOverlay.remove();
            
            // Show success message with animation
            if (successMessage) {
                successMessage.style.display = 'block';
                successMessage.style.opacity = '0';
                successMessage.style.transform = 'translateY(-20px)';
                
                // Trigger animation
                setTimeout(() => {
                    successMessage.style.opacity = '1';
                    successMessage.style.transform = 'translateY(0)';
                    successMessage.style.transition = 'all 0.5s ease';
                }, 10);
            }
            
            // Add confetti effect
            showConfetti();
            
            // Reset form
            contactForm.reset();
            
            // Reset validation states
            resetValidation();
            
            // Restore submit button
            if (submitBtn) {
                submitBtn.disabled = false;
            }
            
            // Scroll to success message
            if (successMessage) {
                successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            
            // Hide success message after 5 seconds
            setTimeout(function() {
                if (successMessage && successMessage.style.display === 'block') {
                    successMessage.style.opacity = '0';
                    successMessage.style.transform = 'translateY(-20px)';
                    
                    setTimeout(() => {
                        successMessage.style.display = 'none';
                    }, 500);
                }
            }, 5000);
        }, 2000);
    }
    
    // Confetti effect
    function showConfetti() {
        // Create confetti elements
        for (let i = 0; i < 100; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            
            // Random position, color and size
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight - 100;
            const size = Math.floor(Math.random() * 10) + 5;
            const color = `hsl(${Math.random() * 360}, 100%, 50%)`;
            
            confetti.style.left = x + 'px';
            confetti.style.top = y + 'px';
            confetti.style.width = size + 'px';
            confetti.style.height = size + 'px';
            confetti.style.backgroundColor = color;
            
            // Random rotation and animation duration
            const rotation = Math.random() * 360;
            const duration = Math.random() * 3 + 2;
            
            confetti.style.transform = `rotate(${rotation}deg)`;
            confetti.style.animationDuration = duration + 's';
            
            // Add to body
            document.body.appendChild(confetti);
            
            // Remove after animation
            setTimeout(() => {
                confetti.remove();
            }, duration * 1000);
        }
        
        // Add confetti styles
        const confettiStyle = document.createElement('style');
        confettiStyle.textContent = `
            .confetti {
                position: fixed;
                z-index: 9998;
                animation: fall linear forwards;
                opacity: 0;
            }
            
            @keyframes fall {
                to {
                    transform: translateY(100vh) rotate(360deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(confettiStyle);
    }
});
