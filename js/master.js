//check if there's local storage color option
let mainColors = localStorage.getItem("color-option");
if(mainColors!==null){
    //chainging the value of --main-color to color in local storage
    document.documentElement.style.setProperty('--main-color',mainColors);
    //removing active tag from all elements in local storage
    document.querySelectorAll(".colors-list li").forEach(element =>{
        element.classList.remove("active");
        //add active class to element with color === local storage item
         if(element.dataset.color===mainColors){
            element.classList.add("active");
        }
    });
}


//toggle spin class on icon and open settings menu
let toggleSettingsIcon =document.querySelector(".toggle-settings .fa-gear");
let SettingsBox =document.querySelector(".settings-box");
toggleSettingsIcon.onclick=function(){
    //toggle gear spin onclick
    this.classList.toggle("fa-spin");
    //open settings menu on click
    SettingsBox.classList.toggle("open");
};

// switch site colors
const colorsLi= document.querySelectorAll(".colors-list li");

//loop on list of colors in settings
colorsLi.forEach(li=> {
    //if color is clicked
    li.addEventListener("click",(e)=>{
        // set --main-color to chosen color
        document.documentElement.style.setProperty('--main-color',e.target.dataset.color);
        //set chosen color to local storage
        localStorage.setItem('color-option',e.target.dataset.color);
        //remove active class from all children
        handleActive(e);
    });
});

//random background option
let backgroundOption =true;

//variable to control the baclground interval
let backgroundInterval;

//check if there's local storage random background item
let backgroundLocalItem =localStorage.getItem("background-option");

//check if random background local storage is not empty
if(backgroundLocalItem!==null){
    //remove active class from all spans
    document.querySelectorAll(".random-backgrounds span").forEach(element =>{

        element.classList.remove("active");

    });
    //add active class to element with value === local storage item
    if(backgroundLocalItem==='true'){
        backgroundOption=true;
        document.querySelector(".random-backgrounds .yes").classList.add("active");

    } else {
        backgroundOption=false;
        document.querySelector(".random-backgrounds .no").classList.add("active");
    }
}

// random backgrounds toggle
const randomBackgroundsElement= document.querySelectorAll(".random-backgrounds span");

//loop on all spans
randomBackgroundsElement.forEach(span=> {
    //if span is clicked
    span.addEventListener("click",(e)=>{
        handleActive(e);

        if(e.target.dataset.background==='yes'){

            backgroundOption=true;

            randomizeImages();

            localStorage.setItem("background-option",true);

        } else {

            backgroundOption=false;

            clearInterval(backgroundInterval);

            localStorage.setItem("background-option",false);

        }
    });
});

//login 
const wrapper = document.querySelector(".wrapper");
const loginLink = document.querySelector(".login-link");
const registerLink = document.querySelector(".register-link");
const login = document.querySelector(".login");
const iconClose = document.querySelector(".icon-close");

login.addEventListener('click',()=>{
  wrapper.classList.add('active-login');
});
iconClose.addEventListener('click',()=>{
  wrapper.classList.remove('active-login');
});
registerLink.addEventListener('click',()=>{
  wrapper.classList.add('active');
});

loginLink.addEventListener('click',()=>{
  wrapper.classList.remove('active');
});

//select landing page element
let landingPage=document.querySelector(".landing-page");

//define images array
let imagesArray=["01.jpg","02.jpg","03.jpg","04.jpg","05.jpg"];

//function to randomize images
function randomizeImages(){

    if(backgroundOption===true){
        backgroundInterval=setInterval(()=>{
            //get random number
            let randomNumber=Math.floor(Math.random()*imagesArray.length);
            //change background image url
            landingPage.style.backgroundImage='url("images/'+imagesArray[randomNumber]+'")';
            },10000);
    }

};

randomizeImages ();

//select skills selector
let ourSkills = document.querySelector(".skills");
window.addEventListener("scroll", function() {
    //skills offset top
    let skillsOffsetTop = ourSkills.offsetTop;

    //outer height
    let skillsOuterHeight = ourSkills.offsetHeight;
  
    //window height
    let windowHeight = this.innerHeight;
  
    //window scrollTop
    let windowScrollTop = this.scrollY;
    if(windowScrollTop >= (skillsOuterHeight + skillsOffsetTop - windowHeight-350)){
        let allskills = document.querySelectorAll(".skill-box .skill-progress span");
        allskills.forEach(skill=>{
            skill.style.width=skill.dataset.progress;
        });
        }  else {
            let allskills = document.querySelectorAll(".skill-box .skill-progress span");
            allskills.forEach(skill=>{
            skill.style.width=0;
            });
        }
    });

