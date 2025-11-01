const passwordLength = document.getElementById("length");
const result = document.getElementById("result");
const uppercase = document.getElementById("uppercase");
const lowercase = document.getElementById("lowercase");
const numbers = document.getElementById("numbers");
const symbols = document.getElementById("symbols");
const button = document.getElementById("generate");
const copyBtn = document.getElementById("copy");
const message = document.getElementById("message");

let finalPassword = "";

message.style.color = "red";

//ASCII uppercaseLetters
let uppercaseLetters = [];

for (let i = 65; i <= 90; i++) {
  //conver i to letters
  let letter = String.fromCharCode(i);

  uppercaseLetters.push(letter);
}

//ASCII lowercaseLetters
let lowercaseLetters = [];

for (let i = 97; i <= 122; i++) {
  //conver i to letters
  let letter = String.fromCharCode(i);

  lowercaseLetters.push(letter);
}

//NUMBERS
const numberChars = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

//SYMBOLS
const symbolChars = ["!", "@", "#", "$", "%", "^", "&", "*", "(", ")"];

//===validation===
button.addEventListener("click", () => {
  const long = Number(passwordLength.value);

  if (isNaN(long) || long < 4 || long > 64) {
    message.textContent = "Please enter a number between 4 and 64";
    setTimeout(function () {
      message.textContent = "";
    }, 3000);
  } else if (
    uppercase.checked === false &&
    lowercase.checked === false &&
    numbers.checked === false &&
    symbols.checked === false
  ) {
    message.textContent = "Please select at least one character type";
    setTimeout(function () {
      message.textContent = "";
    }, 3000);
  } else {
    console.log("geenerating your password");
    let pool = [];

    if (uppercase.checked === true) {
      pool = pool.concat(uppercaseLetters);
    }
    if (lowercase.checked === true) {
      pool = pool.concat(lowercaseLetters);
    }
    if (numbers.checked === true) {
      pool = pool.concat(numberChars);
    }
    if (symbols.checked === true) {
      pool = pool.concat(symbolChars);
    }

    //=====Step 2===== (Pick selected char and push to passwordArray)

    let passwordArray = [];

    //Uppercase

    if (uppercase.checked === true) {
      let randomIndex = Math.floor(Math.random() * uppercaseLetters.length);
      let randomChar = uppercaseLetters[randomIndex];
      passwordArray.push(randomChar);
    }

    //lowercase

    if (lowercase.checked === true) {
      let randomIndex = Math.floor(Math.random() * lowercaseLetters.length);
      let randomChar = lowercaseLetters[randomIndex];
      passwordArray.push(randomChar);
    }

    //numbers

    if (numbers.checked === true) {
      let randomIndex = Math.floor(Math.random() * numberChars.length);
      let randomChar = numberChars[randomIndex];
      passwordArray.push(randomChar);
    }

    //symbols

    if (symbols.checked === true) {
      let randomIndex = Math.floor(Math.random() * symbolChars.length);
      let randomChar = symbolChars[randomIndex];
      passwordArray.push(randomChar);
    }

    //===step 3====
    let remainingCharacters = long - passwordArray.length;

    for (let i = 0; i < remainingCharacters; i++) {
      let randomIndex = Math.floor(Math.random() * pool.length);
      let randomChar = pool[randomIndex];
      passwordArray.push(randomChar);
    }

    //Shuffle passwordAray (Fisher-Yates)
    for (let i = passwordArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = passwordArray[i];
      passwordArray[i] = passwordArray[j];
      passwordArray[j] = temp;
    }

    finalPassword = passwordArray.join("");

    result.textContent = finalPassword;
  }
});

//======> Copy Btn <======
copyBtn.addEventListener("click", () => {
  if (result.textContent === "") {
    message.textContent = "Please generate password";
    setTimeout(function () {
      message.textContent = "";
    }, 3000);
  } else {
    navigator.clipboard.writeText(finalPassword);
    message.style.color = "green";
    message.textContent = "Password has been copied";
    setTimeout(function () {
      message.textContent = "";
    }, 3000);
  }
});
