// Hello I am Wendy Diaz-Wilson and this is my final project
// Goal: create ocean mini game with personal illustrations


//VARIABLES
  let gameState = "title"; // Keeps track of the current screen
  let inMiniGame = false; // Track if we're in the mini-game
  // Start Button Variables
  let buttonColor;     // Color of the button
  let buttonHoverColor; // Color of the button when hovered
  let buttonWidth = 150; // Button width
  let buttonHeight = 50; // Button height
  // Images
  let seaImage; // Sea background
  let talkingSeal; // Game directions
  // Sounds
  let bubbleSound;          // Bubble sound for seals
  let backgroundMusic;     // Background music for the game
  // Arrow Shape 4 Next Screen
  let scale = 3.5; // Scaling factor to increase the size
  let offsetX = 60; // Amount to move right
  let offsetY = 30; // Amount to move down
  //Fish Memory Game
  let fish = []; // Array to store fish objects
  let fishCount = 10; // The # of fish swimming on page
  let displayTime = 5000; // Time to display fish in milliseconds (5 seconds)
  let startTime; // Tracs when the memory game starts
  // Variables for answer options and feedback on the Answer Page
  let correctAnswer = 'B'; // Correct answer key
  let selectedAnswer = null; // stores user's choice
  let feedbackShown = false; // to check if feedback has been shown
  // Mini Game 2 Variables
  let fishMiniGame = [];  // Array to store fish objects for mini-game #2
  let fishEatenCount = 0; // Counter for the number of fish eaten
  let gameStartTime;      // Tracks start time for 5-second duration
  let gameDuration = 5000; // Mini-game duration (5 seconds)
  let killerWhaleCursor;  // Image of the killer whale cursor
  let miniGame2Complete = false; // Track if mini-game is complete
  //
  let linkX = 25, linkY = 25; // Position for the link text
  let linkWidth = 200, linkHeight = 30; // Dimensions for the clickable link area


// ASSEST PRELOAD (IMAGES & SOUND)
function preload() {
  seaImage = loadImage('seaImage.png');  // Sea background image
  talkingSeal = loadImage('seal.png');  // Seal image
  talkingSeal2 = loadImage('seal2directions.png');  // Seal image
  killerWhaleCursor = loadImage('killerWhale.png'); // Killer whale
  // Sound files
  backgroundMusic = loadSound('islandsound.mp3'); // Background music
  bubbleSound = loadSound('bubbleswater.mp3'); // Load bubble sound
}


// CANVAS SETUP
function setup() {
  createCanvas(1000, 600);
  
  // Start Button On Title Screen Colors
  buttonColor = color(0, 150, 255); // Default button color (blue)
  buttonHoverColor = color(0, 100, 200); // Hover color (darker blue)
  
  // Initialize 33 fish objects for first Mini Game #1
  for (let i = 0; i < fishCount; i++) { //For loops runs 10 total fish
    fish.push({ //adds a new object to the fish array
      x: random(width), //sets a random x position
      y: random(height), //sets a random y position
      speed: random(1, 3) //assigns a random speed to each fish 1-3
    });
  }
  
  // Initialize fish for Mini Game #2 (10 fish to eat)
  for (let i = 0; i < 20; i++) {
   fishMiniGame.push({
     x: random(width),
     y: random(height),
     eaten: false
   });
  }
}


// DRAW FUNCTION
function draw() {
  
  // If statements to determine which screen to display
  if (gameState === "title") {
    background(seaImage); // Draw sea background
    titleScreen(); //function of titlescreen
  } else if (gameState === "miniGame1") {
    background(talkingSeal); // Show talking seal background
    miniGame1(); //calls function of mini game #1
    // Draws the arrow for the next page
    fill('orange'); // Sets arrow color
    noStroke(); // No outline for the arrow
    drawArrow(width - 100, height - 100); // Position&calls on arrow function
  } else if (gameState === "memoryGame") {
    if (!startTime) startTime = millis(); // Set start time once
    startMemoryGame(); // Display the memory game
    // Check if 5 seconds have passed
    if (millis() - startTime > displayTime) {
      gameState = "questionScreen"; // Move to the question screen
    }
  } else if (gameState === "questionScreen") {
    displayQuestionScreen(); // Show the screen with the question
    bubbleSound = loadSound('bubbleswater.mp3'); 
  }
   else if (gameState === "miniGame2") { //directions page for mini game 2
    background(talkingSeal2);
    displayMiniGame2();
    // Draws the arrow for the next page
    fill('purple'); // Sets arrow color
    noStroke(); // No outline for the arrow
    drawArrow(width - 80, height - 80); // Position&calls on arrow 
  }
   else if (gameState === "miniGame2S") {
   miniGame2Start(); //
  }
}

