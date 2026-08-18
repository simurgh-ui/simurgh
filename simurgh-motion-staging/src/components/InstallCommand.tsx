import { useState } from 'react';
import { copyInstallCommand } from '../lib/interactions';

const command = 'pnpm dlx @simurgh-ui/cli init';
export function InstallCommand() {
  const [label, setLabel] = useState('Copy');
  async function copy() {
    try { setLabel(await copyInstallCommand(command, navigator.clipboard)); setTimeout(() => setLabel('Copy'), 1600); }
    catch { setLabel('Select'); }
  }
  return <div className="install-command"><span className="prompt" aria-hidden="true">$</span><code>{command}</code><button type="button" onClick={copy} aria-label="Copy installation command">{label}</button></div>;
}