// creat popup with the image
let ourGallery = document.querySelectorAll(".gallery img");

ourGallery.forEach(img => {

    img.addEventListener('click',(e)=> {

        //create overlay element
        let overlay = document.createElement("div");

        //add class to overlay
        overlay.className= 'popup-overlay';

        //append overlay to the body
        document.body.appendChild(overlay);

        //create the popup box
        let popupBox = document.createElement("div");

        // add class to the poppu box
        popupBox.className='popup-box'

        if(img.alt!==null){

            //create heading
            let imageHeading = document.createElement("h3");

            //create text for heading
            let imageText= document.createTextNode(img.alt);

            //append text to heading
            imageHeading.appendChild(imageText);

            //append image heading to popup box
            popupBox.appendChild(imageHeading);

        }

        // creat the popup img
        let popupImage = document.createElement("img");

        //set image source
        popupImage.src= img.src;

        // add image to popup box
        popupBox.appendChild(popupImage);

        // append the popup box to body
        document.body.appendChild(popupBox);
        
        //create the close span
        let closeButton = document.createElement("span");

        //create the close button text
        let closeButtonText = document.createTextNode("X");

        //append text to close button
        closeButton.appendChild(closeButtonText);

        //add class to close button
        closeButton.className = 'close-button';

        //add close buttong to the popup box
        popupBox.appendChild(closeButton);
        
    });

});
//close popup
document.addEventListener("click",function(e){
    if(e.target.className==='close-button'){
        //close open popup
        e.target.parentNode.remove();
        //remove overlay
        document.querySelector(".popup-overlay").remove();
    }
});
//select all bullets
const allBullets = document.querySelectorAll(".nav-bullets .bullet");

//select all links
const allLinks = document.querySelectorAll(".links a");

function scrollToArea(elements){
    elements.forEach(ele => {
        ele.addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelector(e.target.dataset.section).scrollIntoView({
                behavior: "smooth"
            })
    
        });
    });
}
scrollToArea(allBullets);
scrollToArea(allLinks);

//handle active state
function handleActive(ev){
    //remove active class from all children
    ev.target.parentElement.querySelectorAll(".active").forEach(element =>{
        element.classList.remove("active");
    });
    // add active class to chosen color
    ev.target.classList.add("active");
}

//bullets option
let bulletsSpan = document.querySelectorAll(".bullets-option span");

let bulletsContainer = document.querySelector(".nav-bullets");

let bulletStorageItem = localStorage.getItem("bullets-option");

if(bulletStorageItem!==null){
    bulletsSpan.forEach(span =>{
        span.classList.remove("active");
    });
    if(bulletStorageItem==='block'){
        bulletsContainer.style.display='block';
        document.querySelector(".bullets-option .yes").classList.add("active");
    }   else    {
        bulletsContainer.style.display='none';
        document.querySelector(".bullets-option .no").classList.add("active");
    }
}

bulletsSpan.forEach(span => {

    span.addEventListener("click",(e)=> {

        if(span.dataset.display==="show"){

            bulletsContainer.style.display="block";

            localStorage.setItem("bullets-option",'block');

        }   else    {
            bulletsContainer.style.display="none";

            localStorage.setItem("bullets-option",'none');
        }

        handleActive(e);
    });
});

//reset button
document.querySelector(".reset-options").onclick = function () {
    //localStorage.clear();
    localStorage.removeItem("bullets-option");
    localStorage.removeItem("color-option");
    localStorage.removeItem("background-option");

    //reload window

    window.location.reload();
};

// toggle link menu 
let toggleButton = document.querySelector(".toggle-menu");
let Links = document.querySelector(".links");

toggleButton.onclick = function (e) {
    // stop propagation
    e.stopPropagation(); 

    //toggle class "menu-active" on button

    this.classList.toggle("menu-active");

    //toggle class "open" on links

    Links.classList.toggle("open");
};
// stop propagation on menu 
Links.onclick = function(e) {
    e.stopPropagation();
};


// click anywhere outside menu and toggle button

document.addEventListener("click",(e) => {

    if(e.target!==toggleButton && e.target!==Links){
        
        //check if menu is open 
        if(Links.classList.contains("open")){
            //toggle class "menu-active" on button

            toggleButton.classList.toggle("menu-active");

            //toggle class "open" on links

            Links.classList.toggle("open");
        }

    }

});