chrome.downloads.onChanged.addListener(function (downloadDelta) {
  if (downloadDelta.state && downloadDelta.state.current === "complete") {
    chrome.downloads.search({id: downloadDelta.id}, function (downloads) {
      if (downloads.length > 0) {
        var download = downloads[0];
        console.log("download: ", download);
        if (
          download.mime == "audio/mpeg" ||
          download.mime == "audio/wav" ||
          download.mime == "audio/ogg"
        ) {
          // Aquí se llama a la función que convierte el audio a texto
          convertAudioToText(download);
        }
      }
    });
  }
});

async function convertAudioToText(audio) {
  const audioData = await fetch(audio.finalUrl).then((response) =>
    response.arrayBuffer()
  );
  const audioBlob = new Blob([audioData], {type: audio.mime});
  const audioFile = new File([audioBlob], audio.filename, {type: audio.mime});

  let data = new FormData();
  audio.filename = "audio_file";
  data.append("audio_file", audioFile);

  let myInit = {
    method: "POST",
    body: data,
  };

  const response = await fetch("http://localhost:8000/api/uploadfile", myInit);

  const result = await response.json();

  let url = "popup.html?transcription=" + encodeURIComponent(result);
  chrome.windows.create({
    url,
    width: 453,
    height: 685,
    type: "popup",
    left: 0,
  });
}
