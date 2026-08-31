// @ts-nocheck -- generated compatibility implementation; public declarations use Preact types.
// Generated from @simurgh-ui/react for Preact compatibility. Do not edit directly.
import { type Direction } from '@simurgh-ui/core';
import React, {
  createContext,
  forwardRef,
  useContext,
  useEffect,
  useState,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
} from 'preact/compat';

type CarouselContextValue = {
  index: number;
  count: number;
  loop: boolean;
  direction: Direction;
  setCount(count: number): void;
  goTo(index: number): void;
};
const CarouselContext =
  /* @__PURE__ */ createContext<CarouselContextValue | null>(null);
const useCarousel = () => {
  const context = useContext(CarouselContext);
  if (!context) throw new Error('Carousel parts require a Carousel root');
  return context;
};

export function Carousel({
  label = 'Carousel',
  direction = 'ltr',
  loop = false,
  defaultIndex = 0,
  onIndexChange,
  onKeyDown,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement> & {
  label?: string;
  direction?: Direction;
  loop?: boolean;
  defaultIndex?: number;
  onIndexChange?: (index: number) => void;
}) {
  const [index, setIndex] = useState(Math.max(0, defaultIndex));
  const [count, setCount] = useState(0);
  const goTo = (next: number) => {
    if (!count) return;
    const resolved = loop
      ? (next + count) % count
      : Math.max(0, Math.min(count - 1, next));
    if (resolved !== index) {
      setIndex(resolved);
      onIndexChange?.(resolved);
    }
  };
  return (
    <CarouselContext.Provider
      value={{ index, count, loop, direction, setCount, goTo }}
    >
      <div
        {...props}
        data-slot="carousel"
        role="region"
        aria-roledescription="carousel"
        aria-label={label}
        dir={direction}
        onKeyDown={(event) => {
          onKeyDown?.(event);
          if (event.defaultPrevented) return;
          const previous = direction === 'rtl' ? 'ArrowRight' : 'ArrowLeft';
          const next = direction === 'rtl' ? 'ArrowLeft' : 'ArrowRight';
          if (event.key === previous || event.key === next) {
            event.preventDefault();
            goTo(index + (event.key === next ? 1 : -1));
          }
        }}
      >
        {children}
      </div>
    </CarouselContext.Provider>
  );
}

export function CarouselContent({
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  const context = useCarousel();
  const slides = React.Children.toArray(children);
  useEffect(() => context.setCount(slides.length), [context, slides.length]);
  return (
    <div {...props} data-slot="carousel-content" aria-live="polite">
      {slides.map((child, index) =>
        React.isValidElement(child)
          ? React.cloneElement(
              child as React.ReactElement<HTMLAttributes<HTMLDivElement>>,
              {
                'aria-label': `${index + 1} of ${slides.length}`,
                'aria-hidden': context.index !== index,
                hidden: context.index !== index,
              },
            )
          : child,
      )}
    </div>
  );
}

export const CarouselItem = /* @__PURE__ */ forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(function CarouselItem(props, ref) {
  return (
    <div
      {...props}
      ref={ref}
      data-slot="carousel-item"
      role="group"
      aria-roledescription="slide"
    />
  );
});

function CarouselControl({
  step,
  label,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { step: -1 | 1; label: string }) {
  const context = useCarousel();
  const unavailable =
    !context.loop &&
    (step < 0 ? context.index <= 0 : context.index >= context.count - 1);
  return (
    <button
      type="button"
      {...props}
      data-slot={step < 0 ? 'carousel-previous' : 'carousel-next'}
      aria-label={label}
      disabled={unavailable || props.disabled}
      onClick={(event) => {
        props.onClick?.(event);
        if (!event.defaultPrevented) context.goTo(context.index + step);
      }}
    />
  );
}
export function CarouselPrevious(
  props: ButtonHTMLAttributes<HTMLButtonElement>,
) {
  return <CarouselControl {...props} step={-1} label="Previous slide" />;
}
export function CarouselNext(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  return <CarouselControl {...props} step={1} label="Next slide" />;
}
