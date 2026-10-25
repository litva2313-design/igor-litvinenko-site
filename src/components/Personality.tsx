export default function Personality() {
  return (
    <section id="personality">
      <div className="eyebrow">О способе мышления</div>
      <h2 style={{ fontSize: 'clamp(28px, 6vw, 52px)', maxWidth: '18ch' }}>
        Мне важно понять не только как сделать,<br />
        но <span className="highlight">зачем</span>, <span className="highlight-blue">для кого</span> и что произойдёт дальше.
      </h2>
      <div className="grid-2" style={{ marginTop: 56 }}>
        <div>
          <div className="mono" style={{ fontSize: 12, color: 'var(--teal)', marginBottom: 8 }}>УГОЛ 1</div>
          <h3 style={{ fontSize: 20, marginBottom: 12 }}>Ценность для бизнеса</h3>
          <p style={{ color: 'var(--text-dim)', fontSize: 15, lineHeight: 1.65 }}>
            Как CPO вижу задачу через результат: что меняется в процессе, какие метрики должны появиться, где граница MVP.
          </p>
        </div>
        <div>
          <div className="mono" style={{ fontSize: 12, color: 'var(--coral)', marginBottom: 8 }}>УГОЛ 2</div>
          <h3 style={{ fontSize: 20, marginBottom: 12 }}>Сценарий пользователя</h3>
          <p style={{ color: 'var(--text-dim)', fontSize: 15, lineHeight: 1.65 }}>
            Как продакт-менеджер ставлю человека в центр: кто, в какой момент, с каким контекстом принимает решение.
          </p>
        </div>
        <div>
          <div className="mono" style={{ fontSize: 12, color: 'var(--violet)', marginBottom: 8 }}>УГОЛ 3</div>
          <h3 style={{ fontSize: 20, marginBottom: 12 }}>Системная логика</h3>
          <p style={{ color: 'var(--text-dim)', fontSize: 15, lineHeight: 1.65 }}>
            Как аналитик вижу данные, события и исключения: где теряется информация, что происходит при сбое.
          </p>
        </div>
        <div>
          <div className="mono" style={{ fontSize: 12, color: 'var(--orange)', marginBottom: 8 }}>УГОЛ 4</div>
          <h3 style={{ fontSize: 20, marginBottom: 12 }}>Качество результата</h3>
          <p style={{ color: 'var(--text-dim)', fontSize: 15, lineHeight: 1.65 }}>
            Как QA задаю критерии приёмки до начала работы: что считаем «сделано», а что — нет.
          </p>
        </div>
      </div>
      <div className="card" style={{ marginTop: 40, maxWidth: 720 }}>
        <div className="mono" style={{ fontSize: 12, color: 'var(--text-dim)', marginBottom: 12 }}>ОБРАЗОВАНИЕ</div>
        <p style={{ fontSize: 16, lineHeight: 1.65 }}>
          «Автоматизированные комплексы и информационно-управляющие системы».
          Также РАНХиГС.
        </p>
      </div>
    </section>
  );
}