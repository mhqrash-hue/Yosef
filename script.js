/* ==========================================================================
   YOUSEF.exe Interactive Behavior - Vanilla JavaScript
   ========================================================================== */

// 1. DYNAMIC CONFIGURATION DATA OBJECT
const birthdayData = {
    name: "Yousef",
    major: "Computer Engineering",
    
    // Arabic Birthday Message (RTL format)
    birthdayMessage: `إلى يوسف،
مو كل الأشخاص اللي نلتقي بيهم يصيرون جزء من حياتنا،
بس أنت صرت صديق، أخ، وحبيب، وشخص أتمنى يبقى وياي بكل المراحل الجاية.

أتمنى كل أحلامك تتحول من مجرد ideas إلى reality،
وكل مشروع تبدأه ينتهي بـ Success ✓

أتمنى سنتك الجديدة تكون مليانة نجاح وفرح وتحقيق لكل الأشياء اللي تتمناها.

Happy Birthday, Engineer 👨‍💻❤️
كل عام وأنتَ بخير يا يوسف،
وكل عام وأنتَ أقرب شخص لقلبي.`,

    // Unlocked Secret Message
    secretMessage: `إذا وصلت لهنا، فهذا يعني أنك مو شخص عادي عندي…
أحب أگلك إن وجودك بحياتي يعنيلي هواي،
وأتمنى مهما أخذتنا الحياة ومهما تغيرت الأيام،
تبقى دائمًا من الأشخاص اللي أفتخر بوجودهم بحياتي.

Love you, Yousef ❤️`,

    // Image gallery links
    images: [
        "images/photo1.jpg",
        "images/photo2.jpg",
        "images/photo3.jpg",
        "images/photo1.jpg",
        "images/photo2.jpg",
        "images/photo3.jpg"
    ],
    
    music: "music/unity.m4a"
};

// Global variables for particle engine
let particleCanvas, particleCtx;
let codeCanvas, codeCtx;
let particles = [];
let matrixColumns = [];
let matrixFontSize = 14;
let matrixActive = false;
let celebratoryExplosionActive = false;

// 2. DOM CONTENT LOADED INITIALIZER
document.addEventListener("DOMContentLoaded", () => {
    // Populate dynamic text from birthdayData
    document.getElementById("about-name").textContent = birthdayData.name;
    document.getElementById("about-major").textContent = birthdayData.major;
    
    // Set profile picture source if exists
    const profileImg = document.getElementById("yousef-profile-img");
    if (birthdayData.images && birthdayData.images[0]) {
        profileImg.src = birthdayData.images[0];
    }
    
    // Bind gallery images
    const galleryItems = document.querySelectorAll(".gallery-item img");
    galleryItems.forEach((img, idx) => {
        if (birthdayData.images && birthdayData.images[idx]) {
            img.src = birthdayData.images[idx];
        }
    });

    // Audio setup
    const audioEl = document.getElementById("birthday-audio");
    if (birthdayData.music) {
        audioEl.querySelector("source").src = birthdayData.music;
        audioEl.load();
    }

    // Initialize Canvas layers
    initBackgroundCanvas();
    initParticleCanvas();

    // Start Boot Loading Simulation (Screen 1)
    runBootLoader();

    // Attach Event Listeners
    setupNavigation();
    setupAudioToggle();
    setupGalleryLightbox();
    setupSecretDecryptor();
    setupSudoHappyBtn();
    setupGiftBox();
    setupSecretTerminalModal();
    setupScrollAnimations();
    setupKeyboardEasterEggs();
});

// ==========================================================================
// 3. BOOT LOADER & SYSTEM INTRO (Screens 1 & 2)
// ==========================================================================

