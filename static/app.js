// Get main test panels and hide them
const start_panel = document.getElementById('start_panel');
const test_container = document.getElementById('test_container');
const results_panel = document.getElementById('results_panel');
const info_panel = document.getElementById('info_panel');

test_container.style.display = 'none';
results_panel.style.display = 'none';
info_panel.style.display = 'none';

// Get all templates for each letter and their associated words
const letter_1 = document.getElementById('letter_1');
const a_word_1 = document.getElementById('a_word_1');
const a_word_2 = document.getElementById('a_word_2');
const a_word_3 = document.getElementById('a_word_3');

const letter_2 = document.getElementById('letter_2');
const b_word_1 = document.getElementById('b_word_1');
const b_word_2 = document.getElementById('b_word_2');
const b_word_3 = document.getElementById('b_word_3');

const letter_3 = document.getElementById('letter_3');
const c_word_1 = document.getElementById('c_word_1');
const c_word_2 = document.getElementById('c_word_2');
const c_word_3 = document.getElementById('c_word_3');

const letter_4 = document.getElementById('letter_4');
const d_word_1 = document.getElementById('d_word_1');
const d_word_2 = document.getElementById('d_word_2');
const d_word_3 = document.getElementById('d_word_3');

// Define arrays to store each question group's answers
let answers_1 = [];
let answers_2 = [];
let answers_3 = [];
let answers_4 = [];
let answers_5 = [];

// Define group variable and load first set of questions
let group = 0;
loadQuestions();

// Function that ensures each new question doesn't already have an option selected
function deselectAnswers() {

    const answerEls = document.querySelectorAll(".answer");
    answerEls.forEach(answerEl => answerEl.checked = false);

}

// Function that gets question information from the database
async function fetchQuestionsFromDatabase() {
    const response = await fetch(`/getQuestions?group=${group}`);
    const data = await response.json();
    return data;
}

// Function that loads the current question information
async function loadQuestions() {

    deselectAnswers();
    group++;
    const questions = await fetchQuestionsFromDatabase();

    // Load questions into HTML
    letter_1.innerText = questions[0][0];
    a_word_1.innerText = questions[0][1];
    a_word_2.innerText = questions[0][2];
    a_word_3.innerText = questions[0][3];

    letter_2.innerText = questions[0][4];
    b_word_1.innerText = questions[0][5];
    b_word_2.innerText = questions[0][6];
    b_word_3.innerText = questions[0][7];

    letter_3.innerText = questions[0][8];
    c_word_1.innerText = questions[0][9];
    c_word_2.innerText = questions[0][10];
    c_word_3.innerText = questions[0][11];

    letter_4.innerText = questions[0][12];
    d_word_1.innerText = questions[0][13];
    d_word_2.innerText = questions[0][14];
    d_word_3.innerText = questions[0][15];

}

// Event listener to hide start panel and begin test
start_button.addEventListener('click', () => {

    start_panel.style = 'display: none';
    test_container.style = 'display: contents';

})

// Function to calculate the scores for each of the four colors
function getScores() {

    // Get score for ORANGE - AHKNS
    const score_orange = parseInt(answers_1[0]) + parseInt(answers_2[3]) + parseInt(answers_3[2]) + parseInt(answers_4[1])
                       + parseInt(answers_5[2]);

    // Get score for BLUE - CFJOR
    const score_blue = parseInt(answers_1[2]) + parseInt(answers_2[1]) + parseInt(answers_3[1]) + parseInt(answers_4[2]) 
                     + parseInt(answers_5[1]);

    // Get score for GOLD - BGIMT
    const score_gold = parseInt(answers_1[1]) + parseInt(answers_2[2]) + parseInt(answers_3[0]) + parseInt(answers_4[0]) 
                     + parseInt(answers_5[3]);

    // Get score for GREEN - DELPQ
    const score_green = parseInt(answers_1[3]) + parseInt(answers_2[0]) + parseInt(answers_3[3]) + parseInt(answers_4[3]) 
                      + parseInt(answers_5[0])

    const scores = [score_orange, score_blue, score_gold, score_green];
    return scores;
}

// Function to get the highest score and return its associated color
function getHighestScore() {
    const scores = getScores();
    const highest_score = Math.max(...scores);

    if (highest_score == scores[0]) {
        return 'ORANGE';
    }

    else if (highest_score == scores[1]) {
        return 'BLUE';
    }

    else if (highest_score == scores[2]) {
        return 'GOLD';
    }

    else {
        return 'GREEN';
    }
}

