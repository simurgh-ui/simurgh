import type { ChartValue } from './charts.js';

export type ChartExportPoint = { seriesId: string; index: number; xValue: ChartValue; yValue: number };

export function chartToCsv(points: readonly ChartExportPoint[], delimiter = ','): string {
  const escape = (value: unknown) => {
    const text = value instanceof Date ? value.toISOString() : String(value ?? '');
    return /["\r\n,]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
  };
  return [['series', 'index', 'x', 'y'], ...points.map((point) => [point.seriesId, point.index, point.xValue, point.yValue])]
    .map((row) => row.map(escape).join(delimiter)).join('\r\n');
}

export function svgToDataUri(svg: string): string {
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

export function downloadChartBlob(blob: Blob, filename: string): void {
  if (typeof document === 'undefined') throw new Error('Chart downloads require a browser document.');
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

export async function svgToPng(svg: string, width: number, height: number): Promise<Blob> {
  if (typeof Image === 'undefined' || typeof document === 'undefined') throw new Error('PNG export requires a browser document.');
  const image = new Image();
  image.src = svgToDataUri(svg);
  await new Promise<void>((resolve, reject) => { image.onload = () => resolve(); image.onerror = () => reject(new Error('Unable to render SVG for PNG export.')); });
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext('2d');
  if (!context) throw new Error('PNG export requires a 2D canvas context.');
  context.drawImage(image, 0, 0, width, height);
  return new Promise((resolve, reject) => canvas.toBlob((blob) => blob ? resolve(blob) : reject(new Error('Unable to encode PNG export.')), 'image/png'));
}

export async function copyChartText(text: string): Promise<void> {
  if (!globalThis.navigator?.clipboard) throw new Error('Clipboard export requires navigator.clipboard.');
  await globalThis.navigator.clipboard.writeText(text);
}

export function printChart(svg: string): void {
  if (typeof window === 'undefined') throw new Error('Print export requires a browser window.');
  const printWindow = window.open('', '_blank');
  if (!printWindow) throw new Error('Unable to open print window.');
  printWindow.document.body.innerHTML = svg;
  printWindow.print();
}
