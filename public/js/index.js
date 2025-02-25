const wrapper = document.querySelector(".researchSlider");
const carousel = document.querySelector(".research_list");
const arrowBtn = document.querySelectorAll(".researchSlider > i");
const eventsData = document.getElementById("events-data").dataset.events;
const events = JSON.parse(eventsData);

const cardWidth = document.querySelector(
  ".research_list > .research_item"
).offsetWidth;
const carouselChildren = [...carousel.children];
console.log("Events", events);


let cardPerView = Math.round(carousel.offsetWidth / cardWidth);

//insert copies of first few cards to beginning of cards for infinite scrolling
carouselChildren
  .slice(-cardPerView)
  .reverse()
  .forEach((card) => {
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
  });

carouselChildren.slice(0, cardPerView).forEach((card) => {
  carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});

arrowBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    carousel.scrollLeft += btn.id == "left" ? -cardWidth : cardWidth;
  });
});

let isDrag = false,
  startX,
  startScrollLeft;

const dragStart = (e) => {
  isDrag = true;
  carousel.classList.add("dragging");
  startX = e.pageX;
  startScrollLeft = carousel.scrollLeft;
};

const drag = (e) => {
  if (!isDrag) return;
  carousel.scrollLeft = e.pageX;

  carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
};

const dragStop = () => {
  isDrag = false;
  carousel.classList.remove("draggin");
};

const autoPlay = () => {
  timeoutId = setTimeout(() => (carousel.scrollLeft += cardWidth), 1500);
};
autoPlay();

const infiniteScroll = () => {
  //if carousel at beginning, scroll to end
  if (carousel.scrollLeft === 0) {
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.scrollWidth - 2 * carousel.offsetWidth;
    carousel.classList.remove("no-transition");
  }
  // if carousel at end, scroll to beginning
  else if (
    Math.ceil(carousel.scrollLeft) ===
    carousel.scrollWidth - carousel.offsetWidth
  ) {
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.offsetWidth;
    carousel.classList.remove("no-transition");
  }

  //clear existing timeout and restart carousel if mouse is not hovering
  clearTimeout(timeoutId);
  if (!wrapper.matches(":hover")) autoPlay();
};

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", drag);
carousel.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infiniteScroll);

