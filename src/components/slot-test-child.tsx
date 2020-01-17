import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'slot-test-child',
})
export class SlotTestChild {
  @Prop() name: string;

  render() {
    const { name } = this;
    return <div>slot-test-child {name}</div>;
  }
}
