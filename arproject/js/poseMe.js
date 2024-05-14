AFRAME.registerComponent("pose-me", {
    init: function () {
        let el = this.el;
    },
    startGame: function () {
        console.log("start game happened");
        let cam = document.querySelector("#cam");
        let scene = document.querySelector("a-scene");
        let score = document.querySelector("#score");
        let currentScore = 0;

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

            scene.appendChild(bubble);
        }

        const compareRotation = function (otherCircle) {
            let marginOfError = 90;
            let camRotate = cam.getAttribute("rotation").z;
            let otherRotate = otherCircle.getAttribute("rotation").z;

            if (Math.abs(camRotate - otherRotate) <= marginOfError) {
                //console.log("match!");
                //match happened!
                currentScore++;
                score.setAttribute("value", "Score: " + currentScore);
                let onReset = otherCircle.getAttribute("reset");
                //console.log(onReset);
                onReset();
            } else {
                //console.log("no match!");
            }
        };
    }
    //tick: function () {
    //    let el = this.el;
    //    let yPos = el.getAttribute("position").y;
    //    if (yPos <= 0) {
    //        this.el.updateAttribute();
    //    }
    //}
});
