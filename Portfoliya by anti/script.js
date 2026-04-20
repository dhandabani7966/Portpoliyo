/**
 * Dhandabani M - Portfolio Script
 * Futuristic AI Theme
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // ---------- 0. Mouse Cursor Glow Tracking ----------
    const cursorGlow = document.getElementById('cursor-glow');
    if (cursorGlow) {
        document.addEventListener('mousemove', (e) => {
            cursorGlow.style.left = e.clientX + 'px';
            cursorGlow.style.top = e.clientY + 'px';
        });
        
        // Hide glow when cursor leaves viewport
        document.addEventListener('mouseleave', () => {
            cursorGlow.style.opacity = '0';
        });
        
        document.addEventListener('mouseenter', () => {
            cursorGlow.style.opacity = '1';
        });
    }

    // ---------- 1. Typing Animation (Hero Section) ----------
    const roles = ["AI & ML Student", "Frontend Developer", "UI Designer", "Tech Enthusiast"];
    const typeSpeed = 100;
    const backSpeed = 50;
    const delayBetweenRoles = 2000;
    
    const typeElement = document.getElementById('typed-text');
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function typeEffect() {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            typeElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typeElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let typeTick = isDeleting ? backSpeed : typeSpeed;
        
        // Randomize typing speed slightly for realism
        if (!isDeleting) {
            typeTick += Math.random() * 50;
        }
        
        if (!isDeleting && charIndex === currentRole.length) {
            typeTick = delayBetweenRoles;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typeTick = 500;
        }
        
        setTimeout(typeEffect, typeTick);
    }
    
    // Start typing effect
    if (typeElement) setTimeout(typeEffect, 1000);

    // ---------- 2. Navigation & Mobile Menu ----------
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.getElementById('nav-links');
    const navOverlay = document.getElementById('nav-overlay');
    
    // Scroll effect for navbar
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Toggle mobile menu
    function toggleMenu() {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
        navOverlay.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    }
    
    if (navToggle) {
        navToggle.addEventListener('click', toggleMenu);
    }
    
    if (navOverlay) {
        navOverlay.addEventListener('click', toggleMenu);
    }
    
    // Close menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    // ---------- 3. Scroll Reveal Animation (Intersection Observer) ----------
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-scale');
    
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Add specific logic for Goals to trigger underline
                if(entry.target.classList.contains('goal-item')) {
                    entry.target.classList.add('visible');
                }

                // If it's a skill card, trigger the progress bars
                if (entry.target.classList.contains('skill-card') || entry.target.closest('.skills-grid')) {
                    const bars = entry.target.querySelectorAll('.skill-bar-fill');
                    bars.forEach(bar => {
                        bar.style.width = bar.getAttribute('data-width');
                    });
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);
    
    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // Handle standalone skill bars if they exist outside cards
    const standaloneBars = document.querySelectorAll('.skill-bar-fill');
    const barObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.width = entry.target.getAttribute('data-width');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    standaloneBars.forEach(bar => {
         // only observe if not already handled by parent card
        if(!bar.closest('.skill-card')) {
            barObserver.observe(bar);
        }
    });

    // ---------- 4. Vanilla Tilt Initialization ----------
    // Using vanilla-tilt.js loaded from CDN in HTML
    if (typeof VanillaTilt !== 'undefined') {
        VanillaTilt.init(document.querySelectorAll(".project-card"), {
            max: 5,
            speed: 400,
            glare: true,
            "max-glare": 0.1,
            scale: 1.02
        });
    }

    // ---------- 5. Neural Network Canvas Animation ----------
    const canvas = document.getElementById('particles-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width, height;
        let nodes = [];
        
        const colors = ['#00F5FF', '#7B2FFF'];
        
        function resize() {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            initNodes();
        }
        
        window.addEventListener('resize', resize);
        
        class Node {
            constructor() {
                this.reset();
            }
            
            reset() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.radius = Math.random() * 2 + 1;
                this.color = colors[Math.floor(Math.random() * colors.length)];
            }
            
            update() {
                this.x += this.vx;
                this.y += this.vy;
                
                if (this.x < 0 || this.x > width) this.vx *= -1;
                if (this.y < 0 || this.y > height) this.vy *= -1;
            }
            
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.shadowBlur = 10;
                ctx.shadowColor = this.color;
                ctx.fill();
                ctx.shadowBlur = 0;
            }
        }
        
        function initNodes() {
            nodes = [];
            const count = Math.floor((width * height) / 15000); // Reasonable density
            for (let i = 0; i < count; i++) {
                nodes.push(new Node());
            }
        }
        
        function drawLines() {
            const maxDistance = 150;
            for (let i = 0; i < nodes.length; i++) {
                for (let j = i + 1; j < nodes.length; j++) {
                    const dx = nodes[i].x - nodes[j].x;
                    const dy = nodes[i].y - nodes[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < maxDistance) {
                        ctx.beginPath();
                        ctx.moveTo(nodes[i].x, nodes[i].y);
                        ctx.lineTo(nodes[j].x, nodes[j].y);
                        
                        // Opacity based on distance
                        const alpha = 1 - (distance / maxDistance);
                        ctx.strokeStyle = `rgba(123, 47, 255, ${alpha * 0.2})`;
                        ctx.lineWidth = 1;
                        ctx.stroke();
                    }
                }
            }
        }
        
        function animate() {
            ctx.clearRect(0, 0, width, height);
            
            // Background is maintained by CSS, here we just clear the canvas
            
            for (let node of nodes) {
                node.update();
                node.draw();
            }
            
            drawLines();
            requestAnimationFrame(animate);
        }
        
        resize();
        animate();
    }

    // ---------- 6. Smooth Scrolling for Anchor Links & Rocket Fly ----------
    const flyRocket = document.getElementById('fly-rocket');
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                const startPosition = window.pageYOffset;
                const distance = offsetPosition - startPosition;
                
                // Set rocket direction
                if(flyRocket) {
                    if (distance > 0) {
                        flyRocket.className = 'fly-rocket downward';
                    } else {
                        flyRocket.className = 'fly-rocket upward';
                    }
                    flyRocket.style.opacity = '1';
                }
                
                // Close mobile menu if open
                const navLinks = document.getElementById('nav-links');
                const overlay = document.getElementById('nav-overlay');
                const toggle = document.getElementById('nav-toggle');
                if (navLinks && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    overlay.classList.remove('active');
                    toggle.classList.remove('active');
                }
                
                // Custom scrolling engine for the rocket effect
                let start = null;
                const duration = Math.min(Math.max(Math.abs(distance) / 1.5, 1000), 1800); // Snappier flight: Between 1s and 1.8s
                
                window.requestAnimationFrame(function step(timestamp) {
                    if (!start) start = timestamp;
                    const progress = timestamp - start;
                    const percentage = Math.min(progress / duration, 1);
                    
                    // Ease-in-out function
                    const ease = percentage < 0.5 ? 2 * percentage * percentage : -1 + (4 - 2 * percentage) * percentage;
                    
                    if (flyRocket) {
                        if (distance > 0) {
                            // Scrolling down: Fly from near top to near bottom
                            flyRocket.style.top = (15 + ease * 70) + '%';
                        } else {
                            // Scrolling up: Fly from near bottom to near top
                            flyRocket.style.top = (85 - ease * 70) + '%';
                        }
                    }

                    window.scrollTo(0, startPosition + distance * ease);
                    
                    if (progress < duration) {
                        window.requestAnimationFrame(step);
                    } else {
                        // Animation complete, hide rocket
                        if(flyRocket) {
                            flyRocket.style.opacity = '0';
                        }
                    }
                });
            }
        });
    });

    // Form Submission Prevention (Frontend Demo only)
    const contactForm = document.getElementById('contact-form');
    if(contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button');
            const originalText = btn.innerHTML;
            
            btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
            btn.style.background = '#00F5FF';
            btn.style.color = '#1A0B2E';
            btn.style.boxShadow = '0 0 20px rgba(0, 245, 255, 0.4)';
            
            contactForm.reset();
            
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style = '';
            }, 3000);
        });
    }

    // ---------- 7. Timeline Rocket Scroll Tracking ----------
    const timeline = document.getElementById('experience-timeline');
    const rocket = document.getElementById('timeline-rocket');
    
    if (timeline && rocket) {
        window.addEventListener('scroll', () => {
            const rect = timeline.getBoundingClientRect();
            const viewHeight = window.innerHeight;
            
            // Calculate rocket progress
            const start = viewHeight / 2;
            const scrollDistance = start - rect.top;
            
            let progress = scrollDistance / rect.height;
            progress = Math.min(Math.max(progress, 0), 1);
            
            rocket.style.top = (progress * 100) + '%';
        });
    }
});

