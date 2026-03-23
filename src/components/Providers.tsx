'use client';

import dynamic from 'next/dynamic';
import NetworkStatus from './ui/NetworkStatus';

const ParticleRain = dynamic(() => import('./effects/ParticleRain'), { ssr: false });

export default function Providers() {
  return (
    <>
      <NetworkStatus />
      <ParticleRain color="rgba(0, 212, 255, 0.25)" count={80} />
    </>
  );
}
