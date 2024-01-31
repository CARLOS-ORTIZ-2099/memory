const containerGame = document.querySelector('.container-game')
const ids = []
const acc = []
let cards
const images = [{id :1, at: 'a', src :'./images/aorus.JPG', description : 'some description'},
{id :1,at: 'b', src :'./images/aorus.JPG', description : 'some description'},
{id :2, at: 'c',src :'./images/centellaAORUS.jpg', description : 'some description'},
{id :2,at: 'd' ,src :'./images/centellaAORUS.jpg', description : 'some description'},
{id :3,at: 'e' ,src :'./images/cuarto-aorus.JPG', description : 'some description'},
{id :3, at: 'e' ,src :'./images/cuarto-aorus.JPG', description : 'some description'}

]


function randomPosition() {
    return Math.random() - 0.5
}

document.addEventListener('DOMContentLoaded', (e) => {
    let info = ''
    images.sort(randomPosition)
    images.forEach((image) => {
        info+= `
            <div data-at = ${image.at}  id = ${image.id} class ='card hidden' >
                <h1>${image.id}</h1>
                <img class ='hidden' src=${image.src} alt="">
            </div>
        `
    })
    containerGame.innerHTML = info
    cards = document.querySelectorAll('.card')
    cards.forEach((card, index) => {
        card.addEventListener('click',(e) =>  eventCard(e,index))
    })
})


function eventCard(e, index) {
    if(ids.some((ele) => ele.index == index) || acc.some((ele) => ele.id === e.target.id)){
        return
    }
    ids.push({id : e.target.id, index})
    console.log(ids);
    const bol = e.target.classList.contains('hidden')
    bol? e.target.classList.remove('hidden') : ''

    if(ids.length === 2){
        test()
    }
}

function test() {
    if(ids[0].id == ids[1].id ){
        alert('son iguales')
        acc.push(ids[0], ids[1])
        console.log(acc);
        ids.splice(0, ids.length)
    }else{
        console.log(ids);
        cards[ids[0].index].classList.add('hidden')
        cards[ids[1].index].classList.add('hidden')
        ids.splice(0, ids.length)
    }

}

