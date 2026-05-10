const landingScreen = document.getElementById("landingScreen");
const appShell = document.getElementById("appShell");
const enterButton = document.getElementById("enterButton");
const stage = document.querySelector(".stage");
const card = document.getElementById("fortuneCard");
const button = document.getElementById("fortuneButton");
const timelineText = document.getElementById("timelineText");
const causeText = document.getElementById("causeText");

const omens = [
  "a sudden",
  "a brutal",
  "a freak",
  "a grisly",
  "a tragic",
  "a nasty",
  "a terrifying",
  "a violent",
  "a horrifying",
  "a shockingly bad",
];

const threats = [
  "car crash",
  "house fire",
  "shark attack",
  "plane crash",
  "train wreck",
  "fall down a staircase",
  "boat accident",
  "gas explosion",
  "lightning strike",
  "elevator failure",
];

const settings = [
  "on a rainy night",
  "during a road trip",
  "while on vacation",
  "after ignoring a warning sign",
  "in front of way too many witnesses",
  "while trying to save time",
  "during an ordinary Tuesday",
  "after making one very bad decision",
  "while telling yourself it will be fine",
  "in the most embarrassing way possible",
];

function buildFates() {
  const fates = [];

  for (const omen of omens) {
    for (const threat of threats) {
      for (const setting of settings) {
        fates.push(`${omen} ${threat} ${setting}`);
      }
    }
  }

  return fates;
}

const grimFates = buildFates();

if (grimFates.length !== 1000) {
  throw new Error(`Expected 1000 grim fates, received ${grimFates.length}.`);
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function choose(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function buildTimeline(months) {
  if (months === 1) {
    return "The cards tremble: your end arrives in 1 month.";
  }

  return `The cards tremble: your end arrives in ${months} months.`;
}

function revealFortune() {
  const months = randomInt(1, 12);
  const fate = choose(grimFates);

  stage.classList.remove("is-casting");
  card.classList.remove("revealing");

  // Restart the reveal animations cleanly on each reading.
  void stage.offsetWidth;

  stage.classList.add("is-casting");

  timelineText.textContent = "The veil twists, the candles hiss, the future sharpens...";
  causeText.textContent = "The oracle is negotiating with exceptionally rude spirits.";

  window.setTimeout(() => {
    timelineText.textContent = buildTimeline(months);
    causeText.textContent = `The crystal ball insists it will be by ${fate}.`;
    card.classList.add("revealing");
  }, 780);

  window.setTimeout(() => {
    stage.classList.remove("is-casting");
  }, 1300);
}

function revealStage() {
  if (landingScreen.classList.contains("is-opening")) {
    return;
  }

  landingScreen.classList.add("is-opening");

  window.setTimeout(() => {
    appShell.classList.add("is-visible");
  }, 500);

  window.setTimeout(() => {
    landingScreen.classList.add("is-hidden");
  }, 1450);
}

enterButton.addEventListener("click", revealStage);
button.addEventListener("click", revealFortune);
