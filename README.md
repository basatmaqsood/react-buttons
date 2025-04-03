# React Slot Text

**React Slot Text** is a React component that animates text in a slot machine style. It provides two animation types: character-based and word-based animations. You can use this to create eye-catching text effects with customizable timing, direction, easing, and looping behavior.

<!-- ## Installation

To install the package, run the following command:

```sh
npm install react-slot-text
```

or using yarn:

```sh
yarn add react-slot-text
```

You must have latest React version installed. If you see any error, make sure you upgrade your react to latest version. It might not work in old versions

## Usage

### Importing the Components

```tsx
import { SlotTextCharacters, SlotTextWords } from "react-slot-text";
```

---

## SlotTextCharacters Component

The `SlotTextCharacters` component animates each character of a string individually.

### Basic Usage

```tsx
import React from "react";
import { SlotTextCharacters } from "react-slot-text";

const App = () => {
  return (
    <div>
      <h2>Character Slot Animation</h2>
      <SlotTextCharacters text="Hello!" duration={1500} loop={true} />
    </div>
  );
};

export default App;
```

### Props

| Prop            | Type            | Default  | Description |
|---------------|---------------|---------|-------------|
| `text`         | `string`       | `""`      | The text to animate |
| `duration`     | `number`       | `1000`    | Duration of the animation in milliseconds |
| `loop`         | `boolean`      | `true`    | Whether the animation should repeat |
| `delay`        | `number`       | `100`     | Delay between animations in milliseconds |
| `direction`    | `"forward" \| "reverse"` | `"forward"` | Animation direction |
| `easing`       | `"bounce" \| "elastic" \| "smooth" \| "sharp" \| "linear"` | `"smooth"` | The easing function used for animation |
| `style`        | `CSSProperties` | `{}`      | Custom inline styles |
| `className`    | `string`       | `""`      | Additional class names for styling |
| `onComplete`   | `() => void`   | `undefined` | Callback function called when animation completes |
| `pauseOnHover` | `boolean`      | `false`   | Pauses animation when hovered |
| `pauseDuration`| `number`       | `1000`    | Duration of pause when hovered |

### Example Usage of Props

```tsx
<SlotTextCharacters
  text="React Slot"
  duration={2000}
  loop={false}
  delay={150}
  direction="reverse"
  easing="elastic"
  style={{ color: "blue", fontSize: "24px" }}
  className="custom-class"
  onComplete={() => console.log("Animation Completed")}
  pauseOnHover={true}
  pauseDuration={2000}
/>
```

---

## SlotTextWords Component

The `SlotTextWords` component animates entire words instead of characters.

### Basic Usage

```tsx
import React from "react";
import { SlotTextWords } from "react-slot-text";

const App = () => {
  return (
    <div>
      <h2>Word Slot Animation</h2>
      <SlotTextWords words={["React", "Slot", "Animation"]} duration={2000} loop={true} />
    </div>
  );
};

export default App;
```

### Props

| Prop            | Type            | Default  | Description |
|---------------|---------------|---------|-------------|
| `words`        | `string[]`     | `[]`      | Array of words to animate |
| `duration`     | `number`       | `1500`    | Duration of the animation in milliseconds |
| `loop`         | `boolean`      | `true`    | Whether the animation should repeat |
| `delay`        | `number`       | `100`     | Delay between animations in milliseconds |
| `direction`    | `"forward" \| "reverse"` | `"forward"` | Animation direction |
| `order`        | `"sequential" \| "random"` | `"sequential"` | The order in which words appear |
| `easing`       | `"bounce" \| "elastic" \| "smooth" \| "sharp" \| "linear"` | `"smooth"` | The easing function used for animation |
| `style`        | `CSSProperties` | `{}`      | Custom inline styles |
| `className`    | `string`       | `""`      | Additional class names for styling |
| `onComplete`   | `() => void`   | `undefined` | Callback function called when animation completes |
| `pauseOnHover` | `boolean`      | `false`   | Pauses animation when hovered |
| `pauseDuration`| `number`       | `1000`    | Duration of pause when hovered |

### Example Usage of Props

```tsx
<SlotTextWords
  words={["React", "Animations", "Vite"]}
  duration={2500}
  loop={true}
  delay={200}
  direction="forward"
  order="random"
  easing="bounce"
  style={{ fontWeight: "bold", fontSize: "28px" }}
  className="custom-word-class"
  onComplete={() => console.log("Word animation done!")}
  pauseOnHover={true}
  pauseDuration={1500}
/>
```

---

## Custom Styling
By deafult, the CSS for text will be inherited from parent class.
You can style the components using custom CSS by applying custom classes via the `className` prop or using inline styles via the `style` prop.

Example CSS:

```css
.custom-class {
  font-size: 24px;
  color: red;
}

.custom-word-class {
  text-transform: uppercase;
  letter-spacing: 2px;
}
```

---

## Conclusion

With **react-slot-text**, you can create visually appealing text animations effortlessly. Whether you're animating characters or words, this package offers great flexibility with timing, easing, looping, and custom styling.

🚀 Install now and start adding dynamic text effects to your React projects!

```sh
npm install react-slot-text
```
 -->
