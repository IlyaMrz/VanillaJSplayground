const quoteContainer = document.querySelector(".quote-container")
const quote = document.querySelector('.quote')
const author = document.querySelector('.author')
const tweetBtn = document.querySelector('.tweet')
const newQuote = document.querySelector('.new-quote')
const loader = document.querySelector('.loader')

function showLoading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}
function complete() {
    if (!loader.hidden){
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

async function getQuote() {
    showLoading()
    const proxyUrl = 'https://whispering-tor-04671.herokuapp.com/'
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    const resp = await fetch(proxyUrl+apiUrl)
    const data = await resp.json();
    if (data.quoteText.length < 100) {
        quote.style.fontSize = '2rem'
    } else {
        quote.style.fontSize = '1.2rem'
    }
    console.log(data)
    quote.innerText = data.quoteText
    author.innerText = data.quoteAuthor
    complete()
}

function twt() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote.innerText} - ${author.innerText}`;
    window.open(twitterUrl, '_blank');
}

getQuote()

newQuote.addEventListener('click', getQuote)
tweetBtn.addEventListener('click', twt)