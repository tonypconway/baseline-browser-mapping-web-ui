import { html, css, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('app-container')
export class AppContainer extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: 25px;
      color: var(--app-container-text-color, #000);
    }
  `;

  declare baselineTarget: string;
  declare browsersObject: {
    c: [],
    d: []
  };
  declare showDownstream: boolean;

  constructor() {
    super();
    this.baselineTarget = 'wa/versions';
    this.showDownstream = false;
    this.fetchBrowsers(this.baselineTarget);
  }

  fetchBrowsers(location: string) {

    fetch(new Request(`./data/${location}.json`))
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json()
      })
      .then(versionsObject => {
        this.browsersObject = versionsObject;
        this.requestUpdate();
      });

  }

  updateTarget(e: any) {
    this.baselineTarget = e.detail;
    this.fetchBrowsers(this.baselineTarget);
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('target-changed', this.updateTarget);
  }

  disconnectedCallback() {
    window.removeEventListener('target-changed', this.updateTarget);
    super.disconnectedCallback();
  }

  renderBrowserLists() {
    console.log(this.browsersObject);
    if (this.browsersObject) {
      if (this.showDownstream) {
        return html`
          <h2>Minimum compatible core browser versions</h2>
          <browser-list .browser-array=${this.browsersObject.c}> </browser-list>
          <h2>Minimum compatible versions of other browsers</h2>
          <browser-list .browser-array=${this.browsersObject.d}> </browser-list>
          `
      } else {
        return html`
          <h2>Compatible browsers</h2>
          <browser-list .browserArray=${this.browsersObject.c}> </browser-list>
          `
      }
    }
    return html`Loading`
  }

  render() {
    return html`
      <h1>Container</h1>
      <p>parent: ${this.baselineTarget}</p>
      <pre>${JSON.stringify(this.browsersObject)}</pre>
      <target-picker @target-changed=${this.updateTarget}></target-picker>
      ${this.renderBrowserLists()}
    `;
  }
}
