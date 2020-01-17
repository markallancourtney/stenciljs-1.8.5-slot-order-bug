import { Component, Host, h } from '@stencil/core';

/**
 * This component is used by slot-test-empty-host-outer
 */
@Component({
  tag: 'slot-test-empty-host-inner',
})
export class SlotTestEmptyHostInner {
  render() {
    // returning an empty Host does NOT produce the bug
    return <Host />;
  }
}
