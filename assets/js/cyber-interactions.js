(() => {
    const followTargets = document.querySelectorAll(
        '.about-card, .premium-card, .premium-step, .premium-quote, .testimonial-note, .about-cta, .premium-form, .premium-button, .premium-secondary, .site-links a, .nav-cta, .hero-aside > a'
    );

    followTargets.forEach((target) => {
        const light = document.createElement('span');
        light.className = 'cyber-follow-light';
        light.setAttribute('aria-hidden', 'true');
        target.classList.add('cyber-follow-target');
        target.insertBefore(light, target.firstChild);

        target.addEventListener('pointermove', (event) => {
            if (event.pointerType === 'touch') {
                return;
            }

            const bounds = target.getBoundingClientRect();
            target.style.setProperty('--pointer-x', `${event.clientX - bounds.left}px`);
            target.style.setProperty('--pointer-y', `${event.clientY - bounds.top}px`);
        });
    });

    const navigationLinks = document.querySelectorAll(
        '.site-links a[href^="#"], a.nav-cta[href^="#"], .hero-aside > a[href^="#"]'
    );
    let navigationId = 0;
    let pendingCleanup;

    navigationLinks.forEach((link) => {
        link.addEventListener('click', (event) => {
            if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
                return;
            }

            const targetId = link.getAttribute('href').slice(1);
            const target = document.getElementById(targetId);

            if (!target) {
                return;
            }

            const currentId = ++navigationId;
            window.clearTimeout(pendingCleanup);
            document.querySelectorAll('.section-arrive').forEach((section) => {
                section.classList.remove('section-arrive');
            });

            let idleTimer;
            let fallbackTimer;
            let maxTimer;
            let hasScrolled = false;

            const cleanup = () => {
                window.clearTimeout(idleTimer);
                window.clearTimeout(fallbackTimer);
                window.clearTimeout(maxTimer);
                window.removeEventListener('scroll', handleScroll);
                window.removeEventListener('scrollend', finish);
            };

            const finish = () => {
                if (currentId !== navigationId) {
                    cleanup();
                    return;
                }

                cleanup();
                target.classList.remove('section-arrive');
                void target.offsetWidth;
                target.classList.add('section-arrive');
                pendingCleanup = window.setTimeout(() => {
                    target.classList.remove('section-arrive');
                }, 900);
            };

            const handleScroll = () => {
                hasScrolled = true;
                window.clearTimeout(idleTimer);
                idleTimer = window.setTimeout(finish, 140);
            };

            window.addEventListener('scroll', handleScroll, { passive: true });
            window.addEventListener('scrollend', finish, { once: true });

            fallbackTimer = window.setTimeout(() => {
                if (!hasScrolled) {
                    finish();
                }
            }, 220);
            maxTimer = window.setTimeout(finish, 2400);
        });
    });
})();
