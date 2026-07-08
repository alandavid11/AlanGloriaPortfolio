export const SITE_ORIGIN = 'https://www.alangloria.com';

export interface RouteSeo {
  path: string;
  title: string;
  description: string;
}

const setMeta = (selector: string, content: string) => {
  const el = document.head.querySelector<HTMLMetaElement>(selector);
  if (el) el.setAttribute('content', content);
};

export const applySeo = ({ path, title, description }: RouteSeo) => {
  const url = SITE_ORIGIN + path;

  document.title = title;
  setMeta('meta[name="description"]', description);
  setMeta('meta[property="og:title"]', title);
  setMeta('meta[property="og:description"]', description);
  setMeta('meta[property="og:url"]', url);
  setMeta('meta[name="twitter:title"]', title);
  setMeta('meta[name="twitter:description"]', description);

  const canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (canonical) canonical.href = url;
};
