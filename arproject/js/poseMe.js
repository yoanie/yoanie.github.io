AFRAME.registerComponent("pose-me", {
    schema: {
        player: { type: "selector", default: "" }
        
    },
    init: function () {
        let el = this.el;
        let startFlag = false;
        let replayBtn = document.querySelector("#resetBtn");
        replayBtn.addEventListener("click", ()=>{
            el.components["pose-me"].reset();});
    },
    loseLife: function () {
        // console.log(this.el); //temp
        
        let el = this.el;
        el.currentLives--;
        el.currentCombo = 0;
        
        if (el.currentLives >= 0) {
            console.log("Life lost! You now have " + el.currentLives);

            let lives = document.querySelector("#lives");
            lives.setAttribute("value", "Lives: " + el.currentLives);
        } else {
          //check to see if the game has already ended or not
          if(el.startTime!=null){
            el.components["pose-me"].gameOver();
          }
        }
    },
    gameOver: function () {
        console.log("game over.");
        let gameOver = document.querySelector("#gameOver");
        
        let replayBtn = document.querySelector("#resetBtn");
        replayBtn.addEventListener("click", this.el.components["pose-me"].reset);
        
        //stop timer + prevent loseLife from looping
        this.el.startTime = null;
      
        //hide the circles
        for(let circle of this.el.circles){
          circle.setAttribute("visible", false);
        }

        //stop circle animations (both flutter and gravity)
        // for (let circle of this.el.circles){
        //     circle.children[0].setAttribute("animation", `property: position; 
        //         from:0 2 0; 
        //         to: 0 2 0; 
        //         loop:false; 
        //         dur:1000; 
        //         easing:linear;
        //         pauseEvents:game-over;
        //         resumeEvents:game-reset;`);
        //     circle.children[0].children[0].setAttribute("animation", `property: position;
        //         from:0 0 0; 
        //         to: 0 0 0; 
        //         loop:false; 
        //         dur:1000; 
        //         easing:linear;
        //         pauseEvents:game-over;
        //         resumeEvents:game-reset;`);
        //     circle.children[0].setAttribute("animation", "enabled", false);
        //     circle.children[0].children[0].setAttribute("animation", "enabled", false);
        // }
        
        
        gameOver.setAttribute(
            "text",
            "value",
            `Game Over! You let all of your bubbles hit the ground. You score was ${this.el.currentScore}.`
        );
        gameOver.setAttribute("visible", true);
        
        this.el.addEventListener("game-over",(e)=>{console.log("event: " + e);}, false);
        
        //start and stop events
        const event = new Event("game-over");
        this.el.dispatchEvent(event);
        
        this.el.emit("game-over");
        
    },
    startGame: function () {
        console.log("start game happened");
        let el = this.el;

        // let instructions = document.querySelector("#instructions");
        // instructions.setAttribute("visible", "false");

        this.el.sounds = {
            pop: document.querySelector("#popSound")
        };

        let startFlag = true;
        let cam = document.querySelector("#cam");
        let scene = document.querySelector("a-scene");

        //score
        let score = document.querySelector("#score");
        this.el.currentScore = 0;
        let currentScore = this.el.currentScore;
        score.setAttribute("value", "Score: " + currentScore);
        
        //lives
        let lives = document.querySelector("#lives");
        this.el.currentLives = 0;
        let currentLives = this.el.currentLives;
        lives.setAttribute("value", "Lives: " + currentLives);

        //combo
        let combo = document.querySelector("#combo");
        this.el.currentCombo = 0;
        let currentCombo = this.el.currentCombo;
        combo.setAttribute("value", "Combo " + currentCombo + "x!");

        //time
        let timer = document.querySelector("#timer");
        this.el.startTime = Date.now();
        // updated every tick in tick: function(){...}
        
        //countdown so that it doesn't sometimes double the player's combo
        let compareCooldown = Date.now();
        
        //keep track of circles
        this.el.circles = [];

        scene.addEventListener("mouseenter", (e) => {
            if (e.target.getAttribute("class") == "poseMeTarget") {
                //console.log("Overlapping");
                //console.log(compareRotation);
                compareRotation(e.target);
            }
        });
        //randomly set location
        let numCircles = 1;
        for (let i = 0; i < numCircles; i++) {
            let bubble = document.createElement("a-entity");
            bubble.setAttribute("pose-me-target", true);
            bubble.setAttribute(
                "pose-me-target",
                "player",
                document.querySelector("#game")
            );

            scene.appendChild(bubble);
            this.el.circles.push(bubble);
        }

        const compareRotation = function (otherCircle) {
            // console.log("comparing rotation...");
            let marginOfError = 15;
            let camRotate = cam.getAttribute("rotation").z;
            let otherRotate = otherCircle.getAttribute("rotation").z;

            if (Math.abs(camRotate - otherRotate) <= marginOfError && (Date.now()-compareCooldown)>100) {
                //to fix later!
                otherCircle.reset();
                compareCooldown = Date.now();
                
                el.sounds.pop.components.sound.playSound();
                
                currentCombo++;
                let combo = document.querySelector("#combo");
                combo.setAttribute("value", "Combo " + currentCombo + "x!");

                currentScore += Math.ceil(currentCombo / 20);

                score.setAttribute("value", `Score: ${currentScore}`);

                console.log("match! currentScore is " + currentScore);
                
            } else {
                //console.log("no match!");
            }
        };
    },
    tick: function () {
        if(this.el.startTime != null && Date.now()%10==0){ //checks for gameOver && so that it doesn't update *every* tick
            timer.setAttribute("value", "Time: " + Math.floor((Date.now() - this.el.startTime)/1000) + "s");
        }
    },
    reset: function () {
      window.location.reload();
//         let replayBtn = document.querySelector("#resetBtn");
//         replayBtn.removeEventListener("click", this.el.components["pose-me"].reset);
        
//         //show the circles
//         for(let circle of this.el.circles){
//           circle.setAttribute("visible", true);
//         }
        
//         console.log("reset function happened");
//         this.el.currentScore = 0;
//         this.el.startTime = Date.now();
//         for (let circle of this.el.circles) {
//             //hide all circles offscreen to reset
//             circle.setAttribute("position", "y", -5);
//         }
        
//         this.el.components["pose-me"].startGame();
    }
});
