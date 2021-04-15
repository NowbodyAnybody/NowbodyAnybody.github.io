class Card {
  constructor(type, color, value, hidden) {
    this.type = type;
    this.value = value;
    this.hidden = hidden;
    this.color = color;
  }
}


let deck = [];

for (let i = 1; i <= 13; i++) {
  deck.push(new Card("heart", "red", i, true));
  deck.push(new Card("spade", "black", i, true));
  deck.push(new Card("diamond", "red", i, true));
  deck.push(new Card("club", "black", i, true));
}

var cardWidth = window.screen.width / (7 + 7 * 0.1);
var cardHeight = window.screen.height/(2 + 19*1/6);

if(cardHeight*0.618 > cardWidth){
  cardHeight = cardWidth*1.618
}
else{
  cardWidth = cardHeight*0.618
}
let leftOffset = (window.screen.width-(7 + 7 * 0.1)*cardWidth)/2;

cardHeight = Math.floor(cardHeight);
cardWidth = Math.floor(cardWidth);
leftOffset = Math.floor(leftOffset);




var htmlCards = [];
var clickedCards = [];

var offsetX = 0;
var offsetY = 0;



// columns: first, second, third, fourth, fifth, sisxth, seventh, stack, open stack, first ace, second ace, third ace, fourth ace
var columns = new Array(new Array());


columns.push(new Array());
columns.push(new Array());
columns.push(new Array());
columns.push(new Array());
columns.push(new Array());
columns.push(new Array());
columns.push(new Array());

columns.push(new Array());
columns.push(new Array());

columns.push(new Array());
columns.push(new Array());
columns.push(new Array());
columns.push(new Array());



var firstColumn = [];
var secondColumn = [];
var thirdColumn = [];
var fourthColumn = [];
var fifthColumn = [];
var sixthColumn = [];
var seventhColumn = [];

var stack = [];
var open;


var startingColumn;
var startingIndex = 0;


shuffleCards();
renderCards();

function shuffleCards() {
  console.log("shuffling");
  let suffledDeck = shuffle(deck);
  setupField(suffledDeck);
}

function setupField(cards) {
  // 24 cards in staple
  // 28 cards on board
  columns[0] =[];
  columns[1] =[];
  columns[2] =[];
  columns[3] =[];
  columns[4] =[];
  columns[5] =[];
  columns[6] =[];
  columns[7] =[];
  columns[9] =[];
  columns[10] =[];
  columns[11] =[];
  columns[12] =[];


  columns[0].push(cards[0]);

  columns[1].push(cards[1]);
  columns[1].push(cards[2]);

  columns[2].push(cards[3]);
  columns[2].push(cards[4]);
  columns[2].push(cards[5]);

  columns[3].push(cards[6]);
  columns[3].push(cards[7]);
  columns[3].push(cards[8]);
  columns[3].push(cards[9]);

  columns[4].push(cards[10]);
  columns[4].push(cards[11]);
  columns[4].push(cards[12]);
  columns[4].push(cards[13]);
  columns[4].push(cards[14]);


  columns[5].push(cards[15]);
  columns[5].push(cards[16]);
  columns[5].push(cards[17]);
  columns[5].push(cards[18]);
  columns[5].push(cards[19]);
  columns[5].push(cards[20]);

  columns[6].push(cards[21]);
  columns[6].push(cards[22]);
  columns[6].push(cards[23]);
  columns[6].push(cards[24]);
  columns[6].push(cards[25]);
  columns[6].push(cards[26]);
  columns[6].push(cards[27]);

  for (let i = 28; i < 52; i++) {
    columns[7].push(cards[i]);
  }


  let button = document.getElementById("restartDeck");
  let buttonText = document.getElementById("buttonSpan")

  button.style.width = cardWidth/2 +"px";
  button.style.height = cardWidth/2 +"px";
  button.style.fontSize = cardWidth/2 +"px";
  button.style.left = leftOffset + cardWidth/2 -cardWidth/4 +"px";
  button.style.top = cardHeight/10 + cardHeight/2 -cardWidth/4 +"px";

  buttonText.style.width = cardWidth/2 +"px";
  buttonText.style.height = cardWidth/2 +"px";
  buttonText.style.fontSize = cardWidth/2+"px";
  buttonText.style.lineHeight = cardWidth/2.7 + "px";

}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function addDownListener(index, posX, posY) {
  console.log("got card")
  console.log(index)
  let offset = cardWidth / 10;

  if (posY <= cardHeight) {
    console.log("stack");
    startingColumn = 8;
  } else {
    startingColumn = Math.floor((posX-leftOffset) / (offset + cardWidth));
  }

  clickedCards = [];
  for (let i = index; i < columns[startingColumn].length; i++) {
    let card = document.getElementById(columns[startingColumn][i].type + columns[startingColumn][i].value);
    card.style.zIndex = 100 + i;
    clickedCards.push(card);
  }

  offsetX = posX - clickedCards[0].getBoundingClientRect().left;
  offsetY = posY - clickedCards[0].getBoundingClientRect().top;


  console.log(clickedCards);

  startingIndex = index;

}

