document.addEventListener('DOMContentLoaded', () => {
    // Dynamic Year
    document.getElementById('year').textContent = new Date().getFullYear();

    // Hamburger Menu
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav-links li a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Sticky Navbar transparency effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.8)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Vibe Coding Easter Egg
    console.log("%c VIBE CODING ACTIVATED ", "color: #00f0ff; background: #0a0a0a; font-size: 20px; padding: 10px; border: 2px solid #7000ff; border-radius: 5px;");
});

// Modal Logic
const modal = document.getElementById("thankYouModal");
const closeModalBtn = document.getElementById("closeModalBtn");
const closeSpan = document.querySelector(".close-modal");

function showThankYouModal() {
    modal.style.display = "block";
}

function hideModal() {
    modal.style.display = "none";
}

if (closeModalBtn) {
    closeModalBtn.addEventListener('click', hideModal);
}

if (closeSpan) {
    closeSpan.addEventListener('click', hideModal);
}

window.onclick = function (event) {
    if (event.target == modal) {
        hideModal();
    }
}

// Sound Effect for Profile Photo
const profilePhoto = document.querySelector('.image-container');
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function playHoverSound() {
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(440, audioCtx.currentTime); // A4
    oscillator.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.1); // Slide up to A5

    gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 0.1);
}

if (profilePhoto) {
    profilePhoto.addEventListener('mouseenter', playHoverSound);
}

// Typing Sound Effect for Contact Form
const contactFormInputs = document.querySelectorAll('.contact-form input, .contact-form textarea');

function playTypingSound() {
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator.type = 'triangle'; // Clicky sound
    oscillator.frequency.setValueAtTime(800, audioCtx.currentTime);

    // Quick decay for a "click"
    gainNode.gain.setValueAtTime(0.05, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.05);

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 0.05);
}

contactFormInputs.forEach(input => {
    input.addEventListener('input', playTypingSound);
});

// Master Animation Loop
document.addEventListener('DOMContentLoaded', () => {
    const typingText = document.querySelector('.typing-text');
    const heroVisuals = document.querySelectorAll('.hero-content > *');

    if (!typingText) return;

    const words = ["Flutter Developer & Vibe Coder", "UI/UX Designer", "Flutter Animator"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeLoopCount = 0;
    const maxLoops = 1; // Run typewriter cycle 1 time

    function restartHeroAnimations() {
        heroVisuals.forEach(el => {
            const originalAnimation = el.style.animation;
            el.style.animation = 'none';
            el.offsetHeight; // Trigger reflow
            el.style.animation = originalAnimation;
        });
    }

    function type() {
        const currentWord = words[wordIndex];
        let displayText;

        if (isDeleting) {
            // Remove last character
            displayText = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            // Add next character
            displayText = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        // Re-apply styling for special characters on the partial text
        if (wordIndex === 0) {
            displayText = displayText.replace('&', '<span style="color: var(--secondary-color); opacity: 0.8;">&</span>');
        } else if (wordIndex === 1) {
            displayText = displayText.replace('/', '<span style="color: var(--secondary-color); opacity: 0.8;">/</span>');
        }

        typingText.innerHTML = displayText;

        let typeSpeed = isDeleting ? 50 : 100;

        if (!isDeleting && charIndex === currentWord.length) {
            // Word complete

            // Check if it's the last word
            if (wordIndex === words.length - 1) {
                typeLoopCount++;

                // If completed max loops, pause and trigger hero animation
                if (typeLoopCount >= maxLoops) {
                    setTimeout(() => {
                        triggerHeroSequence();
                    }, 2000); // Wait 2 seconds before hero animation
                    return; // Stop typing (and deletion) for now
                }
            }

            isDeleting = true;
            typeSpeed = 2000;
        } else if (isDeleting && charIndex === 0) {
            // Word deleted
            isDeleting = false;
            wordIndex++;
            typeSpeed = 500;

            // Safety check if we somehow exceeded bounds (though handled above)
            if (wordIndex >= words.length) {
                wordIndex = 0;
            }
        }

        setTimeout(type, typeSpeed);
    }

    function triggerHeroSequence() {
        typingText.textContent = ''; // Clear text immediately so it doesn't show during fade-in
        restartHeroAnimations();

        // Wait for Hero animation to complete (approx 1.5s) then restart typewriter
        setTimeout(() => {
            // Reset Typewriter variables
            wordIndex = 0;
            charIndex = 0;
            isDeleting = false;
            typeLoopCount = 0;
            type(); // Start typing again
        }, 1500);
    }

    // Start initial typing
    type();
});
