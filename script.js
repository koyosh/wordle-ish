let correctAns;
let correctAnsArray;
let isValid = false;
let cleared = false;
const label = document.querySelector('#word_input>label');
const input = document.querySelector('#word_input>input');
const btn = document.querySelector('#word_input>button');
const errMsg = document.querySelector('#error_message');
const history = document.querySelector('#history');

const defineAns = () => {
    const url = 'https://random-word-api.herokuapp.com/word?length=5';
    fetch(url)
        .then(res => {
            return res.json();
        })
        .then(json => {
            correctAns = json[0];
            correctAnsArray = correctAns.split('');
            console.log(correctAns);
            console.log(correctAnsArray);
        })
}

window.onload = defineAns();

const judgeInputValidation = () => {
    const userAns = input.value;

    if (userAns.length !== 5) {
        errMsg.innerText = 'Give a FIVE-LETTER word';
        isValid = false;
    } else {
        errMsg.innerText = null;
        isValid = true;
    }
}

const submitAns = () => {
    const userAnsArray = input.value.split('');
    let matchArray = [false, false, false, false, false];

    const group = document.createElement('div');
    group.classList.add('history_group');

    for (let i = 0; i < userAnsArray.length; i++) {
        const item = userAnsArray[i];
        const letter = document.createElement('p');
        letter.classList.add('letter');
        if (correctAnsArray[i] === item) {
            letter.classList.add('match');
            matchArray[i] = true;
        } else if (correctAnsArray.includes(item)) {
            letter.classList.add('hit');
        }
        letter.innerText = item;
        group.appendChild(letter);
    }

    if (!matchArray.includes(false)) {
        cleared = true;
        label.innerText = 'CONGRATULATIONS!'
        input.style.display = 'none';
        btn.innerText = 'RETRY';
    }

    history.appendChild(group);

    input.value = null;
}

btn.addEventListener('click', () => {
    
    if (cleared) {
        cleared = false;
        while(history.firstChild){
            history.removeChild(history.firstChild);
        }
        defineAns();
        label.innerText = 'Guess a five-letter word!';
        input.style.display = 'inline';
        btn.innerText = 'GUESS';
    } else {
        judgeInputValidation();
        if (isValid) {
            submitAns();
        }
    }

});