function runBootLoader() {
    const bootTextLog = document.getElementById("boot-text-log");
    const progressFill = document.getElementById("boot-progress-fill");
    const percentageText = document.getElementById("boot-percentage");

    const bootLogs = [
        "SYSTEM LOADING...",
        "BOOTSTRAPPING CORE STACK...",
        "CONNECTING CPU ARCHITECTURE INTERFACES...",
        "CHECKING FRIENDS LIST DATABASE...",
        "COMPILING BIRTHDAY ALGORITHMS...",
        "LOADING PORTFOLIO GRAPHICS AND MEMORIES...",
        "YOUSEF.EXE SYSTEM STATUS: READY TO EXECUTE."
    ];

    let progress = 0;
    let logIndex = 0;
    
    // Print first log
    bootTextLog.innerHTML += `> ${bootLogs[0]}<br>`;

    const progressInterval = setInterval(() => {
        // Increment progress faster at start, slower near the end
        const increment = Math.floor(Math.random() * 8) + 2;
        progress = Math.min(progress + increment, 100);
        
        progressFill.style.width = `${progress}%`;
        percentageText.textContent = `${progress}%`;

        // Periodically output system status strings
        const expectedIndex = Math.floor((progress / 100) * bootLogs.length);
        if (expectedIndex > logIndex && logIndex < bootLogs.length - 1) {
            logIndex = expectedIndex;
            bootTextLog.innerHTML += `> ${bootLogs[logIndex]}<br>`;
            bootTextLog.scrollTop = bootTextLog.scrollHeight;
        }

        if (progress >= 100) {
            clearInterval(progressInterval);
            
            // Short delay, then transition to Screen 2 (Terminal Intro)
            setTimeout(() => {
                const loadingScreen = document.getElementById("loading-screen");
                loadingScreen.classList.add("hidden");
                
                const introScreen = document.getElementById("terminal-intro-screen");
                introScreen.classList.remove("hidden");
                
                // Start typing the terminal intro
                runTerminalIntro();
            }, 800);
        }
    }, 120);
}

function runTerminalIntro() {
    const terminalBody = document.getElementById("intro-terminal-body");
    const enterWrapper = document.getElementById("enter-system-wrapper");
    const enterBtn = document.getElementById("enter-system-btn");

    const lines = [
        { text: "> Initializing Yousef.exe...", delay: 500 },
        { text: "> Loading personal profile...", delay: 700 },
        { text: "> Computer Engineering Student detected ✓", delay: 900, type: "green" },
        { text: "> Best Friend detected ✓", delay: 800, type: "green" },
        { text: "> Birthday mode activated...", delay: 800, type: "pink" },
        { text: "> System ready.", delay: 600 }
    ];

    let lineIdx = 0;

    // Create cursor
    const cursor = document.createElement("span");
    cursor.className = "cursor";
    terminalBody.appendChild(cursor);

    function typeNextLine() {
        if (lineIdx < lines.length) {
            const lineData = lines[lineIdx];
            const lineElement = document.createElement("div");
            lineElement.className = "terminal-line";
            
            if (lineData.type === "green") {
                lineElement.classList.add("green-text");
            } else if (lineData.type === "pink") {
                lineElement.classList.add("text-red");
            }
            
            // Insert line before the cursor
            terminalBody.insertBefore(lineElement, cursor);
            
            let charIdx = 0;
            const textToType = lineData.text;
            
            function typeChar() {
                if (charIdx < textToType.length) {
                    lineElement.textContent += textToType[charIdx];
                    charIdx++;
                    setTimeout(typeChar, 25);
                } else {
                    lineIdx++;
                    terminalBody.scrollTop = terminalBody.scrollHeight;
                    setTimeout(typeNextLine, lineData.delay);
                }
            }
            typeChar();
        } else {
            // Intro logs complete, reveal ENTER SYSTEM button
            enterWrapper.classList.remove("hidden");
            enterWrapper.style.animation = "pulse 2s infinite ease-in-out";
        }
    }

    // Trigger sequential typing
    typeNextLine();

    // Enter system action
    enterBtn.addEventListener("click", () => {
        const introScreen = document.getElementById("terminal-intro-screen");
        introScreen.classList.add("hidden");
        
        document.body.classList.remove("loading-state");
        
        const mainApp = document.getElementById("main-app");
        mainApp.classList.remove("hidden");
        
        // Start background code rain
        matrixActive = true;
        animateBackgroundCode();

        // Play music automatically after user gesture interaction
        const audioEl = document.getElementById("birthday-audio");
        const audioBtn = document.getElementById("music-toggle-btn");
        if (audioEl && audioBtn) {
            audioEl.play()
                .then(() => {
                    audioEl.muted = false;
                    audioBtn.classList.add("playing");
                    audioBtn.querySelector(".music-label").textContent = "Music ON";
                })
                .catch(err => {
                    console.log("Autoplay was blocked by browser. User will play it manually.", err);
                });
        }
    });
}

// ==========================================================================
// 4. BACKGROUND CODE RAIN (Matrix Effect)
// ==========================================================================

function initBackgroundCanvas() {
    codeCanvas = document.getElementById("code-bg-canvas");
    codeCtx = codeCanvas.getContext("2d");
    
    resizeBackgroundCanvas();
    window.addEventListener("resize", resizeBackgroundCanvas);
}

