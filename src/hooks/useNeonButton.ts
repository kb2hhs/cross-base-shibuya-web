import { useState } from 'react';

interface NeonButtonHandlers {
  onMouseEnter: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  onMouseLeave: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

interface PressHandlers {
  onMouseDown: () => void;
  onMouseUp: () => void;
}

export function useNeonButton() {
  const [isPressed, setIsPressed] = useState(false);

  const pressHandlers: PressHandlers = {
    onMouseDown: () => setIsPressed(true),
    onMouseUp: () => setIsPressed(false),
  };

  const getNeonHandlers = (
    defaultShadow: string,
    hoverShadow: string
  ): NeonButtonHandlers => ({
    onMouseEnter: (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.currentTarget.style.boxShadow = hoverShadow;
    },
    onMouseLeave: (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.currentTarget.style.boxShadow = defaultShadow;
      setIsPressed(false);
    },
  });

  return {
    isPressed,
    pressHandlers,
    getNeonHandlers,
  };
}
