// Get all test_containers and hide them
const test_container = document.getElementById('test_container');
const test_container_2 = document.getElementById('test_container_2');
const test_container_3 = document.getElementById('test_container_3');
const test_container_4 = document.getElementById('test_container_4');
const test_container_5 = document.getElementById('test_container_5');

test_container.style.display = 'none';
test_container_2.style.display = 'none';
test_container_3.style.display = 'none';
test_container_4.style.display = 'none';
test_container_5.style.display = 'none';

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

// Event listener to get every selected answer for all 5 groups [CHECK IF LOOP CAN BE DONE]
function holdAnswers() {
    const answerA = getSelected('A');
    const answerB = getSelected('B');
    const answerC = getSelected('C');
    const answerD = getSelected('D');
    const question1 = [answerA, answerB, answerC, answerD];

    const answerE = getSelected('E');
    const answerF = getSelected('F');
    const answerG = getSelected('G');
    const answerH = getSelected('H');
    const question2 = [answerE, answerF, answerG, answerH];

    const answerI = getSelected('I');
    const answerJ = getSelected('J');
    const answerK = getSelected('K');
    const answerL = getSelected('L')
    const question3 = [answerI, answerJ, answerK, answerL];

    const answerM = getSelected('M');
    const answerN = getSelected('N');
    const answerO = getSelected('O');
    const answerP = getSelected('P');
    const question4 = [answerM, answerN, answerO, answerP];

    const answerQ = getSelected('Q');
    const answerR = getSelected('R');
    const answerS = getSelected('S');
    const answerT = getSelected('T')
    const question5 = [answerQ, answerR, answerS, answerT];

    const answers = [question1, question2, question3, question4, question5];
    return answers;
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

// Final submit button to get all answers to calculate later [CURRENTLY LOGS IN CONSOLE]
submit_button_5.addEventListener('click', () => {

    if (checkAnswersRecorded('Q', 'R', 'S', 'T')) {

    const answerA = getSelected('A');
    console.log(answerA);

    const answerB = getSelected('B');
    console.log(answerB)

    const answerC = getSelected('C');
    console.log(answerC)

    const answerD = getSelected('D');
    console.log(answerD)

    const answerE = getSelected('E');
    console.log(answerE)

    const answerF = getSelected('F');
    console.log(answerF)

    const answerG = getSelected('G');
    console.log(answerG)

    const answerH = getSelected('H');
    console.log(answerH)

    const answerI = getSelected('I');
    console.log(answerI)

    const answerJ = getSelected('J');
    console.log(answerJ)

    const answerK = getSelected('K');
    console.log(answerK)

    const answerL = getSelected('L');
    console.log(answerL)

    const answerM = getSelected('M');
    console.log(answerM)

    const answerN = getSelected('N');
    console.log(answerN)

    const answerO = getSelected('O');
    console.log(answerO)

    const answerP = getSelected('P');
    console.log(answerP)

    const answerQ = getSelected('Q');
    console.log(answerQ)

    const answerR = getSelected('R');
    console.log(answerR)

    const answerS = getSelected('S');
    console.log(answerS)

    const answerT = getSelected('T');
    console.log(answerT)

    const answers = holdAnswers();
        
    for (question in answers) {
        console.log(answers[question]); 
    }
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
