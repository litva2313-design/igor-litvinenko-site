const chapters = [
  {
    num: '01',
    title: 'Увидеть настоящую задачу',
    text: 'За запросом «нужен бот» или «надо автоматизировать» скрывается реальная цель. Разрозненные элементы, несколько возможных связей, неопределённость — это не проблема, это точка старта. Моя работа — вычленить из шума то, что действительно важно.',
  },
  {
    num: '02',
    title: 'Сделать идею видимой',
    text: 'Та же геометрия собирается в слои и плоскости — в пространственный прототип. Сценарий можно показать, обсудить и проверить до реализации. Ошибки в макете стоят копеек, чем в коде.',
  },
  {
    num: '03',
    title: 'Связать систему',
    text: 'Элементы превращаются в узлы процесса. По связям движутся сигналы. Становятся видны роли, события, статусы и исключения. То, что раньше было невидимо, теперь — читаемая структура.',
  },
];

export default function Chapters({ onChapter }: { onChapter: (i: number) => void }) {
  return (
    <section id="chapters">
      <div className="eyebrow">Как это работает</div>
      <h2 style={{ fontSize: 'clamp(28px, 6vw, 56px)', maxWidth: '14ch' }}>Одна система. Три шага.</h2>
      <div className="grid-3" style={{ marginTop: 56 }}>
        {chapters.map((ch, i) => (
          <article key={ch.num} className="card">
            <div className="mono" style={{ color: 'var(--teal)', fontSize: 13, marginBottom: 16 }}>{ch.num}</div>
            <h3 style={{ fontSize: 22, marginBottom: 16 }}>{ch.title}</h3>
            <p style={{ color: 'var(--text-dim)', fontSize: 15, lineHeight: 1.65 }}>{ch.text}</p>
            <button className="btn" style={{ marginTop: 24 }} onClick={() => onChapter(i)}>
              К главе {ch.num}
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}