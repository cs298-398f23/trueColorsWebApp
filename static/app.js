document.getElementById("start_button").addEventListener("click", function(event) {
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
