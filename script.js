document.addEventListener("DOMContentLoaded", () => {
    // Register GSAP ScrollTrigger
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
        
        // Splash Animation
        document.body.style.overflow = "hidden";
        
        const splashTl = gsap.timeline({
            onComplete: () => {
                document.body.style.overflow = "auto";
                gsap.set('.splash-screen', { display: 'none' });
                ScrollTrigger.refresh(); // Refresh scroll bounds after layout completes
            }
        });
        
        const restR = document.querySelector('.rest-r');
        const restP = document.querySelector('.rest-p');
        
        if (restR && restP) {
            gsap.set('.rest-of-word', { opacity: 1, width: "auto" });
            const rWidth = restR.offsetWidth;
            const pWidth = restP.offsetWidth;
            
            gsap.set('.rest-of-word', { width: 0, opacity: 0 });

            splashTl.from('.splash-logo', { y: 30, opacity: 0, duration: 1.2, ease: "expo.out" })
            .to('.rest-r', { width: rWidth, opacity: 1, duration: 1.2, ease: "expo.inOut" }, "+=0.2")
            .to('.rest-p', { width: pWidth, opacity: 1, duration: 1.2, ease: "expo.inOut" }, "<")
            .to('.splash-logo', { y: -20, opacity: 0, duration: 0.8, ease: "power3.inOut" }, "+=0.6")
            .to('.splash-screen', { yPercent: -100, duration: 1.2, ease: "expo.inOut" }, "-=0.1")
            .from(".hero-content > *", { y: 30, opacity: 0, duration: 1.2, stagger: 0.1, ease: "expo.out" }, "-=0.8")
            .from(".hero-script", { scale: 0.9, opacity: 0, duration: 1, ease: "power3.out" }, "-=1")
            .from(".navbar", { y: -30, opacity: 0, duration: 1.2, ease: "expo.out" }, "-=1.2");
        }

        // --- Scroll Blur & Fade out effect for Hero Background ---
        // This makes the image slowly blur, scale up slightly, and disappear as you scroll down
        gsap.to('.hero-bg', {
            scrollTrigger: {
                trigger: '.hero',
                start: 'top top',
                end: '80% top',
                scrub: true
            },
            filter: 'blur(20px)',
            opacity: 0,
            scale: 1.1,
            ease: 'none'
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});
