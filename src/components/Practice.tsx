import { useState } from 'react';

const nodes = [
  { id: 'master', label: 'Мастер-машина', role: 'Управляющий узел: образы, политики, распространение' },
  { id: 'db', label: 'Общая база', role: 'Хранение профилей и настроек' },
  { id: 'ws', label: 'Рабочие места (16)', role: 'Изоляция, персонализация в рамках ограничений' },
  { id: 'clean', label: 'Очистка', role: 'Сброс локальных данных перед восстановлением' },
  { id: 'restore', label: 'Восстановление', role: 'Применение образа мастер-машины' },
];

export default function Practice() {
  const [active, setActive] = useState<number | null>(null);
  const [integrationView, setIntegrationView] = useState(false);

  return (
    <section id="practice">
      <div className="eyebrow">Практика</div>
      <h2 style={{ fontSize: 'clamp(28px, 6vw, 52px)', maxWidth: '16ch' }}>Что было сделано</h2>

      <div className="grid-2" style={{ marginTop: 48 }}>
        <article className="card">
          <div className="tag">Пример 1</div>
          <h3 style={{ fontSize: 22, margin: '16px 0' }}>Учебный класс на 16 компьютеров</h3>
          <p style={{ color: 'var(--text-dim)', fontSize: 15, lineHeight: 1.65 }}>
            Спроектирована архитектура: мастер-машина, общая база, ограничения персонализации, очистка и восстановление рабочих мест.
          </p>
          <div style={{ marginTop: 20 }}>
            {nodes.map((n, i) => (
              <button
                key={n.id}
                className="step-btn"
                onClick={() => setActive(active === i ? null : i)}
                style={{ borderColor: active === i ? 'var(--teal)' : undefined, display: 'block', width: '100%', textAlign: 'left', marginBottom: 8 }
              >
                <span className="mono" style={{ color: 'var(--teal)' }}>{String(i + 1).padStart(2, '0')} </span>{n.label}
                {active === i && <div style={{ marginTop: 8, color: 'var(--text-dim)', fontSize: 13 }}>{n.role}</div>}
              </button>
            ))}
          </div>
        </article>

        <article className="card">
          <div className="tag tag-coral">Пример 2</div>
          <h3 style={{ fontSize: 22, margin: '16px 0' }}>Пересмотр логики интеграции</h3>
          <p style={{ color: 'var(--text-dim)', fontSize: 15, lineHeight: 1.65 }}>
            Выявлена проблемная логика: повторные события создавали дубли, ошибки глотались. Новое решение было согласовано и реализовано.
          </p>
          <button className="step-btn" onClick={() => setIntegrationView(!integrationView)} style={{ marginTop: 16, borderColor: integrationView ? 'var(--coral)' : undefined }}>
            {integrationView ? 'Скрыть связи' : 'Показать, какие связи были важны'}
          </button>
          {integrationView && (
            <div style={{ marginTop: 16, fontSize: 14, lineHeight: 1.7, color: 'var(--text-dim)' }}>
              <div><span className="highlight-blue">→</span> Повторное событие → ключ идемпотентности → блок</div>
              <div><span className="highlight-blue">→</span> Сбой → транзакция → повтор с задержкой → алерт</div>
              <div><span className="highlight-blue">→</span> Обычное событие → запись → подтверждение</div>
              <div style={{ marginTop: 12, color: 'var(--teal)' }}>Ключевое: не скорость отдельного шага, а предсказуемость поведения при исключениях.</div>
            </div>
          )}
        </article>
      </div>
    </section>
  );
}