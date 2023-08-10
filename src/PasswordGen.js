import { useState } from "react";

const usePasswordGen = () => {
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [checkboxData, setCheckboxData] = useState([
    { title: " Uppercase ", state: false },
    { title: " Lowercase ", state: false },
    { title: " Numbers", state: false },
    { title: " Special Characters", state: false },
  ]);

  const toggleCheckbox = (index) => {
    const updatedData = [...checkboxData];
    updatedData[index].state = !updatedData[index].state;
    setCheckboxData(updatedData);
  };

  const clearPassword = () => {
    setPassword("");
  };

  const generatePassword = (length) => {
    console.log("Generating password...");

    let charset = "";
    let generatedPassword = "";

    const selectedOption = checkboxData.filter((checkbox) => checkbox.state);

    if (selectedOption.length === 0) {
      setErrorMessage("Select At Least One Option");
      clearPassword();
      return;
    }

    selectedOption.forEach((option) => {
      switch (option.title) {
        case " Uppercase ":
          charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
          break;
        case " Lowercase ":
          charset += "abcdefghijklmnopqrstuvwxyz";
          break;
        case " Numbers":
          charset += "0123456789";
          break;
        case " Special Characters":
          charset += "!@#$%^&*_-=+/.,<>";
          break;
        default:
          break;
      }
    });

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      generatedPassword += charset.charAt(randomIndex);
    }

    setPassword(generatedPassword);
    setErrorMessage("");
  };

  return {
    password,
    errorMessage,
    checkboxData,
    toggleCheckbox,
    generatePassword,
    clearPassword,
  };
};

export default usePasswordGen;
