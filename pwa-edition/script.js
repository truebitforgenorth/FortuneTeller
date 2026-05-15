const splashScreen = document.getElementById("splashScreen");
const landingScreen = document.getElementById("landingScreen");
const appShell = document.getElementById("appShell");
const enterButton = document.getElementById("enterButton");
const installPanel = document.getElementById("installPanel");
const installButton = document.getElementById("installButton");
const stage = document.querySelector(".stage");
const card = document.getElementById("fortuneCard");
const button = document.getElementById("fortuneButton");
const timelineText = document.getElementById("timelineText");
const causeText = document.getElementById("causeText");
let deferredInstallPrompt = null;

const prophecyStyles = [
  {
    intro: "The crystal ball flashes and shows me",
    ending: "And as it happens,",
  },
  {
    intro: "The cards split open and reveal",
    ending: "In that final humiliating moment,",
  },
  {
    intro: "The smoke clears and I witness",
    ending: "Just before darkness takes you,",
  },
  {
    intro: "The candlelight shakes and exposes",
    ending: "To make it worse,",
  },
  {
    intro: "The veil parts and I clearly see",
    ending: "As fate finishes the job,",
  },
  {
    intro: "The oracle groans and warns me about",
    ending: "And right there in public,",
  },
  {
    intro: "The spirits stop laughing long enough to show me",
    ending: "Then, with cruel timing,",
  },
  {
    intro: "The future slaps me across the face with",
    ending: "And because destiny has jokes,",
  },
  {
    intro: "The moon itself points toward",
    ending: "While your dignity bleeds out,",
  },
  {
    intro: "The glass trembles and delivers a vision of",
    ending: "And for one final insult,",
  },
];

const scenarios = [
  "you being stabbed in the street",
  "a vending machine tipping onto you",
  "you slipping off a yacht you absolutely could not afford",
  "you getting flattened by a runaway ice cream truck",
  "a bear attack at the worst picnic of your life",
  "you falling through a weak hotel balcony",
  "an exploding gender reveal taking you out instantly",
  "a cursed carnival ride finally snapping under you",
  "you choking in a fancy restaurant while everyone pretends not to stare",
  "you being launched from an e-scooter straight into traffic",
];

const settings = [
  "under a flickering streetlight",
  "in front of way too many witnesses",
  "while your phone is at 2 percent",
  "on the one day you almost stayed home",
  "while trying to save five stupid minutes",
  "during what should have been a normal Tuesday",
  "just after you say, \"what could go wrong?\"",
  "with horrible timing and even worse luck",
  "while the universe is openly laughing at you",
  "in the most embarrassing way physically possible",
];

const lastWords = [
  "a stranger leans in and whispers, \"Your father never loved you!\"",
  "someone nearby mutters, \"This is exactly why nobody trusts your judgment.\"",
  "the last voice you hear says, \"You really dressed for this and still died ugly.\"",
  "a witness gasps, \"This is somehow less tragic than your dating history.\"",
  "somebody filming the whole thing says, \"Your group chat will never stop talking about this.\"",
  "the nearest idiot blurts out, \"You ignored every warning sign like it was a personality trait.\"",
  "an old woman points at you and says, \"Even your horoscope tried to save you.\"",
  "the worst person imaginable sneers, \"This is why nobody lets you make the plan.\"",
  "a complete stranger shakes their head and says, \"You really made all the wrong choices at full confidence.\"",
  "someone in the crowd whispers, \"This is going to ruin brunch for everybody.\"",
];

function buildFates() {
  const fates = [];

  for (const prophecyStyle of prophecyStyles) {
    for (const scenario of scenarios) {
      for (const lastWordsLine of lastWords) {
        fates.push({
          prophecyStyle,
          scenario,
          lastWordsLine,
        });
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
    return "The cards tremble: You will die in 1 Month!";
  }

  return `The cards tremble: You will die in ${months} Months!`;
}

function revealFortune() {
  const months = randomInt(1, 12);
  const fate = choose(grimFates);
  const setting = choose(settings);

  stage.classList.remove("is-casting");
  card.classList.remove("revealing");

  // Restart the reveal animations cleanly on each reading.
  void stage.offsetWidth;

  stage.classList.add("is-casting");

  timelineText.textContent = "The veil twists, the candles hiss, the future sharpens...";
  causeText.textContent = "The oracle is negotiating with exceptionally rude spirits.";

  window.setTimeout(() => {
    timelineText.textContent = buildTimeline(months);
    causeText.textContent = `${fate.prophecyStyle.intro} ${fate.scenario} ${setting}. ${fate.prophecyStyle.ending} ${fate.lastWordsLine}`;
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

function hideSplashScreen() {
  splashScreen.classList.add("is-hidden");
  document.body.classList.remove("app-booting");
}

function showInstallPanel() {
  if (window.matchMedia("(display-mode: standalone)").matches) {
    return;
  }

  installPanel.hidden = false;
}

function hideInstallPanel() {
  installPanel.hidden = true;
}

window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  deferredInstallPrompt = event;
  showInstallPanel();
});

installButton.addEventListener("click", async () => {
  if (!deferredInstallPrompt) {
    return;
  }

  deferredInstallPrompt.prompt();
  const { outcome } = await deferredInstallPrompt.userChoice;
  deferredInstallPrompt = null;

  if (outcome === "accepted") {
    hideInstallPanel();
  }
});

window.addEventListener("appinstalled", () => {
  deferredInstallPrompt = null;
  hideInstallPanel();
});

window.addEventListener("load", () => {
  window.setTimeout(hideSplashScreen, 900);
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch((error) => {
      console.error("Service worker registration failed:", error);
    });
  });
}