document.addEventListener("DOMContentLoaded", function () {
  // Awards Data

  function initializeEvents() {
    const eventSlider = document.querySelector(".event-slider");
    const prevBtn = document.querySelector(".prev");
    const nextBtn = document.querySelector(".next");
    let currentSlide = 0;

    eventSlider.innerHTML = "";

    events.forEach((event, index) => {
      const eventCard = document.createElement("div");
      eventCard.className = "event-card";
      eventCard.style.display = index === 0 ? "block" : "none"; // Show only first event
      eventCard.innerHTML = `
            <img src="${event.image}" alt="${event.title}">
            <h3>${event.title}</h3>
            <p class="event-date">${event.date}</p>
            <p class="course-id">Course ID: ${event.courseId}</p>
            <p>${event.description}</p>
        `;
      eventSlider.appendChild(eventCard);
    });

    // Function to show a specific slide
    function showSlide(index) {
      const slides = document.querySelectorAll(".event-card");
      slides.forEach((slide) => (slide.style.display = "none")); // Hide all events
      slides[index].style.display = "block"; // Show the current event
      slides[index].style.animation = "fadeIn 0.5s"; // Apply animation
    }

    function nextSlide() {
      currentSlide = (currentSlide + 1) % events.length;
      showSlide(currentSlide);
    }

    function prevSlide() {
      currentSlide = (currentSlide - 1 + events.length) % events.length;
      showSlide(currentSlide);
    }

    // Auto-scroll events every 5 seconds
    let autoScrollInterval = setInterval(nextSlide, 5000);

    // Event listeners for buttons
    prevBtn.addEventListener("click", () => {
      clearInterval(autoScrollInterval);
      prevSlide();
      autoScrollInterval = setInterval(nextSlide, 5000);
    });

    nextBtn.addEventListener("click", () => {
      clearInterval(autoScrollInterval);
      nextSlide();
      autoScrollInterval = setInterval(nextSlide, 5000);
    });

    // Pause auto-scroll on hover
    eventSlider.addEventListener("mouseenter", () =>
      clearInterval(autoScrollInterval)
    );
    eventSlider.addEventListener("mouseleave", () => {
      autoScrollInterval = setInterval(nextSlide, 5000);
    });
  }

  // Initialize the events slider when the page loads
  initializeEvents();
});
document.addEventListener("DOMContentLoaded", function () {
  const awardsScroll = document.querySelector(".awards-scroll");
  const awardsDataElement = document.getElementById("awards-data");

  // Parse awards data from hidden div
  const awardsData = JSON.parse(awardsDataElement.getAttribute("data-awards"));

  // Function to create award cards
  const createAwardCards = () => {
    return awardsData
      .map(
        (award) => `
              <div class="award-card">
                  <h3>${award.title}</h3>
                  <p>${award.description}</p>
              </div>
          `
      )
      .join("");
  };

  // Add original and duplicate awards for continuous scrolling
  awardsScroll.innerHTML = createAwardCards() + createAwardCards();

  awardsScroll.addEventListener("animationend", () => {
    awardsScroll.style.animation = "none";
    awardsScroll.offsetHeight; // Trigger reflow
    awardsScroll.style.animation = "scrollUp 20s linear infinite";
  });

  // Pause on hover
  const awardsContainer = document.querySelector(".awards-container");
  awardsContainer.addEventListener("mouseenter", () => {
    awardsScroll.style.animationPlayState = "paused";
  });
  awardsContainer.addEventListener("mouseleave", () => {
    awardsScroll.style.animationPlayState = "running";
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const hoverItems = document.querySelectorAll(".hover-item");
  const displayImage = document.getElementById("display-image");
  const loadingLineImage = document.querySelector(".loading-line-image");
  const borderContainer = document.querySelector(".border-container");

  hoverItems.forEach((item) => {
    item.addEventListener("mouseover", () => {
      let newImage = item.getAttribute("data-img");
      let color = item.getAttribute("data-color");
      let loadingLine = item.querySelector(".loading-line");

      borderContainer.style.backgroundColor = color;

      loadingLine.style.backgroundColor = color;
      loadingLine.style.width = "calc(100% - 10px)"; 

      setTimeout(() => {
        loadingLine.style.opacity = "0";
        setTimeout(() => {
          loadingLine.style.width = "0%";
          loadingLine.style.opacity = "1";
        }, 300);
      }, 1000);

      loadingLineImage.style.backgroundColor = color;
      loadingLineImage.style.width = "100%";
      setTimeout(() => {
        displayImage.src = newImage;
        loadingLineImage.style.opacity = "0";
        setTimeout(() => {
          loadingLineImage.style.width = "0%";
          loadingLineImage.style.opacity = "1";
        }, 300);
      }, 1000);
    });
  });
});

// Function to animate the numbers
function animateStats() {
  const statNumbers = document.querySelectorAll(".stat-number");

  statNumbers.forEach((statNumber) => {
    const target = +statNumber.getAttribute("data-target"); 
    const increment = target / 200; 
    let current = 0;

    const updateNumber = () => {
      if (current < target) {
        current += increment;
        statNumber.textContent =
          Math.ceil(current) +
          (statNumber.textContent.includes("%") ? "%" : "");
        requestAnimationFrame(updateNumber); 
      } else {
        statNumber.textContent =
          target + (statNumber.textContent.includes("%") ? "%" : "");
      }
    };

    updateNumber();
  });
}

// Trigger the animation when the section comes into view
const statsSection = document.querySelector(".stats-container");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateStats();
        observer.unobserve(statsSection); 
      }
    });
  },
  { threshold: 0.5 }
);

observer.observe(statsSection);

document.querySelectorAll(".box").forEach((box) => {
  box.addEventListener("mouseenter", () => {
    box.style.transform = "rotateY(90deg)";
  });

  box.addEventListener("mouseleave", () => {
    box.style.transform = "rotateY(0deg)";
  });
});

//Student Notices

