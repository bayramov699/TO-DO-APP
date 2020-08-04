

// jQuery Functions
$(document).ready(() => {

    const todoInput = $('#todoInput');
    const todoSubmit = $('#todoSubmit');
    const todoList = $('.todo-items ul');

    let storedObj = localStorage.getItem('todos');

    if (storedObj) {
        const newObj = JSON.parse(storedObj);

        for (let task in newObj['datas']) {
            let todo = `
            <li>
            <span id="todo-item">${newObj['datas'][task]}</span>
            <button onclick="makeDone(this)" id="todoDone" class="btn btn-info">X</button>
            </li>`;
            $(todo).appendTo(todoList);
        }
    }

    $.get('https://programming-quotes-api.herokuapp.com/quotes/random', (data) => {
        const quoteBox = $('#quotes');
        let quote = `<p>${data.en}</p>`;
        let author = `<strong>${data.author}</strong>`;
        $(quote).appendTo(quoteBox);
        $(author).appendTo(quoteBox);
    });

    const nasa_url = 'https://api.nasa.gov/planetary/apod?api_key=SGYJWovxqCF7tC62cKoFTsDxyf7oqXVlQfLEppv2'

    $.get(nasa_url, (data) => {
        const quoteBox = $('#learn');
        let explanation = `<p>${data.explanation}</p>`;
        let title = `<h3 class="pt-3 pb-3">${data.title}</h3>`;
        let copyright = `<small>(c) ${data.copyright}</small>`;
        
        $(title).appendTo(quoteBox);
        $(explanation).appendTo(quoteBox);
        $(copyright).appendTo(quoteBox);
    });

    //fetch('https://programming-quotes-api.herokuapp.com/quotes/random')
    //.then(response => response.json())
    //.then(asfasf => console.log(asfasf));



    todoSubmit.on('click', () => {
        let todoObj = {
            'datas': [],
        };
        if (storedObj) {
            const newObj = JSON.parse(storedObj);
            newObj['datas'].push(todoInput.val());
            localStorage.setItem('todos', JSON.stringify(newObj));
        } else {
            todoObj['datas'].push(todoInput.val());
            localStorage.setItem('todos', JSON.stringify(todoObj));
        }
        let todo = `<li>
        <span>${todoInput.val()}</span>
        <button id="todoDone" onclick="makeDone(this)" class="btn btn-info">X</button>
        </li>`;
        $(todo).appendTo(todoList);
        todoInput.val("");
    });
});

// Helper Functions

function makeDone(e) {

    let localArr = [];
    let storedObj = JSON.parse(localStorage.getItem('todos'));
    const data = $(e).parent().find('span').text();

    for (let task in storedObj['datas']) {
        if (data !== storedObj['datas'][task]) {
            localArr.push(storedObj['datas'][task]);
        }
    }
    storedObj['datas'] = localArr;

    localStorage.setItem('todos', JSON.stringify(storedObj));

    $(e).parent().find('span').css('text-decoration', 'line-through');

}



// Get Background images from api



// Libraries

const slideshow = new Slideshow({
    tickInterval: 5000,
    transitionTime: 100,
    backgroundElementId: "body"
});

slideshow.setImages(
    ['https://source.unsplash.com/1200x700/?nature',
    'https://source.unsplash.com/1200x700/?technology',
    'https://source.unsplash.com/1200x700/?human']
);
slideshow.run();