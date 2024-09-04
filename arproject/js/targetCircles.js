AFRAME.registerComponent("pose-me-target", {
    init: function () {
        let bubble = this.el; //bubble positioning
        let flutter = document.createElement("a-entity"); //side-by-side animation
        let circle = document.createElement("a-circle"); //bubble image
        //let hitbox = document.createElement("a-circle");
        //let scene = document.querySelector("a-scene");

        const updateAttribute = function () {
            bubble.setAttribute("position", "0 4 0");
            
            //position
            let xVariation = 3;
            let zVariation = 1;
            let randomX = Math.random() * xVariation * 2 - xVariation;
            let randomZ = Math.random() * zVariation * 2 - zVariation - 5;
            let position = randomX + " .5 " + randomZ;
            //let position = "0 .5 -5";
            bubble.setAttribute("position", position);
            circle.setAttribute("visible", true);
            //console.log("updated attribute");

            //circle.setAttribute(
            //    "animation",
            //    `property: position;
            //    from:"${randomX} 4 ${randomZ}";
            //    to:"${randomX} 0 ${randomZ}";
            //    dur: $(Math.random() *500 +700};
            //    easing:linear;
            //    loop:true`
            //);

            circle.setAttribute(
                "rotation",
                "0 0 " + (Math.random() * 180 - 90)
            );
            circle.setAttribute(
                "animation",
                `property: position;
                from:0 4 0; 
                to: 0 -1 0; 
                loop:true; 
                dur:${700 * Math.random() + 3000}; 
                easing:linear;
                pauseEvents:game-over;
                resumeEvents:game-reset;`
            );
        };

        this.el.updateAttribute = updateAttribute;

        flutter.setAttribute(
            "animation",
            `property: position;
            to:0.2 0 0;
            dir:alternate; 
            dur:250; 
            easing:easeInOutSine; 
            loop:true;
            pauseEvents:game-over;
            resumeEvents:game-reset;`   
        );
        flutter.setAttribute("look-at", "true");

        circle.setAttribute("src", "#bubble");

        circle.setAttribute("class", "poseMeTarget");
        circle.setAttribute("material", "shader: flat");
        circle.setAttribute("transparent", "true");
        //circle.setAttribute("scale", "2 2 1");
        circle.setAttribute("radius", 1);
        circle.setAttribute("look-at", "true");
        circle.setAttribute("position", "0 0 0.2");
        circle.setAttribute("render-order", "bubbles");
        //circle.setAttribute("opacity", "1");

        //hitbox.setAttribute("class", "poseMeTarget");
        //hitbox.setAttribute("material", "shader: flat; color: blue");
        //hitbox.setAttribute("opacity", ".5");
        //hitbox.setAttribute("position", "0 0 -0.1");
        //hitbox.setAttribute("transparent", "true");
        //hitbox.setAttribute("scale", ".55 .55 1");
        //hitbox.setAttribute("render-order", "hitbox");

        //circle.bind(updateAttribute);
        circle.reset = updateAttribute;

        updateAttribute();

        //scene.appendChild(flutter);
        flutter.appendChild(circle);
        //circle.appendChild(hitbox);
        bubble.appendChild(flutter);

        setInterval(updateAttribute, 3000);
    },
    
    disable: function(){
        
    },
    tick: function () {
        //if (initialize) {
        let el = this.el;
        let circle = this.el.querySelector("a-circle");
        let yPos = circle.getAttribute("position").y;
        //console.log(yPos);
        if (yPos <= -0.1) {
            el.updateAttribute();
            //player should lose a life here...
            let gameCode = document.querySelector("a-scene").components["pose-me"];
          if(gameCode.el.startTime != null){ //to see if game has stopped running
            let gameCode = document.querySelector("a-scene").components["pose-me"];
            gameCode.loseLife();
            // console.log("bubble popped! (dropped.) y: " + yPos);
          }
        }
        //}
    }
});
