
async function openEnterCourses(courseCodes){
    console.log('start opening')

    document.getElementById('Faci2').contentWindow[3][2].getMenu(true,'252','0','12100',3,this)

    await new Promise(r => setTimeout(r, 3000));



    document.getElementsByTagName("body")[0].click()

    function AddRowT01(e,l){T01=document.getElementById(l).contentWindow[3][1].T01,hb=document.getElementById(l).contentWindow[3][1].hb;var t=[...e].reverse();window.ActiveXObject,T01.DataRow=$(T01).attr("datarow"),T01.CurrAdded=parseInt(T01.CurrAdded)+1;var n=T01.insertRow();n.className="Inserted",(s=n.insertCell()).innerHTML='<SELECT style="WIDTH: 50px;height:15px" onchange="return update_T01XML(this,\'F3125\')"><OPTION></OPTION><OPTION value="1" cl_ass="ins">ثبت</OPTION>\t<OPTION value="3" cla_ss="wai">انتظار</OPTION></SELECT>',s.childNodes[0].value=1,s=n.insertCell();var s=n.insertCell();ZCell=T01.rows[T01.DataRow-1].cells[2],s.innerHTML=ZCell.innerHTML,s.childNodes[0].value=t[0],$("input",s).removeClass("HideElement");for(var r=0;r<3;r++)s=n.insertCell(),ZCell=T01.rows[T01.DataRow-1].cells[s.cellIndex],s.innerHTML=ZCell.innerHTML,$("input",s).removeClass("HideElement"),s.childNodes[0].value=t[r+1];return s=n.insertCell(),s=n.insertCell(),s=n.insertCell(),(s=n.insertCell()).className="zw",window.ActiveXObject||(s.className="zwMB"),(s=n.insertCell()).className="zw",window.ActiveXObject||(s.className="zwMB"),s=n.insertCell(),s=n.insertCell(),s=n.insertCell(),n.scrollIntoView(),window.ActiveXObject||($(".txt",n).each(function(e,l){$(l).MBPrepare()}),2==hb&&$("td.zwMB",n).removeClass("zwMB")),n}


    const iframeId = 'Faci3'

    while(document.getElementById(iframeId) === null ||
    !document.getElementById(iframeId).contentWindow.hasOwnProperty(3) ||
    !document.getElementById(iframeId).contentWindow.hasOwnProperty(4) ||
    !document.getElementById(iframeId).contentWindow[3].hasOwnProperty(1) ||
    document.getElementById(iframeId).contentWindow[3][1].document.getElementById('T01CNTITLE') === null){
        await new Promise(r => setTimeout(r, 500));
        console.log('page is not loaded')

    }

    for (const courseCode of courseCodes) {
        AddRowT01(courseCode, iframeId)
    }

    await new Promise(r => setTimeout(r, 3000));
    document.getElementById(iframeId).contentWindow[4].IM13_Do_onclick()

    console.log('done')
}