hasMultipleCharts = () => {
  return !!document.querySelector(".chart-container.multiple");
};

// singlePath =
//   "M2.5 1C1.67 1 1 1.67 1 2.5v12c0 .83.67 1.5 1.5 1.5h14c.83 0 1.5-.67 1.5-1.5v-12c0-.83-.67-1.5-1.5-1.5h-14ZM0 2.5A2.5 2.5 0 0 1 2.5 0h14A2.5 2.5 0 0 1 19 2.5v12a2.5 2.5 0 0 1-2.5 2.5h-14A2.5 2.5 0 0 1 0 14.5v-12Z";

// ensureLayout = () => {
//   button = document.querySelector("#header-toolbar-layouts");
//   path = button.querySelector("svg").querySelector("path").getAttribute("d");
//   if (path !== singlePath) {
//     button.click();
//     setTimeout(() => {
//       document.querySelector('[data-name="single"]').click();
//     }, 100);
//   }
// };

