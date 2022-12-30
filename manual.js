// document.querySelector('#overlap-manager-root').remove();
getSymbols = async () => {
  symbol = window.localStorage.getItem(
    "tradingview.editchart.model.symbol"
  );
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
  if (symbol.includes(symbol_one) || symbol.includes(symbol_two)) return;
  let new_symbol = symbol_one + symbol_operator + symbol_two;
  new_symbol = new_symbol.replace("{{SYMBOL}}", symbol);
  return new_symbol;
};

setSymbol = async () => {
  s = await getSymbols();
  if (!s) return;
  document.getElementById("header-toolbar-symbol-search").click();
  setTimeout(async () => {
    document.activeElement.value = s;
    const ke = new KeyboardEvent("keydown", {
      bubbles: true,
      cancelable: true,
      keyCode: 13,
    });
    document.activeElement.dispatchEvent(ke);
  });
};

setSymbol();
