const API_BASE_URL = 'https://notes-api.dicoding.dev/v2/notes';

/**
 * Mengambil daftar catatan dari API
 */
export async function fetchNotesFromAPI() {
    try {
        const response = await fetch(API_BASE_URL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const result = await response.json();
        return result.data; // Mengembalikan array data catatan
    } catch (error) {
        console.error('Gagal mengambil catatan dari API:', error);
        return [];
    }
}

/**
 * Menambahkan catatan baru ke API
 */
export async function addNoteToAPI(title, body) {
    try {
        const response = await fetch(API_BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, body }),
        });
        const result = await response.json();
        return result.data; // Mengembalikan data catatan yang baru ditambahkan
    } catch (error) {
        console.error('Gagal menambahkan catatan ke API:', error);
        return null;
    }
}

/**
 * Menghapus catatan dari API
 */
export async function deleteNoteFromAPI(noteId) {
    try {
        const response = await fetch(`${API_BASE_URL}/${noteId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.ok; // Jika berhasil, kembalikan true
    } catch (error) {
        console.error('Gagal menghapus catatan dari API:', error);
        return false;
    }
}
