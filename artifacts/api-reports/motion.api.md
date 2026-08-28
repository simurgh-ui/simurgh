# @simurgh-ui/motion public API

Version snapshot: 0.1.3-beta.1

## Export map

```json
{
  ".": {
    "types": "./dist/index.d.ts",
    "import": "./dist/index.js"
  },
  "./react": {
    "types": "./dist/react.d.ts",
    "import": "./dist/react.js"
  },
  "./vue": {
    "types": "./dist/vue.d.ts",
    "import": "./dist/vue.js"
  },
  "./angular": {
    "types": "./dist/angular.d.ts",
    "default": "./dist/angular.js"
  }
}
```

## .

- `animate`: `(target: Element | null | undefined, keyframes: MotionTarget, transition?: MotionTransition, callbacks?: Pick<MotionDefinition, "onStart" | "onComplete" | "onCancel" | "reducedMotion">) => MotionControls`
- `bindMotion`: `(element: Element, definition: MotionDefinition) => MotionBinding`
- `MotionBinding`: `type MotionBinding = (() => void) & { readonly controls: MotionControls; };`
- `MotionControls`: `type MotionControls = { readonly finished: Promise<void>; readonly playState: AnimationPlayState | 'idle'; play(): void; pause(): void; cancel(): void; finish(): void; };`
- `MotionDefinition`: `type MotionDefinition = { initial?: MotionTarget | string; animate?: MotionTarget | string; exit?: MotionTarget | string; whileHover?: MotionTarget | string; whilePress?: MotionTarget | string; whileFocus?: MotionTarget | string; whileInView?: MotionTarget | string; variants?: Record<string, MotionVariant>; transition?: MotionTransition; reducedMotion?: ReducedMotionMode; stagger?: number; onStart?: () => void; onComplete?: () => void; onCancel?: () => void; };`
- `MotionKeyframes`: `type MotionKeyframes = Keyframe & { x?: MotionValue; y?: MotionValue; scale?: MotionValue; rotate?: MotionValue; };`
- `MotionTarget`: `type MotionTarget = MotionKeyframes | MotionKeyframes[];`
- `MotionTransition`: `type MotionTransition = { type?: 'tween' | 'spring'; duration?: number; delay?: number; easing?: string; stiffness?: number; damping?: number; mass?: number; repeat?: number; direction?: PlaybackDirection; fill?: FillMode; };`
- `MotionValue`: `type MotionValue = string | number | Array<string | number>;`
- `MotionVariant`: `type MotionVariant = MotionTarget & { transition?: MotionTransition };`
- `prefersReducedMotion`: `(mode?: ReducedMotionMode) => boolean`
- `ReducedMotionMode`: `type ReducedMotionMode = 'user' | 'always' | 'never';`
- `resolveTarget`: `(definition: MotionDefinition, state: keyof MotionDefinition) => MotionTarget | undefined`
- `runMotion`: `(element: Element, definition: MotionDefinition, state?: keyof MotionDefinition) => MotionControls`
- `sequence`: `(steps: Array<[Element, MotionTarget, MotionTransition?]>) => MotionControls`
- `toKeyframes`: `(target: MotionTarget, baseTransform?: string) => Keyframe[]`

## ./react

