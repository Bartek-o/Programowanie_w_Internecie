document.getElementById("menu_icon").addEventListener("click", function () {
    var mobile = document.getElementById("menu_mobile");

    if (mobile.style.display === "grid") {
        mobile.style.animationName = "hide";
        setTimeout(function() { mobile.style.display = "none"; }, 1000);
    } else {
        mobile.style.animationName = "show";
        mobile.style.display = "grid";
    }

    var child = mobile.childNodes;
    for (var i = 1; i < child.length; i = i + 2) {
        child[i].addEventListener("click", function () {
            mobile.style.animationName = "hide";
            setTimeout(function() { mobile.style.display = "none"; }, 1000);
        })
    }
})