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

    /* ---------- RainierRack feature tabs (brands page) ---------- */
    var tabs = Array.prototype.slice.call(document.querySelectorAll('.rr-tab'));
    var detail = document.getElementById('rr-detail');
    if (tabs.length && detail) {
        var detailTitle = detail.querySelector('[data-rr-title]');
        var detailBody = detail.querySelector('[data-rr-body]');
        var detailNum = detail.querySelector('[data-rr-num]');
        var countEl = document.querySelector('[data-rr-count]');

        var selectTab = function (i, focus) {
            tabs.forEach(function (t, n) {
                var on = n === i;
                t.setAttribute('aria-selected', String(on));
                t.tabIndex = on ? 0 : -1;
            });
            var tab = tabs[i];
            var num = String(i + 1).padStart(2, '0');
            detail.setAttribute('aria-labelledby', tab.id);
            detailTitle.textContent = tab.dataset.title;
            detailBody.textContent = tab.dataset.body;
            detailNum.textContent = num;
            if (countEl) countEl.textContent = num + ' / ' + String(tabs.length).padStart(2, '0');
            detail.classList.remove('is-swapping');
            void detail.offsetWidth;
            detail.classList.add('is-swapping');
            if (focus) tab.focus();
        };

        tabs.forEach(function (tab, i) {
            tab.addEventListener('click', function () { selectTab(i, false); });
            tab.addEventListener('keydown', function (e) {
                var next = null;
                if (e.key === 'ArrowDown' || e.key === 'ArrowRight') next = (i + 1) % tabs.length;
                if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') next = (i - 1 + tabs.length) % tabs.length;
                if (e.key === 'Home') next = 0;
                if (e.key === 'End') next = tabs.length - 1;
                if (next !== null) {
                    e.preventDefault();
                    selectTab(next, true);
                }
            });
        });
    }

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