class NoticeBoard {
  constructor() {
    this.currentIndex = 0;
    this.wrapper = document.getElementById("noticeWrapper");
    this.pauseBtn = document.getElementById("pauseBtn");
    this.resumeBtn = document.getElementById("resumeBtn");
    this.isPaused = false;
    this.interval = null;

    this.init();
  }

  init() {
    this.renderNotices();
    this.startAnimation();
    this.setupEventListeners();
  }

  renderNotices() {
    this.wrapper.innerHTML = notices
      .map(
        (notice) => `
          <a href="${notice.link}" class="notice-item">
              <div class="notice-title">
                  ${notice.title}
                  ${notice.isNew ? '<span class="new-badge">NEW</span>' : ""}
              </div>
              <div class="notice-date">${notice.date}</div>
          </a>
      `
      )
      .join("");
  }

  moveNotices() {
    this.currentIndex = (this.currentIndex + 1) % notices.length;
    this.wrapper.style.transform = `translateY(-${this.currentIndex * 60}px)`;
  }

  startAnimation() {
    this.interval = setInterval(() => this.moveNotices(), 3000);
  }

  setupEventListeners() {
    this.pauseBtn.addEventListener("click", () => this.pauseAnimation());
    this.resumeBtn.addEventListener("click", () => this.resumeAnimation());

    this.wrapper.addEventListener("mouseenter", () => this.pauseAnimation());
    this.wrapper.addEventListener("mouseleave", () => {
      if (!this.isPaused) {
        this.resumeAnimation();
      }
    });
  }

  pauseAnimation() {
    this.isPaused = true;
    clearInterval(this.interval);
  }

