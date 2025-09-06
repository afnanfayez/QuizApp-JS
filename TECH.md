# Quiz App Technical Requirements

## Classes Design

#### **1. Base Question Class**
- **Purpose**: controls behavior of qusetion element
- **Properties**:
  - `_id` (private): Unique question identifier
  - `_text` (private): Question text content
  - `_options` (private): Array of answer options
  - `_correctAnswer` (private): Correct answer(s)
- **Methods**:
  - `isCorrect(userAnswer)`: Abstract method for answer validation
  - `render()`: Abstract method for DOM rendering

#### **2. SingleChoiceQuestion Class (extends Question)**
- **Purpose**: Implements single-selection questions with radio buttons
- **Inheritance**: Extends Question base class
- **Polymorphism**: Overrides `isCorrect()` and `render()` methods
- **Specific Methods**:
  - `clearSelection()`: Removes all selections
  - `setSelectedAnswer(answer)`: Sets specific selection (for loading state)

#### **3. MultipleChoiceQuestion Class (extends Question)**
- **Purpose**: Implements multi-selection questions with checkboxes
- **Inheritance**: Extends Question base class
- **Polymorphism**: Overrides `isCorrect()` and `render()` methods
- **Specific Methods**:
  - `clearSelection()`: Removes all selections
  - `setSelectedAnswers(answers)`: Sets multiple selections (for loading state)

#### **4. Storge Class**
- **Purpose**: Handles all localStorge operations (Single Responsibility Principle)
- **Methods**:
  - `save(data)` : Serializa and store data
  - `load()` : Retrieve and deserialize data
  - `clear()` : Remove stored data

### 5. Quiz Class
**Purpose**: Core business logic and state management
**Composition**: Contains array of Question objects and Storage instance
**Methods**:
  `addQuestion(question)`: Add question to quiz
  `setAnswer(questionId, answer)`: Store user answer
  `resetAnswers()`: Clear all answers
  `calculateScore()`: Compute final results
  `submit()`: Complete quiz and save results
  `loadProgress()`: Restore previous session 

### Implementation Details

1. Each question class should render one html element

2. single choice questions' options should be radio buttons, but multiple choices should be checkbox
3. Submit button should do the following:
   -calculate score (quiz)
   -show result (score & passed/failed)
   -clear storage
   -hide questions list and show result container element
4. stored data:
```javascript
{
[questionId]: answer,
}
```
5. select option:
   -save current state to localStorage
   -save user answer to question class
   
6. reset button:
   -reset all questions selection
   -clear storage

7. Passing percentage should be 70% (quiz)
8. result container should not appear if not all questions are answered