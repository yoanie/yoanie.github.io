AFRAME.registerComponent("set-color", {
    schema: {
        color: { type: "string", default: "#ff00ff" }
        
    },
    init: function () {
        let el = this.el;
        el.setAttribute("color", this.data);
    }
    //this.el.addEventListener("click", this.setColor);
});
