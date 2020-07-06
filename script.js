const quoteBlock = document.getElementById('quote__wrapper');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('quote-twitter__button');
const newQuoteBtn = document.getElementById('new-quote__button');
const loader = document.getElementById('loader');

// Loader 
function showLoading() {
    loader.hidden = false;
    quoteBlock.hidden = true;
}

// Loading ends
function removeLoading() {
    if (!loader.hidden) {
        loader.hidden = true;
        quoteBlock.hidden = false;
    }
}

// Getting Quote
async function getQuote() {
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';

    try {
        showLoading();
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();
        quoteText.innerText = data.quoteText;

        if (data.quoteAuthor === '') {
            authorText.innerText = 'Unknown';
        } else {
            authorText.innerText = data.quoteAuthor;
        }

        if (data.quoteText.length > 100) {
            quoteText.style.fontSize = '1.5rem';
        } else {
            quoteText.style.fontSize = '';
        }
        removeLoading();
    } catch (error) {
        getQuote();
    }
}

// Tweet Quote
function tweetQuote(event) {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank');
}

// Event Listeners
twitterBtn.addEventListener('click', tweetQuote);
newQuoteBtn.addEventListener('click', getQuote);

// Loading our function
getQuote();