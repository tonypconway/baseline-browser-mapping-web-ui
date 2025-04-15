import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

type Browser = [
  name: string,
  version: string,
  releaseDate: string,
  engineVersion?: string,
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
  declare isDownstreamBrowsers: Boolean;

  static properties = {
    browserArray: { type: Array },
    browserDetails: { type: Object },
    isDownstreamBrowsers: { type: Boolean }
  }

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
      "o": ["Opera", ''],
      "oa": ["Opera for Android", ''],
      "sa": ["Samsung Internet for Android", ''],
      "wa": ["Android Webview", ''],
      "ya": ["Yandex for Android", ''],
      "qa": ["QQ Browser for Android", ''],
      "ua": ["UC Browser for Android", ''],
    }
  }

  render() {
    return html`
    <table>
      <tr>
        <th>Browser</th>
        <th>Version</th>
        <th>Released</th>
        ${this.isDownstreamBrowsers
        ? html`<th>Blink engine version</th>`
        : null
      }
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
        ${this.isDownstreamBrowsers
            ? html`<td>${browser[3]}</td>`
            : null
          }
        </tr>
        `
      })}
    </table>
    `
  }
}