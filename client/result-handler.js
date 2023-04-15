var copyButton = document?.getElementById("copy-answer");
var copyText = document.querySelector(".copy-text");
var downloadButton = document.getElementById("download-answer");
var answerContent = document.getElementById("answer-content");

var paragraphs = document.querySelectorAll(".typewriter");
var urlParams = new URLSearchParams(window.location.search);
var transcriptionText = urlParams.get("transcription");
var speed = 20;
// methods in the menu options

copyButton?.addEventListener("click", () => {
  copyContent(answerContent.innerText);
  copyText.innerText = "Copied to clipboard";
});

async function copyContent(text) {
  try {
    await navigator.clipboard.writeText(text);
  } catch (error) {
    console.log(error);
  }
}

downloadButton.addEventListener("click", () => {
  downloadText(answerContent.innerText);
});

function downloadText(text) {
  try {
    const link = document.createElement("a");
    const file = new Blob([text], {type: "text/plain"});
    link.href = URL.createObjectURL(file);
    link.download = "answer.txt";
    link.click();
    URL.revokeObjectURL(link.href);
  } catch (error) {
    console.log(error);
  }
}

function createParagraphs() {
  const transcriptContainer = document.getElementById("answer-content");
  const paragraphs = transcriptionText.split(/\n/g).filter((p) => p.length > 0);

  paragraphs.forEach((p, index) => {
    let divContainer = document.createElement("div");
    divContainer.classList.add("msg-container");

    let pElem = document.createElement("p");
    pElem.id = `answer-paragraph-${index}`;
    pElem.innerText = p;

    const now = new Date();

    let formatDateAuto = now.toLocaleString(navigator.language, {
      timeStyle: "short",
      hour12: true,
    });

    let spanElem = document.createElement("span");
    spanElem.classList.add("msg-time");
    spanElem.innerText = formatDateAuto;
    console.log("spanElem: ", spanElem);

    divContainer.appendChild(pElem);
    divContainer.appendChild(spanElem);
    console.log("pElem: ", pElem);

    console.log("transcriptContainer: ", transcriptContainer);

    transcriptContainer.appendChild(divContainer);
  });
}

console.log("transcriptionText: ", transcriptionText);
createParagraphs();
