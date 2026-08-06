import { CompareSlider } from '@/components/compare-slider'

export default function Page() {
  return (
    <main className="min-h-svh bg-background text-foreground">
      <div className="mx-auto w-full max-w-4xl px-5 py-12 md:py-16">
        <header className="mb-8 md:mb-10">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Community Consultation
          </p>
          <h1 className="text-pretty text-3xl font-semibold leading-tight md:text-4xl">
            A Proposed Aquatic Centre for Newman
          </h1>
          <p className="mt-4 max-w-2xl text-pretty leading-relaxed text-muted-foreground">
            We are exploring a possible community aquatic centre on open ground at
            the edge of the Newman townsite. Drag the slider to compare the site as
            it is today with an early concept for how it could look. This is a
            concept for discussion only — nothing has been approved or built.
          </p>
        </header>

        <CompareSlider
          beforeSrc="/images/site-today.png"
          afterSrc="/images/site-future.png"
          beforeAlt="The proposed site today: open red-earth ground with low spinifex, gravel and faint vehicle tracks, with the flat-topped Pilbara ranges on the horizon under a pale gold late-afternoon sky."
          afterAlt="A concept view of the same site with a low single-storey aquatic centre set back from the road, a swimming pool, a shaded water-play area, planted trees and a path to the entrance, framed by the same ranges and sky."
          beforeLabel="Today"
          afterLabel="Concept"
        />

        <p className="mt-4 text-center text-sm text-muted-foreground">
          Drag the handle left and right to compare. Use the arrow keys when it is
          focused.
        </p>

        <section className="mt-12 grid gap-6 border-t border-border pt-8 md:grid-cols-2">
          <div>
            <h2 className="text-lg font-medium">The site today</h2>
            <p className="mt-2 leading-relaxed text-muted-foreground">
              Open, unshaded red-earth ground on the edge of town, with low spinifex
              and informal tracks. It looks out toward the ancient flat-topped
              ranges that surround Newman.
            </p>
          </div>
          <div>
            <h2 className="text-lg font-medium">The concept</h2>
            <p className="mt-2 leading-relaxed text-muted-foreground">
              A single-storey aquatic centre with rooftop solar, a swimming pool, a
              shallow water-play area under shade sails, and planted, shaded grounds
              connected to the road by a simple path.
            </p>
          </div>
        </section>

        <p className="mt-10 border-t border-border pt-6 text-xs leading-relaxed text-muted-foreground">
          Illustrative concept visualisation prepared for community consultation.
          Images are indicative only and do not represent an approved design,
          funding commitment, or final location.
        </p>
      </div>
    </main>
  )
}
