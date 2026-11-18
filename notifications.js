document.addEventListener('DOMContentLoaded', () => {
    const notifBadge = document.getElementById('notif-badge');
    const toastNotification = document.getElementById('toast-notification');
    const studentAssignmentList = document.getElementById('student-assignment-list');

    // Fungsi untuk memutar suara notifikasi audio chime
    function playNotificationSound() {
        // Cek apakah audio diizinkan pengguna
        const audioUnlocked = localStorage.getItem('audioUnlocked');
        if (audioUnlocked === 'true') {
            const audio = new Audio('assets/audio/notification.mp3');
            audio.play().catch(error => {
                console.log("Audio diblokir oleh browser:", error);
            });
        }
    }

    // Fungsi untuk menampilkan Toast melayang
    function showToast() {
        if (toastNotification) {
            toastNotification.classList.remove('hidden');
            setTimeout(() => {
                toastNotification.classList.add('hidden');
            }, 4000); // Hilang otomatis setelah 4 detik
        }
    }

    // Memuat daftar tugas di halaman siswa
    function loadStudentAssignments() {
        if (!studentAssignmentList) return;
        const assignments = JSON.parse(localStorage.getItem('teacherAssignments')) || [];

        if (assignments.length === 0) {
            studentAssignmentList.innerHTML = '<p class="empty-msg">Belum ada tugas dari guru.</p>';
            return;
        }

        studentAssignmentList.innerHTML = '';
        assignments.forEach(assign => {
            const card = document.createElement('div');
            card.className = 'item-card';
            card.innerHTML = `
                <h4>${assign.title}</h4>
                <div class="item-meta">
                    <span>📘 Mapel: <strong>${assign.subject}</strong></span>
                    <span>⏳ Deadline: ${assign.deadline}</span>
                </div>
                <p>${assign.description}</p>
                <button class="btn btn-primary mt-3" onclick="openSimulation('${assign.subject.toLowerCase()}')">🧪 Mulai Simulasi Terkait</button>
            `;
            studentAssignmentList.appendChild(card);
        });
    }

    // Cek pembaruan tugas baru
    function checkAssignmentsNotification() {
        const assignments = JSON.parse(localStorage.getItem('teacherAssignments')) || [];
        const lastSeenCount = parseInt(localStorage.getItem('lastSeenAssignmentCount')) || 0;

        if (assignments.length > lastSeenCount) {
            const diff = assignments.length - lastSeenCount;
            
            // Tampilkan badge angka di ikon lonceng
            if (notifBadge) {
                notifBadge.textContent = assignments.length;
                notifBadge.classList.remove('hidden');
            }

            // Bunyikan suara & tampilkan toast
            playNotificationSound();
            showToast();

            // Perbarui jumlah yang telah dilihat saat siswa menekan ikon lonceng
            const notifBtn = document.getElementById('notif-btn');
            if (notifBtn) {
                notifBtn.onclick = () => {
                    localStorage.setItem('lastSeenAssignmentCount', assignments.length);
                    notifBadge.classList.add('hidden');
                    alert(`Anda memiliki ${diff} tugas baru dari guru.`);
                };
            }
        } else if (assignments.length > 0 && notifBadge) {
            notifBadge.classList.add('hidden');
        }

        loadStudentAssignments();
    }

    // Jalankan pengecekan saat halaman dimuat
    checkAssignmentsNotification();

    // Periksa berkala setiap 10 detik jika siswa membiarkan halaman terbuka
    setInterval(checkAssignmentsNotification, 10000);
});
