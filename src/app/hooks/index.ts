import { useEffect, useRef } from 'react';
import { useSpring } from 'react-spring';

export function usePrevious<T>( value: T ) {
  const ref = useRef<T>();

  useEffect(() => {
      ref.current = value;
  });

  return ref.current;
}

export function useSpringNumber( to: number ) {
  const spring = useSpring({
    from: { value: 0 },
    to:   { value: to || 0 }
  });

  return spring.value;
}
