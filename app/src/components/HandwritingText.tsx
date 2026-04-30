import { useEffect, useRef, useState } from 'react';

interface HandwritingTextProps {
  text: string;
  fontSize?: number;
  delay?: number;
  color?: string;
  className?: string;
  isReady?: boolean;
}

export default function HandwritingText({
  text,
  fontSize = 60,
  delay = 0,
  color = '#3b82f6',
  className = '',
  isReady = true,
}: HandwritingTextProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [dimensions, setDimensions] = useState({ width: 300, height: fontSize * 1.3 });
  const lettersRef = useRef<SVGTextPathElement[]>([]);

  useEffect(() => {
    if (!svgRef.current || !isReady) return;

    const chars = text.split('');
    const charWidth = fontSize * 0.55;
    const totalWidth = chars.length * charWidth + 20;
    const height = fontSize * 1.3;
    setDimensions({ width: totalWidth, height });

    const timer = setTimeout(() => {
      lettersRef.current.forEach((el, i) => {
        if (!el) return;
        const length = el.getComputedTextLength?.() || fontSize * 2;
        el.style.strokeDasharray = `${length}`;
        el.style.strokeDashoffset = `${length}`;
        el.style.animation = `none`;
        el.style.fillOpacity = '0';
        el.style.strokeOpacity = '1';

        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            el.style.transition = `stroke-dashoffset 0.15s ease ${delay + i * 0.08}s, fill-opacity 0.3s ease ${delay + i * 0.08 + 0.12}s`;
            el.style.strokeDashoffset = '0';
            el.style.fillOpacity = '1';
          });
        });
      });
    }, 100);

    return () => clearTimeout(timer);
  }, [text, fontSize, delay, color, isReady]);

  const chars = text.split('');
  const charWidth = fontSize * 0.55;

  return (
    <svg
      ref={svgRef}
      width={dimensions.width}
      height={dimensions.height}
      viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
      className={`overflow-visible ${className}`}
      style={{ maxWidth: '100%' }}
    >
      <defs>
        {chars.map((_, i) => (
          <path
            key={`path-${i}`}
            id={`letter-path-${i}`}
            d={`M ${10 + i * charWidth} ${dimensions.height * 0.7} L ${10 + (i + 1) * charWidth} ${dimensions.height * 0.7}`}
          />
        ))}
      </defs>
      {chars.map((char, i) => (
        <text
          key={`text-${i}`}
          ref={(el) => {
            if (el) lettersRef.current[i] = el as unknown as SVGTextPathElement;
          }}
          x={10 + i * charWidth}
          y={dimensions.height * 0.7}
          fontSize={fontSize}
          fontFamily="'Caveat', cursive"
          fill={color}
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            strokeDasharray: `${fontSize * 2}`,
            strokeDashoffset: `${fontSize * 2}`,
            fillOpacity: 0,
            strokeOpacity: 1,
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </text>
      ))}
    </svg>
  );
}
