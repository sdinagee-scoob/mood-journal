// A dictionary storing our placeholder quotes for each mood
const moodQuotes = {
    "Calm": "Like the steady, peaceful rhythm of a Jana Kavi echoing across the fields, let your mind rest.",
    "Anxious": "Take a deep breath. This moment will pass, just like clouds moving across the sky.",
    "Inspired": "\"You're doing good, just take your time.\" — Stray Kids",
    "Melancholic": "It is okay to feel the weight of the rain. Every storm eventually runs out of water."
};

// Find all the mood buttons and the text box on the page
const buttons = document.querySelectorAll('.mood-buttons button');
const quoteBox = document.getElementById('quote-box');

// Give each button instructions on what to do when clicked
buttons.forEach(button => {
    button.addEventListener('click', () => {
        // Find out which mood is written on the button
        const selectedMood = button.textContent;
        
        // Update the text box with the matching quote
        quoteBox.textContent = moodQuotes[selectedMood];
        
        // Add a small visual cue to show which button is active
        buttons.forEach(b => b.style.backgroundColor = '#4a6fa5'); // Reset all
        button.style.backgroundColor = '#2e8b57'; // Highlight clicked
    });
});