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

  // Smooth transition for pitch position
  const targetYRef = useRef(0);
  const currentYRef = useRef(0);

  // Update refs immediately when props change (doesn't restart animation)
  currentPitchRef.current = currentPitch;
  lowestPitchRef.current = lowestPitch;
  highestPitchRef.current = highestPitch;

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
      let lowest = lowestPitchRef.current;
      let highest = highestPitchRef.current;

      // If we have pitch but missing lowest/highest, use pitch as reference
      if (pitch) {
        if (!lowest || lowest === 0) {
          lowest = pitch * 0.8; // 20% lower than current pitch
        }
        if (!highest || highest === 0) {
          highest = pitch * 1.2; // 20% higher than current pitch
        }
      }

      // If there's current pitch, draw pitch indicator
      if (pitch && lowest && highest) {
        const range = highest - lowest || 100;
        const position = ((pitch - lowest) / range) * height;
        targetYRef.current = height - position;

        // Smooth interpolation for more responsive feel
        const smoothingFactor = 0.3; // Higher = more responsive (0-1)
        currentYRef.current += (targetYRef.current - currentYRef.current) * smoothingFactor;
        const y = currentYRef.current;

        // Draw current pitch line with gradient
        const lineGradient = ctx.createLinearGradient(0, y - 2, 0, y + 2);
        lineGradient.addColorStop(0, 'rgba(139, 92, 246, 0.3)');
        lineGradient.addColorStop(0.5, 'rgba(139, 92, 246, 1)');
        lineGradient.addColorStop(1, 'rgba(139, 92, 246, 0.3)');

        ctx.strokeStyle = lineGradient;
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();

        // Draw pitch dot with glow effect
        const dotGradient = ctx.createRadialGradient(width / 2, y, 0, width / 2, y, 20);
        dotGradient.addColorStop(0, '#8B5CF6');
        dotGradient.addColorStop(0.7, '#8B5CF6');
        dotGradient.addColorStop(1, 'rgba(139, 92, 246, 0)');

        ctx.fillStyle = dotGradient;
        ctx.beginPath();
        ctx.arc(width / 2, y, 20, 0, Math.PI * 2);
        ctx.fill();

        // Inner solid dot
        ctx.fillStyle = '#8B5CF6';
        ctx.beginPath();
        ctx.arc(width / 2, y, 12, 0, Math.PI * 2);
        ctx.fill();

        // Draw pulsing outer circle animation
        const time = Date.now() / 1000;
        const pulseRadius = 18 + Math.sin(time * 4) * 4;
        ctx.strokeStyle = '#8B5CF6';
        ctx.lineWidth = 2;
        ctx.globalAlpha = 0.6 - (Math.sin(time * 4) * 0.2);
        ctx.beginPath();
        ctx.arc(width / 2, y, pulseRadius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.globalAlpha = 1;
      }

      // Draw lowest and highest pitch markers
      if (lowest && highest) {
        // Lowest pitch marker (bottom)
        const lowestGradient = ctx.createLinearGradient(0, height - 8, 0, height);
        lowestGradient.addColorStop(0, 'rgba(59, 130, 246, 0.3)');
        lowestGradient.addColorStop(1, 'rgba(59, 130, 246, 0.8)');
        ctx.fillStyle = lowestGradient;
        ctx.fillRect(0, height - 8, width, 8);

        ctx.fillStyle = '#3B82F6';
        ctx.font = 'bold 14px sans-serif';
        ctx.fillText('Lowest', 10, height - 12);

        // Highest pitch marker (top)
        const highestGradient = ctx.createLinearGradient(0, 0, 0, 8);
        highestGradient.addColorStop(0, 'rgba(239, 68, 68, 0.8)');
        highestGradient.addColorStop(1, 'rgba(239, 68, 68, 0.3)');
        ctx.fillStyle = highestGradient;
        ctx.fillRect(0, 0, width, 8);

        ctx.fillStyle = '#EF4444';
        ctx.font = 'bold 14px sans-serif';
        ctx.fillText('Highest', 10, 22);
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
    <div className="bg-gray-50 rounded-xl sm:rounded-2xl p-4 sm:p-6">
      {/* Current note display - use fixed height to prevent layout shift */}
      <div className="text-center mb-3 sm:mb-4 h-20 sm:h-24 flex flex-col items-center justify-center">
        {currentNote ? (
          <div className="will-change-contents">
            <div className="text-4xl sm:text-6xl font-bold text-purple-600 mb-1 sm:mb-2" style={{ minHeight: '48px' }}>
              {currentNote.fullNote}
            </div>
            <div className="text-xs sm:text-sm text-gray-500" style={{ minHeight: '16px' }}>
              {currentPitch ? `${currentPitch.toFixed(2)} Hz` : ''}
            </div>
          </div>
        ) : (
          <div className="text-lg sm:text-2xl text-gray-400" style={{ minHeight: '48px', display: 'flex', alignItems: 'center' }}>
            Make a sound...
          </div>
        )}
      </div>

      {/* Canvas visualization */}
      <canvas
        ref={canvasRef}
        width={600}
        height={300}
        className="w-full rounded-lg sm:rounded-xl border-2 border-gray-200"
        style={{ display: 'block', maxHeight: '200px' }}
      />

      {/* Range display - use fixed height to prevent layout shift */}
      <div className="mt-3 sm:mt-4 flex justify-between text-xs sm:text-sm" style={{ minHeight: '40px' }}>
        {(lowestPitch && lowestPitch > 0) || (highestPitch && highestPitch > 0) ? (
          <>
            {lowestPitch && lowestPitch > 0 ? (
              <div className="text-blue-600">
                <div className="font-semibold">Lowest</div>
                <div>{lowestPitch.toFixed(2)} Hz</div>
              </div>
            ) : (
              <div className="text-gray-400">
                <div className="font-semibold">Lowest</div>
                <div>--</div>
              </div>
            )}
            {highestPitch && highestPitch > 0 ? (
              <div className="text-red-600">
                <div className="font-semibold">Highest</div>
                <div>{highestPitch.toFixed(2)} Hz</div>
              </div>
            ) : (
              <div className="text-gray-400">
                <div className="font-semibold">Highest</div>
                <div>--</div>
              </div>
            )}
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

