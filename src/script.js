let previousRowIDNumber = 1

$(function () {
    try{
        loadData()
    }catch (e) {}

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
                    inp1.remove();inp2.remove();inp3.remove();inp4.remove();
                }else{
                    curses.push([inp1.val(),inp2.val(),inp3.val(),inp4.val()])
                }
            }
        }
        chrome.storage.sync.set({curses})
        $("#statusSuccess").text("با موفقیت انجام شد")
        setTimeout(()=>{
            $("#statusSuccess").text("")
        },2000)
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
            $("#inp_1_1").remove();$("#inp_1_2").remove();$("#inp_1_3").remove();$("#inp_1_4").remove()
            for (const eCurse of curses) {
                addRow(eCurse[0],eCurse[1],eCurse[2],eCurse[3])
            }
        }
    })
}



function addRow(val1=null,val2=null,val3=null,val4=null) {
    previousRowIDNumber++

    const newRow = $("<td></td>").addClass('flex flex-row space-x-1')

    const input1 = $("<input/>").attr({id: "inp_"+(previousRowIDNumber)+"_1", placeholder:"__", 'data-slots':"_", "data-accept":"\\d", size:"2",}).addClass("border text-lg w-8 px-1 rounded").val(val1)
    const input2 = $("<input/>").attr({id: "inp_"+(previousRowIDNumber)+"_2", placeholder:"__", 'data-slots':"_", "data-accept":"\\d", size:"2",}).addClass("border text-lg w-8 px-1 rounded").val(val2)
    const input3 = $("<input/>").attr({id: "inp_"+(previousRowIDNumber)+"_3", placeholder:"___", 'data-slots':"_", "data-accept":"\\d", size:"3",}).addClass("border text-lg w-11 px-1 rounded").val(val3)
    const input4 = $("<input/>").attr({id: "inp_"+(previousRowIDNumber)+"_4", placeholder:"__", 'data-slots':"_", "data-accept":"\\d", size:"2",}).addClass("border text-lg w-8 px-1 rounded").val(val4)

    newRow.append(input1,input2,input3,input4)
    $("#rowsTable").append($("<tr></tr>").append(newRow))
}