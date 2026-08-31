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
  "./preact": {
    "types": "./dist/preact.d.ts",
    "import": "./dist/preact.js"
  },
  "./vue": {
    "types": "./dist/vue.d.ts",
    "import": "./dist/vue.js"
  },
  "./angular": {
    "types": "./dist/angular.d.ts",
    "default": "./dist/angular.js"
  },
  "./svelte": {
    "types": "./dist/svelte.d.ts",
    "import": "./dist/svelte.js"
  },
  "./lit": {
    "types": "./dist/lit.d.ts",
    "import": "./dist/lit.js"
  },
  "./scroll": {
    "types": "./dist/scroll.d.ts",
    "import": "./dist/scroll.js"
  },
  "./layout": {
    "types": "./dist/layout.d.ts",
    "import": "./dist/layout.js"
  }
}
```

## .

- `animate`: `(target: Element | null | undefined, keyframes: MotionTarget, transition?: MotionTransition, callbacks?: Pick<MotionDefinition, "onStart" | "onComplete" | "onCancel" | "reducedMotion">) => MotionControls`
- `animateAll`: `(targets: MotionTargets, keyframes: MotionTarget, transition?: MotionBatchTransition) => MotionControls`
- `bindMotion`: `(element: Element, definition: MotionDefinition) => MotionBinding`
- `MotionBatchTransition`: `type MotionBatchTransition = MotionTransition & { stagger?: number | ((index: number, total: number) => number); };`
- `MotionBinding`: `type MotionBinding = (() => void) & { readonly controls: MotionControls; };`
- `MotionControls`: `type MotionControls = { readonly finished: Promise<void>; readonly playState: AnimationPlayState | 'idle'; play(): void; pause(): void; cancel(): void; finish(): void; };`
- `MotionDefinition`: `type MotionDefinition = { initial?: MotionTarget | string; animate?: MotionTarget | string; exit?: MotionTarget | string; whileHover?: MotionTarget | string; whilePress?: MotionTarget | string; whileFocus?: MotionTarget | string; whileInView?: MotionTarget | string; variants?: Record<string, MotionVariant>; transition?: MotionTransition; reducedMotion?: ReducedMotionMode; stagger?: number; onStart?: () => void; onComplete?: () => void; onCancel?: () => void; };`
- `MotionKeyframes`: `type MotionKeyframes = Omit<Keyframe, 'transform'> & { transform?: MotionValue; x?: MotionValue; y?: MotionValue; scale?: MotionValue; scaleX?: MotionValue; scaleY?: MotionValue; rotate?: MotionValue; skewX?: MotionValue; skewY?: MotionValue; transformOrigin?: string | Array<string>; };`
- `MotionTarget`: `type MotionTarget = MotionKeyframes | MotionKeyframes[];`
- `MotionTargets`: `type MotionTargets = Element | Iterable<Element>;`
- `MotionTimelineOptions`: `type MotionTimelineOptions = { labels?: Record<string, number>; };`
- `MotionTimelineStep`: `type MotionTimelineStep = { target: MotionTargets; keyframes: MotionTarget; transition?: MotionTransition; at?: number | string; };`
- `MotionTransition`: `type MotionTransition = { type?: 'tween' | 'spring'; duration?: number; delay?: number; easing?: string; stiffness?: number; damping?: number; mass?: number; repeat?: number; direction?: PlaybackDirection; fill?: FillMode; stagger?: number | ((index: number, total: number) => number); velocity?: number; };`
- `MotionValue`: `type MotionValue = string | number | Array<string | number>;`
- `MotionVariant`: `type MotionVariant = MotionTarget & { transition?: MotionTransition };`
- `prefersReducedMotion`: `(mode?: ReducedMotionMode) => boolean`
- `ReducedMotionMode`: `type ReducedMotionMode = 'user' | 'always' | 'never';`
- `resolveTarget`: `(definition: MotionDefinition, state: keyof MotionDefinition) => MotionTarget | undefined`
- `runMotion`: `(element: Element, definition: MotionDefinition, state?: keyof MotionDefinition) => MotionControls`
- `sequence`: `(steps: Array<[Element, MotionTarget, MotionTransition?]>) => MotionControls`
- `timeline`: `(steps: MotionTimelineStep[], options?: MotionTimelineOptions) => MotionControls`
- `toKeyframes`: `(target: MotionTarget, baseTransform?: string) => Keyframe[]`

## ./react

- `animate`: `(target: Element | null | undefined, keyframes: MotionTarget, transition?: MotionTransition, callbacks?: Pick<MotionDefinition, "onStart" | "onComplete" | "onCancel" | "reducedMotion">) => MotionControls`
- `animateAll`: `(targets: MotionTargets, keyframes: MotionTarget, transition?: MotionBatchTransition) => MotionControls`
- `animated`: `Record<string, React.ForwardRefExoticComponent<Omit<AnimatedProps, "ref"> & React.RefAttributes<Element>>>`
- `bindMotion`: `(element: Element, definition: MotionDefinition) => MotionBinding`
- `MotionBatchTransition`: `type MotionBatchTransition = MotionTransition & { stagger?: number | ((index: number, total: number) => number); };`
- `MotionBinding`: `type MotionBinding = (() => void) & { readonly controls: MotionControls; };`
- `MotionControls`: `type MotionControls = { readonly finished: Promise<void>; readonly playState: AnimationPlayState | 'idle'; play(): void; pause(): void; cancel(): void; finish(): void; };`
- `MotionDefinition`: `type MotionDefinition = { initial?: MotionTarget | string; animate?: MotionTarget | string; exit?: MotionTarget | string; whileHover?: MotionTarget | string; whilePress?: MotionTarget | string; whileFocus?: MotionTarget | string; whileInView?: MotionTarget | string; variants?: Record<string, MotionVariant>; transition?: MotionTransition; reducedMotion?: ReducedMotionMode; stagger?: number; onStart?: () => void; onComplete?: () => void; onCancel?: () => void; };`
- `MotionKeyframes`: `type MotionKeyframes = Omit<Keyframe, 'transform'> & { transform?: MotionValue; x?: MotionValue; y?: MotionValue; scale?: MotionValue; scaleX?: MotionValue; scaleY?: MotionValue; rotate?: MotionValue; skewX?: MotionValue; skewY?: MotionValue; transformOrigin?: string | Array<string>; };`
- `MotionTarget`: `type MotionTarget = MotionKeyframes | MotionKeyframes[];`
- `MotionTargets`: `type MotionTargets = Element | Iterable<Element>;`
- `MotionTimelineOptions`: `type MotionTimelineOptions = { labels?: Record<string, number>; };`
- `MotionTimelineStep`: `type MotionTimelineStep = { target: MotionTargets; keyframes: MotionTarget; transition?: MotionTransition; at?: number | string; };`
- `MotionTransition`: `type MotionTransition = { type?: 'tween' | 'spring'; duration?: number; delay?: number; easing?: string; stiffness?: number; damping?: number; mass?: number; repeat?: number; direction?: PlaybackDirection; fill?: FillMode; stagger?: number | ((index: number, total: number) => number); velocity?: number; };`
- `MotionValue`: `type MotionValue = string | number | Array<string | number>;`
- `MotionVariant`: `type MotionVariant = MotionTarget & { transition?: MotionTransition };`
- `prefersReducedMotion`: `(mode?: ReducedMotionMode) => boolean`
- `Presence`: `({ children, exit }: PresenceProps) => ReactElement<unknown, string | React.JSXElementConstructor<any>>[]`
- `ReducedMotionMode`: `type ReducedMotionMode = 'user' | 'always' | 'never';`
- `resolveTarget`: `(definition: MotionDefinition, state: keyof MotionDefinition) => MotionTarget | undefined`
- `runMotion`: `(element: Element, definition: MotionDefinition, state?: keyof MotionDefinition) => MotionControls`
- `sequence`: `(steps: Array<[Element, MotionTarget, MotionTransition?]>) => MotionControls`
- `timeline`: `(steps: MotionTimelineStep[], options?: MotionTimelineOptions) => MotionControls`
- `toKeyframes`: `(target: MotionTarget, baseTransform?: string) => Keyframe[]`
- `useMotion`: `<T extends Element>(definition: MotionDefinition) => { ref: React.RefObject<T | null>; controls: React.RefObject<MotionControls | null>; }`

## ./preact

- `animate`: `(target: Element | null | undefined, keyframes: MotionTarget, transition?: MotionTransition, callbacks?: Pick<MotionDefinition, "onStart" | "onComplete" | "onCancel" | "reducedMotion">) => MotionControls`
- `animateAll`: `(targets: MotionTargets, keyframes: MotionTarget, transition?: MotionBatchTransition) => MotionControls`
- `animated`: `Record<string, FunctionalComponent<React.PropsWithoutRef<AnimatedProps> & { ref?: Ref<Element>; }>>`
- `bindMotion`: `(element: Element, definition: MotionDefinition) => MotionBinding`
- `MotionBatchTransition`: `type MotionBatchTransition = MotionTransition & { stagger?: number | ((index: number, total: number) => number); };`
- `MotionBinding`: `type MotionBinding = (() => void) & { readonly controls: MotionControls; };`
- `MotionControls`: `type MotionControls = { readonly finished: Promise<void>; readonly playState: AnimationPlayState | 'idle'; play(): void; pause(): void; cancel(): void; finish(): void; };`
- `MotionDefinition`: `type MotionDefinition = { initial?: MotionTarget | string; animate?: MotionTarget | string; exit?: MotionTarget | string; whileHover?: MotionTarget | string; whilePress?: MotionTarget | string; whileFocus?: MotionTarget | string; whileInView?: MotionTarget | string; variants?: Record<string, MotionVariant>; transition?: MotionTransition; reducedMotion?: ReducedMotionMode; stagger?: number; onStart?: () => void; onComplete?: () => void; onCancel?: () => void; };`
- `MotionKeyframes`: `type MotionKeyframes = Omit<Keyframe, 'transform'> & { transform?: MotionValue; x?: MotionValue; y?: MotionValue; scale?: MotionValue; scaleX?: MotionValue; scaleY?: MotionValue; rotate?: MotionValue; skewX?: MotionValue; skewY?: MotionValue; transformOrigin?: string | Array<string>; };`
- `MotionTarget`: `type MotionTarget = MotionKeyframes | MotionKeyframes[];`
- `MotionTargets`: `type MotionTargets = Element | Iterable<Element>;`
- `MotionTimelineOptions`: `type MotionTimelineOptions = { labels?: Record<string, number>; };`
- `MotionTimelineStep`: `type MotionTimelineStep = { target: MotionTargets; keyframes: MotionTarget; transition?: MotionTransition; at?: number | string; };`
- `MotionTransition`: `type MotionTransition = { type?: 'tween' | 'spring'; duration?: number; delay?: number; easing?: string; stiffness?: number; damping?: number; mass?: number; repeat?: number; direction?: PlaybackDirection; fill?: FillMode; stagger?: number | ((index: number, total: number) => number); velocity?: number; };`
- `MotionValue`: `type MotionValue = string | number | Array<string | number>;`
- `MotionVariant`: `type MotionVariant = MotionTarget & { transition?: MotionTransition };`
- `prefersReducedMotion`: `(mode?: ReducedMotionMode) => boolean`
- `Presence`: `({ children, exit }: PresenceProps) => ReactElement<{}>[]`
- `ReducedMotionMode`: `type ReducedMotionMode = 'user' | 'always' | 'never';`
- `resolveTarget`: `(definition: MotionDefinition, state: keyof MotionDefinition) => MotionTarget | undefined`
- `runMotion`: `(element: Element, definition: MotionDefinition, state?: keyof MotionDefinition) => MotionControls`
- `sequence`: `(steps: Array<[Element, MotionTarget, MotionTransition?]>) => MotionControls`
- `timeline`: `(steps: MotionTimelineStep[], options?: MotionTimelineOptions) => MotionControls`
- `toKeyframes`: `(target: MotionTarget, baseTransform?: string) => Keyframe[]`
- `useMotion`: `<T extends Element>(definition: MotionDefinition) => { ref: RefObject<T>; controls: MutableRef<MotionControls | null>; }`

## ./vue

- `animate`: `(target: Element | null | undefined, keyframes: MotionTarget, transition?: MotionTransition, callbacks?: Pick<MotionDefinition, "onStart" | "onComplete" | "onCancel" | "reducedMotion">) => MotionControls`
- `animateAll`: `(targets: MotionTargets, keyframes: MotionTarget, transition?: MotionBatchTransition) => MotionControls`
- `bindMotion`: `(element: Element, definition: MotionDefinition) => MotionBinding`
- `Motion`: `DefineComponent<ExtractPropTypes<{ as: { type: StringConstructor; default: string; }; motion: { type: PropType<MotionDefinition>; required: true; }; }>, () => VNode<RendererNode, RendererElement, { [key: string]: any; }>, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {}, string, PublicProps, ToResolvedProps<ExtractPropTypes<{ as: { type: StringConstructor; default: string; }; motion: { type: PropType<MotionDefinition>; required: true; }; }>, {}>, { as: string; }, {}, {}, {}, string, ComponentProvideOptions, true, {}, any>`
- `MotionBatchTransition`: `type MotionBatchTransition = MotionTransition & { stagger?: number | ((index: number, total: number) => number); };`
- `MotionBinding`: `type MotionBinding = (() => void) & { readonly controls: MotionControls; };`
- `MotionControls`: `type MotionControls = { readonly finished: Promise<void>; readonly playState: AnimationPlayState | 'idle'; play(): void; pause(): void; cancel(): void; finish(): void; };`
- `MotionDefinition`: `type MotionDefinition = { initial?: MotionTarget | string; animate?: MotionTarget | string; exit?: MotionTarget | string; whileHover?: MotionTarget | string; whilePress?: MotionTarget | string; whileFocus?: MotionTarget | string; whileInView?: MotionTarget | string; variants?: Record<string, MotionVariant>; transition?: MotionTransition; reducedMotion?: ReducedMotionMode; stagger?: number; onStart?: () => void; onComplete?: () => void; onCancel?: () => void; };`
- `MotionKeyframes`: `type MotionKeyframes = Omit<Keyframe, 'transform'> & { transform?: MotionValue; x?: MotionValue; y?: MotionValue; scale?: MotionValue; scaleX?: MotionValue; scaleY?: MotionValue; rotate?: MotionValue; skewX?: MotionValue; skewY?: MotionValue; transformOrigin?: string | Array<string>; };`
- `MotionTarget`: `type MotionTarget = MotionKeyframes | MotionKeyframes[];`
- `MotionTargets`: `type MotionTargets = Element | Iterable<Element>;`
- `MotionTimelineOptions`: `type MotionTimelineOptions = { labels?: Record<string, number>; };`
- `MotionTimelineStep`: `type MotionTimelineStep = { target: MotionTargets; keyframes: MotionTarget; transition?: MotionTransition; at?: number | string; };`
- `MotionTransition`: `type MotionTransition = { type?: 'tween' | 'spring'; duration?: number; delay?: number; easing?: string; stiffness?: number; damping?: number; mass?: number; repeat?: number; direction?: PlaybackDirection; fill?: FillMode; stagger?: number | ((index: number, total: number) => number); velocity?: number; };`
- `MotionValue`: `type MotionValue = string | number | Array<string | number>;`
- `MotionVariant`: `type MotionVariant = MotionTarget & { transition?: MotionTransition };`
- `prefersReducedMotion`: `(mode?: ReducedMotionMode) => boolean`
- `Presence`: `DefineComponent<ExtractPropTypes<{ exit: { type: PropType<MotionDefinition>; required: true; }; }>, () => VNode<RendererNode, RendererElement, { [key: string]: any; }>, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {}, string, PublicProps, ToResolvedProps<ExtractPropTypes<{ exit: { type: PropType<MotionDefinition>; required: true; }; }>, {}>, {}, {}, {}, {}, string, ComponentProvideOptions, true, {}, any>`
- `ReducedMotionMode`: `type ReducedMotionMode = 'user' | 'always' | 'never';`
- `resolveTarget`: `(definition: MotionDefinition, state: keyof MotionDefinition) => MotionTarget | undefined`
- `runMotion`: `(element: Element, definition: MotionDefinition, state?: keyof MotionDefinition) => MotionControls`
- `sequence`: `(steps: Array<[Element, MotionTarget, MotionTransition?]>) => MotionControls`
- `timeline`: `(steps: MotionTimelineStep[], options?: MotionTimelineOptions) => MotionControls`
- `toKeyframes`: `(target: MotionTarget, baseTransform?: string) => Keyframe[]`
- `useMotion`: `(definition: MotionDefinition) => Ref<Element | undefined, Element | undefined>`
- `vMotion`: `Directive<Element, MotionDefinition>`

## ./angular

- `animate`: `(target: Element | null | undefined, keyframes: MotionTarget, transition?: MotionTransition, callbacks?: Pick<MotionDefinition, "onStart" | "onComplete" | "onCancel" | "reducedMotion">) => MotionControls`
- `animateAll`: `(targets: MotionTargets, keyframes: MotionTarget, transition?: MotionBatchTransition) => MotionControls`
- `bindMotion`: `(element: Element, definition: MotionDefinition) => MotionBinding`
- `MotionBatchTransition`: `type MotionBatchTransition = MotionTransition & { stagger?: number | ((index: number, total: number) => number); };`
- `MotionBinding`: `type MotionBinding = (() => void) & { readonly controls: MotionControls; };`
- `MotionController`: `typeof MotionController`
- `MotionControls`: `type MotionControls = { readonly finished: Promise<void>; readonly playState: AnimationPlayState | 'idle'; play(): void; pause(): void; cancel(): void; finish(): void; };`
- `MotionDefinition`: `type MotionDefinition = { initial?: MotionTarget | string; animate?: MotionTarget | string; exit?: MotionTarget | string; whileHover?: MotionTarget | string; whilePress?: MotionTarget | string; whileFocus?: MotionTarget | string; whileInView?: MotionTarget | string; variants?: Record<string, MotionVariant>; transition?: MotionTransition; reducedMotion?: ReducedMotionMode; stagger?: number; onStart?: () => void; onComplete?: () => void; onCancel?: () => void; };`
- `MotionKeyframes`: `type MotionKeyframes = Omit<Keyframe, 'transform'> & { transform?: MotionValue; x?: MotionValue; y?: MotionValue; scale?: MotionValue; scaleX?: MotionValue; scaleY?: MotionValue; rotate?: MotionValue; skewX?: MotionValue; skewY?: MotionValue; transformOrigin?: string | Array<string>; };`
- `MotionTarget`: `type MotionTarget = MotionKeyframes | MotionKeyframes[];`
- `MotionTargets`: `type MotionTargets = Element | Iterable<Element>;`
- `MotionTimelineOptions`: `type MotionTimelineOptions = { labels?: Record<string, number>; };`
- `MotionTimelineStep`: `type MotionTimelineStep = { target: MotionTargets; keyframes: MotionTarget; transition?: MotionTransition; at?: number | string; };`
- `MotionTransition`: `type MotionTransition = { type?: 'tween' | 'spring'; duration?: number; delay?: number; easing?: string; stiffness?: number; damping?: number; mass?: number; repeat?: number; direction?: PlaybackDirection; fill?: FillMode; stagger?: number | ((index: number, total: number) => number); velocity?: number; };`
- `MotionValue`: `type MotionValue = string | number | Array<string | number>;`
- `MotionVariant`: `type MotionVariant = MotionTarget & { transition?: MotionTransition };`
- `prefersReducedMotion`: `(mode?: ReducedMotionMode) => boolean`
- `ReducedMotionMode`: `type ReducedMotionMode = 'user' | 'always' | 'never';`
- `resolveTarget`: `(definition: MotionDefinition, state: keyof MotionDefinition) => MotionTarget | undefined`
- `runMotion`: `(element: Element, definition: MotionDefinition, state?: keyof MotionDefinition) => MotionControls`
- `sequence`: `(steps: Array<[Element, MotionTarget, MotionTransition?]>) => MotionControls`
- `SimurghMotionDirective`: `typeof SimurghMotionDirective`
- `SimurghPresence`: `typeof SimurghPresence`
- `timeline`: `(steps: MotionTimelineStep[], options?: MotionTimelineOptions) => MotionControls`
- `toKeyframes`: `(target: MotionTarget, baseTransform?: string) => Keyframe[]`

## ./svelte

- `animate`: `(target: Element | null | undefined, keyframes: MotionTarget, transition?: MotionTransition, callbacks?: Pick<MotionDefinition, "onStart" | "onComplete" | "onCancel" | "reducedMotion">) => MotionControls`
- `animateAll`: `(targets: MotionTargets, keyframes: MotionTarget, transition?: MotionBatchTransition) => MotionControls`
- `bindMotion`: `(element: Element, definition: MotionDefinition) => MotionBinding`
- `motion`: `(node: Element, definition: MotionDefinition) => { update(next: MotionDefinition): void; destroy(): void; }`
- `MotionBatchTransition`: `type MotionBatchTransition = MotionTransition & { stagger?: number | ((index: number, total: number) => number); };`
- `MotionBinding`: `type MotionBinding = (() => void) & { readonly controls: MotionControls; };`
- `MotionControls`: `type MotionControls = { readonly finished: Promise<void>; readonly playState: AnimationPlayState | 'idle'; play(): void; pause(): void; cancel(): void; finish(): void; };`
- `MotionDefinition`: `type MotionDefinition = { initial?: MotionTarget | string; animate?: MotionTarget | string; exit?: MotionTarget | string; whileHover?: MotionTarget | string; whilePress?: MotionTarget | string; whileFocus?: MotionTarget | string; whileInView?: MotionTarget | string; variants?: Record<string, MotionVariant>; transition?: MotionTransition; reducedMotion?: ReducedMotionMode; stagger?: number; onStart?: () => void; onComplete?: () => void; onCancel?: () => void; };`
- `MotionKeyframes`: `type MotionKeyframes = Omit<Keyframe, 'transform'> & { transform?: MotionValue; x?: MotionValue; y?: MotionValue; scale?: MotionValue; scaleX?: MotionValue; scaleY?: MotionValue; rotate?: MotionValue; skewX?: MotionValue; skewY?: MotionValue; transformOrigin?: string | Array<string>; };`
- `MotionTarget`: `type MotionTarget = MotionKeyframes | MotionKeyframes[];`
- `MotionTargets`: `type MotionTargets = Element | Iterable<Element>;`
- `MotionTimelineOptions`: `type MotionTimelineOptions = { labels?: Record<string, number>; };`
- `MotionTimelineStep`: `type MotionTimelineStep = { target: MotionTargets; keyframes: MotionTarget; transition?: MotionTransition; at?: number | string; };`
- `MotionTransition`: `type MotionTransition = { type?: 'tween' | 'spring'; duration?: number; delay?: number; easing?: string; stiffness?: number; damping?: number; mass?: number; repeat?: number; direction?: PlaybackDirection; fill?: FillMode; stagger?: number | ((index: number, total: number) => number); velocity?: number; };`
- `MotionValue`: `type MotionValue = string | number | Array<string | number>;`
- `MotionVariant`: `type MotionVariant = MotionTarget & { transition?: MotionTransition };`
- `prefersReducedMotion`: `(mode?: ReducedMotionMode) => boolean`
- `ReducedMotionMode`: `type ReducedMotionMode = 'user' | 'always' | 'never';`
- `resolveTarget`: `(definition: MotionDefinition, state: keyof MotionDefinition) => MotionTarget | undefined`
- `runMotion`: `(element: Element, definition: MotionDefinition, state?: keyof MotionDefinition) => MotionControls`
- `sequence`: `(steps: Array<[Element, MotionTarget, MotionTransition?]>) => MotionControls`
- `timeline`: `(steps: MotionTimelineStep[], options?: MotionTimelineOptions) => MotionControls`
- `toKeyframes`: `(target: MotionTarget, baseTransform?: string) => Keyframe[]`

## ./lit

- `animate`: `(target: Element | null | undefined, keyframes: MotionTarget, transition?: MotionTransition, callbacks?: Pick<MotionDefinition, "onStart" | "onComplete" | "onCancel" | "reducedMotion">) => MotionControls`
- `animateAll`: `(targets: MotionTargets, keyframes: MotionTarget, transition?: MotionBatchTransition) => MotionControls`
- `bindMotion`: `(element: Element, definition: MotionDefinition) => MotionBinding`
- `motion`: `(definition: MotionDefinition) => DirectiveResult<typeof MotionDirective>`
- `MotionBatchTransition`: `type MotionBatchTransition = MotionTransition & { stagger?: number | ((index: number, total: number) => number); };`
- `MotionBinding`: `type MotionBinding = (() => void) & { readonly controls: MotionControls; };`
- `MotionControls`: `type MotionControls = { readonly finished: Promise<void>; readonly playState: AnimationPlayState | 'idle'; play(): void; pause(): void; cancel(): void; finish(): void; };`
- `MotionDefinition`: `type MotionDefinition = { initial?: MotionTarget | string; animate?: MotionTarget | string; exit?: MotionTarget | string; whileHover?: MotionTarget | string; whilePress?: MotionTarget | string; whileFocus?: MotionTarget | string; whileInView?: MotionTarget | string; variants?: Record<string, MotionVariant>; transition?: MotionTransition; reducedMotion?: ReducedMotionMode; stagger?: number; onStart?: () => void; onComplete?: () => void; onCancel?: () => void; };`
- `MotionKeyframes`: `type MotionKeyframes = Omit<Keyframe, 'transform'> & { transform?: MotionValue; x?: MotionValue; y?: MotionValue; scale?: MotionValue; scaleX?: MotionValue; scaleY?: MotionValue; rotate?: MotionValue; skewX?: MotionValue; skewY?: MotionValue; transformOrigin?: string | Array<string>; };`
- `MotionTarget`: `type MotionTarget = MotionKeyframes | MotionKeyframes[];`
- `MotionTargets`: `type MotionTargets = Element | Iterable<Element>;`
- `MotionTimelineOptions`: `type MotionTimelineOptions = { labels?: Record<string, number>; };`
- `MotionTimelineStep`: `type MotionTimelineStep = { target: MotionTargets; keyframes: MotionTarget; transition?: MotionTransition; at?: number | string; };`
- `MotionTransition`: `type MotionTransition = { type?: 'tween' | 'spring'; duration?: number; delay?: number; easing?: string; stiffness?: number; damping?: number; mass?: number; repeat?: number; direction?: PlaybackDirection; fill?: FillMode; stagger?: number | ((index: number, total: number) => number); velocity?: number; };`
- `MotionValue`: `type MotionValue = string | number | Array<string | number>;`
- `MotionVariant`: `type MotionVariant = MotionTarget & { transition?: MotionTransition };`
- `prefersReducedMotion`: `(mode?: ReducedMotionMode) => boolean`
- `ReducedMotionMode`: `type ReducedMotionMode = 'user' | 'always' | 'never';`
- `resolveTarget`: `(definition: MotionDefinition, state: keyof MotionDefinition) => MotionTarget | undefined`
- `runMotion`: `(element: Element, definition: MotionDefinition, state?: keyof MotionDefinition) => MotionControls`
- `sequence`: `(steps: Array<[Element, MotionTarget, MotionTransition?]>) => MotionControls`
- `timeline`: `(steps: MotionTimelineStep[], options?: MotionTimelineOptions) => MotionControls`
- `toKeyframes`: `(target: MotionTarget, baseTransform?: string) => Keyframe[]`

## ./scroll

- `scroll`: `(element: Element | null | undefined, keyframes: MotionTarget, options?: ScrollMotionOptions) => MotionControls`
- `ScrollMotionOptions`: `type ScrollMotionOptions = Pick< MotionDefinition, 'reducedMotion' | 'onStart' | 'onComplete' | 'onCancel' > & { target?: Element; range?: [number, number]; once?: boolean; transition?: MotionTransition; };`

## ./layout

- `layout`: `(targets: MotionTargets, update: () => void, options?: LayoutMotionOptions) => MotionControls`
- `LayoutMotionOptions`: `type LayoutMotionOptions = { transition?: MotionTransition; reducedMotion?: ReducedMotionMode; };`

