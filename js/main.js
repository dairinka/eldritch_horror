import ancientsData from '../data/ancients.js';
import difficulties from '../data/difficulties.js';
import greenCardsData from '../data/mythicCards/green/index.js';
import brownCardsData from '../data/mythicCards/brown/index.js';
import blueCardsData from '../data/mythicCards/blue/index.js';


const ancientDeck = [
    {
        id: 'azathoth',
        'greencard': 5,
        'bluecard': 2,
        'brownCard': 9
    },
    {
        id: 'cthulhu',
        'greencard': 4,
        'bluecard': 2,
        'brownCard': 9
    },
    {
        id: 'iogSothoth',
        'greencard': 5,
        'bluecard': 2,
        'brownCard': 9
    },
    {
        id: 'shubNiggurath',
        'greencard': 6,
        'bluecard': 2,
        'brownCard': 8
    }
]

const ancientsList = document.querySelector('.ancients');
const deckTrackerList = document.querySelector('.deck-tracker');
const h2 = document.querySelector('.h2');
const h1 = document.querySelector('.h1');
const btnToStage1 = document.querySelector('.back-stage1');
const btnLevels = document.querySelectorAll('.level');
const difficultiesBlock = document.querySelector('.difficulties');
const btnShuffle = document.querySelector('.shuffle');
const ancientsArr = ['azathoth', 'cthulhu', 'iogSothoth', 'shubNiggurath'];
const firstLi = document.querySelectorAll('.first');
const secondLi = document.querySelectorAll('.second');
const thirdLi = document.querySelectorAll('.third');
const deck = document.querySelector('.decks');
const cardBack = document.querySelector('.card-back');
const currentCard = document.querySelector('.current-card');
let choosenAncient = null;
let levelItem = null;
let i = 0,
    j = 0;
let cardsMatrix = [[],[],[]];
let deckClick = null;
let showCard = 0;
let greenSet = new Set();
let brownSet = new Set();
let blueSet = new Set();
let readyDeck = [
     {
        greenCards:[],
        brownCards:[],
        blueCards:[]
    },
    {
        greenCards:[],
        brownCards:[],
        blueCards:[]
    },
    {
        greenCards:[],
        brownCards:[],
        blueCards:[]
    }
]

   ancientsData.forEach(el =>{
        const ancientLi = document.createElement('li');
        ancientsList.append(ancientLi);
        ancientLi.classList.add('ancient-item');
        ancientLi.style.content = `url("${el.cardFace}")`;
        ancientLi.dataset.value = el.name;
   }) 

const ancients = document.querySelectorAll('.ancient-item');

ancientsList.onclick = function(event){
    let targetItem = event.target;
    targetItem.classList.add('selected');
    choosenAncient = targetItem.dataset.value;
    chooseDifficulty(targetItem);
    btnToStage1.style.visibility = 'visible';
    

   }

difficultiesBlock.onclick = function(event){
    let btn = event.target;
    btnShuffle.style.visibility = 'visible';

    if(!btn.classList.contains("shuffle")){
        levelItem = btn.dataset.value;
    }else{
        btnLevels.forEach(el => {
            el.style.visibility = 'hidden';
        })
        btnShuffle.style.visibility = 'hidden';
        showTracker();
        i = 0;
        j = 0;
        deck.classList.add('active');
        h2.textContent = '';
    }
   
}
    
cardBack.addEventListener('click', () =>{
    deckClick += 1;
    showCard = 0;
    showDeck();
  
})
function showDeck(){
    let index = ancientsArr.indexOf(choosenAncient);
   
   if(i < cardsMatrix.length){
        if(j < cardsMatrix[i].length){
           
            if(cardsMatrix[i][j]==0){
                j++;
                shuffleDeck();
            }else{
                shuffleDeck(); 
            }  
            
            if(showCard == 0){showDeck();}
         
        }else{
            i++;
            j = 0;
            if(showCard == 0){showDeck();}
      
        }
    }
    

}


