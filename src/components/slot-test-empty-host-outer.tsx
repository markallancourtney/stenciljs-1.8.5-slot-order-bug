import { Component, h } from '@stencil/core';

@Component({
  tag: 'slot-test-empty-host-outer',
})
export class SlotTestEmptyHostOuter {
  render() {
    return (
      <slot-test-empty-host-inner>
        <div>
          <code>slot-test-empty-host-outer</code>
        </div>
        <slot />
      </slot-test-empty-host-inner>
    );
  }
}
