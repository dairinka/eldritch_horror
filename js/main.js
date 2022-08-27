import ancientsData from '../data/ancients.js';
import difficulties from '../data/difficulties.js';
import greenCardsData from '../data/mythicCards/green/index.js';
import brownCardsData from '../data/mythicCards/brown/index.js';
import blueCardsData from '../data/mythicCards/blue/index.js';

// const levels = [
//     { 
//         id: 'super easy',
         

//     'easy': ,
//     'medium': ,
//     'hard': ,
//     'super hard':
// ]
const ancientDesk = [
    {
        id: 'azathoth',
        greencard: 5,
        bluecard: 2,
        brownCard: 9
    }
    {
        id: 'cthulhu',
        greencard: 4,
        bluecard: 2,
        brownCard: 9
    }
    {
        id: 'iogSothoth',
        greencard: 5,
        bluecard: 2,
        brownCard: 9
    }
    {
        id: 'shubNiggurath',
        greencard: 6,
        bluecard: 2,
        brownCard: 8
    }
]
const ancientsList = document.querySelector('.ancients');
const difficultiesList = document.querySelector('.difficulties');
const deckTrackerList = document.querySelector('.deck-tracker');
const decksList = document.querySelector('.decks');
const h2 = document.querySelector('.h2');
const btnToStage1 = document.querySelector('.back-stage1');
const btnLevels = document.querySelectorAll('.level');
const difficultiesBlock = document.querySelector('.difficulties')
let choosenAncient = null;
let levelItem = null;

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
   levelItem = event.target;
   
}


btnToStage1.onclick = function(){
    backStage1();
    btnToStage1.style.visibility = 'hidden';
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

