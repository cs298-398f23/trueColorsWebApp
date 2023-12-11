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

// Define group variable to start at 1 if there is currently nothing in local storage
if (localStorage.getItem('currentGroup') === null) {
    saveState(1);
}

let group = parseInt(loadState());

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

// Event listener to start test and hide start panel
start_button.addEventListener('click', () => {

    start_panel.style = 'display: none';
    test_container.style = 'display: contents';

    loadQuestions();

})

// Function to calculate the scores for each of the four colors
function getScores() {

    // Get score for Orange - AHKNS
    const score_orange = parseInt(JSON.parse(localStorage.getItem('answers_1'))[0]) + parseInt(JSON.parse(localStorage.getItem('answers_2'))[3]) + parseInt(JSON.parse(localStorage.getItem('answers_3'))[2]) + parseInt(JSON.parse(localStorage.getItem('answers_4'))[1])
                       + parseInt(JSON.parse(localStorage.getItem('answers_5'))[2]);

    // Get score for Blue - CFJOR
    const score_blue = parseInt(JSON.parse(localStorage.getItem('answers_1'))[2]) + parseInt(JSON.parse(localStorage.getItem('answers_2'))[1]) + parseInt(JSON.parse(localStorage.getItem('answers_3'))[1]) + parseInt(JSON.parse(localStorage.getItem('answers_4'))[2]) 
                     + parseInt(JSON.parse(localStorage.getItem('answers_5'))[1]);

    // Get score for Gold - BGIMT
    const score_gold = parseInt(JSON.parse(localStorage.getItem('answers_1'))[1]) + parseInt(JSON.parse(localStorage.getItem('answers_2'))[2]) + parseInt(JSON.parse(localStorage.getItem('answers_3'))[0]) + parseInt(JSON.parse(localStorage.getItem('answers_4'))[0]) 
                     + parseInt(JSON.parse(localStorage.getItem('answers_5'))[3]);

    // Get score for Green - DELPQ
    const score_green = parseInt(JSON.parse(localStorage.getItem('answers_1'))[3]) + parseInt(JSON.parse(localStorage.getItem('answers_2'))[0]) + parseInt(JSON.parse(localStorage.getItem('answers_3'))[3]) + parseInt(JSON.parse(localStorage.getItem('answers_4'))[3]) 
                      + parseInt(JSON.parse(localStorage.getItem('answers_5'))[0])

    const scores = [score_orange, score_blue, score_gold, score_green];
    console.log(scores)
    return scores;
    
}

