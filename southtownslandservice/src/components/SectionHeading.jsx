export default function SectionHeading({ eyebrow, title, copy, center = false }) {
  return (
    <div className={center ? 'mx-auto text-center' : ''}>
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h2 className="section-title">{title}</h2>
      {copy ? <p className={center ? 'section-copy mx-auto' : 'section-copy'}>{copy}</p> : null}
    </div>
  );
}
