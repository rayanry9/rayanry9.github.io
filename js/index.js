var data;
var blogData;

emailjs.init("user_dhNjUOCN0YAiEWBUAqzph");

function dropdownDisplay(id){
    if(id.style.display!="flex"){
        id.style.display="flex";
    }
    else{
        id.style.display="none";
    }
}

var carouselCounter=0;
var carousel=document.getElementById("picture-month-carousel");
function carouselLeft(){
    if(carouselCounter>0){
        var width=carousel.clientWidth;
        carousel.style.transform="translateX(-"+(width*(carouselCounter-1))+"px)";
        carouselCounter--;
        document.getElementById("picture-month-photographer").innerHTML="Picture By "+data.pictureMonth[carouselCounter].photographer;
    }
}
function carouselRight(){
    if(carouselCounter<carousel.children.length-1){
        var width=carousel.clientWidth;
        carousel.style.transform="translateX(-"+(width*(carouselCounter+1))+"px)";
        carouselCounter++;
        document.getElementById("picture-month-photographer").innerHTML="Picture By "+data.pictureMonth[carouselCounter].photographer;
    }
}
function sendEmail(){
    var name=document.getElementById("reach-us-name").value;
    var email=document.getElementById("reach-us-email").value;
    var story=document.getElementById("reach-us-story").value;

    if(name==""||email==""||story==""){
        alert("Fill all Fields");
    }
    else{
        document.getElementById("reach-us-name").value="";
        document.getElementById("reach-us-email").value="";
        document.getElementById("reach-us-story").value="";
        emailjs.send("service_mcmseca","template_3isbywe",{
            from_name:name,
            reply_to:email,
            message:story
        }).then((out)=>{
            console.log(out);
        },(err)=>{
            console.log(err);
            alert("Due to Error your Request could not be Proceeded, so please Retry. Or Send us your story at our Email.");
        });
    }
}


var galleryCarousel=document.getElementById("photo-gallery-carousel");
var galleryCarouselRequiredWidth=galleryCarousel.scrollWidth-galleryCarousel.clientWidth;
var galleryCarouselCounter=0;
function pictureGalleryLeft(){
    if(galleryCarouselCounter+(galleryCarouselRequiredWidth/5)<=0){
        galleryCarouselCounter+=(galleryCarouselRequiredWidth/5);
    }
    else{
        galleryCarouselCounter=0;
    }
    galleryCarousel.style.transform="translateX("+galleryCarouselCounter+"px)";

}
function pictureGalleryRight(){
    if(Math.abs(galleryCarouselCounter)+(galleryCarouselRequiredWidth/5)<=galleryCarouselRequiredWidth){
        galleryCarouselCounter-=(galleryCarouselRequiredWidth/5);
    }
    else{
        galleryCarouselCounter-=(galleryCarouselRequiredWidth-Math.abs(galleryCarouselCounter));
    }
    galleryCarousel.style.transform="translateX("+galleryCarouselCounter+"px)";
}


async function dataLoad(){
    await fetch("/data/index.json").then(response => response.json())
    .then(json=>data=json);
    await fetch("/data/blogs.json").then(response=>response.json()).then(json=>blogData=json);
    //Blog Month Data Load
    document.getElementById("month-blog-author").innerHTML=blogData[data.blogMonth.category][data.blogMonth.id].author;
    document.getElementById("month-blog-date").innerHTML=getBlogDate(blogData[data.blogMonth.category][data.blogMonth.id].epoch);
    document.getElementById("month-blog-title").innerHTML=blogData[data.blogMonth.category][data.blogMonth.id].title;
    document.getElementById("month-blog-desc").innerHTML=blogData[data.blogMonth.category][data.blogMonth.id].description;

    //Picture Month Data Load
    for(var i=0;i<data.pictureMonth.length;i++){
        var img=document.createElement("img");
        img.setAttribute("src",data.pictureMonth[i].href);
        document.getElementById("picture-month-carousel").appendChild(img);
    }
    document.getElementById("picture-month-photographer").innerHTML="Picture By "+data.pictureMonth[0].photographer;

    //Quote Month Data Load
    document.getElementById("quote-month-branding").innerHTML=data.quoteMonth.branding;
    document.getElementById("quote-month-storytelling").innerHTML=data.quoteMonth.storytelling;
    document.getElementById("quote-month-design").innerHTML=data.quoteMonth.design;
    document.getElementById("quote-month-consulting").innerHTML=data.quoteMonth.consulting;

    //Loading Images
    document.getElementById("blog-month-thumbnail").setAttribute("src",data.images.blogMonth);
    for(var i=1;i<=6;i++){
        document.getElementById("mini-blog-"+i).setAttribute("src","/img/mini-blog/"+i+".jpeg");
    }
    document.getElementById("blog-week-img").setAttribute("src",data.images.blogWeek);
    document.getElementById("book-month-img").setAttribute('src',data.images.bookMonth);
}

function getBlogDate(epoch){
    var now=Math.floor(Date.now()/1000);
    var diff=now-epoch;
    var out;
    if(diff<3600){
        out=Math.floor(diff/60)+" Mins Ago";
    }
    else if(diff<86400 && diff>3600){
        out=Math.floor(diff/3600)+" Hours Ago";
    }
    else if(diff<604800 && diff>86400){
        out=Math.floor(diff/86400)+ " Days Ago";
    }
    else if(diff>604800){
        var date=new Date(epoch*1000);
        out=date.getDate()+"/"+(date.getMonth()+1);
    }
    return out;
}
dataLoad();