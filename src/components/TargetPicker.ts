import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('target-picker')
export class TargetPicker extends LitElement {
  static styles = css`
  `;

  declare yearsArray: number[];
  constructor() {
    super();
    this.yearsArray = [...Array(new Date().getFullYear() + 1).keys()].slice(2016).reverse();
  }


  changeTarget(e: any) {
    this.dispatchEvent(new CustomEvent('target-changed', {
      bubbles: true,
      detail: e.target.value
    }));
  }

  render() {
    return html`
      <select @change=${this.changeTarget}>
        <option value=${'wa-versions'}>Baseline Widely Available</option>
        ${this.yearsArray.map(year => html`<option value=${`years/${year}`}>Baseline ${year}</option>`)}
      </select>
    `;
  }
}