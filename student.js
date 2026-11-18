document.addEventListener('DOMContentLoaded', () => {
    // =========================================
    // 1. LOGIKA PRESENSI KEHADIRAN SISWA
    // =========================================
    const btnAttend = document.getElementById('btn-attend');
    const studentNameInput = document.getElementById('student-name');
    const studentClassInput = document.getElementById('student-class');
    const attendanceStatus = document.getElementById('attendance-status');

    // Cek apakah siswa sudah pernah mengisi presensi
    const lastStudentName = localStorage.getItem('lastStudentName');
    const lastStudentClass = localStorage.getItem('lastStudentClass');
    const todayDate = new Date().toLocaleDateString('id-ID');
    const savedAttendance = JSON.parse(localStorage.getItem('studentAttendance')) || [];

    // Periksa apakah nama ini sudah absen hari ini
    if (lastStudentName && studentNameInput) {
        studentNameInput.value = lastStudentName;
        studentClassInput.value = lastStudentClass || '';
        
        const alreadyAttended = savedAttendance.find(item => item.date === todayDate && item.name === lastStudentName);
        if (alreadyAttended) {
            btnAttend.disabled = true;
            btnAttend.textContent = '✅ Sudah Presensi Hari Ini';
            attendanceStatus.textContent = `Kehadiran tercatat pada ${todayDate} pukul ${alreadyAttended.time}`;
            attendanceStatus.classList.remove('hidden');
        }
    }

    if (btnAttend) {
        btnAttend.addEventListener('click', () => {
            const name = studentNameInput.value.trim();
            const className = studentClassInput.value.trim();

            if (!name || !className) {
                alert('Harap isi Nama Lengkap dan Kelas terlebih dahulu!');
                return;
            }

            const timeNow = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
            const attendanceData = {
                name: name,
                className: className,
                date: todayDate,
                time: timeNow
            };

            // Simpan ke memori lokal
            savedAttendance.push(attendanceData);
            localStorage.setItem('studentAttendance', JSON.stringify(savedAttendance));
            localStorage.setItem('lastStudentName', name);
            localStorage.setItem('lastStudentClass', className);

            // Perbarui tombol & status
            btnAttend.disabled = true;
            btnAttend.textContent = '✅ Sudah Presensi Hari Ini';
            attendanceStatus.textContent = `Berhasil hadir pada ${todayDate} pukul ${timeNow}`;
            attendanceStatus.classList.remove('hidden');
        });
    }

    // =========================================
    // 2. LOGIKA CATATAN PRAKTIKUM (LAB JOURNAL)
    // =========================================
    const journalForm = document.getElementById('journal-form');
    const journalTitleInput = document.getElementById('journal-title');
    const journalNotesInput = document.getElementById('journal-notes');
    const journalList = document.getElementById('journal-list');

    function loadJournals() {
        if (!journalList) return;
        const journals = JSON.parse(localStorage.getItem('labJournals')) || [];
        
        if (journals.length === 0) {
            journalList.innerHTML = '<p class="empty-msg">Belum ada catatan praktikum.</p>';
            return;
        }

        journalList.innerHTML = '';
        journals.forEach((journal, index) => {
            const card = document.createElement('div');
            card.className = 'item-card';
            card.innerHTML = `
                <h4>${journal.title}</h4>
                <div class="item-meta"><span>📅 ${journal.date}</span></div>
                <p>${journal.notes}</p>
                <button class="btn-delete" onclick="deleteJournal(${index})">Hapus Catatan</button>
            `;
            journalList.appendChild(card);
        });
    }

    if (journalForm) {
        journalForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const title = journalTitleInput.value.trim();
            const notes = journalNotesInput.value.trim();

            if (!title || !notes) return;

            const journals = JSON.parse(localStorage.getItem('labJournals')) || [];
            const newJournal = {
                title: title,
                notes: notes,
                date: new Date().toLocaleDateString('id-ID')
            };

            journals.unshift(newJournal); // Tambahkan ke urutan paling atas
            localStorage.setItem('labJournals', JSON.stringify(journals));

            journalTitleInput.value = '';
            journalNotesInput.value = '';
            loadJournals();
        });
    }

    // Fungsi global untuk menghapus catatan
    window.deleteJournal = function(index) {
        const journals = JSON.parse(localStorage.getItem('labJournals')) || [];
        journals.splice(index, 1);
        localStorage.setItem('labJournals', JSON.stringify(journals));
        loadJournals();
    };

    // Muat catatan saat halaman dibuka
    loadJournals();
});
