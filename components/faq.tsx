import { FAQ } from "@/lib/site";

export function Faq() {
  return (
    <section className="section">
      <h2 className="section-title">FAQ</h2>
      <div>
        {FAQ.map((item) => (
          <details key={item.q} className="faq-item">
            <summary>{item.q}</summary>
            <p>{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
