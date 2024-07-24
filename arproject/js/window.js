AFRAME.registerPrimitive("a-window", {
    defaultComponents: {
        geometry: { primitive: "plane", width:"5", height:"5", position:"0 .51 0" },
        material: {color:"#aaaaaa", shader:"flat" },
        text: {value:"Game Over! ...", color:"#732040", align:"center", wrapCount:"30",
               font:"./assets/ANDYB-msdf.json", shader:"msdf", negate:"false"}
    },
    mappings: {
        message: "text.value",
        messagecolor: "text.color", 
        messagealign: "text.align",
        messagewrapcount: "text.wrapCount",
        messagefont: "text.font",
        messageshader: "text.shader",
        messagenegate: "text.negate",

        width: "geometry.width",
        height: "geometry.height",
        position: "geometry.position",
        color: "material.color",
        shader: "material.shader"
    }
});

//
