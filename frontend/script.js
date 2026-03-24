const API_URL = "http://localhost:5000/api/v1/notes";

// 1. Fitur READ: Ngambil data dari backend buat ditampilin
async function getNotes() {
    try {
        const response = await fetch(API_URL);
        const result = await response.json();
        const notes = result.data;
        
        const container = document.getElementById("daftar-catatan");
        container.innerHTML = ""; // Kosongin daftar sebelum diisi ulang

        if (notes.length === 0) {
            container.innerHTML = "<p>Belum ada catatan</p>";
            return;
        }

        notes.forEach(note => {
            container.innerHTML += `
                <div class="note-card">
                    <h4 style="margin-top:0;">${note.judul}</h4>
                    <p>${note.isi}</p>
                    <small style="color: gray;">Dibuat: ${new Date(note.tanggal_dibuat).toLocaleString()}</small>
                    <br><br>
                    <button class="btn-edit" onclick="siapEdit(${note.id}, '${note.judul}', '${note.isi}')">Edit</button>
                    <button class="btn-hapus" onclick="hapusCatatan(${note.id})">Hapus</button>
                </div>
            `;
        });
    } catch (error) {
        console.error("Gagal mengambil data:", error);
    }
}

// 2. Fitur CREATE & UPDATE: Nyimpen catatan baru atau editan
async function simpanCatatan() {
    const id = document.getElementById("note-id").value;
    const judul = document.getElementById("judul").value;
    const isi = document.getElementById("isi").value;

    if (!judul || !isi) {
        alert("Judul dan isi tidak boleh kosong!");
        return;
    }

    const data = { judul: judul, isi: isi };

    try {
        if (id) {
            // Kalau form punya ID, berarti lagi Update (PUT)
            await fetch(`${API_URL}/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });
            document.getElementById("note-id").value = ""; // Reset ID form
        } else {
            // Kalau form gak punya ID, berarti Tambah Baru (POST)
            await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });
        }

        // Bersihin form setelah klik simpan
        document.getElementById("judul").value = "";
        document.getElementById("isi").value = "";
        
        // Panggil data terbaru biar halamannya ke-refresh
        getNotes();
    } catch (error) {
        console.error("Gagal menyimpan data:", error);
    }
}

// 3. Fitur EDIT (Persiapan): Nampilin data lama ke dalam form
function siapEdit(id, judul, isi) {
    document.getElementById("note-id").value = id;
    document.getElementById("judul").value = judul;
    document.getElementById("isi").value = isi;
}

// 4. Fitur DELETE: Hapus catatan
async function hapusCatatan(id) {
    if (confirm("Yakin mau dihapus?")) {
        try {
            await fetch(`${API_URL}/${id}`, {
                method: "DELETE"
            });
            getNotes();
        } catch (error) {
            console.error("Gagal menghapus data:", error);
        }
    }
}

// Panggil fungsi getNotes() pas halaman pertama kali dibuka
getNotes();