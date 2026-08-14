import { readdir } from 'node:fs/promises';
import { describe, expect, it } from 'vitest';
import {
  getIcon,
  iconGroups,
  iconNames,
  icons,
  renderIconSvg,
} from '../src/catalog.js';
import { iconCategoryGroups, iconMetadata } from '../src/metadata.js';
import { SimurghIcon } from '../src/react-dynamic.js';
import {
  Admin,
  AlarmOff,
  Analytics,
  Api,
  ArrowLeft,
  BarChart,
  BatteryCharging,
  Bug,
  Calendar,
  CalendarCheck,
  CameraOff,
  CartCheck,
  Checkout,
  Code,
  Copy,
  CreditCard,
  DeviceDesktop,
  DonutChart,
  Download,
  FaceId,
  File,
  Fingerprint,
  FolderOpen,
  Fullscreen,
  GitBranch,
  Globe,
  Headset,
  Home,
  LayoutGrid,
  LocationCheck,
  Lock,
  MailOpen,
  Map,
  MessageDots,
  MicrophoneOff,
  Monitor,
  Pause,
  Play,
  Podcast,
  Router,
  SecurityScan,
  Settings,
  ShoppingCart,
  Success,
  TargetChart,
  Train,
  User,
  UserCheck,
  UserSettings,
  Verified,
} from '../src/react.js';

