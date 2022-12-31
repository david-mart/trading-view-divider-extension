const default_values = {
  symbol_one: "{{SYMBOL}}",
  symbol_operator: "/",
  symbol_two: "AMEX:SPY",
  auto: false,
  multiple: false,
  left: true,
  right: false,
};

function restore_options() {
  chrome.storage.sync.get(default_values, function (items) {
    document.getElementById("symbol_one").value = items.symbol_one;
    document.getElementById("symbol_operator").value = items.symbol_operator;
    document.getElementById("symbol_two").value = items.symbol_two;
    document.getElementById("auto").checked = items.auto;
    document.getElementById("multiple").checked = items.multiple;
    document.getElementById("left").checked = items.left;
    document.getElementById("right").checked = items.right;
  });
}

function set_options() {
  chrome.storage.sync.set({
    symbol_one: document.getElementById("symbol_one").value,
    symbol_operator: document.getElementById("symbol_operator").value,
    symbol_two: document.getElementById("symbol_two").value,
    auto: document.getElementById("auto").checked,
    multiple: document.getElementById("multiple").checked,
    left: document.getElementById("left").checked,
    right: document.getElementById("right").checked,
  });
}

function reset_options() {
  chrome.storage.sync.set(default_values, function () {
    restore_options();
  });
}

document.addEventListener("DOMContentLoaded", restore_options);

document.getElementById("reset").addEventListener("click", reset_options);
document.getElementById("save").addEventListener("click", set_options);
