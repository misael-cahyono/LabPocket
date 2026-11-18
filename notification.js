// Fungsi pemutar suara menggunakan Web Audio API (Tanpa file mp3 eksternal)
function playNotificationSound() {
    const audioUnlocked = localStorage.getItem('audioUnlocked');
    if (audioUnlocked === 'true') {
        try {
            // Membuat konteks audio browser
            const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioCtx.createOscillator();
            const gainNode = audioCtx.createGain();

            oscillator.type = 'sine'; // Jenis gelombang suara lembut
            oscillator.frequency.setValueAtTime(587.33, audioCtx.currentTime); // Nada D5
            oscillator.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.15); // Naik ke A5

            gainNode.gain.setValueAtTime(0.3, audioCtx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.5);

            oscillator.connect(gainNode);
            gainNode.connect(audioCtx.destination);

            oscillator.start();
            oscillator.stop(audioCtx.currentTime + 0.5); // Durasi 0.5 detik
        } catch (error) {
            console.log("Gagal memutar audio Web Audio API:", error);
        }
    }
}
