import './_tabs.scss';

// Polyfills
if (window.Element && !Element.prototype.closest) {
  Element.prototype.closest =
  function(s) {
    var matches = (this.document || this.ownerDocument).querySelectorAll(s),
      i,
      el = this;
    do {
      i = matches.length;
      while (--i >= 0 && matches.item(i) !== el) {};
    } while ((i < 0) && (el = el.parentElement));

    return el;
  };
}

if (!Array.prototype.forEach) {
	Array.prototype.forEach = function (callback, thisArg) {
		thisArg = thisArg || window;
		for (var i = 0; i < this.length; i++) {
			callback.call(thisArg, this[i], i, this);
		}
	};
}

if (window.NodeList && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = Array.prototype.forEach;
}

// Tabs Functionality
const tabs = document.querySelectorAll('[data-tabs-button]');
const panels = document.querySelectorAll('[data-tabs-panel]');

for (let i = 0; i < tabs.length; i++) {

  tabs[i].addEventListener('click', (e) => {
    const tabWrap = tabs[i].closest('[data-tabs-button-wrap]');
    const panel = panels[i];
    const panelSiblings = getSiblings(panel);
    let tabSiblings = getSiblings(tabWrap);

    tabs[i].setAttribute('aria-selected', 'true');
    tabs[i].setAttribute('tabindex', '0');
    panels[i].setAttribute('data-tabs-panel-active', 'true');
    panels[i].setAttribute('tabindex', '0');

    tabSiblings.forEach((sibling) => {
      sibling.querySelector('[data-tabs-button]').setAttribute('aria-selected', 'false');
      sibling.querySelector('[data-tabs-button]').setAttribute('tabindex', '-1');
    });

    panelSiblings.forEach((sibling) => {
      sibling.setAttribute('data-tabs-panel-active', 'false');
      sibling.setAttribute('tabindex', '-1');
    });
  });

  // Arrow key controls
  tabs[i].addEventListener('keydown', (e) => {

    if (e.keyCode === 37) {
      if (i === 0) {
        tabs[tabs.length - 1].focus();
      } else {
        tabs[i - 1].focus();
      }
    }

    if (e.keyCode === 39) {
      if (i === tabs.length - 1) {
        tabs[0].focus();
      } else {
        tabs[i + 1].focus();
      }
    }
  });
}

// This should probably be extracted into a more
// global set of helper functions for pure JS
// engineers down the road. - Greg S.
function getSiblings(element) {
  let siblings = [];
  let sibling = element.parentNode.firstChild;

  while (sibling) {
    if (sibling.nodeType === 1 && sibling !== element) {
			siblings.push(sibling);
    }
    sibling = sibling.nextSibling
  }

  return siblings;
};

if (tabs.length > 0) {
  tabs[0].click();
}
