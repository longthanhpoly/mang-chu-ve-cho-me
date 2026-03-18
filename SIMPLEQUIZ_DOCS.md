# SimpleQuiz Component

A reusable, stateless quiz component for simple math questions with Vietnamese text-to-speech support.

## Features

✅ **Stateless/Local State Only** - No global state required  
✅ **Instant Visual Feedback** - Color and icon changes on selection  
✅ **Text-to-Speech** - Tap question or options to hear Vietnamese audio  
✅ **Large Buttons** - Touch-friendly (min 44x44px)  
✅ **Max 3 Options** - Optimized for simple choices  
✅ **Accessibility** - Keyboard navigation, ARIA labels, reduced motion support  

---

## Installation

The component is already integrated in your project:

```
src/
├── components/
│   └── quiz/
│       ├── SimpleQuiz.jsx
│       └── SimpleQuiz.css
├── utils/
│   └── textToSpeech.js
```

---

## Basic Usage

```jsx
import SimpleQuiz from './components/quiz/SimpleQuiz';

function MyQuiz() {
  const question = {
    question: "2 + 1 = ?",
    options: ["2", "3", "4"],
    correctIndex: 1
  };

  const handleAnswer = (isCorrect, selectedIndex) => {
    console.log('Correct?', isCorrect);
    console.log('User selected:', selectedIndex);
    // Move to next question, update score, etc.
  };

  return (
    <SimpleQuiz 
      question={question}
      onAnswer={handleAnswer}
      autoRead={false}
    />
  );
}
```

---

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `question` | Object | ✅ Yes | - | Question data (see format below) |
| `onAnswer` | Function | ❌ No | - | Callback when user answers `(isCorrect, selectedIndex) => {}` |
| `autoRead` | Boolean | ❌ No | `false` | Auto-read question on mount |

### Question Format

```javascript
{
  question: string,      // The question text
  options: string[],     // Array of 2-3 answer options
  correctIndex: number   // Index of correct answer (0-2)
}
```

**Example:**
```javascript
{
  question: "3 + 2 = ?",
  options: ["4", "5", "6"],
  correctIndex: 1  // "5" is correct
}
```

---

## Callback: onAnswer

The `onAnswer` callback receives two parameters:

```javascript
onAnswer(isCorrect, selectedIndex)
```

- `isCorrect` (boolean): Whether the user selected the correct answer
- `selectedIndex` (number): The index of the option the user selected

**Example:**
```javascript
const handleAnswer = (isCorrect, selectedIndex) => {
  if (isCorrect) {
    console.log('Correct! User selected index:', selectedIndex);
    // Update score, move to next question
  } else {
    console.log('Wrong! User selected index:', selectedIndex);
    // Show encouragement, retry
  }
};
```

---

## Text-to-Speech

The component uses browser's built-in Web Speech API for Vietnamese audio.

### Auto Features:
- ✅ Question has audio icon - tap to hear
- ✅ Each option has audio icon - tap to hear
- ✅ Auto feedback: "Đúng rồi!" (correct) or "Sai rồi. Thử lại nhé!" (wrong)

### Supported Browsers:
- ✅ Chrome/Edge (excellent)
- ✅ Safari (good)
- ⚠️ Firefox (limited Vietnamese voices)

### Manual TTS Usage:
```javascript
import { speak } from './utils/textToSpeech';

speak('Xin chào'); // Speaks in Vietnamese
```

---

## Complete Example: Multi-Question Quiz

```jsx
import React, { useState } from 'react';
import SimpleQuiz from './components/quiz/SimpleQuiz';
import Button from './components/ui/Button';

function MathQuiz() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const questions = [
    { question: "1 + 1 = ?", options: ["1", "2", "3"], correctIndex: 1 },
    { question: "2 + 2 = ?", options: ["3", "4", "5"], correctIndex: 1 },
    { question: "3 - 1 = ?", options: ["1", "2", "3"], correctIndex: 1 }
  ];

  const handleAnswer = (isCorrect) => {
    if (isCorrect) setScore(score + 1);

    // Move to next question after 1.5s delay
    setTimeout(() => {
      if (currentIndex < questions.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setFinished(true);
      }
    }, 1500);
  };

  if (finished) {
    return (
      <div>
        <h1>Score: {score}/{questions.length}</h1>
        <Button onClick={() => {
          setCurrentIndex(0);
          setScore(0);
          setFinished(false);
        }}>
          Restart
        </Button>
      </div>
    );
  }

  return (
    <div>
      <p>Question {currentIndex + 1}/{questions.length}</p>
      <SimpleQuiz
        question={questions[currentIndex]}
        onAnswer={handleAnswer}
        autoRead={true}
      />
    </div>
  );
}
```

---

## Visual Feedback

### States:
1. **Default** - White background, gray border
2. **Hover** - Lifts up, blue border
3. **Correct** - Green border, check icon ✓
4. **Wrong** - Red border, X icon, shake animation
5. **Show Correct** - Highlights correct answer when user selects wrong

### Colors:
- ✅ Correct: `#52C17F` (green)
- ❌ Wrong: `#FF6B6B` (red)
- 🔵 Primary: `#8EBFB6` (teal)

---

## Styling Customization

Override CSS variables in your app:

```css
.simple-quiz {
  --color-success: #your-green;
  --color-error: #your-red;
  --color-primary: #your-primary;
}
```

Or override specific classes:

```css
.simple-quiz-option {
  border-radius: 8px; /* Custom radius */
  padding: 2rem;      /* Larger padding */
}
```

---

## Accessibility

- ✅ Keyboard navigation (Tab, Enter, Space)
- ✅ ARIA labels for screen readers
- ✅ Focus visible outline
- ✅ Minimum 44x44px touch targets
- ✅ Respects `prefers-reduced-motion`

---

## Best Practices

### ✅ Do:
```javascript
// Keep options short (1-2 characters for numbers)
{ question: "2 + 1 = ?", options: ["2", "3", "4"] }

// Use 2-3 options for simplicity
{ question: "Is this even?", options: ["Yes", "No"] }

// Provide clear, immediate callback
onAnswer={(isCorrect) => {
  if (isCorrect) updateScore();
  moveToNextQuestion();
}}
```

### ❌ Don't:
```javascript
// Don't use more than 3 options
{ options: ["1", "2", "3", "4"] } // Too many!

// Don't use long text in options
{ options: ["This is option one", "This is option two"] } // Too long!

// Don't block the UI during callback
onAnswer={() => {
  // Don't do heavy computation here
  // Keep it fast for instant feedback
}}
```

---

## Troubleshooting

### Issue: Audio not working
**Solution:** Some browsers require user interaction before playing audio. Ensure the component is rendered after user clicks something.

### Issue: Wrong option highlighted
**Solution:** Double-check `correctIndex` is zero-based (0, 1, or 2).

### Issue: Feedback too fast/slow
**Solution:** Adjust delay in `onAnswer` callback:
```javascript
setTimeout(() => {
  nextQuestion();
}, 2000); // Change delay here
```

---

## Browser Compatibility

| Browser | TTS | Component |
|---------|-----|-----------|
| Chrome/Edge | ✅ Excellent | ✅ Full |
| Safari | ✅ Good | ✅ Full |
| Firefox | ⚠️ Limited | ✅ Full |
| Mobile Safari | ✅ Good | ✅ Full |
| Mobile Chrome | ✅ Excellent | ✅ Full |

---

## License

Part of "Mang Chữ Về Cho Mẹ" educational app.
