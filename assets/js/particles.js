/*!
 * particles.js - Dynamic particle background animation
 * Custom implementation for portfolio website
 */

class ParticlesEffect {
    constructor(containerId = 'particles-js', options = {}) {
        // Default configuration
        this.config = {
            particleCount: options.particleCount || 50,
            particleColor: options.particleColor || '#3498db',
            lineColor: options.lineColor || '#3498db',
            particleRadius: options.particleRadius || 3,
            lineWidth: options.lineWidth || 1,
            lineDistance: options.lineDistance || 150,
            speed: options.speed || 1,
            directionX: options.directionX || 1,
            directionY: options.directionY || 1,
            responsive: options.responsive || [
                {
                    breakpoint: 768,
                    options: {
                        particleCount: 30
                    }
                },
                {
                    breakpoint: 480,
                    options: {
                        particleCount: 15
                    }
                }
            ]
        };

        // Canvas setup
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.container = document.getElementById(containerId);

        if (!this.container) {
            // Create container if it doesn't exist
            this.container = document.createElement('div');
            this.container.id = containerId;
            document.body.appendChild(this.container);
        }

        this.container.appendChild(this.canvas);
        this.container.style.position = 'absolute';
        this.container.style.top = '0';
        this.container.style.left = '0';
        this.container.style.width = '100%';
        this.container.style.height = '100%';
        this.container.style.zIndex = '0';
        this.container.style.pointerEvents = 'none';

        // Particles array
        this.particles = [];

        // Responsive handling
        this.breakpoints = this.config.responsive;
        this.currentBreakpoint = null;

        // Animation frame
        this.animationFrame = null;

        // Mouse position
        this.mouse = {
            x: null,
            y: null,
            radius: 100
        };

        // Initialize
        this.init();
        this.animate();

        // Window resize event
        window.addEventListener('resize', () => this.resize());

        // Mouse move event for interactive effect
        document.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });

        // Mouse leave event
        document.addEventListener('mouseleave', () => {
            this.mouse.x = null;
            this.mouse.y = null;
        });
    }

    // Initialize canvas and particles
    init() {
        // Set canvas size
        this.canvas.width = this.container.offsetWidth;
        this.canvas.height = this.container.offsetHeight;

        // Check responsive breakpoints
        this.checkResponsive();

        // Create particles
        this.createParticles();
    }

    // Create particles
    createParticles() {
        // Clear existing particles
        this.particles = [];

        // Create new particles based on current config
        for (let i = 0; i < this.config.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                radius: Math.random() * this.config.particleRadius + 1,
                speedX: Math.random() * this.config.speed * this.config.directionX,
                speedY: Math.random() * this.config.speed * this.config.directionY,
                opacity: Math.random() * 0.5 + 0.5
            });
        }
    }

    // Check responsive breakpoints and update config
    checkResponsive() {
        const width = window.innerWidth;
        let breakpoint = null;

        // Find the applicable breakpoint
        for (let i = 0; i < this.breakpoints.length; i++) {
            if (width <= this.breakpoints[i].breakpoint) {
                breakpoint = this.breakpoints[i];
            }
        }

        // If breakpoint changed, update configuration
        if (breakpoint !== this.currentBreakpoint) {
            this.currentBreakpoint = breakpoint;

            if (breakpoint) {
                // Apply breakpoint options
                Object.keys(breakpoint.options).forEach(key => {
                    this.config[key] = breakpoint.options[key];
                });
            }

            // Recreate particles with new config
            this.createParticles();
        }
    }

    // Handle window resize
    resize() {
        this.canvas.width = this.container.offsetWidth;
        this.canvas.height = this.container.offsetHeight;
        this.checkResponsive();
    }

    // Animation loop
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.updateParticles();
        this.drawParticles();
        this.connectParticles();
        this.animationFrame = requestAnimationFrame(() => this.animate());
    }

    // Update particle positions
    updateParticles() {
        for (let i = 0; i < this.particles.length; i++) {
            const particle = this.particles[i];

            // Update position based on speed
            particle.x += particle.speedX;
            particle.y += particle.speedY;

            // Bounce off edges
            if (particle.x + particle.radius > this.canvas.width || particle.x - particle.radius < 0) {
                particle.speedX = -particle.speedX;
            }
            
            if (particle.y + particle.radius > this.canvas.height || particle.y - particle.radius < 0) {
                particle.speedY = -particle.speedY;
            }

            // Mouse interaction
            if (this.mouse.x !== null && this.mouse.y !== null) {
                const dx = this.mouse.x - particle.x;
                const dy = this.mouse.y - particle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < this.mouse.radius) {
                    // Push particles away from mouse
                    const force = (this.mouse.radius - distance) / this.mouse.radius;
                    const directionX = dx / distance;
                    const directionY = dy / distance;
                    
                    particle.x -= directionX * force * 5;
                    particle.y -= directionY * force * 5;
                }
            }
        }
    }

    // Draw particles on canvas
    drawParticles() {
        for (let i = 0; i < this.particles.length; i++) {
            const particle = this.particles[i];
            
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = this.config.particleColor;
            this.ctx.globalAlpha = particle.opacity;
            this.ctx.fill();
            this.ctx.globalAlpha = 1;
        }
    }

    // Connect particles with lines
    connectParticles() {
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const particle1 = this.particles[i];
                const particle2 = this.particles[j];
                
                const dx = particle1.x - particle2.x;
                const dy = particle1.y - particle2.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < this.config.lineDistance) {
                    // Draw line with opacity based on distance
                    const opacity = 1 - (distance / this.config.lineDistance);
                    
                    this.ctx.beginPath();
                    this.ctx.strokeStyle = this.config.lineColor;
                    this.ctx.globalAlpha = opacity;
                    this.ctx.lineWidth = this.config.lineWidth;
                    this.ctx.moveTo(particle1.x, particle1.y);
                    this.ctx.lineTo(particle2.x, particle2.y);
                    this.ctx.stroke();
                    this.ctx.globalAlpha = 1;
                }
            }
        }
    }

    // Stop animation
    stop() {
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
            this.animationFrame = null;
        }
    }

    // Remove canvas and event listeners
    destroy() {
        this.stop();
        this.canvas.remove();
        window.removeEventListener('resize', this.resize);
        document.removeEventListener('mousemove', this.mousemove);
        document.removeEventListener('mouseleave', this.mouseleave);
    }

    // Change options dynamically
    updateOptions(options) {
        // Update configuration
        Object.keys(options).forEach(key => {
            if (key !== 'responsive') {
                this.config[key] = options[key];
            }
        });

        // Update responsive breakpoints if provided
        if (options.responsive) {
            this.config.responsive = options.responsive;
            this.breakpoints = options.responsive;
            this.checkResponsive();
        }

        // Recreate particles with new config
        this.createParticles();
    }
}

