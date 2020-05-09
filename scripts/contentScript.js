function sendResponse() {

}

function random(lower, upper) {
    return Math.floor(Math.random() * (upper - lower)) + lower;
}

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    switch (message.id) {
        case ADD_START_ID:
            addStart();
            break;
        case ADD_END_ID:
            addEnd();
            break;
        case CLEAR_IMAGES_ID:
            clearImages();
            break;
        case IMPORT_ARTICLE:
            importArticle(message);
            break;

    }
});

function addStart() {
    var $body = $('iframe').contents().find('body');
    var randomNumber2 = random(1, startList.length) - 1;
    $body.prepend("<p>" + startList[randomNumber2] + "</p>");
}

function addEnd() {
    var $body = $('iframe').contents().find('body');
    var randomNumber = random(1, endList.length) - 1;
    $body.append("<p>" + endList[randomNumber] + "</p>");
}

function clearImages() {
    //初始化数据
    var $body = $('iframe').contents().find('body');
    //清除图片
    $body.find("img").remove();
}

function importArticle(message) {
    $("#title").val(message.title);

    var $body = $('iframe').contents().find('body');
    $body.empty();
    $body.append(message.articleElement);

    function top1() {
        $body.scrollTop($body[0].scrollHeight);
    }

    setTimeout('top1()', 100);
}
