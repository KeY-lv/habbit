// pievieno notikumu klausītāju notikumam DOMContentLoaded, kas tiek izpildīts, kad sākotnējais HTML dokuments ir pilnībā ielādēts.
document.addEventListener('DOMContentLoaded', function() {
// iegūst atsauci uz pogas elementu ar ID 'new quote'
    const newQuoteButton = document.getElementById('new-quote');
// Pievienot notikumu klausītāju pogai “new quote”, kas izsaucfunkciju fetchNewQuote, noklikšķinot uz tās.
    newQuoteButton.addEventListener('click', fetchNewQuote);

    // Ielādē sākotnējos citātus, izsaucot funkciju fetchNewQuote.
    fetchNewQuote();
});

//Dictionaries ar visiem citātiem
const quotes = [
    {"text": "Your potential is endless. Go do what you were created to do.", "author": "Unknown"},
    {"text": "Believe you can and you're halfway there.", "author": "Theodore Roosevelt"},
    {"text": "Success is not final, failure is not fatal: It is the courage to continue that counts.", "author": "Winston S. Churchill"},
    {"text": "Don't watch the clock; do what it does. Keep going.", "author": "Sam Levenson"},
    {"text": "The secret of getting ahead is getting started.", "author": "Mark Twain"},
    {"text": "It's not whether you get knocked down, it's whether you get up.", "author": "Vince Lombardi"},
    {"text": "The only way to achieve the impossible is to believe it is possible.", "author": "Charles Kingsleigh"},
    {"text": "The harder you work for something, the greater you’ll feel when you achieve it.", "author": "Unknown"},
    {"text": "Dream bigger. Do bigger.", "author": "Unknown"},
    {"text": "Don't stop when you're tired. Stop when you're done.", "author": "Unknown"},
    {"text": "Wake up with determination. Go to bed with satisfaction.", "author": "Unknown"},
    {"text": "Do something today that your future self will thank you for.", "author": "Unknown"},
    {"text": "Little things make big days.", "author": "Unknown"},
    {"text": "It's going to be hard, but hard does not mean impossible.", "author": "Unknown"},
    {"text": "Don't wait for opportunity. Create it.", "author": "Unknown"},
    {"text": "Sometimes later becomes never. Do it now.", "author": "Unknown"},
    {"text": "Great things never come from comfort zones.", "author": "Unknown"},
    {"text": "Dream it. Wish it. Do it.", "author": "Unknown"},
    {"text": "Success doesn't just find you. You have to go out and get it.", "author": "Unknown"},
    {"text": "The harder you work for something, the greater you'll feel when you achieve it.", "author": "Unknown"},
    {"text": "Success is what happens after you have survived all your mistakes.", "author": "Unknown"},
    {"text": "An arrow can only be shot by pulling it backward. So when life is dragging you back with difficulties, it means that it’s going to launch you into something great.", "author": "Unknown"},
    {"text": "Only those who dare to fail greatly can ever achieve greatly.", "author": "Robert F. Kennedy"},
    {"text": "Opportunities don't happen, you create them.", "author": "Chris Grosser"},
    {"text": "Love the life you live. Live the life you love.", "author": "Bob Marley"},
    {"text": "To live will be an awfully big adventure.", "author": "Peter Pan"},
    {"text": "Turn your wounds into wisdom.", "author": "Oprah Winfrey"},
    {"text": "Change the world by being yourself.", "author": "Amy Poehler"},
    {"text": "Every moment is a fresh beginning.", "author": "T.S. Eliot"},
    {"text": "Never regret anything that made you smile.", "author": "Mark Twain"},
    {"text": "Die with memories, not dreams.", "author": "Unknown"},
    {"text": "Aspire to inspire before we expire.", "author": "Unknown"},
    {"text": "Everything you can imagine is real.", "author": "Pablo Picasso"},
    {"text": "Simplicity is the ultimate sophistication.", "author": "Leonardo da Vinci"},
    {"text": "Whatever you do, do it well.", "author": "Walt Disney"},
    {"text": "What we think, we become.", "author": "Buddha"},
    {"text": "All limitations are self-imposed.", "author": "Oliver Wendell Holmes"},
    {"text": "Tough times never last but tough people do.", "author": "Robert H. Schuller"},
    {"text": "Problems are not stop signs, they are guidelines.", "author": "Robert H. Schuller"},
    {"text": "One day the people that don’t even believe in you will tell everyone how they met you.", "author": "Johnny Depp"},
    {"text": "If I’m gonna tell a real story, I’m gonna start with my name.", "author": "Kendrick Lamar"},
    {"text": "Have enough courage to start and enough heart to finish.", "author": "Jessica N. S. Yourko"},
    {"text": "Hate comes from intimidation, love comes from appreciation.", "author": "Tyga"},
    {"text": "I could agree with you but then we’d both be wrong.", "author": "Harvey Specter"},
    {"text": "Oh, the things you can find, if you don’t stay behind.", "author": "Dr. Seuss"},
    {"text": "Determine your priorities and focus on them.", "author": "Eileen McDargh"},
    {"text": "Be so good they can’t ignore you.", "author": "Steve Martin"},
    {"text": "Dream as if you’ll live forever, live as if you’ll die today.", "author": "James Dean"},
    {"text": "Yesterday you said tomorrow. Just do it.", "author": "Nike"},
    {"text": "I don’t need it to be easy, I need it to be worth it.", "author": "Lil Wayne"},
    {"text": "Never let your emotions overpower your intelligence.", "author": "Drake"},
    {"text": "Nothing lasts forever but at least we got these memories.", "author": "J. Cole"},
    {"text": "Don’t you know your imperfections is a blessing?", "author": "Kendrick Lamar"},
    {"text": "Reality is wrong, dreams are for real.", "author": "Tupac"},
    {"text": "To be the best, you must be able to handle the worst.", "author": "Wilson Kanadi"},
    {"text": "Try to be a rainbow in someone’s cloud.", "author": "Maya Angelou"},
    {"text": "There is no substitute for hard work.", "author": "Thomas Edison"},
    {"text": "What consumes your mind controls your life.", "author": "Unknown"},
    {"text": "Strive for greatness.", "author": "Lebron James"},
    {"text": "Wanting to be someone else is a waste of who you are.", "author": "Kurt Cobain"},
    {"text": "The time is always right to do what is right.", "author": "Martin Luther King Jr."},
    {"text": "Let the beauty of what you love be what you do.", "author": "Rumi"},
    {"text": "May your choices reflect your hopes, not your fears.", "author": "Nelson Mandela"},
    {"text": "A happy soul is the best shield for a cruel world.", "author": "Atticus"},
    {"text": "White is not always light and black is not always dark.", "author": "Habeeb Akande"},
    {"text": "Life becomes easier when you learn to accept the apology you never got.", "author": "R. Brault"},
    {"text": "Happiness depends upon ourselves.", "author": "Aristotle"},
    {"text": "Turn your obstacles into opportunities and your problems into possibilities.", "author": "Roy T. Bennett"},
    {"text": "Keep looking up… that’s the secret of life.", "author": "Snoopy"},
    {"text": "A room without books is like a body without a soul.", "author": "Marcus Tullius Cicero"},
    {"text": "I have nothing to lose but something to gain.", "author": "Eminem"}
];
// Šī funkcija paķer jaunu citātu un atjaunina HTML, lai to displejotu.
function fetchNewQuote() {
// Pārbauda, vai citāti ir pieejami "quote" masīvā.
    if (quotes.length > 0) {
// izvēlās random citātu no masīva “quotes”
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
// Atjauno HTML elementu caur id "quote" lai izvēlēto citātu displayotu.
        document.getElementById('quote').innerHTML = `"${randomQuote.text}"<br><span class='author'>- ${randomQuote.author || 'Unknown'}</span>`;
//Ja citāti nav pieejami, parādīsies paziņojums.
    } else {
        document.getElementById('quote').innerText = 'No quotes available.';
    }
}