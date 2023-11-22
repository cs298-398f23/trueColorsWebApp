const test_container = document.getElementById('test_container');
test_container.style.display = 'none';

start_button.addEventListener('click', () => {
    const start_panel = document.getElementById('start_panel');
    start_panel.style.display = 'none';
    test_container.style.display = 'contents';

})

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

submit.addEventListener('click', () => {

    const answerA = getSelected('A');

    console.log(answerA);

    const answerB = getSelected('B');
    console.log(answerB)

    const answerC = getSelected('C');
    console.log(answerC)

    const answerD = getSelected('D');
    console.log(answerD)

    const answers = holdAnswers();

    for (question in answers) {
       console.log(answers[question]); 
    }

    })
