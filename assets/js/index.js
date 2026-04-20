// GRID HERO

const canvas = document.getElementById('gridCanvas');
const ctx = canvas.getContext('2d');
let pulses = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = 300;
}

resizeCanvas();

window.addEventListener('resize', () => {
    resizeCanvas();
    pulses = [];
});

function drawGrid() {
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    const centerX = canvas.width / 2;
    const horizonY = canvas.height * 1;
    
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 1;
    
    const verticalCount = 60;
    
    for (let i = 0; i < verticalCount; i++) {
        const t = i / (verticalCount - 1);
        const xOffset = (t - 0.5) * canvas.width * 10;
        
        ctx.beginPath();
        ctx.moveTo(centerX + xOffset, horizonY);
        ctx.lineTo(centerX + xOffset * 0.15, 0);
        ctx.stroke();
    }
    
    const horizontalCount = 10;
    
    for (let i = 0; i < horizontalCount; i++) {
        const t = i / (horizontalCount - 1);
        const y = horizonY - (horizonY) * t;
        
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
    }
}

function createPulse() {
    const centerX = canvas.width / 2;
    const horizonY = canvas.height * 1;
    const verticalCount = 60;
    const horizontalCount = 10;
    
    const isHorizontal = Math.random() > 0.5;
    
    if (isHorizontal) {
        const lineIndex = Math.floor(Math.random() * horizontalCount);
        const t = lineIndex / (horizontalCount - 1);
        const y = horizonY - (horizonY) * t;
        
        pulses.push({
            type: 'horizontal',
            y: y,
            progress: 0,
            speed: 0.010 + Math.random() * 0.005
        });
    } else {
        const lineIndex = Math.floor(Math.random() * verticalCount);
        const t = lineIndex / (verticalCount - 1);
        const xOffset = (t - 0.5) * canvas.width * 10;
        
        pulses.push({
            type: 'vertical',
            lineIndex: lineIndex,
            xOffset: xOffset,
            centerX: centerX,
            horizonY: horizonY,
            progress: 0,
            speed: 0.003 + Math.random() * 0.005
        });
    }
}

function drawPulses() {
    ctx.lineWidth = 1;
    ctx.lineCap = 'round';
    
    pulses.forEach((pulse, index) => {
        if (pulse.type === 'horizontal') {
            const startX = pulse.progress * canvas.width;
            const length = canvas.width * 0.25;
            
            ctx.shadowBlur = 15;
            ctx.shadowColor = 'rgba(255, 23, 68, 0.8)';
            
            const gradient = ctx.createLinearGradient(
                Math.max(0, startX - length),
                pulse.y,
                startX,
                pulse.y
            );
            gradient.addColorStop(0, 'rgba(255, 23, 68, 0)');
            gradient.addColorStop(0.5, 'rgba(255, 23, 68, 0.8)');
            gradient.addColorStop(1, 'rgba(255, 23, 68, 1)');
            
            ctx.strokeStyle = gradient;
            ctx.beginPath();
            ctx.moveTo(Math.max(0, startX - length), pulse.y);
            ctx.lineTo(startX, pulse.y);
            ctx.stroke();
            
            ctx.shadowBlur = 0;
            
        } else {
            const currentY = pulse.horizonY - (pulse.progress * pulse.horizonY);
            const length = pulse.horizonY * 0.3;
            const endY = Math.max(0, currentY - length);
            
            const getX = (y) => {
                const progressFromHorizon = (pulse.horizonY - y) / pulse.horizonY;
                return pulse.centerX + pulse.xOffset * 0.15 + (pulse.xOffset * 0.85 * (1 - progressFromHorizon));
            };
            
            ctx.shadowBlur = 15;
            ctx.shadowColor = 'rgba(255, 23, 68, 0.8)';
            
            ctx.strokeStyle = 'rgba(255, 23, 68, 1)';
            ctx.beginPath();
            ctx.moveTo(getX(currentY), currentY);
            
            const segments = 20;
            for (let i = 1; i <= segments; i++) {
                const segmentY = currentY - (i / segments) * length;
                if (segmentY < 0) break;
                
                const alpha = i / segments;
                ctx.strokeStyle = `rgba(255, 23, 68, ${alpha})`;
                ctx.lineTo(getX(segmentY), segmentY);
            }
            
            ctx.stroke();
            ctx.shadowBlur = 0;
        }
        
        pulse.progress += pulse.speed;
        
        if (pulse.progress > 1.15) {
            pulses.splice(index, 1);
        }
    });
}