function addMoveListener(posX, posY) {

  if (clickedCards.length > 0) {
    console.log("moving");
    for (let i = 0; i < clickedCards.length; i++) {
      clickedCards[i].style.left = posX - offsetX + "px";
      clickedCards[i].style.top = posY - offsetY + i * cardHeight / 4 + "px";
    }
  }
}

function addUpListener(index, posX, posY) {
  console.log("lost card")

  // check if valid move
  // get column

  let offset = cardWidth / 10;


  if (posY <= cardHeight && clickedCards.length == 1) {
    // first row
    let finishingColumn = Math.floor((posX-leftOffset) / (offset + cardWidth)) + 6;
    console.log("ahhhhhh" + finishingColumn);

    let startingType = columns[startingColumn][index].type;
    let startingValue = columns[startingColumn][index].value;

    // check if it is empty
    if (columns[finishingColumn].length == 0) {
      if (columns[startingColumn][index].value == 1) {
        columns[finishingColumn].push(columns[startingColumn][index]);
        console.log(columns[startingColumn][index]);
        console.log(columns[finishingColumn]);
        columns[startingColumn].pop();
      }
    }
    else {
      let finishingType = columns[finishingColumn][columns[finishingColumn].length - 1].type;
      let finishingValue = columns[finishingColumn][columns[finishingColumn].length - 1].value;


      if (startingType == finishingType && startingValue == finishingValue + 1) {

        columns[finishingColumn].push(columns[startingColumn][columns[startingColumn].length - 1]);

        columns[startingColumn].pop();

      }
    }


  }
  else {
    // second row

    let finishingColumn = Math.floor((posX-leftOffset) / (offset + cardWidth))

    let startingColor = columns[startingColumn][index].color;
    let startingValue = columns[startingColumn][index].value;

    // check if it is an empty column
    if (columns[finishingColumn].length == 0) {
      // empty column
      for (let i = clickedCards.length; i > 0; i--) {
        columns[finishingColumn].push(columns[startingColumn][columns[startingColumn].length - i]);
      }
      for (let i = clickedCards.length; i > 0; i--) {
        columns[startingColumn].pop();
      }
    }
    else {
      // non-empty column
      let finishingColor = columns[finishingColumn][columns[finishingColumn].length - 1].color;
      let finishingValue = columns[finishingColumn][columns[finishingColumn].length - 1].value;

      if (startingColor != finishingColor && startingValue + 1 == finishingValue) {

        for (let i = clickedCards.length; i > 0; i--) {
          columns[finishingColumn].push(columns[startingColumn][columns[startingColumn].length - i]);
        }
        for (let i = clickedCards.length; i > 0; i--) {
          columns[startingColumn].pop();
        }
      }



      else {
        for (let i = 0; i < clickedCards.length; i++) {
          let lenght = columns[startingColumn].length
          clickedCards[i].style.left = leftOffset + (startingColumn) * cardWidth / 10 + startingColumn * cardWidth + "px";
          clickedCards[i].style.top = cardHeight + (i + (lenght - 1) + 1) * cardHeight / 6 + "px";

          clickedCards[i].style.zIndex = lenght + i
        }
      }

    }
  }

  clickedCards = [];

  drawCardsPosition();

}

