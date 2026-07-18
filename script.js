console.log("script loaded");

const traits = {
  brave:       { r: 120, g: 0,   b: 0,   effect: "Frame glows red" },
  cold:        { r: 0,   g: 0,   b: 120, effect: "Frame glows blue" },
  calm:        { r: 0,   g: 80,  b: 80,  effect: "Teal frame tone" },
  logical:     { r: 0,   g: 100, b: 0,   effect: "Square sensor eyes" },
  creative:    { r: 90,  g: 0,   b: 60,  effect: "Violet frame tint" },
  intelligent: { r: 0,   g: 90,  b: 90,  effect: "Third eye added" },
  combat:      { r: 100, g: 20,  b: 0,   effect: "Shoulder spikes" },
  medic:       { r: 90,  g: 90,  b: 0,   effect: "Medical cross" },
  hacker:      { r: 0,   g: 120, b: 20,  effect: "Antenna uplink" },
  heavy:       { r: 40,  g: 40,  b: 40,  effect: "Bulkier frame" },
  agile:       { r: 0,   g: 60,  b: 90,  effect: "Slimmer frame" },
  stealth:     { r: 30,  g: 0,   b: 40,  effect: "Dark violet shell" }
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

  let bodyWidth = 100;
  if (qualities.includes("heavy")) bodyWidth = 130;
  if (qualities.includes("agile")) bodyWidth = 70;
  const bodyX = 100 - bodyWidth / 2;

  let extraParts = "";

  if (qualities.includes("medic")) {
    extraParts += `
      <rect x="95" y="65" width="10" height="30" fill="red" />
      <rect x="85" y="75" width="30" height="10" fill="red" />
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

  let eyes = `
    <circle cx="80" cy="90" r="10" fill="cyan" />
    <circle cx="120" cy="90" r="10" fill="cyan" />
  `;

  if (qualities.includes("logical")) {
    eyes = `
      <rect x="72" y="82" width="16" height="16" fill="cyan" />
      <rect x="112" y="82" width="16" height="16" fill="cyan" />
    `;
  }

  if (qualities.includes("intelligent")) {
    eyes += `
      <circle cx="100" cy="70" r="7" fill="magenta" />
    `;
  }

  const output = document.getElementById("output");
  output.textContent = "Selected: " + qualities.join(", ");

  const legend = document.getElementById("legend");
  let rows = "";
  qualities.forEach(function (q) {
    rows += `
      <div class="legend-row">
        <span class="q">${q}</span>
        <span class="fx">${traits[q].effect}</span>
      </div>
    `;
  });
  legend.innerHTML = rows;

  const cyborg = document.getElementById("cyborg");
  cyborg.innerHTML = `
    <svg width="240" height="360">

      <defs>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g fill="none" stroke="${headColor}" stroke-width="3" filter="url(#glow)">
        <rect x="${bodyX}" y="20" width="${bodyWidth}" height="80" />
        <rect x="70" y="110" width="100" height="110" />
        <rect x="40" y="115" width="22" height="90" />
        <rect x="178" y="115" width="22" height="90" />
        <rect x="85" y="230" width="28" height="90" />
        <rect x="127" y="230" width="28" height="90" />
      </g>

      <g filter="url(#glow)">
        ${eyes}
        ${extraParts}
      </g>

    </svg>
  `;
});

const polishBtn = document.getElementById("polishBtn");
polishBtn.addEventListener("click", async function () {
  const checked = document.querySelectorAll("#qualities input:checked");
  const qualities = [];
  checked.forEach(function (box) {
    qualities.push(box.value);
  });

  const prompt =
    "a realistic futuristic humanoid cyborg robot, " +
    qualities.join(", ") +
    ", detailed, cinematic lighting, sci-fi";

  const aiResult = document.getElementById("aiResult");
  aiResult.textContent = "Generating... (thoda ruk, AI bana raha hai)";

  try {
    const response = await fetch("/api/generate?prompt=" + encodeURIComponent(prompt));
    const data = await response.json();

    if (data.image) {
      aiResult.innerHTML = `<img src="${data.image}" width="240" />`;
    } else {
      aiResult.textContent = "Failed. Dubara try kar.";
    }
  } catch (err) {
    aiResult.textContent = "Error: " + err.message;
  }
});

