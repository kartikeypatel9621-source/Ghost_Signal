const settingSelect = document.getElementById("setting");
const clueInput = document.getElementById("clue");
const generateBtn = document.getElementById("generateBtn");
const storyOutput = document.getElementById("storyOutput");
const outputTitle = document.getElementById("outputTitle");
const systemStatus = document.getElementById("systemStatus");
const storyCount = document.getElementById("storyCount");
const copyBtn = document.getElementById("copyBtn");

let selectedMood = "eerie";
let transmissionCount = 0;
let currentStory = "";

document.querySelectorAll(".mood").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".mood").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    selectedMood = button.dataset.mood;
  });
});

const storyKits = {
  eerie: {
    titles: ["THE LAST PROCESS", "A VOICE IN THE STATIC", "THE ROOM THAT LISTENED"],
    open: [
      "At first, the only sound was the tired hum of the lights. Then a machine that had been unplugged for years blinked awake.",
      "The darkness did not feel empty. It felt occupied, as if the room had been holding its breath until someone finally arrived.",
      "At 02:13, every screen lit up at once. No network was connected. No one had entered a command."
    ],
    middle: [
      "A line of text appeared, one letter at a time: “I remember you.” The cursor waited patiently, like a finger tapping on a locked door.",
      "A faint reflection moved across the glass, a second too late to belong to anyone standing in the room.",
      "The machine began printing dates, names, and tiny details nobody had ever typed into it. With each line, the air grew colder."
    ],
    end: [
      "When the power returned, the room was silent again. Only one file remained on the desktop, created tomorrow, with your name as its title.",
      "The screen went black. In its reflection, something behind you smiled. You turned around; the room was empty. The cursor kept blinking.",
      "You left without touching the keyboard. Outside, your phone buzzed with a notification from an app you had deleted years ago."
    ]
  },
  melancholic: {
    titles: ["THE MEMORY ARCHIVE", "WHAT THE HOUSE KEPT", "A SMALL LIGHT LEFT ON"],
    open: [
      "The old room smelled of dust, rain, and the faint sweetness of marigolds left to dry. Everything had changed except the quiet.",
      "Some places do not become empty when people leave. They become full of the things nobody found the words to say.",
      "The recorder clicked on beside a stack of faded photographs. Its tiny red light looked almost like a candle."
    ],
    middle: [
      "A voice emerged from the static—not a warning, not a prophecy, just a familiar laugh preserved in the imperfect language of an old recording.",
      "The archive held a hundred ordinary moments: a recipe, a song hummed off-key, the sound of someone calling everyone home for dinner.",
      "You listened again, afraid the memory might disappear if you stopped paying attention. The machine kept the silence between the words, too."
    ],
    end: [
      "You saved the recording in three places. Not because a machine could bring anyone back, but because a story deserved to be carried forward.",
      "Outside, the rain softened. For the first time that night, the room felt less haunted than remembered.",
      "You placed the photograph beside the small light and let the recording play once more. Some echoes are not asking to be solved; they are asking to be heard."
    ]
  },
  folklore: {
    titles: ["THE MARIGOLD PROTOCOL", "THE NAME AT THE THRESHOLD", "WHEN THE LANTERN ANSWERED"],
    open: [
      "On the night the marigolds opened, an old terminal began to glow beneath a layer of dust. The elders said the date mattered.",
      "At the edge of the village stood a house where every doorway had a small offering: flowers, sweet bread, and a name spoken gently.",
      "The story said that on certain nights, the past did not return as a shadow. It returned as a light waiting to be welcomed."
    ],
    middle: [
      "The screen displayed a list of names. Beside each one was a memory: a favorite song, a meal shared, a kindness no one had written down before.",
      "A breeze moved through the closed room. The flowers trembled, and a voice from the speaker recited a story older than the machine itself.",
      "You understood then that the strange signal was not asking for a password. It was asking someone to remember the people behind the names."
    ],
    end: [
      "You added one more story to the archive. The screen dimmed, but the marigolds seemed brighter, as if the room had received what it needed.",
      "At dawn, the terminal shut down by itself. On the desk, the flowers remained—and the old story had found another person to tell it.",
      "You closed the file carefully. The past had not crossed the threshold to frighten you. It had come to make sure it was not forgotten."
    ]
  }
};

function choose(items, seed) {
  return items[seed % items.length];
}

function escapeHTML(value) {
  return value.replace(/[&<>"']/g, (char) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[char]);
}

function buildStory(place, clue, mood, seed) {
  const kit = storyKits[mood];
  const title = choose(kit.titles, seed);
  const opening = choose(kit.open, seed + 1);
  const middle = choose(kit.middle, seed + 2);
  const ending = choose(kit.end, seed + 3);
  const detail = clue.trim()
    ? `Then there was the detail you could not explain: ${clue.trim().replace(/[.!?]+$/, "")}.`
    : "Then came a small sound from somewhere inside the walls: three knocks, a pause, and one knock more.";
  const placeLine = `It happened in ${place}.`;
  return {
    title,
    text: [placeLine + " " + opening, detail + " " + middle, ending].join("\n\n")
  };
}

function renderStory(story) {
  const paragraphs = story.text.split("\n\n").map((paragraph, index) =>
    `<p${index === 2 ? ' class="closing"' : ""}>${escapeHTML(paragraph)}</p>`
  ).join("");
  storyOutput.innerHTML = `<div class="story-content"><p class="story-label">/// SIGNAL DECODED · LOCAL STORY ENGINE</p>${paragraphs}</div>`;
}

generateBtn.addEventListener("click", () => {
  generateBtn.disabled = true;
  generateBtn.innerHTML = "<span>◌</span> TUNING THE FREQUENCY...";
  systemStatus.textContent = "DECODING SIGNAL";
  storyOutput.style.opacity = "0.45";

  window.setTimeout(() => {
    transmissionCount += 1;
    const story = buildStory(settingSelect.value, clueInput.value, selectedMood, transmissionCount - 1);
    currentStory = `${story.title}\n\n${story.text}`;
    outputTitle.textContent = story.title;
    renderStory(story);
    storyCount.textContent = `TRANSMISSIONS: ${String(transmissionCount).padStart(2, "0")}`;
    copyBtn.disabled = false;
    storyOutput.style.opacity = "1";
    systemStatus.textContent = "LOCAL MODE · SIGNAL RECEIVED";
    generateBtn.disabled = false;
    generateBtn.innerHTML = "<span>✦</span> RECEIVE TRANSMISSION <span class=\"btn-arrow\">↗</span>";
  }, 450);
});

copyBtn.addEventListener("click", async () => {
  if (!currentStory) return;
  try {
    await navigator.clipboard.writeText(currentStory);
    copyBtn.textContent = "✓ COPIED";
    window.setTimeout(() => { copyBtn.textContent = "↗ COPY STORY"; }, 1600);
  } catch (error) {
    const temp = document.createElement("textarea");
    temp.value = currentStory;
    document.body.appendChild(temp);
    temp.select();
    document.execCommand("copy");
    temp.remove();
    copyBtn.textContent = "✓ COPIED";
    window.setTimeout(() => { copyBtn.textContent = "↗ COPY STORY"; }, 1600);
  }
});