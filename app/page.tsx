"use client";

import { useState } from "react";

type Selection = {
  item: string;
  detail: string;
  note: string;
  image: string;
};

const rooms: Record<string, { eyebrow: string; title: string; intro: string; selections: Selection[] }> = {
  Kitchen: {
    eyebrow: "The social heart",
    title: "Kitchen",
    intro: "A monolithic palette of natural stone, French oak and dark bronze, resolved with professional-grade appliances and quietly integrated utility.",
    selections: [
      { item: "Benchtop & joinery", detail: "Vanilish Pearl", note: "Natural stone slab", image: "/specs/p01-06.jpg" },
      { item: "Feature stone", detail: "Silver Travertine", note: "Honed finish", image: "/specs/p01-07.jpg" },
      { item: "Workstation sink", detail: "Artinox Planum 50", note: "Stainless steel, fully undermounted", image: "/specs/p02-06.jpg" },
      { item: "Cooking", detail: "Gaggenau", note: "Induction cooktop and anthracite wall oven", image: "/specs/p06-04.jpg" },
    ],
  },
  "Master Ensuite": {
    eyebrow: "A private retreat",
    title: "Master Ensuite",
    intro: "Silver travertine creates a calm, continuous envelope, balanced by sculptural fittings in brushed gunmetal and softly illuminated alabaster.",
    selections: [
      { item: "Stone", detail: "Silver Travertine", note: "Honed, P3 finish", image: "/specs/p02-05.jpg" },
      { item: "Bath filler", detail: "Elysian floor mounted", note: "Brushed gunmetal with hand shower", image: "/specs/p03-06.jpg" },
      { item: "Wall light", detail: "Melange elongated sconce", note: "Alabaster and bronze", image: "/specs/p08-02.jpg" },
      { item: "Shower", detail: "Elysian collection", note: "Round 250mm head and minimal mixer", image: "/specs/p04-02.jpg" },
    ],
  },
  Living: {
    eyebrow: "Natural continuity",
    title: "Living & Dining",
    intro: "French oak boards run through the principal living spaces, meeting silver travertine and a custom bronze-and-glass pendant above the dining setting.",
    selections: [
      { item: "Flooring", detail: "French Oak", note: "Dans Oak, plank pattern", image: "/specs/p02-04.jpg" },
      { item: "Feature stone", detail: "Silver Travertine", note: "Honed natural stone slab", image: "/specs/p01-07.jpg" },
      { item: "Dining pendant", detail: "Glass Bubble Pendant - 8 Rod", note: "Custom bronze with fade grey glass", image: "/specs/p08-01.jpg" },
      { item: "Glazing", detail: "Narrow reeded glass", note: "Clear low iron, no green or blue tint", image: "/specs/p01-03.jpg" },
    ],
  },
  Pantry: {
    eyebrow: "Performance concealed",
    title: "Butler's Pantry",
    intro: "A fully equipped secondary workspace with dedicated cooking, refrigeration and dishwashing, unified by the same refined stone and gunmetal palette.",
    selections: [
      { item: "Stone", detail: "Vanilish Pearl", note: "Natural stone slab", image: "/specs/p01-06.jpg" },
      { item: "Workstation sink", detail: "Artinox Planum 111", note: "Stainless steel, fully undermounted", image: "/specs/p02-07.jpg" },
      { item: "Ovens", detail: "Gaggenau", note: "Anthracite combi-steam and combi-microwave", image: "/specs/p06-05.jpg" },
      { item: "Refrigeration", detail: "Gaggenau", note: "Fully integrated fridge and freezer", image: "/specs/p07-02.jpg" },
    ],
  },
  Laundry: {
    eyebrow: "Considered utility",
    title: "Laundry",
    intro: "Durable, highly resolved and visually consistent, with natural stone, integrated fittings and specialist fabric care neatly contained within the joinery.",
    selections: [
      { item: "Stone", detail: "Silver Travertine", note: "Honed natural stone slab", image: "/specs/p01-07.jpg" },
      { item: "Floor & wall tile", detail: "Rome Limestone", note: "Clay, natural P3 finish", image: "/specs/p02-02.jpg" },
      { item: "Sink", detail: "Franke Bolero", note: "Stainless steel", image: "/specs/p03-01.jpg" },
      { item: "Fabric care", detail: "Fisher & Paykel Series 11", note: "60cm contemporary fabric care cabinet", image: "/specs/p07-08.jpg" },
    ],
  },
};

