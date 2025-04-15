import { html, css, LitElement, PropertyDeclarations } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('app-container')
export class AppContainer extends LitElement {
  static styles = css`
  `;

  declare browsersObject: {
    c: [],
    d: []
  };
  declare includeDownstream: boolean;

  static properties = {
    browserObject: { type: Object },
    includeDownstream: { type: Boolean }
  }

  constructor() {
    super();
    this.includeDownstream = true;
    this.fetchBrowsers('wa/versions');
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
    this.fetchBrowsers(e.detail);
  }

  updateIncludeDownstream(e: any) {
    this.includeDownstream = e.detail;
  }

  renderBrowserLists() {
    if (this.browsersObject) {
      if (this.includeDownstream) {
        return html`
          <h2>Minimum compatible core browser versions</h2>
          <browser-list .browserArray=${this.browsersObject.c}> </browser-list>
          <h2>Minimum compatible versions of other browsers</h2>
          <browser-list .browserArray=${this.browsersObject.d} .isDownstreamBrowsers=${true}> </browser-list>
          `
      } else {
        return html`
          <h2>Minimum compatible browsers</h2>
          <browser-list .browserArray=${this.browsersObject.c}> </browser-list>
          `
      }
    }
    return html`Loading`
  }

  render() {
    return html`
      <target-picker @target-changed=${this.updateTarget} @include-downstream-changed=${this.updateIncludeDownstream}></target-picker>
      ${this.renderBrowserLists()}
    `;
  }
}
