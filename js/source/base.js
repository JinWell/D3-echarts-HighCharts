
//POST请求
function ajaxPost(url, data, success, error, dataType) {
    var jqxhr = $.post(url, data, function (data, textStatus, xhr) {
            if (typeof success === 'function')
                success(data, textStatus, xhr);
        }, dataType)
        .error(function (xhr) {
            if (typeof error === 'function')
                error(xhr);
        });
    return jqxhr;
}

//GET请求
function ajaxGet(){
    $.get();
}

$(function(){

    $("body").niceScroll({
        cursorwidth:"10px"
    });

})