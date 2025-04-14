import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

type Browser = [
  name: string,
  version: string,
  releaseDate: string,
]

type BrowserDetails = {
  [key: string]: [
    longName: string,
    logo: string
  ]
}

@customElement('browser-list')
export class BrowserList extends LitElement {
  static styles = css`
  `;

  declare browserArray: Browser[];
  declare browserDetails: BrowserDetails;

  constructor() {
    super();
    this.browserDetails = {
      "c": ["Chrome Desktop", ''],
      "ca": ["Chrome for Android", ''],
      "e": ["Edge", ''],
      "f": ["Firefox Desktop", ''],
      "fa": ["Firefox for Android", ''],
      "s": ["Safari", ''],
      "si": ["Safari for iOS", ''],
    }
  }

  render() {
    return html`
    <pre>${JSON.stringify(this.browserArray)}</pre>
    <table>
      <tr>
        <th>Browser</th>
        <th>Version</th>
        <th>Released</th>
      </tr>
        ${this.browserArray.map((browser: Browser) => {
      let nameKey: keyof typeof this.browserDetails = browser[0];
      let version: string = browser[1];
      let releaseDate: string = browser[2];
      let name = this.browserDetails[nameKey][0];
      return html`
      <tr>
      <td>${name}</td>
      <td>${version}</td>
      <td>${releaseDate}</td>
      </tr>`
    })}
    </table>
    `
  }

  update(changedProperties: Map<string, unknown>) {
    // if (changedProperties.has("browserArray")) {
    //   console.log(this.browserArray)
    // }
    console.log(changedProperties);
    super.update(changedProperties);
  }
}