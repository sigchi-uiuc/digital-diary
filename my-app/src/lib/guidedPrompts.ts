// Mood-based guided prompts system
export const moodBasedPrompts = {
  "😢": { // Extremely Sad
    title: "Processing Difficult Emotions",
    description: "Let's work through these challenging feelings together",
    prompts: [
      "What's weighing heavily on your heart today?",
      "What emotions are you experiencing right now?",
      "What would help you feel even a little bit better?",
      "Who or what brings you comfort during difficult times?",
      "What small step can you take toward healing?"
    ]
  },
  "😔": { // Sad
    title: "Gentle Reflection",
    description: "Take time to acknowledge and process your feelings",
    prompts: [
      "What's making you feel down today?",
      "How are you taking care of yourself right now?",
      "What usually helps lift your spirits?",
      "What are you grateful for, even in this moment?",
      "What would you tell a friend going through this?"
    ]
  },
  "😐": { // Neutral
    title: "Mindful Awareness",
    description: "Explore your current state and what you need",
    prompts: [
      "How would you describe your current emotional state?",
      "What's been on your mind lately?",
      "What do you need more of in your life right now?",
      "What small changes could improve your day?",
      "What are you looking forward to?"
    ]
  },
  "😊": { // Happy
    title: "Celebrating Joy",
    description: "Capture and amplify the positive moments",
    prompts: [
      "What brought you joy today?",
      "What are you most grateful for right now?",
      "How can you share this positive energy with others?",
      "What made you smile or laugh recently?",
      "What would you like to remember about this feeling?"
    ]
  },
  "😄": { // Extremely Happy
    title: "Embracing Euphoria",
    description: "Savor and understand this wonderful energy",
    prompts: [
      "What's making you feel absolutely amazing?",
      "How can you bottle this feeling for later?",
      "What positive changes are happening in your life?",
      "How can you spread this joy to others?",
      "What does this happiness teach you about yourself?"
    ]
  }
}

export const emojiOptions = [
  { emoji: "😢", label: "Terrible" },
  { emoji: "😔", label: "Sad" },
  { emoji: "😐", label: "Okay" },
  { emoji: "😊", label: "Good" },
  { emoji: "😄", label: "Fantastic" }
]
