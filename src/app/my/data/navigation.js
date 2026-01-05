// Navigation data for header menus
import { services } from './services';

export const productsMenu = [
  // { label: 'Website Builder', href: '/business/products/website-builder' },
  { label: 'AI Customer Assistant', href: '/business/ai-agent-for-customer-support' },
  // { label: 'E-commerce Platform', href: '/business/' },
  // { label: 'CRM System', href: '/business/' }
];

// Services menu imported from services.js to avoid duplication
// Filter out AI Customer Assistant since it's shown in Products menu
export const servicesMenu = services
  .filter(service => service.value !== 'ai-customer-assistant')
  .map(service => ({
    label: service.label,
    href: service.href
  }));

// export const resourcesMenu = [
//   { label: 'Blog', href: '/business/blog' },
//   { label: 'Case Studies', href: '/business/case-studies' },
//   { label: 'Documentation', href: '/business/docs' },
//   { label: 'Support', href: '/business/support' },
//   { label: 'FAQ', href: '/business/faq' }
// ];

export const navigationMenu = [
  {
    label: 'Products',
    href: '#',
    dropdown: productsMenu
  },
  {
    label: 'Services',
    href: '#', // No direct link, just dropdown
    dropdown: servicesMenu
  },
  // {
  //   label: 'Resources',
  //   href: '#',
  //   dropdown: resourcesMenu
  // }
];

export default navigationMenu;
