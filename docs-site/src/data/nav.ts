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
    { slug: 'icons', title: 'Иконки', status: 'soon' },
    { slug: 'motion', title: 'Motion', status: 'soon' },
  ],
  components: [
    { slug: 'button', title: 'Button', status: 'ready' },
    { slug: 'list-item', title: 'List Item', status: 'soon' },
    { slug: 'text-field', title: 'Text Field', status: 'soon' },
    { slug: 'pill', title: 'Pill', status: 'soon' },
    { slug: 'tabs', title: 'Tabs', status: 'soon' },
    { slug: 'switch', title: 'Switch · Checkbox · Radio', status: 'soon' },
    { slug: 'top-navigation', title: 'Top Navigation', status: 'soon' },
    { slug: 'bottom-navigation', title: 'Bottom Navigation', status: 'soon' },
  ],
  patterns: [
    { slug: 'trainer-block', title: 'Trainer Block', status: 'soon' },
  ],
};

// Group metadata for rendering sidebar + index pages.
export const navGroups: { key: keyof NavData; label: string; base: string }[] = [
  { key: 'foundations', label: 'Foundations', base: '/foundations' },
  { key: 'components', label: 'Components', base: '/components' },
  { key: 'patterns', label: 'Patterns', base: '/patterns' },
];
