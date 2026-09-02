/* =========================================================
   BOOK MY HOSTEL
   Main JavaScript
========================================================= */


/* =========================================================
   ELEMENTS
========================================================= */

const loginBtn = document.getElementById("loginBtn");
const signupBtn = document.getElementById("signupBtn");

const loginModal = document.getElementById("loginModal");
const signupModal = document.getElementById("signupModal");

const getStartedBtn = document.getElementById("getStartedBtn");
const exploreBtn = document.getElementById("exploreBtn");

const searchInput = document.getElementById("hostelSearch");
const searchBtn = document.getElementById("searchBtn");
const hostelList = document.getElementById("hostelList");


/* =========================================================
   LOGIN MODAL
========================================================= */

loginBtn.addEventListener("click", () => {

    loginModal.classList.add("active");

});


/* =========================================================
   SIGNUP MODAL
========================================================= */

signupBtn.addEventListener("click", () => {

    signupModal.classList.add("active");

});


/* =========================================================
   CLOSE MODALS
========================================================= */

const closeButtons =
    document.querySelectorAll(".close-modal");

closeButtons.forEach(button => {

    button.addEventListener("click", () => {

        const modalId =
            button.getAttribute("data-close");

        document
            .getElementById(modalId)
            .classList.remove("active");

    });

});


/* =========================================================
   CLOSE MODAL WHEN CLICKING OUTSIDE
========================================================= */

document
    .querySelectorAll(".modal-overlay")
    .forEach(overlay => {

        overlay.addEventListener("click", event => {

            if (event.target === overlay) {

                overlay.classList.remove("active");

            }

        });

    });


/* =========================================================
   ESCAPE KEY CLOSES MODAL
========================================================= */

document.addEventListener("keydown", event => {

    if (event.key === "Escape") {

        loginModal.classList.remove("active");

        signupModal.classList.remove("active");

    }

});


/* =========================================================
   GET STARTED BUTTON
========================================================= */

getStartedBtn.addEventListener("click", () => {

    const features =
        document.getElementById("features");

    features.scrollIntoView({
        behavior: "smooth"
    });

});


/* =========================================================
   EXPLORE ROOMS BUTTON
========================================================= */

exploreBtn.addEventListener("click", () => {

    const hostelCard =
        document.querySelector(".hostel-card");

    hostelCard.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

});


/* =========================================================
   SEARCH FUNCTION
========================================================= */

function searchHostels() {

    const searchValue =
        searchInput.value
            .trim()
            .toLowerCase();


    const hostelItems =
        document.querySelectorAll(".hostel-item");


    /* Empty search */

    if (searchValue === "") {

        hostelItems.forEach(item => {

            item.style.display = "flex";

        });

        return;

    }


    let found = false;


    hostelItems.forEach(item => {

        const text =
            item.innerText.toLowerCase();


        if (text.includes(searchValue)) {

            item.style.display = "flex";

            found = true;

        } else {

            item.style.display = "none";

        }

    });


    /* No results */

    const existingMessage =
        document.querySelector(".search-result-message");


    if (!found) {

        if (!existingMessage) {

            const message =
                document.createElement("div");

            message.className =
                "search-result-message";

            message.innerHTML =
                `
                <i class="fa-solid fa-magnifying-glass"></i>
                <br><br>
                No hostels found for "<strong>${searchValue}</strong>"
                `;

            hostelList.appendChild(message);

        }

    } else {

        if (existingMessage) {

            existingMessage.remove();

        }

    }

}


/* Search button */

searchBtn.addEventListener(
    "click",
    searchHostels
);


/* Search using Enter */

searchInput.addEventListener(
    "keydown",
    event => {

        if (event.key === "Enter") {

            searchHostels();

        }

    }
);


/* Live search */

searchInput.addEventListener(
    "input",
    () => {

        if (searchInput.value.trim() === "") {

            document
                .querySelectorAll(".hostel-item")
                .forEach(item => {

                    item.style.display = "flex";

                });


            const message =
                document.querySelector(
                    ".search-result-message"
                );

            if (message) {

                message.remove();

            }

        }

    }
);


/* =========================================================
   COUNTER ANIMATION
========================================================= */

const counters =
    document.querySelectorAll(".counter");


function animateCounter(counter) {

    const target =
        parseFloat(
            counter.getAttribute("data-target")
        );


    const duration = 1600;

    const startTime =
        performance.now();


    function updateCounter(currentTime) {

        const elapsed =
            currentTime - startTime;


        const progress =
            Math.min(
                elapsed / duration,
                1
            );


        /*
            Ease-out animation
        */

        const easeOut =
            1 - Math.pow(
                1 - progress,
                3
            );


        const current =
            target * easeOut;


        if (target % 1 !== 0) {

            counter.textContent =
                current.toFixed(1);

        } else {

            counter.textContent =
                Math.floor(current);

        }


        if (progress < 1) {

            requestAnimationFrame(
                updateCounter
            );

        }

    }


    requestAnimationFrame(
        updateCounter
    );

}


