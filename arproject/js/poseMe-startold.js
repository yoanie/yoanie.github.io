//https://stackoverflow.com/questions/42074856/aframe-clone-object3d-within-entity

//randomly add 10 circles
//let numCircles = 10;
AFRAME.registerComponent("posemeold", {
    //schema: { type: "selector", sampleBubble: {} },
    init: function () {
        var el = this.el;
        var me = document.querySelector("#me");
        this.el.addEventListener("raycaster-intersected", this.makeClone);

        const compareRotation = function (otherCircle) {
            let marginOfError = 15;
            if (Math.abs(me.rotation - otherCircle.rotation) <= marginOfError) {
                otherCircle.hidden = true;
            }
        };
    },
    tick: function () {
        //this.el.object3D.lookat(this.data.object3D.position);
    },
    makeClone: function () {
        var scene = document.querySelector("a-scene");

        var frame = document.createElement("a-entity");
        frame.visible = false;

        frame.setAttribute("animation", {
            property: "position",
            from: "0 4.2 -5",
            to: "0 0 -5",
            dur: 9000,
            dir: "alternate",
            loop: false,
            easing: "linear"
        });

        var clone = document.createElement("a-plane");
        clone.visible = true;

        clone.setAttribute("position", "1+Math.random() 0.8 -6");
        clone.setAttribute("src", "#bubble");
        clone.setAttribute("poseme-target");
        clone.setAttribute("rotation", {
            x: 0,
            y: 0,
            z: 180 * Math.random() - 90
        });
        clone.setAttribute("check-rotation");
        clone.setAttribute("event-set__overlap", "_event", "mouseenter");

        //var clone = this.data.sampleBubble.clone();
        //var clone = sampleBubble.cloneNode(true);

        //clone.setAttribute("position", { x: 1, y: 0.8, z: -6 });

        //clone.setAttribute("event-set__match", "_event:click; z:-25");
        //clone.setAttribute("class", "collidable");

        //animation="property:position; from:0 0.80503 -3.9308; to:-4 0 -4;
        //dur:2000; dir:alternate; loop:true; easing:linear;"

        var r = 8 * Math.random();
        var g = 0;
        var b = 4.5 * Math.random();
        var direction = 1;
        if (Math.random() > 0.5) {
            direction *= -1;
        }

        clone.setAttribute("animation", {
            property: "position",
            from: { x: r - 4, y: g, z: b },
            to: { x: r - 4 + 2 * direction, y: g, z: b },
            //from: origin,
            //to: dest,
            dur: 2000,
            dir: "alternate",
            loop: true,
            easing: "easeInOutSine"
        });

        //alert("placing clone " + clone);
        scene.appendChild(frame);
        frame.appendChild(clone);

        //var raycasterEl = AFRAME.scenes[0].querySelector("[raycaster]");
        //raycasterEl.components.raycaster.refreshObjects();

        //clone.position.y+=1;
        //this.el.sceneEl.add(clone);

        //for(let i = 0;i < numCircles;i++){
        //
        //    let bubble = document.createElement("a-entity");
        //    let circle = document.createElement("a-circle");
        //    create.setAttribute("src", "#bubble");
        //    bubble.appendChild(circle);
        //    scene.appendChild(bubble);
        //
        //}
    },
    remove: function () {
        this.el.removeEventListener("raycaster-intersected", this.makeClone);
    }
});
