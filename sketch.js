//Create variables here
var dog, happyDog, sadDog, database, foodS, foodStock; 
var feed, addFood, fedTime, lastFed, foodObj;
var changeState, readState,gameState;
var bedroom, garden, washroom;

function preload()
{
  //load images here
  dog = loadImage("Dog.png");
  happyDog = loadImage("happydog.png");
  sadDog = loadImage("sadDog.png");

  bedroom = loadImage("Bed Room.png");
  garden = loadImage("Garden.png");
  washroom = loadImage("Wash Room.png");

}

function setup() {
  createCanvas(900, 900);
  database = firebase.database(); 
  console.log(database);
  dogSprite = createSprite(550,250,50,50);
  dogSprite.addImage(dog);
  dog.resize(100,100);
  happyDog.resize(100,100);

  foodObj = new Food();

  feed = createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  garden.resize(900,900);
  bedroom.resize(900,900);
  washroom.resize(900,900);

// for reading gamestate
readState=database.ref("gameState");
readState.on("value",function(data){
  gameState=data.val();
});
  
  
  foodStock=database.ref('Food');
  foodStock.on("value", readStock); 
}


function draw() {  
background(46,139,87);

foodObj.display();

fedTime=database.ref('fedTime');
fedTime.on("value",function(data){
  lastFed=data.val();
});


  drawSprites();
  
  textSize(20);
  fill("black");
  text("Food Remaining " + foodS,40,80);
 
  // last fed time format
  fill(255,255,254);
  textSize(15);
  if(lastFed>=12) {
    text("Last Feed : "+lastFed%12+ " PM",350,30);
  } else if(lastFed==0) {
    text("Last Feed : 12 AM", 350,30);
  } else {
    text("Last Feed : "+ lastFed + " AM",350,30);
  }

  if(gameState != "Hungry") {
    feed.hide();
    addFood.hide();
    dogSprite.remove();
  }else {
    feed.show();
    addFood.show();
    dogSprite.addImage(sadDog);
  }

  currentTime=hour();
    if(currentTime==(lastFed+1)){
    update("Playing");
    foodObj.garden();
  } else if(currentTime==(lastFed+2)){
    update("Sleeping");
    foodObj.bedroom();
  } else if(currentTime>(lastFed+2) && currentTime<=(lastFed+4)){
    update("Bathing");
    foodObj.washroom();
  }else {
    update("Hungry");
    foodObj.display();
  }







  } // end of draw

  function update(state){
    database.ref('/').update({
      gameState:state
    });
  }


function readStock(data) {
  foodS=data.val();




}

function writeStock(x) {

  if(x<=0) {
    x=0;
  } else {
    x=x-1;
  }

  database.ref('/').update({
    Food:x
  })


}

function addFoods() {
  foodS++;
  database.ref('/').update({
    Food:foodS
  })

}

function feedDog() {
  dogSprite.addImage(happyDog);
          foodObj.updateFoodStock(foodObj.deductFood());
      database.ref('/').update({
        Food:foodS,
        fedTime:hour() 
      })

  




}


