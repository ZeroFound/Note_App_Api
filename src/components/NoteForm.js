import { addNoteToAPI } from '../utils/noteApi.js';

export class NoteForm extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                form {
                    display: flex;
                    flex-direction: column;
                    margin-bottom: 20px;
                }
                input, textarea, button {
                    margin-bottom: 10px;
                    padding: 10px;
                    font-size: 16px;
                }
                textarea {
                    resize: vertical;
                }
                button {
                    background-color: #6200ea;
                    color: #fff;
                    border: none;
                    cursor: pointer;
                }
                button:hover {
                    background-color: #3700b3;
                }
                .loading {
                    display: none;
                    font-size: 1.5em;
                    text-align: center;
                    margin-top: 20px;
                }
            </style>
            <form id="noteForm">
                <input type="text" id="noteTitle" placeholder="Note Title" required>
                <textarea id="noteBody" placeholder="Note Body" rows="5" required></textarea>
                <button type="submit">Add Note</button>
                <div class="loading" id="loading">Adding Note...</div>
            </form>
        `;
    }

    connectedCallback() {
        // Unregister previous event listeners to avoid duplication
        this.shadowRoot.querySelector('#noteForm').removeEventListener('submit', this.addNote);
        this.shadowRoot.querySelector('#noteForm').addEventListener('submit', this.addNote.bind(this));
    }

    async addNote(event) {
        event.preventDefault();
        const title = this.shadowRoot.querySelector('#noteTitle').value;
        const body = this.shadowRoot.querySelector('#noteBody').value;

        if (title.trim() === '' || body.trim() === '') {
            alert('Please enter both title and body for the note.');
            return;
        }

        this.showLoading(true); // Tampilkan loading

        try {
            // Gunakan addNoteToAPI untuk menambahkan catatan ke server
            const newNote = await addNoteToAPI(title, body);
            if (newNote) {
                // Refresh halaman setelah menambahkan catatan
                location.reload();
            }
        } catch (error) {
            console.error('Error adding note:', error);
        } finally {
            this.showLoading(false); // Sembunyikan loading setelah selesai
        }
    }

    showLoading(isLoading) {
        const loading = this.shadowRoot.querySelector('#loading');
        if (loading) {
            loading.style.display = isLoading ? 'block' : 'none';
        }
    }
}

customElements.define('note-form', NoteForm);
