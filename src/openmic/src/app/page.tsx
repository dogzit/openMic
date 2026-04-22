import OpenMicForm from "@/components/OpenMicForm";

export const metadata = {
  title: "Open Mic Night — Бүртгэл",
  description: "2025 оны 6 дугаар сарын 14 — The Factory, Улаанбаатар",
};

export default function Home() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Syne:wght@400;500;700&family=Syne+Mono&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body {
          background: #080808;
          color: #f0ede6;
          font-family: 'Syne', sans-serif;
          overflow-x: hidden;
        }

        /* Grain */
        body::before {
          content: '';
          position: fixed; inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
          pointer-events: none; z-index: 100; opacity: 0.5;
        }

        /* Ticker */
        .ticker-wrap {
          overflow: hidden; border-bottom: 1px solid rgba(255,255,255,0.07);
          background: rgba(232,255,71,0.03); height: 36px;
          display: flex; align-items: center;
        }
        .ticker {
          display: flex; gap: 0; animation: ticker 22s linear infinite; white-space: nowrap;
        }
        .ticker span {
          font-family: 'Syne Mono', monospace; font-size: 11px;
          letter-spacing: 0.15em; color: #e8ff47; padding: 0 28px; opacity: 0.65;
        }
        .ticker span.sep { color: rgba(240,237,230,0.2); }
        @keyframes ticker { from { transform: translateX(0); } to { transform: translateX(-50%); } }

        nav {
          padding: 20px 6vw;
          display: flex; justify-content: space-between; align-items: center;
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        .logo { font-family: 'Bebas Neue', sans-serif; font-size: 22px; letter-spacing: 0.1em; }
        .logo span { color: #e8ff47; }

        /* Hero */
        .hero {
          padding: 72px 6vw 80px;
          position: relative; overflow: hidden;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .hero::before {
          content: '';
          position: absolute; top: -100px; right: -100px;
          width: 600px; height: 600px;
          background: radial-gradient(circle, rgba(232,255,71,0.05) 0%, transparent 65%);
          pointer-events: none;
        }

        /* Spotlights */
        .sp {
          position: absolute; top: 0; width: 3px; height: 70%;
          background: linear-gradient(180deg, rgba(232,255,71,0.2) 0%, transparent 100%);
          filter: blur(30px); transform-origin: top center; pointer-events: none;
        }
        .sp1 { left: 35%; transform: rotate(-6deg); animation: sp 7s ease-in-out infinite alternate; }
        .sp2 { left: 55%; transform: rotate(4deg); animation: sp 9s ease-in-out infinite alternate-reverse; opacity: 0.5; }
        .sp3 { left: 75%; transform: rotate(-2deg); animation: sp 8s ease-in-out infinite alternate; opacity: 0.35; }
        @keyframes sp { from { transform: rotate(-8deg); } to { transform: rotate(8deg); } }

        .kicker {
          font-family: 'Syne Mono', monospace; font-size: 11px;
          letter-spacing: 0.2em; color: #e8ff47; text-transform: uppercase;
          margin-bottom: 16px; position: relative;
        }
        .kicker::before { content: '● '; animation: blink 1.5s ease-in-out infinite; }
        @keyframes blink { 0%,100% { opacity:1; } 50% { opacity:0.15; } }

        h1 {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(72px, 12vw, 160px);
          line-height: 0.88; letter-spacing: 0.02em; position: relative;
        }
        h1 .acc { color: #e8ff47; }
        h1 .stroke { -webkit-text-stroke: 1px rgba(240,237,230,0.25); color: transparent; }

        .hero-foot {
          margin-top: 32px;
          display: flex; flex-wrap: wrap; gap: 20px;
          align-items: flex-end; justify-content: space-between;
          position: relative;
        }
        .meta p { font-size: 13px; color: rgba(240,237,230,0.4); letter-spacing: 0.06em; line-height: 2.1; text-transform: uppercase; }
        .meta strong { color: #f0ede6; font-weight: 500; }

        /* Info strip */
        .strip {
          display: grid; grid-template-columns: repeat(3,1fr);
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .strip-item { padding: 28px 6vw; border-right: 1px solid rgba(255,255,255,0.06); }
        .strip-item:last-child { border-right: none; }
        .strip-label { font-family: 'Syne Mono', monospace; font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: rgba(240,237,230,0.3); margin-bottom: 6px; }
        .strip-val { font-family: 'Bebas Neue', sans-serif; font-size: 28px; letter-spacing: 0.06em; }
        .strip-val span { color: #e8ff47; }

        /* Reg layout */
        .reg { padding: 80px 6vw; display: grid; grid-template-columns: 1fr 1.45fr; gap: 80px; align-items: start; }

        .aside-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(36px, 4.5vw, 60px);
          line-height: 0.95; letter-spacing: 0.03em; margin-bottom: 18px;
        }
        .aside-title .ghost { -webkit-text-stroke: 1px rgba(240,237,230,0.2); color: transparent; }
        .aside p { font-size: 14px; color: rgba(240,237,230,0.4); line-height: 1.9; max-width: 300px; }

        .rules { margin-top: 36px; display: flex; flex-direction: column; gap: 14px; }
        .rule { display: flex; gap: 14px; font-size: 13px; color: rgba(240,237,230,0.38); line-height: 1.6; }
        .rnum { font-family: 'Syne Mono', monospace; font-size: 10px; color: #e8ff47; opacity: 0.7; min-width: 20px; padding-top: 1px; }

        .form-card {
          background: #111;
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 8px; padding: 40px;
          position: relative; overflow: hidden;
        }
        .form-card::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 2px;
          background: linear-gradient(90deg, #e8ff47, #ff4d6d);
        }

        footer {
          border-top: 1px solid rgba(255,255,255,0.06);
          padding: 24px 6vw;
          display: flex; justify-content: space-between; flex-wrap: wrap; gap: 10px;
        }
        footer p { font-family: 'Syne Mono', monospace; font-size: 11px; color: rgba(240,237,230,0.2); letter-spacing: 0.1em; }
        footer span { color: #e8ff47; opacity: 0.6; }

        @media (max-width: 768px) {
          .strip { grid-template-columns: 1fr; }
          .strip-item { border-right: none; border-bottom: 1px solid rgba(255,255,255,0.06); }
          .reg { grid-template-columns: 1fr; gap: 40px; }
          .form-card { padding: 24px 18px; }
        }
      `}</style>

      {/* Ticker */}
      <div className="ticker-wrap">
        <div className="ticker">
          {Array(3).fill(null).map((_, i) => (
            <span key={i} style={{ display: "contents" }}>
              <span>OPEN MIC NIGHT</span><span className="sep">·</span>
              <span>2025.06.14</span><span className="sep">·</span>
              <span>СЛОТ ХЯЗГААРЛАГДМАЛ</span><span className="sep">·</span>
              <span>БҮРТГЭЛ НЭЭЛТТЭЙ</span><span className="sep">·</span>
            </span>
          ))}
        </div>
      </div>

      {/* Nav */}
      <nav>
        <div className="logo">OPEN<span>MIC</span></div>
        <a href="#register" style={{
          background: "#e8ff47", color: "#080808",
          fontFamily: "Syne, sans-serif", fontWeight: 700,
          fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase",
          padding: "9px 20px", borderRadius: 100, textDecoration: "none",
        }}>
          Бүртгүүлэх →
        </a>
      </nav>

      {/* Hero */}
      <section className="hero">
        <div className="sp sp1"/><div className="sp sp2"/><div className="sp sp3"/>
        <p className="kicker">Улаанбаатар &nbsp;·&nbsp; 2025.06.14</p>
        <h1>
          OPEN<br/>
          <span className="acc">MIC</span><br/>
          <span className="stroke">NIGHT</span>
        </h1>
        <div className="hero-foot">
          <div className="meta">
            <p><strong>Цаг:</strong> 19:00 — 23:00</p>
            <p><strong>Байршил:</strong> The Factory, Сүхбаатар дүүрэг</p>
            <p><strong>Урилга:</strong> Нээлттэй — оролцоход үнэгүй</p>
          </div>
          <a href="#register" style={{
            display: "inline-flex", alignItems: "center", gap: 10,
            background: "#e8ff47", color: "#080808",
            fontFamily: "Syne, sans-serif", fontWeight: 700,
            fontSize: 13, letterSpacing: "0.08em", textTransform: "uppercase",
            padding: "15px 32px", borderRadius: 4, textDecoration: "none",
          }}>
            Тайзанд гарах →
          </a>
        </div>
      </section>

      {/* Info strip */}
      <div className="strip">
        <div className="strip-item">
          <div className="strip-label">Нийт слот</div>
          <div className="strip-val">20 <span>слот</span></div>
        </div>
        <div className="strip-item">
          <div className="strip-label">Тоглолтын хугацаа</div>
          <div className="strip-val">5–10 <span>мин</span></div>
        </div>
        <div className="strip-item">
          <div className="strip-label">Бүртгэлийн хаалт</div>
          <div className="strip-val">06.<span>10</span></div>
        </div>
      </div>

      {/* Registration */}
      <section className="reg" id="register">
        <div className="aside">
          <h2 className="aside-title">
            ТАЙЗАНД<br/>
            <span className="ghost">ГАРАХ</span><br/>
            ЦАГ ЧИН
          </h2>
          <p>Дуу хөгжим, яруу найраг, стенд-ап, бүжиг — ямар ч төрлөөр бүртгүүлж болно. Тайлбар хэрэггүй, чи зүгээр л гар.</p>
          <div className="rules">
            <div className="rule"><span className="rnum">01</span><span>Нэг оролцогч нэг слот авна</span></div>
            <div className="rule"><span className="rnum">02</span><span>5–10 минутын хугацааг баримтал</span></div>
            <div className="rule"><span className="rnum">03</span><span>Тоног төхөөрөмж газарт байна</span></div>
            <div className="rule"><span className="rnum">04</span><span>Цуцлах бол 2 хоногийн өмнө мэдэгдэнэ үү</span></div>
          </div>
        </div>

        <div className="form-card">
          <OpenMicForm />
        </div>
      </section>

      <footer>
        <p>© 2025 OPEN MIC NIGHT — УЛААНБААТАР</p>
        <p>Асуух зүйл: <span>info@openmic.mn</span></p>
      </footer>
    </>
  );
}
