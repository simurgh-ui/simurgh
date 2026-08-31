// Generated from @simurgh-ui/react for Preact compatibility. Do not edit directly.
import {
  Children,
  cloneElement,
  createElement,
  forwardRef,
  isValidElement,
  useEffect,
  useRef,
  useState,
  type ElementType,
  type ReactElement,
  type ReactNode,
  type Ref,
} from 'preact/compat';
import {
  bindMotion,
  runMotion,
  type MotionControls,
  type MotionDefinition,
} from './index.js';

export function useMotion<T extends Element>(definition: MotionDefinition) {
  const ref = useRef<T>(null);
  const controls = useRef<MotionControls | null>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const binding = bindMotion(element, definition);
    controls.current = binding.controls;
    return binding;
  }, [definition]);
  return { ref, controls };
}

type AnimatedProps = Record<string, unknown> & {
  motion?: MotionDefinition;
};

function animatedElement(tag: ElementType) {
  return forwardRef<Element, AnimatedProps>(function Animated(
    { motion, ...props },
    forwarded,
  ) {
    const local = useRef<Element | null>(null);
    useEffect(
      () =>
        local.current && motion ? bindMotion(local.current, motion) : undefined,
      [motion],
    );
    const ref = (node: Element | null) => {
      local.current = node;
      if (typeof forwarded === 'function') forwarded(node);
      else if (forwarded) forwarded.current = node;
    };
    return createElement(tag, { ...props, ref });
  });
}

export const animated = new Proxy(
  {} as Record<string, ReturnType<typeof animatedElement>>,
  {
    get(cache, tag: string) {
      return (cache[tag] ??= animatedElement(tag as ElementType));
    },
  },
);

type PresenceProps = {
  children: ReactNode;
  exit?: MotionDefinition;
};

export function Presence({ children, exit }: PresenceProps) {
  const incoming = Children.toArray(children).filter(
    isValidElement,
  ) as ReactElement[];
  const [rendered, setRendered] = useState(incoming);
  const nodes = useRef(new Map<string, Element>());
  const exits = useRef(new Map<string, MotionControls>());
  useEffect(() => {
    const keys = new Set(
      incoming.map((child, index) => String(child.key ?? index)),
    );
    for (const key of keys) {
      exits.current.get(key)?.cancel();
      exits.current.delete(key);
    }
    setRendered((current) => {
      const retained = current.filter(
        (child, index) => !keys.has(String(child.key ?? index)),
      );
      return [...incoming, ...retained];
    });
    for (const [key, node] of nodes.current) {
      if (!keys.has(key) && exit && !exits.current.has(key)) {
        const controls = runMotion(node, exit, 'exit');
        exits.current.set(key, controls);
        controls.finished.then(() => {
          if (exits.current.get(key) !== controls) return;
          setRendered((current) =>
            current.filter(
              (child, index) => String(child.key ?? index) !== key,
            ),
          );
          nodes.current.delete(key);
          exits.current.delete(key);
        });
      }
    }
  }, [children, exit]);
  return rendered.map((child, index) => {
    const key = String(child.key ?? index);
    return cloneElement(child, {
      key,
      ref: (node: Element | null) => {
        if (node) nodes.current.set(key, node);
      },
    } as { key: string; ref: Ref<Element> });
  });
}

export * from './index.js';