function shuffleDeck(){
    if(levelItem == 'medium'){
        if(cardsMatrix[i][j]>0){
            if(j==0){
                let randomIndex = randomCard(greenCardsData.length-1); 
                while(greenSet.has(randomIndex)){
                    randomIndex = randomCard(greenCardsData.length-1);
                }
                greenSet.add(randomIndex);
                
                console.log('green', randomIndex);
                currentCard.style.content =`url("${greenCardsData[randomIndex].cardFace}")`;
                showCard += 1;
           
            }
            if(j==1){
                let randomIndex = randomCard(brownCardsData.length-1); 
                while(greenSet.has(randomIndex)){
                    randomIndex = randomCard(brownCardsData.length-1);
                }
                brownSet.add(randomIndex);
                
                console.log('brown', randomIndex);
                currentCard.style.content = `url("${brownCardsData[randomIndex].cardFace}")` ;
                showCard += 1;
            }
            if(j==2){
             
                let randomIndex = randomCard(blueCardsData.length-1); 
                while(greenSet.has(randomIndex)){
                    randomIndex = randomCard(blueCardsData.length-1);
                }
                blueSet.add(randomIndex);
                
                console.log('blue', randomIndex);
                currentCard.style.content = `url("${blueCardsData[randomIndex].cardFace}")`;
                showCard += 1;
            } 
            
            cardsMatrix[i][j] -= 1;
            if(i == 0){
                firstLi[j].textContent -= 1;
           
            }
            if(i == 1){
                secondLi[j].textContent -= 1;
               
            }
            if(i == 2){
                thirdLi[j].textContent -= 1;
               
            }
        
            

        }
        
      
    }
    if(levelItem == 'easy'){
        let greenArray = [];
        let brownArray = [];
        let blueArray = [];
        greenCardsData.forEach(el => {
            if(el.difficulty == 'normal'|| el.difficulty == 'easy'){
                greenArray.push(el.cardFace);
            }
        })
        brownCardsData.forEach(el => {
            if(el.difficulty == 'normal'|| el.difficulty == 'easy'){
                brownArray.push(el.cardFace);
            }
        })
        blueCardsData.forEach(el => {
            if(el.difficulty == 'normal'|| el.difficulty == 'easy'){
               blueArray.push(el.cardFace);
            }
        })
        getCards(greenArray,brownArray, blueArray);
        
    }
    if(levelItem == 'hard'){
        let greenArray = [];
        let brownArray = [];
        let blueArray = [];
        greenCardsData.forEach(el => {
            if(el.difficulty == 'normal'|| el.difficulty == 'hard'){
                greenArray.push(el.cardFace);
            }
        })
        brownCardsData.forEach(el => {
            if(el.difficulty == 'normal'|| el.difficulty == 'hard'){
                brownArray.push(el.cardFace);
            }
        })
        blueCardsData.forEach(el => {
            if(el.difficulty == 'normal'|| el.difficulty == 'hard'){
               blueArray.push(el.cardFace);
            }
        })
        getCards(greenArray,brownArray, blueArray);
        
        
    }
    if(levelItem == 'super-easy'){
        let greenArray = [];
        let brownArray = [];
        let blueArray = [];
        
              
       
        let numberAncient = ancientDeck.findIndex(el => el.id == choosenAncient);
        
        
        while(greenArray.length <= ancientDeck[numberAncient].greencard ){
            greenCardsData.forEach(el => {
                if(el.difficulty == 'easy'){
                    greenArray.push(el.cardFace);
                }
            })
            greenCardsData.forEach(el => {
                if(el.difficulty == 'normal'){
                    greenArray.push(el.cardFace);
                }
            })
        }
        while(brownArray.length <= ancientDeck[numberAncient]['brownCard'] ){
            brownCardsData.forEach(el => {
                if(el.difficulty == 'easy'){
                    brownArray.push(el.cardFace);
                }
            })
            brownCardsData.forEach(el => {
                if(el.difficulty == 'normal'){
                    brownArray.push(el.cardFace);
                }
            })
        }
        while(blueArray.length <= ancientDeck[numberAncient]['bluecard']){
            blueCardsData.forEach(el => {
                if(el.difficulty == 'easy'){
                    blueArray.push(el.cardFace);
                }
            })
            blueCardsData.forEach(el => {
                if(el.difficulty == 'normal'){
                    blueArray.push(el.cardFace);
                }
            })
        }
        getCards(greenArray,brownArray, blueArray);
        
        
    }
    if(levelItem == 'super-hard'){
        let greenArray = [];
        let brownArray = [];
        let blueArray = [];          
        let numberAncient = ancientDeck.findIndex(el => el.id == choosenAncient);
        
        while(greenArray.length <= ancientDeck[numberAncient].greencard ){
            greenCardsData.forEach(el => {
                if(el.difficulty == 'hard'){
                    greenArray.push(el.cardFace);
                }
            })
            greenCardsData.forEach(el => {
                if(el.difficulty == 'normal'){
                    greenArray.push(el.cardFace);
                }
            })
        }

        while(brownArray.length <= ancientDeck[numberAncient]['brownCard'] ){
            brownCardsData.forEach(el => {
                if(el.difficulty == 'hard'){
                    brownArray.push(el.cardFace);
                }
            })
            brownCardsData.forEach(el => {
                if(el.difficulty == 'normal'){
                    brownArray.push(el.cardFace);
                }
            })
        }

        while(blueArray.length <= ancientDeck[numberAncient]['bluecard']){
            blueCardsData.forEach(el => {
                if(el.difficulty == 'hard'){
                    blueArray.push(el.cardFace);
                }
            })
            blueCardsData.forEach(el => {
                if(el.difficulty == 'normal'){
                    blueArray.push(el.cardFace);
                }
            })
        }

        getCards(greenArray,brownArray, blueArray);
    }
}

