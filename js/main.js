/* =========================================
    PAULIN ZEFI · Main JavaScript
   GSAP · ScrollTrigger · Three.js · Vanilla JS
   ========================================= */

(function() {
    'use strict';

    // ============ PRELOADER ============
    window.addEventListener('load', () => {
        setTimeout(() => {
            const preloader = document.getElementById('preloader');
            preloader.classList.add('hidden');
            setTimeout(() => preloader.style.display = 'none', 1000);

            // Avvia animazioni hero title
            document.querySelectorAll('.title-word').forEach(w => w.classList.add('animate'));

            initScrollAnimations();
        }, 1800);
    });

    // ============ NAVIGATION SCROLL ============
    const header = document.getElementById('main-header');
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    const backToTop = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        const sc = window.scrollY;
        header.classList.toggle('scrolled', sc > 50);
        backToTop.classList.toggle('visible', sc > 600);

        // Parallax sull'immagine hero
        const heroBg = document.querySelector('.hero-bg-image');
        if (heroBg && sc < window.innerHeight) {
            heroBg.style.transform = `scale(1.05) translateY(${sc * 0.4}px)`;
        }
    });

    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('open');
    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('open');
        });
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ============ THEME TOGGLE ============
    const themeToggle = document.getElementById('themeToggle');
    const savedTheme = localStorage.getItem('pz-theme') || 'dark';
    if (savedTheme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
        themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
    }
    themeToggle.addEventListener('click', () => {
        const isLight = document.documentElement.getAttribute('data-theme') === 'light';
        if (isLight) {
            document.documentElement.removeAttribute('data-theme');
            themeToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
            localStorage.setItem('pz-theme', 'dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
            localStorage.setItem('pz-theme', 'light');
        }
    });

    // ============ THREE.JS ATMOSPHERE - Particelle dorate ============
    function initAtmosphere() {
        const canvas = document.getElementById('atmosphereCanvas');
        if (!canvas || typeof THREE === 'undefined') return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        // Particelle dorate (scintille / cenere luminosa)
        const particleCount = 250;
        const positions = new Float32Array(particleCount * 3);
        const velocities = [];
        const sizes = new Float32Array(particleCount);

        for (let i = 0; i < particleCount; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 60;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 40;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 30;

            velocities.push({
                x: (Math.random() - 0.5) * 0.015,
                y: Math.random() * 0.02 + 0.005,
                z: (Math.random() - 0.5) * 0.01
            });

            sizes[i] = Math.random() * 0.3 + 0.05;
        }

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

        // Crea texture circolare per particelle morbide
        const canvasTex = document.createElement('canvas');
        canvasTex.width = 64; canvasTex.height = 64;
        const ctx = canvasTex.getContext('2d');
        const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
        gradient.addColorStop(0, 'rgba(244,210,122,1)');
        gradient.addColorStop(0.4, 'rgba(184,134,11,0.6)');
        gradient.addColorStop(1, 'rgba(184,134,11,0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 64, 64);
        const texture = new THREE.CanvasTexture(canvasTex);

        const material = new THREE.PointsMaterial({
            size: 0.4,
            map: texture,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
            sizeAttenuation: true
        });

        const particles = new THREE.Points(geometry, material);
        scene.add(particles);

        camera.position.z = 18;

        let mouseX = 0, mouseY = 0;
        window.addEventListener('mousemove', (e) => {
            mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
            mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
        });

        function animate() {
            const pos = geometry.attributes.position.array;
            for (let i = 0; i < particleCount; i++) {
                pos[i * 3] += velocities[i].x;
                pos[i * 3 + 1] += velocities[i].y;
                pos[i * 3 + 2] += velocities[i].z;

                // Reset quando esce
                if (pos[i * 3 + 1] > 20) {
                    pos[i * 3] = (Math.random() - 0.5) * 60;
                    pos[i * 3 + 1] = -20;
                }
                if (pos[i * 3] > 30) pos[i * 3] = -30;
                if (pos[i * 3] < -30) pos[i * 3] = 30;
            }
            geometry.attributes.position.needsUpdate = true;

            // Leggero parallax con mouse
            camera.position.x += (mouseX * 1.5 - camera.position.x) * 0.03;
            camera.position.y += (-mouseY * 1.5 - camera.position.y) * 0.03;
            camera.lookAt(scene.position);

            renderer.render(scene, camera);
            requestAnimationFrame(animate);
        }
        animate();

        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });
    }

    initAtmosphere();

    // ============ AUDIO AMBIENT TOGGLE ============
    const audioToggle = document.getElementById('audioToggle');
    let audioCtx = null;
    let audioNodes = [];
    let audioPlaying = false;

    audioToggle.addEventListener('click', () => {
        if (!audioPlaying) {
            startAmbientMusic();
            audioToggle.classList.add('playing');
            audioToggle.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
        } else {
            stopAmbientMusic();
            audioToggle.classList.remove('playing');
            audioToggle.innerHTML = '<i class="fa-solid fa-music"></i>';
        }
        audioPlaying = !audioPlaying;
    });

    function startAmbientMusic() {
        // Genera drone armonico medievale tramite Web Audio API
        try {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            const masterGain = audioCtx.createGain();
            masterGain.gain.value = 0.12;
            masterGain.connect(audioCtx.destination);

            // Drone con armoniche (D minor mood - tipico medievale)
            const frequencies = [73.42, 110.00, 146.83, 220.00]; // D2, A2, D3, A3
            frequencies.forEach((freq, i) => {
                const osc = audioCtx.createOscillator();
                const gain = audioCtx.createGain();
                osc.type = i % 2 === 0 ? 'sine' : 'triangle';
                osc.frequency.value = freq;
                gain.gain.value = 0;
                gain.gain.linearRampToValueAtTime(0.25 / (i + 1), audioCtx.currentTime + 2);

                // LFO leggero per movimento
                const lfo = audioCtx.createOscillator();
                const lfoGain = audioCtx.createGain();
                lfo.frequency.value = 0.1 + i * 0.05;
                lfoGain.gain.value = 0.5;
                lfo.connect(lfoGain);
                lfoGain.connect(osc.frequency);
                lfo.start();

                osc.connect(gain);
                gain.connect(masterGain);
                osc.start();
                audioNodes.push(osc, gain, lfo, lfoGain);
            });
            audioNodes.push(masterGain);
        } catch(e) {
            console.warn('Audio non disponibile', e);
        }
    }

    function stopAmbientMusic() {
        if (audioCtx) {
            audioNodes.forEach(n => {
                try { if (n.stop) n.stop(); } catch(e) {}
                try { n.disconnect(); } catch(e) {}
            });
            audioNodes = [];
            audioCtx.close();
            audioCtx = null;
        }
    }

    // ============ COUNTER ANIMATION ============
    function animateCounters() {
        document.querySelectorAll('.stat-number').forEach(el => {
            const target = parseInt(el.dataset.target);
            const duration = 2000;
            const start = performance.now();
            function step(now) {
                const progress = Math.min((now - start) / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3);
                el.textContent = Math.floor(target * eased);
                if (progress < 1) requestAnimationFrame(step);
            }
            requestAnimationFrame(step);
        });
    }

    // ============ REVEAL ON SCROLL ============
    function initScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    if (entry.target.classList.contains('bio-stats')) {
                        animateCounters();
                    }
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

        document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => observer.observe(el));

        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        const bioStats = document.querySelector('.bio-stats');
        if (bioStats) statsObserver.observe(bioStats);

        // GSAP ScrollTrigger animations
        if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
            gsap.registerPlugin(ScrollTrigger);

            // Parallax background Lezha
            gsap.to('.lezha-bg-layer', {
                backgroundPosition: '50% 30%',
                ease: 'none',
                scrollTrigger: {
                    trigger: '.lezha-section',
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true
                }
            });

            // Story cards stagger
            gsap.utils.toArray('.story-card').forEach((card, i) => {
                gsap.from(card, {
                    y: 60,
                    opacity: 0,
                    duration: 1,
                    delay: (i % 3) * 0.15,
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 85%',
                        toggleActions: 'play none none none'
                    }
                });
            });

            // Timeline draw line
            const tl = document.querySelector('.timeline-line');
            if (tl) {
                gsap.from(tl, {
                    scaleY: 0,
                    transformOrigin: 'top center',
                    ease: 'none',
                    scrollTrigger: {
                        trigger: '.timeline',
                        start: 'top 70%',
                        end: 'bottom 80%',
                        scrub: 1
                    }
                });
            }

            // Section titles parallax
            gsap.utils.toArray('.section-title').forEach(title => {
                gsap.from(title, {
                    y: 40,
                    opacity: 0,
                    duration: 1.2,
                    scrollTrigger: {
                        trigger: title,
                        start: 'top 90%'
                    }
                });
            });
        }
    }

    // ============ GALLERIA STORICA ============
    const galleryItems = [
        {
            title: 'Il Castello di Lezha',
            desc: 'La fortezza che domina la valle del Drin',
            image: 'https://images.unsplash.com/photo-1564399579883-451a5d44ec08?auto=format&fit=crop&w=1400&q=80',
            class: 'wide'
        },
        {
            title: 'Manoscritto Medievale',
            desc: 'Documenti storici del XV secolo',
            image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=900&q=80',
            class: ''
        },
        {
            title: 'Antica Mappa Albanese',
            desc: 'Cartografia veneziana del territorio',
            image: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=900&q=80',
            class: 'tall'
        },
        {
            title: 'Mura di Pietra',
            desc: 'Dettaglio delle fortificazioni medievali',
            image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&w=900&q=80',
            class: ''
        },
        {
            title: 'Spada e Armatura',
            desc: 'Reperti dell\'epoca di Skanderbeg',
            image: 'https://images.unsplash.com/photo-1599582909646-2d80d18d2fb5?auto=format&fit=crop&w=900&q=80',
            class: ''
        },
        {
            title: 'Cattedrale di San Nicola',
            desc: 'Luogo della Lega di Alessio e tomba di Skanderbeg',
            image: 'https://images.unsplash.com/photo-1548407260-da850faa41e3?auto=format&fit=crop&w=1400&q=80',
            class: 'wide'
        },
        {
            title: 'Bandiera Albanese',
            desc: 'L\'aquila bicipite, simbolo della nazione',
            image: 'https://images.unsplash.com/photo-1604079628040-94301bb21b91?auto=format&fit=crop&w=900&q=80',
            class: ''
        },
        {
            title: 'Pergamena Antica',
            desc: 'Documento della cancelleria veneziana',
            image: 'https://images.unsplash.com/photo-1532153975070-2e9ab71f1b14?auto=format&fit=crop&w=900&q=80',
            class: ''
        },
        {
            title: 'Panorama di Lezha',
            desc: 'La città vista dal castello al tramonto',
            image: 'https://images.unsplash.com/photo-1591375372226-1a78c6c8b389?auto=format&fit=crop&w=900&q=80',
            class: ''
        }
    ];

    function renderGallery() {
        const grid = document.getElementById('galleryGrid');
        if (!grid) return;

        grid.innerHTML = galleryItems.map((item, i) => `
            <div class="gallery-item reveal ${item.class}" data-index="${i}">
                <div class="gallery-image" style="background-image: url('${item.image}')"></div>
                <div class="gallery-overlay">
                    <div class="gallery-overlay-content">
                        <h4>${item.title}</h4>
                        <p>${item.desc}</p>
                    </div>
                </div>
                <div class="gallery-zoom"><i class="fa-solid fa-expand"></i></div>
            </div>
        `).join('');

        grid.querySelectorAll('.gallery-item').forEach(item => {
            item.addEventListener('click', () => openLightbox(parseInt(item.dataset.index)));
        });

        // Re-observe new reveal elements
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        grid.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    }

    // ============ LIGHTBOX ============
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxTitle = document.getElementById('lightboxTitle');
    const lightboxDesc = document.getElementById('lightboxDesc');
    let currentLightboxIndex = 0;

    function openLightbox(index) {
        currentLightboxIndex = index;
        updateLightbox();
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function updateLightbox() {
        const item = galleryItems[currentLightboxIndex];
        lightboxImage.style.backgroundImage = `url('${item.image}')`;
        lightboxTitle.textContent = item.title;
        lightboxDesc.textContent = item.desc;
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    document.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
    document.querySelector('.lightbox-prev').addEventListener('click', () => {
        currentLightboxIndex = (currentLightboxIndex - 1 + galleryItems.length) % galleryItems.length;
        updateLightbox();
    });
    document.querySelector('.lightbox-next').addEventListener('click', () => {
        currentLightboxIndex = (currentLightboxIndex + 1) % galleryItems.length;
        updateLightbox();
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') document.querySelector('.lightbox-prev').click();
        if (e.key === 'ArrowRight') document.querySelector('.lightbox-next').click();
    });

    renderGallery();

    // ============ PUBBLICAZIONI ============
    const pubIcons = {
        libro: 'fa-book',
        articolo: 'fa-newspaper',
        ricerca: 'fa-magnifying-glass',
        documento: 'fa-file-lines'
    };

    async function loadPublications() {
        const grid = document.getElementById('publicationsGrid');
        if (!grid) return;

        try {
            const response = await fetch('tables/publications?limit=100');
            const result = await response.json();
            const publications = result.data || [];

            if (publications.length === 0) {
                grid.innerHTML = '<p style="text-align:center;color:var(--color-text-dim);grid-column:1/-1">Nessuna pubblicazione disponibile.</p>';
                return;
            }

            renderPublications(publications);
            initPubFilters(publications);
        } catch(e) {
            console.error('Errore caricamento pubblicazioni', e);
            grid.innerHTML = '<p style="text-align:center;color:var(--color-text-dim);grid-column:1/-1">Impossibile caricare le pubblicazioni.</p>';
        }
    }

    function renderPublications(pubs) {
        const grid = document.getElementById('publicationsGrid');
        grid.innerHTML = pubs.map(p => `
            <article class="pub-card reveal" data-type="${p.tipo}">
                <div class="pub-cover">
                    <i class="fa-solid ${pubIcons[p.tipo] || 'fa-book'} pub-cover-icon"></i>
                </div>
                <div class="pub-content">
                    <span class="pub-type">${p.tipo}</span>
                    <h3 class="pub-title">${p.titolo}</h3>
                    <p class="pub-year">Anno ${p.anno}</p>
                    <p class="pub-desc">${p.descrizione}</p>
                    <a href="${p.link_pdf || '#'}" class="pub-link" ${p.link_pdf && p.link_pdf !== '#' ? 'target="_blank"' : ''}>
                        <span>Leggi / Scarica</span>
                        <i class="fa-solid fa-arrow-right"></i>
                    </a>
                </div>
            </article>
        `).join('');

        const obs = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        grid.querySelectorAll('.reveal').forEach(el => obs.observe(el));
    }

    function initPubFilters(allPubs) {
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const filter = btn.dataset.filter;
                const filtered = filter === 'all' ? allPubs : allPubs.filter(p => p.tipo === filter);
                renderPublications(filtered);
            });
        });
    }

    loadPublications();

    // ============ CONTACT FORM ============
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = contactForm.querySelector('.form-submit');
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span>Invio in corso...</span><i class="fa-solid fa-spinner fa-spin"></i>';

        const data = {
            id: 'msg-' + Date.now(),
            nome: document.getElementById('nome').value.trim(),
            email: document.getElementById('email').value.trim(),
            oggetto: document.getElementById('oggetto').value.trim(),
            messaggio: document.getElementById('messaggio').value.trim(),
            data_invio: new Date().toISOString()
        };

        try {
            const response = await fetch('tables/contact_messages', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            if (response.ok || response.status === 201) {
                formStatus.textContent = '✦ Messaggio inviato con successo. Grazie per averci scritto. ✦';
                formStatus.className = 'form-status show success';
                contactForm.reset();
            } else {
                throw new Error('Errore server');
            }
        } catch(err) {
            formStatus.textContent = '⚠ Si è verificato un errore. Riprova più tardi.';
            formStatus.className = 'form-status show error';
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<span>Invia messaggio</span><i class="fa-solid fa-paper-plane"></i>';
            setTimeout(() => formStatus.classList.remove('show'), 6000);
        }
    });

    // ============ CURRENT YEAR ============
    document.getElementById('currentYear').textContent = new Date().getFullYear();

    // ============ SMOOTH SCROLL ANCHORS ============
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                e.preventDefault();
                const offset = 80;
                const pos = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top: pos, behavior: 'smooth' });
            }
        });
    });

    // ============ CURSOR GLOW EFFECT (desktop only) ============
    if (window.matchMedia('(hover: hover)').matches && window.innerWidth > 1024) {
        const glow = document.createElement('div');
        glow.className = 'cursor-glow';
        glow.style.cssText = `
            position: fixed;
            width: 400px;
            height: 400px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(184,134,11,0.08) 0%, transparent 60%);
            pointer-events: none;
            z-index: 2;
            transform: translate(-50%, -50%);
            transition: opacity 0.3s;
            mix-blend-mode: screen;
        `;
        document.body.appendChild(glow);

        document.addEventListener('mousemove', (e) => {
            glow.style.left = e.clientX + 'px';
            glow.style.top = e.clientY + 'px';
        });
    }

})();
