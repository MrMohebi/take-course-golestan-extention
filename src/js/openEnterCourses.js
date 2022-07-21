let isStarted = false

window.addEventListener("message", function(event) {
    // We only accept messages from ourselves
    if (event.source !== window)
        return;

    if (event.data.type && (event.data.type === "CALL_OPEN_ENTER_COURSES") && !isStarted) {
        openEnterCourses(event.data.courses)
    }
}, false)


async function openEnterCourses(courseCodes){
    try {
        isStarted = true
        console.log('start opening')

        document.getElementById('Faci2').contentWindow[3][2].getMenu(true,'252','0','12100',3,this)

        await new Promise(r => setTimeout(r, 3000));

        document.getElementsByTagName("body")[0].click()

        // say that page is logged in and ready to start
        window.postMessage({type: "CALL_OPEN_ENTER_COURSES_res", status:"started"}, "*")

        let iframeId = findFrameId()

        // check if it doesn't have error. if it has, get back to menu
        while (
            !document.getElementById(iframeId).contentWindow.hasOwnProperty(5) ||
            !document.getElementById(iframeId).contentWindow[4].hasOwnProperty('ReturnMenu')||
            !document.getElementById(iframeId).contentWindow[5]?.document.getElementById('errtxt')?.title.length > 1
            ){
            await new Promise(r => setTimeout(r, 500));
        }
        if(document.getElementById(iframeId).contentWindow[5].document.getElementById('errtxt')?.title === "ثبت نام شما پايان يافته يا در مرحله ثبت نام قرار نداريد"){
            document.getElementById(iframeId).contentWindow[4].ReturnMenu()
            openEnterCourses(courseCodes)
            console.log("there is error in page!")
            return
        }


        while(
        !document.getElementById(iframeId).contentWindow.hasOwnProperty(3) ||
        !document.getElementById(iframeId).contentWindow[3].hasOwnProperty(1) ||
        document.getElementById(iframeId).contentWindow[3][1].document.getElementById('T01CNTITLE') === null){
            await new Promise(r => setTimeout(r, 500));
            console.log('page is not loaded')
        }

        while(document.getElementById(iframeId).contentWindow[5].document.getElementById('errtxt')?.title !== "عمليات با موفقيت انجام شد."){
            await addRowAndSubmitByFunc(iframeId, courseCodes)
            console.log("xxxxxx")
        }

        console.log('done')
    }catch (e) {
        isStarted = false
        console.log('not start')
    }

}

// async function addRowAndSubmitByBtn(iframeId, courseCodes){
//     await new Promise(r => setTimeout(r, 3000));
//
//     document.getElementById(iframeId).contentWindow[3][1].document.querySelector('[title="اضافه کردن يک درس به مجموعه دروس در دست ثبت نام"]').click()
//
//     const rows = document.getElementById(iframeId).contentWindow[3][1].document.getElementsByClassName("Inserted")
//
//     let steps = 0
//     for (const courseCode of courseCodes) {
//         const courseR = [...courseCode].reverse();
//         const row = rows[steps]
//         for (let i = 0; i < 5 ; i++) {
//             row.childNodes[i+2].childNodes[0].value = courseR[i]
//         }
//     }
// }


async function addRowAndSubmitByFunc(iframeId, courseCodes){
    function AddRowT01(e,l){T01=document.getElementById(l).contentWindow[3][1].T01,hb=document.getElementById(l).contentWindow[3][1].hb;var t=[...e].reverse();window.ActiveXObject,T01.DataRow=$(T01).attr("datarow"),T01.CurrAdded=parseInt(T01.CurrAdded)+1;var n=T01.insertRow();n.className="Inserted",(s=n.insertCell()).innerHTML='<SELECT style="WIDTH: 50px;height:15px" onchange="return update_T01XML(this,\'F3125\')"><OPTION></OPTION><OPTION value="1" cl_ass="ins">ثبت</OPTION>\t<OPTION value="3" cla_ss="wai">انتظار</OPTION></SELECT>',s.childNodes[0].value=1,s=n.insertCell();var s=n.insertCell();ZCell=T01.rows[T01.DataRow-1].cells[2],s.innerHTML=ZCell.innerHTML,s.childNodes[0].value=t[0],$("input",s).removeClass("HideElement");for(var r=0;r<3;r++)s=n.insertCell(),ZCell=T01.rows[T01.DataRow-1].cells[s.cellIndex],s.innerHTML=ZCell.innerHTML,$("input",s).removeClass("HideElement"),s.childNodes[0].value=t[r+1];return s=n.insertCell(),s=n.insertCell(),s=n.insertCell(),(s=n.insertCell()).className="zw",window.ActiveXObject||(s.className="zwMB"),(s=n.insertCell()).className="zw",window.ActiveXObject||(s.className="zwMB"),s=n.insertCell(),s=n.insertCell(),s=n.insertCell(),n.scrollIntoView(),window.ActiveXObject||($(".txt",n).each(function(e,l){$(l).MBPrepare()}),2==hb&&$("td.zwMB",n).removeClass("zwMB")),n}

    await new Promise(r => setTimeout(r, 3000));


    for (const courseCode of courseCodes) {
        AddRowT01(courseCode, iframeId)
    }

    await new Promise(r => setTimeout(r, 3000));

    document.getElementById(iframeId).contentWindow[4].IM13_Do_onclick()

}


function findFrameId() {
    let iframeId = 'Faci'
    for (let i = 3; i <200; i++) {
        const iframeTempId = iframeId + i
        if(document.getElementById(iframeTempId) !== null){
            return iframeTempId
        }
    }
}

async function stayAlive() {
    await new Promise(r => setTimeout(r, 600000));
    if(!!document.getElementById('Faci2')?.contentWindow[3][2]){
        document.getElementById('Faci2')?.contentWindow[3][2]?.getMenu(true,'252','0','12100',3,this)
        await new Promise(r => setTimeout(r, 5000));
        document.getElementsByTagName("body")[0].click()
        let iframeId = findFrameId()

        let countTries = 0
        while ((!document.getElementById(iframeId)?.contentWindow[4]?.hasOwnProperty('ReturnMenu')||!document.getElementById(iframeId).contentWindow.hasOwnProperty(5)) && countTries < 30){
            await new Promise(r => setTimeout(r, 500));
            countTries++
        }
        await new Promise(r => setTimeout(r, 5000));
        document.getElementById(iframeId)?.contentWindow[4]?.ReturnMenu()
        console.log("stay alive done")
    }
    stayAlive()
}

stayAlive()