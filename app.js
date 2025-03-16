// app.js (Frontend)
async function sendMessage() {
    const userInput = document.getElementById("user-input").value;

    if (userInput.trim() === "") {
        return;
    }

    // Display the user's message in the chat
    appendMessage("You", userInput);

    // Clear the input field
    document.getElementById("user-input").value = "";

    try {
        // Call the backend (serverless function) to get Ching's response
        const response = await fetch('/api/chat', {  // This route will call the serverless function
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: userInput
            })
        });

        const data = await response.json();

        if (response.ok) {
            const aiResponse = data.response;
            appendMessage("Ching", aiResponse);
        } else {
            appendMessage("Ching", "Sorry, something went wrong. Try again!");
        }
    } catch (error) {
        console.error("Error calling the serverless function:", error);
        appendMessage("Ching", "Sorry, there was an error. Please try again later.");
    }
}

// Function to append messages to the chat box
function appendMessage(sender, message) {
    const chatBox = document.getElementById("chat-box");
    const messageElement = document.createElement("p");
    messageElement.textContent = `${sender}: ${message}`;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;  // Scroll to the latest message
}