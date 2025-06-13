    // Animate typing effect for hero title
    function typeText(target, text, delay = 0) {
    target.innerHTML = '';
    text.split('').forEach((char, i) => {
        setTimeout(() => {
        target.innerHTML += char;
        }, i * 75 + delay);
    });
    }

    const heroTitle = document.getElementById('hero-title');
    typeText(heroTitle, "Rage, rage against the dying of the light", 0);

    // Add flicker effect after typing done
    setTimeout(() => {
    heroTitle.classList.add('flicker');
    }, 1500);

    // Scroll-triggered animation for project cards
    const projectCards = document.querySelectorAll('.project-card');
    const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
        anime({
            targets: entry.target,
            opacity: [0, 1],
            translateY: [30, 0],
            duration: 1000,
            easing: 'easeOutExpo'
        });
        observer.unobserve(entry.target);
        }
    });
    }, {
    threshold: 0.3
    });

    projectCards.forEach(card => {
    card.style.opacity = 0;
    observer.observe(card);
    });
    // SVG stroke draw animation
    anime({
    targets: '#logo-draw path',
    strokeDashoffset: [anime.setDashoffset, 0],
    easing: 'easeInOutSine',
    duration: 1500,
    delay: 1000
    });

    // Parallax effect on hero section
    document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 30;
    const y = (e.clientY / window.innerHeight - 0.5) * 30;
    document.querySelector('#hero').style.transform = `translate(${x}px, ${y}px)`;
    });
    window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        const boot = document.getElementById('boot-console');
        if (boot) {
        boot.style.transition = 'opacity 1s ease';
        boot.style.opacity = '0';
        setTimeout(() => boot.remove(), 1000);
        }
    }, 2000);
    });

    // Particle Background
    function initParticles() {
    const canvas = document.getElementById('particles-bg');
    const ctx = canvas.getContext('2d');
    let particles = [];

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    function createParticles(count) {
        particles = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5 + 0.5,
        dx: (Math.random() - 0.5) * 0.5,
        dy: (Math.random() - 0.5) * 0.5
        }));
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'rgba(0,255,255,0.3)';
        for (let p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
        }
        requestAnimationFrame(draw);
    }

    resize();
    createParticles(100);
    draw();
    window.addEventListener('resize', () => {
        resize();
        createParticles(100);
    });
    }
    initParticles();

    function matrixRain() {
    const canvas = document.getElementById('matrix-rain');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const letters = "アァイィウエオカサタナハマヤラワ0123456789";
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array.from({ length: columns }, () => 1);

    let lastTime = 0;
    const interval = 100; // ms between frame updates (lower = faster)

    function draw(timestamp) {
        if (timestamp - lastTime < interval) {
        requestAnimationFrame(draw);
        return;
        }
        lastTime = timestamp;

        ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#00FFCC";
        ctx.font = `${fontSize}px monospace`;

        drops.forEach((y, i) => {
        const text = letters.charAt(Math.floor(Math.random() * letters.length));
        ctx.fillText(text, i * fontSize, y * fontSize);

        if (y * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
        });

        requestAnimationFrame(draw);
    }

    requestAnimationFrame(draw);
    }

matrixRain();
