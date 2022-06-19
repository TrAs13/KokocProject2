(function () {
  const selectSingle = document.querySelectorAll(".select");

  selectSingle.forEach(function (item, i) {
    let selectSingle_title = item.querySelector(".select__title");
    let selectSingle_labels = item.querySelectorAll(".select__label");

    // Toggle menu
    selectSingle_title.addEventListener("click", () => {
      if ("active" === item.getAttribute("data-state")) {
        item.setAttribute("data-state", "");
      } else {
        selectSingle.forEach(function (item2, i) {
          item2.setAttribute("data-state", "");
        });
        item.setAttribute("data-state", "active");
      }
    });

    for (let i = 0; i < selectSingle_labels.length; i++) {
      selectSingle_labels[i].addEventListener("click", (evt) => {
        selectSingle_title.textContent = evt.target.textContent;
        item.setAttribute("data-state", "");
      });
    }
  });

  // Close when click to option
})();
