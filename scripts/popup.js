$(document).ready(function () {

    let $messageElement = $("#message");

    $("#add-start").click(function () {
        sendMessageToContentScript({id: ADD_START_ID});
    });

    $("#add-end").click(function () {
        sendMessageToContentScript({id: ADD_END_ID});
    });
    $("#clear-image").click(function () {
        sendMessageToContentScript({id: CLEAR_IMAGES_ID});
    });

    $("#do-import").click(function () {

        var sourceUri = $("#source-url").val();
        var temp=sourceUri.split("\/");
        temp=temp[temp.length-1].split(".");
        var id=temp[0];
        chrome.extension.getBackgroundPage().console.log(id);

        if (sourceUri) {
            $messageElement.text("正在获取...");
            $.ajax({
                url: "https://wap.gamersky.com/gl/Content-"+id+".html",
                type: 'GET',
                scriptCharset: 'utf-8',
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                async: true,
                success: function (responseData) {
                    let title = $(responseData).find(".ymw-contxt-aside h1").text();
                    let articleElement = $(responseData).find("article").html();
                    $messageElement.text("获取成功！");
                    sendMessageToContentScript({
                        id: IMPORT_ARTICLE,
                        title: title,
                        articleElement: articleElement
                    });

                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    $messageElement.text(XMLHttpRequest.readyState + "请求失败！");
                }
            });

        }
    });
});