describe('navigation icon catalog', () => {
  it('contains 474 unique icons grouped by functionality', () => {
    expect(iconNames).toHaveLength(474);
    expect(new Set(iconNames).size).toBe(474);
    expect(Object.values(iconGroups).flat()).toHaveLength(474);
  });

  it('provides complete discovery metadata for every icon', () => {
    expect(Object.keys(iconMetadata)).toHaveLength(iconNames.length);
    expect(Object.keys(iconCategoryGroups)).toHaveLength(12);
    for (const name of iconNames) {
      const metadata = iconMetadata[name];
      expect(metadata.keywords.length, name).toBeGreaterThan(0);
      expect(metadata.intendedUse, name).toBeTruthy();
      expect(metadata.discouragedUse, name).toBeTruthy();
      expect(metadata.variantFamily, name).toBeTruthy();
      expect(['single-color', 'multicolor']).toContain(metadata.visualStyle);
    }
    expect(iconMetadata.trash.aliases).toContain('delete');
    expect(iconMetadata['favorite-filled'].variantFamily).toBe('favorite');
  });

  it('generates one definition and framework module for every SVG', async () => {
    const sourceRoot = new URL('../src/', import.meta.url);
    const counts = await Promise.all(
      ['definitions', 'react-icons', 'vue-icons', 'angular-icons'].map(
        async (directory) =>
          (await readdir(new URL(`${directory}/`, sourceRoot))).length,
      ),
    );
    expect(counts).toEqual([474, 474, 474, 474]);
  });

  it('resolves icons and renders accessible SVG', () => {
    expect(getIcon('home')).toBe(icons.home);
    expect(renderIconSvg('arrow-right', { title: 'Next' })).toContain(
      'aria-label="Next"',
    );
    expect(renderIconSvg('arrow-right', { title: 'Next' })).toContain(
      'role="img"',
    );
    expect(renderIconSvg('menu')).toContain('aria-hidden="true"');
    expect(renderIconSvg('menu')).toContain('focusable="false"');
    expect(renderIconSvg('menu')).not.toContain('aria-label=');
    expect(renderIconSvg('menu', { colorMode: 'currentColor' })).toContain(
      'fill="currentColor"',
    );
    expect(renderIconSvg('menu')).toContain('var(--simurgh-icon-primary');
  });

  it('mirrors directional icons in RTL', () => {
    expect(renderIconSvg('arrow-right', { direction: 'rtl' })).toContain(
      'scale(-1 1)',
    );
    expect(renderIconSvg('home', { direction: 'rtl' })).not.toContain(
      'scale(-1 1)',
    );
  });

  it('keeps semantic direction separate from physical and conventional direction', () => {
    const directional = Object.values(icons)
      .filter((icon) => icon.direction === 'directional')
      .map((icon) => icon.name)
      .sort();
    expect(directional).toEqual(
      [
        'arrow-down',
        'arrow-left',
        'arrow-right',
        'arrow-up',
        'chevron-left',
        'chevron-right',
        'chevrons-left',
        'chevrons-right',
        'corner-down-left',
        'corner-down-right',
        'corner-up-left',
        'corner-up-right',
        'enter',
        'exit',
        'external-link',
        'forward',
        'redo',
        'reply',
        'send',
        'undo',
      ].sort(),
    );
    for (const physical of [
      'navigation-arrow',
      'play',
      'skip-next',
      'skip-previous',
      'trend-up',
      'trend-down',
      'map-pin',
    ]) {
      expect(icons[physical as keyof typeof icons].direction, physical).toBe(
        'neutral',
      );
    }
  });

  it('exports named components alongside the dynamic component', () => {
    expect(ArrowLeft.displayName).toBe('ArrowLeft');
    expect(Home.displayName).toBe('Home');
    expect(SimurghIcon).toBeTypeOf('object');
    expect(Copy.displayName).toBe('Copy');
    expect(Download.displayName).toBe('Download');
    expect(Settings.displayName).toBe('Settings');
    expect(Success.displayName).toBe('Success');
    expect(Verified.displayName).toBe('Verified');
    expect(File.displayName).toBe('File');
    expect(FolderOpen.displayName).toBe('FolderOpen');
    expect(LayoutGrid.displayName).toBe('LayoutGrid');
    expect(Fullscreen.displayName).toBe('Fullscreen');
    expect(MessageDots.displayName).toBe('MessageDots');
    expect(MailOpen.displayName).toBe('MailOpen');
    expect(MicrophoneOff.displayName).toBe('MicrophoneOff');
    expect(Headset.displayName).toBe('Headset');
    expect(User.displayName).toBe('User');
    expect(UserCheck.displayName).toBe('UserCheck');
    expect(UserSettings.displayName).toBe('UserSettings');
    expect(Admin.displayName).toBe('Admin');
    expect(Calendar.displayName).toBe('Calendar');
    expect(CalendarCheck.displayName).toBe('CalendarCheck');
    expect(AlarmOff.displayName).toBe('AlarmOff');
    expect(Play.displayName).toBe('Play');
    expect(Pause.displayName).toBe('Pause');
    expect(CameraOff.displayName).toBe('CameraOff');
    expect(Podcast.displayName).toBe('Podcast');
    expect(ShoppingCart.displayName).toBe('ShoppingCart');
    expect(CartCheck.displayName).toBe('CartCheck');
    expect(CreditCard.displayName).toBe('CreditCard');
    expect(Checkout.displayName).toBe('Checkout');
    expect(BarChart.displayName).toBe('BarChart');
    expect(DonutChart.displayName).toBe('DonutChart');
    expect(Analytics.displayName).toBe('Analytics');
    expect(TargetChart.displayName).toBe('TargetChart');
    expect(Monitor.displayName).toBe('Monitor');
    expect(Router.displayName).toBe('Router');
    expect(BatteryCharging.displayName).toBe('BatteryCharging');
    expect(DeviceDesktop.displayName).toBe('DeviceDesktop');
    expect(Lock.displayName).toBe('Lock');
    expect(Fingerprint.displayName).toBe('Fingerprint');
    expect(FaceId.displayName).toBe('FaceId');
    expect(SecurityScan.displayName).toBe('SecurityScan');
    expect(Map.displayName).toBe('Map');
    expect(LocationCheck.displayName).toBe('LocationCheck');
    expect(Globe.displayName).toBe('Globe');
    expect(Train.displayName).toBe('Train');
    expect(Code.displayName).toBe('Code');
    expect(GitBranch.displayName).toBe('GitBranch');
    expect(Bug.displayName).toBe('Bug');
    expect(Api.displayName).toBe('Api');
  });
});
