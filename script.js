// Check the browser's memory for the key first
let apiKey = localStorage.getItem('gemini_api_key');

// If the key isn't saved yet, ask for it securely via a browser popup
if (!apiKey) {
    apiKey = prompt("Please enter your Gemini API Key to enable AI poetry:");
    if (apiKey) {
        localStorage.setItem('gemini_api_key', apiKey);
    }
}
const mainContainer = document.querySelector('.container');
const fullscreenView = document.getElementById('fullscreen-view');
const fullscreenPoem = document.getElementById('fullscreen-poem');
const closeBtn = document.getElementById('close-btn');
const nextBtn = document.getElementById('next-btn');
let currentMood = ''; // Remembers which tab you clicked

async function fetchPoem(mood) {
    // Show loading state and hide the "Another" button
    fullscreenPoem.innerHTML = '<span class="dramatic-line">Consulting the muses...</span>';
    nextBtn.style.display = 'none'; 

    // The prompt that instructs the AI
    const prompt = `Write a short, dramatic 4-line poem about feeling ${mood}. Do not include a title or any extra text.`;

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }]
            })
        });

        const data = await response.json();
        const aiPoem = data.candidates[0].content.parts[0].text.trim();

        // Apply your line-by-line dramatic animation
        const poemLines = aiPoem.split('\n');
        fullscreenPoem.innerHTML = ''; 
        poemLines.forEach((line, index) => {
            const lineElement = document.createElement('span');
            lineElement.textContent = line;
            lineElement.className = 'dramatic-line';
            lineElement.style.animationDelay = `${index * 1.2}s`; 
            fullscreenPoem.appendChild(lineElement);
        });

        // Show the "Generate Another" button once finished
        nextBtn.style.display = 'block'; 

    } catch (error) {
        fullscreenPoem.innerHTML = '<span class="dramatic-line">The connection broke. Please try again.</span>';
    }
}

buttons.forEach(button => {
    button.addEventListener('click', () => {
        currentMood = button.textContent;
        mainContainer.style.display = 'none';
        fullscreenView.style.display = 'flex';
        fetchPoem(currentMood); // Calls the AI function
    });
});

// Instructs the new button to fetch a different poem for the same mood
nextBtn.addEventListener('click', () => {
    fetchPoem(currentMood);
});


// Find all the mood buttons and the text box on the page
const buttons = document.querySelectorAll('.mood-buttons button');
const quoteBox = document.getElementById('quote-box');

// Give each button instructions on what to do when clicked
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const selectedMood = button.textContent;
        
        // 1. Get the poem and split it at every "Enter" key press (\n)
        const poemLines = moodQuotes[selectedMood].split('\n');
        
        // 2. Empty the box completely before adding the new poem
        fullscreenPoem.innerHTML = ''; 
        
        // 3. Build the poem line by line with a delay
        poemLines.forEach((line, index) => {
            const lineElement = document.createElement('span');
            lineElement.textContent = line;
            lineElement.className = 'dramatic-line';
            
            // Delays each line by an additional 1.2 seconds 
            lineElement.style.animationDelay = `${index * 1.2}s`; 
            
            fullscreenPoem.appendChild(lineElement);
        });
        
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
 