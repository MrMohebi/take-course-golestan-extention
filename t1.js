function AddRowT01(courseCode, frameID) {
    T01 = document.getElementById(frameID).contentWindow[3][1].T01, hb = document.getElementById(frameID).contentWindow[3][1].hb;
    var corserR = [...courseCode].reverse();
    window.ActiveXObject, T01.DataRow = $(T01).attr("datarow"), T01.CurrAdded = parseInt(T01.CurrAdded) + 1;
    var n = T01.insertRow();
    n.className = "Inserted", (s = n.insertCell()).innerHTML = '<SELECT style="WIDTH: 50px;height:15px" onchange="return update_T01XML(this,\'F3125\')"><OPTION></OPTION><OPTION value="1" cl_ass="ins">ثبت</OPTION>\t<OPTION value="3" cla_ss="wai">انتظار</OPTION></SELECT>', s.childNodes[0].value = 1, s = n.insertCell();
    var s = n.insertCell();
    ZCell = T01.rows[T01.DataRow - 1].cells[2], s.innerHTML = ZCell.innerHTML, s.childNodes[0].value = corserR[0], $("input", s).removeClass("HideElement");
    for (var number = 0; number < 3; number++) s = n.insertCell(), ZCell = T01.rows[T01.DataRow - 1].cells[s.cellIndex], s.innerHTML = ZCell.innerHTML, $("input", s).removeClass("HideElement"), s.childNodes[0].value = corserR[number + 1];
    return s = n.insertCell(), s = n.insertCell(), s = n.insertCell(), (s = n.insertCell()).className = "zw", window.ActiveXObject || (s.className = "zwMB"), (s = n.insertCell()).className = "zw", window.ActiveXObject || (s.className = "zwMB"), s = n.insertCell(), s = n.insertCell(), s = n.insertCell(), n.scrollIntoView(), window.ActiveXObject || ($(".txt", n).each(function(e, l) {
        $(l).MBPrepare()
    }), 2 == hb && $("td.zwMB", n).removeClass("zwMB")), n
}

function AddRowT01(courseCode, frameID){
    T01 = document.getElementById(frameID).contentWindow[3][1].T01, hb = document.getElementById(frameID).contentWindow[3][1].hb;
    var corserR = [...courseCode].reverse();
    if(!window.ActiveXObject)
        T01.DataRow = $(T01).attr("datarow");
    T01.CurrAdded=parseInt(T01.CurrAdded)+1;
    var TR=T01.insertRow();
    TR.className="Inserted";
    var TD=TR.insertCell();
    TD.innerHTML='<SELECT style="WIDTH: 50px;height:15px" onchange="return update_T01XML(this,\'F3125\')"><OPTION></OPTION><OPTION value="1" cl_ass="ins">ثبت</OPTION>	<OPTION value="3" cla_ss="wai">انتظار</OPTION></SELECT>';
    TD.childNodes[0].value=1;

    TD=TR.insertCell();

//-- Course Group
    var TD=TR.insertCell();
    ZCell=T01.rows[T01.DataRow-1].cells[2];//Zero Row Cell Number 1
    TD.innerHTML=ZCell.innerHTML;
    //if(!window.ActiveXObject)
    TD.childNodes[0].value = corserR[0]
    $("input",TD).removeClass("HideElement")
//-- 3 Cell For CourseNo
    for(var k=0;k<3;k++){
        TD=TR.insertCell();
        ZCell=T01.rows[T01.DataRow-1].cells[TD.cellIndex];
        TD.innerHTML=ZCell.innerHTML;
        //if(!window.ActiveXObject)

        $("input",TD).removeClass("HideElement")
        TD.childNodes[0].value = corserR[k+1]
    }
//branch
    TD = TR.insertCell();
//-- Course Name
    TD=TR.insertCell();
//-- Unit
    TD=TR.insertCell();
// -- Lab Unit
    TD=TR.insertCell();
    TD.className="zw";
    if(!window.ActiveXObject)
        TD.className="zwMB";
//-- Course Type
    TD=TR.insertCell();
    //if(!window.ActiveXObject)
    TD.className="zw";
    if(!window.ActiveXObject)
        TD.className="zwMB";
//-- Reg Status
    TD=TR.insertCell();
//-- Register Step
    TD=TR.insertCell();
//-- Notes
    TD=TR.insertCell();
    TR.scrollIntoView();
    if(!window.ActiveXObject){
        $(".txt", TR).each(function(i, v) {
            $(v).MBPrepare();
        })
        if(hb==2)
            $("td.zwMB",TR).removeClass("zwMB");
    }
    TR.cells[5].childNodes[0].change()
    return TR;
}


