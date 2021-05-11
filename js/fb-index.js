var storage=firebase.storage();
var storageRef=storage.ref();

var blogMonthThumbnail=storageRef.child("index/blog-month-thumbnail.png");
blogMonthThumbnail.getDownloadURL().then((url)=>{
    var img=document.getElementById("blog-month-thumbnail");
    img.setAttribute('src', url);
}).catch((err)=>{
    console.log(err);
})
function writtenWrongImg(){
    storageRef.child("index/mini-blog-1.jpeg").getDownloadURL().then((url)=>{
        var img=document.getElementById("mini-blog-1");
        img.setAttribute('src',url);
    }).catch((err)=>{
        console.log(err);
    })
    storageRef.child("index/mini-blog-2.jpeg").getDownloadURL().then((url)=>{
        var img=document.getElementById("mini-blog-2");
        img.setAttribute('src',url);
    }).catch((err)=>{
        console.log(err);
    })
    storageRef.child("index/mini-blog-3.jpeg").getDownloadURL().then((url)=>{
        var img=document.getElementById("mini-blog-3");
        img.setAttribute('src',url);
    }).catch((err)=>{
        console.log(err);
    })
    storageRef.child("index/mini-blog-4.jpeg").getDownloadURL().then((url)=>{
        var img=document.getElementById("mini-blog-4");
        img.setAttribute('src',url);
    }).catch((err)=>{
        console.log(err);
    })
    storageRef.child("index/mini-blog-5.jpeg").getDownloadURL().then((url)=>{
        var img=document.getElementById("mini-blog-5");
        img.setAttribute('src',url);
    }).catch((err)=>{
        console.log(err);
    })
    storageRef.child("index/mini-blog-6.jpeg").getDownloadURL().then((url)=>{
        var img=document.getElementById("mini-blog-6");
        img.setAttribute('src',url);
    }).catch((err)=>{
        console.log(err);
    })

    storageRef.child("index/blog-week.jpeg").getDownloadURL().then((url)=>{
        var img=document.getElementById("blog-week-img");
        img.setAttribute('src',url);
    }).catch((err)=>{
        console.log(err);
    })
    storageRef.child("index/book-month.jpeg").getDownloadURL().then((url)=>{
        var img=document.getElementById("book-month-img");
        img.setAttribute('src',url);
    }).catch((err)=>{
        console.log(err);
    })
}

var pictureMonthCarousel=document.getElementById("picture-month-carousel");
function carouselImg(){
    storageRef.child("index/carousel").listAll().then((res)=>{
        res.items.forEach(itemRef => {
            itemRef.getDownloadURL().then((url)=>{
                var img=document.createElement("img");
                img.setAttribute("src",url);
                pictureMonthCarousel.appendChild(img);
            })
        });
    })
}
// writtenWrongImg();
//carouselImg();

