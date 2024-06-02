AFRAME.registerComponent("pose-me", {
    schema: {
        player: { type: "selector", default: "" }
    },
    init: function () {
        let el = this.el;
        let startFlag = false;
    },
    loseLife: function () {
        let el = this.el;
        el.currentLives--;

        if (el.currentLives >= 0) {
            console.log("Life lost! You now have " + el.currentLives);

            let lives = document.querySelector("#lives");
            lives.setAttribute("value", "Lives: " + el.currentLives);
        } else {
            el.components["pose-me"].gameOver();
        }
    },
    gameOver: function () {
        console.log("game over.");
        let gameOver = document.querySelector("#gameOver");

        gameOver.setAttribute(
            "text",
            "value",
            `Game Over! You let all of your bubbles hit the ground. You score was ${this.el.currentScore}.`
        );
        gameOver.setAttribute("visible", true);
    },
    startGame: function () {
        console.log("start game happened");
        let el = this.el;

        let instructions = document.querySelector("#instructions");
        instructions.setAttribute("visible", "false");

        this.el.sounds = {
            pop: document.querySelector("#popSound")
        };

        let startFlag = true;
        let cam = document.querySelector("#cam");
        let scene = document.querySelector("a-scene");

        //lives
        let lives = document.querySelector("#lives");
        this.el.currentLives = 2;
        let currentLives = this.el.currentLives;
        lives.setAttribute("value", "Lives: " + currentLives);

        //score
        let score = document.querySelector("#score");
        this.el.currentScore = 0;
        let currentScore = this.el.currentScore;
        score.setAttribute("value", "Score: " + currentScore);

        //combo
        let combo = document.querySelector("#combo");
        this.el.currentCombo = 0;
        let currentCombo = this.el.currentCombo;
        combo.setAttribute("value", "Combo " + currentCombo + "x!");

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
            console.log("comparing rotation...");
            let marginOfError = 30;
            let camRotate = cam.getAttribute("rotation").z;
            let otherRotate = otherCircle.getAttribute("rotation").z;

            if (Math.abs(camRotate - otherRotate) <= marginOfError) {
                //to fix later!
                el.sounds.pop.components.sound.playSound();

                currentCombo++;
                let combo = document.querySelector("#combo");
                combo.setAttribute("value", "Combo " + currentCombo + "x!");

                currentScore += Math.floor(currentCombo / 13) + 1;

                score.setAttribute("value", `Score: ${currentScore}`);
                console.log("score: " + currentScore);

                console.log("match! currentScore is " + currentScore);
                otherCircle.reset();
            } else {
                //console.log("no match!");
            }
        };
    },
    tick: function () {},
    reset: function () {
        this.el.currentScore = 0;
        for (let circle of this.el.circles) {
            //hide all circles offscreen to reset
            circle.setAttribute("position", "y", -5);
        }
    }
});
