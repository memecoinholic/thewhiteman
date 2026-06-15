/**
 * Audio Control for Shikoku Inu Website
 * Handles background music with entry splash screen and UI toggle logic.
 */

document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('bg-music');
    const musicBtn = document.getElementById('music-toggle');
    const entryOverlay = document.getElementById('entry-overlay');
    const enterBtn = document.getElementById('enter-btn');

    let isPlaying = false;

    // Function to play music
    const playMusic = () => {
        audio.play().then(() => {
            isPlaying = true;
            musicBtn.classList.add('playing');
            localStorage.setItem('musicEnabled', 'true');
        }).catch(err => {
            console.log('Autoplay blocked or failed:', err);
        });
    };

    // Function to pause music
    const pauseMusic = () => {
        audio.pause();
        isPlaying = false;
        musicBtn.classList.remove('playing');
        localStorage.setItem('musicEnabled', 'false');
    };

    // Entry logic
    if (enterBtn && entryOverlay) {
        enterBtn.addEventListener('click', () => {
            entryOverlay.classList.add('hidden');
            playMusic();
        });
    }

    // Toggle logic
    if (musicBtn) {
        musicBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (isPlaying) {
                pauseMusic();
            } else {
                playMusic();
            }
        });
    }

    // Initial check (if music was enabled but overlay was skipped somehow)
    if (localStorage.getItem('musicEnabled') === 'true') {
        // We still need a click for some browsers, but let's try
        playMusic();
    }
});
