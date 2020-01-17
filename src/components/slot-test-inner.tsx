import { Component, Host, h } from '@stencil/core';

/**
 * This component is used by slot-test-outer
 */
@Component({
  tag: 'slot-test-inner',
})
export class SlotTestInner {
  render() {
    // BUG: The array of elements in the <slot /> in this component
    // are out of order when this component is used in slot-test-outter
    return (
      <Host>
        <slot />
      </Host>
    );
  }
}
