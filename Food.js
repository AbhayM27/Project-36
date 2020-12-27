class Food {
    constructor() {
        var foodStock;
        var lastFed;
        this.image = loadImage("Milk.png");
        
}




getFoodStock() {
 foodStock = database.ref('Food');
 foodStock.on("value",function(data){
    foodStock = data.val();
})
}

updateFoodStock(){
    database.ref('/').update({
    Food:foodS
})
    
 
}

deductFood() {
    foodS=foodS-1;
}

bedroom() {
    image(bedroom,450,450);
}

garden() {
    image(garden,450,450);
    
}

washroom() {
    image(washroom,450,450);
}

display() {
    var x=80, y=100;

    imageMode(CENTER);
    image(this.image,8000,220,70,70);
    
    if(foodS!=0) {
        for(var i=0; i<foodS; i++){
            if(i%10==0) {
                x=80;
                y=y+80;
            }
            image(this.image,x,y,70,70);
            x=x+30;
        }
    }






}



}