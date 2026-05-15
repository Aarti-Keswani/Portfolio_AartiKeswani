// TABS
function showTab(id){
    document.querySelectorAll(".tab").forEach(t=>t.classList.remove("active"));
    document.getElementById(id).classList.add("active");
}

// TYPING EFFECT
const words=["beyond limits   ","with vision   ","what matters   ","the future  "];
let i=0,j=0,isDeleting=false;

function type(){
    let word=words[i];
    document.getElementById("typing").textContent=word.substring(0,j);

    if(!isDeleting) j++; else j--;

    if(j===word.length){isDeleting=true; setTimeout(type,1000); return;}
    if(j===0){isDeleting=false; i=(i+1)%words.length;}

    setTimeout(type,isDeleting?50:100);
}
type();

// PARTICLES
const canvas=document.getElementById("bg");
const ctx=canvas.getContext("2d");

canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

let particles=[];
for(let i=0;i<80;i++){
    particles.push({
        x:Math.random()*canvas.width,
        y:Math.random()*canvas.height,
        r:Math.random()*2
    });
}

function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle="#8b5cf6";
    particles.forEach(p=>{
        ctx.beginPath();
        ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
        ctx.fill();
    });
}
setInterval(draw,30);
// PARALLAX TEXT SCROLL
window.addEventListener("scroll", () => {
    const text = document.querySelector(".about-bg-text");
    const section = document.querySelector("#about");

    if (!text || !section) return;

    const rect = section.getBoundingClientRect();
    const scrollProgress = -rect.top;

    let moveX = scrollProgress * 0.2;

    // 🔥 LIMIT MOVEMENT (IMPORTANT)
    moveX = Math.max(-200, Math.min(200, moveX));

    text.style.transform = `translate(calc(-50% + ${moveX}px), -50%)`;
});
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        const sectionHeight = section.clientHeight;

        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }
    });
});
// 🔥 LEFT → RIGHT PARALLAX TEXT
window.addEventListener("scroll", () => {
    const text = document.querySelector(".about-bg-text");
    const section = document.querySelector("#about");

    if (!text || !section) return;

    const rect = section.getBoundingClientRect();

    let move = rect.top * 0.15;   // ✅ REVERSED direction

    // limit movement
    move = Math.max(-150, Math.min(150, move));

    text.style.transform = `translate(calc(-50% + ${move}px), -50%)`;
});


function showTab(id){

    document.querySelectorAll(".tab").forEach(tab=>{
        tab.classList.remove("active");
    });

    document.getElementById(id).classList.add("active");

    document.querySelectorAll(".tab-btn").forEach(btn=>{
        btn.classList.remove("active-tab");
    });

    document.querySelector(`.tab-btn.${id}`).classList.add("active-tab");
}

function openModal(){
    document.getElementById("successModal").classList.add("show");
}

function closeModal(){
    document.getElementById("successModal").classList.remove("show");
}
// CURSOR GLOW FOLLOW
document.addEventListener("mousemove",(e)=>{
    document.body.style.setProperty("--x", e.clientX + "px");
    document.body.style.setProperty("--y", e.clientY + "px");

    document.body.style.setProperty(
        "--cursorX", e.clientX + "px"
    );
    document.body.style.setProperty(
        "--cursorY", e.clientY + "px"
    );

    document.body.style.setProperty(
        "--cursorTransform",
        `translate(${e.clientX}px, ${e.clientY}px)`
    );

    document.body.style.setProperty("--cursorLeft", e.clientX + "px");
});
// PREMIUM CURSOR
const cursor=document.createElement("div");
cursor.classList.add("cursor");
document.body.appendChild(cursor);

document.addEventListener("mousemove",e=>{
    cursor.style.left=e.clientX+"px";
    cursor.style.top=e.clientY+"px";
});
/* ===================================================
   PREMIUM ACHIEVEMENT SLIDER
   AUTO SLIDE + STOP ON CARD HOVER / TOUCH
=================================================== */

