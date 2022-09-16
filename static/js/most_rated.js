console.log('Hi!');
const pageInfo = {
    tableBody : null,
    navContainer  : null,
    navLinks : null,
    
    origLinkColor : null,
    
    showsCount : null,
    pageCount : null,
    currentPage : null,
    offset : null,
}


initPage();


async function initPage(){

    pageInfo.tableBody = document.getElementById('tbody');
    pageInfo.navContainer = document.getElementById('page-navigation')

    pageInfo.showsCount = await getShowsCount();
    pageInfo.pageCount = Math.ceil(pageInfo.showsCount / 15);
    pageInfo.currentPage = 1;

    createPageNav();

    pageInfo.pageLinks = document.querySelectorAll('.page-links');
    pageInfo.origLinkColor = pageInfo.pageLinks[0].style.color;

    setPageLinksColor();

    addEventListeners();

    pageInfo.offset = 0;
    insertShowRows();

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
    pageInfo.navContainer.appendChild(prev);

    for (let i= 1; i<=5; i++){
        let anchor = document.createElement('a');
            anchor.classList.add('page-links');
            anchor.dataset.page = i;
            anchor.textContent = ` ${i} `;
            anchor.href = 'https://google.com';
            pageInfo.navContainer.appendChild(anchor);
        }

    let next = document.createElement('a');
    next.classList.add('page-links');
    next.dataset.page = 'next';
    next.href = 'https://google.com';
    next.textContent = '>>';
    pageInfo.navContainer.appendChild(next);
}


function addEventListeners(){

    for (let link of pageInfo.pageLinks){
        link.addEventListener('click', (event) => {
            event.preventDefault();

            if ( event.target.dataset.page == 'next' || event.target.dataset.page == 'prev' ){
                if (event.target.dataset.page == 'prev'){
                    if (pageInfo.offset >= 15) pageInfo.offset -= 15;
                }
                else if (event.target.dataset.page == 'next'){
                    if (pageInfo.offset <= pageInfo.showsCount-15) pageInfo.offset += 15;
                }
            }
            else pageInfo.offset = ((event.target.dataset.page) - 1) * 15;

            pageInfo.currentPage = Math.trunc( (pageInfo.offset+15)/15 );
            insertShowRows();
            reFormatLinks();
        })
    }

}


async function insertShowRows(){

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
            body: JSON.stringify({'offset': pageInfo.offset})
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
            pageInfo.tableBody.appendChild(tr);
        }, i*100);
        i++;
    }
}


function reFormatLinks(){
    let startNum= 0;

    if (pageInfo.currentPage == 1) startNum = 1;
    if (pageInfo.currentPage == 2) startNum = 1;
    if (pageInfo.currentPage >=3 && pageInfo.currentPage <= pageInfo.pageCount-2) startNum = pageInfo.currentPage - 2;
    if (pageInfo.currentPage == pageInfo.pageCount-1) startNum = pageInfo.currentPage-3;
    if (pageInfo.currentPage == pageInfo.pageCount) startNum = pageInfo.currentPage-4;

    let i = startNum;
    for (let link of pageInfo.pageLinks) {
        if (link.dataset.page != 'next' && link.dataset.page != 'prev') {
            link.textContent = ` ${i} `;
            link.dataset.page = i;
            i++;
        }
    }

    setPageLinksColor();
}


function setPageLinksColor(){
    for (let link of pageInfo.pageLinks) {
        +link.dataset.page === pageInfo.currentPage ? link.style.color = 'red' : link.style.color = pageInfo.origLinkColor;
        if (link.dataset.page === 'prev'){
            pageInfo.currentPage === 1 ? link.hidden = true : link.hidden = false;
        }
        if (link.dataset.page === 'next'){
            pageInfo.currentPage === pageInfo.pageCount ? link.hidden = true : link.hidden = false;
        }
    }
}
