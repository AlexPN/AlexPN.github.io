window.onscroll = function() {sticknavbar()};

function sticknavbar() {
    if (document.body.scrollTop > 128 || document.documentElement.scrollTop > 128) {
		document.getElementById("vertical_nav").style.top = (document.body.scrollTop || document.documentElement.scrollTop)+"px";
    } else {
		document.getElementById("vertical_nav").style.top = "128px";
    }
}