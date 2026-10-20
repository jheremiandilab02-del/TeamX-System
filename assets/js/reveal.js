(() => {
    const revealTargets = document.querySelectorAll(
        'section[id] > .max-w-7xl > .text-center, .premium-card, .premium-step, .premium-quote'
    );

    if (!('IntersectionObserver' in window)) {
        return;
    }

    document.documentElement.classList.add('has-reveal');

    revealTargets.forEach((element, index) => {
        element.classList.add('reveal-on-scroll');
        element.style.setProperty('--reveal-delay', `${(index % 4) * 90}ms`);
    });

    const observer = new IntersectionObserver((entries, currentObserver) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                currentObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px',
    });

    revealTargets.forEach((element) => observer.observe(element));
})();
