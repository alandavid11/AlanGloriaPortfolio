import React from 'react';
import { ViewState } from '../types';
import { VIEW_ROUTES } from '../data/routes';

type RouteLinkProps = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
  view: ViewState;
  onNavigate: () => void;
};

/** A real link to an in-app route. A plain click navigates in place; a modified click (new tab or window) follows the href. */
export const RouteLink: React.FC<RouteLinkProps> = ({ view, onNavigate, ...rest }) => (
  <a
    {...rest}
    href={VIEW_ROUTES[view].path}
    onClick={(event) => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      onNavigate();
    }}
  />
);