function setupCard(number, array) {
  let field = document.getElementById("field");

  for (let i = 0; i < array.length; i++) {
    let card = document.createElement("iframe");


    if (i == array.length - 1) {
      array[i].hidden = false;
    }
    if (array[i].hidden) {
      card.className = "Card hidden";
    }
    else {
      card.className = "Card";

      if (array[i].color == "black") {
        card.style.backgroundColor = "#999999";
      }
      else {
        card.style.backgroundColor = "#870000";
      }
    }


    card.setAttribute("id", array[i].type + array[i].value);
    card.setAttribute("width", cardWidth);
    card.setAttribute("height", cardHeight);
    card.setAttribute("src", "card.html");


    card.style.left = leftOffset + (number) * cardWidth / 10 + number * cardWidth + "px";
    card.style.top = cardHeight + (i + 1) * cardHeight / 6 + "px";
    card.style.position = "absolute";

    card.addEventListener("load", () => {
      console.log("loaded")

      card.contentWindow.hideChange(array[i].hidden);
      card.contentWindow.setColor(array[i].color);
      card.contentWindow.setValue(array[i].value);
      card.contentWindow.setType(array[i].type);


      htmlCards.push(card);

      if (!array[i].hidden) {
        $(card.contentWindow.document.getElementById("frame").contentWindow).on("mousedown", () => {
          let boudningBox = card.getBoundingClientRect();
          let posX = event.clientX + boudningBox.left;
          let posY = event.clientY + boudningBox.top;

          addDownListener(i, posX, posY)
        });


        $(card.contentWindow.document.getElementById("frame").contentWindow).on("mousemove", () => {
          let boudningBox = card.getBoundingClientRect();
          let posX = event.clientX + boudningBox.left;
          let posY = event.clientY + boudningBox.top;

          addMoveListener(posX, posY)
        });

        $(card.contentWindow.document.getElementById("frame").contentWindow).on("mouseup", () => {
          let boudningBox = card.getBoundingClientRect();
          let posX = event.clientX + boudningBox.left;
          let posY = event.clientY + boudningBox.top;

          addUpListener(i, posX, posY)
        });
      }
    })

    field.appendChild(card);





  }
}

function setUpStack(number, array) {
  let field = document.getElementById("field");

  for (let i = 0; i < array.length; i++) {
    let card = document.createElement("iframe");


    card.setAttribute("id", array[i].type + array[i].value);
    card.setAttribute("width", cardWidth);
    card.setAttribute("height", cardHeight);
    card.setAttribute("src", "card.html");


    card.style.left =  leftOffset + "px";
    card.style.top = cardHeight/10 +"px";
    card.style.position = "absolute";

    card.className = "Card hidden";

    card.setAttribute("id", array[i].type + array[i].value);




    card.addEventListener("load", () => {
      console.log("loaded")

      card.contentWindow.hideChange(array[i].hidden);
      card.contentWindow.setColor(array[i].color);
      card.contentWindow.setValue(array[i].value);
      card.contentWindow.setType(array[i].type);


      htmlCards.push(card);


       $(card.contentWindow.document.getElementById("frame").contentWindow).on("click", () => {
          let boudningBox = card.getBoundingClientRect();
          let posX = event.clientX + boudningBox.left;
          let posY = event.clientY + boudningBox.top;

          addClickListener(i, posX, posY)
        });

    });

    field.appendChild(card);
  }
}

function renderCards() {
  let field = document.getElementById("field");
  field.innerHTML = "";
  htmlCards = [];


  // first column
  setupCard(0, columns[0]);


  // second column
  setupCard(1, columns[1]);


  // third column
  setupCard(2, columns[2]);


  // fourth column
  setupCard(3, columns[3]);


  // fifth column
  setupCard(4, columns[4]);


  // sixth column
  setupCard(5, columns[5]);

  // seventh column
  setupCard(6, columns[6]);

  // stack
  setUpStack(7, columns[7]);

  /*// open stack
  setUpOpenStack(8, columns[8]);

  // first ace
  setUpAceStack(9, columns[9]);

  // second ace
  setUpAceStack(10, columns[10]);
    
  // third ace
  setUpAceStack(11, columns[11]);

  // fourth ace
  setUpAceStack(12, columns[12]);*/

  let elements = document.getElementsByClassName("Card");
  for (let i = 0; i < elements.length; i++) {
    elements[i].style.width = cardWidth + "px";
    elements[i].style.height = cardHeight + "px";
  }
}

