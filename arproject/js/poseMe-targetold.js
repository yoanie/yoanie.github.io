AFRAME.registerComponent("poseme-target", {
    init: function () {
        let el = this.el;
        el.setAttribute("class", "collidable");
        
        var raycasterEl = AFRAME.scenes[0].querySelector("[raycaster]");
        raycasterEl.components.raycaster.refreshObjects();
        
        this.bubblePopped = () => {
            alert("POP");
        };
        this.el.addEventListener("raycaster-intersected", this.bubblePopped);
    },
    changeColor: function () {
        let r = Math.floor(Math.random() * 255);
        let g = Math.floor(Math.random() * 255);
        let b = Math.floor(Math.random() * 255);
        el.setAttribute("color", `rgb(${r},${g},${b})`);
        el.setAttribute("position", { x: 2, y: 0.8, z: -8 });
        //el.setAttribute("animation",{property:position, from:0 0.80503 -3.9308, to:-4 0 -4, dur:2000, dir:alternate, loop:true, easing:linear});
    },
    remove: function () {
        this.el.removeEventListener("raycaster-intersected", this.bubblePopped);
    }
});
