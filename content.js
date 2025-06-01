
const bookmarkImgURL = chrome.runtime.getURL("assets/bookmark.png");

window.addEventListener("load", addBookmarkButton);

function addBookmarkButton(){
    const bookmarkButton = document.createElement('img');
    bookmarkButton.id = "add-bookmark-button";
    bookmarkButton.src = bookmarkImgURL;
    bookmarkButton.style.height = "30px";
    bookmarkButton.style.width = "30px";
    const topicname = document.getElementsByClassName("coding_problem_info_heading__G9ueL")[0];
    topicname.insertAdjacentElement("beforebegin",bookmarkButton);
}

