// document.querySelector('#overlap-manager-root').remove();
getSymbols = async () => {
  symbol = window.localStorage.getItem("tradingview.editchart.model.symbol");
  if (!symbol) {
    const search = document.getElementById("header-toolbar-symbol-search");
    if (!!search.childNodes[1]) {
      symbol = search.childNodes[1].textContent;
    }
    if (!symbol) return;
    market = document.querySelector('[data-name="details-exchange"]');
    if (market) {
      symbol = market.textContent + ":" + symbol;
    }
  }
  if (!symbol) return;
  const { symbol_one, symbol_two, symbol_operator } =
    await chrome.storage.sync.get({
      symbol_one: "{{SYMBOL}}",
      symbol_two: "AMEX:SPY",
      symbol_operator: "/",
    });
  if (symbol.includes(symbol_operator)) return;
  let new_symbol = symbol_one + symbol_operator + symbol_two;
  new_symbol = new_symbol.replace("{{SYMBOL}}", symbol);
  return { new_symbol, symbol };
};

searchAndTapSymbol = (snb) => {
  document.getElementById("header-toolbar-symbol-search").click();
  setTimeout(async () => {
    document.activeElement.value = snb;
    const ke = new KeyboardEvent("keydown", {
      bubbles: true,
      cancelable: true,
      keyCode: 13,
    });
    document.activeElement.dispatchEvent(ke);
  });
};

waitForSwitch = () =>
  new Promise(async (res) => {
    const { symbol_operator } = await chrome.storage.sync.get({
      symbol_operator: "/",
    });
    const title = document.getElementById("header-toolbar-symbol-search");
    const int = setInterval(() => {
      if (title.textContent.includes(symbol_operator)) {
        clearInterval(int);
        res();
      }
    }, 50);
  });

setSymbol = async () => {
  const { new_symbol, symbol } = await getSymbols();
  if (!new_symbol) return;
  const { multiple, left, right, op } = await chrome.storage.sync.get({
    multiple: false,
    left: true,
    right: false,
  });
  if (multiple && hasMultipleCharts()) {
    charts = document.querySelectorAll(".chart-container.multiple");
    const chart_for_replace = charts[left ? 0 : 1];
    const other_chart = charts[left ? 1 : 0];
    if (chart_for_replace.classList.contains("inactive")) {
      chart_for_replace.querySelector("canvas").click();
      searchAndTapSymbol(new_symbol);
    } else {
      searchAndTapSymbol(new_symbol);
      await waitForSwitch();
      other_chart.querySelector("canvas").click();
      searchAndTapSymbol(symbol);
    }
  } else {
    searchAndTapSymbol(new_symbol);
  }
};
