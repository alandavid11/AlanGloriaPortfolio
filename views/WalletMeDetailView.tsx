import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ArrowUpRight, Smartphone, Tablet } from 'lucide-react';
import { ScreenshotGallery } from '../components/ScreenshotGallery';
import { ClientLogos } from '../components/home/ClientLogos';
import {
  LIVE_STATS,
  POSME_APP_STORE_URL,
  POSME_CAJA_APP_STORE_URL,
  POSME_IPHONE_SCREENSHOTS,
  POS_SCREENSHOTS,
  WALLETME_URL,
} from '../data/walletme';

const VIOLET = '#A78BFA';
const MUTED = 'rgba(255,255,255,0.6)';
const CARD_BG = 'rgba(255,255,255,0.04)';
const CARD_BORDER = 'rgba(255,255,255,0.08)';

const SALE_FLOW = [
  { step: 'Tap', detail: 'The cashier taps the NFC tag to the customer’s phone.' },
  { step: 'Identify', detail: 'The customer appears in POSMe with their name and stamps.' },
  { step: 'Charge', detail: 'Cash, card, transfer or mixed, with the tip kept apart from the sale.' },
  { step: 'Stamp', detail: 'The stamp lands in Apple Wallet or Google Wallet with a lock-screen alert.' },
  { step: 'Invoice', detail: 'The ticket prints a QR the customer scans to invoice themselves.' },
  { step: 'Owner', detail: 'The sale shows up on the owner’s iPhone, wherever they are.' },
];

const PIECES: [string, string, string][] = [
  ['WalletMe pass', 'Apple Wallet · Google Wallet', 'Stamp card, rewards, Bronze, Silver and Gold tiers, promos on the lock screen, birthdays, gift cards and points or cashback on one pass.'],
  ['NFC tags', 'NTAG 424 DNA with SUN', 'Give a new customer their card or add a stamp with one tap. Every tap is signed and can’t be copied.'],
  ['POSMe register', 'Windows · Android tablets', 'The point of sale with WalletMe built in. Works offline, prints tickets and kitchen orders, opens the cash drawer.'],
  ['POSMe Caja', 'iPad · App Store', 'The same register core on iPad, published on the App Store.'],
  ['POSMe Lavado', 'iPad Air 1 · iPadOS 12', 'A car wash register on hardware the App Store no longer supports, installed ad hoc.'],
  ['POSMe for iPhone', 'SwiftUI · App Store', 'The owner app: sales against last week, every ticket and cash count, menu edits, corrections, invoicing and alerts.'],
  ['POSMe Admin', 'Internal iOS app', 'My operations app, with push alerts for new businesses and NFC tag orders ready to ship.'],
  ['Owner dashboard', 'Next.js · walletme.mx', 'Card design editor, promotions, Apple Health style stats, sales, inventory, invoices, and a ⌘K search across 182 features.'],
];

const ARCHITECTURE = [
  'One core, many shells. The register is a single TypeScript core that runs in Tauri 2 (React + Rust) on Windows, Android tablets and iPad, and inside a native UIKit shell with SQLite and a Bluetooth printer on an iPad Air 1 running iPadOS 12, where the App Store no longer accepts builds.',
  'Offline-first by design. Every register keeps selling, printing and closing cash without internet on a local SQLite database with versioned migrations. Changes sync through per-device cursors against a shared rows table in Postgres, and the newest version wins.',
  'Nothing is ever deleted. Cancelling, restoring or correcting a payment or a tip is stored as an edit with its reason, history and undo, so every cash count can be rebuilt from its movements.',
  'Concurrent edits are safe. The menu editor writes with compare-and-swap, so a stale edit from another register or the owner’s phone gets a 409 instead of silently overwriting newer data.',
  'NFC that can’t be cloned. Tags are NTAG 424 DNA with Secure Unique NFC: each tap produces a one-time URL with a counter and a CMAC that the server verifies before it adds a stamp.',
  'Wallet passes as a live surface. Apple Wallet passes are served through the PassKit web service and Google Wallet passes through the Google Wallet API, so stamps, tiers and promos reach the customer’s phone in seconds.',
  'Mexican e-invoicing. CFDI 4.0 through Facturapi following the 2026 SAT rules, with global invoices, withholdings, cancellations and credit notes, and self-invoicing from a QR on the ticket, tested against the sandbox.',
  'Releases that never break a sale. Signed automatic updates for Windows and Android ship over my own channel, download in the background and only install between sales. Publishing runs the 91 test suites first and stops on any failure, and verification scripts use mutations to prove each check catches the bug it guards.',
];

