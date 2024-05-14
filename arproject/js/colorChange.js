AFRAME.registerComponent("click-color-change", {
    init: function () {
        let el = this.el;

        this.changeColor = () => {
            
            let r = Math.floor(Math.random() * 255);
            let g = Math.floor(Math.random() * 255);
            let b = Math.floor(Math.random() * 255);
            el.setAttribute("color", `rgb(${r},${g},${b})`);
            el.setAttribute("position",{x:2,y:0.8,z:-8});
            //el.setAttritube("animation",{property:position, from:0 0.80503 -3.9308, to:-4 0 -4, dur:2000, dir:alternate, loop:true, easing:linear});
        };
        this.el.addEventListener("raycaster-intersected", this.changeColor);
    },
    tick: function() {
        el.setAttribute("rotation",{x:0,y:0,z:(el.getAttribute("rotation")).z+1});
        
    },
    remove: function () {
        this.el.removeEventListener("raycaster-intersected", this.changeColor);
    }
});
