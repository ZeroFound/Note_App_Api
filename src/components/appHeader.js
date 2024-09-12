export class AppHeader extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                header {
                    text-align: center;
                    padding: 10px;
                    background-color: #6200ea;
                    color: #fff;
                    border-radius: 4px;
                }
                h1 {
                    margin: 0;
                    font-size: 24px;
                }
            </style>
            <header>
                <h1>Notes App</h1>
            </header>
        `;
    }
}


customElements.define('app-header', AppHeader);
