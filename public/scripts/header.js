const navbar = document.querySelector("#siteHead");


function vhToPixels(vh) {
    return Math.round(window.innerHeight * (vh / 100));
}

const headerHeight = 20;

const pxHeight = vhToPixels(headerHeight);

function setNewHeights() {
    const institute = document.querySelector(".Institute_dropDown");
    const Academics = document.querySelector(".Academics_dropDown");
    const Admissions = document.querySelector(".Admissions_dropDown");
    const Faculty = document.querySelector(".Faculty_dropDown");
    const Placements = document.querySelector(".Placements_dropDown");
    const Alumni = document.querySelector(".Alumni_dropDown");


    institute.style.top = '9vh';
    institute.style.left = '7.5vw';

    Academics.style.top = '9vh';
    Academics.style.left = '7.5vw';

    Admissions.style.top = '9vh';
    Admissions.style.left = '31vw';

    Faculty.style.top = '9vh';
    Faculty.style.left = '7.5vw';

    Placements.style.top = '9vh';
    Placements.style.left = '61vw';

    Alumni.style.top = '9vh';
    Alumni.style.left = '69vw';
}

function removeNewHeight() {
    const institute = document.querySelector(".Institute_dropDown");
    const Academics = document.querySelector(".Academics_dropDown");
    const Admissions = document.querySelector(".Admissions_dropDown");
    const Faculty = document.querySelector(".Faculty_dropDown");
    const Placements = document.querySelector(".Placements_dropDown");
    const Alumni = document.querySelector(".Alumni_dropDown");


    institute.style.top = '19.4vh';
    institute.style.left = '0vw';

    Academics.style.top = '19.4vh';
    Academics.style.left = '0vw';

    Admissions.style.top = '19.4vh';
    Admissions.style.left = '26.5vw';
    
    Faculty.style.top = '19.4vh';
    Faculty.style.left = '0vw';

    Placements.style.top = '19.4vh';
    Placements.style.left = '46.5vw';

    Alumni.style.top = '19.4vh';
    Alumni.style.left = '56.3vw';
}

window.onscroll = () => {
    if (window.scrollY >= pxHeight) {
        // console.log("Detected");
        setNewHeights();
        navbar.removeAttribute("id");
        navbar.setAttribute("id", "site_head");
    } else {
        removeNewHeight();
        navbar.removeAttribute("id");
        navbar.setAttribute("id", "siteHead");
    }
} 