const AI_IN_PRODUCTION = [
  'The model never computes the numbers. My code calculates every KPI, chart and inventory suggestion, and Claude only explains them under a hard rule: no new sums, averages or percentages. No customer data leaves; the payload carries counts only.',
  'Menu import from a photo. A new business sends a photo, a PDF or a spreadsheet of its menu, and Claude returns categories, products, sizes and modifiers through a strict JSON schema. The owner reviews everything before it is saved, and the prompt treats the menu as data, never as instructions.',
  'A monthly analysis on the owner’s iPhone. Every business goes into one Batch API request at half the price, with an identical system prompt cached for an hour. Whatever the batch could not finish is retried live with a model fallback, and months with fewer than 30 sales skip the AI call.',
  'Safe to run twice. The monthly job is idempotent: two runs, even at the same time, end in the same state and send one push per owner. A test script runs the whole pipeline against an in-memory database and fake API clients, so it cannot touch production or spend on the API.',
];
const FEATURES = [
  'Menu with sizes, extras and step-by-step combos, editable straight from the selling screen, or imported from a photo of a paper menu with AI.',
  'Open tabs shared by every register in a branch, split evenly or by item when it is time to pay.',
  'Tips kept apart from sales and reconciled per payment method and per person in the cash count.',
  'Blind cash counts per register and per cashier, with alerts to the owner when money is missing.',
  'Inventory with recipes: a latte deducts its coffee and its milk, with low-stock alerts and a supplier shopping list ready for WhatsApp.',
  'Expenses, monthly profit, events with deposits, and an AI monthly analysis on the 1st.',
  'Branches and extra registers, with per-branch prices and products, and role permissions that hide what a person can’t do.',
  'Appointment book per specialist for salons and barbershops, with commissions in the cash count and reminders in the Wallet pass.',
];

const STACK = [
  'Next.js 16 · TypeScript',
  'Supabase (Postgres · Realtime)',
  'Tauri 2 · React · Rust',
  'SQLite with sync',
  'SwiftUI · UIKit',
  'PassKit · Google Wallet API',
  'Claude API (Batch · structured outputs)',
  'Facturapi (CFDI 4.0)',
  'Stripe · Resend · Vercel',
];

const FACTS: [string, string][] = [
  ['Role', 'Solo founder: product, design, engineering, sales and support'],
  ['Status', 'Live with businesses in Saltillo, Mexico'],
  ['Platforms', 'Windows, Android, iPad, iPhone, Apple Wallet, Google Wallet, web'],
  ['Market', 'Local businesses in Mexico: cafés, taquerías, salons, car washes and more'],
];

const spring = { type: 'spring' as const, stiffness: 100, damping: 20 };

const Kicker: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="font-mono text-[10px] uppercase tracking-[0.2em] mb-2" style={{ color: VIOLET }}>
    {children}
  </p>
);

const DarkCard: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="rounded-2xl p-5" style={{ backgroundColor: CARD_BG, border: `1px solid ${CARD_BORDER}` }}>
    {children}
  </div>
);

/** Bullets whose first sentence is set in bold as the lead. */
const LeadList: React.FC<{ items: string[] }> = ({ items }) => (
  <ul className="space-y-4">
    {items.map((line) => {
      const [lead, ...rest] = line.split('. ');
      return (
        <li key={line} className="flex gap-3 text-sm leading-relaxed" style={{ color: MUTED }}>
          <span className="w-1.5 h-1.5 rounded-[2px] mt-2 shrink-0" style={{ backgroundColor: VIOLET }} />
          <span>
            <strong className="text-zinc-50 font-semibold">{lead}.</strong> {rest.join('. ')}
          </span>
        </li>
      );
    })}
  </ul>
);

