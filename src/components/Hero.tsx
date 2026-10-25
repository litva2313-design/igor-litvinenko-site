export default function Hero() {
  return (
    <section className="hero" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingTop: 80 }}>
      <div className="eyebrow">Москва · удалённо · самозанятый</div>
      <h1 style={{ fontSize: 'clamp(40px, 9vw, 92px)', maxWidth: '12ch' }}>
        Соединяю точки.<br />
        <span className="highlight">Чтобы задача</span><br />
        стала решением.
      </h1>
      <p className="lead">
        Помогаю разобраться в сложном, проверить идею и связать людей, процессы и технологии в понятную логику.
      </p>
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginTop: 40 }}>
        <a href="#cta" className="btn btn-primary">Разобрать мою задачу</a>
        <a href="#chapters" className="btn">Посмотреть подход</a>
      </div>
      <div className="mono" style={{ marginTop: 48, fontSize: 12, color: 'var(--text-dim)', letterSpacing: '0.14em' }}>
        СЦЕНОЙ МОЖНО УПРАВЛЯТЬ — наведите или перетащите
      </div>
      <button
        className="btn"
        style={{ marginTop: 16, alignSelf: 'flex-start'}}
        onClick={() => {
          const btn = document.querySelector('.scene-assemble') as HTMLButtonElement | null;
          btn?.click();
        }
      >
        Собрать систему
      </button>
    </section>
  );
}