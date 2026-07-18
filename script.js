console.log("script loaded");

const traits = {
  brave:       { r: 120, g: 0,   b: 0   },
  cold:        { r: 0,   g: 0,   b: 120 },
  calm:        { r: 0,   g: 80,  b: 80  },
  logical:     { r: 0,   g: 100, b: 0   },
  creative:    { r: 90,  g: 0,   b: 60  },
  intelligent: { r: 0,   g: 90,  b: 90  },
  combat:      { r: 100, g: 20,  b: 0   },
  medic:       { r: 90,  g: 90,  b: 0   },
  hacker:      { r: 0,   g: 120, b: 20  },
  heavy:       { r: 40,  g: 40,  b: 40  },
  agile:       { r: 0,   g: 60,  b: 90  },
  stealth:     { r: 30,  g: 0,   b: 40  }
};

const buildbtn = document.getElementById("buildbtn");

buildbtn.addEventListener("click", function () {
  const checked = document.querySelectorAll("#qualities input:checked");

  const qualities = [];
  checked.forEach(function (box) {
    qualities.push(box.value);
  });

  let r = 60, g = 60, b = 60;
  qualities.forEach(function (q) {
    r += traits[q].r;
    g += traits[q].g;
    b += traits[q].b;
  });
  const headColor = `rgb(${r}, ${g}, ${b})`;
  let extraParts = "";

  if (qualities.includes("medic")) {
    extraParts += `
      <rect x="95" y="65" width="10" height="30" fill="white" />
      <rect x="85" y="75" width="30" height="10" fill="white" />
    `;
  }

  if (qualities.includes("combat")) {
    extraParts += `
      <polygon points="50,50 40,30 60,50" fill="silver" />
      <polygon points="150,50 160,30 140,50" fill="silver" />
    `;
  }

  if (qualities.includes("hacker")) {
    extraParts += `
      <line x1="100" y1="50" x2="100" y2="25" stroke="lime" stroke-width="3" />
      <circle cx="100" cy="22" r="5" fill="lime" />
    `;
  }

  const output = document.getElementById("output");
  output.textContent = "Selected: " + qualities.join(", ");

  const cyborg = document.getElementById("cyborg");
  cyborg.innerHTML = `
    <svg width="200" height="200">
      <rect x="50" y="50" width="100" height="100" fill="${headColor}" />
      <circle cx="80" cy="90" r="10" fill="cyan" />
      <circle cx="120" cy="90" r="10" fill="cyan" />
      ${extraParts}
    </svg>
  `;
});