export const WalletMeDetailView: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 pb-36 pt-8 md:pt-12">
      <motion.button
        type="button"
        initial={{ opacity: 0, x: -8 }}
        animate={{ opacity: 1, x: 0 }}
        transition={spring}
        onClick={onBack}
        className="flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-200 transition-colors mb-8"
      >
        <ChevronLeft className="w-4 h-4" strokeWidth={1.5} />
        Back to portfolio
      </motion.button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={spring}
        className="flagship px-5 py-8 sm:px-8 md:px-12 md:py-12"
      >
        <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-8 items-center mb-12">
          <div className="flex -space-x-4">
            <img src="/posme-icon.webp" alt="POSMe app icon" className="w-24 h-24 md:w-28 md:h-28 rounded-[1.6rem] ring-1 ring-white/10" />
            <img
              src="/walletme-icon.webp"
              alt="WalletMe logo"
              className="w-24 h-24 md:w-28 md:h-28 rounded-[1.6rem] ring-1 ring-white/10 bg-[#0B0B0F]"
            />
          </div>
          <div>
            <Kicker>Solo founder · Live in production</Kicker>
            <h1 className="text-4xl md:text-5xl font-semibold tracking-[-0.04em]">
              WalletMe <span style={{ color: VIOLET }}>+</span> POSMe
            </h1>
            <p className="mt-4 max-w-[62ch] leading-relaxed text-base md:text-lg" style={{ color: MUTED }}>
              A point of sale and a Wallet loyalty network for local businesses in Mexico. The customer never
              downloads an app: their stamp card lives in Apple Wallet or Google Wallet, the cashier taps an NFC tag,
              and the sale, the stamp and the invoice happen in one go. I built every piece and run it in production.
            </p>
          </div>
        </div>

        {LIVE_STATS.length > 0 && (
          <dl className="mb-12 grid grid-cols-2 md:grid-cols-4 gap-6 border-y border-white/10 py-8">
            {LIVE_STATS.map((stat) => (
              <div key={stat.label} className="flex flex-col gap-1">
                <dt className="order-2 metric-label">{stat.label}</dt>
                <dd className="metric-value">{stat.value}</dd>
              </div>
            ))}
          </dl>
        )}

        <section className="mb-14">
          <Kicker>One sale, end to end</Kicker>
          <ol className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mt-4">
            {SALE_FLOW.map((item, i) => (
              <li key={item.step} className="rounded-2xl p-4" style={{ backgroundColor: CARD_BG, border: `1px solid ${CARD_BORDER}` }}>
                <p className="font-mono text-[11px]" style={{ color: VIOLET }}>
                  0{i + 1}
                </p>
                <p className="text-sm font-semibold text-zinc-50 mt-1">{item.step}</p>
                <p className="text-xs leading-relaxed mt-1" style={{ color: MUTED }}>
                  {item.detail}
                </p>
              </li>
            ))}
          </ol>
        </section>

        <section className="mb-14 space-y-8">
          <ScreenshotGallery items={POS_SCREENSHOTS} variant="desktop" />
          <ScreenshotGallery items={POSME_IPHONE_SCREENSHOTS} variant="phone" />
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-14">
            <section>
              <Kicker>The ecosystem</Kicker>
              <h2 className="text-2xl font-semibold mb-5">Eight pieces, one account</h2>
              <ul className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
                {PIECES.map(([name, platform, detail]) => (
                  <li key={name} className="grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-x-6 gap-y-1 py-4">
                    <div>
                      <p className="text-sm font-semibold text-zinc-50">{name}</p>
                      <p className="font-mono text-[11px] mt-0.5" style={{ color: MUTED }}>
                        {platform}
                      </p>
                    </div>
                    <p className="text-sm leading-relaxed" style={{ color: MUTED }}>
                      {detail}
                    </p>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <Kicker>Engineering</Kicker>
              <h2 className="text-2xl font-semibold mb-5">Architecture and hard problems</h2>
              <LeadList items={ARCHITECTURE} />
            </section>

            <section>
              <Kicker>AI</Kicker>
              <h2 className="text-2xl font-semibold mb-5">Claude in production</h2>
              <LeadList items={AI_IN_PRODUCTION} />
            </section>

            <section>
              <Kicker>Product</Kicker>
              <h2 className="text-2xl font-semibold mb-5">What the register does</h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {FEATURES.map((feature) => (
                  <li
                    key={feature}
                    className="rounded-2xl px-4 py-3.5 text-sm leading-snug"
                    style={{ color: MUTED, backgroundColor: CARD_BG, border: `1px solid ${CARD_BORDER}` }}
                  >
                    {feature}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              <DarkCard>
                <Kicker>At a glance</Kicker>
                <dl className="space-y-5 text-sm mt-4">
                  {FACTS.map(([label, value]) => (
                    <div key={label}>
                      <dt className="font-mono text-[10px] uppercase tracking-wider mb-1" style={{ color: MUTED }}>
                        {label}
                      </dt>
                      <dd className="font-medium text-zinc-50">{value}</dd>
                    </div>
                  ))}
                </dl>
                <a href={WALLETME_URL} target="_blank" rel="noreferrer" className="btn-flagship w-full justify-center mt-8">
                  Visit walletme.mx <ArrowUpRight className="w-4 h-4" />
                </a>
                <a
                  href={POSME_APP_STORE_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full mt-3 inline-flex items-center justify-center gap-2 rounded-full py-3 px-4 text-sm font-medium transition-opacity hover:opacity-80"
                  style={{ color: VIOLET, border: '1px solid rgba(167,139,250,0.35)' }}
                >
                  <Smartphone className="w-4 h-4" strokeWidth={1.5} /> POSMe for iPhone
                </a>
                <a
                  href={POSME_CAJA_APP_STORE_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full mt-3 inline-flex items-center justify-center gap-2 rounded-full py-3 px-4 text-sm font-medium transition-opacity hover:opacity-80"
                  style={{ color: VIOLET, border: '1px solid rgba(167,139,250,0.35)' }}
                >
                  <Tablet className="w-4 h-4" strokeWidth={1.5} /> POSMe Caja for iPad
                </a>
              </DarkCard>
              <DarkCard>
                <Kicker>Stack</Kicker>
                <ul className="space-y-2 mt-4">
                  {STACK.map((item) => (
                    <li
                      key={item}
                      className="w-full text-center rounded-full px-3 py-1.5 text-xs font-medium text-zinc-100"
                      style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: `1px solid ${CARD_BORDER}` }}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </DarkCard>
            </div>
          </div>
        </div>

        <section className="mt-16 pt-10 border-t border-white/10">
          <ClientLogos label="Businesses already using it" />
        </section>
      </motion.div>
    </div>
  );
};
