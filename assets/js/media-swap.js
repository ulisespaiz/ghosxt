// Deferred-stylesheet activation. Non-critical stylesheets (Google Fonts,
// icon fonts) ship as <link rel="stylesheet" media="print"> so they never
// block first render, then get flipped to media="all" once loaded. This used
// to be an inline onload="this.media='all'" attribute on every such link;
// inline event handlers cannot be allowed under a Content-Security-Policy
// without 'unsafe-inline', so the swap lives here instead. The <noscript>
// fallbacks next to each link cover the no-JS case.
(function () {
    document.querySelectorAll('link[rel="stylesheet"][media="print"]').forEach(function (link) {
        if (link.sheet) {
            link.media = 'all';
        } else {
            link.addEventListener('load', function () {
                link.media = 'all';
            }, { once: true });
        }
    });
})();
