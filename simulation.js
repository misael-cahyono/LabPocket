// Variabel global Three.js
let scene, camera, renderer, activeMesh;
let animationFrameId = null;

// Fungsi untuk membuka simulasi berdasarkan mata pelajaran
function openSimulation(subject) {
    const workspace = document.getElementById('simulation-workspace');
    const simTitle = document.getElementById('sim-title');
    const paramSlider = document.getElementById('param-slider');
    const quizQuestion = document.getElementById('quiz-question');
    const quizOptions = document.getElementById('quiz-options');
    const quizFeedback = document.getElementById('quiz-feedback');

    workspace.classList.remove('hidden');
    workspace.scrollIntoView({ behavior: 'smooth' });

    // Hentikan animasi sebelumnya jika ada
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
    }

    // Inisialisasi Scene 3D
    const container = document.getElementById('canvas-container');
    container.innerHTML = ''; // Bersihkan canvas lama

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // Pencahayaan
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    camera.position.z = 5;

    // Konfigurasi berdasarkan mapel
    if (subject === 'physics') {
        simTitle.textContent = '⚛️ Simulasi Fisika: Bandul Sederhana (Pendulum)';
        paramSlider.min = 1; paramSlider.max = 10; paramSlider.value = 5;
        
        // Buat objek 3D Bandul (Bola)
        const geometry = new THREE.SphereGeometry(0.6, 32, 32);
        const material = new THREE.MeshStandardMaterial({ color: 0x4f46e5, roughness: 0.3 });
        activeMesh = new THREE.Mesh(geometry, material);
        scene.add(activeMesh);

        // Kuis Mini Fisika
        quizQuestion.textContent = 'Apa yang mempengaruhi periode ayunan pada bandul sederhana?';
        quizOptions.innerHTML = `
            <button class="quiz-option-btn" onclick="checkQuiz(false)">A. Massa beban bandul</button>
            <button class="quiz-option-btn" onclick="checkQuiz(true)">B. Panjang tali dan percepatan gravitasi</button>
            <button class="quiz-option-btn" onclick="checkQuiz(false)">C. Warna tali bandul</button>
        `;

        // Animasi Gerak Osilasi
        let clock = new THREE.Clock();
        function animatePhysics() {
            animationFrameId = requestAnimationFrame(animatePhysics);
            let elapsedTime = clock.getElapsedTime();
            let lengthFactor = paramSlider.value * 0.2;
            activeMesh.position.x = Math.sin(elapsedTime * 3) * lengthFactor;
            activeMesh.position.y = -Math.cos(elapsedTime * 3) * 0.5;
            renderer.render(scene, camera);
        }
        animatePhysics();

    } else if (subject === 'chemistry') {
        simTitle.textContent = '🧬 Simulasi Kimia: Struktur Molekul 3D';
        paramSlider.min = 1; paramSlider.max = 5; paramSlider.value = 2;

        // Buat objek 3D Molekul (Gabungan Bola Atom)
        const group = new THREE.Group();
        const atomGeo = new THREE.SphereGeometry(0.5, 32, 32);
        
        const centralAtom = new THREE.Mesh(atomGeo, new THREE.MeshStandardMaterial({ color: 0xef4444 })); // Oksigen
        group.add(centralAtom);

        const leftAtom = new THREE.Mesh(atomGeo, new THREE.MeshStandardMaterial({ color: 0x38bdf8 })); // Hidrogen 1
        leftAtom.position.set(-1.5, 1, 0);
        group.add(leftAtom);

        const rightAtom = new THREE.Mesh(atomGeo, new THREE.MeshStandardMaterial({ color: 0x38bdf8 })); // Hidrogen 2
        rightAtom.position.set(1.5, 1, 0);
        group.add(rightAtom);

        activeMesh = group;
        scene.add(activeMesh);

        // Kuis Mini Kimia
        quizQuestion.textContent = 'Ikatan kimia yang terjadi akibat pemakaian bersama pasangan elektron disebut...';
        quizOptions.innerHTML = `
            <button class="quiz-option-btn" onclick="checkQuiz(true)">A. Ikatan Kovalen</button>
            <button class="quiz-option-btn" onclick="checkQuiz(false)">B. Ikatan Ionik</button>
            <button class="quiz-option-btn" onclick="checkQuiz(false)">C. Ikatan Logam</button>
        `;

        // Animasi Rotasi Molekul
        function animateChemistry() {
            animationFrameId = requestAnimationFrame(animateChemistry);
            let speed = paramSlider.value * 0.01;
            activeMesh.rotation.y += speed;
            activeMesh.rotation.x += speed * 0.5;
            renderer.render(scene, camera);
        }
        animateChemistry();

    } else if (subject === 'biology') {
        simTitle.textContent = '🦠 Simulasi Biologi: Sel Organel 3D';
        paramSlider.min = 1; paramSlider.max = 5; paramSlider.value = 3;

        // Buat objek 3D Sel (Kapsul/Sferoid)
        const geometry = new THREE.SphereGeometry(1.2, 32, 32);
        const material = new THREE.MeshStandardMaterial({ color: 0x10b981, wireframe: false, roughness: 0.4 });
        activeMesh = new THREE.Mesh(geometry, material);
        scene.add(activeMesh);

        // Kuis Mini Biologi
        quizQuestion.textContent = 'Organel sel yang berfungsi sebagai pusat penghasil energi (ATP) adalah...';
        quizOptions.innerHTML = `
            <button class="quiz-option-btn" onclick="checkQuiz(false)">A. Ribosom</button>
            <button class="quiz-option-btn" onclick="checkQuiz(true)">B. Mitokondria</button>
            <button class="quiz-option-btn" onclick="checkQuiz(false)">C. Badan Golgi</button>
        `;

        // Animasi Denyut/Rotasi Sel
        let clock = new THREE.Clock();
        function animateBiology() {
            animationFrameId = requestAnimationFrame(animateBiology);
            let elapsedTime = clock.getElapsedTime();
            let scaleFactor = 1 + Math.sin(elapsedTime * 2) * (paramSlider.value * 0.05);
            activeMesh.scale.set(scaleFactor, scaleFactor, scaleFactor);
            activeMesh.rotation.y += 0.01;
            renderer.render(scene, camera);
        }
        animateBiology();
    }

    quizFeedback.textContent = '';
}

// Fungsi Menutup Simulasi
function closeSimulation() {
    const workspace = document.getElementById('simulation-workspace');
    workspace.classList.add('hidden');
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
    }
}

// Fungsi Memeriksa Kuis Mini
function checkQuiz(isCorrect) {
    const quizFeedback = document.getElementById('quiz-feedback');
    if (isCorrect) {
        quizFeedback.textContent = '🎉 Benar! Pemahaman konsep Anda sangat baik.';
        quizFeedback.style.color = '#10b981';
    } else {
        quizFeedback.textContent = '❌ Kurang tepat. Coba pelajari kembali materinya.';
        quizFeedback.style.color = '#ef4444';
    }
}
