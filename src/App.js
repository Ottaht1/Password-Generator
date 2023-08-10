import React, { useState } from "react";
import usePasswordGen from "./PasswordGen";
import "./index.css";

const App = () => {
  const [passwordLength, setPasswordLength] = useState(4);
  const passwordGen = usePasswordGen();

  const handleCopyToClipboard = async () => {
    if (!passwordGen.password) return;

    try {
      await navigator.clipboard.writeText(passwordGen.password);
      passwordGen.clearPassword();
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

  const getPasswordStrength = () => (passwordLength < 6 ? "Weak" : "Strong");

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
          />
          <button className="copyBtn" onClick={handleCopyToClipboard}>
            {passwordGen.password ? "Copied" : "Copy"}
          </button>

          <div className="passwordLength">
            <span className="passwordStrength">
              Password Strength:{" "}
              <span className={getPasswordStrength().toLowerCase()}>
                {getPasswordStrength()}
              </span>
            </span>
            <span>
              <label>Password Length:</label>
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
};

export default App;
