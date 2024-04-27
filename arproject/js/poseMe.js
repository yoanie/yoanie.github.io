AFRAME.registerComponent("pose-me", {
    init: function () {
        let el = this.el;

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

        //var raycasterEl = AFRAME.scenes[0].querySelector("[raycaster]");
        //raycasterEl.components.raycaster.refreshObjects();

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
                console.log(onReset);
                onReset();
            } else {
                //console.log("no match!");
            }
        };
    }
});
