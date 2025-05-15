const apiKey = "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"; // 🔐 Replace with your real key


window.addEventListener('DOMContentLoaded', () => {
  const savedWorkouts = JSON.parse(localStorage.getItem('workouts')) || [];
  const workoutList = document.getElementById('workout-list');
  savedWorkouts.forEach(workout => {
    const listItem = document.createElement('li');
    listItem.textContent = `${workout.name}: ${workout.exercises}`;
    workoutList.appendChild(listItem);
  });
});

document.getElementById('calorie-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const inputs = this.querySelectorAll('input');
  const meal = inputs[0].value;
  const calories = inputs[1].value;
  const listItem = document.createElement('li');
  listItem.textContent = `${meal}: ${calories} calories`;
  document.getElementById('calorie-list').appendChild(listItem);
  this.reset();
});

document.getElementById('workout-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const inputs = this.querySelectorAll('input');
  const workoutName = inputs[0].value.trim();
  const exercises = inputs[1].value.trim();
  if (!workoutName || !exercises) return;

  
  const savedWorkouts = JSON.parse(localStorage.getItem('workouts')) || [];
  savedWorkouts.push({ name: workoutName, exercises });
  localStorage.setItem('workouts', JSON.stringify(savedWorkouts));

  
  const listItem = document.createElement('li');
  listItem.textContent = `${workoutName}: ${exercises}`;
  document.getElementById('workout-list').appendChild(listItem);

  this.reset();
});

async function sendMessage() {
  const input = document.getElementById('chat-input');
  const message = input.value;
  if (!message.trim()) return;

  appendMessage("You", message);
  input.value = '';

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: message }],
        max_tokens: 100
      })
    });

    const data = await response.json();
    const reply = data.choices[0].message.content.trim();
    appendMessage("AI", reply);
  } catch (error) {
    appendMessage("AI", "Error fetching response. Check your API key or connection.");
    console.error(error);
  }
}

function appendMessage(sender, text) {
  const messageElem = document.createElement('div');
  messageElem.textContent = `${sender}: ${text}`;
  document.getElementById('chat-messages').appendChild(messageElem);
  document.getElementById('chat-messages').scrollTop = document.getElementById('chat-messages').scrollHeight;
}
