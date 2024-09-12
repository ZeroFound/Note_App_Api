import { fetchNotesFromAPI, deleteNoteFromAPI } from '../utils/noteApi.js';

export class NoteList extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        const template = document.createElement('template');
        template.innerHTML = `
            <style>
                .grid-container {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
                    grid-gap: 20px;
                }
                .loading {
                    display: none;
                    font-size: 1.5em;
                    text-align: center;
                    margin: 20px;
                }
            </style>
            <div class="loading" id="loading">Loading...</div>
            <div class="grid-container" id="notesContainer"></div>
        `;
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    async connectedCallback() {
        this.showLoading(true);
        try {
            const notes = await fetchNotesFromAPI();
            this.displayNotes(notes);
        } catch (error) {
            console.error('Error fetching notes:', error);
        } finally {
            this.showLoading(false);
        }
    }

    displayNotes(notes) {
        const notesContainer = this.shadowRoot.querySelector('#notesContainer');

        if (!notesContainer) {
            console.error('Notes container tidak ditemukan');
            return;
        }

        notesContainer.innerHTML = ''; // Hapus catatan yang ada sebelumnya
        notes.forEach(note => {
            const noteItem = document.createElement('note-item');
            noteItem.setAttribute('title', note.title);
            noteItem.setAttribute('body', note.body);
            noteItem.setAttribute('bg-color', '#e3f2fd');
            noteItem.setAttribute('note-id', note.id); // Set ID catatan

            noteItem.addEventListener('delete', async (event) => {
                if (confirm("Apakah Anda yakin ingin menghapus catatan ini?")) {
                    // Tampilkan loading
                    this.showLoading(true);

                    try {
                        const isDeleted = await deleteNoteFromAPI(event.detail.id);
                        if (isDeleted) {
                            notesContainer.removeChild(noteItem);
                            alert("Catatan telah dihapus.");
                        }
                    } catch (error) {
                        console.error('Error deleting note:', error);
                        alert("Catatan tidak dapat dihapus.");
                    } finally {
                        // Sembunyikan loading setelah proses selesai
                        this.showLoading(false);
                    }
                }
            });

            notesContainer.appendChild(noteItem);
        });
    }

    showLoading(isLoading) {
        const loading = this.shadowRoot.querySelector('#loading');
        if (loading) {
            loading.style.display = isLoading ? 'block' : 'none';
        }
    }
}

customElements.define('note-list', NoteList);