- `animate`: `(target: Element | null | undefined, keyframes: MotionTarget, transition?: MotionTransition, callbacks?: Pick<MotionDefinition, "onStart" | "onComplete" | "onCancel" | "reducedMotion">) => MotionControls`
- `animated`: `Record<string, React.ForwardRefExoticComponent<Omit<AnimatedProps, "ref"> & React.RefAttributes<Element>>>`
- `bindMotion`: `(element: Element, definition: MotionDefinition) => MotionBinding`
- `MotionBinding`: `type MotionBinding = (() => void) & { readonly controls: MotionControls; };`
- `MotionControls`: `type MotionControls = { readonly finished: Promise<void>; readonly playState: AnimationPlayState | 'idle'; play(): void; pause(): void; cancel(): void; finish(): void; };`
- `MotionDefinition`: `type MotionDefinition = { initial?: MotionTarget | string; animate?: MotionTarget | string; exit?: MotionTarget | string; whileHover?: MotionTarget | string; whilePress?: MotionTarget | string; whileFocus?: MotionTarget | string; whileInView?: MotionTarget | string; variants?: Record<string, MotionVariant>; transition?: MotionTransition; reducedMotion?: ReducedMotionMode; stagger?: number; onStart?: () => void; onComplete?: () => void; onCancel?: () => void; };`
- `MotionKeyframes`: `type MotionKeyframes = Keyframe & { x?: MotionValue; y?: MotionValue; scale?: MotionValue; rotate?: MotionValue; };`
- `MotionTarget`: `type MotionTarget = MotionKeyframes | MotionKeyframes[];`
- `MotionTransition`: `type MotionTransition = { type?: 'tween' | 'spring'; duration?: number; delay?: number; easing?: string; stiffness?: number; damping?: number; mass?: number; repeat?: number; direction?: PlaybackDirection; fill?: FillMode; };`
- `MotionValue`: `type MotionValue = string | number | Array<string | number>;`
- `MotionVariant`: `type MotionVariant = MotionTarget & { transition?: MotionTransition };`
- `prefersReducedMotion`: `(mode?: ReducedMotionMode) => boolean`
- `Presence`: `({ children, exit }: PresenceProps) => ReactElement<unknown, string | React.JSXElementConstructor<any>>[]`
- `ReducedMotionMode`: `type ReducedMotionMode = 'user' | 'always' | 'never';`
- `resolveTarget`: `(definition: MotionDefinition, state: keyof MotionDefinition) => MotionTarget | undefined`
- `runMotion`: `(element: Element, definition: MotionDefinition, state?: keyof MotionDefinition) => MotionControls`
- `sequence`: `(steps: Array<[Element, MotionTarget, MotionTransition?]>) => MotionControls`
- `toKeyframes`: `(target: MotionTarget, baseTransform?: string) => Keyframe[]`
- `useMotion`: `<T extends Element>(definition: MotionDefinition) => { ref: React.RefObject<T | null>; controls: React.RefObject<MotionControls | null>; }`

## ./vue

- `animate`: `(target: Element | null | undefined, keyframes: MotionTarget, transition?: MotionTransition, callbacks?: Pick<MotionDefinition, "onStart" | "onComplete" | "onCancel" | "reducedMotion">) => MotionControls`
- `bindMotion`: `(element: Element, definition: MotionDefinition) => MotionBinding`
- `Motion`: `DefineComponent<ExtractPropTypes<{ as: { type: StringConstructor; default: string; }; motion: { type: PropType<MotionDefinition>; required: true; }; }>, () => VNode<RendererNode, RendererElement, { [key: string]: any; }>, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {}, string, PublicProps, ToResolvedProps<ExtractPropTypes<{ as: { type: StringConstructor; default: string; }; motion: { type: PropType<MotionDefinition>; required: true; }; }>, {}>, { as: string; }, {}, {}, {}, string, ComponentProvideOptions, true, {}, any>`
- `MotionBinding`: `type MotionBinding = (() => void) & { readonly controls: MotionControls; };`
- `MotionControls`: `type MotionControls = { readonly finished: Promise<void>; readonly playState: AnimationPlayState | 'idle'; play(): void; pause(): void; cancel(): void; finish(): void; };`
- `MotionDefinition`: `type MotionDefinition = { initial?: MotionTarget | string; animate?: MotionTarget | string; exit?: MotionTarget | string; whileHover?: MotionTarget | string; whilePress?: MotionTarget | string; whileFocus?: MotionTarget | string; whileInView?: MotionTarget | string; variants?: Record<string, MotionVariant>; transition?: MotionTransition; reducedMotion?: ReducedMotionMode; stagger?: number; onStart?: () => void; onComplete?: () => void; onCancel?: () => void; };`
- `MotionKeyframes`: `type MotionKeyframes = Keyframe & { x?: MotionValue; y?: MotionValue; scale?: MotionValue; rotate?: MotionValue; };`
- `MotionTarget`: `type MotionTarget = MotionKeyframes | MotionKeyframes[];`
- `MotionTransition`: `type MotionTransition = { type?: 'tween' | 'spring'; duration?: number; delay?: number; easing?: string; stiffness?: number; damping?: number; mass?: number; repeat?: number; direction?: PlaybackDirection; fill?: FillMode; };`
- `MotionValue`: `type MotionValue = string | number | Array<string | number>;`
- `MotionVariant`: `type MotionVariant = MotionTarget & { transition?: MotionTransition };`
- `prefersReducedMotion`: `(mode?: ReducedMotionMode) => boolean`
- `Presence`: `DefineComponent<ExtractPropTypes<{ exit: { type: PropType<MotionDefinition>; required: true; }; }>, () => VNode<RendererNode, RendererElement, { [key: string]: any; }>, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {}, string, PublicProps, ToResolvedProps<ExtractPropTypes<{ exit: { type: PropType<MotionDefinition>; required: true; }; }>, {}>, {}, {}, {}, {}, string, ComponentProvideOptions, true, {}, any>`
- `ReducedMotionMode`: `type ReducedMotionMode = 'user' | 'always' | 'never';`
- `resolveTarget`: `(definition: MotionDefinition, state: keyof MotionDefinition) => MotionTarget | undefined`
- `runMotion`: `(element: Element, definition: MotionDefinition, state?: keyof MotionDefinition) => MotionControls`
- `sequence`: `(steps: Array<[Element, MotionTarget, MotionTransition?]>) => MotionControls`
- `toKeyframes`: `(target: MotionTarget, baseTransform?: string) => Keyframe[]`
- `useMotion`: `(definition: MotionDefinition) => Ref<Element | undefined, Element | undefined>`
- `vMotion`: `Directive<Element, MotionDefinition>`

