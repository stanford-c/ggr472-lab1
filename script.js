//------
// Lab 1
//------

// Button and text elements
const yesJFKButton = document.getElementById("btn-yes-jfk");
const noJFKButton = document.getElementById("btn-no-jfk");
const yesJFKCountDisplay = document.getElementById("count-yes-jfk");
const noJFKCountDisplay = document.getElementById("count-no-jfk");

const yesEWRButton = document.getElementById("btn-yes-ewr");
const noEWRButton = document.getElementById("btn-no-ewr");
const yesEWRCountDisplay = document.getElementById("count-yes-ewr");
const noEWRCountDisplay = document.getElementById("count-no-ewr");

const yesLGAButton = document.getElementById("btn-yes-lga");
const noLGAButton = document.getElementById("btn-no-lga");
const yesLGACountDisplay = document.getElementById("count-yes-lga");
const noLGACountDisplay = document.getElementById("count-no-lga");

// Initialize variables
let countJFKYes = 0;
let countJFKNo = 0;
let countEWRYes = 0;
let countEWRNo = 0;
let countLGAYes = 0;
let countLGANo = 0;

// Event listeners to track button clicks for each airport poll
// Increase count variables for each airport and update their respective text displays on the home page
yesJFKButton.addEventListener("click", () => {
    countJFKYes++;
    yesJFKCountDisplay.innerHTML = countJFKYes;
});

noJFKButton.addEventListener("click", () => {
    countJFKNo++;
    noJFKCountDisplay.innerHTML = countJFKNo;
});

yesEWRButton.addEventListener("click", () => {
    countEWRYes++;
    yesEWRCountDisplay.innerHTML = countEWRYes;
});
  
noEWRButton.addEventListener("click", () => {
    countEWRNo++;
    noEWRCountDisplay.innerHTML = countEWRNo;
});

yesLGAButton.addEventListener("click", () => {
    countLGAYes++;
    yesLGACountDisplay.innerHTML = countLGAYes;
});
  
noLGAButton.addEventListener("click", () => {
    countLGANo++;
    noLGACountDisplay.innerHTML = countLGANo;
});