const { ipcRenderer } = require("electron");

window.addEventListener("DOMContentLoaded", async () => {
    ipcRenderer.on("ytsr-focus",()=>{
        document.getElementById("keyword").focus()
        document.getElementById("keyword").s
    })
        ipcRenderer.on("main-keyword", function (_event, args) {
        document.querySelector("#keyword").value = args;
    });
    document.addEventListener("keypress", e => {
        if (e.code === "Enter" || e.code==="NumpadEnter") {
            ipcRenderer.send("ytsr-keyword", document.getElementById("keyword").value);
        }
        
    });
    document.addEventListener("keydown",e=>{
        if (e.code === "Escape") {
            ipcRenderer.send("ytsr-hide");
        };
    })
});