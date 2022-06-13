let previousRowIDNumber = 1
const BASE_URL = "https://gtc.m3m.dev"

$(function () {
    try{
        loadData()
    }catch (e) {
        addRow(null,null,null,null,1)
    }

    $("#addRow").click(function () {
        addRow()
    })


    $("#takeTime").keyup(function () {
        const time = $("#takeTime").val()
        if(!(time.split("_").length > 1)){
            const [hour, minute] = time.split(":")
            chrome.storage.sync.set({time:{hour, minute}})
        }
    })

    $("#submit").click(function () {
        saveCourses()

        showSuccess("با موفقیت ثبت شد")
    })

    $("#loginBtn").click(function (){
        changePage('activeAccount')
    })

    $("#backToMain").click(function (){
        changePage('index')
    })

    $("#sendPhoneBtn").click(function () {
        const phone = $("#phoneInp").val()
        if(phone.length !== 11 || phone.slice(0,2) !== "09"){
            showErr("شماره همراه اشتباه وارد شده است")
        }

        $.post(BASE_URL+"/buyCode",{ phone },function (data){
            if(data?.hasCode){
                showSuccess("کد فعال سازی برای شما ارسال شد.")
            }else {
                $("#goPayContainer").css({"display":"flex"})
            }
        })
    })

})

function loadData() {
    chrome.storage.sync.get(["time","curses"],function (data) {
        if(data?.time?.hour){
            const time = data.time
            $("#takeTime").val(time.hour+":"+time.minute)
        }
        if(data?.curses[0]){
            const curses = data.curses
            removeRow(1)
            for (const eCurse of curses) {
                addRow(eCurse[0],eCurse[1],eCurse[2],eCurse[3])
            }
        }else{
            addRow(null,null,null,null,1)
        }
    })
}



function addRow(val1=null,val2=null,val3=null,val4=null,numId=null) {
    const previousRIDN = numId ?? (previousRowIDNumber++)

    const newRow = $("<td></td>").addClass('flex flex-row space-x-1 items-center')

    const input1 = $("<input/>").attr({id: "inp_"+(previousRIDN)+"_1", placeholder:"__", 'data-slots':"_", "data-accept":"\\d", size:"2",}).addClass("border text-lg w-8 px-1 rounded").val(val1)
    const input2 = $("<input/>").attr({id: "inp_"+(previousRIDN)+"_2", placeholder:"__", 'data-slots':"_", "data-accept":"\\d", size:"2",}).addClass("border text-lg w-8 px-1 rounded").val(val2)
    const input3 = $("<input/>").attr({id: "inp_"+(previousRIDN)+"_3", placeholder:"___", 'data-slots':"_", "data-accept":"\\d", size:"3",}).addClass("border text-lg w-11 px-1 rounded").val(val3)
    const input4 = $("<input/>").attr({id: "inp_"+(previousRIDN)+"_4", placeholder:"__", 'data-slots':"_", "data-accept":"\\d", size:"2",}).addClass("border text-lg w-8 px-1 rounded").val(val4)

    const temp = previousRIDN
    const close = $("<span></span>").attr({id: "close_"+(previousRIDN)+"_0"}).addClass("mx-2 cursor-pointer").text("X").on('click',function () {
        removeRow(temp)
        saveCourses()
    })

    newRow.append(close,input4,input3,input2,input1)
    $("#rowsTable").append($("<tr></tr>").append(newRow))
}


function removeRow(rowNumId) {
    $("#inp_" + rowNumId + "_1").remove()
    $("#inp_" + rowNumId + "_2").remove()
    $("#inp_" + rowNumId + "_3").remove()
    $("#inp_" + rowNumId + "_4").remove()
    $("#close_" + rowNumId + "_0").remove()
}

function saveCourses() {
    const curses = []
    for (let i = 1; i <= previousRowIDNumber; i++) {
        let inp1 = $("#inp_" + i + "_1")
        let inp2 = $("#inp_" + i + "_2")
        let inp3 = $("#inp_" + i + "_3")
        let inp4 = $("#inp_" + i + "_4")
        if(inp1.length){
            if(
                inp1.val().length !== 2 || inp2.val().length !== 2 || inp3.val().length !== 3 || inp4.val().length !== 2 ||
                inp1.val().indexOf("_") !== -1 ||  inp2.val().indexOf("_") !== -1 ||  inp3.val().indexOf("_") !== -1 ||  inp4.val().indexOf("_") !== -1
            ){
                removeRow(i)
            }else{
                curses.push([inp1.val(),inp2.val(),inp3.val(),inp4.val()])
            }
        }
    }
    chrome.storage.sync.set({curses})
}


function changePage(nextPageName){
    chrome.storage.local.set({activePage: nextPageName});
    chrome.action.setPopup({popup: nextPageName+".html"});
    window.location.href = `/${nextPageName}.html`
}


function showErr(massage) {
    $("#statusError").text(massage)
    setTimeout(()=>{$("#statusError").text("")},2000)
}

function showSuccess(massage) {
    $("#statusSuccess").text(massage)
    setTimeout(()=>{$("#statusSuccess").text("")},2000)
}