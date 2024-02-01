import {images} from './helpers/images.js' 
const tiempoContainer = document.querySelector('.tiempo-container')
const containerGame = document.querySelector('.container-game')
const btnCompetition = document.querySelector('.btn-competition')
const  btnCompetitionCancel = document.querySelector('.btn-competition-cancel')
const btnWinner = document.querySelector('.btn-winner')
const btnPlay = document.querySelector('.btn-play')
const capa = document.querySelector('.capa')
btnCompetitionCancel.disabled = true

let peers = []
let acc = []
let dataPlayers = []
let cards
let tiempoDeJuego = 0;
let intervalo;
let answer

function randomPosition() {
    return Math.random() - 0.5
}

document.addEventListener('DOMContentLoaded', render )
// primero a ejecutar
function render() {
    acc.splice(0, acc.length)
    btnPlay.classList.add('hidden-btn')
        let info = ''
        images.sort(randomPosition)
        images.forEach((image) => {
            info+= `
                <div data-at = ${image.at}  id = ${image.id} class ='card hidden' >
                    <img class ='' src=${image.src} alt="">
                </div>
            `
        })
        containerGame.innerHTML = info
        cards = document.querySelectorAll('.card')
        cards.forEach((card, index) => {
            card.addEventListener('click',(e) =>  eventCard(e,index))
        })
}

// segundo a ejecutar
btnCompetition.addEventListener('click', (e) => {
    answer = parseFloat(prompt('cuantos competiran? minimo 2 maximo 10'))
    console.log(answer);
    while(isNaN(answer) || answer < 2 || answer > 10 ){
      answer =  parseFloat( prompt('elige un numero permitido'))
    }
    btnPlay.classList.remove('hidden-btn')
    btnPlay.textContent =  'play'
    btnCompetition.disabled = true
    btnCompetitionCancel.disabled = false
})


// tercero a ejecutar
btnPlay.addEventListener('click', (e) => {
    console.log('entro');
    intervalo = setInterval(() => {
        tiempoDeJuego++;
  
        const horas = Math.floor(tiempoDeJuego / 3600);
  
        const minuto = Math.floor((tiempoDeJuego / 60) % 60);
  
        const segundos = Math.floor(tiempoDeJuego % 60);
  
        tiempoContainer.textContent = `${horas}H ${minuto}M ${segundos}S`;
        /* tiempoContainer.style.fontSize = "2em";
        tiempoContainer.style.color = "cyan"; */
    }, 1000);
      btnPlay.classList.add('hidden-btn')
      deleteCapa('capa', 'newCapa')
})


// cuarto a ejecutar
// eliminamos la capa
function deleteCapa(currentValue, newvalue) {
    if(capa.classList.contains(currentValue)){
        capa.classList.remove(currentValue)
        capa.classList.add(newvalue)
    }
}


// quinto a ejecutar
function eventCard(e, index) {
    if(peers.some((ele) => ele.index == index) || acc.some((ele) => ele.index === index)){
        return
    }
    if(peers.length >=2){
        return
    }
    peers.push({id : e.target.id, index})
    console.log(peers);
    const bol = e.target.classList.contains('hidden')
    bol? e.target.classList.remove('hidden') : ''

    if(peers.length === 2){
        test()
        acc.length === images.length ? eventReset() : ''
    }
}

// sexto a ejecutar
function test() {
    if(peers[0].id == peers[1].id ){
       // alert('son iguales')
        acc.push(peers[0], peers[1])
        console.log(acc);
        peers.splice(0, peers.length)
    }else{
        console.log(peers);
        setTimeout(() => {
            cards[peers[0].index].classList.add('hidden')
            cards[peers[1].index].classList.add('hidden')
            peers.splice(0, peers.length)
        }, 1000)
    }

}



// septimo a ejecutar
function eventReset(){
    alert('has acabado el juego')
    clearInterval(intervalo)
    btnPlay.classList.remove('hidden-btn')
    dataPlayers.length < answer ? btnPlay.textContent = 'next player' : 'play'
    dataPlayers.push({id:dataPlayers.length+1, time :tiempoDeJuego })
    tiempoDeJuego = 0
    console.log('entro a reset');
     // Eliminar el manejador de eventos anterior antes de agregar uno nuevo
     btnPlay.removeEventListener('click', render);
     btnPlay.addEventListener('click', render);
   

    console.log(dataPlayers);
    if(dataPlayers.length === answer){
        result()
    }
}

// octavo a ejecutar
function result() {
    alert('ha acabado')
    btnPlay.classList.add('hidden-btn')
    btnWinner.classList.remove('hidden-btn')
    btnWinner.addEventListener('click', winner)
    btnCompetitionCancel.disabled = true
}

// noveno a ejecutar

function winner() {
    // determinando el ganador mediante selectionSort
    for(let i = 0; i < dataPlayers.length; i++){
        let minIndex = i
        for(let j = i+1; j < dataPlayers.length; j++){
            if(dataPlayers[minIndex].time > dataPlayers[j].time){
                minIndex = j
            } 
        }
        let tempo = dataPlayers[i]
        dataPlayers[i] = dataPlayers[minIndex]
        dataPlayers[minIndex] = tempo
    }
    console.log(dataPlayers);
    alert(`ha ganado el jugador ${dataPlayers[0].id}`)
    btnWinner.classList.add('hidden-btn')
    btnCompetition.disabled = false
    dataPlayers.splice(0, dataPlayers.length)
    deleteCapa('newCapa', 'capa')
}

btnCompetitionCancel.addEventListener('click',(e) => {
    render()
    clearInterval(intervalo)
    tiempoDeJuego = 0
    tiempoContainer.innerHTML = ''
    btnCompetitionCancel.disabled = true
    btnCompetition.disabled = false
    peers = []
    acc = []
    dataPlayers = []
    deleteCapa('newCapa', 'capa')
})

