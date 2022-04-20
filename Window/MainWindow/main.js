const djsmusic = require("@kyometori/djsmusic")
const { ipcRenderer } = require("electron");

window.addEventListener("DOMContentLoaded", async () => {
    document.querySelector("#keyword").addEventListener("change", () => {
        ipcRenderer.send("main-keyword", document.querySelector("#keyword").value)
    })
    document.on
    let playerOnOffStat = 0;
    let helpOnOffStat = 0;
    let playerOnOffFunc
    let ytscingStat = 0

    {
        function vido(options) {
            const mainMainEl = document.querySelector("#main>.main");
            const mainMainvidoEl = mainMainEl.querySelector(".vido");
            const mainPlayerEl = document.querySelector("#main>.player");
            if (!options) {
                options = {
                    vedo: {
                        thumb: "default-image/thumbnail.png",
                        title: "NONE",
                        vidoUrl: "https://www.youtube.com/embed/",
                        update: "2009-04-06",
                        viewcon: "9487",
                    },
                    chnel: {
                        avat: "default-image/avatar.png",
                        chanUrl: "/",
                        name: "NONE",
                    },

                }

            }
            mainMainvidoEl.querySelector(".thumbnail").style.backgroundImage = `url(${options.vedo.thumb})`
            document.querySelector("#bg>.bg").style.backgroundImage = `url(${options.vedo.thumb})`
            document.querySelector("#close-bg>.bg").style.backgroundImage = `url(${options.vedo.thumb})`
            mainMainvidoEl.querySelector(".title").innerHTML = options.vedo.title
            mainPlayerEl.querySelector(".box>.title>.title").innerHTML = options.vedo.title
            mainMainvidoEl.querySelector(".title").setAttribute("href", options.vedo.vidoUrl)
            mainPlayerEl.querySelector(".box>.vido>.vido").setAttribute("src", "https://www.youtube.com/embed/" + options.vedo.vidoUrl.slice("https://www.youtube.com/watch?v=".length).trim())
            mainMainvidoEl.querySelector(".uploadDate").innerHTML = options.vedo.update
            mainMainvidoEl.querySelector(".viewCount").innerHTML = options.vedo.viewcon

            mainMainEl.querySelector(".chanel>.avatar").style.backgroundImage = `url(${options.chnel.avat})`
            mainMainEl.querySelector(".chanel>.name").setAttribute("href", options.chnel.chanUrl)
            document.querySelector("#box>.bg-txt ").innerHTML = options.chnel.name
            mainMainEl.querySelector(".chanel>.name").innerHTML = options.chnel.name
        }

        const ytscing = {
            ing: function () {
                document.querySelectorAll("#main>.main>.vido>*").forEach(ele => {
                    ele.classList.add("loading")
                })
                document.querySelectorAll("#main>.main>.chanel>*").forEach(ele => {
                    ele = ele.style
                    ele.opacity = ".5"
                    ele.pointerEvents = "none"
                })
                {
                    const ele = document.querySelector("#bg>.bg").style
                    ele.transform = "scale(.89)"
                    ele.borderRadius = "10px"
                }
                document.querySelector("#main").style.pointerEvents = "none"
                document.querySelector("#main>.ytsring>div>div").style.transform = "translate(0, 0) scale(1)"
                document.querySelector("#main>.main>.chanel>.avatar").style.transform = "scale(.8)"
                document.querySelector("#main>.main>.chanel>.name").style.margin = "auto 0px"
                document.querySelector("#main>.key>div>div").style.transform = ""
                ytscingStat++
            },
            done: function () {
                document.querySelectorAll("#main>.main>.vido>*").forEach(ele => {
                    ele.classList.remove("loading")
                })
                document.querySelectorAll("#main>.main>.chanel>*").forEach(ele => {
                    ele = ele.style
                    ele.opacity = ""
                    ele.pointerEvents = ""
                })
                {
                    const ele = document.querySelector("#bg>.bg").style
                    ele.transform = ""
                    ele.borderRadius = ""
                }
                document.querySelector("#main").style.pointerEvents = ""
                document.querySelector("#main>.main>.chanel>.avatar").style.transform = ""
                document.querySelector("#main>.main>.chanel>.avatar").style.transform = ""
                document.querySelector("#main>.main>.chanel>.name").style.margin = ""
                document.querySelector("#main>.ytsring>div>div").style.transform = ""
                ytscingStat--
            },
        }

        async function ytsc() {
            ytscing.ing();
            if(playerOnOffStat){
                playerOnOffFunc()
            }
            ipcRenderer.send("main-HiddenIconTip", "查詢中...");
            const ytKeyWord = document.querySelector("#keyword").value
            if (ytKeyWord) {
                try {
                    const data = await djsmusic.YoutubeUtils.searchFirstVideo(ytKeyWord)    
                    await data.fetch()
                    await data.channel.fetch()
                    vido({
                        vedo: { thumb: data.thumbnailUrl, title: data.title, vidoUrl: data.url, update: data.uploadDate, viewcon: data.viewCount },
                        chnel: { name: data.channel.name, chanUrl: data.channel.url, avat: data.channel.avatarUrl }
                    })
                    ipcRenderer.send("main-HiddenIconTip", `${data.title} / ${data.channel.name}`);
                } catch (err) {
                }
            } else {
                vido()
                ipcRenderer.send("main-HiddenIconTip", "Ouo");
            }
            ytscing.done();
        }

        ipcRenderer.on("main-yt-keyword", function (_event, args) {
            document.querySelector("#keyword").value = args
            ipcRenderer.send("main-BrowserWindow", "show");
            ytsc();
        })

        document.querySelector("#sumit").addEventListener("click", () => {
            ytsc();
        })
    }
    {
        const ele = document.querySelector("#close-ask>.a")

        const eleOnOff = {
            lst: ["#close-bg", "#box", "#close-ask", "#close-ask>.a", "#close-ask>.q"],
            on: function () { this.lst.forEach(ele => document.querySelector(ele).classList.add("close")) },
            off: function () { this.lst.forEach(ele => document.querySelector(ele).classList.remove("close")) },
        }

        ipcRenderer.on("main-functions", function (_event, args) {
            eleOnOff.on()
        })


        document.getElementById("btn-small").addEventListener("click", () => {
            ipcRenderer.send("main-BrowserWindow", "minimize");
        })
        document.getElementById("btn-hide").addEventListener("click", () => {
            ipcRenderer.send("main-BrowserWindow", "hide");
        })
        document.getElementById("btn-close").addEventListener("click", () => {
            eleOnOff.on()
        })


        ele.querySelector(".no").addEventListener("click", () => {
            eleOnOff.off()
        })

        ele.querySelector(".hide").addEventListener("click", () => {
            ipcRenderer.send("main-BrowserWindow", "hide");
            eleOnOff.off()
        })

        ele.querySelector(".yes").addEventListener("click", () => {
            eleOnOff.off()
            document.body.style.pointerEvents = "none"
            document.querySelector("#box").style.transform = "translate(-50%, -100%) scale(.7)"
            document.querySelector("#box").style.opacity = "0"
            document.querySelector("#mousecurs").style.transform = "translate(-50%, -50%) scale(5)"
            document.querySelector("#mousecurs").style.opacity = "0"
            setTimeout(() => ipcRenderer.send("main-BrowserWindow", "close"), 1.5e3)
        })

    }
    {
        const ele = document.querySelector("#main>.player>.box").style;
        const ele2 = document.querySelector("#main>.player").style;
        playerOnOffFunc = function () {
            if (!playerOnOffStat) {
                ele.transform = "translate(-50%, -50%) scale(1)";
                ele.pointerEvents = "auto";
                ele2.pointerEvents = "auto";
                ele.opacity = "1";
                document.querySelector("#main>.ytsring>div>div").style.transform = ""
                playerOnOffStat++;
            } else {
                ele.transform = "";
                ele.pointerEvents = "";
                ele2.pointerEvents = "";
                ele.opacity = "";
                playerOnOffStat--;
            }
        }

        document.addEventListener("keydown", e => {
            if (!ytscingStat) {
                if (e.altKey && e.code == "KeyP" && !playerOnOffStat) {
                    playerOnOffFunc();
                } else if (e.code == "Escape" && playerOnOffStat) {
                    playerOnOffFunc();
                }
            }
        })
        document.querySelector("#main>.player>.box>.back").addEventListener("click", () => {
            playerOnOffFunc()
        })
    }
    {
        const mouseEle = document.querySelector("#mousecurs").style
        const mouseMouseEle = document.querySelector("#mousecurs>.main").style
        const mouseFocesEle = document.querySelector("#mousecurs>.focespoint").style
        document.addEventListener("mousemove", function (e) {
            mouseEle.left = e.clientX + "px"
            mouseEle.top = e.clientY + "px"
        })
        document.addEventListener("mousedown", function (e) {
            mouseMouseEle.width = "64px"
            mouseMouseEle.height = "64px"
            mouseMouseEle.boxShadow = "0 0 10px #0008"
            mouseMouseEle.backgroundColor = "#0000"
            mouseMouseEle.backdropFilter = "blur(0)"

            mouseFocesEle.transform = "translate(-50%, -50%) scale(.3)"
            mouseFocesEle.opacity = "1"
        })
        document.addEventListener("mouseup", function (e) {
            mouseMouseEle.width = ""
            mouseMouseEle.height = ""
            mouseMouseEle.boxShadow = ""
            mouseMouseEle.backgroundColor = ""
            mouseMouseEle.backdropFilter = ""

            mouseFocesEle.transform = ""
            mouseFocesEle.opacity = ""
        })
    }
    {
        // 來源 ： https://codepen.io/spagettiguru/pen/PoqbOKm

        const bg = document.querySelector('#bg');

        const viewportWidth = document.documentElement.clientWidth;
        const viewportHeight = document.documentElement.clientHeight;
        const bgWidth = bg.clientWidth;
        const bgHeight = bg.clientHeight;

        document.addEventListener('mousemove', (e) => {
            const vDistanceFromCenter = viewportHeight / 2 - e.clientY;
            const hDistanceFromCenter = viewportWidth / 2 - e.clientX;
            {
                bg.style.top = "0"
                bg.style.left = "0"
                const maxXOffset = -30;
                const maxYOffset = -30;
                bg.style.transform = `translate(
            ${viewportWidth / 2 + (hDistanceFromCenter / (viewportWidth / 2) * maxXOffset) - bgWidth / 2}px,
            ${viewportHeight / 2 + (vDistanceFromCenter / (viewportHeight / 2) * maxYOffset) - bgHeight / 2}px)`;
            }
        });
    }
    {
        // 來源 ： https://codepen.io/ryanmorr/pen/JdOvYR
        // 開發中

        var menu = document.querySelector('#ctx-menu');

        function showMenu(x, y) {
            menu.style.left = x + 'px';
            menu.style.top = y + 'px';
            menu.classList.add('menu-show');
        }

        function hideMenu() {
            menu.classList.remove('menu-show');
        }

        function onContextMenu(e) {
            e.preventDefault();
            showMenu(e.pageX, e.pageY);
            document.addEventListener('mousedown', onMouseDown, false);
        }

        function onMouseDown(e) {
            hideMenu();
            document.removeEventListener('mousedown', onMouseDown);
        }

        document.addEventListener('contextmenu', onContextMenu, false);
    }
})