function animate() {
    drawGrid();
    drawPulses();
    requestAnimationFrame(animate);
}

setInterval(() => {
    if (pulses.length < 50 && Math.random() > 0.2) {
        createPulse();
    }
}, 50);

animate();


// GRID CTA

// SECOND GRID DIVIDER (CTA)
const canvasCTA = document.getElementById('gridCanvasCTA');
const ctxCTA = canvasCTA.getContext('2d');
let pulsesCTA = [];

function resizeCanvasCTA() {
    canvasCTA.width = window.innerWidth;
    canvasCTA.height = 300;
}

resizeCanvasCTA();

window.addEventListener('resize', () => {
    resizeCanvasCTA();
    pulsesCTA = [];
});

function drawGridCTA() {
    ctxCTA.fillStyle = '#FFFFFF';
    ctxCTA.fillRect(0, 0, canvasCTA.width, canvasCTA.height);
    
    const centerX = canvasCTA.width / 2;
    const horizonY = canvasCTA.height * 1;
    
    ctxCTA.strokeStyle = '#000000';
    ctxCTA.lineWidth = 1;
    
    const verticalCount = 60;
    
    for (let i = 0; i < verticalCount; i++) {
        const t = i / (verticalCount - 1);
        const xOffset = (t - 0.5) * canvasCTA.width * 10;
        
        ctxCTA.beginPath();
        ctxCTA.moveTo(centerX + xOffset, horizonY);
        ctxCTA.lineTo(centerX + xOffset * 0.15, 0);
        ctxCTA.stroke();
    }
    
    const horizontalCount = 10;
    
    for (let i = 0; i < horizontalCount; i++) {
        const t = i / (horizontalCount - 1);
        const y = horizonY - (horizonY) * t;
        
        ctxCTA.beginPath();
        ctxCTA.moveTo(0, y);
        ctxCTA.lineTo(canvasCTA.width, y);
        ctxCTA.stroke();
    }
}

function createPulseCTA() {
    const centerX = canvasCTA.width / 2;
    const horizonY = canvasCTA.height * 1;
    const verticalCount = 60;
    const horizontalCount = 10;
    
    const isHorizontal = Math.random() > 0.5;
    
    if (isHorizontal) {
        const lineIndex = Math.floor(Math.random() * horizontalCount);
        const t = lineIndex / (horizontalCount - 1);
        const y = horizonY - (horizonY) * t;
        
        pulsesCTA.push({
            type: 'horizontal',
            y: y,
            progress: 0,
            speed: 0.010 + Math.random() * 0.005
        });
    } else {
        const lineIndex = Math.floor(Math.random() * verticalCount);
        const t = lineIndex / (verticalCount - 1);
        const xOffset = (t - 0.5) * canvasCTA.width * 10;
        
        pulsesCTA.push({
            type: 'vertical',
            lineIndex: lineIndex,
            xOffset: xOffset,
            centerX: centerX,
            horizonY: horizonY,
            progress: 0,
            speed: 0.003 + Math.random() * 0.005
        });
    }
}