function resizeBackgroundCanvas() {
    if (!codeCanvas) return;
    codeCanvas.width = window.innerWidth;
    codeCanvas.height = window.innerHeight;
    
    const columnsCount = Math.floor(codeCanvas.width / matrixFontSize);
    matrixColumns = [];
    
    // Character strings representing programming snippets
    const codeChars = [
        "const yousef = {",
        "major: 'CompEng',",
        "status: 'Success',",
        "friendship: Infinity",
        "};",
        "function makeHappy() {",
        "return new Success();",
        "}",
        "class Engineer extends Human {",
        "constructor() {",
        "super();",
        "this.smart = true;",
        "}",
        "}",
        "yousef.compile()",
        "01010101",
        "00ff66",
        "00e5ff",
        "ff2a5f",
        "while(alive) {",
        "celebrate();",
        "}"
    ];

    for (let i = 0; i < columnsCount; i++) {
        matrixColumns.push({
            x: i * matrixFontSize,
            y: Math.random() * -1000, // random start above screen
            speed: Math.random() * 2 + 1,
            chars: codeChars[Math.floor(Math.random() * codeChars.length)]
        });
    }
}

function animateBackgroundCode() {
    if (!matrixActive || !codeCanvas) return;

    // Semi-transparent black to leave trails
    codeCtx.fillStyle = "rgba(5, 5, 7, 0.15)";
    codeCtx.fillRect(0, 0, codeCanvas.width, codeCanvas.height);

    codeCtx.font = `${matrixFontSize}px 'JetBrains Mono', monospace`;
    
    for (let i = 0; i < matrixColumns.length; i++) {
        const col = matrixColumns[i];
        
        // alternate colors for cyan/green code theme
        if (i % 2 === 0) {
            codeCtx.fillStyle = "rgba(0, 229, 255, 0.4)"; // cyan
        } else {
            codeCtx.fillStyle = "rgba(0, 255, 102, 0.4)"; // green
        }

        codeCtx.fillText(col.chars, col.x, col.y);

        col.y += col.speed;

        // Reset column if it goes off screen
        if (col.y > codeCanvas.height) {
            col.y = Math.random() * -200;
            col.speed = Math.random() * 2 + 1;
        }
    }

    requestAnimationFrame(animateBackgroundCode);
}

// ==========================================================================
// 5. FLOATING CELEBRATORY PARTICLES (Confetti & Hearts Canvas Engine)
// ==========================================================================

function initParticleCanvas() {
    particleCanvas = document.getElementById("particle-canvas");
    particleCtx = particleCanvas.getContext("2d");
    
    resizeParticleCanvas();
    window.addEventListener("resize", resizeParticleCanvas);
}

function resizeParticleCanvas() {
    if (!particleCanvas) return;
    particleCanvas.width = window.innerWidth;
    particleCanvas.height = window.innerHeight;
}

class Particle {
    constructor(x, y, type) {
        this.x = x;
        this.y = y;
        this.type = type; // 'confetti' or 'heart'
        
        this.size = Math.random() * 8 + 6;
        this.color = this.getRandomColor(type);
        
        this.velocity = {
            x: (Math.random() - 0.5) * 12,
            y: (Math.random() - 0.8) * 15 - 5 // blast upwards
        };
        
        this.gravity = 0.25;
        this.opacity = 1;
        this.rotation = Math.random() * 360;
        this.rotationSpeed = (Math.random() - 0.5) * 10;
        this.wobbleSpeed = Math.random() * 0.1 + 0.05;
        this.wobble = 0;
    }

    getRandomColor(type) {
        if (type === 'heart') {
            const heartColors = ['#ff2a5f', '#ff5a8f', '#ff1a4f', '#ff7da5'];
            return heartColors[Math.floor(Math.random() * heartColors.length)];
        } else {
            const confettiColors = ['#00ff66', '#00e5ff', '#ff2a5f', '#ffff00', '#ff00ff', '#ffffff'];
            return confettiColors[Math.floor(Math.random() * confettiColors.length)];
        }
    }

    update() {
        this.velocity.y += this.gravity;
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.rotation += this.rotationSpeed;
        
        // Wobble sideways for realistic fall
        this.wobble += this.wobbleSpeed;
        this.x += Math.sin(this.wobble) * 0.5;

        // Fade out slowly after peak
        if (this.velocity.y > 0) {
            this.opacity -= 0.012;
        }
    }

