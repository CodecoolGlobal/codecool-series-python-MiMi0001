const pageInfo= {
    tBody : null,
    tHeader : null,
    orderDirection: null,
}


Init();

function Init(){
    pageInfo.tBody = document.getElementById('tbody');
    pageInfo.tHeader = document.getElementById('theader');
    pageInfo.orderDirection = 'DESC';

    addEventListeners();
    insertShows();
}


function addEventListeners(){
        pageInfo.tHeader.addEventListener('click', (event)=> {
            event.preventDefault()
            pageInfo.orderDirection === 'DESC' ? pageInfo.orderDirection = 'ASC' : pageInfo.orderDirection = 'DESC';
            pageInfo.orderDirection === 'DESC' ? pageInfo.tHeader.textContent = 'Title ⇩' : pageInfo.tHeader.textContent = 'Title ⇧';            insertShows();
    })
}


async function insertShows(){
    pageInfo.tBody.innerHTML = '';
    let showsResponse = await fetch('/ordered-shows', {
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'order_dir' : pageInfo.orderDirection
            })
    })
    let shows = await showsResponse.json();

    shows.forEach((show)=>{
        let tr = document.createElement('tr');
        pageInfo.tBody.appendChild(tr);

        let tdTitle = document.createElement('ts');
        tr.appendChild(tdTitle);
        tdTitle.textContent = show.title;

        let tdRating = document.createElement('td');
        tr.appendChild(tdRating);
        tdRating.textContent = show.rating;

    })
}
