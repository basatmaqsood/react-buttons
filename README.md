
## @basatmaqsood/react-buttons

A collection of 16 highly interactive and customizable React buttons with advanced animations and effects for modern web applications.

![npm version](https://img.shields.io/npm/v/@basatmaqsood/react-buttons)
![license](https://img.shields.io/npm/l/@basatmaqsood/react-buttons)
![downloads](https://img.shields.io/npm/dt/@basatmaqsood/react-buttons)

## 🌟 Features

- 16 unique button components with different animation effects
- Fully customizable with extensive prop options
- Written in TypeScript with full type safety
- Works with React and Next.js applications
- Zero external dependencies
- Responsive and accessible
- Easy to implement

## 📦 Installation

```bash
# Using npm
npm install @basatmaqsood/react-buttons

# Using yarn
yarn add @basatmaqsood/react-buttons

# Using pnpm
pnpm add @basatmaqsood/react-buttons
```

## 🚀 Quick Start

```javascriptreact
import { NeonGlowButton, MagneticButton, ExplodingConfettiButton } from '@basatmaqsood/react-buttons';

function App() {
  return (
    <div>
      <NeonGlowButton>Neon Glow</NeonGlowButton>
      <MagneticButton>Magnetic Pull</MagneticButton>
      <ExplodingConfettiButton>Party Time!</ExplodingConfettiButton>
    </div>
  );
}
```

## 📑 Table of Contents

- [Installation](#-installation)
- [Quick Start](#-quick-start)
- [Button Components](#-button-components)

- [BaseButton](#basebutton)
- [MagneticButton](#magneticbutton)
- [ElasticStretchButton](#elasticstretchbutton)
- [NeonGlowButton](#neonglowbutton)
- [DepthPerceptionButton](#depthperceptionbutton)
- [BouncyButton](#bouncybutton)
- [LiquidFillButton](#liquidfillbutton)
- [GhostTrailButton](#ghosttrailbutton)
- [ShatterButton](#shatterbutton)
- [OrbitingButton](#orbitingbutton)
- [MagneticRepelButton](#magneticrepelbutton)
- [FrictionButton](#frictionbutton)
- [HoverRippleButton](#hoverripplebutton)
- [PixelateButton](#pixelatebutton)
- [LavaLampButton](#lavalambutton)
- [ExplodingConfettiButton](#explodingconfettibutton)



- [Browser Support](#-browser-support)
- [License](#-license)
- [Contributing](#-contributing)


## 🧩 Button Components

### BaseButton

The foundation for all other button components with basic styling and functionality.

#### Props

| Prop | Type | Default | Description
|-----|-----|-----|-----
| `backgroundColor` | `string` | `'#3b82f6'` | Background color of the button
| `textColor` | `string` | `'white'` | Text color of the button
| `size` | `'sm' | 'md' | 'lg'` | `'md'` | Size of the button
| `borderRadius` | `string` | `'4px'` | Border radius of the button
| `padding` | `string` | - | Custom padding
| `fontSize` | `string` | - | Font size
| `fontWeight` | `string | number` | `'500'` | Font weight
| `boxShadow` | `string` | - | Custom box shadow
| `transition` | `string` | `'all 0.3s ease'` | Transition effect


#### Example

```javascriptreact
import { BaseButton } from '@basatmaqsood/react-buttons';

<BaseButton 
  backgroundColor="#4CAF50"
  textColor="white"
  size="lg"
  borderRadius="8px"
  onClick={() => console.log('Clicked!')}
>
  Basic Button
</BaseButton>
```

### MagneticButton

A button that attracts to cursor movements, creating a magnetic pull effect.

#### Props

| Prop | Type | Default | Description
|-----|-----|-----|-----
| `strength` | `number` | `50` | Strength of the magnetic pull (1-100)
| `radius` | `number` | `100` | Detection radius around the button in pixels
| `returnSpeed` | `number` | `300` | Speed of return to original position in ms


#### Example

```javascriptreact
import { MagneticButton } from '@basatmaqsood/react-buttons';

<MagneticButton 
  strength={60}
  radius={120}
  returnSpeed={250}
  backgroundColor="#3498db"
>
  Magnetic Pull
</MagneticButton>
```

### ElasticStretchButton

A button that stretches when hovered, creating an elastic effect.

#### Props

| Prop | Type | Default | Description
|-----|-----|-----|-----
| `stretchAmount` | `number` | `1.1` | How much the button stretches (1.0+)
| `easing` | `string` | `'cubic-bezier(0.68, -0.6, 0.32, 1.6)'` | CSS transition easing
| `borderRadius` | `string` | `'inherit'` | Border radius when stretched
| `direction` | `'horizontal' | 'vertical' | 'both'` | `'horizontal'` | Direction of stretch


#### Example

```javascriptreact
import { ElasticStretchButton } from '@basatmaqsood/react-buttons';

<ElasticStretchButton 
  stretchAmount={1.2}
  direction="both"
  backgroundColor="#9c27b0"
>
  Stretch Me
</ElasticStretchButton>
```

### NeonGlowButton

A button with a vibrant neon glow effect on hover.

#### Props

| Prop | Type | Default | Description
|-----|-----|-----|-----
| `glowColor` | `string` | `'#00ffff'` | Color of the glow effect
| `glowIntensity` | `number` | `1` | Intensity of the glow (0.1-3)
| `glowDuration` | `number` | `0.3` | Duration of glow transition in seconds
| `textColor` | `string` | Same as `glowColor` | Text color


#### Example

```javascriptreact
import { NeonGlowButton } from '@basatmaqsood/react-buttons';

<NeonGlowButton 
  glowColor="#ff00ff"
  glowIntensity={1.5}
  backgroundColor="#212121"
>
  Neon Glow
</NeonGlowButton>
```

### DepthPerceptionButton

A button with 3D depth perception that responds to mouse movements.

#### Props

| Prop | Type | Default | Description
|-----|-----|-----|-----
| `rotationAngle` | `number` | `15` | Maximum rotation angle in degrees
| `depth` | `number` | `30` | 3D depth effect in pixels
| `shadowIntensity` | `number` | `0.2` | Intensity of the shadow (0-1)
| `perspective` | `number` | `800` | CSS perspective value in pixels


#### Example

```javascriptreact
import { DepthPerceptionButton } from '@basatmaqsood/react-buttons';

<DepthPerceptionButton 
  rotationAngle={20}
  depth={40}
  shadowIntensity={0.3}
  backgroundColor="#ff5722"
>
  3D Button
</DepthPerceptionButton>
```

### BouncyButton

A button that bounces when clicked.

#### Props

| Prop | Type | Default | Description
|-----|-----|-----|-----
| `bounceHeight` | `number` | `20` | Height of bounce in pixels
| `bounceSpeed` | `number` | `0.3` | Speed of animation in seconds
| `bounceEasing` | `string` | `'cubic-bezier(0.175, 0.885, 0.32, 1.275)'` | CSS easing function
| `bounceCount` | `number` | `2` | Number of bounce iterations


#### Example

```javascriptreact
import { BouncyButton } from '@basatmaqsood/react-buttons';

<BouncyButton 
  bounceHeight={25}
  bounceSpeed={0.4}
  bounceCount={3}
  backgroundColor="#2196f3"
>
  Bounce!
</BouncyButton>
```

### LiquidFillButton

A button that fills with a liquid-like animation on hover.

#### Props

| Prop | Type | Default | Description
|-----|-----|-----|-----
| `liquidColor` | `string` | `'#3b82f6'` | Color of the filling liquid
| `fillDirection` | `'left-to-right' | 'right-to-left' | 'top-to-bottom' | 'bottom-to-top' | 'center'` | `'left-to-right'` | Direction of fill animation
| `fillSpeed` | `number` | `0.5` | Speed of fill in seconds
| `textColor` | `string` | `'currentColor'` | Initial text color
| `hoverTextColor` | `string` | `'white'` | Text color when filled


#### Example

```javascriptreact
import { LiquidFillButton } from '@basatmaqsood/react-buttons';

<LiquidFillButton 
  liquidColor="#ff9800"
  fillDirection="center"
  fillSpeed={0.7}
  hoverTextColor="#fff"
  backgroundColor="transparent"
  textColor="#ff9800"
  style={{ border: '2px solid #ff9800' }}
>
  Liquid Fill
</LiquidFillButton>
```

### GhostTrailButton

A button that leaves ghost trails when the mouse moves over it.

#### Props

| Prop | Type | Default | Description
|-----|-----|-----|-----
| `trailColor` | `string` | `'rgba(255, 255, 255, 0.5)'` | Color of the ghost trails
| `trailDuration` | `number` | `0.8` | Duration of trail animation in seconds
| `trailSize` | `number` | `20` | Size of trail particles in pixels


#### Example

```javascriptreact
import { GhostTrailButton } from '@basatmaqsood/react-buttons';

<GhostTrailButton 
  trailColor="rgba(255, 193, 7, 0.6)"
  trailDuration={1}
  trailSize={25}
  backgroundColor="#673ab7"
>
  Ghost Trail
</GhostTrailButton>
```

### ShatterButton

A button that shatters into pieces when clicked.

#### Props

| Prop | Type | Default | Description
|-----|-----|-----|-----
| `shatterSpeed` | `number` | `0.5` | Speed of the shatter animation in seconds
| `reformDelay` | `number` | `1000` | Delay before reforming in milliseconds
| `shardCount` | `number` | `15` | Number of shards created when shattering


#### Example

```javascriptreact
import { ShatterButton } from '@basatmaqsood/react-buttons';

<ShatterButton 
  shatterSpeed={0.6}
  reformDelay={1200}
  shardCount={20}
  backgroundColor="#e91e63"
>
  Shatter!
</ShatterButton>
```

### OrbitingButton

A button with particles orbiting around it.

#### Props

| Prop | Type | Default | Description
|-----|-----|-----|-----
| `orbitSpeed` | `number` | `5` | Speed of orbiting particles
| `orbitSize` | `number` | `80` | Distance of orbit in pixels
| `onClickEffect` | `'explode' | 'spin' | 'disappear' | 'converge'` | `'explode'` | Animation when clicked
| `orbitCount` | `number` | `6` | Number of orbiting particles
| `orbitColor` | `string | string[]` | Multiple colors | Color(s) of orbiting particles
| `orbitShape` | `'circle' | 'square' | 'triangle' | 'star'` | `'circle'` | Shape of orbiting particles
| `orbitVariation` | `boolean` | `true` | Whether to vary particle attributes


#### Example

```javascriptreact
import { OrbitingButton } from '@basatmaqsood/react-buttons';

<OrbitingButton 
  orbitSpeed={4}
  orbitSize={90}
  onClickEffect="converge"
  orbitCount={8}
  orbitColor={["#ff9800", "#f44336", "#2196f3"]}
  orbitShape="triangle"
  backgroundColor="#333"
>
  Orbit
</OrbitingButton>
```

### MagneticRepelButton

A button that repels away from the cursor, the opposite of MagneticButton.

#### Props

| Prop | Type | Default | Description
|-----|-----|-----|-----
| `repelStrength` | `number` | `0.5` | Strength of repulsion (0-1)
| `maxDisplacement` | `number` | `30` | Maximum distance button can move in pixels
| `returnSpeed` | `number` | `0.3` | Speed of return animation (0-1)


#### Example

```javascriptreact
import { MagneticRepelButton } from '@basatmaqsood/react-buttons';

<MagneticRepelButton 
  repelStrength={0.7}
  maxDisplacement={40}
  returnSpeed={0.4}
  backgroundColor="#009688"
>
  Repel Me
</MagneticRepelButton>
```

### FrictionButton

A button that can be dragged with physics-based friction and momentum.

#### Props

| Prop | Type | Default | Description
|-----|-----|-----|-----
| `friction` | `number` | `0.85` | Amount of friction (0-1)
| `dragEnabled` | `boolean` | `true` | Whether the button can be dragged
| `snapBack` | `boolean` | `true` | Whether the button snaps back to original position
| `maxDistance` | `number` | `200` | Maximum drag distance in pixels
| `snapBackSpeed` | `number` | `0.1` | Speed of snap back animation (0-1)


#### Example

```javascriptreact
import { FrictionButton } from '@basatmaqsood/react-buttons';

<FrictionButton 
  friction={0.9}
  maxDistance={150}
  snapBackSpeed={0.15}
  backgroundColor="#607d8b"
>
  Drag Me
</FrictionButton>
```

### HoverRippleButton

A button that creates ripples as you move your cursor across it.

#### Props

| Prop | Type | Default | Description
|-----|-----|-----|-----
| `rippleColor` | `string` | `'rgba(255, 255, 255, 0.7)'` | Color of ripples
| `rippleSize` | `number` | `100` | Maximum size of ripples in pixels
| `rippleSpeed` | `number` | `1` | Speed of ripple animation
| `rippleOpacity` | `number` | `0.7` | Initial opacity of ripples (0-1)
| `rippleCount` | `number` | `3` | Maximum number of simultaneous ripples


#### Example

```javascriptreact
import { HoverRippleButton } from '@basatmaqsood/react-buttons';

<HoverRippleButton 
  rippleColor="rgba(33, 150, 243, 0.7)"
  rippleSize={120}
  rippleSpeed={1.2}
  rippleCount={5}
  backgroundColor="#fff"
  textColor="#333"
  style={{ border: '1px solid #ccc' }}
>
  Ripple Effect
</HoverRippleButton>
```

### PixelateButton

A button that pixelates and dissolves when clicked.

#### Props

| Prop | Type | Default | Description
|-----|-----|-----|-----
| `pixelSize` | `number` | `8` | Size of pixels in pixels
| `pixelSpeed` | `number` | `1` | Speed of pixelation animation
| `pixelColors` | `string[]` | Uses background color | Colors used for pixels


#### Example

```javascriptreact
import { PixelateButton } from '@basatmaqsood/react-buttons';

<PixelateButton 
  pixelSize={10}
  pixelSpeed={1.2}
  pixelColors={["#f44336", "#e91e63", "#9c27b0"]}
  backgroundColor="#3f51b5"
>
  Pixelate
</PixelateButton>
```

### LavaLampButton

A button with mesmerizing lava lamp fluid animations.

#### Props

| Prop | Type | Default | Description
|-----|-----|-----|-----
| `waveSpeed` | `number` | `1` | Speed of lava movement
| `blobSize` | `number` | `0.5` | Size of lava blobs (0-2)
| `colorTransition` | `boolean` | `true` | Whether blobs change color
| `blobCount` | `number` | `5` | Number of blobs
| `primaryColor` | `string` | `'#ff6b6b'` | Primary blob color
| `secondaryColor` | `string` | `'#4ecdc4'` | Secondary blob color
| `blendMode` | `string` | `'normal'` | CSS blend mode
| `viscosity` | `number` | `0.95` | Fluid viscosity (0-1)
| `interactOnHover` | `boolean` | `true` | Whether blobs react to mouse movement
| `glowIntensity` | `number` | `0` | Glow effect intensity (0-1)
| `backgroundOpacity` | `number` | `1` | Background opacity (0-1)
| `borderWidth` | `number` | `2` | Border width in pixels
| `borderColor` | `string` | `'rgba(255, 255, 255, 0.5)'` | Border color
| `textBlendMode` | `string` | `'difference'` | Text blend mode
| `textColor` | `string` | - | Text color


#### Example

```javascriptreact
import { LavaLampButton } from '@basatmaqsood/react-buttons';

<LavaLampButton 
  waveSpeed={0.8}
  blobSize={0.7}
  blobCount={6}
  primaryColor="#ff9900"
  secondaryColor="#9900ff"
  glowIntensity={0.4}
  borderWidth={0}
  textColor="white"
>
  Lava Effect
</LavaLampButton>
```

### ExplodingConfettiButton

A button that explodes with colorful confetti when clicked.

#### Props

| Prop | Type | Default | Description
|-----|-----|-----|-----
| `confettiCount` | `number` | `100` | Number of confetti pieces
| `confettiColors` | `string[]` | Multiple colors | Colors of confetti
| `resetTime` | `number` | `2000` | Time until button reappears in ms
| `confettiSize` | `number` | `8` | Size of confetti pieces in pixels
| `explosionForce` | `number` | `1` | Force of explosion (0.5-2)


#### Example

```javascriptreact
import { ExplodingConfettiButton } from '@basatmaqsood/react-buttons';

<ExplodingConfettiButton 
  confettiCount={150}
  confettiColors={["#f44336", "#2196f3", "#ffeb3b", "#4caf50", "#9c27b0"]}
  resetTime={2500}
  explosionForce={1.2}
  backgroundColor="#333"
>
  Celebrate!
</ExplodingConfettiButton>
```

## 🌐 Browser Support

- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 16+
- Opera 47+


## 📄 License

MIT © [Basat Maqsood](https://github.com/basatmaqsood)

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add some amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a pull request



```plaintext
Made with ❤️ by Basat Maqsood

```