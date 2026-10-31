import { ScreenshotItem } from '../components/ScreenshotGallery';

export const WALLETME_URL = 'https://walletme.mx';
export const POSME_APP_STORE_URL = 'https://apps.apple.com/mx/app/posme/id6824278802';

/**
 * Real adoption numbers, filled in by Alan. Every surface that reads this hides itself
 * while it is empty, so a stat only ships once it is a verified fact.
 */
export const LIVE_STATS: { value: string; label: string }[] = [];

/** Same set and sizes as the «Negocios que ya usan WalletMe» strip on walletme.mx, each shown with the business's permission. */
export const CLIENTS = [
  { file: 'cafeteria-9-6', name: 'Cafetería 9/6', height: 30 },
  { file: 'nunki', name: 'Nunki', height: 46 },
  { file: 'pastel-de-crepas', name: 'Pastel de crepas', height: 48 },
  { file: 'pam', name: 'Pam, pan y algo más', height: 40 },
  { file: 'freshy', name: 'Freshy', height: 44 },
  { file: 'johnys', name: "Johny's Burgers & BBQ", height: 34 },
  { file: 'viva-la-mexa', name: 'Viva la Mexa', height: 42 },
  { file: 'casa-le', name: 'Casa Lè', height: 32 },
  { file: 'amai', name: 'Amai Matcha Bar', height: 38 },
  { file: 'deybs', name: 'Deybs Barbecue', height: 32 },
  { file: 'wild-boba', name: 'Wild Boba', height: 18 },
  { file: 'don-cafe', name: 'Don Café', height: 50 },
] as const;

export type EcosystemTile = {
  title: string;
  detail: string;
  layout: 'hero' | 'tall' | 'square' | 'wide';
} & ({ kind: 'image'; src: string; alt: string; fit?: 'cover' | 'phone' } | { kind: 'passes' });

export const ECOSYSTEM_TILES: EcosystemTile[] = [
  {
    kind: 'image',
    layout: 'hero',
    src: '/posme-01-caja.webp',
    alt: 'POSMe register running at a café counter',
    title: 'POSMe register',
    detail: 'Windows, Android tablets and iPad. One TypeScript core on Tauri 2 and Rust that keeps selling without internet.',
  },
  {
    kind: 'image',
    layout: 'tall',
    fit: 'phone',
    src: '/posme-iphone-inicio.webp',
    alt: 'POSMe for iPhone home with today versus last week',
    title: 'POSMe for iPhone',
    detail: 'SwiftUI owner app on the App Store.',
  },
  {
    kind: 'passes',
    layout: 'square',
    title: 'Wallet loyalty pass',
    detail: 'Apple Wallet and Google Wallet, updated live.',
  },
  {
    kind: 'image',
    layout: 'square',
    src: '/walletme-07-tag.webp',
    alt: 'Cashier tapping a WalletMe NFC tag to a customer phone',
    title: 'Tap to stamp',
    detail: 'Signed NFC taps, verified server-side.',
  },
  {
    kind: 'image',
    layout: 'wide',
    src: '/posme-04-factura.webp',
    alt: 'POSMe CFDI 4.0 e-invoicing from the register',
    title: 'CFDI 4.0 invoicing',
    detail: 'Global invoices, cancellations and self-invoicing from a QR on the ticket.',
  },
  {
    kind: 'image',
    layout: 'wide',
    src: '/posme-03-inventario.webp',
    alt: 'POSMe inventory with recipes, costs and low-stock alerts',
    title: 'Inventory and costs',
    detail: 'Recipes that deduct ingredients on every sale, alerts and a supplier shopping list.',
  },
];

export const ENGINEERING_PILLARS = [
  {
    title: 'Offline-first sync',
    body: 'Each register runs on its own SQLite and syncs through per-device cursors. Money movements are never deleted, only corrected with history and undo.',
  },
  {
    title: 'NFC that can’t be copied',
    body: 'NTAG 424 DNA tags emit a one-time SUN message per tap, and the server checks its CMAC before adding a stamp.',
  },
  {
    title: 'SAT-compliant invoicing',
    body: 'CFDI 4.0 under the 2026 SAT rules: global invoices, withholdings, cancellations and QR self-invoicing, tested against the sandbox.',
  },
  {
    title: 'Releases that never break a sale',
    body: 'Signed auto-updates over my own channel, installed only between sales. A release won’t publish if any of the 91 test suites fails.',
  },
];

export const POS_SCREENSHOTS: ScreenshotItem[] = [
  { src: '/posme-01-caja.webp', alt: 'POSMe register running at a café counter', label: 'Register' },
  { src: '/posme-02-cliente.webp', alt: 'POSMe sale with a WalletMe customer identified by an NFC tap', label: 'NFC loyalty' },
  { src: '/posme-03-inventario.webp', alt: 'POSMe inventory with recipes, costs and low-stock alerts', label: 'Inventory' },
  { src: '/posme-04-factura.webp', alt: 'POSMe CFDI 4.0 e-invoicing from the register', label: 'CFDI invoicing' },
  { src: '/posme-05-agenda.webp', alt: 'POSMe appointment book per specialist for salons', label: 'Agenda' },
  { src: '/posme-06-tablet.webp', alt: 'POSMe on an Android tablet at a taquería', label: 'Android tablet' },
  { src: '/walletme-07-tag.webp', alt: 'Cashier tapping a WalletMe NFC tag to a customer phone', label: 'Tap to stamp' },
];

export const POSME_IPHONE_SCREENSHOTS: ScreenshotItem[] = [
  { src: '/posme-iphone-inicio.webp', alt: 'POSMe for iPhone home with today versus last week', label: 'Today' },
  { src: '/posme-iphone-ventas.webp', alt: 'POSMe for iPhone sales list per ticket', label: 'Sales' },
  { src: '/posme-iphone-corte.webp', alt: 'POSMe for iPhone cash count expected versus counted', label: 'Cash count' },
  { src: '/posme-iphone-compras.webp', alt: 'POSMe for iPhone supplier shopping list', label: 'Purchasing' },
  { src: '/posme-iphone-analisis.webp', alt: 'POSMe for iPhone monthly analysis report', label: 'Monthly report' },
  { src: '/posme-autofactura.webp', alt: 'Customer self-invoicing page opened from the ticket QR', label: 'Self-invoice' },
];
