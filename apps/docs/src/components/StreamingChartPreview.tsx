import { useEffect, useMemo } from 'react';
import { LineChart } from '@simurgh-ui/react/chart';
import { createChartStream } from '@simurgh-ui/react/chart-stream';
import '@simurgh-ui/styles/chart.css';

export default function StreamingChartPreview() {
  const stream = useMemo(
    () => createChartStream({ capacity: 60, dimensions: ['time', 'value'] as const }),
    [],
  );

  useEffect(() => {
    let value = 52;
    let time = Date.now() - 5_900;

    const appendPoint = () => {
      value = Math.min(86, Math.max(18, value + (Math.random() - 0.48) * 12));
      stream.append({ time: [time], value: [value] });
      time += 100;
    };

    for (let index = 0; index < 60; index += 1) appendPoint();
    const timer = window.setInterval(appendPoint, 100);
    return () => window.clearInterval(timer);
  }, [stream]);

  return (
    <LineChart
      stream={stream}
      x="time"
      xScale="time"
      y="value"
      yDomain={[0, 100]}
      height={280}
      accessibility={{
        title: 'Streaming telemetry chart',
        description: 'A live telemetry value updated ten times per second.',
      }}
    />
  );
}
