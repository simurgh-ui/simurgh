import { useEffect } from 'react';
import { bindMotion, type MotionBinding, type MotionDefinition } from '@simurgh-ui/motion';

const reveal: MotionDefinition = {
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { type: 'spring', stiffness: 165, damping: 24 },
  reducedMotion: 'user',
};

const revealSoft: MotionDefinition = {
  initial: { opacity: 0, y: 18, scale: 0.985 },
  whileInView: { opacity: 1, y: 0, scale: 1 },
  transition: { type: 'spring', stiffness: 150, damping: 25 },
  reducedMotion: 'user',
};

const lift: MotionDefinition = {
  animate: { y: 0, scale: 1 },
  whileHover: { y: -5, scale: 1.015 },
  whilePress: { y: 0, scale: 0.985 },
  transition: { type: 'spring', stiffness: 280, damping: 24 },
  reducedMotion: 'user',
};

const orbit: MotionDefinition = {
  animate: [{ rotate: '0deg' }, { rotate: '360deg' }],
  transition: { duration: 42, easing: 'linear', repeat: 100 },
  reducedMotion: 'user',
};

function bindAll(selector: string, definition: MotionDefinition, bindings: MotionBinding[]) {
  document.querySelectorAll(selector).forEach((element) => bindings.push(bindMotion(element, definition)));
}

export function MotionLayer() {
  useEffect(() => {
    const bindings: MotionBinding[] = [];
    bindAll('[data-motion="hero"]', reveal, bindings);
    bindAll('[data-motion="reveal"]', revealSoft, bindings);
    bindAll('[data-motion="lift"]', lift, bindings);
    bindAll('[data-motion="orbit"]', orbit, bindings);
    return () => bindings.forEach((dispose) => dispose());
  }, []);
  return null;
}