function drawPulsesCTA() {
    ctxCTA.lineWidth = 1;
    ctxCTA.lineCap = 'round';
    
    pulsesCTA.forEach((pulse, index) => {
        if (pulse.type === 'horizontal') {
            const startX = pulse.progress * canvasCTA.width;
            const length = canvasCTA.width * 0.25;
            
            ctxCTA.shadowBlur = 15;
            ctxCTA.shadowColor = 'rgba(255, 23, 68, 0.8)';
            
            const gradient = ctxCTA.createLinearGradient(
                Math.max(0, startX - length),
                pulse.y,
                startX,
                pulse.y
            );
            gradient.addColorStop(0, 'rgba(255, 23, 68, 0)');
            gradient.addColorStop(0.5, 'rgba(255, 23, 68, 0.8)');
            gradient.addColorStop(1, 'rgba(255, 23, 68, 1)');
            
            ctxCTA.strokeStyle = gradient;
            ctxCTA.beginPath();
            ctxCTA.moveTo(Math.max(0, startX - length), pulse.y);
            ctxCTA.lineTo(startX, pulse.y);
            ctxCTA.stroke();
            
            ctxCTA.shadowBlur = 0;
            
        } else {
            const currentY = pulse.horizonY - (pulse.progress * pulse.horizonY);
            const length = pulse.horizonY * 0.3;
            const endY = Math.max(0, currentY - length);
            
            const getX = (y) => {
                const progressFromHorizon = (pulse.horizonY - y) / pulse.horizonY;
                return pulse.centerX + pulse.xOffset * 0.15 + (pulse.xOffset * 0.85 * (1 - progressFromHorizon));
            };
            
            ctxCTA.shadowBlur = 15;
            ctxCTA.shadowColor = 'rgba(255, 23, 68, 0.8)';
            
            ctxCTA.strokeStyle = 'rgba(255, 23, 68, 1)';
            ctxCTA.beginPath();
            ctxCTA.moveTo(getX(currentY), currentY);
            
            const segments = 20;
            for (let i = 1; i <= segments; i++) {
                const segmentY = currentY - (i / segments) * length;
                if (segmentY < 0) break;
                
                const alpha = i / segments;
                ctxCTA.strokeStyle = `rgba(255, 23, 68, ${alpha})`;
                ctxCTA.lineTo(getX(segmentY), segmentY);
            }
            
            ctxCTA.stroke();
            ctxCTA.shadowBlur = 0;
        }
        
        pulse.progress += pulse.speed;
        
        if (pulse.progress > 1.15) {
            pulsesCTA.splice(index, 1);
        }
    });
}

function animateCTA() {
    drawGridCTA();
    drawPulsesCTA();
    requestAnimationFrame(animateCTA);
}

setInterval(() => {
    if (pulsesCTA.length < 50 && Math.random() > 0.2) {
        createPulseCTA();
    }
}, 50);

animateCTA();


function createParticles(box) {
    const rect = box.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Create 15-20 particles
    for (let i = 0; i < 18; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.left = centerX + 'px';
        particle.style.top = centerY + 'px';
        particle.style.width = Math.random() * 8 + 4 + 'px';
        particle.style.height = particle.style.width;
        particle.style.background = 'var(--ghosxt-black)';
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '9999';
        
        document.body.appendChild(particle);
        
        // Random direction and distance
        const angle = (Math.PI * 2 * i) / 18;
        const velocity = Math.random() * 150 + 100;
        const tx = Math.cos(angle) * velocity;
        const ty = Math.sin(angle) * velocity;
        
        particle.animate([
            { transform: 'translate(0, 0) scale(1)', opacity: 1 },
            { transform: `translate(${tx}px, ${ty}px) scale(0)`, opacity: 0 }
        ], {
            duration: 800,
            easing: 'cubic-bezier(0.4, 0, 0.6, 1)'
        });
        
        setTimeout(() => particle.remove(), 800);
    }
}


// Make floating boxes draggable with solution box interaction
const floatingBoxes = document.querySelectorAll('.floating-box');
const solutionBox = document.getElementById('solutionBox');
const solvedCount = document.getElementById('solvedCount');
const successMessage = document.getElementById('successMessage');
let problemsSolved = 0;

