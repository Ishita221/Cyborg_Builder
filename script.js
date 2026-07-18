console.log("script loaded");

const buildbtn = document.getElementById("buildbtn");

buildbtn.addEventListener("click", function () {
  const checked = document.querySelectorAll("#qualities input:checked");

  const qualities = [];
  checked.forEach(function (box) {
    qualities.push(box.value);
  });



let headColor = "gray";
  let cyborgType = "Basic Unit";

  if (qualities.includes("brave") && qualities.includes("cold")) {
    headColor = "purple";
    cyborgType = "Warlord Frame";
  } else if (qualities.includes("brave")) {
    headColor = "red";
    cyborgType = "Assault Unit";
  } else if (qualities.includes("cold")) {
    headColor = "blue";
    cyborgType = "Sentinel Core";
  }
    const output = document.getElementById("output");
  output.textContent = "Selected: " + qualities.join(", ") + " → " + cyborgType;


  const cyborg = document.getElementById("cyborg");
  cyborg.innerHTML = `
    <svg width="200" height="200">
      <rect x="50" y="50" width="100" height="100" fill="${headColor}" />
      <circle cx="80" cy="90" r="10" fill="cyan" />
      <circle cx="120" cy="90" r="10" fill="cyan" />
    </svg>
  `;
});