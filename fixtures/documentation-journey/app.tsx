import { useState } from 'react';
import { Button } from '@simurgh-ui/react/button';
import { Checkbox } from '@simurgh-ui/react/checkbox';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from '@simurgh-ui/react/dialog';
import { Form } from '@simurgh-ui/react/form';
import { Input } from '@simurgh-ui/react/input';
import { Label } from '@simurgh-ui/react/label';
import { CopiedStatus } from './copied-status';
import './theme.css';
import '@simurgh-ui/styles/button.css';
import '@simurgh-ui/styles/checkbox.css';
import '@simurgh-ui/styles/dialog.css';
import '@simurgh-ui/styles/form.css';
import '@simurgh-ui/styles/input.css';
import '@simurgh-ui/styles/label.css';

export function DocumentationJourneyApp() {
  const [updates, setUpdates] = useState(true);

  return (
    <main>
      <CopiedStatus>Release candidate</CopiedStatus>
      <Form onSubmit={(event) => event.preventDefault()}>
        <Label htmlFor="journey-email">Email</Label>
        <Input id="journey-email" name="email" type="email" required />
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
            <DialogDescription>
              Update the public account details.
            </DialogDescription>
            <DialogClose>Done</DialogClose>
          </DialogContent>
        </DialogPortal>
      </Dialog>
    </main>
  );
}
