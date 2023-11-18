document.getElementById('start_button').addEventListener('click', function(event) {
    event.preventDefault()
    var description = "hello"
    fetch('/quiz', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body:
            `description=${description}`
    })
})

function getSelectedA() {

    const answerEls = document.querySelectorAll(".answerA");
    let answerA;

    answerEls.forEach((answerElA) => {
        if(answerElA.checked) {
            answerA = answerElA.id;
        }
    });
    return answerA;
}

function getSelectedB() {

    const answerEls = document.querySelectorAll(".answerB");
    let answerB;

    answerEls.forEach((answerElB) => {
        if(answerElB.checked) {
            answerB = answerElB.id;
        }
    });
    return answerB;
}

function getSelectedC() {

    const answerEls = document.querySelectorAll(".answerC");
    let answerC;

    answerEls.forEach((answerElC) => {
        if(answerElC.checked) {
            answerC = answerElC.id;
        }
    });
    return answerC;
}

document.getElementById('submit').addEventListener('click', () => {

    const answerA = getSelectedA();
    
    console.log(answerA);

    const answerB = getSelectedB();
    console.log(answerB)

    const answerC = getSelectedC();
    console.log(answerC)
    
    });