// ARROW 4 NEXT PAGE
function drawArrow(x, y) { //Function to draw the arrow for next pages
  
  triangle( //scaling factors 4 quick change are in the variable section
    x + offsetX, y + offsetY, 
    x + offsetX - 20 * scale, y + offsetY - 10 * scale, 
    x + offsetX - 20 * scale, y + offsetY + 10 * scale
  ); 
}


// TITLE SCREEN
function titleScreen() {
  textSize(64);
  fill('orange');
  textAlign(CENTER);
  text("Under the Sea Mini Games", width / 2, height / 2 - 100);
  textSize(24);
  text("By Wendy Diaz-Wilson", width / 2, height / 2 - 50);
  
  // Draw link text in the top-left corner
  textAlign(LEFT);
  fill('blue');
  text("Famous Sea Caves link", linkX, linkY + 20); // Position the text
  
  // Checks if the mouse is over the START button
  if (mouseX > width / 2 - buttonWidth / 2 && mouseX < width / 2 +  buttonWidth / 2 &&
      mouseY > height / 2 && mouseY < height / 2 + buttonHeight) {
    fill(buttonHoverColor); // Changes color to hover color
  } else {
    fill(buttonColor); // Change back to default color
  }

  // Start button shape and text
  rect(width / 2 - 75, height / 2, buttonWidth, buttonHeight, 7);
  fill(255); // White text
  textSize(24);
  text("Start", width / 2 - 25, height / 2 + 32); // Button label

}


// BUTTONS & ARROWS PRESSED
function mousePressed() {
  
  // Check if start button was clicked on the title screen
  if (gameState === "title" && mouseX > width / 2 - 75 && mouseX < width / 2 + 75 && mouseY > height / 2 && mouseY < height / 2 + 50) {
    backgroundMusic.loop(); // Start playing the music when the game starts
    gameState = "miniGame1";
  }
  
  // Check if the link area was clicked on the title screen
  if (gameState === "title" && mouseX > 25 && mouseX < 25 + 200 && 
      mouseY > 25 && mouseY < 25 + 30) {
    window.open('https://www.sealioncaves.com/about/', '_blank');
  }

  // Check if the orange arrow was clicked to go to the memory game
  if (gameState === "miniGame1") {
    let arrowX = width - 100 + offsetX;
    let arrowY = height - 100 + offsetY;
    if (mouseX > arrowX - 20 * scale && mouseX < arrowX && mouseY > arrowY - 10 * scale && mouseY < arrowY + 10 * scale) {
      gameState = "memoryGame"; // Change to memory game screen
    }
  }

  // Check if blue arrow button was clicked to go to Mini Game #2 Directions
  if (gameState === "questionScreen" && selectedAnswer) { // Only allow transition if answer was selected
    let arrowX = width - 100 + offsetX;
    let arrowY = height - 100 + offsetY;
    if (mouseX > arrowX - 20 * scale && mouseX < arrowX && mouseY > arrowY - 10 * scale && mouseY < arrowY + 10 * scale) {
      gameState = "miniGame2"; // New state for Mini Game #2 Directions
    }
  }
  
  // Red arrow click for end of mini-game 2
  if (gameState === "miniGame2") {
    let arrowX = width - 80 + offsetX;
    let arrowY = height - 80 + offsetY;
    if (mouseX > arrowX - 20 * scale && mouseX < arrowX && mouseY > arrowY - 10 * scale && mouseY < arrowY + 10 * scale) {
      gameState = "miniGame2S"; // Change to memory game screen
    }
  }
  
  // Check if the Restart button is clicked in the game over screen
  if (gameState === "miniGame2S" && mouseX > width / 2 - 75 && mouseX < width / 2 + 75 &&
    mouseY > height / 2 + 50 && mouseY < height / 2 + 50 + buttonHeight) {
   // Reset game conditions
   fishEatenCount = 0;
   gameStartTime = null;
   miniGame2Complete = false;
   gameState = "title"; // Reset to title page
   cursor(); // Show the cursor again
  }
 }


// MINI GAME #1 DIRECTIONS PAGE
function miniGame1() { //Placeholder for the first mini-game directions
}

// COUNT FISH GAME #1
function startMemoryGame() {
  
  background(seaImage); // Draw sea background at the start of the memory game screen
  // Start the bubble sound if it’s not already playing
  if (!bubbleSound.isPlaying()) {
    bubbleSound.loop(); // Loop the bubble sound during the memory game
  }

  // Draw each fish and make them swim across the screen
  for (let i = 0; i < fish.length; i++) { //i index access each array
    drawFish(fish[i].x, fish[i].y); // position of the fish along x axis & speed to curretn postition 
    fish[i].x += fish[i].speed; // Move fish to the right
  }

  // Stop the bubble sound when the memory game time is up
  if (millis() - startTime > displayTime) {
    bubbleSound.stop(); // Stop bubble sound once the memory game ends
    gameState = "questionScreen"; // Move to the question screen
  }
}

