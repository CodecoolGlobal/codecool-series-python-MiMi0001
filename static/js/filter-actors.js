const pageInfo = {
    optionsCard: null,
    actorsCard: null,
    selectGenre: null,
    tBody: null,
}


init();


function init(){
    pageInfo.optionsCard = document.querySelector('.options');
    pageInfo.actorsCard = document.querySelector('.actors-list');
    pageInfo.selectGenre = document.getElementById('select-genres');
    pageInfo.actorInput = document.getElementById('actor-name');
    pageInfo.tBody = document.getElementById('tbody');

    createOptions();

    addEventListeners()
}


async function createOptions(){
    let genresResponse = await fetch('get-genres');
    let genres = await genresResponse.json();


    for (let genre of genres) {
        let option = document.createElement('option');
        pageInfo.selectGenre.appendChild(option);
        option.value = genre.id;
        option.textContent = genre.name;
    }
    pageInfo.selectGenre.value = '1';
}


function addEventListeners(){
    pageInfo.selectGenre.addEventListener('change', listActors);
    pageInfo.actorInput.addEventListener('change', listActors);
}


async function listActors(event){
    pageInfo.tBody.innerHTML='';
    let  responseActors = await fetch('/filter-actors', {
        method: 'POST',
        headers: {
                        'Content-Type': 'application/json'
                    },
        body: JSON.stringify({
            'actor': pageInfo.actorInput.value,
            'genreId': pageInfo.selectGenre.value
        })
    })
    let actors = await responseActors.json()

    for (let actor of actors){
        let tr = document.createElement('tr');
        pageInfo.tBody.appendChild(tr);

        let td = document.createElement('td');
        tr.appendChild(td);
        td.textContent = actor['name'];
    }
}
