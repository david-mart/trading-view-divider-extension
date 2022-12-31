var observeDOM = (el, cb) => {
  var MutationObserver =
    window.MutationObserver || window.WebKitMutationObserver;

  if (!el || el.nodeType !== 1) return;

  if (MutationObserver) {
    obs1 = new MutationObserver(cb);

    const connect = () => {
      obs1.observe(el, { childList: true, subtree: true });
    };
    const disconnect = () => {
      obs1.disconnect();
    };
    return { connect, disconnect };
  } else if (window.addEventListener) {
    el.addEventListener("DOMNodeInserted", cb, false);
    el.addEventListener("DOMNodeRemoved", cb, false);
  }
};

runListener = () => {
  a = observeDOM(
    document.getElementById("header-toolbar-symbol-search"),
    () => {
      a.disconnect();
      setSymbol();
      setTimeout(() => {
        a.connect();
      }, 500);
    }
  );
  a.connect();
};

startAuto = async () => {
  console.log("Starting");
  document.querySelector("#overlap-manager-root") &&
    document.querySelector("#overlap-manager-root").remove();

  let a = document.getElementById("header-toolbar-symbol-search");
  if (!a) {
    const interval = setInterval(() => {
      a = document.getElementById("header-toolbar-symbol-search");
      if (a) {
        runListener();
        clearInterval(interval);
      }
    }, 100);
  } else {
    runListener();
  }
};

startAuto();
