import { useEffect, useState, useCallback } from 'react';
import Scene from './components/Scene';
import Hero from './components/Hero';
import Chapters from './components/Chapters';
import Situations from './components/Situations';
import Demos from './components/Demos';
import Practice from './components/Practice';
import Personality from './components/Personality';
import CTA from './components/CTA';
import { useScrollProgress } from './hooks/useScrollProgress';

export default function App() {
  const progress = useScrollProgress();
  const [sceneState, setSceneState] = useState('hero' as const);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    if (progress < 0.12) setSceneState('hero' as any);
    else if (progress < 0.35) setSceneState('chapter1' as any);
    else if (progress < 0.55) setSceneState('chapter2' as any);
    else if (progress < 0.72) setSceneState('chapter3' as any);
    else if (progress < 0.85) setSceneState('situations' as any);
    else if (progress < 0.95) setSceneState('practice' as any);
    else setSceneState('cta' as any);
  }, [progress]);

  const togglePause = useCallback(() => setPaused((p) => !p), []);

  return (
    <div className="app">
      <Scene
        progress={progress}
        sceneState={sceneState}
        paused={paused || reducedMotion}
        reducedMotion={reducedMotion}
      />
      <button
        className="pause-btn"
        onClick={togglePause}
        aria-label={paused ? 'Включить движение' : 'Пауза движения'}
        title={paused ? 'Включить движение' : 'Пауза движения'}
      >
        {paused ? '▶' : '▐▐'}
      </button>
      <main>
        <Hero />
        <Chapters onChapter={(c) => {
          const targets = [0.15, 0.42, 0.62];
          window.scrollTo({ top: targets[c] * document.body.scrollHeight, behavior: 'smooth' });
        }} />
        <Situations />
        <Demos />
        <Practice />
        <Personality />
        <CTA />
      </main>
    </div>
  );
}