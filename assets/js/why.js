document.addEventListener('DOMContentLoaded', function() {
    const whySection = document.querySelector('.why-section');
    const doorStage = document.getElementById('doorStage');
    const door = document.querySelector('.traditional-door');
    const threats = document.querySelectorAll('.threat-icon');
    const vaultDoor = document.getElementById('vaultDoor');
    
    let hasExploded = false;
    let vaultHasDropped = false;
    let animationTriggered = false;
    let animationComplete = false;
    let activeParticles = [];
    const finalPositions = new Map();
    let particleInterval = null;
    let blackParticleInterval = null;
    
    // Store door center coordinates at animation start
    let doorCenterX = 0;
    let doorCenterY = 0;

    function getGroundY() {
        const stageRect = doorStage.getBoundingClientRect();
        return stageRect.bottom;
    }

    function checkTriggerPoint() {
        if (animationTriggered || animationComplete) return;

        const sectionRect = whySection.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Check if section is in viewport (visible)
        const isInViewport = sectionRect.top < windowHeight && sectionRect.bottom > 0;

        if (isInViewport) {
            animationTriggered = true;
            // Start animation 2 seconds after section becomes visible
            setTimeout(() => {
                startAutomatedAnimation();
            }, 2000);
        }
    }

    function startAutomatedAnimation() {
        // Step 1: Show threat icons (0-0.6s) - faster
        threats.forEach((threat, index) => {
            setTimeout(() => {
                threat.classList.add('visible');
            }, index * 100);
        });

        // Step 2: Move threats outward (0.6-1s)
        setTimeout(() => {
            threats.forEach((threat) => {
                const threatRect = threat.getBoundingClientRect();
                const threatCenterX = threatRect.left + threatRect.width / 2;
                const threatCenterY = threatRect.top + threatRect.height / 2;

                const doorRect = door.getBoundingClientRect();
                const doorCenterX = doorRect.left + doorRect.width / 2;
                const doorCenterY = doorRect.top + doorRect.height / 2;

                const angleFromCenter = Math.atan2(
                    threatCenterY - doorCenterY,
                    threatCenterX - doorCenterX
                );

                const outwardDistance = 10;
                const moveX = Math.cos(angleFromCenter) * outwardDistance;
                const moveY = Math.sin(angleFromCenter) * outwardDistance;

                threat.style.transition = 'transform 0.4s ease-out';
                threat.style.transform = `translate(${moveX}px, ${moveY}px)`;
            });
        }, 600);

        // Step 3: Move threats inward toward door (1-1.8s) - faster
        setTimeout(() => {
            const doorRect = door.getBoundingClientRect();
            const doorCenterX = doorRect.left + doorRect.width / 2;
            const doorCenterY = doorRect.top + doorRect.height / 2;

            threats.forEach((threat) => {
                const threatRect = threat.getBoundingClientRect();
                const threatCenterX = threatRect.left + threatRect.width / 2;
                const threatCenterY = threatRect.top + threatRect.height / 2;

                const angleFromCenter = Math.atan2(
                    threatCenterY - doorCenterY,
                    threatCenterX - doorCenterX
                );

                const outwardDistance = 10;
                const startX = Math.cos(angleFromCenter) * outwardDistance;
                const startY = Math.sin(angleFromCenter) * outwardDistance;

                const deltaX = doorCenterX - threatCenterX;
                const deltaY = doorCenterY - threatCenterY;

                const moveX = startX + deltaX;
                const moveY = startY + deltaY;

                threat.style.transition = 'transform 0.8s ease-in-out';
                threat.style.transform = `translate(${moveX}px, ${moveY}px)`;
                threat.style.setProperty('--final-x', `${moveX}px`);
                threat.style.setProperty('--final-y', `${moveY}px`);

                finalPositions.set(threat, { x: moveX, y: moveY });
            });

            window.currentDoorCenter = { x: doorCenterX, y: doorCenterY };
        }, 1000);

        // Step 4: Vibrate (1.8-2.3s) - MUCH SHORTER (from 1.5s to 0.5s)
        setTimeout(() => {
            threats.forEach(threat => {
                threat.classList.add('vibrating');
            });
            door.classList.add('vibrating');
        }, 1800);

        // Step 5: Red particles (2.3s) - adjusted
        setTimeout(() => {
            startContinuousParticles();
        }, 2300);

        // Step 6: Black particles (2.8s) - adjusted
        setTimeout(() => {
            startBlackParticles();
        }, 2800);

        // Step 7: Converge to center (3.5s) - adjusted
        setTimeout(() => {
            stopContinuousParticles();
            stopBlackParticles();
            convergeToCenter();
        }, 3500);

        // Step 8: Explosion (4.3s) - adjusted
        setTimeout(() => {
            explodeWithAshFall();
        }, 4300);
    }

    function convergeToCenter() {
        // RECALCULATE door center at convergence time
        const doorRect = door.getBoundingClientRect();
        const centerX = doorRect.left + doorRect.width / 2;
        const centerY = doorRect.top + doorRect.height / 2;
        
        door.style.transition = 'all 0.35s cubic-bezier(0.4, 0, 0.6, 1)';
        door.style.transform = 'scale(0)';
        door.style.opacity = '0';
        
        // Move all active particles to the CURRENT center
        activeParticles.forEach(particle => {
            particle.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.6, 1)';
            particle.style.left = `${centerX}px`;
            particle.style.top = `${centerY}px`;
        });

        // Move all threats to the CURRENT center
        threats.forEach(threat => {
            const threatRect = threat.getBoundingClientRect();
            const deltaX = centerX - (threatRect.left + threatRect.width / 2);
            const deltaY = centerY - (threatRect.top + threatRect.height / 2);
            
            threat.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.6, 1)';
            threat.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
        });
        
        // Store for explosion
        window.currentDoorCenter = { x: centerX, y: centerY };
    }

    function explodeWithAshFall() {
        stopContinuousParticles();
        stopBlackParticles();

        // RECALCULATE center at explosion time
        const doorRect = door.getBoundingClientRect();
        const centerX = doorRect.left + doorRect.width / 2;
        const centerY = doorRect.top + doorRect.height / 2;
        const groundY = getGroundY();
        const particleCount = 100;
        const explosionParticles = [];

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            
            const isRed = Math.random() < 0.5;
            particle.className = isRed ? 'particle threat-particle' : 'particle door-particle';
            
            const size = 4 + Math.random() * 10;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${centerX}px`;
            particle.style.top = `${centerY}px`;
            particle.style.borderRadius = '50%';
            particle.style.pointerEvents = 'none';
            particle.style.zIndex = '10001';
            
            document.body.appendChild(particle);
            explosionParticles.push(particle);
            
            const angle = (Math.PI * 2 * i) / particleCount + (Math.random() - 0.5) * 0.4;
            const velocity = 200 + Math.random() * 300;
            const explodeX = centerX + Math.cos(angle) * velocity;
            const explodeY = centerY + Math.sin(angle) * velocity;
            
            particle.animate([
                { 
                    left: `${centerX}px`,
                    top: `${centerY}px`,
                    opacity: 1,
                    transform: 'scale(1)'
                },
                { 
                    left: `${explodeX}px`,
                    top: `${explodeY}px`,
                    opacity: 0.8,
                    transform: 'scale(1)',
                    offset: 0.3
                },
                { 
                    left: `${explodeX + (Math.random() - 0.5) * 50}px`,
                    top: `${groundY}px`,
                    opacity: 0,
                    transform: 'scale(0.5)'
                }
            ], {
                duration: 1500 + Math.random() * 500,
                easing: 'cubic-bezier(0.4, 0, 0.6, 1)'
            });
        }

        setTimeout(() => {
            door.style.display = 'none';
            threats.forEach(threat => {
                threat.style.display = 'none';
            });
            clearAllParticles();
            
            // Remove all explosion particles immediately
            explosionParticles.forEach(particle => {
                if (particle && particle.parentNode) {
                    particle.remove();
                }
            });
            
            // Clean up the stored center
            delete window.currentDoorCenter;
            
            // Drop vault door immediately after explosion
            dropVaultDoor();
        }, 1000);
    }
                
    function createVibratingParticles(count) {
        // Get current door position
        const doorRect = door.getBoundingClientRect();
        const doorLeft = doorRect.left;
        const doorRight = doorRect.right;
        const doorTop = doorRect.top;
        const doorHeight = doorRect.height;
        
        for (let i = 0; i < count; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle threat-particle vibrating-particle';
            const size = 6 + Math.random() * 10;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.opacity = 0.5 + Math.random() * 0.5;

            const isLeftEdge = Math.random() < 0.5;
            let particleX, particleY;

            if (isLeftEdge) {
                particleX = doorLeft - 5 + Math.random() * 15;
                particleY = doorTop + 50 + Math.random() * (doorHeight - 100);
            } else {
                particleX = doorRight - 10 + Math.random() * 15;
                particleY = doorTop + 50 + Math.random() * (doorHeight - 100);
            }

            particle.style.left = `${particleX}px`;
            particle.style.top = `${particleY}px`;

            document.body.appendChild(particle);
            activeParticles.push(particle);
        }
    }

    function startContinuousParticles() {
        particleInterval = setInterval(() => {
            createVibratingParticles(5); // Just pass count
        }, 150);
    }

    function stopContinuousParticles() {
        if (particleInterval) {
            clearInterval(particleInterval);
            particleInterval = null;
        }
    }

    function startBlackParticles() {
        blackParticleInterval = setInterval(() => {
            createBlackParticles();
        }, 120);
    }

    function stopBlackParticles() {
        if (blackParticleInterval) {
            clearInterval(blackParticleInterval);
            blackParticleInterval = null;
        }
    }

    function createBlackParticles() {
        // Get current door position
        const doorRect = door.getBoundingClientRect();
        const doorLeft = doorRect.left;
        const doorRight = doorRect.right;
        const doorTop = doorRect.top;
        const doorBottom = doorRect.bottom;
        const doorWidth = doorRect.width;
        const doorHeight = doorRect.height;
        
        const count = 4;
        
        for (let i = 0; i < count; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle door-particle vibrating-particle';
            
            const size = 5 + Math.random() * 10;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.opacity = 0.5 + Math.random() * 0.5;
            
            const side = Math.floor(Math.random() * 4);
            let particleX, particleY;
            
            if (side === 0) {
                particleX = doorLeft + Math.random() * doorWidth;
                particleY = doorTop - 5 + Math.random() * 15;
            } else if (side === 1) {
                particleX = doorRight - 10 + Math.random() * 15;
                particleY = doorTop + Math.random() * doorHeight;
            } else if (side === 2) {
                particleX = doorLeft + Math.random() * doorWidth;
                particleY = doorBottom - 10 + Math.random() * 15;
            } else {
                particleX = doorLeft - 5 + Math.random() * 15;
                particleY = doorTop + Math.random() * doorHeight;
            }
            
            particle.style.left = `${particleX}px`;
            particle.style.top = `${particleY}px`;
            
            document.body.appendChild(particle);
            activeParticles.push(particle);
        }
    }

    function clearAllParticles() {
        stopContinuousParticles();
        stopBlackParticles();
        activeParticles.forEach(particle => {
            if (particle && particle.parentNode) {
                particle.remove();
            }
        });
        activeParticles = [];
    }

    function dropVaultDoor() {
        if (vaultHasDropped) return;
        vaultHasDropped = true;
        
        vaultDoor.classList.add('vault-dropping');
        
        setTimeout(() => {
            createImpactShake();
            /*createDustParticles();*/
        }, 600);
        
        setTimeout(() => {
            vaultDoor.classList.remove('vault-dropping');
            vaultDoor.classList.add('vault-visible');
            
            // Unlock sections after vault lands
            const comparisonSection = document.getElementById('comparisonSection');
            const reasonsSection = document.getElementById('reasonsSection');
            const footer = document.querySelector('.footer');
            
            if (comparisonSection) comparisonSection.classList.add('unlocked');
            if (reasonsSection) reasonsSection.classList.add('unlocked');
            if (footer) footer.classList.add('unlocked');
    }, 1200);
    }

    function createImpactShake() {
        doorStage.classList.add('impact-shake');
        setTimeout(() => {
            doorStage.classList.remove('impact-shake');
        }, 400);
    }

    window.addEventListener('scroll', () => {
        checkTriggerPoint();
    });
    
    checkTriggerPoint();
});