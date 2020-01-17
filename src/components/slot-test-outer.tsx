import { Component, h } from '@stencil/core';

/**
 * The bug presents itself when a <slot />
 * from one component becomes the <slot />
 * in another component.
 */
@Component({
  tag: 'slot-test-outer',
})
export class SlotTestOuter {
  render() {
    return (
      <slot-test-inner>
        <div>
          <code>slot-test-outer</code>
        </div>
        <slot />
      </slot-test-inner>
    );
  }
}
