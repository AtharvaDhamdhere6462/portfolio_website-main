import { motion, useMotionValue, useTransform, useAnimation, useReducedMotion } from 'framer-motion';
import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import type { ReactNode } from "react";
import { useTheme } from '../../context/ThemeContext';
import ProjectCard, { type Project } from './ProjectCard';

import './Stack.css';

interface CardRotateProps {
  children: ReactNode;
  onSendToBack: () => void;
  sensitivity: number;
  disableDrag?: boolean;
  isTopCard?: boolean;
  cardIndex: number;
  totalCards: number;
}

function CardRotate({
  children,
  onSendToBack,
  sensitivity,
  disableDrag = false,
  isTopCard = false,
  cardIndex,
  totalCards,
}: CardRotateProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const shouldReduceMotion = useReducedMotion();
  const rotateX = useTransform(y, [-100, 100], shouldReduceMotion ? [0, 0] : [60, -60]);
  const rotateY = useTransform(x, [-100, 100], shouldReduceMotion ? [0, 0] : [-60, 60]);

  const handleDragEnd = useCallback((_: any, info: any) => {
    if (Math.abs(info.offset.x) > sensitivity || Math.abs(info.offset.y) > sensitivity) {
      onSendToBack();
    } else {
      x.set(0);
      y.set(0);
    }
  }, [sensitivity, onSendToBack, x]);

  if (disableDrag) {
    return (
      <motion.div
        className="card-rotate-disabled"
        style={{ x: 0, y: 0 }}
        role="button"
        tabIndex={isTopCard ? 0 : -1}
        aria-label={`Project card ${cardIndex + 1} of ${totalCards}. Click to view next project.`}
        onKeyDown={(e) => {
          if ((e.key === 'Enter' || e.key === ' ') && isTopCard) {
            e.preventDefault();
            onSendToBack();
          }
        }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      className="card-rotate"
      style={{ x, y, rotateX, rotateY }}
      drag={!shouldReduceMotion}
      dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
      dragElastic={0.6}
      whileTap={{ cursor: 'grabbing' }}
      onDragEnd={handleDragEnd}
      role="button"
      tabIndex={isTopCard ? 0 : -1}
      aria-label={`Project card ${cardIndex + 1} of ${totalCards}. Drag or click to view next project.`}
      onKeyDown={(e) => {
        if ((e.key === 'Enter' || e.key === ' ') && isTopCard) {
          e.preventDefault();
          onSendToBack();
        }
      }}
    >
      {children}
    </motion.div>
  );
}

interface StackProps {
  randomRotation?: boolean;
  sensitivity?: number;
  cards?: ReactNode[];
  animationConfig?: { stiffness: number; damping: number };
  sendToBackOnClick?: boolean;
  autoplay?: boolean;
  autoplayDelay?: number;
  pauseOnHover?: boolean;
  mobileClickOnly?: boolean;
  mobileBreakpoint?: number;
  onCardSelect?: (index: number) => void;
}

export default function Stack({
  randomRotation = false,
  sensitivity = 200,
  cards = [],
  animationConfig = { stiffness: 260, damping: 20 },
  sendToBackOnClick = false,
  autoplay = false,
  autoplayDelay = 3000,
  pauseOnHover = false,
  mobileClickOnly = false,
  mobileBreakpoint = 768,
  onCardSelect,
}: StackProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const intervalRef = useRef<number | null>(null);
  const announcementRef = useRef<HTMLDivElement>(null);

  // Memoize mobile check
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < mobileBreakpoint);
    };

    checkMobile();
    const mediaQuery = window.matchMedia(`(max-width: ${mobileBreakpoint}px)`);
    mediaQuery.addEventListener('change', checkMobile);
    return () => mediaQuery.removeEventListener('change', checkMobile);
  }, [mobileBreakpoint]);

  const shouldDisableDrag = mobileClickOnly && isMobile;
  const shouldEnableClick = sendToBackOnClick || shouldDisableDrag;

  // Track current index for looping
  const currentIndexRef = useRef(0);

  // Memoize initial stack - reverse order so first card is on top
  const initialStack = useMemo(() => {
    if (cards.length) {
      // Reverse the array so the first card (index 0) is on top
      return cards
        .map((content, index) => ({ id: index + 1, content, originalIndex: index }))
        .reverse();
    }
    return [];
  }, [cards]);

  const [stack, setStack] = useState(initialStack);

  // Update stack when cards change
  useEffect(() => {
    if (cards.length) {
      // Reverse the array so the first card (index 0) is on top
      const newStack = cards
        .map((content, index) => ({ id: index + 1, content, originalIndex: index }))
        .reverse();
      setStack(newStack);
      // Reset current index to 0 (first project)
      currentIndexRef.current = 0;
    }
  }, [cards]);

  // Sync selection when stack changes - using useEffect to avoid setState during render
  useEffect(() => {
    if (stack.length > 0 && onCardSelect) {
      const topCard = stack[stack.length - 1];
      onCardSelect(topCard.originalIndex);
    }
  }, [stack, onCardSelect]);

  // Memoize sendToBack function - cycles to next card in order when clicked
  const sendToBack = useCallback((_id: number) => {
    setStack((prev) => {
      if (prev.length === 0) return prev;

      // Get current top card index
      const currentTopCard = prev[prev.length - 1];
      const currentTopIndex = currentTopCard.originalIndex;

      // Calculate next index in sequence (0, 1, 2, 3, 0, 1, 2, 3...)
      const nextIndex = (currentTopIndex + 1) % cards.length;
      currentIndexRef.current = nextIndex;

      // Find the card with the next index
      const nextCard = prev.find(card => card.originalIndex === nextIndex);
      if (!nextCard) return prev;

      // Reorder stack so next card is on top
      const reorderedStack = prev.filter(card => card.id !== nextCard.id);
      reorderedStack.push(nextCard);

      // Announce to screen readers
      if (announcementRef.current) {
        announcementRef.current.textContent = `Showing project ${nextIndex + 1} of ${cards.length}`;
      }

      return reorderedStack;
    });
  }, [cards.length]);



  // Optimized autoplay with proper cleanup - cycles in order
  useEffect(() => {
    if (!autoplay || cards.length === 0 || cards.length === 1) return;
    if (isPaused || shouldReduceMotion) return;

    intervalRef.current = window.setInterval(() => {
      setStack((currentStack) => {
        if (currentStack.length === 0) return currentStack;

        // Get current top card index
        const currentTopCard = currentStack[currentStack.length - 1];
        const currentTopIndex = currentTopCard.originalIndex;

        // Cycle to next index (0, 1, 2, 3, 0, 1, 2, 3...)
        const nextIndex = (currentTopIndex + 1) % cards.length;
        currentIndexRef.current = nextIndex;

        // Find the card with the next index
        const nextCard = currentStack.find(card => card.originalIndex === nextIndex);
        if (!nextCard) return currentStack;

        // Reorder stack so next card is on top
        const newStack = currentStack.filter(card => card.id !== nextCard.id);
        newStack.push(nextCard);

        // Announce to screen readers
        if (announcementRef.current) {
          announcementRef.current.textContent = `Showing project ${nextIndex + 1} of ${cards.length}`;
        }

        return newStack;
      });
    }, autoplayDelay);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [autoplay, autoplayDelay, cards.length, isPaused, shouldReduceMotion]);

  // Memoize random rotations to prevent recalculation
  const randomRotations = useMemo(() => {
    return stack.map(() => (randomRotation && !shouldReduceMotion ? Math.random() * 10 - 5 : 0));
  }, [stack.length, randomRotation, shouldReduceMotion]);

  const handleMouseEnter = useCallback(() => {
    if (pauseOnHover) {
      setIsPaused(true);
    }
  }, [pauseOnHover]);

  const handleMouseLeave = useCallback(() => {
    if (pauseOnHover) {
      setIsPaused(false);
    }
  }, [pauseOnHover]);

  // Optimized animation config for reduced motion
  const optimizedAnimationConfig = useMemo(() => {
    if (shouldReduceMotion) {
      return { stiffness: 400, damping: 30 };
    }
    return animationConfig;
  }, [shouldReduceMotion, animationConfig]);

  return (
    <div
      className="stack-container"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role="region"
      aria-label="Project cards stack"
    >
      {/* Screen reader announcements */}
      <div
        ref={announcementRef}
        className="sr-only"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      />

      {stack.map((card, index) => {
        const isTopCard = index === stack.length - 1;
        const randomRotate = randomRotations[index];

        return (
          <CardRotate
            key={card.id}
            onSendToBack={() => sendToBack(card.id)}
            sensitivity={sensitivity}
            disableDrag={shouldDisableDrag}
            isTopCard={isTopCard}
            cardIndex={card.originalIndex}
            totalCards={cards.length}
          >
            <motion.div
              className="card"
              onClick={() => shouldEnableClick && sendToBack(card.id)}
              animate={{
                rotateZ: shouldReduceMotion ? 0 : (stack.length - index - 1) * 5 + randomRotate,
                scale: 1 + index * 0.04 - stack.length * 0.04,
                transformOrigin: '90% 90%',
              }}
              initial={false}
              transition={{
                type: 'spring',
                stiffness: optimizedAnimationConfig.stiffness,
                damping: optimizedAnimationConfig.damping,
              }}
              aria-hidden={!isTopCard}
            >
              {card.content}
            </motion.div>
          </CardRotate>
        );
      })}
    </div>
  );
}