// Function to get the highest score and return its associated color
function getHighestScore() {
    const scores = getScores();
    const highest_score = Math.max(...scores);

    if (highest_score === scores[0]) {
        return 'ORANGE';
    }

    else if (highest_score === scores[1]) {
        return 'BLUE';
    }

    else if (highest_score === scores[2]) {
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

    questionBlocks.forEach((questionBlock) => {
        const answerEls = questionBlock.querySelectorAll('.answer');
        let answerFound = false;

        answerEls.forEach((answerEl) => {
            if (answerEl.checked) {
                answers.push(answerEl.id);
                answerFound = true;
            }
        });
        
        // Handles the case where no answers found
        if (!answerFound) {
            // Default value
            answers.push(undefined);
        }
        
    });

    return answers;

}

// Function to check if all answers have are unique and have been selected
function checkAnswersRecorded(answers) {

    if (answers.includes(undefined)) {
        return false;
    }

    for (i = 0; i < answers.length; i++) {
        for (j = i + 1; j < answers.length; j++) {
            if (answers[i] === answers[j]) {
                return false;
            }
        }
    }

    if (group === 1) {
        answers_1 = answers;
        localStorage.setItem('answers_1', JSON.stringify(answers_1))
    }
    
    else if (group === 2) {
        answers_2 = answers;
        localStorage.setItem('answers_2', JSON.stringify(answers_2))
    }
    
    else if (group === 3) {
        answers_3 = answers;
        localStorage.setItem('answers_3', JSON.stringify(answers_3))

    }
    
    else if (group === 4) {
        answers_4 = answers;
        localStorage.setItem('answers_4', JSON.stringify(answers_4))

    }

    else {
        answers_5 = answers;
        localStorage.setItem('answers_5', JSON.stringify(answers_5))

    }

    return true;
    
}

// Submit button to validate answers and update questions
submit_button.addEventListener('click', async () => {

    const answers = getAnswers();
    const answerStatus = checkAnswersRecorded(answers);

    // If all answers are valid, update questions
    if (answerStatus) {

        group++;
        saveState(group);

        // If last question, hide test container and display results panel
        if (group >= 6) {
            displayResults();
        }

        // Else, update questions and change buttons as needed
        else {

            // Change 'Begin Test' to 'Resume Test' if test is in progress
            if (group <= 5) {
                start_button.textContent = 'Resume Test';
            }

            // Change 'Next' to 'Submit Test' if last question
            if (group === 5) {
                submit_button.textContent = 'Submit Test'; 
            }
        
        deselectAnswers(); // Make sure none of the buttons are selected on the next quesion

        // Resets the radio buttons local storage to null
        removeRadioSelectionsFromLS();

        // Save the current group to local storage
        saveState(group);

        loadQuestions();

        }
    }
        
    // Else, alert user to select all answers and make sure they are unique
    else {
        alert("Please do not have duplicate answers and make sure to answer all questions before continuing.")
    }

})

// Back buttons to hide current test container and display the instructions
back_button.addEventListener('click', () => {

    test_container.style = 'display: none';
    start_panel.style = 'display:';

})

// Retake button to hide results panel, display the start panel, and reset the test
retake_button.addEventListener('click', () => {

    localStorage.clear();
    saveState(1);
    
    // Resetting display property
    results_panel.style = 'display: none';
    start_panel.style = 'display:';
    
    // Reset the group to 0 when retaking the test
    deselectAnswers();
    group = parseInt(loadState());
    
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

// Back button to hide info panel and display results panel again
back_button_info.addEventListener('click', () => {
            
    info_panel.style = 'display: none';
    results_panel.style = 'display:';

})

// Function that tells the user about their color
function getColorDescription(color) {
    if (color === 'ORANGE') {
        return '<strong>Your True Color is ORANGE!</strong><br><br>Others often describe you as fun, energetic, and charismatic. People are naturally drawn to you, and you waste no time getting to know new people. You are naturally extraverted and do very well in social situations.<br><br>You are also incredibly charming and quick-witted. You are a great negotiator who has a knack for convincing others to see things your way.<br><br>Orange individuals are also very creative and spontaneous. You are definitely not afraid to take risks. Similarly, you are often guided by your heart, rather than your head, which sometimes gets you into trouble. You sometimes have trouble following through on long-term goals, and prefer short-term, tangible rewards.<br><br>Because of their need for excitement and socialization, orange individuals are well-suited for careers that are flexible and allow them to work with others. These include careers in education, sales and marketing, management, and customer service.';
    }

    else if (color === 'GOLD') {
        return '<strong>Your True Color is GOLD!</strong><br><br>You are very detail-oriented and love to plan ahead. You are very predictable and responsible, which gives you a sense of security in life. You rarely do anything that is unpredictable or unplanned.<br><br>You also value history and tradition. You hold your family\'s shared beliefs very closely, and have a high moral standard. You find joy in expressing these values in different aspects of your life, whether that be through helping others by volunteering or through your career. You enjoy having others rely on you to help.<br><br>You enjoy being the best at what you do, and believe there is a right way to do everything. Others would describe you as a "rule-follower" who "does things by the book." Because of this, you can also become pushy and judgmental when you don\'t agree with others\' decisions.<br><br>Because of their need for structure, security, and predictability, those whose True Color is gold do well in jobs that are very straightforward and have highly defined duties.  You enjoy knowing what your tasks will be for the day, and would not perform well in careers that are highly unpredictable. Gold individuals are well-suited for careers in finance or public service.';
    }

    else if (color === 'BLUE') {
        return '<strong>Your True Color is BLUE!</strong><br><br>You are typically calm, optimistic, and kind. You are a genuinely caring and compassionate individual who tries to see the best in others and in every situation. In stressful situations, you are able to remain calm and mediate situations between individuals.<br><br>Your personality gives you a deep desire to feel appreciated and loved by others. In your family life, you are always giving words of affirmation, and expect the same in return. Your romantic relationships are based on a mutual trust and understanding, and you never waste an opportunity to let your significant other know that you love them - whether that be through a kind word or a kiss. You need a partner who does the same, and you feel undervalued in relationships without daily affirmation of your love and commitment.<br><br>Your positive attitude motivates others. You are not a leader who is the loudest or most charismatic, but rather, you are a quiet leader who inspires others through your own hard work and kindness toward others. You truly lead by example.<br><br>Those whose True Color is blue do well in caring occupations that allow them to make a difference in the lives of others. They often are most successful as faith leaders, counselors, medical professionals, or educators.';
    } 

    else if (color === 'GREEN') {
        return '<strong>Your True Color is GREEN!</strong><br><br>Others often describe you as extremely intelligent. You have an innate desire to do things to the best of your ability and take pride in your work. At work, you set the standard for everyone else. To you, work is truly enjoyable. Even on the weekends, you can\'t stand the thought of wasting a day by doing nothing, and always try to fit as much into each day as possible.<br><br>You are also a big thinker. You enjoy talking with others about abstract, philosophical ideas. You enjoy thinking about the future and all of its possibilities. You believe that you should never stop learning, and enjoy learning new information simply for your own enjoyment. In the workplace, you are a creative "idea person" who comes up with creative and practical solutions to problems.<br><br>You are very independent. Although you enjoy spending time with others, you need your private time each day to recharge. This gives you time to process everything.<br><br>Individuals with green personalities do well in careers that allow them to apply all of the "big ideas" they have. They typically succeed in careers within higher education, science, technology development, and medicine.';
    }
}

// Function that saves the current group number to local storage
function saveState(group) {
    localStorage.setItem('currentGroup', group);
}

// Function that loads the current group number from local storage
function loadState() {
    return localStorage.getItem('currentGroup');
}

// Actions to be performed when the page is loaded
document.addEventListener('DOMContentLoaded', function () {
    radioButtonLocalStorage();

    if (group === 1) {
        start_button.textContent = 'Begin Test';
    }

    if (group === 5) {
        submit_button.textContent = 'Submit Test'; 
    }
});

// Function to display the results panel and store the user's result in the database
function displayResults() {

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
    
    localStorage.removeItem('currentGroup');
    removeRadioSelectionsFromLS();
    
}

// Function to remove radio button selections from local storage
function removeRadioSelectionsFromLS() {
    localStorage.removeItem('radioSelectionA');
    localStorage.removeItem('radioSelectionB');
    localStorage.removeItem('radioSelectionC');
    localStorage.removeItem('radioSelectionD');
}
