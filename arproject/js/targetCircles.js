AFRAME.registerComponent("pose-me-target", {
    init: function () {
        let bubble = this.el; //bubble positioning
        let flutter = document.createElement("a-entity"); //side-by-side animation
        let circle = document.createElement("a-circle"); //bubble image
        let hitbox = document.createElement("a-circle");
        //let scene = document.querySelector("a-scene");

        const updateAttribute = function () {
            //position
            let xVariation = 3;
            let zVariation = 1;
            let randomX = Math.random() * xVariation * 2 - xVariation;
            let randomZ = Math.random() * zVariation * 2 - zVariation - 5;
            let position = randomX + " .5 " + randomZ;
            //let position = "0 .5 -5";
            bubble.setAttribute("position", position);

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
                to: 0 0 0; 
                loop:true; 
                dur:${700 * Math.random() + 2500}; 
                easing:linear;`
            );
        };

        const respawn = function () {
            //console.log("respawn");
            updateAttribute();
        };

        this.el.updateAttribute = updateAttribute;

        flutter.setAttribute(
            "animation",
            `property: position;
            to:0.2 0 0;
            dir:alternate; 
            dur:250; 
            easing:easeInOutSine; 
            loop:true`
        );
        flutter.setAttribute("look-at", "true");

        circle.setAttribute("src", "#bubble");

        //circle.setAttribute("class", "poseMeTarget");
        circle.setAttribute("material", "shader: flat");
        circle.setAttribute("transparent", "true");
        //circle.setAttribute("scale", "2 2 1");
        circle.setAttribute("radius", 1);
        circle.setAttribute("look-at", "true");
        circle.setAttribute("position", "0 0 0.2");
        circle.setAttribute("render-order", "bubbles");
        //circle.setAttribute("opacity", "1");

        hitbox.setAttribute("class", "poseMeTarget");
        hitbox.setAttribute("material", "shader: flat; color: blue");
        hitbox.setAttribute("opacity", ".5");
        hitbox.setAttribute("position", "0 0 -0.1");
        hitbox.setAttribute("transparent", "true");
        hitbox.setAttribute("scale", ".25 .25 1");
        hitbox.setAttribute("render-order", "hitbox");

        //circle.bind(updateAttribute);
        circle.setAttribute("reset", respawn);

        updateAttribute();

        //scene.appendChild(flutter);
        flutter.appendChild(circle);
        circle.appendChild(hitbox);
        bubble.appendChild(flutter);

        //setInterval(updateAttribute, 3000);
    },
    tick: function () {
        //if (initialize) {
            let el = this.el;
            let yPos = el.getAttribute("position").y;
            if (yPos <= 0) {
                el.updateAttribute();
            }
        //}
    }
});
