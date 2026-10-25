import { useState } from 'react';

const situations = [
  {
    id: 'idea', label: 'Есть идея', icon: '◆', accent: 'var(--electric)',
    desc: 'Есть задумка, но непонятно, что именно делать и с чего начать.',
    results: ['Карта пользовательских сценариев', 'Прототип', 'Границы первой версии', 'Требования и бэклог'],
    format: 'Исследование + прототип в Figma/Miro', theme: 'idea',
  },
  {
    id: 'routine', label: 'Много рутины', icon: '■', accent: 'var(--coral)',
    desc: 'Команда тонет в ручных операциях и пересылках, время уходит на то, что можно было сделать иначе.',
    results: ['Карта текущего процесса', 'Узкие места', 'Целевой сценарий', 'Логика автоматизации', 'План реализации'],
    format: 'Анализ процесса + логика автоматизации', theme: 'routine',
  },
  {
    id: 'disconnected', label: 'Сервисы не связаны', icon: '○', accent: 'var(--violet)',
    desc: 'Несколько сервисов, между которыми теряется информация. Никто не видит целой картины.',
    results: ['Схема взаимодействия', 'События и данные', 'Ответственность', 'Повторные события', 'Обработка ошибок'],
    format: 'Проектирование интеграций', theme: 'disconnected',
  },
  {
    id: 'research', label: 'Нужен ресёрч', icon: '▲', accent: 'var(--orange)',
    desc: 'Нужно сравнить подходы и принять решение, но нет структуры для сравнения.',
    results: ['Источники', 'Критерии сравнения', 'Ограничения вариантов', 'Выводы', 'Вопросы, которые требуют проверки'],
    format: 'Продуктовый и технический ресёрч', theme: 'research',
  },
  {
    id: 'check', label: 'Нужно проверить результат', icon: '✓', accent: 'var(--teal)',
    desc: 'Результат сделали, но непонятно, соответствует ли он ожиданиям.',
    results: ['Критерии готовности', 'Основные и граничные сценарии', 'Чек-лист', 'Выявленные расхождения'],
    format: 'Проверка по критериям приёмки', theme: 'check',
  },
];

export default function Situations() {
  const [active, setActive] = useState(0);
  const s = situations[active];

  return (
    <section id="situations">
      <div className="eyebrow">Узнайте свою ситуацию</div>
      <h2 style={{ fontSize: 'clamp(28px, 6vw, 52px)', maxWidth: '16ch' }}>Ваша задача уже была чьим-то из этого.</h2>
      <div className="grid-3" style={{ marginTop: 48 }}>
        {situations.map((sit, i) => (
          <button
            key={sit.id}
            className="card"
            onClick={() => setActive(i)}
            style={{
              textAlign: 'left', cursor: 'pointer', borderColor: active === i ? sit.accent : undefined,
              background: active === i ? `color-mix(in srgb, ${sit.accent} 12%, var(--glass))` : undefined,
            }}
          >
            <div style={{ fontSize: 24, marginBottom: 12, color: sit.accent }}>{sit.icon}</div>
            <h3 style={{ fontSize: 20 }}>{sit.label}</h3>
          </button>
        ))}
      </div>
      <div className="interactive" style={{ marginTop: 32 }}>
        <div className="demo-label">Выбрано: {s.label}</div>
        <p style={{ color: 'var(--text-dim)', lineHeight: 1.65, maxWidth: 640 }}>{s.desc}</p>
        <div style={{ marginTop: 24 }}>
          <div className="mono" style={{ fontSize: 12, color: 'var(--text-dim)', marginBottom: 12 }}>ЧТО ПОЛУЧИТЕ</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {s.results.map((r) => (
              <span key={r} className="tag" style={{ borderColor: s.accent, color: s.accent, background: 'transparent' }}>{r}</span>
            ))}
          </div>
        </div>
        <div style={{ marginTop: 24 }}>
          <div className="mono" style={{ fontSize: 12, color: 'var(--text-dim)', marginBottom: 12 }}>ФОРМАТ РАБОТЫ</div>
          <p style={{ fontSize: 16 }}>{s.format}</p>
        </div>
        <a href={`#cta?topic=${s.id}`}
          className="btn" style={{ marginTop: 28, borderColor: s.accent }}>
          Разобрать: {s.label.toLowerCase()}
        </a>
      </div>
    </section>
  );
}