floatingBoxes.forEach((box, index) => {
    let isDragging = false;
    let currentX;
    let currentY;
    let initialX;
    let initialY;
    let xOffset = 0;
    let yOffset = 0;

    const rotations = ['3deg', '-2deg', '5deg', '-3deg', '2deg'];
    box.style.setProperty('--rotation', rotations[index]);

    box.addEventListener('mousedown', dragStart, false);
    box.addEventListener('touchstart', dragStart, { passive: false });

    function dragStart(e) {
        const rect = box.getBoundingClientRect();
        const parentRect = box.parentElement.getBoundingClientRect();
        
        if (e.type === 'touchstart') {
            e.preventDefault();
            initialX = e.touches[0].clientX - parentRect.left - xOffset;
            initialY = e.touches[0].clientY - parentRect.top - yOffset;
        } else {
            initialX = e.clientX - parentRect.left - xOffset;
            initialY = e.clientY - parentRect.top - yOffset;
        }

        if (e.target === box || box.contains(e.target)) {
            isDragging = true;
            box.style.animation = 'none';
            box.style.zIndex = '1000';
            
            // Add move and end listeners only while dragging
            if (e.type === 'touchstart') {
                document.addEventListener('touchmove', drag, { passive: false });
                document.addEventListener('touchend', dragEnd, { passive: false });
            } else {
                document.addEventListener('mousemove', drag, false);
                document.addEventListener('mouseup', dragEnd, false);
            }
        }
    }

    function drag(e) {
        if (isDragging) {
            e.preventDefault();
            
            const parentRect = box.parentElement.getBoundingClientRect();
            
            if (e.type === 'touchmove') {
                currentX = e.touches[0].clientX - parentRect.left;
                currentY = e.touches[0].clientY - parentRect.top;
            } else {
                currentX = e.clientX - parentRect.left;
                currentY = e.clientY - parentRect.top;
            }

            xOffset = currentX - initialX;
            yOffset = currentY - initialY;

            setTranslate(xOffset, yOffset, box);
            
            const boxRect = box.getBoundingClientRect();
            const solutionRect = solutionBox.getBoundingClientRect();
            
            if (isColliding(boxRect, solutionRect)) {
                solutionBox.classList.add('drag-over');
            } else {
                solutionBox.classList.remove('drag-over');
            }
        }
    }

    function dragEnd(e) {
        if (isDragging) {
            const boxRect = box.getBoundingClientRect();
            const solutionRect = solutionBox.getBoundingClientRect();
            
            if (isColliding(boxRect, solutionRect)) {
                createParticles(box);
                box.classList.add('solving');
                problemsSolved++;
                solvedCount.textContent = problemsSolved;
                
                setTimeout(() => {
                    box.style.display = 'none';
                }, 100);
                
                if (problemsSolved === 5) {
                    canScrollPastProblems = true;
                    setTimeout(() => {
                        solutionBox.style.display = 'none';
                        const successState = document.getElementById('successState');
                        successState.classList.add('show');
                        
                        // Unlock the rest of sections
                        const testimonialSection = document.getElementById('testimonialSection');
                        const solutionsSection = document.getElementById('solutionsSection');
                        const efficiencySection = document.getElementById('efficiencySection');

                        testimonialSection.classList.add('unlocked');
                        solutionsSection.classList.add('unlocked');
                        efficiencySection.classList.add('unlocked');

                        setTimeout(() => {
                            solutionsSection.scrollIntoView({ 
                                behavior: 'smooth',
                                block: 'start'
                            });
                        }, 500);
                    }, 600);
                }
            }
            
            solutionBox.classList.remove('drag-over');
        }
        
        initialX = currentX;
        initialY = currentY;
        isDragging = false;
        
        // Remove listeners when drag ends
        document.removeEventListener('mousemove', drag);
        document.removeEventListener('mouseup', dragEnd);
        document.removeEventListener('touchmove', drag);
        document.removeEventListener('touchend', dragEnd);
    }

    function setTranslate(xPos, yPos, el) {
        const currentTransform = el.style.transform;
        const rotateMatch = currentTransform.match(/rotate\([^)]+\)/);
        const rotate = rotateMatch ? rotateMatch[0] : '';
        
        el.style.transform = `translate(${xPos}px, ${yPos}px) ${rotate}`;
    }
});

function isColliding(rect1, rect2) {
    return !(rect1.right < rect2.left || 
            rect1.left > rect2.right || 
            rect1.bottom < rect2.top || 
            rect1.top > rect2.bottom);
}


// Solutions Tab Functionality with Illustration Switching
document.querySelectorAll('.solutions-tab').forEach(tab => {
    tab.addEventListener('click', () => {
        const tabName = tab.getAttribute('data-tab');
        
        // Remove active class from all tabs
        document.querySelectorAll('.solutions-tab').forEach(t => {
            t.classList.remove('active');
        });
        
        // Remove active class from all tab contents
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });
        
        // Add active class to clicked tab
        tab.classList.add('active');
        
        // Add active class to corresponding content
        document.querySelector(`.tab-content[data-tab="${tabName}"]`).classList.add('active');
        
        // Switch illustrations based on tab
        const radarIllustration = document.querySelector('.radar-illustration');
        const infraIllustration = document.querySelector('.infrastructure-illustration');
        const placeholderIllustration = document.querySelector('.placeholder-illustration');
        
        // Hide all illustrations first
        if (radarIllustration) radarIllustration.style.display = 'none';
        if (infraIllustration) infraIllustration.style.display = 'none';
        if (placeholderIllustration) placeholderIllustration.style.display = 'none';
        
        // Show the correct illustration
        if (tabName === 'knowledge' && radarIllustration) {
            radarIllustration.style.display = 'flex';
            startRadarTimer(); // Restart timer when tab is shown
        } else if (tabName === 'distribution' && infraIllustration) {
            infraIllustration.style.display = 'flex';
        } else if (tabName === 'insights' && placeholderIllustration) {
            placeholderIllustration.style.display = 'block';
        }
    });
});

