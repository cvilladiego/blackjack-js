/**
 * 2C = Two of Clubs (Tréboles)
 * 2D = Two of Diaminds (Diamantes)
 * 2H = Two of Hearts (Corazones)
 * 2S = Two of Spades (Espadas)
 */



// PATRON MODULO
(()=>{
    
    'use strict'
    
/**Variables Globales */
let deck = [];
const tipos = ['C', 'D', 'H', 'S'],
      especiales = ['A', 'J', 'Q', 'K'];

let PuntosJugador = 0,
    puntosComputadora = 0;

/**REFERENCIAS DEL HTML */
const btnPedirCarta = document.querySelector('#btnPedirCarta'),
      btnPlantarse = document.querySelector('#btnPlantarse'),
      btnNuevoJuego = document.querySelector('#btnNuevo'),
      puntuacionTotal = document.querySelectorAll('small'),
      divJugador = document.querySelector('#jugador'),
      divComputadora = document.querySelector('#computadora');

/**esta funcion crea una nueva baraja */
const crearDeck = ()=>{
    for(let i = 2; i <= 10; i++){
       for(let tipo of tipos){
        deck.push(i+tipo)
       } 
    }

    for(let tipo of tipos){
        for(let especial of especiales){
            deck.push(especial + tipo);
        }
    }
   
    deck = _.shuffle(deck);
    //console.log(deck);
}

crearDeck();

/** FUNCION PARA TOMAR UNA CARTA*/
const pedirCarta = ()=>{
    if(deck.length === 0){
        throw 'No hay cartas para mostrar';
    }
    const carta = deck.pop();
    return carta;
}

//pedirCarta();
const valorCarta = (carta)=>{
    const valor = carta.substring(0, carta.length -1);
    //|2 = 2 |3 = 3| 10 = 10|
    return (isNaN(valor)) ? 
            (valor === 'A') ? 11 : 10
            : valor * 1;
}

/**TURNO DE LA COMPUTADORA */
const turnodelaComputadora = (puntosdDelJugador)=>{
    do{
    const carta = pedirCarta();
    puntosComputadora = puntosComputadora + valorCarta(carta);
    puntuacionTotal[1].innerHTML = puntosComputadora;

    /**Inserto la carta en el div de la computadora*/
   const imgCarta = document.createElement('img');
   imgCarta.src =`assets/${carta}.png`;
   imgCarta.classList.add('carta');
   divComputadora.append(imgCarta);
   if(puntosdDelJugador > 21){
        break;
   }
    }while( (puntosComputadora < puntosdDelJugador) && (puntosdDelJugador <= 21) );
    setTimeout(()=>{
        if(puntosComputadora === puntosdDelJugador){
            alertify.alert('Ganador', 'Empate!', function(){ alertify.success('Ok'); });
        }else if( puntosdDelJugador > 21 ){
            alertify.alert('Ganador', 'Gano la computadora!');

        }else if(puntosComputadora > 21){
            alertify.alert('Ganador', 'Gano el jugador 1!');
        }else{
            alertify.alert('Ganador', 'Gano la computadora!');
        }

    },250);
    

}

/**EVENTOS */
btnPedirCarta.addEventListener('click', ()=>{
   const carta = pedirCarta();
   PuntosJugador = PuntosJugador + valorCarta(carta);
   puntuacionTotal[0].innerHTML = PuntosJugador;
 
   
    /**Inserto la carta en el div del jugador*/
   const imgCarta = document.createElement('img');
   imgCarta.src =`assets/${carta}.png`;
   imgCarta.classList.add('carta');
   divJugador.append(imgCarta);

   if(PuntosJugador > 21){
    console.warn('Lo siento has perdido');
    console.warn('Gano la computadora')
    btnPedirCarta.setAttribute('disabled', true);
    btnPlantarse.setAttribute('disabled', true);
    turnodelaComputadora(PuntosJugador);
    
   }else if(PuntosJugador === 21){
    btnPedirCarta.setAttribute('disabled', true);
    btnPlantarse.setAttribute('disabled', true);
    turnodelaComputadora(PuntosJugador);
    console.warn('21, Genial!!');

   }
});

/**al presionar el boton stop */
btnPlantarse.addEventListener('click', ()=>{
    if(PuntosJugador === 0){
        alert('Debes pedir al menos una carta para poder plantarse');
    }else{
        btnPedirCarta.setAttribute('disabled', true);
        btnPlantarse.setAttribute('disabled', true);
        turnodelaComputadora(PuntosJugador);
    }
});

btnNuevoJuego.addEventListener('click', ()=>{
   console.clear();
   deck = [];
   crearDeck();
   puntosComputadora = 0;
   PuntosJugador = 0;
   puntuacionTotal[0].innerHTML = 0;
   puntuacionTotal[1].innerHTML = 0;
   btnPedirCarta.removeAttribute('disabled');
   btnPlantarse.removeAttribute('disabled');
   divComputadora.innerHTML = '';
   divJugador.innerHTML = '';
});
   

})()


