var observeDOM = (function () {
  var MutationObserver =
    window.MutationObserver || window.WebKitMutationObserver;

  return function (obj, callback) {
    if (!obj || obj.nodeType !== 1) return;

    if (MutationObserver) {
      var mutationObserver = new MutationObserver(callback);

      mutationObserver.observe(obj, { childList: true, subtree: true });
      return mutationObserver;
    }

    else if (window.addEventListener) {
      obj.addEventListener("DOMNodeInserted", callback, false);
      obj.addEventListener("DOMNodeRemoved", callback, false);
    }
  };
})();

runListener = () => {
  observeDOM(
    document.getElementById("header-toolbar-symbol-search"),
    (b, v) => {
      setSymbol();
    }
  );
};

startAuto = async () => {
  console.log("Starting");
  document.querySelector("#overlap-manager-root") &&
    document.querySelector("#overlap-manager-root").remove();

  let a = document.getElementById("header-toolbar-symbol-search");
  if (!a) {
    const interval = setInterval(() => {
      a = document.getElementById("header-toolbar-symbol-search");
      console.log(a);
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