function getCards(greenCards, brownCards, blueCards){
    if(cardsMatrix[i][j]>0){
        if(j==0){
            let randomIndex = randomCard(greenCards.length-1); 
            while(greenSet.has(randomIndex)){
                randomIndex = randomCard(greenCards.length-1);
            }
            greenSet.add(randomIndex);
            console.log('green', randomIndex);
            currentCard.style.content =`url("${greenCards[randomIndex]}")`;
            showCard += 1;
       
        }

        if(j==1){
            let randomIndex = randomCard(brownCards.length-1); 
            while(brownSet.has(randomIndex)){
                randomIndex = randomCard(brownCards.length-1);
            }
            brownSet.add(randomIndex);
            console.log('brown', randomIndex);
            currentCard.style.content = `url("${brownCards[randomIndex]}")` ;
            showCard += 1;
        }

        if(j==2){
         
            let randomIndex = randomCard(blueCards.length-1);
            while(blueSet.has(randomIndex)){
                randomIndex = randomCard(blueCards.length-1);
            }
            blueSet.add(randomIndex);
            console.log('blue', randomIndex);
            currentCard.style.content = `url("${blueCards[randomIndex]}")`;
            showCard += 1;
        } 

        cardsMatrix[i][j] -= 1;
        if(i == 0){
            firstLi[j].textContent -= 1;
        }
        if(i == 1){
            secondLi[j].textContent -= 1;
        }
        if(i == 2){
            thirdLi[j].textContent -= 1;
        }
    }
   
}

h1.addEventListener('click', () => {
    console.log('greenSet', greenSet);
    console.log('brownSet', brownSet);
    console.log('blueSet', blueSet);
})


function showTracker(){
    let index = ancientsArr.indexOf(choosenAncient);
    deckTrackerList.classList.add('active');

   firstLi.forEach((el, ind) => {
        let color = el.dataset.value;
        let countCards = ancientsData[index].firstStage[color];
        el.textContent = countCards;
        cardsMatrix[0][ind] = countCards;
    }) 
    
    
    secondLi.forEach((el, ind) => {
        let color = el.dataset.value;
        let countCards = ancientsData[index].secondStage[color];
        el.textContent = countCards;
        cardsMatrix[1][ind] = countCards;
    }) 
    
    thirdLi.forEach((el, ind) => {
        let color = el.dataset.value;
        let countCards = ancientsData[index].thirdStage[color];
        el.textContent = countCards;
        cardsMatrix[2][ind] = countCards;
     })  

}


function randomCard(max){
    return Math.round(Math.random() * max);
}

btnToStage1.onclick = function(){
    backStage1();
    btnToStage1.style.visibility = 'hidden';
    btnShuffle.style.visibility = 'hidden';
    deckTrackerList.classList.remove('active');
    deck.classList.remove('active');
    currentCard.style.content = '';
    greenSet.clear();
    brownSet.clear();
    blueSet.clear();
   

}

function chooseDifficulty(selectAncient){
    ancients.forEach(el => {
        if(!el.classList.contains('selected')){
           el.style.display = 'none';
        }
    })
    h2.textContent = 'Choose the difficult level:';
    h2.style.color = '#ffffff';

    btnLevels.forEach(el =>{
        el.style.visibility = 'visible';
    })

    
}

function backStage1(){
    ancients.forEach(el => {
        el.style.display = '';
        el.classList.remove('selected');

    })
    btnLevels.forEach(el =>{
        el.style.visibility = 'hidden';
    })
}

