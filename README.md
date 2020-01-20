# Stencil 1.8.5 slot order bug

<!--
NOTE:
Before submitting an issue, please consult our docs -> https://stenciljs.com/
-->

**Repo containing demo of this bug**
https://github.com/markallancourtney/stenciljs-1.8.5-slot-order-bug

**Stencil version:**
<!-- (run `npm list @stencil/core` from a terminal/cmd prompt and paste output below): -->
```
 @stencil/core@1.8.5
```

**I'm submitting a:**
<!-- (check one with "x") -->
[X] bug report<br />
[ ] feature request<br />
[ ] support request => Please do not submit support requests here, use one of these channels: https://stencil-worldwide.herokuapp.com/ or https://forum.ionicframework.com/
<br />

**Current behavior:**
<!-- Describe how the bug manifests. -->
Elements in slot are out of order when:
* A Stencil component has a "passthrough" slot.
* The "passthrough" slot contents is an array of elements.
* The component is used inside a React app.

Result:
* The first element in the array of elements ends up at the end of the slot.

**Expected behavior:**
<!-- Describe what the behavior would be without the bug. -->
The array of elements in the slot is in the correct order.

**Steps to reproduce:**
<!-- If you are able to illustrate the bug or feature request with an example, please provide steps to reproduce and if possible a demo
-->


```tsx
// slot-test-outer.tsx
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
```

<!-- ------------------------------------------------------------ -->

```tsx
// slot-test-inner.tsx
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
```

<!-- ------------------------------------------------------------ -->

```tsx
// slot-test-empty-host-outer.tsx
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
```

<!-- ------------------------------------------------------------ -->

```tsx
// slot-test-empty-host-inner.tsx
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
```

<!-- ------------------------------------------------------------ -->

```tsx
// slot-test-child.tsx
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
```

<!-- ------------------------------------------------------------ -->

```tsx
// React Storybook story to demonstrate that this happens in a React app.
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
```

```html
<!-- markup output from React storybook -->
<div>   
  <h1>slot-test</h1>
  <hr>
  <h2>BUG</h2>
  <p>
    Happens when <br>
    <code>slot-test-outer</code><br>
    uses<br>
    <code>slot-test-inner</code><br>
    inside React<br>
  </p>
  <div>
      <slot-test-outer class="hydrated">         
         <slot-test-inner class="hydrated">            
            <slot-test-child name="2" class="hydrated">
               <div>slot-test-child 2</div>
            </slot-test-child>
            <slot-test-child name="3" class="hydrated">
               <div>slot-test-child 3</div>
            </slot-test-child>
            <slot-test-child name="4" class="hydrated">
               <div>slot-test-child 4</div>
            </slot-test-child>
            <slot-test-child name="5" class="hydrated">
               <div>slot-test-child 5</div>
            </slot-test-child>
            <div><code>slot-test-inner</code></div>
            <div><code>slot-test-outer</code></div>
            <slot-test-child name="1" class="hydrated">
               <div>slot-test-child 1</div>
            </slot-test-child>
         </slot-test-inner>
      </slot-test-outer>
   </div>
   <br>
   <hr>
   <h2>Workaround</h2>
   <code>slot-test-empty-host</code>
   <div>
      <slot-test-empty-host-outer class="hydrated">
         <slot-test-empty-host-inner class="hydrated">
            <div><code>&lt;slot-test-empty-host-outer&gt;</code></div>
            <slot-test-child name="1" class="hydrated">
               <div>slot-test-child 1</div>
            </slot-test-child>
            <slot-test-child name="2" class="hydrated">
               <div>slot-test-child 2</div>
            </slot-test-child>
            <slot-test-child name="3" class="hydrated">
               <div>slot-test-child 3</div>
            </slot-test-child>
            <slot-test-child name="4" class="hydrated">
               <div>slot-test-child 4</div>
            </slot-test-child>
            <slot-test-child name="5" class="hydrated">
               <div>slot-test-child 5</div>
            </slot-test-child>
         </slot-test-empty-host-inner>
      </slot-test-empty-host-outer>
   </div>
</div>

```


```
Plain text output from React storybook

slot-test

BUG
Happens when
slot-test-outer
uses
slot-test-inner
inside React

slot-test-child 2
slot-test-child 3
slot-test-child 4
slot-test-child 5
slot-test-inner
slot-test-outer
slot-test-child 1

Workaround
slot-test-empty-host
slot-test-empty-host-outer
slot-test-child 1
slot-test-child 2
slot-test-child 3
slot-test-child 4
slot-test-child 5
```

<!-- ------------------------------------------------------------ -->

**Related code:**


**Other information:**
<!-- List any other information that is relevant to your issue. Stack traces, related issues, suggestions on how to fix, Stack Overflow links, forum links, etc. -->
