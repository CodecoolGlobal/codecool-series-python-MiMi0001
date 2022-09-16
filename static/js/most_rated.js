console.log('Hi!');
const pageElements = {
    tableBody : null,
    pageNavDiv  : null,
    pageLinks : null,
    showsCount : null,
    pageCount : null,
    origLinkColor : null,
}


initPage();


async function initPage(){
    pageElements.tableBody = document.getElementById('tbody');
    pageElements.pageNavDiv = document.getElementById('page-navigation')
    pageElements.showsCount = await getShowsCount();
    pageElements.pageCount = Math.ceil(pageElements.showsCount / 15);

    createPageNav()

    pageElements.pageLinks = document.querySelectorAll('.page-links');
    pageElements.origLinkColor = pageElements.pageLinks[0].style.color;

    addEventListeners();

    insertShowRows(0);

};


async function getShowsCount(){
    let countResult = await fetch('/count-shows');
    let countObj = await countResult.json();
    return countObj.count;
}


function createPageNav(){
    let prev = document.createElement('a');
    prev.classList.add('page-links');
    prev.dataset.page = 'prev';
    prev.href = 'https://google.com';
    prev.textContent = '<<';
    pageElements.pageNavDiv.appendChild(prev);

    for (let i=1; i<=pageElements.pageCount; i++){
        let anchor = document.createElement('a');
        anchor.classList.add('page-links');
        anchor.dataset.page = i;
        anchor.textContent = ` ${i} `;
        anchor.href = 'https://google.com';
        pageElements.pageNavDiv.appendChild(anchor);
    }

    let next = document.createElement('a');
    next.classList.add('page-links');
    next.dataset.page = 'next';
    next.href = 'https://google.com';
    next.textContent = '>>';
    pageElements.pageNavDiv.appendChild(next);
}


function resetNavsColor(){
    for (let link of pageElements.pageLinks) {
        link.style.color = pageElements.origLinkColor;
    }
}


function addEventListeners(){
    for (let link of pageElements.pageLinks){
        link.addEventListener('click', (event) => {
            event.preventDefault();

            if ( event.target.dataset.page == 'next' || event.target.dataset.page == 'prev' ){
                let offset = +pageElements.tableBody.dataset.offset;
                if (event.target.dataset.page == 'prev'){
                    if (offset >= 15){
                        offset -= 15;
                        pageElements.tableBody.dataset.offset = offset;
                        insertShowRows(offset);
                    }
                }
                else if (event.target.dataset.page == 'next'){
                    if (offset <= pageElements.showsCount-15){
                        offset += 15;
                        pageElements.tableBody.dataset.offset = offset;
                        insertShowRows(offset);
                    }
                }
            }
            else {
                let offset = ((event.target.dataset.page) - 1) * 15;
                pageElements.tableBody.dataset.offset = offset;
                insertShowRows(offset);
            }
        })
    }
}


async function insertShowRows(offset){

    pageElements.tableBody.dataset.offset = offset;
    pageElements.tableBody.dataset.page = Math.trunc( (offset+15)/15 );

    resetNavsColor();
    pageElements.pageLinks[pageElements.tableBody.dataset.page].style.color = 'red';

    let showRows = document.querySelectorAll('.show-row');
    let i = 1;
    for (let row of showRows){
        setInterval(()=> {
            row.remove();
        }, i*15);
        i++;
    }

    let showsResult = await fetch('/get-shows', {
            'method': 'POST',
            headers: {
                        'Content-Type': 'application/json'
                    },
            body: JSON.stringify({'offset': offset})
        });
    let showsArray = await showsResult.json();

    i = 1;
    for (let show of showsArray){
        let tr = document.createElement('tr');
        tr.classList.add('show-row');

        let tdA = document.createElement('td');
        tr.appendChild(tdA);
        tdA.textContent = show['title'];

        let tdB = document.createElement('td');
        tr.appendChild(tdB);
        tdB.textContent = show['year'];

        let tdC = document.createElement('td');
        tr.appendChild(tdC);
        tdC.textContent = `${show['runtime']} min`;

        let tdD = document.createElement('td');
        tr.appendChild(tdD);
        tdD.textContent = (+show['rating']).toFixed(1);

        let tdE = document.createElement('td');
        tr.appendChild(tdE);
        tdE.textContent = show['genres'];

        if (show['trailer'] === null) {
            let tdF = document.createElement('td');
            tr.appendChild(tdF);
            tdF.textContent = `No URL`;
        }
        else {
            let tdF = document.createElement('td');
            tr.appendChild(tdF);
            let anchorF = document.createElement('a');
            tdF.appendChild(anchorF);
            anchorF.href= show['trailer']
            anchorF.textContent = 'View trailer';
        }

        if (show['homepage'] === null) {
            let tdG = document.createElement('td');
            tr.appendChild(tdG);
            tdG.textContent = `No URL`;
        }
        else {
            let tdG = document.createElement('td');
            tr.appendChild(tdG);
            let anchorG = document.createElement('a');
            tdG.appendChild(anchorG);
            anchorG.href= show['homepage']
            anchorG.textContent = 'View homepage';
        }

        setTimeout(()=>{
            pageElements.tableBody.appendChild(tr);
        }, i*100);
        i++;
    }

}