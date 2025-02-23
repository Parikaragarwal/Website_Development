const navbar = document.querySelector("#siteHead");
const onHover = document.querySelectorAll(".main_dropDown");
const onHoverLinks = document.querySelectorAll(".siteHead>a");
const onHoverAfterLinks = document.querySelectorAll("#site_head a.behind_logo");

// border-bottom: 1vh solid rgb(0, 0, 0);
// onHoverLinks.forEach(element => {
//     element.addEventListener("mouseover", () => {
//         console.log("wow");
//         element.previousElementSibling.style.borderBottom = "1vh solid rgb(0, 0, 0)";
//     })
// });

onHover.forEach(element => {
    element.addEventListener('mouseenter', () => {
        // console.log("wow");
        element.previousElementSibling.style.borderBottom = "1vh solid black";
    })
});

    onHover.forEach(element => {
        element.addEventListener('mouseleave', () => {
            // console.log("wow");
            element.previousElementSibling.style.borderBottom = ""; //This thing resets the inline style
        })
    });

function vhToPixels(vh) {
    return Math.round(window.innerHeight * (vh / 100));
}

const headerHeight = 22;

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


    institute.style.top = '7vh';
    institute.style.left = '0vw';

    Academics.style.top = '7vh';
    Academics.style.left = '0vw';

    Admissions.style.top = '7vh';
    Admissions.style.left = '26.5vw';
    
    Faculty.style.top = '7vh';
    Faculty.style.left = '0vw';

    Placements.style.top = '7vh';
    Placements.style.left = '46.5vw';

    Alumni.style.top = '7vh';
    Alumni.style.left = '56.3vw';
}

window.onscroll = () => {
    if (window.scrollY >= pxHeight) {
        // console.log("Detected");
        setNewHeights();
        navbar.removeAttribute("id");
        navbar.setAttribute("id", "site_head");

        setTimeout(function () {
        document.querySelectorAll("#site_head a.behind_logo").forEach(element => {
            element.classList.remove("start");
        });
        }, 250);

        setTimeout(function () {
        document.querySelectorAll("#site_head a.after_logo").forEach(element => {
            element.classList.remove("back");
        });
        }, 250);
    } else {

        document.querySelectorAll("#site_head a.behind_logo").forEach(element => {
            if (!element.classList.contains("start"))
                element.classList.add("start");
        });

        document.querySelectorAll("#site_head a.after_logo").forEach(element => {
            if (!element.classList.contains("back"))
                element.classList.add("back");
        });
        
        removeNewHeight();
        navbar.removeAttribute("id");
        navbar.setAttribute("id", "siteHead");

    }
} 