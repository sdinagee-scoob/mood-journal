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
const buttons = document.querySelectorAll('.mood-buttons button');
let currentMood = ''; // Remembers which tab you clicked

async function fetchPoem(mood) {
    // Show loading state and hide the "Another" button
    fullscreenPoem.innerHTML = '<span class="dramatic-line">Consulting the muses...</span>';
    nextBtn.style.display = 'none'; 

    // The prompt that instructs the AI
    const prompt = `Write a short, dramatic 4-line poem about feeling ${mood}. Do not include a title or any extra text.`;

    try {
        // Upgraded to the official stable v1 API endpoint
        const response = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }]
            })
        });

        const data = await response.json();

        // 1. Check if Google sent back a specific API error
        if (data.error) {
            console.error("Gemini API Error:", data.error.message);
            fullscreenPoem.innerHTML = `<span class="dramatic-line" style="font-size: 1.2rem; color: #d9534f;">API Error: ${data.error.message}</span>`;
            
            // Clear the bad key from memory so you can enter it again next time
            if (data.error.code === 400 || data.error.code === 403) {
                localStorage.removeItem('gemini_api_key');
            }
            
            nextBtn.style.display = 'block'; 
            return; // Stop running the rest of the function
        }

        // 2. If no error, parse the poem
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
        // 3. This now only triggers for actual crashes or internet outages
        console.error("System Crash:", error);
        fullscreenPoem.innerHTML = '<span class="dramatic-line">The system crashed. Press F12 to check the console for details.</span>';
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

// Add instructions for the "Go Back" button
closeBtn.addEventListener('click', () => {
    fullscreenView.style.display = 'none';
    mainContainer.style.display = 'flex';
});