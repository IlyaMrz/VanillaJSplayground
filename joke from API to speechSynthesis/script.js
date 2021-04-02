const joke = document.querySelector('.joke')
const newJoke = document.querySelector('.newJoke')
const synth = window.speechSynthesis;
let v = []

function populateVoiceList(){
    v = synth.getVoices()
}
populateVoiceList();
if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = populateVoiceList;
}

function speak(nextJoke) {
    let utterThis = new SpeechSynthesisUtterance(nextJoke);
    utterThis.voice = v[3];
    utterThis.rate = 5;
    synth.speak(utterThis)
}

async function getJoke() {
    let nextJoke = '';
    const res = await fetch('https://v2.jokeapi.dev/joke/Any');
    const data = await res.json()
    console.log(data)
    if (data.setup) {
        nextJoke = `${data.setup} ... ${data.delivery}`;
      } else {
        nextJoke = data.joke;
      }
    joke.innerHTML = nextJoke
    speak(nextJoke)
}

// getJoke()

newJoke.addEventListener('click', getJoke)
window.document.body.onkeyup = function(e){
    if(e.keyCode == 32){
        console.log('space pressed')
        getJoke()
    }
}