/* Start counters */

setTimeout(() => {

    counters.forEach(counter => {

        animateCounter(counter);

    });

}, 500);


/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements =
    document.querySelectorAll(
        ".simple-section, .feature-card"
    );


revealElements.forEach(element => {

    element.classList.add("reveal");

});


const observer =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                }

            });

        },
        {
            threshold: 0.15
        }
    );


revealElements.forEach(element => {

    observer.observe(element);

});


/* =========================================================
   NAVIGATION ACTIVE STATE
========================================================= */

const navLinks =
    document.querySelectorAll(".nav-link");


navLinks.forEach(link => {

    link.addEventListener("click", () => {

        navLinks.forEach(item => {

            item.classList.remove("active");

        });

        link.classList.add("active");

    });

});


/* =========================================================
   UPDATE NAV ACTIVE SECTION ON SCROLL
========================================================= */

const sections =
    document.querySelectorAll(
        "section[id]"
    );


window.addEventListener(
    "scroll",
    () => {

        let currentSection = "";

        sections.forEach(section => {

            const sectionTop =
                section.offsetTop - 150;

            if (
                window.scrollY >=
                sectionTop
            ) {

                currentSection =
                    section.getAttribute("id");

            }

        });


        navLinks.forEach(link => {

            link.classList.remove("active");


            if (
                link.getAttribute("href") ===
                `#${currentSection}`
            ) {

                link.classList.add("active");

            }

        });

    }
);


/* =========================================================
   MOUSE PARALLAX EFFECT
========================================================= */

const heroVisual =
    document.querySelector(".hero-visual");


document.addEventListener(
    "mousemove",
    event => {

        /*
            Disable stronger movement on mobile.
        */

        if (window.innerWidth < 900) {
            return;
        }


        const x =
            (window.innerWidth / 2 -
                event.clientX) / 80;


        const y =
            (window.innerHeight / 2 -
                event.clientY) / 100;


        heroVisual.style.transform =
            `translate(${x}px, ${y}px)`;

    }
);


/* =========================================================
   RESET PARALLAX WHEN MOUSE LEAVES
========================================================= */

document.addEventListener(
    "mouseleave",
    () => {

        heroVisual.style.transform =
            "translate(0, 0)";

    }
);


/* =========================================================
   LOGIN FORM
========================================================= */

const loginForm =
    document.getElementById("loginForm");


loginForm.addEventListener(
    "submit",
    event => {

        event.preventDefault();


        alert(
            "Login system will be connected to your database here."
        );


        loginModal.classList.remove(
            "active"
        );

    }
);


/* =========================================================
   SIGNUP FORM
========================================================= */

const signupForm =
    document.getElementById("signupForm");


signupForm.addEventListener(
    "submit",
    event => {

        event.preventDefault();


        alert(
            "Signup system will be connected to your database here."
        );


        signupModal.classList.remove(
            "active"
        );

    }
);


/* =========================================================
   BUTTON RIPPLE EFFECT
========================================================= */

const rippleButtons =
    document.querySelectorAll(
        ".primary-btn, .secondary-btn, .signup-btn, .modal-submit"
    );


rippleButtons.forEach(button => {

    button.addEventListener(
        "click",
        function(event) {

            const ripple =
                document.createElement("span");


            ripple.style.position =
                "absolute";

            ripple.style.borderRadius =
                "50%";

            ripple.style.background =
                "rgba(255,255,255,0.25)";

            ripple.style.width =
                "10px";

            ripple.style.height =
                "10px";

            ripple.style.transform =
                "scale(0)";

            ripple.style.pointerEvents =
                "none";


            const rect =
                this.getBoundingClientRect();


            ripple.style.left =
                `${event.clientX - rect.left}px`;

            ripple.style.top =
                `${event.clientY - rect.top}px`;


            this.style.position =
                "relative";

            this.style.overflow =
                "hidden";


            this.appendChild(ripple);


            ripple.animate(
                [
                    {
                        transform: "scale(0)",
                        opacity: 1
                    },

                    {
                        transform: "scale(25)",
                        opacity: 0
                    }
                ],
                {
                    duration: 600,
                    easing: "ease-out"
                }
            );


            setTimeout(() => {

                ripple.remove();

            }, 600);

        }
    );

});


/* =========================================================
   PAGE LOAD
========================================================= */

window.addEventListener(
    "load",
    () => {

        document.body.classList.add(
            "page-loaded"
        );

    }
);