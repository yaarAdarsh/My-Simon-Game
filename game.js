buttonColors = ["red", "blue", "green", "yellow"];
var userClickedPattern=[];
var gamePattern=[];
var level=0;
var started=false;

var playSound=function(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
  
}

var startOver= function(){
    level=0;
    gamePattern=[];
    started=false;
}
var wrongSound= function(){
    var audio2= new Audio("sounds/wrong.mp3")
    audio2.play();
}
var animatePress = function(currentColor){
    $("."+currentColor).addClass("pressed");
    setTimeout(function(){
        $("."+currentColor).removeClass("pressed");
    },100); 
}


var checkAnswer=function(currentLevel){
    if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
        // console.log("success");
        if(userClickedPattern.length===gamePattern.length){
            setTimeout(function(){
                nextSequence()
            },1000);
        }
    }
    else{
        // console.log("wrong");
        wrongSound();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("#level-title").text("Game Over, Press any key to restart!");
        $(".startBtn").text("Restart");
        $(".startBtn").removeClass("gayab");
        $(".score").text("Score : "+(level-1)).removeClass("gayab");
        startOver();
    }
}

$(document).keypress(function(event){
    if(! started){
        $("#level-title").text("Level "+level);
        nextSequence();
        started=true;
        $(".startBtn").addClass("gayab");
        $(".score").addClass("gayab");
    }
})

$(".startBtn").click(function(event){
    if(! started){
        $("#level-title").text("Level "+level);
        nextSequence();
        started=true;
        $(".startBtn").addClass("gayab");
        $(".score").addClass("gayab");
    }
})

$(".btn").on("click",function (){
    var userChoosenColor= $(this).attr("id")
    // console.log(userChoosenColor);
    userClickedPattern.push(userChoosenColor);
    // console.log(userClickedPattern);
    playSound(userChoosenColor);
    animatePress(userChoosenColor); 
    
    checkAnswer(userClickedPattern.length -1 );
})

var nextSequence= function(){
   

    userClickedPattern=[];
    level++;
    $("#level-title").text("Level "+level);

    var randomNumber =  Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);   

    $( "#" + randomChosenColour ).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);
    // console.log(gamePattern);
    
}



// console.log(randomChosenColour);