// Radar Time Counter Animation
let radarTimerInterval;

function startRadarTimer() {
    // Clear any existing interval
    if (radarTimerInterval) {
        clearInterval(radarTimerInterval);
    }
    
    const radarTimeEl1 = document.getElementById('radarTime1');
    const radarTimeEl2 = document.getElementById('radarTime2');
    if (!radarTimeEl1 || !radarTimeEl2) return;
    
    const cycleDuration = 5000; // 5 seconds in milliseconds
    const totalSeconds = 86399; // 23:59:59 in seconds
    const updateInterval = 50; // Update every 50ms for smooth animation
    const secondsPerUpdate = totalSeconds / (cycleDuration / updateInterval);
    
    let seconds = 0;
    
    radarTimeEl1.textContent = '00:00:00';
    radarTimeEl2.textContent = '00:00:00';
    
    radarTimerInterval = setInterval(() => {
        seconds += secondsPerUpdate;
        if (seconds >= totalSeconds) {
            seconds = 0; // Reset to start
        }
        
        const currentSeconds = Math.floor(seconds);
        const hours = Math.floor(currentSeconds / 3600);
        const minutes = Math.floor((currentSeconds % 3600) / 60);
        const secs = currentSeconds % 60;
        
        const timeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        
        radarTimeEl1.textContent = timeString;
        radarTimeEl2.textContent = timeString;
    }, updateInterval);
}

// Start the radar timer on page load since "knowledge" tab is active by default
document.addEventListener('DOMContentLoaded', () => {
    startRadarTimer();
});



// Features Stack Effect
function initFeaturesStack() {
    const cards = document.querySelectorAll('.feature-card');
    
    if (cards.length === 0) return;

    function updateCardPositions() {
        const cardElements = Array.from(cards);
        
        cardElements.forEach((card, index) => {
            const rect = card.getBoundingClientRect();
            const windowCenter = window.innerHeight / 2;
            const cardCenter = rect.top + rect.height / 2;
            const distance = Math.abs(windowCenter - cardCenter);
            
            // Set CSS variable for stacking
            card.style.setProperty('--card-index', index);
            
            // Check if card is in view and should stick
            if (rect.top <= windowCenter && rect.bottom >= windowCenter) {
                card.classList.add('stacked');
            } else {
                card.classList.remove('stacked');
            }
        });
    }

    // Update on scroll
    window.addEventListener('scroll', updateCardPositions, { passive: true });
    
    // Initial call
    updateCardPositions();
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFeaturesStack);
} else {
    initFeaturesStack();
}

// Recalculate on resize
window.addEventListener('resize', () => {
    const cards = document.querySelectorAll('.feature-card');
    cards.forEach((card, index) => {
        card.style.setProperty('--card-index', index);
    });
}, { passive: true });






const conversationData = {
    0: {
        userMessage: "Hey Ulises, our website homepage is broken, we need to fix it ASAP",
        supportMessages: [
            { delay: 2000, text: "Checking right now" },
            { delay: 3500, text: "Ohh I see the issue, let me fix it right now" },
            { delay: 5500, text: "Done! Your homepage is back online. It was a DNS propagation issue." }
        ]
    },
    1: {
        userMessage: "Hey Ulises, we got a suspicious email, might be a security breach",
        supportMessages: [
            { delay: 2000, text: "Analyzing the email now" },
            { delay: 3500, text: "Got it - this is a phishing attempt. I'm isolating affected systems immediately" },
            { delay: 5500, text: "All clear! I've blocked the domain and updated your security protocols. You're protected." }
        ]
    },
    2: {
        userMessage: "Hey Ulises, our database server is down, losing money by the minute",
        supportMessages: [
            { delay: 2000, text: "On it - checking your server status" },
            { delay: 3500, text: "Found the issue - storage capacity maxed out. Starting recovery protocol" },
            { delay: 5500, text: "Server is back up! Expanded your capacity and implemented auto-scaling. Won't happen again." }
        ]
    }
};

