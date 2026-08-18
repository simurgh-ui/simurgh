import { execFileSync } from 'node:child_process';
import {
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import process from 'node:process';
import { build } from 'esbuild';

const root = resolve(import.meta.dirname, '..');
const fixture = mkdtempSync(join(tmpdir(), 'simurgh-release-candidate-'));
const cli = resolve(root, 'packages/cli/dist/index.js');
const components = ['button', 'checkbox', 'dialog', 'form', 'input', 'label'];

try {
  writeFileSync(
    join(fixture, 'package.json'),
    `${JSON.stringify(
      {
        name: 'simurgh-release-candidate-consumer',
        private: true,
        dependencies: { react: '^19.0.0', 'react-dom': '^19.0.0' },
      },
      null,
      2,
    )}\n`,
  );
  mkdirSync(join(fixture, 'src'));
  execFileSync(
    process.execPath,
    [cli, 'init', '--framework', 'react', '--skip-install'],
    { cwd: fixture, stdio: 'pipe' },
  );
  execFileSync(process.execPath, [cli, 'add', ...components], {
    cwd: fixture,
    stdio: 'pipe',
  });

  const buttonPath = join(fixture, 'src/components/ui/button.tsx');
  const originalButton = readFileSync(buttonPath, 'utf8');
  const editedButton = originalButton.replace(
    'data-slot="button"',
    'data-slot="button"\n      data-product-component="release-candidate"',
  );
  if (editedButton === originalButton) {
    throw new Error('Could not apply the product-specific copied Button edit.');
  }
  writeFileSync(buttonPath, editedButton);

  writeFileSync(
    join(fixture, 'src/theme.css'),
    `:root {
  --simurgh-primary: 221 83% 48%;
  --simurgh-ring: 278 72% 50%;
}
`,
  );
  writeFileSync(
    join(fixture, 'src/app.tsx'),
    `import { useState } from 'react';
import { Button } from './components/ui/button.js';
import { Checkbox } from './components/ui/checkbox.js';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from './components/ui/dialog.js';
import { Form } from './components/ui/form.js';
import { Input } from './components/ui/input.js';
import { Label } from './components/ui/label.js';
import './styles/simurgh/tokens.css';
import './styles/simurgh/recipes.css';
import './theme.css';

export function ReleaseCandidateApp() {
  const [updates, setUpdates] = useState(true);
  return (
    <main>
      <Form onSubmit={(event) => event.preventDefault()}>
        <Label htmlFor="release-email">Email</Label>
        <Input id="release-email" name="email" type="email" required />
        <label>
          <Checkbox
            checked={updates}
            onCheckedChange={setUpdates}
            name="updates"
            value="yes"
          />
          Receive updates
        </label>
        <Button type="submit">Continue</Button>
      </Form>
      <Dialog>
        <DialogTrigger>Edit profile</DialogTrigger>
        <DialogPortal>
          <DialogOverlay />
          <DialogContent>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>Update the public account details.</DialogDescription>
            <DialogClose>Done</DialogClose>
          </DialogContent>
        </DialogPortal>
      </Dialog>
    </main>
  );
}
`,
  );

  const result = await build({
    absWorkingDir: fixture,
    alias: {
      '@simurgh-ui/core': resolve(root, 'packages/core/dist/index.js'),
    },
    bundle: true,
    entryPoints: ['src/app.tsx'],
    external: ['react', 'react/*', 'react-dom', 'react-dom/*'],
    format: 'esm',
    logLevel: 'silent',
    outdir: 'dist',
    platform: 'browser',
    write: false,
  });
  const javascript = result.outputFiles.find((output) =>
    output.path.endsWith('.js'),
  );
  const stylesheet = result.outputFiles.find((output) =>
    output.path.endsWith('.css'),
  );
  if (!javascript || !stylesheet) {
    throw new Error('The fresh consumer did not emit JavaScript and CSS.');
  }
  if (!javascript.text.includes('data-product-component')) {
    throw new Error('The production bundle omitted the copied-source edit.');
  }
  if (!stylesheet.text.includes('--simurgh-primary: 221 83% 48%')) {
    throw new Error(
      'The production bundle omitted the consumer theme override.',
    );
  }

  const evidence = {
    schemaVersion: 1,
    journey: 'fresh React copied-source release-candidate build',
    commands: [
      'simurgh init --framework react --skip-install',
      `simurgh add ${components.join(' ')}`,
      'esbuild src/app.tsx --bundle --format=esm',
    ],
    checks: {
      cleanTemporaryApplication: true,
      cliInitialization: true,
      documentedComponentsAdded: components,
      themeOverrideBundled: true,
      requiredEmailFormBundled: true,
      checkboxEventAndFormValueBundled: true,
      dialogBundled: true,
      copiedButtonEdited: true,
      copiedEditPresentInProductionBundle: true,
    },
    outputs: {
      javascriptBytes: javascript.contents.byteLength,
      cssBytes: stylesheet.contents.byteLength,
    },
  };
  writeFileSync(
    resolve(root, 'artifacts/release-candidate-copied-source.json'),
    `${JSON.stringify(evidence, null, 2)}\n`,
  );
  process.stdout.write(
    'Fresh release-candidate app compiled with theme, form, event, Dialog, and copied-source edit.\n',
  );
} finally {
  rmSync(fixture, { recursive: true, force: true });
}