// FISH SHAPE FOR GAME #1 & #2
function drawFish(x, y) { //Function to draw a simple fish shape
  fill('orange'); // Fish color
  noStroke();
  ellipse(x, y, 40, 20); // Body of the fish
  triangle(x - 20, y, x - 30, y - 10, x - 30, y + 10); // Tail of the fish
}


// ANSWER QUESTION GAME #1
function displayQuestionScreen() { //Display question screen with answer options
  
  background('orange'); 
  textSize(32);
  fill('black');
  textAlign(CENTER);
  text("How many fish were there?", width / 2, height / 2 - 100);
  
  // Display answer options
  textSize(24);
  text("A. 12", width / 2, height / 2 - 20);
  text("B. 10", width / 2, height / 2 + 20);
  text("C. 8", width / 2, height / 2 + 60);
  
  // Show feedback if an answer is selected
  if (selectedAnswer) {
    if (selectedAnswer === correctAnswer) {
      fill('green');
      text("Correct!", width / 2, height / 2 + 120);
    } else {
      fill('red');
      text("Incorrect!", width / 2, height / 2 + 120);
    }
    
    // Draws the arrow for the next page
    fill('blue'); // Sets arrow color
    noStroke(); // No outline for the arrow
    drawArrow(width - 100, height - 100); // Position arrow  
  }
}


// ANSWER TRACKER FOR GAME #1
function keyPressed() {
  if (gameState === "questionScreen") {
    if (key === 'A' || key === 'a') {
      selectedAnswer = 'A';
    } else if (key === 'B' || key === 'b') {
      selectedAnswer = 'B';
    } else if (key === 'C' || key === 'c') {
      selectedAnswer = 'C';
    }
  }
}

  
// MINI GAME #2 DIRECTIONS PAGE
function displayMiniGame2() { //Placeholder for the second mini-game directions
  
  textSize(1);
  fill('black');
  textAlign(CENTER);
  text("H", width / 2, height / 2 - 100);
}


// MINI GAME #2
function miniGame2Start() {
  background('yellow'); // Set sea background
  background(seaImage); // Set sea background
  noCursor();            // Hide the default mouse cursor
  image(killerWhaleCursor, mouseX - 450 / 2, mouseY - 400 / 2, 600, 400); // Draw whale cursor

  // Timer setup
  if (!gameStartTime) gameStartTime = millis(); // Start timer if not set
  let timeLeft = (8000 - (millis() - gameStartTime)) / 1000; // Calculate time left in seconds

  // Display the number of fish eaten
  fill('black');
  textSize(24);
  textAlign(RIGHT);
  text("Fish Eaten: " + fishEatenCount, width - 20, 50); // Display fish eaten count in the upper right corner

  // Display remaining time
  text("Time Left: " + Math.max(0, Math.floor(timeLeft)) + "s", width - 20, 80); // Display remaining time in the upper right corner

  // Checks if game duration has ended
  if (millis() - gameStartTime > 8000) { // Updated to 8 seconds
    miniGame2Complete = true; // Mark mini-game as complete
    gameState = "miniGame2S"; // Move to end screen
    noCursor(); // Show cursor again
     if (backgroundMusic.isPlaying()) {
        backgroundMusic.stop(); // Stop the background music when the game ends
    }
    fill('black');
    textSize(32);
    textAlign(CENTER);
    text("Game Over!", width / 2, height / 2);
    // Display the Restart button
   fill(buttonColor); // Same color as Start button
   rect(width / 2 - 75, height / 2 + 50, buttonWidth, buttonHeight, 7); // Same dimensions and rounding
   fill(255); // White text for the button
   textSize(24);
   textAlign(CENTER, CENTER);
   text("Restart", width / 2, height / 2 + 50 + buttonHeight / 2);
    return; // Stops further execution to keep from updating fish
  }

  // Display and check fish
  for (let i = 0; i < fishMiniGame.length; i++) {
    let fish = fishMiniGame[i];
    if (!fish.eaten) {
      fill('orange');
      drawFish(fish.x, fish.y); // Fish shape function

      // Check if killer whale cursor is "eating" the fish
      if (dist(mouseX, mouseY, fish.x, fish.y) < 30) {
        fish.eaten = true; // Mark fish as eaten
        fishEatenCount++; // Increment counter
      }
    }
  }
}





