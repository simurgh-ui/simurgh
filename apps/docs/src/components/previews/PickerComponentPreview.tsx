import { Calendar } from '@simurgh-ui/react/calendar';
import { DatePicker } from '@simurgh-ui/react/date-picker';
import '@simurgh-ui/styles/calendar.css';
import '@simurgh-ui/styles/date-picker.css';

type Props = { component: 'calendar' | 'date-picker' };

export default function PickerComponentPreview({ component }: Props) {
  if (component === 'calendar')
    return <Calendar label="Appointment calendar" defaultMonth="2026-08" defaultValue="2026-08-12" name="appointment-date" />;
  return <DatePicker label="Appointment calendar" defaultMonth="2026-08" defaultValue="2026-08-12" name="appointment-date" />;
}