const materials = [
  { number: "01", name: "Silver Travertine", detail: "Honed natural stone", image: "/specs/p01-07.jpg" },
  { number: "02", name: "Vanilish Pearl", detail: "Natural stone slab", image: "/specs/p01-06.jpg" },
  { number: "03", name: "Titanium Travertine", detail: "Entry & powder room", image: "/specs/p01-08.jpg" },
  { number: "04", name: "French Oak", detail: "Dans Oak plank", image: "/specs/p02-04.jpg" },
  { number: "05", name: "Dark Bronze", detail: "Flat powdercoat", image: "/specs/p01-04.jpg" },
  { number: "06", name: "Wheatgrass", detail: "Riviera wool carpet", image: "/specs/p01-02.jpg" },
];

const specificationGroups = [
  {
    title: "Surfaces & finishes",
    count: "14 selections",
    items: [
      ["Internal walls", "Dulux Natural White (SW1F4), matte"],
      ["Bedrooms", "Riviera Heamstead 100% wool carpet, Wheatgrass"],
      ["Feature glazing", "Clear low iron narrow reeded glass"],
      ["Joinery & steel doors", "Dulux Dark Bronze powdercoat, flat"],
      ["Main ensuite & powder room", "X-Bond microcement, colour TBC"],
      ["Kitchen, pantry, laundry, master ensuite, WIR & bar", "Vanilish Pearl natural stone slab"],
      ["Kitchen, laundry, bar & living", "Silver Travertine, honed"],
      ["Powder room & entry", "Titanium Travertine"],
      ["Ensuites 2 & 3", "Victory Beige natural stone, honed"],
      ["Study stone", "To be confirmed"],
      ["Powder room, laundry & ensuites 2/3", "Rome Limestone tile, Clay, natural P3"],
      ["Master ensuite", "Silver Travertine Italian tile, honed P3"],
      ["Outdoor paving", "To be confirmed"],
      ["Living, dining, kitchen, hallway & study", "French Oak plank flooring, Dans Oak"],
    ],
  },
  {
    title: "Kitchen & utility",
    count: "8 selections",
    items: [
      ["Kitchen sink", "Artinox Planum 50 workstation sink, fully undermounted"],
      ["Pantry sink", "Artinox Planum 111 workstation sink, fully undermounted"],
      ["Laundry sink", "Franke Bolero, stainless steel"],
      ["Pantry & laundry mixer", "Elysian commercial pull-out mixer, brushed gunmetal"],
      ["Filtered water", "Zip HydroTap G5 Celsius Plus All-In-One Pull Out - boiling, chilled & sparkling"],
      ["Kitchen bin", "Vauth-Sagel 2 x 35L pullout, grey"],
      ["Kitchen inserts", "Blum Orgaline cutlery and utensil inserts"],
      ["Laundry fabric care", "Fisher & Paykel Series 11 FC1260H2"],
    ],
  },
  {
    title: "Bathroom fittings",
    count: "11 selections",
    items: [
      ["Ensuites 2 & 3 basins", "Studio Bagno POP undermount basin, white"],
      ["Basin mixers", "Elysian Minimal mixer and spout, brushed gunmetal"],
      ["Master ensuite bath filler", "Elysian floor mounted with hand shower, brushed gunmetal"],
      ["Freestanding bath", "To be confirmed"],
      ["Toilets", "Caroma Urbane II Bidet Cleanflush back-to-wall pan with concealed cistern"],
      ["Toilet roll holder", "Elysian, brushed gunmetal"],
      ["Wall shower", "Round 250mm head, brushed gunmetal"],
      ["Hand shower", "Sola hand shower set, brushed gunmetal"],
      ["Shower mixer", "Elysian Minimal, brushed gunmetal"],
      ["Floor waste", "Pixi tile insert channel waste 900mm, brushed gunmetal"],
      ["Heated towel rail & hooks", "Modi 900mm rail and Elysian robe hook, brushed gunmetal"],
    ],
  },
  {
    title: "Architectural hardware",
    count: "11 selections",
    items: [
      ["General door lever", "Gilda on round rose, graphite nickel"],
      ["Entry door lever", "Prisma on round rose, graphite nickel"],
      ["Entry door lock", "To be confirmed"],
      ["Floor mounted door stop", "Graphite nickel"],
      ["Wall mounted door stop", "Concealed skirting fix, graphite nickel"],
      ["Magnetic door stop", "Graphite nickel"],
      ["Recessed flush pull", "To match graphite nickel"],
      ["Hinges & privacy snib", "Graphite nickel"],
      ["Pivot hinges", "Concealed pivot mechanism"],
      ["Double door flush bolt", "To match graphite nickel"],
      ["Window hardware", "Dark Bronze"],
    ],
  },
  {
    title: "Appliances",
    count: "13 selections",
    items: [
      ["Kitchen induction cooktop", "Gaggenau"],
      ["Kitchen rangehood", "Qasair undermount"],
      ["Kitchen wall oven", "Gaggenau, Anthracite"],
      ["Pantry combi-steam oven", "Gaggenau, Anthracite"],
      ["Pantry combi-microwave", "Gaggenau, Anthracite"],
      ["Kitchen warming drawer", "Gaggenau, Anthracite"],
      ["Pantry fridge", "Gaggenau, fully integrated"],
      ["Pantry freezer", "Gaggenau, fully integrated"],
      ["Kitchen fridge/freezer", "Miele, fully integrated"],
      ["Bar wine cabinets", "Miele, 34 bottles x 2"],
      ["Kitchen dishwasher", "Gaggenau 60cm 200 Series DF210500"],
      ["Pantry dishwasher", "Miele Gen 5000 G5263SCVIBK"],
      ["Laundry fabric care cabinet", "Fisher & Paykel Series 11 FC1260H2"],
    ],
  },
  {
    title: "Lighting & electrical",
    count: "12 selections",
    items: [
      ["Dining pendant", "Glass Bubble Pendant - 8 Rod, custom bronze and fade grey glass"],
      ["Master ensuite wall light", "Melange Elongated Sconce, alabaster and bronze"],
      ["Ensuite 2 wall light", "Bebe 12 Ball Wall Lamp, 150mm"],
      ["Ensuite 3 wall light", "Crystal Capsule 615 Wall Lamp"],
      ["External wall light", "Australian Wall Light, aged brass"],
      ["Downlight", "Athena EVO High CRI LED gimbal"],
      ["Strip light", "Finish to suit joinery, concealed"],
      ["Light switches", "Slimline profile - white, black to black surfaces"],
      ["General GPO", "Slimline profile, white"],
      ["Kitchen stone GPO", "ZETR recessed double outlet and light switch"],
      ["Exhaust fan", "White finish"],
      ["Linear bar grille", "Custom flangeless, powdercoat to match wall"],
    ],
  },
  {
    title: "Window coverings",
    count: "2 selections",
    items: [
      ["Typical", "Roller blinds, sunscreen fabric, Dark Bronze hardware"],
      ["Bedrooms", "Double roller blinds, sunscreen and blockout, Dark Bronze hardware"],
    ],
  },
];

