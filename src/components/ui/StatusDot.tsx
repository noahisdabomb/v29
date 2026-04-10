type Status = 'available' | 'winding-down' | 'offline';

const DOT_COLOR: Record<Status, string> = {
  available: 'bg-emerald-400',
  'winding-down': 'bg-amber-400',
  offline: 'bg-red-400',
};

interface StatusDotProps {
  status: Status;
  /** 'limited' pings 3 times then stops; 'continuous' pulses indefinitely */
  pulseMode?: 'limited' | 'continuous';
}

export default function StatusDot({ status, pulseMode = 'limited' }: StatusDotProps) {
  const color = DOT_COLOR[status];
  const showPulse = status !== 'offline';

  return (
    <span className="relative inline-flex size-2">
      {showPulse && (
        <span
          className={`absolute inline-flex size-full rounded-full ${color} opacity-60`}
          style={
            pulseMode === 'limited'
              ? { animation: 'ping-limited 1.8s ease-in-out 3' }
              : { animation: 'pulse 2s ease-in-out infinite' }
          }
        />
      )}
      <span className={`relative inline-flex size-2 rounded-full ${color}`} />
    </span>
  );
}
