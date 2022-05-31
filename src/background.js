let color = '#3aa757';

chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.get("time",function ({time}) {
        if(time.hasOwnProperty("hour")){
            console.log(time);
        }
    })
});