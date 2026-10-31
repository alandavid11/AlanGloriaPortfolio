import React from 'react';
import { CLIENTS } from '../../data/walletme';

export const ClientLogos: React.FC<{ label?: string }> = ({ label = 'In production with' }) => (
  <div>
    <p className="eyebrow mb-5">{label}</p>
    <ul className="flex flex-wrap items-center gap-x-9 gap-y-6">
      {CLIENTS.map((client) => (
        <li key={client.file} className="client-logo">
          <img
            src={`/clientes/${client.file}.webp`}
            alt={client.name}
            title={client.name}
            style={{ height: client.height }}
            className="w-auto object-contain"
            loading="lazy"
            decoding="async"
          />
        </li>
      ))}
    </ul>
  </div>
);
