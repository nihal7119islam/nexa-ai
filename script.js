const chatForm = document.getElementById("chat-form");
const userInput = document.getElementById("user-input");
const chatMessages = document.getElementById("chat-messages");

function addMessage(message, sender) {
    const div = document.createElement("div");

    div.className = `message ${sender}`;
    div.textContent = message;

    chatMessages.appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

chatForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const question = userInput.value.trim();

    if (!question) return;

    addMessage(question, "user");
    userInput.value = "";

    addMessage("Nexa AI ভাবছে...", "ai");

    try {
        const response = await fetch("/api/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                question: question
            })
        });

        const data = await response.json();

        const messages = document.querySelectorAll(".message.ai");
        const lastMessage = messages[messages.length - 1];

        if (data.answer) {
            lastMessage.textContent = data.answer;
        } else if (data.error) {
            lastMessage.textContent = "দুঃখিত, একটি সমস্যা হয়েছে।";
        } else {
            lastMessage.textContent = "কোনো উত্তর পাওয়া যায়নি।";
        }

    } catch (error) {
        const messages = document.querySelectorAll(".message.ai");
        const lastMessage = messages[messages.length - 1];

        if (lastMessage) {
            lastMessage.textContent =
                "Server-এর সাথে যোগাযোগ করা যাচ্ছে না।";
        }

        console.error(error);
    }
});