const achieveSlider = document.getElementById("achieveSlider");
const achieveTrack = achieveSlider.querySelector(".achieve-track");

/* DUPLICATE FOR SMOOTH INFINITE LOOP */
if (!achieveTrack.dataset.cloned) {
    achieveTrack.innerHTML += achieveTrack.innerHTML;
    achieveTrack.dataset.cloned = "true";
}

let autoSlide;
let speed = 1.2;

/* START AUTO SLIDE */
function startAchievementSlide(){

    stopAchievementSlide();

    autoSlide = setInterval(() => {

        achieveSlider.scrollLeft += speed;

        /* INFINITE RESET */
        if (achieveSlider.scrollLeft >= achieveTrack.scrollWidth / 2) {
            achieveSlider.scrollLeft = 0;
        }

    }, 20);
}

/* STOP AUTO SLIDE */
function stopAchievementSlide(){
    clearInterval(autoSlide);
}

/* =========================================
   STOP WHEN CURSOR ENTERS ANY CARD
========================================= */
function bindCardPauseEvents(){

    const cards = achieveTrack.querySelectorAll(".achieve-card");

    cards.forEach(card => {

        /* DESKTOP */
        card.addEventListener("mouseenter", stopAchievementSlide);
        card.addEventListener("mouseleave", startAchievementSlide);

        /* MOBILE TOUCH */
        card.addEventListener("touchstart", stopAchievementSlide, { passive:true });

        card.addEventListener("touchend", () => {
            setTimeout(startAchievementSlide, 800);
        });

        /* CLICK / TAP */
        card.addEventListener("mousedown", stopAchievementSlide);
        card.addEventListener("mouseup", startAchievementSlide);

    });
}

/* =========================================
   DRAG SUPPORT
========================================= */
let isDragging = false;
let startX;
let scrollLeft;

achieveSlider.addEventListener("mousedown", (e) => {
    isDragging = true;
    startX = e.pageX - achieveSlider.offsetLeft;
    scrollLeft = achieveSlider.scrollLeft;

    stopAchievementSlide();
});

achieveSlider.addEventListener("mouseleave", () => {
    if(isDragging){
        isDragging = false;
    }
    startAchievementSlide();
});

achieveSlider.addEventListener("mouseup", () => {
    isDragging = false;
    startAchievementSlide();
});

achieveSlider.addEventListener("mousemove", (e) => {

    if(!isDragging) return;

    e.preventDefault();

    const x = e.pageX - achieveSlider.offsetLeft;
    const walk = (x - startX) * 1.8;

    achieveSlider.scrollLeft = scrollLeft - walk;
});

/* MOBILE DRAG */
achieveSlider.addEventListener("touchstart", stopAchievementSlide, { passive:true });

achieveSlider.addEventListener("touchend", () => {
    setTimeout(startAchievementSlide, 800);
});

/* INIT */
bindCardPauseEvents();
startAchievementSlide();
/* HERO TYPING TEXT EFFECT */
const texts = [
  "I build smart web experiences",
  "I create with code and creativity",
  "I design ideas for the future",
  "I turn ambition into innovation"
];

let count = 0;
let index = 0;
let currentText = "";
let letter = "";

(function type(){

    if(count === texts.length){
        count = 0;
    }

    currentText = texts[count];
    letter = currentText.slice(0, ++index);

    document.getElementById("changing-text").textContent = letter;

    if(letter.length === currentText.length){
        setTimeout(() => {
            erase();
        }, 1800);
        return;
    }

    setTimeout(type, 70);

})();

function erase(){

    letter = currentText.slice(0, --index);

    document.getElementById("changing-text").textContent = letter;

    if(letter.length === 0){
        count++;
        setTimeout(type, 300);
        return;
    }

    setTimeout(erase, 40);
}
/* =========================
PROJECT SLIDER JS
========================= */

function scrollProjects(value) {
    const slider = document.querySelector('.projects-slider');

    slider.scrollBy({
        left: value,
        behavior: 'smooth'
    });
}