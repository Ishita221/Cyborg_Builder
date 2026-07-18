console.log("script loaded");

const buildbtn = document.getElementById("buildbtn");

buildbtn.addEventListener("click", function () {
  const checked = document.querySelectorAll("#qualities input:checked");

  const qualities = [];
  checked.forEach(function (box) {
    qualities.push(box.value);
  });

  const output = document.getElementById("output");
  output.textContent = "Selected: " + qualities.join(", ");
});