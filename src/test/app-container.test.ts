import { html, fixture, expect } from '@open-wc/testing';

import { AppContainer } from '../components/AppContainer';
import '../app-container';

describe('MyElement', () => {
  it('has a default title "Hey there" and counter 5', async () => {
    const el: AppContainer = await fixture(html` <app-container></app-container> `);

  });

  it('increases the counter on button click', async () => {
    const el: AppContainer = await fixture(html` <app-container></app-container> `);
    el.shadowRoot!.querySelector('button')!.click();
  });

  it('can override the title via attribute', async () => {
    const el: AppContainer = await fixture(html` <app-container title="attribute title"></app-container> `);

    expect(el.title).to.equal('attribute title');
  });

  it('passes the a11y audit', async () => {
    const el: AppContainer = await fixture(html` <app-container></app-container> `);

    await expect(el).shadowDom.to.be.accessible();
  });
});
