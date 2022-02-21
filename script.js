'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault()
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(function(curr){
    curr.addEventListener('click',openModal);
})

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});


//Implementing smooth scroll


const learnMore = document.querySelector('.btn--scroll-to');

const section1 = document.querySelector('#section--1')


learnMore.addEventListener('click',function(e){
   
    // let's get the coordinates of the first section

    const s1coords = section1.getBoundingClientRect();
    // This gets the coordinates that is basically relative to the viewport
    console.log(e.target.getBoundingClientRect())

    // To get the current scrolling position 

    console.log(`This is the x(horizontal) scrolling position ${window.pageXOffset} , This is the y(vertical)
     scolling position ${window.pageYOffset}`)

     // To get the height and the width of the viewport
     console.log(`Height: ${document.documentElement.clientHeight}
     Width: ${document.documentElement.clientWidth}`)

     // There are three different ways to implement smooth scrolling

     // window.scrollTo(s1coords.left+window.pageXOffset,s1coords.top+window.pageYOffset);


     // Another way to pass an object to the scroll to function
     /* window.scrollTo(
         {
             left:s1coords.left+window.pageXOffset,
             top: s1coords.top+window.pageYOffset,
             behavior:'smooth',
         }
     )*/

    // Another way ,which is way more modern
    
    section1.scrollIntoView({behavior:'smooth'});
})


let h1= document.querySelector('h1')

h1.addEventListener('mouseenter',function(e){
    alert("Great the add eventlistner has been added to make sure to work on it")
})






































/*
const message  = document.createElement('div');
message.classList.add('cookie-message')
message.innerHTML =`We use cookies to ensure the safety and pricacy of data <button class="btn"> Got it! </button>`

let header = document.querySelector('.header');

header.append(message);


message.style.backgroundColor = "#1256fd"
message.style.width = '120%'*/