    draw() {
        particleCtx.save();
        particleCtx.globalAlpha = this.opacity;
        particleCtx.translate(this.x, this.y);
        particleCtx.rotate((this.rotation * Math.PI) / 180);

        if (this.type === 'heart') {
            // Draw a vector heart path
            particleCtx.fillStyle = this.color;
            particleCtx.beginPath();
            particleCtx.moveTo(0, 0);
            
            // Left curve
            particleCtx.bezierCurveTo(-this.size / 2, -this.size / 2, -this.size, -this.size / 3, -this.size, 0);
            particleCtx.bezierCurveTo(-this.size, this.size / 2, -this.size / 3, this.size, 0, this.size * 1.3);
            
            // Right curve
            particleCtx.bezierCurveTo(this.size / 3, this.size, this.size, this.size / 2, this.size, 0);
            particleCtx.bezierCurveTo(this.size, -this.size / 3, this.size / 2, -this.size / 2, 0, 0);
            
            particleCtx.closePath();
            particleCtx.fill();
        } else {
            // Confetti rectangle
            particleCtx.fillStyle = this.color;
            particleCtx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size * 1.5);
        }

        particleCtx.restore();
    }
}

function launchCelebrationExplosion() {
    const x = particleCanvas.width / 2;
    const y = particleCanvas.height * 0.75;
    
    // Spawn 150 particles
    for (let i = 0; i < 100; i++) {
        particles.push(new Particle(x, y, 'confetti'));
    }
    for (let i = 0; i < 60; i++) {
        particles.push(new Particle(x, y, 'heart'));
    }

    if (!celebratoryExplosionActive) {
        celebratoryExplosionActive = true;
        animateParticles();
    }
}

function fireTopShower() {
    const totalShowerCount = 40;
    
    for (let i = 0; i < totalShowerCount; i++) {
        const x = Math.random() * particleCanvas.width;
        const y = -20;
        const p = new Particle(x, y, Math.random() > 0.4 ? 'confetti' : 'heart');
        p.velocity.y = Math.random() * 4 + 2; // slow fall down
        p.velocity.x = (Math.random() - 0.5) * 3;
        particles.push(p);
    }

    if (!celebratoryExplosionActive) {
        celebratoryExplosionActive = true;
        animateParticles();
    }
}

function animateParticles() {
    if (particles.length === 0) {
        celebratoryExplosionActive = false;
        particleCtx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);
        return;
    }

    particleCtx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);

    for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.update();
        p.draw();

        // Remove offscreen or fully transparent particles
        if (p.opacity <= 0 || p.y > particleCanvas.height + 20 || p.x < -20 || p.x > particleCanvas.width + 20) {
            particles.splice(i, 1);
        }
    }

    requestAnimationFrame(animateParticles);
}

// ==========================================================================
// 6. STICKY NAV & HAMBURGER DRAWERS
// ==========================================================================

function setupNavigation() {
    const header = document.querySelector(".main-header");
    const hamburgerBtn = document.getElementById("hamburger-btn");
    const mobileDrawer = document.getElementById("mobile-drawer");
    const desktopLinks = document.querySelectorAll(".nav-link");
    const mobileLinks = document.querySelectorAll(".mobile-nav-link");

    // Scroll header background transition
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            header.style.backgroundColor = "rgba(5, 5, 7, 0.95)";
            header.style.boxShadow = "0 10px 30px rgba(0,0,0,0.5)";
        } else {
            header.style.backgroundColor = "rgba(5, 5, 7, 0.8)";
            header.style.boxShadow = "none";
        }
    });

    // Mobile Hamburger Menu Action
    hamburgerBtn.addEventListener("click", () => {
        hamburgerBtn.classList.toggle("active");
        mobileDrawer.classList.toggle("open");
    });

    // Handle drawer clicks to smooth scroll and close drawer
    const allLinks = [...desktopLinks, ...mobileLinks];
    allLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute("href");
            const targetSection = document.querySelector(targetId);
            
            // Close mobile menu drawer
            hamburgerBtn.classList.remove("active");
            mobileDrawer.classList.remove("open");

            if (targetSection) {
                const headerHeight = 70;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: "smooth"
                });
            }
        });
    });
}

