function createAnimation(container) {
    const element = document.createElement('div');
    element.className = 'creature';
    container.appendChild(element);

    TweenLite.set(element, {
        x: -30,
        y: 300,
    });

    // bezier magic provided by GSAP BezierPlugin (included with TweenMax)
    // http://api.greensock.com/js/com/greensock/plugins/BezierPlugin.html

    // create a semi-random tween
    const bezTween = new TweenMax(element, 6, {
        bezier: {
            type: 'soft',
            values: [{
                x: 60,
                y: 80,
            }, {
                x: 150,
                y: 30,
            }, {
                x: 400 + Math.random() * 100,
                y: 320 * Math.random() + 50,
            }, {
                x: 500,
                y: 320 * Math.random() + 50,
            }, {
                x: 700,
                y: 100,
            }, {
                x: 850,
                y: 500,
            }],
            autoRotate: true,
        },
        ease: Linear.easeNon,
    });

    return bezTween;
}

// create a bunch of Bezier tweens and add them to a timeline
export function buildTimeline(container) {
    const tl = new TimelineMax({
        repeat: 300,
        // onUpdate: updateSlider,
        delay: 1,
    });

    for (let i = 0; i < 20; i++) {
        // start creature animation every 0.17 seconds
        tl.add(createAnimation(container), i * 0.17);
    }

    return tl;
}

// const container = document.getElementById('container');
// const tl = buildTimeline();
// tl.pause();
// tl.progress(ui.value);
// tl.progress()
// tl.resume();
// TweenLite.to(tl, 2, { timeScale: 0 });
// TweenLite.to(tl, 2, { timeScale: 1 });
// tl.progress(0.5).timeScale(0);
