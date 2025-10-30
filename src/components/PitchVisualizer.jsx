/**
 * Pitch Visualizer Component
 */

import { useEffect, useRef, memo } from 'react';

const PitchVisualizer = memo(({ currentPitch, currentNote, lowestPitch, highestPitch }) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  // Use refs to store latest values without triggering effect re-run
  const currentPitchRef = useRef(currentPitch);
  const lowestPitchRef = useRef(lowestPitch);
  const highestPitchRef = useRef(highestPitch);

  // Update refs when props change (doesn't restart animation)
  useEffect(() => {
    currentPitchRef.current = currentPitch;
    lowestPitchRef.current = lowestPitch;
    highestPitchRef.current = highestPitch;
  }, [currentPitch, lowestPitch, highestPitch]);

  // Animation loop - only runs once on mount
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    const draw = () => {
      // Clear canvas
      ctx.clearRect(0, 0, width, height);

      // Draw background gradient
      const gradient = ctx.createLinearGradient(0, height, 0, 0);
      gradient.addColorStop(0, '#3B82F6'); // Blue - low pitch
      gradient.addColorStop(0.5, '#10B981'); // Green - mid pitch
      gradient.addColorStop(1, '#EF4444'); // Red - high pitch

      ctx.fillStyle = gradient;
      ctx.globalAlpha = 0.1;
      ctx.fillRect(0, 0, width, height);
      ctx.globalAlpha = 1;

      // Get current values from refs
      const pitch = currentPitchRef.current;
      const lowest = lowestPitchRef.current;
      const highest = highestPitchRef.current;

      // If there's current pitch, draw pitch indicator
      if (pitch && lowest && highest) {
        const range = highest - lowest || 100;
        const position = ((pitch - lowest) / range) * height;
        const y = height - position;

        // Draw current pitch line
        ctx.strokeStyle = '#8B5CF6';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();

        // Draw pitch dot
        ctx.fillStyle = '#8B5CF6';
        ctx.beginPath();
        ctx.arc(width / 2, y, 15, 0, Math.PI * 2);
        ctx.fill();

        // Draw pulsing outer circle animation
        const time = Date.now() / 1000;
        const pulseRadius = 15 + Math.sin(time * 3) * 5;
        ctx.strokeStyle = '#8B5CF6';
        ctx.lineWidth = 2;
        ctx.globalAlpha = 0.5;
        ctx.beginPath();
        ctx.arc(width / 2, y, pulseRadius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.globalAlpha = 1;
      }

      // Draw lowest and highest pitch markers
      if (lowest && highest) {
        // Lowest pitch marker
        ctx.fillStyle = '#3B82F6';
        ctx.fillRect(0, height - 5, width, 5);
        ctx.fillStyle = '#3B82F6';
        ctx.font = '14px sans-serif';
        ctx.fillText('Lowest', 10, height - 10);

        // Highest pitch marker
        ctx.fillStyle = '#EF4444';
        ctx.fillRect(0, 0, width, 5);
        ctx.fillStyle = '#EF4444';
        ctx.fillText('Highest', 10, 20);
      }

      animationRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []); // Empty dependency array - only run once on mount

  return (
    <div className="bg-gray-50 rounded-2xl p-6">
      {/* Current note display - use fixed height to prevent layout shift */}
      <div className="text-center mb-4 h-24 flex flex-col items-center justify-center">
        {currentNote ? (
          <div className="will-change-contents">
            <div className="text-6xl font-bold text-purple-600 mb-2" style={{ minHeight: '72px' }}>
              {currentNote.fullNote}
            </div>
            <div className="text-sm text-gray-500" style={{ minHeight: '20px' }}>
              {currentPitch ? `${currentPitch.toFixed(2)} Hz` : ''}
            </div>
          </div>
        ) : (
          <div className="text-2xl text-gray-400" style={{ minHeight: '72px', display: 'flex', alignItems: 'center' }}>
            Make a sound...
          </div>
        )}
      </div>

      {/* Canvas visualization */}
      <canvas
        ref={canvasRef}
        width={600}
        height={300}
        className="w-full rounded-xl border-2 border-gray-200"
        style={{ display: 'block' }}
      />

      {/* Range display - use fixed height to prevent layout shift */}
      <div className="mt-4 flex justify-between text-sm" style={{ minHeight: '48px' }}>
        {lowestPitch && highestPitch ? (
          <>
            <div className="text-blue-600">
              <div className="font-semibold">Lowest</div>
              <div>{lowestPitch.toFixed(2)} Hz</div>
            </div>
            <div className="text-red-600">
              <div className="font-semibold">Highest</div>
              <div>{highestPitch.toFixed(2)} Hz</div>
            </div>
          </>
        ) : (
          <div className="w-full"></div>
        )}
      </div>
    </div>
  );
});

PitchVisualizer.displayName = 'PitchVisualizer';

export default PitchVisualizer;

