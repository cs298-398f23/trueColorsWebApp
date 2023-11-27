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

submit_button.addEventListener('click', () => {

    test_container.style = 'display: none';
    test_container_2.style = 'display: contents';

})

submit_button_2.addEventListener('click', () => {

    test_container_2.style = 'display: none';
    test_container_3.style = 'display: contents';
})

submit_button_3.addEventListener('click', () => {
    
    test_container_3.style = 'display: none';
    test_container_4.style = 'display: contents';
    
})

submit_button_4.addEventListener('click', () => {
    
test_container_4.style = 'display: none';
test_container_5.style = 'display: contents';
    
})

submit_button_5.addEventListener('click', () => {

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
})

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
