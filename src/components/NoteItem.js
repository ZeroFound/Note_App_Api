export class NoteItem extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        const template = document.createElement('template');
        template.innerHTML = `
            <style>
                .note {
                    background-color: var(--note-bg-color, #f9f9f9);
                    padding: 10px;
                    border-radius: 4px;
                    border: 1px solid #ccc;
                    position: relative;
                    display: flex;
                    flex-direction: column;
                    gap: 5px;
                }
                .note-title {
                    font-weight: bold;
                    color: #333;
                }
                .note-body {
                    white-space: pre-wrap;
                    color: #666;
                }
                .delete-btn {
                    background: #e57373;
                    color: #fff;
                    border: none;
                    padding: 5px 10px;
                    border-radius: 4px;
                    cursor: pointer;
                    font-size: 14px;
                    text-align: center;
                    align-self: flex-end;
                }
                .delete-btn:hover {
                    background: #c62828;
                }
            </style>
            <div class="note">
                <div class="note-title"></div>
                <div class="note-body"></div>
                <button class="delete-btn">Delete</button>
            </div>
        `;
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    static get observedAttributes() {
        return ['title', 'body', 'bg-color'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'title') {
            this.shadowRoot.querySelector('.note-title').textContent = newValue;
        }
        if (name === 'body') {
            this.shadowRoot.querySelector('.note-body').textContent = newValue;
        }
        if (name === 'bg-color') {
            this.shadowRoot.querySelector('.note').style.backgroundColor = newValue;
        }
    }

    connectedCallback() {
        this.shadowRoot.querySelector('.delete-btn').addEventListener('click', () => {
            this.dispatchEvent(new CustomEvent('delete', {
                detail: { id: this.getAttribute('note-id') },
                bubbles: true,
                composed: true
            }));
        });
    }
}

customElements.define('note-item', NoteItem);
