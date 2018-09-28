// ==UserScript==
// @name         Get link Yande.re
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  tải ảnh hen chứ làm cái cc gì nữa
// @author       You
// @match        https://yande.re/*
// @grant        none
// ==/UserScript==

var btn = document.createElement("BUTTON");
var t = document.createTextNode("CLICK ME");
var replace = document.querySelector("#site-title");
btn.appendChild(t);
replace.appendChild(btn);