## ./angular

- `animate`: `(target: Element | null | undefined, keyframes: MotionTarget, transition?: MotionTransition, callbacks?: Pick<MotionDefinition, "onStart" | "onComplete" | "onCancel" | "reducedMotion">) => MotionControls`
- `bindMotion`: `(element: Element, definition: MotionDefinition) => MotionBinding`
- `MotionBinding`: `type MotionBinding = (() => void) & { readonly controls: MotionControls; };`
- `MotionController`: `typeof MotionController`
- `MotionControls`: `type MotionControls = { readonly finished: Promise<void>; readonly playState: AnimationPlayState | 'idle'; play(): void; pause(): void; cancel(): void; finish(): void; };`
- `MotionDefinition`: `type MotionDefinition = { initial?: MotionTarget | string; animate?: MotionTarget | string; exit?: MotionTarget | string; whileHover?: MotionTarget | string; whilePress?: MotionTarget | string; whileFocus?: MotionTarget | string; whileInView?: MotionTarget | string; variants?: Record<string, MotionVariant>; transition?: MotionTransition; reducedMotion?: ReducedMotionMode; stagger?: number; onStart?: () => void; onComplete?: () => void; onCancel?: () => void; };`
- `MotionKeyframes`: `type MotionKeyframes = Keyframe & { x?: MotionValue; y?: MotionValue; scale?: MotionValue; rotate?: MotionValue; };`
- `MotionTarget`: `type MotionTarget = MotionKeyframes | MotionKeyframes[];`
- `MotionTransition`: `type MotionTransition = { type?: 'tween' | 'spring'; duration?: number; delay?: number; easing?: string; stiffness?: number; damping?: number; mass?: number; repeat?: number; direction?: PlaybackDirection; fill?: FillMode; };`
- `MotionValue`: `type MotionValue = string | number | Array<string | number>;`
- `MotionVariant`: `type MotionVariant = MotionTarget & { transition?: MotionTransition };`
- `prefersReducedMotion`: `(mode?: ReducedMotionMode) => boolean`
- `ReducedMotionMode`: `type ReducedMotionMode = 'user' | 'always' | 'never';`
- `resolveTarget`: `(definition: MotionDefinition, state: keyof MotionDefinition) => MotionTarget | undefined`
- `runMotion`: `(element: Element, definition: MotionDefinition, state?: keyof MotionDefinition) => MotionControls`
- `sequence`: `(steps: Array<[Element, MotionTarget, MotionTransition?]>) => MotionControls`
- `SimurghMotionDirective`: `typeof SimurghMotionDirective`
- `SimurghPresence`: `typeof SimurghPresence`
- `toKeyframes`: `(target: MotionTarget, baseTransform?: string) => Keyframe[]`

