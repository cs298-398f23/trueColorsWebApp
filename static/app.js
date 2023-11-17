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

function getSelected() {

    const answerEls = document.querySelectorAll(".answer");
    let answer;

    answerEls.forEach((answerEl) => {
        if(answerEl.checked) {
            answer = answerEl.id;
        }
    });
    return answer;
}

document.getElementById('submit').addEventListener('click', () => {

    const answer = getSelected();
    
    console.log(answer);
    
    });
