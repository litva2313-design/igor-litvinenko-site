import { useState } from 'react';

export default function Demos() {
  const [protoStep, setProtoStep] = useState(0);
  const [autoMode, setAutoMode] = useState(false);
  const [intEvent, setIntEvent] = useState('normal' as 'normal' | 'repeat' | 'fail' as any);
  const [researchPick, setResearchPick] = useState<number | null>(null);
  const [checks, setChecks] = useState([false, false, false, false]);

  const protoSteps = [
    { title: 'Старт', desc: 'Пользователь нажимает «Оформить»', status: 'Ожидание действия' },
    { title: 'Обработка', desc: 'Система проверяет данные', status: 'В работе' },
    { title: 'Результат', desc: 'Показывается статус и обратная связь', status: 'Готово' },
  ];

  const checked = checks.filter(Boolean).length;

  return (
    <section id="demos">
      <div className="eyebrow">Демонстрации</div>
      <h2 style={{ fontSize: 'clamp(28px, 6vw, 52px)', maxWidth: '16ch' }}>Иллюстрации подхода — не клиентские проекты</h2>
      <p className="lead">Учебные примеры, как могут выглядеть результаты работы.</p>

      <div className="grid-2" style={{ marginTop: 48 }}>
        <div className="interactive">
          <div className="demo-label">Прототип экрана</div>
          <div className="card" style={{ background: 'var(--ink)', borderColor: 'var(--glass-border)' }}>
            <div className="mono" style={{ fontSize: 12, color: 'var(--text-dim)', marginBottom: 12 }}>Пример интерфейса</div>
            <div style={{ padding: 16, border: '1px solid var(--glass-border)', borderRadius: 8, marginBottom: 16 }}>
              <div style={{ fontSize: 18, fontWeight: 600 }}>{protoSteps[protoStep].title}</div>
              <div style={{ color: 'var(--text-dim)', fontSize: 14, marginTop: 6 }}>{protoSteps[protoStep].desc}</div>
              <div className="status-bar"><span>Статус: {protoSteps[protoStep].status}</span></div>
            </div>
            <button className="step-btn" onClick={() => setProtoStep((s) => Math.min(s + 1, protoSteps.length - 1))} disabled={protoStep === protoSteps.length - 1}> Дальше → </button>
            <button className="step-btn" onClick={() => setProtoStep(0)} disabled={protoStep === 0}> ← Начало </button>
          </div>
        </div>

        <div className="interactive">
          <div className="demo-label">Автоматизация процесса</div>
          <button className="step-btn" onClick={() => setAutoMode(!autoMode)} style={{ borderColor: autoMode ? 'var(--teal)' : undefined }}>
            {autoMode ? 'Что проектируем' : 'Как бывает'}
          </button>
          <div style={{ marginTop: 16, fontSize: 15, lineHeight: 1.65, color: 'var(--text-dim)' }}>
            {autoMode
              ? 'Ручные шаги заменяются автоматическим маршрутом: триггер → проверка → действие → подтверждение. Исключения обрабатываются отдельно.'
              : 'Человек выполняет каждый шаг вручную: собирает данные, проверяет, пересылает. Ошибки замечаются поздно.'}
          </div>
        </div>

        <div className="interactive">
          <div className="demo-label">Интеграции: виды событий</div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {(['normal', 'repeat', 'fail'] as const).map((e) => (
              <button key={e} className="step-btn" onClick={() => setIntEvent(e as any)} style={{ borderColor: intEvent === e ? 'var(--violet)' : undefined }}>
                {e === 'normal' ? 'Обычное' : e === 'repeat' ? 'Повторное' : 'Сбой'}
              </button>
            ))}
          </div>
          <div style={{ marginTop: 16, fontSize: 15, lineHeight: 1.65, color: 'var(--text-dim)' }}>
            {intEvent === 'normal' && 'Событие принимается, данные записываются, подтверждение уходит инициатору.'}
            {intEvent === 'repeat' && 'Повторное событие: проверка по ключу идемпотентности, дубль не создаётся, повторный ответ игнорируется.'}
            {intEvent === 'fail' && 'Сбой: транзакция помечается как ошибочная, повтор с задержкой, алерт ответственному.'}
          </div>
        </div>

        <div className="interactive">
          <div className="demo-label">Ресёрч: матрица сравнения</div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr style={{ color: 'var(--text-dim)' }}>
                  <th style={{ textAlign: 'left', padding: 8, borderBottom: '1px solid var(--glass-border)' }}>Вариант</th>
                  <th style={{ textAlign: 'left', padding: 8, borderBottom: '1px solid var(--glass-border)' }}>Скорость</th>
                  <th style={{ textAlign: 'left', padding: 8, borderBottom: '1px solid var(--glass-border)' }}>Стоимость</th>
                  <th style={{ textAlign: 'left', padding: 8, borderBottom: '1px solid var(--glass-border)' }}>Риск</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { v: 'A', s: '9', c: '8', r: '3' },
                  { v: 'B', s: '6', c: '5', r: '7' },
                  { v: 'C', s: '7', c: '9', r: '4' },
                ].map((row, i) => (
                  <tr key={row.v} onClick={() => setResearchPick(i)} style={{ cursor: 'pointer', background: researchPick === i ? 'rgba(79,124,255,0.1)' : undefined }}>
                    <td style={{ padding: 8, borderBottom: '1px solid var(--glass-border)', fontWeight: 600 }}>{row.v}</td>
                    <td style={{ padding: 8, borderBottom: '1px solid var(--glass-border)' }}>{row.s}</td>
                    <td style={{ padding: 8, borderBottom: '1px solid var(--glass-border)' }}>{row.c}</td>
                    <td style={{ padding: 8, borderBottom: '1px solid var(--glass-border)' }}>{row.r}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {researchPick !== null && (
            <div style={{ marginTop: 12, fontSize: 14, color: 'var(--teal)' }}>
              Вывод: вариант {['A', 'B', 'C'][researchPick]} лучше по соотношению скорости и риска при приемлемой стоимости. Но требует проверки ограничений в вашем контексте.
            </div>
          )}
        </div>

        <div className="interactive">
          <div className="demo-label">Приёмка: чек-лист</div>
          <div className="progress-bar"><div style={{ width: `${(checked / 4) * 100}%` }} /></div>
          <div className="checklist">
            {['Критерии готовности согласованы', 'Основные сценарии пройдены', 'Граничные сценарии проверены', 'Расхождения выявлены и зафиксированы'].map((item, i) => (
              <label key={i}>
                <input type="checkbox" checked={checks[i]} onChange={(e) => {
                  const next = [...checks];
                  next[i] = e.target.checked;
                  setChecks(next);
                }} />
                {item}
              </label>
            ))}
          </div>
          <div className="mono" style={{ fontSize: 12, color: 'var(--text-dim)', marginTop: 12 }}>Проверено: {checked} из 4</div>
        </div>
      </div>
    </section>
  );
}