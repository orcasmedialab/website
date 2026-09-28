// Runs in <head> before first paint. Motion is opt-in: only when JS runs and the
// visitor hasn't asked for reduced motion. If site.js never loads, the class is
// removed again so nothing stays hidden.
(function () {
    var root = document.documentElement;
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    root.classList.add('motion-ok');
    setTimeout(function () {
        if (!window.omlReady) root.classList.remove('motion-ok');
    }, 3000);
})();
