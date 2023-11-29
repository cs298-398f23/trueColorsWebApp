// Get all test_containers (and results panel) and hide them
const test_container = document.getElementById('test_container');
const test_container_2 = document.getElementById('test_container_2');
const test_container_3 = document.getElementById('test_container_3');
const test_container_4 = document.getElementById('test_container_4');
const test_container_5 = document.getElementById('test_container_5');
const results_panel = document.getElementById('results_panel');

test_container.style.display = 'none';
test_container_2.style.display = 'none';
test_container_3.style.display = 'none';
test_container_4.style.display = 'none';
test_container_5.style.display = 'none';
results_panel.style.display = 'none';

// Event listener to start test and hide start panel
start_button.addEventListener('click', () => {
    const start_panel = document.getElementById('start_panel');
    start_panel.style.display = 'none';
    test_container.style.display = 'contents';
})

// Event listener placeholder(? not too sure just yet, tbh)
start_button.addEventListener('click', function(event) {
    event.preventDefault()
    var description = "Start Quiz"
    fetch('/quiz', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body:
            `description=${description}`
    })
});

// Event listener to get a selected answer
function getSelected(letter) {
    const answerEls = document.querySelectorAll(`.answer${letter}`);
    let answer;

    answerEls.forEach((answerEl) => {
        if(answerEl.checked) {
            answer = answerEl.id
        }
    });

    return answer
}

// Function to calculate the scores for each of the four colors
function getScores() {

    const answerA = getSelected('A');
    const answerH = getSelected('H');
    const answerK = getSelected('K');
    const answerN = getSelected('N');
    const answerS = getSelected('S');
    const score_orange = parseInt(answerA) + parseInt(answerH) + parseInt(answerK) + parseInt(answerN) + parseInt(answerS);

    const answerC = getSelected('C');
    const answerF = getSelected('F');
    const answerJ = getSelected('J');
    const answerO = getSelected('O');
    const answerR = getSelected('R');
    const score_blue = parseInt(answerC) + parseInt(answerF) + parseInt(answerJ) + parseInt(answerO) + parseInt(answerR);

    const answerB = getSelected('B');
    const answerG = getSelected('G');
    const answerI = getSelected('I');
    const answerM = getSelected('M');
    const answerT = getSelected('T');
    const score_gold = parseInt(answerB) + parseInt(answerG) + parseInt(answerI) + parseInt(answerM) + parseInt(answerT);

    const answerD = getSelected('D');
    const answerE = getSelected('E');
    const answerL = getSelected('L');
    const answerP = getSelected('P');
    const answerQ = getSelected('Q');
    const score_green = parseInt(answerD) + parseInt(answerE) + parseInt(answerL) + parseInt(answerP) + parseInt(answerQ);

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

// Submit buttons to hide current test container and display the next one
submit_button.addEventListener('click', () => {

    if(checkAnswersRecorded('A', 'B', 'C', 'D')) {
        test_container.style = 'display: none';
        test_container_2.style = 'display: contents'; 
    }
    else {
        alert("Please do not have duplicate answers and make sure to answer all questions before continuing.")
    }

})

submit_button_2.addEventListener('click', () => {

    if(checkAnswersRecorded('E', 'F', 'G', 'H')) {
        test_container_2.style = 'display: none';
        test_container_3.style = 'display: contents';
    }
    else {
        alert("Please do not have duplicate answers and make sure to answer all questions before continuing.")
    }

})

submit_button_3.addEventListener('click', () => {

    if(checkAnswersRecorded('I', 'J', 'K', 'L')) {
        test_container_3.style = 'display: none';
        test_container_4.style = 'display: contents';
    }
    else {
        alert("Please do not have duplicate answers and make sure to answer all questions before continuing.")
    }
    
})

submit_button_4.addEventListener('click', () => {

    if (checkAnswersRecorded('M', 'N', 'O', 'P')) {
        test_container_4.style = 'display: none';
        test_container_5.style = 'display: contents';
    }
    else {
        alert("Please do not have duplicate answers and make sure to answer all questions before continuing.")
    }
    
})

// Final submit button that determines the user's color and displays results [CURRENTLY LOGS IN CONSOLE]
submit_button_5.addEventListener('click', () => {

    // If all questions are answered and unique, calculate the score of each color
    if (checkAnswersRecorded('Q', 'R', 'S', 'T')) {

        const result_color = getHighestScore();
        test_container_5.style = 'display: none';
        results_panel.style = 'display:';

        const user_result = document.getElementById('user_result')
        user_result.textContent = result_color;
        user_result.style = `color: ${result_color}`;

    }

    else {
        alert("Please do not have duplicate answers and make sure to answer all questions before submitting.")
    }

})

// Back buttons to hide current test container and display the previous one
back_button.addEventListener('click', () => {
        
    const start_panel = document.getElementById('start_panel');
    test_container.style = 'display: none';
    start_panel.style = 'display:';

})

back_button_2.addEventListener('click', () => {
            
        test_container_2.style = 'display: none';
        test_container.style = 'display: contents';
    
})
    
back_button_3.addEventListener('click', () => {
            
        test_container_3.style = 'display: none';
        test_container_2.style = 'display: contents';
    
})

back_button_4.addEventListener('click', () => {
            
        test_container_4.style = 'display: none';
        test_container_3.style = 'display: contents';
    
})

back_button_5.addEventListener('click', () => {
            
        test_container_5.style = 'display: none';
        test_container_4.style = 'display: contents';
    
})

// Retake button to refresh the page and start the test over
retake_button.addEventListener('click', () => {
                
    location.reload();
    
})

// Function to verify all 4 questions have been uniquely answered
function checkAnswersRecorded(letter1, letter2, letter3, letter4) {
    // Get the value for each question
    const answer1 = getSelected(letter1);
    const answer2 = getSelected(letter2);
    const answer3 = getSelected(letter3);
    const answer4 = getSelected(letter4);
    question = [answer1, answer2, answer3, answer4];
    
    if (question.includes(undefined)) {
        return false; // If any question has nothing selected, return False
    }
    
    for (i = 0; i < question.length; i++) {
        for (j = i + 1; j < question.length; j++) {
            if (question[i] == question[j]) {
                return false; // If any question has the same answer as another, return False
            }
        }
    }
    
    return true; // If all answers are unique and answered, return True
}
