console.log("Time To zoo keep");
// let time = Math.random() * 20000

const zooAnimals = [
  {
    name: 'Jerry',
    emoji: '🦒',
    hunger: 100,
    status: '😊',
    enrichment: false
  },
  {
    name: 'Slappy',
    emoji: '🦭',
    hunger: 100,
    status: '😊',
    enrichment: false
  },
  {
    name: 'Reginald',
    emoji: '🐅',
    hunger: 100,
    status: '😊',
    enrichment: false
  }
]

let bank = 500
let gameOver = false


function animalsHunger() {
  // console.log('😋🍝');
  // loop over the animals
  // animal is ONE animal from the zooAnimals array
  // perform the same actions FOR EACH animal
  zooAnimals.forEach((animal) => {
    if (animal.enrichment == true) {
      animal.hunger -= 1
    } else {
      animal.hunger -= 3
    }
    if (animal.hunger < 0) { animal.hunger = 0 }
  })
  updateAnimalsStatus()
  drawAnimalsStats()
  checkForGameOver()
}

function drawAnimalsStats() {
  // updateAnimalsStatus()
  // NOTE iterate through the animals. Use their name to select an element off a page.
  // we can used that element to draw the animals data back into.
  zooAnimals.forEach((animal) => {
    let animalElm = document.getElementById(animal.name)
    // console.log(document, animalElm);
    let statsElm = animalElm.querySelector('.stats')
    let spriteElm = animalElm.querySelector('.animal')
    // console.log('📈', statsElm);
    statsElm.innerHTML = `<span>${animal.name} | ${animal.hunger} | ${animal.status}</span>`
    if (animal.status == '😵') {
      spriteElm.classList.add('perished')
      let marquee1 = animalElm.querySelector('marquee')
      let marquee2 = animalElm.querySelector('marquee>marquee')
      marquee1.stop()
      marquee2.stop()
    }
    if (animal.enrichment == true) {
      spriteElm.classList.add('enriched')
    } else {
      spriteElm.classList.remove('enriched')
    }

  })
}


// NOTE this functions takes in an animal name, passed from the button click in the HTML
//  animalName will = 'Jerry' or 'Splappy' or 'Reginald'
function feedAnimal(animalName) {
  console.log('🍗', animalName);
  let animalToFeed = zooAnimals.find((animal) => animal.name == animalName)
  // if (animalToFeed.status == '😵') return // this cuts the function early
  if (animalToFeed.status != '😵') {
    console.log('😫', animalToFeed);
    animalToFeed.hunger += 3
    if (animalToFeed.hunger > 100) { animalToFeed.hunger = 100 }
    updateAnimalsStatus()
    drawAnimalsStats()
  }
}

// NOTE this functions takes in an animal name, passed from the button click in the HTML
//  animalName will = 'Jerry' or 'Splappy' or 'Reginald'
function enrichAnimal(animalName) {
  if (bank >= 50) {
    bank -= 50
    // NOTE to read this line in more plain english
    // I want a ⬇️ = look through zooAnimals, find an animal, where (=>) their name is equal (==) to 'Jerry' ('Jerry') coming from the button press in the html
    let animalToEnrich = zooAnimals.find((animal) => animal.name == animalName)
    console.log('🥂', animalToEnrich);
    animalToEnrich.enrichment = true
    setTimeout(() => animalToEnrich.enrichment = false, 10000)
    drawBank()
  } else {
    alert(`Take your broke butt home. Come back once you have ${50 - bank} more dollars`)
  }
}

function updateAnimalsStatus() {
  zooAnimals.forEach((animal) => {
    if (animal.hunger > 60) {
      animal.status = '😊'
    } else if (animal.hunger > 30) {
      animal.status = '😐'
    } else if (animal.hunger > 0) {
      animal.status = '😖'
    } else {
      animal.status = '😵'
    }
  })
  drawPaycheck()
}


function getPaid() {
  // zooAnimals.forEach((animal) => bank += 10)
  bank += calculatePaycheck() // STUB get the magic number
  console.log('💰', bank);
  drawBank()
}

//NOTE This adds up how much money you will make, and RETURNS it to the caller.
// that means this function doesn't modify anything, it just gives us a magic number we can use else where
function calculatePaycheck() {
  let paycheck = 0
  zooAnimals.forEach((animal) => {
    if (animal.hunger > 0) {
      if (animal.status == '😊') {
        paycheck += 10
      } else if (animal.status == '😐') {
        paycheck += 6
      } else if (animal.status == '😖') {
        paycheck += 3
      } else {
        paycheck -= 5
      }
    }
  })
  console.log('💵', paycheck);
  return paycheck
}

function drawBank() {
  const bankElm = document.getElementById('bank')
  bankElm.innerText = bank.toString()
}

function drawPaycheck() {
  const paycheckElm = document.getElementById('paycheck')
  let paycheck = calculatePaycheck() // STUB get the magic number
  paycheckElm.innerText = paycheck.toString()
}

drawBank()

function checkForGameOver() {
  if (gameOver) return// if the game is already over, just leave this function
  // Create a 'flag' assuming they are all dead
  let dead = true
  zooAnimals.forEach((animal) => {
    if (animal.status != '😵') { dead = false } // if one is not, flip flag to false
  })
  console.log('all dead:', dead);
  if (dead) { // if the flag was never flipped, the game is over
    gameOver = true
    // NOTE setTimeout, delays the running of the instructions by a delay in milliseconds
    setTimeout(() => {
      alert("All the animals are dead, you will never financially recover")
    }, 50)
  }
}

// NOTE setInterval takes in 'instructions', and performs those instructions with a delay of milliseconds between each call.
// setInterval(() => console.log('hellow'), 1000)
setInterval(animalsHunger, 450)

setInterval(getPaid, 10000)


// function randTimeOut() {
//   let time = Math.random() * 5000
//   console.log('d🎲', time);
//   setTimeout(randTimeOut, time)
// }
// randTimeOut()

function rightClick() {
  console.log('right click', event);
  event.preventDefault() // stop the default from happening
  console.log('🐁', event.screenX, event.screenY);
  const targetElm = document.getElementById('target')
  targetElm.style.top = `${event.clientY}px`
  targetElm.style.left = `${event.clientX}px`
  targetElm.innerHTML = `<span class="disappear">🎯</span>`
}


setTimeout(() => console.log('delayed'), 5000)