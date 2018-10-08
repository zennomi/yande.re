// ==UserScript==
// @name         Get image's link from Yande.re
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  get image's link from yande.re
// @author       Zennomi
// @match        https://yande.re/post*
// @grant        none
// ==/UserScript==

// Lấy link ảnh rồi copy vào clipboard
// Update: Tải link ảnh về dưới dạng text
// Có một số ảnh Not Found do ấn bừa link =]]
// IDM làm nốt phần việc còn lại :vv


var btn = document.createElement("button");
var t = document.createTextNode("Go Pro");
var place = document.querySelector("#main-menu");
btn.appendChild(t);

btn.style.background = "#222";
btn.style.border = "2px solid #ffaaae";
btn.style.color = "#ffaaae";
btn.style.padding = "5px";
btn.addEventListener("click", getlink);
var sel = document.createElement("select");
var opt1 = document.createElement("option");
opt1.appendChild(document.createTextNode("Copy link ảnh"));
var opt2 = document.createElement("option");
opt2.appendChild(document.createTextNode("Tải toàn bộ link ảnh về"));
sel.appendChild(opt1);
sel.appendChild(opt2);
place.appendChild(sel);
place.appendChild(btn);


function getlink() {
    var imgArr = document.getElementsByClassName("largeimg");
    var imglink = "";
    console.log("Tìm thấy " + imgArr.length + " ảnh cần tải");
    for (var i = 0; i < imgArr.length; i++) {
        var linkart = imgArr[i].href;
        if (linkart.includes("/jpeg/")) {
            linkart = linkart.replace("/jpeg/", "/image/");
            imglink = imglink + " " + linkart;
            imglink = imglink + " " + linkart.replace("jpg", "png");
        } else {
            imglink = imglink + " " + linkart;
        }
    }
    if (sel.selectedIndex == 0) {
        copylink(imglink);
    }
    if (sel.selectedIndex == 1) {
        downlink(document.title+".txt", imglink);
    }
    if (confirm("Go pro tiếp không?")) {
        var linkpage = window.location.href;
        do {
            var n = prompt("Muốn đến page nào nữa?");
            if (isNaN(n)) {alert("Mày nhập clgt? Số cơ mà? Không nhập nữa thì ấn huỷ");}
        }
        while (isNaN(n));
        if (n != null ) {
            if (linkpage == "https://yande.re/post") { // Trang chủ
                linkpage = linkpage.replace("post", "post?page=" + n);
            }
            if (linkpage.includes("post?page=")) { // Một trang bất kì khác 1
                var r = /\d+/;
                linkpage = linkpage.replace(linkpage.match(r), n);
            } else { // Một trang đầu
                linkpage = linkpage.replace("post?", "post?page=" + n + "&");
            }
            window.location.href = linkpage;}}
}

function downlink(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

function copylink(textcopy) {
    var el = document.createElement('textarea');
    el.value = textcopy;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
}

