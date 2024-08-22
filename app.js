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

function enrichAnimal(animalName) {
  if (bank >= 50) {
    bank -= 50
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
  bank += calculatePaycheck()
  console.log('💰', bank);
  drawBank()
}

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
  let paycheck = calculatePaycheck()
  paycheckElm.innerText = paycheck.toString()
}

drawBank()

function checkForGameOver() {
  if (gameOver) return// if the game is already over, just leave this function
  let dead = true
  zooAnimals.forEach((animal) => {
    if (animal.status != '😵') { dead = false }
  })
  console.log('all dead:', dead);
  if (dead) {
    gameOver = true
    setTimeout(() => {
      alert("All the animals are dead, you will never financially recover")
    }, 50)
  }
}



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