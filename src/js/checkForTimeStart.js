let timeCheckerIntervalID = -1

function init() {
    insertEnterCoursesScriptTag()

    timeCheckerIntervalID = setInterval(()=>{
        const [siteHour, siteMinute] = document.getElementById('_mt_bou').children[4].innerHTML.slice(0,8).split(":")
        chrome.storage.sync.get(["time","curses"],function (data) {
            if(data?.time){
                const definedTime = data?.time
                if(parseInt(siteHour) === parseInt(definedTime.hour) && parseInt(siteMinute) === parseInt(definedTime.minute)){
                    // check if courses are set
                    if(!data?.curses[0]) return false

                    const courses = data.curses

                    console.log("its time :)")
                    window.postMessage({type: "CALL_OPEN_ENTER_COURSES", courses}, "*")

                }
            }
        })
    },2000)
}

window.addEventListener("message", function(event) {
    // We only accept messages from ourselves
    if (event.source !== window) return;

    if (event.data.type && (event.data.type === "CALL_OPEN_ENTER_COURSES_res") && (event.data.status === "started")) {
        clearInterval(timeCheckerIntervalID)
        console.log("trying to start is stopped")
    }
}, false)


function insertEnterCoursesScriptTag() {
    const s = document.createElement('script');
    s.src = chrome.runtime.getURL('js/openEnterCourses.js');
    s.onload = function() {
        this.remove();
    };
    (document.head || document.documentElement).appendChild(s);
}


init()