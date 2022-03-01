'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const nav = document.querySelector('.nav')

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
 
const navLinks = document.querySelector('.nav__links');


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



// Using event bubbling


nav.addEventListener('click',function(e){
    e.preventDefault();
    let id = e.target.getAttribute('href');
    let section = document.querySelector(`${id}`);
     
    section.scrollIntoView({behavior:'smooth'})
})


// Building a tabbed component

const tabs = document.querySelectorAll('.operations__tab')

const tabsContainer = document.querySelector('.operations__tab-container')

const tabsContent = document.querySelectorAll('.operations__content')


// Using event bubbling and event delegation
tabsContainer.addEventListener('click',function(e){
    
     let clicked = e.target.closest('.operations__tab')

     if(!clicked) return

     tabs.forEach(tab => tab.classList.remove('operations__tab--active'))
     tabsContent.forEach(tab => tab.classList.remove('operations__content--active'))


     clicked.classList.add('operations__tab--active') 
     document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active')
})



// how to highlight the whole area 


let handleOpacity = function(e){
 
  if(e.target.classList.contains('nav__link')){
    let el  = e.target;
    let siblings = el.closest('.nav').querySelectorAll('.nav__link');
    siblings.forEach((child) => {
      if(child !== el){
        child.style.opacity = this
      }
    })
    let logo = document.querySelector('.nav__logo');
    logo.style.opacity = this
      
   }
}

nav.addEventListener('mouseover',handleOpacity.bind(0.5))

nav.addEventListener('mouseout',handleOpacity.bind(1))




// Implement Sticky navigation using Intersection Observer API

const header = document.querySelector('.header')
const navHeight = nav.getBoundingClientRect().height

const obsOpt = {
  root:null,
  threshold: 0,
  rootMargin: `-${navHeight}px`
}

const headerFunc = function(entries){
        entries.forEach((entry) => {
          if(!entry.isIntersecting){
            nav.classList.add('sticky')
          }
          else{
            nav.classList.remove('sticky')
          }
        })
}

const headerObserver = new IntersectionObserver(headerFunc,obsOpt)

headerObserver.observe(header)


// Reveal Sections on scroll

const secOps = {
  root:null,
  threshold:0.15,
}

const secFunc =  function(entries){
      const [entry] =  entries
      if(!entry.isIntersecting)  return
      entry.target.classList.remove('section--hidden')
      secObserver.unobserve(entry.target)
}


// here I need to observe all four sections

const sections = document.querySelectorAll('.section')

const secObserver =  new IntersectionObserver(secFunc,secOps)

sections.forEach((section) => secObserver.observe(section))



// Implementing lazy loading 

// What's supposed to happen 

// First create the intersection observer API

const picOps = {
  root:null,
  threshold:0,
}

const obsFunc = function(entries){
     let [entry] = entries;
     let target =  entry.target
     if(!entry.isIntersecting) return 
     target.src = target.dataset.src;

     target.addEventListener('load',function(){
        target.classList.remove('lazy-img')
     })
}

const picObserver =  new IntersectionObserver(obsFunc,picOps)

// We need to select all the pictures:

const photos = document.querySelectorAll('img[data-src]')

photos.forEach((photo) => picObserver.observe(photo))
console.log(photos)



// implementing the slider component 

// let's select the two buttons or arrows that we use for sliding

const btnRight =  document.querySelector('.slider__btn--right')

const btnLeft = document.querySelector('.slider__btn--left')

// We need to select all the slides 


const slides = document.querySelectorAll('.slide')

// now how the slider is implemented ?

// We use the transform property 


slides.forEach((slide, i) => slide.style.transform = `translateX(${100 * i}%)`)
// We are starting at 0 for the right btn

let currSlide = 0;
let length = document.querySelectorAll('.slide').length
console.log(length)

const goToSlide =  function(currSlide){
  slides.forEach((slide, i) => slide.style.transform = `translateX(${100 * (i - currSlide)}%)`)
}

const nextSlide =  function(){
  if(currSlide === length-1) currSlide =0
  else currSlide++
  goToSlide(currSlide)
}

const prevSlide = function(){
  if(currSlide === 0){
    currSlide = length-1
  }
  else{
    currSlide--
  }
  goToSlide(currSlide)
}

// how to implement the dots 

// select the dots container

const dotsContainer =  document.querySelector('.dots')

const createDots =  function(){
 
  slides.forEach((_,i) => dotsContainer.insertAdjacentHTML('beforeend', `<button class="dots__dot" data-slide=${i}> </button>`))
}


createDots()


btnRight.addEventListener('click', nextSlide)


btnLeft.addEventListener('click',prevSlide)

// Used when we click on the left or right arrows 
document.addEventListener('keydown',function(e){
   if(e.key === 'ArrowRight') nextSlide()
   else if (e.key === 'ArrowLeft') prevSlide()
})

dotsContainer.addEventListener('click',function(e){
  if(e.target.classList.contains('dots__dot')) {
    let {slide} = e.target.dataset
    let childDots = dotsContainer.querySelectorAll('.dots__dot')
  
    childDots.forEach((dot) => dot.classList.remove('dots__dot--active'))
    e.target.classList.add('dots__dot--active')
   
    
    goToSlide(slide)
  }
})

/*
let h1= document.querySelector('h1')

const h1Alert = function(e){
    alert("Great the add eventlistner has been added to make sure to work on it")
}



h1.addEventListener('mouseenter', h1Alert)

// This is used to remove the eventListner function
setTimeout(()=>h1.removeEventListener('mouseenter',h1Alert),3000)

*/



/*

// that's the whole nav
const nav = document.querySelector('.nav__links');

// that's the link itself
const links = document.querySelectorAll('.nav__link')

const items = document.querySelectorAll('.nav__item')


let randomColor = () => Math.trunc((Math.random() * 255 )+1)



This is an example of how event bubbling works

links.forEach((link) => link.addEventListener('click',function(e){
     e.preventDefault();
    let color = `rgb(${randomColor()},${randomColor()},${randomColor()})`
    this.style.backgroundColor =color
}))

nav.addEventListener('click',function(){
  let color = `rgb(${randomColor()},${randomColor()},${randomColor()})`
  this.style.backgroundColor =color
}) */





/* The normal way of it 

const links = document.querySelectorAll('.nav__link')

links.forEach((link) => link.addEventListener('click',function(e){
  e.preventDefault();
  let id = this.getAttribute('href');
  let section = document.querySelector(`${id}`)

  section.scrollIntoView({behavior:'smooth'})
}))
*/






























/*
const message  = document.createElement('div');
message.classList.add('cookie-message')
message.innerHTML =`We use cookies to ensure the safety and pricacy of data <button class="btn"> Got it! </button>`

let header = document.querySelector('.header');

header.append(message);


message.style.backgroundColor = "#1256fd"
message.style.width = '120%'*/

