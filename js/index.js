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
    }
}
function carouselRight(){
    if(carouselCounter<carousel.children.length-1){
        var width=carousel.clientWidth;
        carousel.style.transform="translateX(-"+(width*(carouselCounter+1))+"px)";
        carouselCounter++;
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
    var data;
    await fetch("./data/index.json").then(response => response.json())
    .then(json=>data=json);

    //Blog Month Data Load
    document.getElementById("month-blog-author").innerHTML=data.blogMonth.author;
    document.getElementById("month-blog-date").innerHTML=getBlogDate(data.blogMonth.epoch);
    document.getElementById("month-blog-title").innerHTML=data.blogMonth.title;
    document.getElementById("month-blog-desc").innerHTML=data.blogMonth.description;

    //Quote Month Data Load
    document.getElementById("quote-month-branding").innerHTML=data.quoteMonth.branding;
    document.getElementById("quote-month-storytelling").innerHTML=data.quoteMonth.storytelling;
    document.getElementById("quote-month-design").innerHTML=data.quoteMonth.design;
    document.getElementById("quote-month-consulting").innerHTML=data.quoteMonth.consulting;


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