export default function Home() {
  const [activeRoom, setActiveRoom] = useState("Kitchen");
  const room = rooms[activeRoom];

  return (
    <main>
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="FourNineEight home">
          <span>Four</span><span>Nine</span><span>Eight</span>
        </a>
        <nav aria-label="Primary navigation">
          <a href="#residence">Residence</a>
          <a href="#materials">Materials</a>
          <a href="#specifications">Specifications</a>
        </nav>
        <a className="header-cta" href="#enquire">Private enquiry <span aria-hidden="true">↗</span></a>
      </header>

      <section className="hero" id="top">
        <div className="hero-kicker"><span>Apartment 01</span><span>Interior collection</span></div>
        <div className="hero-copy">
          <h1>The art of<br /><em>living well.</em></h1>
          <p>A considered interior shaped by enduring natural materials, architectural precision and objects chosen for the way they feel as much as the way they perform.</p>
        </div>
        <div className="hero-composition" aria-label="The FourNineEight material palette">
          <div className="hero-image hero-stone"><img src="/specs/p01-07.jpg" alt="Silver Travertine sample" /></div>
          <div className="hero-image hero-oak"><img src="/specs/p02-04.jpg" alt="French Oak sample" /></div>
          <div className="hero-image hero-dark"><img src="/specs/p01-04.jpg" alt="Dark Bronze finish sample" /></div>
          <div className="hero-caption"><span>Silver Travertine</span><span>French Oak</span><span>Dark Bronze</span></div>
        </div>
        <a className="scroll-cue" href="#residence"><span>Explore the residence</span><span aria-hidden="true">↓</span></a>
      </section>

      <section className="statement" id="residence">
        <p className="section-label">01 / The residence</p>
        <div className="statement-grid">
          <h2>Crafted as a<br />complete composition.</h2>
          <div>
            <p className="lead">Every element has been selected to create a calm and coherent whole - from honed travertine and warm French oak to the quiet tactility of graphite nickel and brushed gunmetal.</p>
            <p>The result is not simply a schedule of finishes, but an interior language that flows from social spaces to private retreats, balancing beauty with the realities of everyday life.</p>
          </div>
        </div>
      </section>

      <section className="room-explorer">
        <div className="room-tabs" role="tablist" aria-label="Explore specifications by room">
          {Object.keys(rooms).map((name) => (
            <button
              key={name}
              role="tab"
              aria-selected={activeRoom === name}
              className={activeRoom === name ? "active" : ""}
              onClick={() => setActiveRoom(name)}
            >
              {name}
            </button>
          ))}
        </div>
        <div className="room-intro" key={`${activeRoom}-intro`}>
          <p>{room.eyebrow}</p>
          <h2>{room.title}</h2>
          <span>{room.intro}</span>
        </div>
        <div className="selection-grid" key={activeRoom}>
          {room.selections.map((selection, index) => (
            <article className="selection-card" key={selection.item} style={{ "--delay": `${index * 70}ms` } as React.CSSProperties}>
              <div className="selection-image"><img src={selection.image} alt="" /></div>
              <div className="selection-meta">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div><h3>{selection.item}</h3><strong>{selection.detail}</strong><p>{selection.note}</p></div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="materials" id="materials">
        <div className="materials-heading">
          <p className="section-label">02 / Material palette</p>
          <h2>Honest materials.<br /><em>Quietly expressive.</em></h2>
          <p>Natural variation is part of the character. Each surface has been chosen to deepen with time and reward close attention.</p>
        </div>
        <div className="material-list">
          {materials.map((material) => (
            <article className="material-row" key={material.number}>
              <span>{material.number}</span>
              <div className="material-swatch"><img src={material.image} alt={`${material.name} material sample`} /></div>
              <h3>{material.name}</h3>
              <p>{material.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="performance">
        <p className="section-label light">03 / Performance</p>
        <div className="performance-grid">
          <h2>Precision,<br /><em>behind the scenes.</em></h2>
          <div className="brand-copy">
            <p>Appliances and fittings are integrated into the architecture, preserving clean lines while delivering uncompromising performance.</p>
            <div className="brand-list" aria-label="Selected brands">
              <span>GAGGENAU</span><span>Miele</span><span>ARTINOX</span><span>CAROMA</span><span>FISHER & PAYKEL</span><span>Zip</span>
            </div>
          </div>
        </div>
        <div className="appliance-gallery">
          <figure><img src="/specs/p06-04.jpg" alt="Gaggenau induction cooktop" /><figcaption><span>Kitchen</span>Gaggenau induction cooking</figcaption></figure>
          <figure><img src="/specs/p06-05.jpg" alt="Gaggenau anthracite oven" /><figcaption><span>Pantry</span>Gaggenau combi-steam</figcaption></figure>
          <figure><img src="/specs/p07-05.jpg" alt="Miele wine cabinet" /><figcaption><span>Bar</span>Miele wine preservation</figcaption></figure>
        </div>
      </section>

      <section className="specifications" id="specifications">
        <div className="spec-heading">
          <p className="section-label">04 / Complete schedule</p>
          <h2>Every detail,<br />considered.</h2>
          <p>Explore the complete Apartment 1 interior schedule. Open any category for the nominated selection and location.</p>
        </div>
        <div className="spec-accordion">
          {specificationGroups.map((group, index) => (
            <details key={group.title} open={index === 0}>
              <summary><span className="spec-number">{String(index + 1).padStart(2, "0")}</span><h3>{group.title}</h3><span>{group.count}</span><i aria-hidden="true">+</i></summary>
              <div className="spec-table">
                {group.items.map(([location, selection]) => (
                  <div className="spec-line" key={`${location}-${selection}`}><span>{location}</span><p>{selection}</p></div>
                ))}
              </div>
            </details>
          ))}
        </div>
        <div className="download-row">
          <p>For the original nine-page schedule, including reference imagery and nominated product details.</p>
          <a href="/fournineeight-apartment-1-specifications.pdf" download>Download complete PDF <span aria-hidden="true">↓</span></a>
        </div>
      </section>

      <section className="enquire" id="enquire">
        <div>
          <p>FourNineEight</p>
          <h2>Experience Apartment 01.</h2>
        </div>
        <a href="mailto:enquiries@fournineeight.com.au">Arrange a private appointment <span aria-hidden="true">↗</span></a>
      </section>

      <footer>
        <a className="wordmark footer-mark" href="#top"><span>Four</span><span>Nine</span><span>Eight</span></a>
        <p>Apartment 01 - Interior Specifications</p>
        <p>Materials and specifications are subject to availability and may be substituted with an equivalent selection.</p>
        <a href="#top">Back to top ↑</a>
      </footer>
    </main>
  );
}