// Function to get the answers of the current group of words
function getAnswers() {

    const questionBlocks = document.querySelectorAll('.question_block');
    let answers = [];

    // For each question block, get the answer that was selected
    questionBlocks.forEach((questionBlock) => {
        const answerEls = questionBlock.querySelectorAll('.answer');
        let answerFound = false;

        answerEls.forEach((answerEl) => {
            if (answerEl.checked) {
                answers.push(answerEl.id); // If answer is found, add it to answers
                answerFound = true;
            }
        });

        if (!answerFound) {
            answers.push(undefined); // If answer is not found, add undefined to signal a missing answer
        }
    });

    return answers;

}

// Function to check if all answers have are unique and have been selected
function checkAnswersRecorded(answers) {

    // If no answer selected, return false
    if (answers.includes(undefined)) {
        return false;
    }

    // If duplicate answers, return false
    for (i = 0; i < answers.length; i++) {
        for (j = i + 1; j < answers.length; j++) {
            if (answers[i] == answers[j]) {
                return false;
            }
        }
    }

    // Store answers in correct array
    if (group == 1) {
        answers_1 = answers;
    }
    
    else if (group == 2) {
        answers_2 = answers;
    }
    
    else if (group == 3) {
        answers_3 = answers;
    }
    
    else if (group == 4) {
        answers_4 = answers;
    }

    else {
        answers_5 = answers;
    }

    return true;
}

// Function to display the results panel and store the user's result in the database
function displayResults() {

    // Hide test container and display results panel
    test_container.style = 'display: none';
    results_panel.style = 'display:';

    // Get user's result and display it
    const result_color = getHighestScore();
    const user_result = document.getElementById('user_result');

    user_result.textContent = result_color;
    user_result.style = `color: ${result_color}`;

    // Store user's result in database
    fetch(`/storeResult/${result_color}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({result: result_color})
    });

}

// Submit button to validate answers and update questions
submit_button.addEventListener('click', async () => {

    const answers = getAnswers();
    const answerStatus = checkAnswersRecorded(answers);

    // If all answers are valid, update questions
    if (answerStatus) {

        // If last question, hide test container and display results panel
        if (group == 5) {

            displayResults();

        }

        // Else, update questions and change buttons as needed
        else {

            // Change 'Begin Test' to 'Resume Test' if test is in progress
            if (group >= 1) {
                start_button.textContent = 'Resume Test';
            }

            // Change 'Next' to 'Submit Test' if last question
            if (group == 4) {
                submit_button.textContent = 'Submit Test'; 
            }

        loadQuestions();

        }

    }

    // Else, alert user to select all answers and make sure they are unique
    else {
        alert("Please do not have duplicate answers and make sure to answer all questions before continuing.")
    }

})

// Back button to hide current test container and display the instructions
back_button.addEventListener('click', () => {

    test_container.style = 'display: none';
    start_panel.style = 'display:';

})

// Retake button to hide results panel, display the start panel, and reset the test
retake_button.addEventListener('click', () => {

    // Resetting display properties
    results_panel.style = 'display: none';
    start_panel.style = 'display:';
    
    // Reset the group to 0 when retaking the test
    group = 0;
    loadQuestions();

    // Reset button text
    start_button.textContent = 'Begin Test';
    submit_button.textContent = 'Next';

})

// Info button to hide results panel and display the color's description
info_button.addEventListener('click', () => {
    
    results_panel.style = 'display: none';
    info_panel.style = 'display:';

    const user_description = document.getElementById('user_description');
    user_description.innerHTML = getColorDescription(getHighestScore());

})

// Info back button to hide info panel and display results panel again
back_button_info.addEventListener('click', () => {
            
    info_panel.style = 'display: none';
    results_panel.style = 'display:';

})

// Function that tells the user about their color
function getColorDescription(color) {
    if (color == 'ORANGE') {
        return '[PLACEHOLDER] Your True Color is ORANGE! You are a fun-loving, spontaneous, and energetic person. You are a natural performer and thrive in social situations. You are a great storyteller and love to be the center of attention. You are a great problem solver and are always looking for new ways to do things. You are a risk taker and love to live in the moment. You are a great team player';
    }

    else if (color == 'GOLD') {
        return '[PLACEHOLDER] Your True Color is GOLD! You are a loyal, organized, and responsible person. You are a natural planner and thrive in structured environments. You are a great leader and love to take charge. You are a great listener and love to help others. You are a great team player and are always looking for ways to improve yourself and others. You are a great problem solver';
    }

    else if (color == 'BLUE') {
        return '[PLACEHOLDER] Your True Color is BLUE! You are a caring, creative, and compassionate person. You are a natural helper and thrive in environments where you can help others. You are a great listener and love to help others. You are a great team player and are always looking for ways to improve yourself and others. You are a great problem solver';
    } 

    else if (color == 'GREEN') {
        return '[PLACEHOLDER] Your True Color is GREEN! You are a logical, analytical, and objective person. You are a natural problem solver and thrive in environments where you can solve problems. You are a great listener and love to help others. You are a great team player and are always looking for ways to improve yourself and others. You are a great problem solver';
    }
}