// Active Nav highlight on scroll
function setupScrollAnimations() {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-link");
    const mobileNavLinks = document.querySelectorAll(".mobile-nav-link");
    const headerHeight = 80;

    // Intersection observer for section tracking
    window.addEventListener("scroll", () => {
        let currentSectionId = "home";
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 20;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute("id");
            }
        });

        // Set active link for desktop
        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${currentSectionId}`) {
                link.classList.add("active");
            }
        });

        // Set active link for mobile drawer
        mobileNavLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${currentSectionId}`) {
                link.classList.add("active");
            }
        });
    });

    // Intersection Observer to trigger loading bars & message typing
    const observerOptions = {
        threshold: 0.25
    };

    // 1. Future Loading Bars trigger
    const futureSection = document.getElementById("future-loading");
    const barsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                triggerProgressBars();
                barsObserver.unobserve(futureSection);
            }
        });
    }, observerOptions);
    
    if (futureSection) {
        barsObserver.observe(futureSection);
    }

    // 2. Main Birthday Message Typewriter trigger
    const messageSection = document.getElementById("message");
    const messageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                triggerMessageConsole();
                messageObserver.unobserve(messageSection);
            }
        });
    }, observerOptions);
    
    if (messageSection) {
        messageObserver.observe(messageSection);
    }
}

// Future Loading Progress Bars Animation
function triggerProgressBars() {
    const progressBars = [
        { bar: document.getElementById("progress-bar-1"), valText: document.getElementById("progress-val-1") },
        { bar: document.getElementById("progress-bar-2"), valText: document.getElementById("progress-val-2") },
        { bar: document.getElementById("progress-bar-3"), valText: document.getElementById("progress-val-3") },
        { bar: document.getElementById("progress-bar-4"), valText: document.getElementById("progress-val-4") }
    ];

    progressBars.forEach(item => {
        if (!item.bar) return;
        const targetPercent = parseInt(item.bar.getAttribute("data-target"), 10);
        
        // Animate width via CSS transition
        item.bar.style.width = `${targetPercent}%`;
        
        // Counter text animation
        let count = 0;
        const counterInterval = setInterval(() => {
            count += 2;
            if (count >= targetPercent) {
                count = targetPercent;
                clearInterval(counterInterval);
            }
            item.valText.textContent = `${count}%`;
        }, 30);
    });
}

// Birthday letter typewriter animation trigger
function triggerMessageConsole() {
    const letterBox = document.getElementById("letter-content");
    const message = birthdayData.birthdayMessage;
    
    letterBox.innerHTML = ""; // Clear
    let charIdx = 0;
    
    // Create cursor inside typewriter
    const cursor = document.createElement("span");
    cursor.className = "cursor";
    letterBox.appendChild(cursor);

    function type() {
        if (charIdx < message.length) {
            const nextChar = message[charIdx];
            
            // Insert characters before the cursor
            if (nextChar === "\n") {
                letterBox.insertBefore(document.createElement("br"), cursor);
            } else {
                const charNode = document.createTextNode(nextChar);
                letterBox.insertBefore(charNode, cursor);
            }
            
            charIdx++;
            setTimeout(type, 30);
        } else {
            // Keep blinking cursor or fade it out
            setTimeout(() => {
                cursor.style.display = "none";
            }, 5000);
        }
    }
    
    // Start typing letter
    setTimeout(type, 200);
}

// ==========================================================================
// 7. AUDIO CONTROLLER
// ==========================================================================

function setupAudioToggle() {
    const audioBtn = document.getElementById("music-toggle-btn");
    const audioEl = document.getElementById("birthday-audio");
    const musicLabel = audioBtn.querySelector(".music-label");

    audioBtn.addEventListener("click", () => {
        if (audioEl.paused) {
            audioEl.play()
                .then(() => {
                    audioEl.muted = false;
                    audioBtn.classList.add("playing");
                    musicLabel.textContent = "Music ON";
                })
                .catch(err => {
                    console.error("Playback block: ", err);
                    alert("Click anywhere on the screen first, then toggle audio.");
                });
        } else {
            audioEl.pause();
            audioBtn.classList.remove("playing");
            musicLabel.textContent = "Music OFF";
        }
    });
}

// ==========================================================================
// 8. MEMORIES GALLERY LIGHTBOX MODAL
// ==========================================================================

function setupGalleryLightbox() {
    const galleryItems = document.querySelectorAll(".gallery-item");
    const lightbox = document.getElementById("gallery-lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const closeBtn = document.getElementById("lightbox-close-btn");

    galleryItems.forEach(item => {
        item.addEventListener("click", () => {
            const img = item.querySelector("img");
            lightboxImg.src = img.src;
            lightboxImg.alt = img.alt;
            
            lightbox.classList.add("open");
            lightbox.setAttribute("aria-hidden", "false");
            document.body.style.overflow = "hidden"; // disable page scroll
        });
    });

    function closeLightbox() {
        lightbox.classList.remove("open");
        lightbox.setAttribute("aria-hidden", "true");
        document.body.style.overflow = ""; // re-enable page scroll
    }

    closeBtn.addEventListener("click", closeLightbox);
    
    // Close on overlay backdrop click
    lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Close on Escape key
    window.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && lightbox.classList.contains("open")) {
            closeLightbox();
        }
    });
}

