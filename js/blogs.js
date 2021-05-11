const CATEGORY_STORY="stories";
const CATEGORY_POEM="poems";

var blogData;
var currentBlogPage=1;
var totalStoryBlogs=0;
var totalPoemBlogs=0;
var pagination=document.getElementById("pagination");

async function dataLoad(){
    var data;
    await fetch("./data/blogs.json").then(response => response.json())
    .then(json=>data=json);
    blogData=data;
    totalStoryBlogs=data[CATEGORY_STORY].length;
    totalPoemBlogs=data[CATEGORY_POEM].length;
    for(var i=1;i<=(totalStoryBlogs/10)+1;i++){
        var p=document.createElement("p");
        p.appendChild(document.createTextNode(i));
        p.setAttribute("onclick","paginationChange(\""+CATEGORY_STORY+"\",this.innerHTML)");
        if(i>3){
            p.style.display="none";
        }
        pagination.appendChild(p);
    }
    pageDataChange(CATEGORY_STORY);
}
dataLoad();


function dropdownDisplay(id){
    if(id.style.display!="flex"){
        id.style.display="flex";
    }
    else{
        id.style.display="none";
    }

}
function postsStory(){
    document.getElementById("posts-nav").children[0].style.opacity=1;
    document.getElementById("posts-nav").children[1].style.opacity=0.5;
    document.getElementById("story-container").style.display="flex";
    document.getElementById("poem-container").style.display="none";

    var elem=document.querySelectorAll("#pagination>p");
    elem.forEach(element => {
        element.remove();
    })

    for(var i=1;i<=(totalStoryBlogs/10)+1;i++){
        var p=document.createElement("p");
        p.appendChild(document.createTextNode(i));
        p.setAttribute("onclick","paginationChange(\""+CATEGORY_STORY+"\",this.innerHTML)");
        if(i>3){
            p.style.display="none";
        }
        pagination.appendChild(p);
    }
    currentBlogPage=1;
    paginationChange(CATEGORY_STORY,1);
}
function postsPoem(){
    document.getElementById("posts-nav").children[0].style.opacity=0.5;
    document.getElementById("posts-nav").children[1].style.opacity=1;
    document.getElementById("story-container").style.display="none";
    document.getElementById("poem-container").style.display="flex";

    var elem=document.querySelectorAll("#pagination>p");
    elem.forEach(element => {
        element.remove();
    })

    for(var i=1;i<=(totalPoemBlogs/10)+1;i++){
        var p=document.createElement("p");
        p.appendChild(document.createTextNode(i));
        p.setAttribute("onclick","paginationChange(\""+CATEGORY_POEM+"\",this.innerHTML)");
        if(i>3){
            p.style.display="none";
        }
        pagination.appendChild(p);
    }
    currentBlogPage=1;
    paginationChange(CATEGORY_POEM,1);
}


function paginationChange(category,pageNumber){
    pageNumber=parseInt(pageNumber);
    var paginationElem=document.querySelectorAll("#pagination>p");
    if(paginationElem.length>3){
        if(pageNumber>currentBlogPage){
            if(paginationElem.length>pageNumber && pageNumber>2){
                paginationElem[pageNumber-3].style.display="none";
                paginationElem[pageNumber].style.display="block";
            }
        }
        else if(pageNumber<currentBlogPage){
            if(pageNumber>1 && pageNumber<paginationElem.length-1){
                paginationElem[pageNumber+1].style.display="none";
                paginationElem[pageNumber-2].style.display="block";
            }
        }
    }

    paginationElem.forEach(element => {
        element.style.opacity=0.5;
    });
    paginationElem[pageNumber-1].style.opacity=1;

    currentBlogPage=pageNumber;
    pageDataChange(category);
}
function pageDataChange(category){
    var blogCount;
    var miniBlog;

    if(category==CATEGORY_STORY){
        miniBlog=document.querySelectorAll("#mini-story-blog");
        if(totalStoryBlogs-(currentBlogPage*10)>0){
            blogCount=10;

        }
        else{
            blogCount=totalStoryBlogs%10;
        }
    }
    else{
        miniBlog=document.querySelectorAll("#mini-poem-blog");
        if(totalPoemBlogs-(currentBlogPage*10)>0){
            blogCount=10;
        }
        else{
            blogCount=totalPoemBlogs%10;
        }
    }

    for(var i=0;i<blogCount;i++){
        miniBlog[i].style.display="block";
        miniBlog[i].children[1].innerHTML=blogData[category][i].author;
        miniBlog[i].children[2].innerHTML=getBlogDate(blogData[category][i].epoch);
        miniBlog[i].children[3].innerHTML=blogData[category][i].title;
        miniBlog[i].children[4].innerHTML=blogData[category][i].description;
        miniBlog[i].setAttribute("onclick","goToBlog(\""+blogData[category][i].href+"\")");
    }

}

function goToBlog(href){
    location.assign(location.origin+"/blogs/"+href);
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