function init() {
    chrome.storage.sync.get(["time","curses"],function (data) {

        chrome.runtime.sendMessage({ type: "FROM_CONTENT", text: "Something message here"}, (response)=>{
            console.log(response);
        })

        let timeCheckerIntervalID = -1
        if(data?.time){
            const definedTime = data?.time
            if(data?.curses[0]){
                const courses = data?.curses
                insertEnterCoursesScriptTag()

                timeCheckerIntervalID = setInterval(()=>{
                    const [siteHour, siteMinute] = document.getElementById('_mt_bou').children[4].innerHTML.slice(0,8).split(":")
                    if(parseInt(siteHour) === parseInt(definedTime.hour) && parseInt(siteMinute) === parseInt(definedTime.minute)){
                        console.log("its time :)")
                        // openEnterCourses(courses)
                        clearInterval(timeCheckerIntervalID)
                    }
                    console.log("site time => ", [siteHour, siteMinute].join(":"))
                },2000)
                console.log("found curses",courses)
            }
        }

    })
}

function insertEnterCoursesScriptTag() {
    const s = document.createElement('script');
    s.src = chrome.runtime.getURL('js/openEnterCourses.js');
    s.onload = function() {
        this.remove();
    };
    (document.head || document.documentElement).appendChild(s);
}


init()