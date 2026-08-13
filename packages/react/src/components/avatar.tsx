import {
  forwardRef,
  useEffect,
  useState,
  type HTMLAttributes,
  type ImgHTMLAttributes,
  type ReactNode,
} from 'react';

export const Avatar = /* @__PURE__ */ forwardRef<
  HTMLSpanElement,
  HTMLAttributes<HTMLSpanElement> & {
    src?: string;
    alt: string;
    fallback: ReactNode;
    imageProps?: ImgHTMLAttributes<HTMLImageElement>;
  }
>(function Avatar({ src, alt, fallback, imageProps, ...props }, ref) {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => setLoaded(false), [src]);
  return (
    <span ref={ref} data-state={loaded ? 'loaded' : 'fallback'} {...props}>
      {src ? (
        <img
          {...imageProps}
          src={src}
          alt={alt}
          hidden={!loaded}
          onLoad={(event) => {
            setLoaded(true);
            imageProps?.onLoad?.(event);
          }}
          onError={(event) => {
            setLoaded(false);
            imageProps?.onError?.(event);
          }}
        />
      ) : null}
      {!loaded ? <span data-part="fallback">{fallback}</span> : null}
    </span>
  );
});
