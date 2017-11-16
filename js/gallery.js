var ImgList;
var CaptionList;
var CurrentImage = 0;

function GalleryFSOpen() {
	ImgList = document.getElementsByClassName("gallery_fs_img");
	CaptionList = document.getElementsByClassName("tooltiptext");
	document.getElementById("gallery_fs").style.display = "block";
}

function GalleryFSClose() {
	for (i = 0; i<ImgList.length; i++) {
		ImgList[i].style.display = "none";	
	}
	document.getElementById("gallery_fs").style.display = "none";
}

function GalleryFSCImg(cImg) {
	CurrentImage = cImg;
	GalleryFSDisplay(cImg);
}

function GalleryFSDisplay(index) {
	ImgList[index].style.display = "block";
	document.getElementById("GalleryFSCaption").innerHTML = CaptionList[index].innerHTML;
}

function GalleryFSNext() {
	ImgList[CurrentImage].style.display = "none";
	if (CurrentImage >= ImgList.length-1) {
		CurrentImage = 0;
	}
	else {
		CurrentImage++;
	}
	GalleryFSDisplay(CurrentImage);
}

function GalleryFSPrev() {
	ImgList[CurrentImage].style.display = "none";
	if (CurrentImage <= 0) {
		CurrentImage = ImgList.length-1;
	}
	else {
		CurrentImage--;
	}
	GalleryFSDisplay(CurrentImage);
}