// ==========================================================================
// 9. SECRET DECRYPTOR TERMINAL FLOW
// ==========================================================================

function setupSecretDecryptor() {
    const unlockBtn = document.getElementById("unlock-secret-btn");
    const lockedUI = document.getElementById("secret-locked-ui");
    const terminalUI = document.getElementById("secret-terminal-ui");
    const decryptedUI = document.getElementById("secret-unlocked-ui");
    const consoleLogs = document.getElementById("secret-terminal-logs");
    const placeholderText = document.getElementById("secret-message-placeholder");

    // Prepopulate decrypted secret text
    placeholderText.textContent = birthdayData.secretMessage;

    const decryptLogs = [
        { text: "> Authentication required...", delay: 400 },
        { text: "> Establishing handshake protocol...", delay: 500 },
        { text: "> Initializing friendship level validator...", delay: 600 },
        { text: "> Fetching common memories matrix...", delay: 800 },
        { text: "> Memories index verified ✓", delay: 400, color: "green" },
        { text: "> Calculating trust index coefficient...", delay: 700 },
        { text: "> Trust level: MAXIMUM detected ✓", delay: 500, color: "green" },
        { text: "> Status: Best Friend / Brother clearance level found.", delay: 600 },
        { text: "> Decrypting secret files... 0%", delay: 300 },
        { text: "> Decrypting secret files... 37%", delay: 250 },
        { text: "> Decrypting secret files... 72%", delay: 200 },
        { text: "> Decrypting secret files... 99.99%", delay: 300 },
        { text: "> Decrypting complete ✓", delay: 400, color: "green" },
        { text: "> Access granted. Opening decrypted_friendship_log.txt...", delay: 600 }
    ];

    unlockBtn.addEventListener("click", () => {
        lockedUI.classList.add("hidden");
        terminalUI.classList.remove("hidden");
        consoleLogs.innerHTML = ""; // Clear console logs

        let lineIdx = 0;

        // Create cursor inside secret logs
        const cursor = document.createElement("span");
        cursor.className = "cursor";
        consoleLogs.appendChild(cursor);

        function typeNextDecryptLine() {
            if (lineIdx < decryptLogs.length) {
                const lineData = decryptLogs[lineIdx];
                const logNode = document.createElement("div");
                logNode.className = "terminal-line";
                
                if (lineData.color === "green") {
                    logNode.classList.add("green-text");
                }
                
                consoleLogs.insertBefore(logNode, cursor);

                let charIdx = 0;
                const txt = lineData.text;

                function writeChar() {
                    if (charIdx < txt.length) {
                        logNode.textContent += txt[charIdx];
                        charIdx++;
                        setTimeout(writeChar, 15);
                    } else {
                        lineIdx++;
                        consoleLogs.scrollTop = consoleLogs.scrollHeight;
                        setTimeout(typeNextDecryptLine, lineData.delay);
                    }
                }
                writeChar();
            } else {
                // Completed auth, show secret message card
                setTimeout(() => {
                    terminalUI.classList.add("hidden");
                    decryptedUI.classList.remove("hidden");
                    
                    // Fire floating heart particles
                    for (let i = 0; i < 40; i++) {
                        particles.push(new Particle(
                            Math.random() * particleCanvas.width,
                            particleCanvas.height + 20,
                            'heart'
                        ));
                    }
                    if (!celebratoryExplosionActive) {
                        celebratoryExplosionActive = true;
                        animateParticles();
                    }
                }, 500);
            }
        }

        typeNextDecryptLine();
    });
}

// ==========================================================================
// 10. SUDO MAKE_YOUSEF_HAPPY CONSOLE
// ==========================================================================

