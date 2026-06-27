// Single navigation source — consumed by the sidebar AND the Foundations /
// Components index pages. Mark unbuilt pages status:'soon'.
export type NavStatus = 'ready' | 'soon';

export interface NavItem {
  slug: string;
  title: string;
  status: NavStatus;
}

export interface NavData {
  foundations: NavItem[];
  components: NavItem[];
  patterns: NavItem[];
}

export const nav: NavData = {
  foundations: [
    { slug: 'colour', title: 'Цвета', status: 'ready' },
    { slug: 'typography', title: 'Типографика', status: 'ready' },
    { slug: 'spacing', title: 'Spacing', status: 'ready' },
    { slug: 'radius', title: 'Radius', status: 'ready' },
    { slug: 'size', title: 'Size', status: 'ready' },
    { slug: 'icons', title: 'Иконки и ассеты', status: 'ready' },
    { slug: 'motion', title: 'Motion', status: 'soon' },
  ],
  components: [
    { slug: 'button', title: 'Button', status: 'ready' },
    { slug: 'list-item', title: 'List Item', status: 'ready' },
    { slug: 'text-field', title: 'Text Field', status: 'ready' },
    { slug: 'pill', title: 'Pill', status: 'ready' },
    { slug: 'tabs', title: 'Tabs', status: 'ready' },
    { slug: 'switch', title: 'Switch · Checkbox · Radio', status: 'ready' },
    { slug: 'top-navigation', title: 'Top Navigation', status: 'ready' },
    { slug: 'bottom-navigation', title: 'Bottom Navigation', status: 'ready' },
    { slug: 'trainer-keyboard', title: 'Trainer Keyboard', status: 'ready' },
  ],
  patterns: [
    { slug: 'trainer-block', title: 'Trainer Block', status: 'ready' },
  ],
};

// Group metadata for rendering sidebar + index pages.
export const navGroups: { key: keyof NavData; label: string; base: string }[] = [
  { key: 'foundations', label: 'Foundations', base: '/foundations' },
  { key: 'components', label: 'Components', base: '/components' },
  { key: 'patterns', label: 'Patterns', base: '/patterns' },
];
