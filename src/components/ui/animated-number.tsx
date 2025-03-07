import React from 'react';
import { useSpring, animated } from '@react-spring/web';

interface AnimatedNumberProps {
  value: number;
  className?: string;
  springOptions?: any;
}

export function AnimatedNumber({ value, className, springOptions }: AnimatedNumberProps) {
  const { number } = useSpring({
    from: { number: 0 },
    number: value,
    config: springOptions,
  });

  return (
    <animated.span className={className}>
      {number.to((n) => n.toFixed(0))}
    </animated.span>
  );
}
