# 📝 Custom Tokenizer

A **custom tokenizer** built with **React** and **Tailwind CSS** that:

* Takes text input and converts it into **token IDs** using a combination of **predefined common words** and **ASCII-based IDs** for unknown words.
* Visualizes each token with its ID, text, and whether it is a common word.
* Allows decoding of comma-separated token IDs back into readable text.
* Handles punctuation, whitespace, and dynamically expands its vocabulary.

---

## 🚀 Features

* **Frontend-only** — no backend required.
* **Predefined dictionary** for common words (articles, pronouns, verbs, etc.).
* **ASCII-based token generation** for unknown words.
* **Dynamic vocabulary** that grows as new words are encountered.
* **Token visualization** with colors for easy identification.
* **Encoding and decoding** between text and token IDs.
* **Dictionary size tracking** (common and dynamic).

---

## 📂 Project Structure

```
Custom-Tokenizer/
│
├── src/
│   ├── assets/             # Static assets (screenshots, icons, etc.)
│   ├── components/         # Navbar, Footer, etc.
│   ├── utils/              # tokenizer.js (encoding/decoding logic)
│   ├── App.jsx             # Main app UI
│   ├── main.jsx            # Entry point
│   ├── index.css           # Tailwind CSS imports
│
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

## ⚙️ Installation

```bash
# Clone the repository
git clone https://github.com/<your-username>/custom-tokenizer.git

# Go into the project folder
cd custom-tokenizer

# Install dependencies
npm install

# Run development server
npm run dev
```

---

## 💻 Usage

1. Enter text in the **Text Input** field.
2. You will get :

   * A list of token IDs.
   * Visualization of tokens with ID, color, and whether it’s common.
3. Enter comma-separated token IDs into the **Decode** section to convert them back into text.

**Example:**

```
Input: Hello world
Encoded: 51, 200, 54
Decoded: hello world
```

---

## 🛠 Technologies Used

* **React** — Component-based UI.
* **Tailwind CSS** — Styling.
* **Vite** — Development environment.

---

## 📸 Demo

### Tokenizer UI
![Tokenizer UI](https://github.com/user-attachments/assets/ebca9575-c90e-4e9f-8b19-6d2ca216ac9d)

### Token Visualization
![Token Visualization](https://github.com/user-attachments/assets/5a90ca73-e1a5-4126-ae72-2563eb5885a0)


---

## 🌐 Live Demo

```
https://custom-tokinizer.vercel.app/
```

---

**Author:** Ritik Gupta
**GitHub:** [@ritik913553](https://github.com/ritik913553)
