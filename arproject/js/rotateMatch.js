AFRAME.registerComponent("track-rotation", {
    schema: {
        initialColor: {type: "color", default: ""},
        onClick: {type: "color", default: ""}
        
    },
    init: function () {
        let el = this.el;
        let data=this.data;
        el.setAttribute("value", "charles");
    },
    tick: function(){
        let el = this.el;
        el.setAttribute("value", "rotation: "+el.getAttribute("rotation").z);
    }
});
