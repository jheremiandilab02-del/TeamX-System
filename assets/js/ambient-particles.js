(() => {
    const canvas = document.getElementById('ambient-particles');
    const context = canvas?.getContext('2d');

    if (!canvas || !context) {
        return;
    }

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const glyphs = '01X<>/\\{}[]:;+=#';
    const streams = [];
    let width = 0;
    let height = 0;
    let animationFrame = 0;

    const random = (minimum, maximum) => Math.random() * (maximum - minimum) + minimum;

    const createStream = (x = random(0, width)) => ({
        x,
        y: random(-height, height),
        speed: random(0.7, 2.1),
        drift: random(-0.14, 0.14),
        fontSize: random(9, 14),
        length: Math.round(random(5, 12)),
        characters: [],
        color: Math.random() > 0.35 ? '98, 220, 255' : '22, 143, 255',
    });

    const resize = () => {
        const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = Math.round(width * pixelRatio);
        canvas.height = Math.round(height * pixelRatio);
        context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

        const streamCount = Math.max(18, Math.round(width / 24));
        streams.length = 0;

        for (let index = 0; index < streamCount; index += 1) {
            streams.push(createStream((index + Math.random()) * width / streamCount));
        }
    };

    const draw = () => {
        context.clearRect(0, 0, width, height);

        streams.forEach((stream) => {
            const lineHeight = stream.fontSize * 1.35;
            context.font = `${stream.fontSize}px "IBM Plex Mono", Consolas, monospace`;
            context.textAlign = 'center';

            for (let index = 0; index < stream.length; index += 1) {
                const y = stream.y - index * lineHeight;

                if (y < -lineHeight || y > height + lineHeight) {
                    continue;
                }

                if (!stream.characters[index] || Math.random() < 0.025) {
                    stream.characters[index] = glyphs[Math.floor(Math.random() * glyphs.length)];
                }

                const alpha = (1 - index / stream.length) * 0.34;
                context.fillStyle = `rgba(${stream.color}, ${alpha})`;

                if (index === 0) {
                    context.shadowColor = 'rgba(98, 245, 255, 0.75)';
                    context.shadowBlur = 8;
                }

                context.fillText(
                    stream.characters[index],
                    stream.x + Math.sin(stream.y * 0.008 + index) * 2,
                    y
                );
                context.shadowBlur = 0;
            }

            if (!reducedMotion.matches) {
                stream.y += stream.speed;
                stream.x += stream.drift;

                if (stream.y - stream.length * lineHeight > height || stream.x < 0 || stream.x > width) {
                    Object.assign(stream, createStream(random(0, width)), {
                        y: random(-height * 0.5, 0),
                    });
                }
            }
        });
    };

    const animate = () => {
        draw();

        if (!reducedMotion.matches && !document.hidden) {
            animationFrame = window.requestAnimationFrame(animate);
        }
    };

    const start = () => {
        window.cancelAnimationFrame(animationFrame);
        animate();
    };

    resize();
    start();
    window.addEventListener('resize', resize, { passive: true });
    document.addEventListener('visibilitychange', start);
    reducedMotion.addEventListener('change', start);
})();
