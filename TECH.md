# ✅ Quiz App – Technical Requirements

---

## 🏗 Classes Design

---

### 🔹 1. Base `Question` Class
**🎯 Purpose:** Controls behavior of the question element.

**📌 Properties:**
- `#id` *(private)* – Unique question identifier  
- `#text` *(private)* – Question text content  
- `#options` *(private)* – Array of answer options  
- `#correctAnswer` *(private)* – Correct answer(s)  

**⚡ Methods:**
- `isCorrect(userAnswer)` – Abstract method for answer validation  
- `render()` – Abstract method for DOM rendering  

---

### 🔹 2. `SingleChoiceQuestion` Class (extends `Question`)
**🎯 Purpose:** Implements single-selection questions using **radio buttons**.

**✅ Inheritance:** Extends `Question` base class  
**✅ Polymorphism:** Overrides `isCorrect()` and `render()` methods  

**📌 Specific Methods:**
- `clearSelection()` – Removes all selections  
- `setSelectedAnswer(answer)` – Sets specific selection (for loading state)  

---

### 🔹 3. `MultipleChoiceQuestion` Class (extends `Question`)
**🎯 Purpose:** Implements multiple-selection questions using **checkboxes**.

**✅ Inheritance:** Extends `Question` base class  
**✅ Polymorphism:** Overrides `isCorrect()` and `render()` methods  

**📌 Specific Methods:**
- `clearSelection()` – Removes all selections  
- `setSelectedAnswers(answers)` – Sets multiple selections (for loading state)  

---

### 🔹 4. `Storage` Class
**🎯 Purpose:** Handles all `localStorage` operations (**Single Responsibility Principle**).

**⚡ Methods:**
- `save(data)` – Serialize and store data  
- `load()` – Retrieve and deserialize data  
- `clear()` – Remove stored data  

---

### 🔹 5. `Quiz` Class
**🎯 Purpose:** Core business logic and state management.

**🛠 Composition:**  
- Holds an **array of Question objects**  
- Uses an instance of **Storage**  

**⚡ Methods:**
- `addQuestion(question)` – Add a question to the quiz  
- `setAnswer(questionId, answer)` – Store user’s answer  
- `resetAnswers()` – Clear all answers  
- `calculateScore()` – Compute final score  
- `submit()` – Complete quiz and save results  
- `loadProgress()` – Restore previous session  

---

## 🔍 Implementation Details

---

✅ **1.** Each question class should render **one HTML element**.  
✅ **2.** Single-choice → **radio buttons**, Multiple-choice → **checkboxes**.  
✅ **3. Submit button** should:  
   - ✔ Calculate score (**Quiz**)  
   - ✔ Show result (**Score + Passed/Failed**)  
   - ✔ Clear storage  
   - ✔ Hide question list & show **Result Container**  

✅ **4. Stored Data Format:**  
```javascript
{
  [questionId]: answer
}
```
✅ **5. select option:** 
   -save current state to localStorage
   -save user answer to question class
   
✅ **6. reset button:** :
   -reset all questions selection
   -clear storage

✅ **7. Passing percentage should be 70% (quiz)**

✅ **8. result container should not appear if not all questions are answered** 