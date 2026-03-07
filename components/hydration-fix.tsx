"use client"

/**
 * Removes attributes injected by browser extensions (e.g. fdprocessedid from form fillers,
 * cz-shortcut-listen from ColorZilla) before React hydrates to prevent hydration mismatch.
 */
const EXTENSION_ATTRS = ["fdprocessedid", "cz-shortcut-listen"]

const scriptContent = `
(function() {
  var attrs = ${JSON.stringify(EXTENSION_ATTRS)};
  function removeFrom(el) {
    if (!el || el.nodeType !== 1) return;
    attrs.forEach(function(a) { el.removeAttribute(a); });
    for (var i = 0; i < el.children.length; i++) removeFrom(el.children[i]);
  }
  function run() {
    removeFrom(document.documentElement);
  }
  run();
  var obs = new MutationObserver(function(mutations) {
    mutations.forEach(function(m) {
      if (m.type === "attributes" && attrs.indexOf(m.attributeName) >= 0) {
        m.target.removeAttribute(m.attributeName);
      }
    });
  });
  obs.observe(document.documentElement, {
    attributes: true,
    attributeFilter: attrs,
    subtree: true
  });
  var count = 0;
  var id = setInterval(function() {
    run();
    if (++count >= 60) clearInterval(id);
  }, 50);
})();
`

export function HydrationFix() {
  return (
    <script
      id="hydration-fix"
      dangerouslySetInnerHTML={{ __html: scriptContent }}
    />
  )
}
