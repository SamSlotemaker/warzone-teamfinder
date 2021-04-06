const socket = io()

//GET username from URL
let { user } = Qs.parse(location.search, {
    ignoreQueryPrefix: true
})
if (!user) {
    user = 'Guest'
}
console.log(user)
const form = document.getElementById('chat-form')
let messages = document.querySelector('.messages')
let input = document.querySelector('#chat-form input')
console.log(input);
//all meme images
let memes = [
    'meme1',
    'meme2'
]

form.addEventListener('submit', (e) => {
    e.preventDefault()
    if (input.value) {
        socket.emit('message', input.value)
        input.value = ''
        input.focus()
    }
})

socket.on('message', function (message) {
    let strippedMesssage = message.replace(/(<([^>]+)>)/gi, "");
    console.log(strippedMesssage)
    let element = null;
    let userElement = `<strong>${user}:</strong>`
    //when the user adds the meme command
    if (strippedMesssage.includes('!meme')) {
        //pick random meme
        let randomNumber = Math.floor(Math.random() * memes.length)
        let meme = memes[randomNumber]

        //remove command from message to create meme text
        let memeMessage = strippedMesssage.split('!meme ')[1]
        //create the list element for the meme
        element = `
        <li>
            ${userElement}
            <img class="meme ${meme}" src="css/images/${meme}.jpg" alt="">
        <p class="meme-text text-${meme}">${memeMessage}</p>    
        </li>
    `
        //print the plain message when there is no command existing
    } else {
        element = `  
        <li>
            ${userElement}
            <p>${strippedMesssage}</p>
        </li>
        `
    }

    //insert the element into the html
    messages.insertAdjacentHTML('beforeend', element)
    messages.scrollTop = messages.scrollHeight
})