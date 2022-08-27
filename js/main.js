import ancientsData from '../data/ancients.js';
import difficulties from '../data/difficulties.js';

// playList.forEach(el => {
    //     const li = document.createElement('li');
    //     blockForPlayList.append(li);
    //     li.classList.add('play-item');
    //     li.textContent = el.title;
        
    //   })
const ancientsList = document.querySelector('.ancients');
const difficultiesList = document.querySelector('.difficulties');
const deckTrackerList = document.querySelector('.deck-tracker');
const decksList = document.querySelector('.decks');
let choosenAncient = null;

   ancientsData.forEach(el =>{
        const ancientLi = document.createElement('li');
        ancientsList.append(ancientLi);
        ancientLi.classList.add('ancient-item');
        ancientLi.style.content = `url("${el.cardFace}")`;
        ancientLi.dataset.value = el.name;
   }) 
ancientsList.onclick = function(event){
    let targetItem = event.target;
    if()
    choosenAncient = targetItem.dataset.value;
   
   }

//    table.onclick = function(event) {
//     let target = event.target; // де відбувся клік?
  
//     if (target.tagName != 'TD') return; // не на TD? Тоді нас не цікавить
  
//     highlight(target); // виділити TD
//   };

