document.addEventListener('DOMContentLoaded', () => {
    // =========================================
    // 1. LOGIKA MANAJEMEN TUGAS GURU
    // =========================================
    const assignmentForm = document.getElementById('assignment-form');
    const titleInput = document.getElementById('assign-title');
    const subjectInput = document.getElementById('assign-subject');
    const descInput = document.getElementById('assign-desc');
    const deadlineInput = document.getElementById('assign-deadline');
    const teacherAssignmentList = document.getElementById('teacher-assignment-list');

    function loadTeacherAssignments() {
        if (!teacherAssignmentList) return;
        const assignments = JSON.parse(localStorage.getItem('teacherAssignments')) || [];

        if (assignments.length === 0) {
            teacherAssignmentList.innerHTML = '<p class="empty-msg">Belum ada tugas yang dibuat.</p>';
            return;
        }

        teacherAssignmentList.innerHTML = '';
        assignments.forEach((assign, index) => {
            const card = document.createElement('div');
            card.className = 'item-card';
            card.innerHTML = `
                <h4>${assign.title}</h4>
                <div class="item-meta">
                    <span>📘 Mapel: <strong>${assign.subject}</strong></span>
                    <span>⏳ Deadline: ${assign.deadline}</span>
                </div>
                <p>${assign.description}</p>
                <button class="btn-delete" onclick="deleteAssignment(${index})">Hapus Tugas</button>
            `;
            teacherAssignmentList.appendChild(card);
        });
    }

    if (assignmentForm) {
        assignmentForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const newAssignment = {
                id: Date.now(), // ID unik berbasis timestamp
                title: titleInput.value.trim(),
                subject: subjectInput.value,
                description: descInput.value.trim(),
                deadline: deadlineInput.value,
                createdAt: new Date().toLocaleDateString('id-ID')
            };

            const assignments = JSON.parse(localStorage.getItem('teacherAssignments')) || [];
            assignments.unshift(newAssignment); // Tambahkan ke urutan paling atas
            localStorage.setItem('teacherAssignments', JSON.stringify(assignments));

            // Reset form & muat ulang daftar
            assignmentForm.reset();
            loadTeacherAssignments();
            alert('Tugas berhasil dikirim ke siswa!');
        });
    }

    // Fungsi global untuk menghapus tugas
    window.deleteAssignment = function(index) {
        const assignments = JSON.parse(localStorage.getItem('teacherAssignments')) || [];
        assignments.splice(index, 1);
        localStorage.setItem('teacherAssignments', JSON.stringify(assignments));
        loadTeacherAssignments();
    };

    // =========================================
    // 2. LOGIKA REKAP PRESENSI KEHADIRAN SISWA
    // =========================================
    const attendanceTableBody = document.getElementById('attendance-table-body');
    const btnClearAttendance = document.getElementById('btn-clear-attendance');

    function loadAttendanceRecap() {
        if (!attendanceTableBody) return;
        const attendanceList = JSON.parse(localStorage.getItem('studentAttendance')) || [];

        if (attendanceList.length === 0) {
            attendanceTableBody.innerHTML = `
                <tr>
                    <td colspan="3" class="empty-msg">Belum ada data presensi hari ini.</td>
                </tr>
            `;
            return;
        }

        attendanceTableBody.innerHTML = '';
        attendanceList.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><strong>${item.name}</strong></td>
                <td>${item.className}</td>
                <td>${item.date} (${item.time})</td>
            `;
            attendanceTableBody.appendChild(row);
        });
    }

    if (btnClearAttendance) {
        btnClearAttendance.addEventListener('click', () => {
            if (confirm('Apakah Anda yakin ingin menghapus seluruh rekap presensi?')) {
                localStorage.removeItem('studentAttendance');
                loadAttendanceRecap();
            }
        });
    }

    // Muat data saat halaman dibuka
    loadTeacherAssignments();
    loadAttendanceRecap();
});
