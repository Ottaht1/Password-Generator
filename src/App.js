import React, { useState } from "react";
import usePasswordGen from "./PasswordGen";
import "./index.css";

function App() {
  const [passwordLength, setPasswordLength] = useState(4);
  const [copyButtonText, setCopyButtonText] = useState("Copy");
  const passwordGen = usePasswordGen();

  const handleCopyToClipboard = async () => {
    try {
      if (passwordGen.password) {
        await navigator.clipboard.writeText(passwordGen.password);
        setCopyButtonText("Copied");
        passwordGen.clearPassword();
        setTimeout(() => {
          setCopyButtonText("Copy");
        }, 3000);
      }
    } catch (error) {
      console.error("Clipboard copy error:", error);
    }
  };

  const handleCheckbox = (index) => {
    passwordGen.toggleCheckbox(index);
  };

  const handleGeneratePassword = () => {
    passwordGen.generatePassword(passwordLength);
  };

  const getPasswordStrength = () => {
    if (passwordLength < 6) {
      return "Weak";
    }
    return "Strong";
  };

  return (
    <div className="App">
      <h1>Password Generator</h1>
      <div className="container">
        <div className="header">
          <input
            type="text"
            value={passwordGen.password}
            readOnly
            className="generatedPasswordInput"
            onChange={() => {}}
          />
          <button className="copyBtn" onClick={handleCopyToClipboard}>
            {copyButtonText}
          </button>

          <div className="passwordLength">
            <span className="passwordStrength">
              Password Strength:{" "}
              <span
                className={getPasswordStrength() === "Weak" ? "weak" : "strong"}
              >
                {getPasswordStrength()}
              </span>
            </span>
            <span>
              <label>Password Length: </label>
              <label className="passwordLengthLabel">{passwordLength}</label>
            </span>
            <input
              type="range"
              min="4"
              max="20"
              value={passwordLength}
              onChange={(e) => setPasswordLength(e.target.value)}
            />
          </div>
          <div className="checkboxes">
            {passwordGen.checkboxData.map((item, index) => (
              <div key={index}>
                <input
                  type="checkbox"
                  checked={item.state}
                  onChange={() => handleCheckbox(index)}
                />
                <label>{item.title}</label>
              </div>
            ))}
          </div>
          <button onClick={handleGeneratePassword} className="generateBtn">
            Generate Password
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;