function setupSudoHappyBtn() {
    const sudoBtn = document.getElementById("sudo-happy-btn");
    const consoleOutput = document.getElementById("sudo-console-output");

    const sudoLogs = [
        { text: "[sudo] password for birthday: **********", delay: 600 },
        { text: "Authentication successful.", delay: 400 },
        { text: "Processing make_yousef_happy module...", delay: 700 },
        { text: "-> Retrieving birthday laughter buffers...", delay: 500 },
        { text: "-> Setting anxiety and engineering compiler warnings to 0...", delay: 800 },
        { text: "Installing happiness package... [ SUCCESS ]", delay: 600, color: "green" },
        { text: "Installing success algorithms... [ SUCCESS ]", delay: 500, color: "green" },
        { text: "Injecting sweet memory modules... [ SUCCESS ]", delay: 600, color: "green" },
        { text: "Cleaning cache and compiling future...", delay: 700 },
        { text: "System execution complete ✓", delay: 400, color: "green" },
        { text: "Happy Birthday, Yousef ❤️", delay: 800, color: "pink" }
    ];

    sudoBtn.addEventListener("click", () => {
        sudoBtn.disabled = true;
        consoleOutput.classList.remove("hidden");
        consoleOutput.innerHTML = ""; // Clear console output
        
        let lineIdx = 0;

        const cursor = document.createElement("span");
        cursor.className = "cursor";
        consoleOutput.appendChild(cursor);

        function typeNextSudoLine() {
            if (lineIdx < sudoLogs.length) {
                const lineData = sudoLogs[lineIdx];
                const logDiv = document.createElement("div");
                logDiv.className = "terminal-line";
                
                if (lineData.color === "green") {
                    logDiv.classList.add("green-text");
                } else if (lineData.color === "pink") {
                    logDiv.classList.add("text-red");
                    logDiv.style.fontWeight = "bold";
                }
                
                consoleOutput.insertBefore(logDiv, cursor);

                let charIdx = 0;
                const txt = lineData.text;

                function writeChar() {
                    if (charIdx < txt.length) {
                        logDiv.textContent += txt[charIdx];
                        charIdx++;
                        setTimeout(writeChar, 18);
                    } else {
                        lineIdx++;
                        consoleOutput.scrollTop = consoleOutput.scrollHeight;
                        setTimeout(typeNextSudoLine, lineData.delay);
                    }
                }
                writeChar();
            } else {
                cursor.style.display = "none";
                // Trigger celebratory rain
                launchCelebrationExplosion();
                fireTopShower();
                
                // Reset button after 6 seconds
                setTimeout(() => {
                    sudoBtn.disabled = false;
                }, 6000);
            }
        }

        typeNextSudoLine();
    });
}

// ==========================================================================
// 11. KEYBOARD HOTKEYS & EASTER EGGS
// ==========================================================================

function setupKeyboardEasterEggs() {
    // 1. Spells out 'yousef' easter egg
    const targetWord = "yousef";
    let typedChars = "";
    
    window.addEventListener("keydown", (e) => {
        // Prevent key buffer overflow
        if (typedChars.length > 20) {
            typedChars = typedChars.substring(typedChars.length - 10);
        }
        
        // Accept only simple alphabetical key codes
        if (e.key.length === 1 && /[a-zA-Z]/.test(e.key)) {
            typedChars += e.key.toLowerCase();
            
            // Check if user spelled 'yousef'
            if (typedChars.endsWith(targetWord)) {
                // Trigger celebratory matrix and confetti
                launchCelebrationExplosion();
                fireTopShower();
                
                // Show floating message toast
                showToastNotification("SYSTEM OVERRIDE: YOUSEF CORE DETECTED! ✓");
                
                // Reset typed buffer
                typedChars = "";
            }
        }
    });
}

function showToastNotification(message) {
    const toast = document.createElement("div");
    toast.className = "toast-message";
    toast.textContent = message;
    
    // Inject styling directly to avoid style block pollution
    toast.style.position = "fixed";
    toast.style.bottom = "80px";
    toast.style.left = "50%";
    toast.style.transform = "translateX(-50%) translateY(20px)";
    toast.style.backgroundColor = "rgba(10, 10, 12, 0.95)";
    toast.style.border = "1px solid var(--neon-green)";
    toast.style.boxShadow = "0 0 15px var(--neon-green-glow)";
    toast.style.color = "var(--neon-green)";
    toast.style.padding = "0.8rem 2rem";
    toast.style.borderRadius = "4px";
    toast.style.fontFamily = "var(--font-cyber)";
    toast.style.fontSize = "0.9rem";
    toast.style.zIndex = "99999";
    toast.style.opacity = "0";
    toast.style.transition = "opacity 0.4s ease, transform 0.4s ease";
    
    document.body.appendChild(toast);
    
    // Trigger transition
    setTimeout(() => {
        toast.style.opacity = "1";
        toast.style.transform = "translateX(-50%) translateY(0)";
    }, 50);

    // Fade out and remove
    setTimeout(() => {
        toast.style.opacity = "0";
        toast.style.transform = "translateX(-50%) translateY(-20px)";
        setTimeout(() => {
            toast.remove();
        }, 400);
    }, 3500);
}

