import React from 'react';
import { storiesOf } from '@storybook/react';

storiesOf(`slot-test`, module).add('Default', () => {
  const child1 = <slot-test-child name="1" />;
  const child2 = <slot-test-child name="2" />;
  const child3 = <slot-test-child name="3" />;
  const child4 = <slot-test-child name="4" />;
  const child5 = <slot-test-child name="5" />;

  return (
    <div>
      <h1>slot-test</h1>
      <p>
        This repo demonstrates the slot order bug in
        Stencil v1.8.5        
      </p>

      <hr />
      <h2>BUG</h2>
      <p>
        Happens when <br />
        <code>slot-test-outer</code>
        <br />
        uses
        <br />
        <code>slot-test-inner</code>
        <br />
        inside React
        <br />
      </p>

      <div>
        <slot-test-outer>
          {child1}
          {child2}
          {child3}
          {child4}
          {child5}
        </slot-test-outer>
      </div>
      <br />
      <hr />

      <h2>Workaround</h2>
      <code>slot-test-empty-host</code>
      <div>
        <slot-test-empty-host-outer>
          {child1}
          {child2}
          {child3}
          {child4}
          {child5}
        </slot-test-empty-host-outer>
      </div>
    </div>
  );
});
