const pageInfo = {
    tBodyActors: null,
    tBodyShows: null,
}


init()


function init(){
    pageInfo.tBodyActors = document.getElementById('tbody-actors');
    pageInfo.tBodyShows = document.getElementById('tbody-shows');

    insertActors();

}


function addEventListeners(){
    let actors = document.querySelectorAll('.actor');
    for (let actor of actors){
        actor.addEventListener('click',  (event)=>{
            event.preventDefault();
            insertShows(actor.dataset.id);
        })
    }
}


async function insertShows(actorId){
    pageInfo.tBodyShows.innerHTML = '';
    if (pageInfo.tBodyShows.dataset.actorID !== actorId){
        let shows = await getShows(actorId);

        for (let show of shows) {
            let tr = document.createElement('tr');
            pageInfo.tBodyShows.appendChild(tr);

            let td = document.createElement('td');
            tr.appendChild(td);
            td.textContent = show.title;
            td.style.textAlign = 'center';
        }
        pageInfo.tBodyShows.dataset.actorID = actorId;
    }
    else pageInfo.tBodyShows.dataset.actorID = '';
}


async function getShows(actorId){
    let actorsShowsResponse = await fetch('/get-actors-shows',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'actorId': actorId
        })
    })
    let actorsShows = await actorsShowsResponse.json();
    return actorsShows
}


async function insertActors(){
    let actorsResponse = await fetch('/get-actors');
    let actorsArray = await actorsResponse.json();
    for (let actor of actorsArray){
        let tr = document.createElement('tr');
        pageInfo.tBodyActors.appendChild(tr);

        let td = document.createElement('td');
        td.style.textAlign = 'center';
        tr.appendChild(td);

        let anchor = document.createElement('a');
        anchor.classList.add('actor')
        td.appendChild(anchor);
        anchor.dataset.id = actor.id;
        anchor.href = 'https://google.com';
        anchor.textContent = actor.name.split(' ')[0];
    }
    addEventListeners();
}