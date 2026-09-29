(function () {
    'use strict';

    window.omlReady = true;

    var root = document.documentElement;
    var motionOk = root.classList.contains('motion-ok');

    /* ---------- Header: solid background once scrolled ---------- */
    var header = document.querySelector('.site-header');
    function onScroll() {
        header.classList.toggle('is-scrolled', window.scrollY > 24);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    /* ---------- Mobile menu ---------- */
    var toggle = document.querySelector('.menu-toggle');
    var menu = document.getElementById('mobile-menu');

    function setMenu(open) {
        toggle.setAttribute('aria-expanded', String(open));
        header.classList.toggle('menu-open', open);
        menu.hidden = !open;
        document.body.style.overflow = open ? 'hidden' : '';
    }
    toggle.addEventListener('click', function () {
        setMenu(toggle.getAttribute('aria-expanded') !== 'true');
    });
    menu.addEventListener('click', function (e) {
        if (e.target.closest('a')) setMenu(false);
    });
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && !menu.hidden) {
            setMenu(false);
            toggle.focus();
        }
    });
    window.matchMedia('(min-width: 1025px)').addEventListener('change', function (mq) {
        if (mq.matches) setMenu(false);
    });

    /* ---------- Home hero entrance ---------- */
    var hero = document.querySelector('.hero');
    if (hero) {
        var heroImg = hero.querySelector('.hero-media img');
        var heroIn = function () { hero.classList.add('is-in'); };
        if (heroImg.complete) {
            requestAnimationFrame(heroIn);
        } else {
            heroImg.addEventListener('load', heroIn, { once: true });
            heroImg.addEventListener('error', heroIn, { once: true });
            setTimeout(heroIn, 1200);
        }
    }

    /* ---------- Scroll reveals ---------- */
    var revealEls = document.querySelectorAll('[data-reveal], [data-reveal-group]');
    if (motionOk && 'IntersectionObserver' in window) {
        var revealObs = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    revealObs.unobserve(entry.target);
                }
            });
        }, { rootMargin: '0px 0px -12% 0px', threshold: 0.08 });
        revealEls.forEach(function (el) { revealObs.observe(el); });
    } else {
        revealEls.forEach(function (el) { el.classList.add('is-visible'); });
    }

    /* ---------- Accordions: open the row a link points to (e.g. projects.html#workbench) ---------- */
    function openFromHash(jump) {
        if (!location.hash) return;
        var target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
        if (!target || target.tagName !== 'DETAILS') return;
        target.open = true;
        // On page load, land on the row; in-page link clicks already scroll there on their own
        if (jump) target.scrollIntoView({ block: 'start', behavior: 'instant' });
    }
    openFromHash(true);
    window.addEventListener('hashchange', function () { openFromHash(false); });

    /* ---------- Lightbox (projects page) ---------- */
    var lightbox = document.getElementById('lightbox');
    if (lightbox && typeof lightbox.showModal === 'function') {
        var lbImg = lightbox.querySelector('img');
        var lbCaption = lightbox.querySelector('.lightbox-caption');
        document.querySelectorAll('[data-lightbox]').forEach(function (btn) {
            btn.addEventListener('click', function () {
                var thumb = btn.querySelector('img');
                lbImg.src = btn.dataset.lightbox;
                lbImg.alt = thumb ? thumb.alt : '';
                lbCaption.textContent = btn.dataset.caption || '';
                lightbox.showModal();
            });
        });
        lightbox.querySelector('.lightbox-close').addEventListener('click', function () { lightbox.close(); });
        lightbox.addEventListener('click', function (e) {
            if (e.target === lightbox) lightbox.close();
        });
    }

    /* ---------- Footer year ---------- */
    var year = document.querySelector('[data-year]');
    if (year) year.textContent = new Date().getFullYear();
})();
