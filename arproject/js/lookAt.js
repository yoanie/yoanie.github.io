AFRAME.registerComponent("look-at", {
    schema: { type: "selector" },
    init: function () {
        let camera = document.querySelector("#cam");
        //let camX = camera.position.x;
        //let camY = camera.position.y;
        
        let el = this.el;
        //let rotationX = 0;
        //let rotationY = 0;
    },
    tick: function () {
        let el = this.el;
        let camera = document.querySelector("#cam");
        //this.el.object3D.lookat(this.data.camera.position);
        //document.querySelector('#entity').object3D.lookAt('#cam'); 
        let deltaX = (camera.getAttributea("position").x - el.getAttribute("position").x);
        let deltaY = (camera.getAttribute("position").y - el.getAttribute("position").y); 
        let deltaZ = (el.getAttribute("position").z - camera.getAttribute("position").z); 
        let dist = Math.sqrt(deltaX*deltaX + deltaY*deltaY);
        //console.log(camera.getAttribute("position"));
        //console.log(deltaX);
        let rotX = 180*(Math.atan(deltaY/dist))/Math.PI;
        let rotY = -180*(Math.atan(deltaX/deltaZ))/Math.PI;
        let rotZ = 0;//(180*(Math.atan(deltaY/deltaX))/Math.PI);aw
        //let rotX = Math.acosh(deltaY/deltaX);
        //let rotY = Math.asinh(deltaY/deltaX);
        console.log(rotX + " " + rotY);
        //console.log(rotY);
        el.setAttribute("rotation", rotX + " " + rotY + " " + el.getAttribute("rotation").z);
    }
});