function startConversation(scenario) {
    const chatMessages = document.getElementById('chatMessages');
    const chatOptions = document.getElementById('chatOptions');
    const data = conversationData[scenario];

    // Clear messages
    chatMessages.innerHTML = '';
    
    // Hide options while conversation is happening
    chatOptions.style.display = 'none';

    // Add initial greeting
    const greeting = document.createElement('div');
    greeting.className = 'message support';
    greeting.innerHTML = `<div class="message-sender">Ulises - Ghosxt Support</div><div class="message-bubble">Hey there! 👋 What's going on today?</div>`;
    chatMessages.appendChild(greeting);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // Add user message
    setTimeout(() => {
        const userMsg = document.createElement('div');
        userMsg.className = 'message user';
        userMsg.innerHTML = `<div class="message-sender">You</div><div class="message-bubble">${data.userMessage}</div>`;
        chatMessages.appendChild(userMsg);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 500);

    // Add support messages with typing bubble
    data.supportMessages.forEach((msg, index) => {
        setTimeout(() => {
            // Add typing bubble
            const typingMsg = document.createElement('div');
            typingMsg.className = 'message support';
            typingMsg.innerHTML = '<div class="typing-bubble"><div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div></div>';
            chatMessages.appendChild(typingMsg);
            chatMessages.scrollTop = chatMessages.scrollHeight;

            // Replace typing bubble with actual message after delay
            const messageDelay = index === 0 ? 1000 : 1500;
            setTimeout(() => {
                typingMsg.remove();
                const supportMsg = document.createElement('div');
                supportMsg.className = 'message support';
                supportMsg.innerHTML = `<div class="message-sender">Ulises - Ghosxt Support</div><div class="message-bubble">${msg.text}</div>`;
                chatMessages.appendChild(supportMsg);
                chatMessages.scrollTop = chatMessages.scrollHeight;

                // Show reset button after last message
                if (index === data.supportMessages.length - 1) {
                    setTimeout(() => {
                        showResetButton();
                    }, 1000);
                }
            }, messageDelay);
        }, msg.delay);
    });
}

function showResetButton() {
    const chatOptions = document.getElementById('chatOptions');
    chatOptions.innerHTML = `
        <button class="reset-btn" onclick="resetChat()">
            <i class="fi fi-rs-rotate-right"></i>
            Try Another Option
        </button>
    `;
    chatOptions.style.display = 'flex';
}

function resetChat() {
    const chatMessages = document.getElementById('chatMessages');
    const chatOptions = document.getElementById('chatOptions');

    // Clear messages
    chatMessages.innerHTML = '';

    // Show initial options again
    chatOptions.innerHTML = `
        <button class="option-btn" onclick="startConversation(0)">
            <i class="fi fi-rs-error-bug"></i> Our website homepage is broken, we need to fix it ASAP
        </button>
        <button class="option-btn" onclick="startConversation(1)">
            <i class="fi fi-rs-error-bug"></i> We got a suspicious email, might be a security breach
        </button>
        <button class="option-btn" onclick="startConversation(2)">
            <i class="fi fi-rs-error-bug"></i> Our database server is down, losing money by the minute
        </button>
    `;
    chatOptions.style.display = 'flex';
}


// Add this to your script.js file

// Track if user has completed their first conversation
let hasCompletedFirstConversation = false;

function unlockRemainingSections() {
    if (hasCompletedFirstConversation) return; // Already unlocked
    
    hasCompletedFirstConversation = true;
    
    const featuresStackSection = document.getElementById('featuresStackSection');
    const footerSection = document.getElementById('footerSection');
    
    // Unlock all remaining sections
    featuresStackSection.classList.add('unlocked');
    footerSection.classList.add('unlocked');

}

// Modify the existing showResetButton function
function showResetButton() {
    const chatOptions = document.getElementById('chatOptions');
    chatOptions.innerHTML = `
        <button class="reset-btn" onclick="resetChat()">
            <i class="fi fi-rs-rotate-right"></i>
            Try Another Option
        </button>
    `;
    chatOptions.style.display = 'flex';
    
    // Unlock remaining sections on first conversation completion
    unlockRemainingSections();
}