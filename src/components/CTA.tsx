import { useState } from 'react';

const topics = [
  { id: 'idea', label: 'Есть идея' },
  { id: 'routine', label: 'Много рутины' },
  { id: 'disconnected', label: 'Сервисы не связаны' },
  { id: 'research', label: 'Нужен ресёрч' },
  { id: 'check', label: 'Проверить результат' },
  { id: 'other', label: 'Другое' },
];

export default function CTA() {
  const [topic, setTopic] = useState('');
  const [desc, setDesc] = useState('');
  const [copied, setCopied] = useState(false);

  const message = [
    topic ? `Тема: ${topics.find((t) => t.id === topic)?.label}` : '',
    desc.trim() ? `\nЗадача:\n${desc.trim()}` : '',
    '\nХочу разобраться, с чего начать.',
  ].filter(Boolean).join('\n');

  const telegramUrl = `https://t.me/ik_litvinenko?text=${encodeURIComponent(message)}`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section id="cta">
      <div className="eyebrow">Порядок работы</div>
      <h2 style={{ fontSize: 'clamp(28px, 6vw, 48px)', maxWidth: '16ch' }}>Простой путь от запроса к результату</h2>
      <div className="grid-2" style={{ marginTop: 40 }}>
        {[
          'Обсуждаем контекст.',
          'Определяем результат и границы.',
          'Собираем исследование, прототип или логику решения.',
          'Готовим следующий шаг и критерии приёмки.',
        ].map((step, i) => (
          <div key={i} className="card" style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
            <div className="mono" style={{ color: 'var(--teal)', fontSize: 20, fontWeight: 700 }}>{String(i + 1).padStart(2, '0)}</div>
            <p style={{ fontSize: 16, lineHeight: 1.5 }}>{step}</p>
          </div>
        ))}
      </div>

      <div className="card" style={{ marginTop: 64, textAlign: 'center', padding: '64px 24px' }}>
        <h2 style={{ fontSize: 'clamp(32px, 7vw, 64px)' }}>Давайте соединим точки.</h2>
        <p className="lead" style={{ margin: '24px auto 0' }}>
          Необязательно приходить с готовым ТЗ. Расскажите, что хотите изменить, — разберёмся, с чего начать.
        </p>

        <div style={{ marginTop: 40, maxWidth: 560, marginLeft: 'auto', marginRight: 'auto', textAlign: 'left' }}>
          <div className="mono" style={{ fontSize: 12, color: 'var(--text-dim)', marginBottom: 12 }}>Подготовка сообщения</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
            {topics.map((t) => (
              <button
                key={t.id}
                className="step-btn"
                onClick={() => setTopic(t.id)}
                style={{ borderColor: topic === t.id ? 'var(--electric)' : undefined }
              >
                {t.label}
              </button>
            ))}
          </div>
          <textarea
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="Коротко: что за задача, где вы сейчас, что уже пробовали"
            rows={5}
            style={{
              width: '100%',
              background: 'var(--ink)',
              border: '1px solid var(--glass-border)',
              borderRadius: 12,
              padding: 16,
              color: 'var(--text)',
              fontFamily: 'var(--font)',
              fontSize: 15,
              lineHeight: 1.6,
              resize: 'vertical' as any,
            }
          />
          <div className="card" style={{ marginTop: 16, background: 'var(--ink)', whiteSpace: 'pre-wrap', fontSize: 14, color: 'var(--text-dim)', minHeight: 80 }}>
            {message || 'Текст сообщения появится здесь'}
          </div>
          <div style={{ display: 'flex', gap: 12, marginTop: 16, flexWrap: 'wrap' }}>
            <button className="btn" onClick={copy}> {copied ? 'Скопировано ✓' : 'Копировать текст'} </button>
            <a href={telegramUrl} className="btn btn-primary" target="_blank" rel="noreferrer">
              Открыть в Telegram
            </a>
          </div>
          <div className="mono" style={{ fontSize: 11, color: 'var(--text-dim)', marginTop: 16 }}>
            Сообщение открывается как черновик. Отправляете его сами. t.me/ik_litvinenko
          </div>
        </div>
      </div>

      <footer style={{ marginTop: 80, paddingBottom: 40, textAlign: 'center', color: 'var(--text-dim)', fontSize: 13 }}>
        <div className="mono">© Игорь Литвиненко · 2026</div>
      </footer>
    </section>
  );
}