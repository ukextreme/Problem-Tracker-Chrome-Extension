
const bookmarkImgURL = chrome.runtime.getURL("assets/bookmark.png");
const AZ_PROBLEM_KEY = "AZ_PROBLEM_KEY";


const observer = new MutationObserver(() => {
    addBookmarkButton();
});
observer.observe(document.body, {childList: true, subtree: true});
addBookmarkButton();

function onProblemsPage(){
    return window.location.pathname.startsWith('/problems/');
}

function addBookmarkButton(){
    if(!onProblemsPage() || document.getElementById("add-bookmark-button"))return;

    const bookmarkButton = document.createElement('img');
    bookmarkButton.id = "add-bookmark-button";
    bookmarkButton.src = bookmarkImgURL;
    bookmarkButton.style.height = "30px";
    bookmarkButton.style.width = "30px";
    const topicname = document.getElementsByClassName("coding_problem_info_heading__G9ueL")[0];
    if (!topicname) return; // prevent crash
    topicname.insertAdjacentElement("beforebegin", bookmarkButton);


    bookmarkButton.addEventListener("click",addNewBookmarkHandler);
}

async function addNewBookmarkHandler(){
    const currentBookmarks = await getCurrentBookmarks();
    const azProblemUrl = window.location.href;
    const uniqueId = extractUniqueId(azProblemUrl);
    const problemName = document.getElementsByClassName("Header_resource_heading__cpRp1")[0].innerText;

    if(currentBookmarks.some((bookmark) => bookmark.id === uniqueId)) return;
    const bookmarkObj = {
        id : uniqueId,
        name :  problemName,
        url : azProblemUrl
    }

    const updatedBookmarks = [...currentBookmarks, bookmarkObj];

    chrome.storage.sync.set({[AZ_PROBLEM_KEY] : updatedBookmarks} , () => {
        console.log("Updated the bookmarks currently to ",updatedBookmarks);
    });
}
function extractUniqueId(url){
    const start = url.indexOf("problems/") + "problems/".length;
    const end = url.indexOf("?", start);
    return end === -1? url.substring(start): url.substring(start, end);
}
function getCurrentBookmarks(){
    return new Promise((resolve,reject) => {
        chrome.storage.sync.get([AZ_PROBLEM_KEY], (results) => {
            resolve(results[AZ_PROBLEM_KEY] || []);
        });
    });
}
