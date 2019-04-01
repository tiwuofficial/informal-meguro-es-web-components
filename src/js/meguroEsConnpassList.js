class MeguroEsConnpassList extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({mode: 'open'});

    window.callback = (res) => {
      res.events.forEach(data => {
        const meguroEsConnpassListItem = new MeguroEsConnpassListItem();
        meguroEsConnpassListItem.setAttribute('date', new Date(data.started_at).toLocaleDateString());
        meguroEsConnpassListItem.setAttribute('href', data.event_url);
        meguroEsConnpassListItem.setAttribute('title', data.title);
        meguroEsConnpassListItem.setAttribute('owner', data.owner_nickname);
        meguroEsConnpassListItem.setAttribute('place', data.address);
        meguroEsConnpassListItem.setAttribute('accepted', data.accepted);
        meguroEsConnpassListItem.setAttribute('limit', data.limit);
        shadow.appendChild(meguroEsConnpassListItem);
      });
    };

    const script = document.createElement("script");
    script.src = 'https://connpass.com/api/v1/event/?series_id=1552&count=100&callback=callback';
    document.querySelector('body').appendChild(script);

    shadow.innerHTML = `
      <style>
        :host {
          display: block;
          width: 800px;
          border-radius: 3px;
          background-color: #fff;
          box-shadow: 0 0 0 1px rgba(0,0,0,0.12);
        }
        meguro-es-connpass-list-item + meguro-es-connpass-list-item {
          border-top: 1px solid #ccc;
        }
        h3 {
        padding: 10px;
        background-color: #ececec;
        -webkit-border-top-right-radius: 3px;
        -moz-border-top-right-radius: 3px;
        border-top-right-radius: 3px;
        -webkit-border-top-left-radius: 3px;
        -moz-border-top-left-radius: 3px;
        border-top-left-radius: 3px;
        font-weight: normal;
        line-height: 1;
        font-size: 17px;
        margin: 0;
        }
      </style>
      <h3>イベント一覧</h3>
    `;
  }
}
customElements.define('meguro-es-connpass-list', MeguroEsConnpassList);

class MeguroEsConnpassListItem extends HTMLElement {

  connectedCallback() {
    this.attachShadow({mode: 'open'}).innerHTML = `
      <style>
        p {
          margin: 0;
        }
        p + p {
          margin-top: 10px;
        }
        :host {
          display: block;
          color: #444;
          font-size: 12px;
          padding: 10px;
        }
        .wrapper {
          position: relative;
        }
        .event-url {
          font-size: 17px;
          font-weight: bold;
          color: #000;
          border-bottom: 1px solid #000;
        }
        .participants {
          width: 150px;
          position: absolute;
          margin-top: 0;
          top: 0;
          right: 0;
          text-align: center;
          font-size: 10px;
          background-color: #efefef;
          -webkit-border-radius: 3px;
          -moz-border-radius: 3px;
          -o-border-radius: 3px;
          -ms-border-radius: 3px;
          border-radius: 3px;
        }
        .owner {
          font-weight:bold;
          text-decoration: none;
          padding: 3px 4px;
          background-color: #eee;
          color: #000;
        }
        .participants {
          font-size: 16px;
        }
        .fs10 {
          font-size: 10px;
        }
      </style>
      <div class="wrapper">
        <p class="date">${this.getAttribute('date')}</p>
        <p><a href=${this.getAttribute('href')} class="event-url">${this.getAttribute('title')}</a></p>
        <p ><a href="https://connpass.com/user/${this.getAttribute('owner')}" class="owner">${this.getAttribute('owner')}</a></p>
        <p class="place">${this.getAttribute('place')}</p>
        <p class="participants">${this.getAttribute('accepted')}/${this.getAttribute('limit')}<span class="fs10">人</span></p>
      </div>
    `;
  }

  constructor() {
    super();
  }
}
customElements.define('meguro-es-connpass-list-item', MeguroEsConnpassListItem);
