const mainContainer = document.querySelector('.container');
const fullscreenView = document.getElementById('fullscreen-view');
const fullscreenPoem = document.getElementById('fullscreen-poem');
const closeBtn = document.getElementById('close-btn');


// A dictionary storing our placeholder quotes for each mood
const moodQuotes = {
    "Happy": `The sun is loud, the shadows flee,
A quiet joy awakes in me.
No heavy thoughts, no ticking clock,
Just blooming flowers on the block.`,

    "Romantic": `I did not know the sky was wide,
Until you came to walk beside.
A thousand words I cannot say,
Are in the way you look my way.`,

    "Yearning": `The clock moves slow, the room is still,
I look out past the windowsill.
A quiet ache, a distant space,
Between my hands and your familiar face.`,

    "Grief": `The world spins on, it does not wait,
While I stand frozen at the gate.
A heavy stone I learn to bear,
For love is what is resting there.`,

    "Anger": `A sudden spark, a rising tide,
A roaring fire I cannot hide.
Let it burn the dry wood bare,
To clear the smoke and breathe the air.`,

    "Uncertain": `The fog rolls in, the path is blurred,
I wait in silence for a word.
But even in the fading light,
A single star can guide the night.`,

    "Hopeful": `The longest storm must always end,
The sharpest broken branches mend.
Look to the east, the light is new,
The morning sun is breaking through.`,

    "Healing": `The edges fray, the colors bleed,
But rain is what the rivers need.
The deepest wounds begin to close,
And from the dirt, a new seed grows.`
};

// Find all the mood buttons and the text box on the page
const buttons = document.querySelectorAll('.mood-buttons button');
const quoteBox = document.getElementById('quote-box');

// Give each button instructions on what to do when clicked
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const selectedMood = button.textContent;
        
        // Put the poem into the new full-screen box
        fullscreenPoem.textContent = moodQuotes[selectedMood];
        
        // Hide the main dashboard and show the full-screen poem
        mainContainer.style.display = 'none';
        fullscreenView.style.display = 'flex';
    });
});

// Add instructions for the "Go Back" button
closeBtn.addEventListener('click', () => {
    fullscreenView.style.display = 'none';
    mainContainer.style.display = 'flex';
});
 