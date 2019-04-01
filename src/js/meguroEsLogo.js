class MeguroEsLogo extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({mode: 'open'}).innerHTML = `
      <style>
        :host {
          width: 190px;
          color: #77714b;
          font-size: 12px;
          font-weight: bolder;
          display: inline-block;
          text-align: center;
        }
        img {
          width: 100%;
        }
      </style>
      
      <a href="https://meguro.es/">
        <img src="https://meguro.es/_nuxt/img/26a69f4.png">
      </a>
      <span>目黒周辺のFront-end meetup.</span>
    `;
  }
}
customElements.define('meguro-es-logo', MeguroEsLogo);