function drawCardsPosition() {
  // columns
  for (let i = 0; i < 7; i++) {
    for (let j = 0; j < columns[i].length; j++) {
      let card = columns[i][j];
      let htmlCard = document.getElementById(card.type + card.value);
      htmlCard.style.left = leftOffset + (i) * cardWidth / 10 + i * cardWidth + "px";
      htmlCard.style.top = cardHeight + (j + 1) * cardHeight / 6 + "px";
      htmlCard.style.zIndex = j;

      if(j == columns[i].length-1){
        htmlCard.contentWindow.hideChange(false);
        card.hidden = false;
      }else{
        htmlCard.contentWindow.hideChange(card.hidden);
      }

      // clear all eventHandlers
      $(htmlCard.contentWindow.document.getElementById("frame").contentWindow).off();


      if(!card.hidden){
      $(htmlCard.contentWindow.document.getElementById("frame").contentWindow).on("mousedown", () => {
        let boudningBox = htmlCard.getBoundingClientRect();
        let posX = event.clientX + boudningBox.left;
        let posY = event.clientY + boudningBox.top;

        addDownListener(j, posX, posY)
      });


      $(htmlCard.contentWindow.document.getElementById("frame").contentWindow).on("mousemove", () => {
        let boudningBox = htmlCard.getBoundingClientRect();
        let posX = event.clientX + boudningBox.left;
        let posY = event.clientY + boudningBox.top;

        addMoveListener(posX, posY)
      });


      $(htmlCard.contentWindow.document.getElementById("frame").contentWindow).on("mouseup", () => {
        let boudningBox = htmlCard.getBoundingClientRect();
        let posX = event.clientX + boudningBox.left;
        let posY = event.clientY + boudningBox.top;

        addUpListener(j, posX, posY)
      });
    }
    }
  }

  // stack
  for (let i = 0; i < columns[7].length; i++){
    let card = columns[7][i];
    let htmlCard = document.getElementById(card.type + card.value);

    htmlCard.contentWindow.hideChange(true);
    card.hidden=true;


    htmlCard.style.left =  leftOffset + "px";
    htmlCard.style.top = cardHeight/10 +"px";
    htmlCard.style.position = "absolute";
    htmlCard.style.zIndex = i;

    $(htmlCard.contentWindow.document.getElementById("frame").contentWindow).off();
    $(htmlCard.contentWindow.document.getElementById("frame").contentWindow).on("click",()=>{
      addClickListener();
    })
  }

  //open stack
  for (let i = 0; i < columns[8].length; i++){
    let card = columns[8][i];
    let htmlCard = document.getElementById(card.type + card.value);

    htmlCard.contentWindow.hideChange(false);
    card.hidden=false;

    htmlCard.style.left = leftOffset + 1 * cardWidth / 10 + cardWidth + "px";
    htmlCard.style.top = cardHeight/10 + "px";
    htmlCard.style.zIndex = i;
    $(htmlCard.contentWindow.document.getElementById("frame").contentWindow).off()

    $(htmlCard.contentWindow.document.getElementById("frame").contentWindow).on("mousedown",()=>{
      let boudningBox = htmlCard.getBoundingClientRect();
      let posX = event.clientX + boudningBox.left;
      let posY = event.clientY + boudningBox.top;

      addDownListener(i, posX, posY)
    });

    $(htmlCard.contentWindow.document.getElementById("frame").contentWindow).on("mousemove", () => {
      let boudningBox = htmlCard.getBoundingClientRect();
      let posX = event.clientX + boudningBox.left;
      let posY = event.clientY + boudningBox.top;

      addMoveListener(posX, posY)
    });


    $(htmlCard.contentWindow.document.getElementById("frame").contentWindow).on("mouseup", () => {
      let boudningBox = htmlCard.getBoundingClientRect();
      let posX = event.clientX + boudningBox.left;
      let posY = event.clientY + boudningBox.top;

      addUpListener(i, posX, posY)
    });



  }


  //Ace Stacks
  for(let i = 0; i < 4; i++){
    for(let j = 0; j < columns[i+9].length; j++){
      let card = columns[i+9][j];
      let htmlCard = document.getElementById(card.type + card.value);

      htmlCard.contentWindow.hideChange(false);
      card.hidden=false;

      htmlCard.style.left = leftOffset+ (i+9 - 6) * cardWidth / 10 + (i+9 - 6) * cardWidth + "px";
      htmlCard.style.top = cardHeight/10 +"px";
      htmlCard.style.zIndex = j;
      $(htmlCard.contentWindow.document.getElementById("frame").contentWindow).off()
    }
  }


  if(columns[9].length == 13 && columns[10].length == 13 && columns[11].length == 13 && columns[12].length == 13){
    winningAnimation();
  }
}