// ==========================================================================
// 12. ADMIN INTERACTIVE CMD MODAL (Ctrl + Shift + Y)
// ==========================================================================

function setupSecretTerminalModal() {
    const modal = document.getElementById("secret-terminal-modal");
    const closeBtn = document.getElementById("terminal-modal-close-btn");
    const cliInput = document.getElementById("terminal-cli-input");
    const consoleLogs = document.getElementById("modal-console-logs");

    // Keydown toggle
    window.addEventListener("keydown", (e) => {
        if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'y') {
            e.preventDefault();
            toggleModal();
        }
    });

    function toggleModal() {
        modal.classList.toggle("open");
        if (modal.classList.contains("open")) {
            cliInput.focus();
            document.body.style.overflow = "hidden"; // lock page
        } else {
            document.body.style.overflow = ""; // unlock page
        }
    }

    closeBtn.addEventListener("click", toggleModal);

    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            toggleModal();
        }
    });

    // Handle inputs
    cliInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            const command = cliInput.value.trim().toLowerCase();
            cliInput.value = "";
            
            executeAdminCmd(command);
        }
    });

    function executeAdminCmd(command) {
        // Output typed input line
        consoleLogs.innerHTML += `<br><span class="cmd-prompt">guest@yousef.exe:~$</span> ${command}`;
        
        let response = "";
        
        switch (command) {
            case "help":
                response = `Available commands:<br>
                - <span class="cyan-text">about</span>: Details the subject profile.<br>
                - <span class="cyan-text">hack</span>: Simulates code core matrix override.<br>
                - <span class="cyan-text">confetti</span>: Deploys celebratory confetti blast.<br>
                - <span class="cyan-text">heart</span>: Deploys romantic floating hearts shower.<br>
                - <span class="cyan-text">clear</span>: Wipes console screen clean.<br>
                - <span class="cyan-text">exit</span>: Exits command prompt.`;
                break;
            case "about":
                response = `Name: Yousef<br>Major: Computer Engineering v1.0<br>Friendship: Infinite<br>Special status: My Favorite Human.`;
                break;
            case "hack":
                response = `Hacking system database...<br>
                <span class="text-red">ERROR: HEART ACCESS RESTRICTED!</span><br>
                Bypassing security layers... [ OK ]<br>
                Injecting happiness index: 100%<br>
                Yousef.exe overridden successfully ✓`;
                launchCelebrationExplosion();
                break;
            case "confetti":
                response = `Launching celebratory confetti rain... [ SUCCESS ]`;
                launchCelebrationExplosion();
                break;
            case "heart":
                response = `Injecting floating hearts shower... [ SUCCESS ]`;
                // Shower 50 hearts
                for (let i = 0; i < 50; i++) {
                    particles.push(new Particle(
                        Math.random() * particleCanvas.width,
                        particleCanvas.height + 10,
                        'heart'
                    ));
                }
                if (!celebratoryExplosionActive) {
                    celebratoryExplosionActive = true;
                    animateParticles();
                }
                break;
            case "clear":
                consoleLogs.innerHTML = `Console screen cleared.<br>Type 'help' for options.`;
                return;
            case "exit":
                toggleModal();
                return;
            default:
                response = `yousef_cli: command not found: '${command}'. Type 'help' for instructions.`;
        }

        consoleLogs.innerHTML += `<br>${response}`;
        consoleLogs.scrollTop = consoleLogs.scrollHeight;
    }
}

// ==========================================================================
// 13. BIRTHDAY GIFT BOX EXPLOSION
// ==========================================================================

function setupGiftBox() {
    const giftBtn = document.getElementById("open-gift-btn");
    const revealBox = document.getElementById("gift-reveal-box");

    giftBtn.addEventListener("click", () => {
        if (giftBtn.classList.contains("opened")) return;
        
        giftBtn.classList.add("opened");
        
        // Launch dynamic particle fireworks
        launchCelebrationExplosion();
        fireTopShower();
        
        // Double explosion for awesome feedback!
        setTimeout(launchCelebrationExplosion, 300);
        setTimeout(fireTopShower, 600);

        // Slide up and zoom in the post-gift reveal card
        setTimeout(() => {
            revealBox.classList.remove("hidden");
            // Trigger animation zoom
            setTimeout(() => {
                revealBox.classList.add("reveal");
                
                // Scroll target viewport to show full card
                const headerHeight = 70;
                const offset = revealBox.offsetTop - headerHeight - 20;
                window.scrollTo({
                    top: offset,
                    behavior: "smooth"
                });
            }, 50);
        }, 800);
    });
}
