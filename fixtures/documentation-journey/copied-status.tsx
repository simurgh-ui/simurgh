import type { HTMLAttributes } from 'react';

// Consumer edit: this source-owned component gains a product-specific status hook.
export function CopiedStatus(props: HTMLAttributes<HTMLParagraphElement>) {
  return <p {...props} data-product-status="release-candidate" />;
}
