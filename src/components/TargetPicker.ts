import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('target-picker')
export class TargetPicker extends LitElement {
  static styles = css`
  `;

  declare yearsArray: number[];
  declare includeDownstream: boolean;
  declare targetString: string;
  declare waTargetDateString: string;
  declare maxWaTargetDateString: string;
  declare hideWaDatePicker: boolean;
  constructor() {
    super();
    this.includeDownstream = true;
    this.targetString = 'wa/versions';
    this.waTargetDateString = new Date().toISOString().slice(0, 10);
    let tempMaxWaTargetString = new Date();
    tempMaxWaTargetString.setMonth(new Date().getMonth() + 30);
    this.maxWaTargetDateString = tempMaxWaTargetString.toISOString().slice(0, 10);
    this.hideWaDatePicker = true;
    this.yearsArray = [...Array(new Date().getFullYear()).keys()].slice(2016).reverse();
  }

  emitTarget(target: string) {
    this.dispatchEvent(new CustomEvent('target-changed', {
      bubbles: true,
      detail: target
    }));
  }

  changeTarget(e: any) {
    this.targetString = e.target.value
    let target = this.targetString;
    if (this.targetString === 'waOnDate/') {
      target += this.waTargetDateString;
    }
    this.emitTarget(target);
    this.requestUpdate();
  }

  changeWaOnDate(e: any) {
    this.emitTarget(`waOnDate/${e.target.value}`)
  }

  changeIncludeDownstream(e: any) {
    this.dispatchEvent(new CustomEvent('include-downstream-changed', {
      bubbles: true,
      detail: e.target.checked
    }))
  }

  renderDateInput() {

    return this.targetString === 'waOnDate/'
      ? html`<input 
          @change=${this.changeWaOnDate}
          type="date"
          .value=${this.waTargetDateString}
          min="2019-06-01"
          .max=${this.maxWaTargetDateString} />`
      : null
  }

  render() {
    return html`
      <select .value=${this.targetString} @change=${this.changeTarget}>
        <option value=${'wa/versions'}>Baseline Widely Available</option>
        <option value=${'waOnDate/'}>Baseline Widely Available on</option>
        ${this.yearsArray.map(year => html`<option value=${`years/${year}`}>Baseline ${year}</option>`)}
      </select>
      ${this.renderDateInput()}
      <label>
        <input type="checkbox" .checked=${this.includeDownstream} @change=${this.changeIncludeDownstream}>
        Include downstream browsers
      </label>
    `;
  }
}