function addClickListener() {
  console.log("clicked stack")
  columns[8].push(columns[7][columns[7].length - 1]);
  columns[7].pop();
  drawCardsPosition();
}


async function winningAnimation(){
  console.log("win");
  let stripeWidth = 3;
  let amount = window.screen.width/stripeWidth;
  let field = document.getElementById("win")

  for(let i = 0; i < amount; i++){
    let drop = document.createElement("div");
    let randomStart = Math.floor(Math.random()*Math.floor(60));
    let randomTime = 50 + Math.floor(Math.random()*Math.floor(100));
    drop.style.backgroundColor ="white";
    drop.style.display= "block";
    drop.style.width = stripeWidth +"px";
    drop.style.position = "absolute";
    drop.style.left = i*stripeWidth +"px";
    drop.style.animationName = "drop";
    drop.style.animationTimingFunction = "linear";
    drop.style.animationDuration = randomTime/10 + "s";
    drop.style.animationDelay = randomStart/10 +"s";
    drop.style.height = stripeWidth+"px";
    drop.style.animationFillMode ="forwards";
    //drop.style.boxShadow = "0 0 "+3*stripeWidth+"px white,0 0 "+3*stripeWidth+"px white,0 0 "+3*stripeWidth + "px white";
    drop.style.zIndex = "200";
    drop.style.top = "-100px";
    drop.style.position = "fixed";



    let stripe =document.createElement("div");
    stripe.style.backgroundColor ="black";
    stripe.style.display= "block";
    stripe.style.width = stripeWidth +"px";
    stripe.style.position = "absolute";
    stripe.style.left = i*stripeWidth +"px";
    stripe.style.animationName = "grow";
    stripe.style.animationTimingFunction = "linear";
    stripe.style.animationDuration = randomTime/10 +"s";
    stripe.style.animationDelay = randomStart/10 +"s";
    stripe.style.height = "0px";
    stripe.style.animationFillMode ="forwards";
    stripe.style.position = "fixed";
    stripe.style.zIndex ="100";


    field.appendChild(stripe);
    field.appendChild(drop);
  }

  await new Promise(r => setTimeout(r, 15000+600));
  let winText = document.createElement("div");
  winText.style.position = "absolute";
  winText.style.fontSize = "100px";
  winText.style.textAlign = "center";
  winText.style.zIndex = "201";
  winText.style.color = "white";
  winText.style.display ="block"
  winText.style.width = "100%";
  winText.style.margin = "30vh auto 0 auto";
  winText.style.animationName = "fade";
  //winText.style.animationTimingFunction = "linear";
  winText.style.animationDuration ="4s";
  winText.style.animationFillMode ="forwards";
  winText.innerHTML = "You Won"

  field.appendChild(winText)


  await new Promise(r => setTimeout(r, 6000));

  deck =[];
  for (let i = 1; i <= 13; i++) {
    deck.push(new Card("heart", "red", i, true));
    deck.push(new Card("spade", "black", i, true));
    deck.push(new Card("diamond", "red", i, true));
    deck.push(new Card("club", "black", i, true));
  }

  document.getElementById("grand").style.opacity = 0;
  await shuffleCards();
  await drawCardsPosition();

  field.style.animationName ="opacity";
  field.style.animationDuration ="3s";
  field.style.animationFillMode = "forwards";

  await new Promise(r => setTimeout(r, 3000));

  document.getElementById("grand").style.animationName ="opacity_r";
  document.getElementById("grand").style.animationDuration ="3s";
  document.getElementById("grand").style.animationFillMode = "forwards";

  field.innerHTML = "";

}

$("#restartDeck").on("click",()=>{
  columns[7] = columns[8];
  columns[8] = []

  drawCardsPosition();
})