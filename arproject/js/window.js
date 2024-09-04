AFRAME.registerPrimitive("a-window", {
    defaultComponents: {
        geometry: { primitive: "plane"},
        material: {color:"#aaaaaa", shader:"flat" },
        text: {value:"Game Over! ...", color:"#732040", align:"center", wrapCount:"30",
               font:"./ANDYB-msdf.json", fontImage:"https://cdn.glitch.global/8bc2caa1-4aa3-40b3-bfba-6e69e6e12be0/ANDYBTTF.png?v=1721785949695", shader:"msdf", negate:"false"}
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