// Initialize particles on page load
document.addEventListener('DOMContentLoaded', function() {
    // Check if hero section exists
    const heroSection = document.querySelector('.hero');
    
    if (heroSection) {
        // Create particles container
        const particlesContainer = document.createElement('div');
        particlesContainer.id = 'particles-js';
        particlesContainer.style.position = 'absolute';
        particlesContainer.style.top = '0';
        particlesContainer.style.left = '0';
        particlesContainer.style.width = '100%';
        particlesContainer.style.height = '100%';
        particlesContainer.style.zIndex = '0';
        heroSection.style.position = 'relative';
        heroSection.insertBefore(particlesContainer, heroSection.firstChild);
        
        // Initialize particles
        const particles = new ParticlesEffect('particles-js', {
            particleCount: 80,
            particleColor: 'rgba(52, 152, 219, 0.7)',
            lineColor: 'rgba(52, 152, 219, 0.2)',
            particleRadius: 2,
            lineWidth: 1,
            lineDistance: 150,
            speed: 0.5
        });
    }
    
    // Add to other sections like contact, about, etc.
    const sections = document.querySelectorAll('.gallery-hero, .blog-hero, .contact-hero');
    
    sections.forEach((section, index) => {
        // Create unique container ID
        const containerId = `particles-section-${index}`;
        
        // Create particles container
        const particlesContainer = document.createElement('div');
        particlesContainer.id = containerId;
        particlesContainer.style.position = 'absolute';
        particlesContainer.style.top = '0';
        particlesContainer.style.left = '0';
        particlesContainer.style.width = '100%';
        particlesContainer.style.height = '100%';
        particlesContainer.style.zIndex = '0';
        section.style.position = 'relative';
        section.insertBefore(particlesContainer, section.firstChild);
        
        // Set different colors for different sections
        const colors = [
            {particle: 'rgba(155, 89, 182, 0.7)', line: 'rgba(155, 89, 182, 0.2)'}, // Purple
            {particle: 'rgba(46, 204, 113, 0.7)', line: 'rgba(46, 204, 113, 0.2)'}, // Green
            {particle: 'rgba(231, 76, 60, 0.7)', line: 'rgba(231, 76, 60, 0.2)'}    // Red
        ];
        
        const colorIndex = index % colors.length;
        
        // Initialize particles
        const particles = new ParticlesEffect(containerId, {
            particleCount: 60,
            particleColor: colors[colorIndex].particle,
            lineColor: colors[colorIndex].line,
            particleRadius: 2,
            lineWidth: 1,
            lineDistance: 120,
            speed: 0.4
        });
    });
});