  resumeAnimation() {
    this.isPaused = false;
    this.startAnimation();
  }
}
function formatDate(isoString) {
  const date = new Date(isoString);
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

// Initialize the notice board
document.addEventListener("DOMContentLoaded", () => {
  const studentNoticesElement = document.getElementById("studentnotices-data");
  const notices = JSON.parse(
    studentNoticesElement.dataset.studentnotices || "[]"
  );

  class NoticeBoard {
    constructor() {
      this.currentIndex = 0;
      this.wrapper = document.getElementById("noticeWrapper");
      this.pauseBtn = document.getElementById("pauseBtn");
      this.resumeBtn = document.getElementById("resumeBtn");
      this.isPaused = false;
      this.interval = null;

      this.init();
    }

    init() {
      this.renderNotices();
      this.startAnimation();
      this.setupEventListeners();
    }

    renderNotices() {
      this.wrapper.innerHTML = notices
        .map(
          (notice) => `
            <a href="${notice.link}" class="notice-item">
                <div class="notice-title">
                    ${notice.title}
                    ${notice.isNew ? '<span class="new-badge">NEW</span>' : ""}
                </div>
                <div class="notice-date">${new Date(
                  notice.date
                ).toLocaleDateString()}
                </div>
            </a>
        `
        )
        .join("");
    }

    moveNotices() {
      if (notices.length === 0) return;
      this.currentIndex = (this.currentIndex + 1) % notices.length;
      this.wrapper.style.transform = `translateY(-${this.currentIndex * 60}px)`;
    }

    startAnimation() {
      if (notices.length > 1) {
        this.interval = setInterval(() => this.moveNotices(), 3000);
      }
    }

    setupEventListeners() {
      this.pauseBtn.addEventListener("click", () => this.pauseAnimation());
      this.resumeBtn.addEventListener("click", () => this.resumeAnimation());

      this.wrapper.addEventListener("mouseenter", () => this.pauseAnimation());
      this.wrapper.addEventListener("mouseleave", () => {
        if (!this.isPaused) {
          this.resumeAnimation();
        }
      });
    }

    pauseAnimation() {
      this.isPaused = true;
      clearInterval(this.interval);
    }

    resumeAnimation() {
      this.isPaused = false;
      this.startAnimation();
    }
  }

  // Initialize the notice board with dynamic data
  new NoticeBoard();
});

class FacultyNoticeBoard {
  constructor(facultyNotices) {
    this.facultyNotices = facultyNotices;
    this.currentFacultyIndex = 0;
    this.facultyWrapper = document.getElementById("facultyNoticeWrapper");
    this.facultyPauseBtn = document.getElementById("facultyPauseBtn");
    this.facultyResumeBtn = document.getElementById("facultyResumeBtn");
    this.isFacultyPaused = false;
    this.facultyInterval = null;

    this.initFacultyBoard();
  }

  initFacultyBoard() {
    this.renderFacultyNotices();
    this.startFacultyAnimation();
    this.setupFacultyEventListeners();
  }

  renderFacultyNotices() {
    this.facultyWrapper.innerHTML = this.facultyNotices
      .map(
        (notice) => `
                <a href="${notice.link}" class="faculty-notice-item">
                    <div class="faculty-notice-title">
                        ${notice.title}
                        ${
                          notice.isNew
                            ? '<span class="faculty-new-badge">NEW</span>'
                            : ""
                        }
                        <span class="faculty-department-tag">${
                          notice.department
                        }</span>
                    </div>
                    <div class="faculty-notice-date">${formatDate(
                      notice.date
                    )}</div>
                </a>
            `
      )
      .join("");
  }

  moveFacultyNotices() {
    this.currentFacultyIndex =
      (this.currentFacultyIndex + 1) % this.facultyNotices.length;
    this.facultyWrapper.style.transform = `translateY(-${
      this.currentFacultyIndex * 60
    }px)`;
  }

  startFacultyAnimation() {
    this.facultyInterval = setInterval(() => this.moveFacultyNotices(), 3000);
  }

  setupFacultyEventListeners() {
    this.facultyPauseBtn.addEventListener("click", () =>
      this.pauseFacultyAnimation()
    );
    this.facultyResumeBtn.addEventListener("click", () =>
      this.resumeFacultyAnimation()
    );

    this.facultyWrapper.addEventListener("mouseenter", () =>
      this.pauseFacultyAnimation()
    );
    this.facultyWrapper.addEventListener("mouseleave", () => {
      if (!this.isFacultyPaused) {
        this.resumeFacultyAnimation();
      }
    });
  }

  pauseFacultyAnimation() {
    this.isFacultyPaused = true;
    clearInterval(this.facultyInterval);
  }

  resumeFacultyAnimation() {
    this.isFacultyPaused = false;
    this.startFacultyAnimation();
  }
}

// Initialize the faculty notice board
document.addEventListener("DOMContentLoaded", () => {
  const facultyNoticesData = document.getElementById("facultynotices-data")
    .dataset.facultynotices;
  const facultyNotices = JSON.parse(facultyNoticesData);

  new FacultyNoticeBoard(facultyNotices);
});


document.addEventListener("DOMContentLoaded", function () {
  const newsGrid = document.querySelector(".ev-news-grid");
  const cards = Array.from(document.querySelectorAll(".ev-news-card"));

  function createClones() {
    document
      .querySelectorAll(".ev-news-card.clone")
      .forEach((clone) => clone.remove());

    const viewportWidth = window.innerWidth;
    const cardWidth = cards[0].offsetWidth;
    const numCardsNeeded = Math.ceil(viewportWidth / cardWidth) * 2; 

    for (let i = 0; i < numCardsNeeded; i++) {
      const originalIndex = i % cards.length;
      const clone = cards[originalIndex].cloneNode(true);
      clone.classList.add("clone");
      clone.classList.add("visible");
      newsGrid.appendChild(clone);
    }
  }

  // Set up initial positions and visibility
  function initializeCarousel() {
    newsGrid.classList.add("carousel-mode");

    cards.forEach((card) => {
      card.classList.add("visible");
    });

    createClones();

    startCarouselAnimation();
  }

  // Function to animate the carousel
  function startCarouselAnimation() {
    const card = cards[0];
    const cardStyle = window.getComputedStyle(card);
    const cardWidth = card.offsetWidth + parseInt(cardStyle.marginRight || 0);

    const totalWidth = cardWidth * cards.length;

    document.documentElement.style.setProperty(
      "--carousel-width",
      `-${totalWidth}px`
    );

    newsGrid.addEventListener("animationiteration", () => {
    });

    setTimeout(() => {
      newsGrid.classList.add("animate");
    }, 100);
  }

  function makeCardsInteractive() {
    document.querySelectorAll(".ev-news-card").forEach((card) => {
      card.addEventListener("click", function () {
        const link = this.querySelector(".ev-news-content h3 a");
        if (link) {
          window.location.href = link.getAttribute("href");
        }
      });
    });
  }

  function setupHoverPause() {
    newsGrid.addEventListener("mouseenter", () => {
      newsGrid.classList.add("paused");
    });

    newsGrid.addEventListener("mouseleave", () => {
      newsGrid.classList.remove("paused");
    });
  }

  initializeCarousel();
  makeCardsInteractive();
  setupHoverPause();

  window.addEventListener("resize", () => {
    newsGrid.classList.remove("animate");

    createClones();

    setTimeout(() => {
      startCarouselAnimation();
    }, 50);
  });
});










document.addEventListener("DOMContentLoaded", function () {
  const newsGrid = document.querySelector(".ev-news-grid");
  if (newsGrid) {
    newsGrid.classList.add("carousel-mode");
    initCarousel(newsGrid);
    setupPauseOnHover(newsGrid);
  }
  
  const eventsGrid = document.querySelector(".ev-events-grid");
  if (eventsGrid) {
    eventsGrid.classList.add("vertical-scroll");
    initVerticalScroll(eventsGrid);
    setupPauseOnHover(eventsGrid);
  }
  
  const videos = document.querySelectorAll(".gallery-item video");
  videos.forEach((video) => {
    video.onloadedmetadata = function () {
      if (video.videoWidth > video.videoHeight) {
        video.parentElement.classList.add("video-landscape");
      } else {
        video.parentElement.classList.add("video-portrait");
      }
    };
  });
});




function initCarousel(carousel) {
  const cards = Array.from(carousel.querySelectorAll(".ev-news-card"));
  if (cards.length === 0) return;

  const cardWidth = cards[0].offsetWidth;
  const cardGap = parseInt(
    getComputedStyle(document.documentElement).getPropertyValue("--card-gap") || "20px"
  );
  const totalWidth = cards.reduce(
    (width, card) => width + card.offsetWidth + cardGap,
    0
  );

  cards.forEach((card) => {
    const clone = card.cloneNode(true);
    clone.classList.add("clone");
    carousel.appendChild(clone);
  });

  document.documentElement.style.setProperty(
    "--carousel-width",
    `-${totalWidth}px`
  );

  setTimeout(() => {
    carousel.classList.add("animate");
  }, 100);
}

function initVerticalScroll(container) {
  const cards = Array.from(container.querySelectorAll(".ev-event-card"));
  if (cards.length === 0) return;

  const cardGap = parseInt(
    getComputedStyle(document.documentElement).getPropertyValue("--card-gap") || "18px"
  );
  const totalHeight = cards.reduce(
    (height, card) => height + card.offsetHeight + cardGap,
    0
  );

  cards.forEach((card) => {
    const clone = card.cloneNode(true);
    clone.classList.add("clone");
    container.appendChild(clone);
  });

  document.documentElement.style.setProperty(
    "--scroll-height",
    `-${totalHeight}px`
  );

  setTimeout(() => {
    container.classList.add("animate");
  }, 100);
}

function setupPauseOnHover(container) {
  container.addEventListener("mouseenter", () => {
    container.classList.add("paused");
  });

  container.addEventListener("mouseleave", () => {
    container.classList.remove("paused");
  });
}






document.addEventListener("DOMContentLoaded", function () {
  const headlines = document.querySelectorAll(".headline-item");
  const displayImage = document.getElementById("display-image");

  const images = ["/images/aa.jpg", "/images/bb.png",  "/images/dd.png", "/images/ee.png" , "/images/ff.png", "/images/gg.png", "/images/hh.png", "/images/ii.png"];
  const defaultImage = "/images/oo.png"; 
  
  displayImage.src = defaultImage;

  headlines.forEach((headline, index) => {
    headline.addEventListener("mouseover", function () {
      displayImage.src = images[index % images.length];
    });

    headline.addEventListener("mouseout", function () {
      displayImage.src = defaultImage;
    });
  });
});
