"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type SpecRow = { category: string; item: string; location: string; specification: string; image?: string };
const r = (category: string, item: string, location: string, specification: string, image?: string): SpecRow => ({ category, item, location, specification, image });

const rows: SpecRow[] = [
  r("Materials & finishes", "Paint", "Internal walls", "Colour: Dulux Natural White (SW1F4)\nFinish: Matte", "/specs/p01-01.png"),
  r("Materials & finishes", "Carpet", "Bedrooms", "Colour: Wheatgrass\nName: Riviera Heamstead\n100% Wool", "/specs/p01-02.jpg"),
  r("Materials & finishes", "Textured toughened glass", "Nominated locations", "Clear low iron glass\nNo green/blue tint\nTexture: Narrow reeded", "/specs/p01-03.jpg"),
  r("Materials & finishes", "Powdercoat finish", "Nominated joinery\nSteel doors", "Colour: Dark Bronze\nName: Dulux\nFinish: Flat", "/specs/p01-04.jpg"),
  r("Materials & finishes", "X-Bond microcement", "Main ensuite\nPowder room", "Colour: TBC", "/specs/p01-05.jpg"),
  r("Materials & finishes", "Natural stone - slab", "Kitchen\nPantry\nLaundry\nMaster ensuite\nMaster WIR\nBar", "Vanilish Pearl", "/specs/p01-06.jpg"),
  r("Materials & finishes", "Natural stone - slab", "Kitchen\nLaundry\nBar\nLiving room", "Silver Travertine\nFinish: Honed", "/specs/p01-07.jpg"),
  r("Materials & finishes", "Natural stone - slab", "Powder room\nEntry", "Titanium Travertine", "/specs/p01-08.jpg"),
  r("Materials & finishes", "Natural stone slab", "Ensuite 2 & 3", "Victory Beige\nFinish: Honed", "/specs/p02-01.jpg"),
  r("Materials & finishes", "Natural stone", "Study", "TBC", "/specs/p02-02.jpg"),
  r("Materials & finishes", "Floor and wall tile", "Powder room\nLaundry\nEnsuite 2 & 3", "Rome Limestone\nColour: Clay\nFinish: Natural (P3)", "/specs/p02-03.png"),
  r("Materials & finishes", "Italian tiles", "Master ensuite", "Silver Travertine\nFinish: Honed (P3)", "/specs/p02-04.jpg"),
  r("Materials & finishes", "Paving", "Nominated outdoor areas", "TBC"),
  r("Materials & finishes", "Timber flooring", "Living\nDining\nKitchen\nHallway\nStudy", "French Oak\nPattern: Plank\nColour: Dans Oak", "/specs/p02-05.jpg"),
  r("Plumbing & bathroom", "Workstation sink", "Kitchen", "Artinox Planum 50\nStainless steel\nFully undermounted", "/specs/p02-06.jpg"),
  r("Plumbing & bathroom", "Workstation sink", "Pantry", "Artinox Planum 111\nStainless steel\nFully undermounted", "/specs/p02-07.jpg"),
  r("Plumbing & bathroom", "Single sink", "Laundry", "Franke Bolero\nStainless steel", "/specs/p03-01.jpg"),
  r("Plumbing & bathroom", "Sink mixer", "Pantry, laundry", "Elysian commercial pull-out kitchen mixer\nBrushed Gunmetal", "/specs/p03-02.jpg"),
  r("Plumbing & bathroom", "Filtered water tap", "Kitchen", "Zip HydroTap G5 Celsius Plus All-In-One Pull Out\nBoiling, chilled & sparkling\nBrushed Gunmetal", "/specs/p03-03.jpg"),
  r("Plumbing & bathroom", "Undermount basin", "Ensuite 2 and ensuite 3", "Studio Bagno POP\nWhite", "/specs/p03-04.jpg"),
  r("Plumbing & bathroom", "Basin mixer", "Ensuites\nPowder room", "Elysian Minimal mixer & spout set\nBrushed Gunmetal", "/specs/p03-05.jpg"),
  r("Plumbing & bathroom", "Bath swivel mixer", "Main ensuite", "Elysian floor mounted bath filler with hand shower\nBrushed Gunmetal", "/specs/p03-06.jpg"),
  r("Plumbing & bathroom", "Freestanding bath", "Main ensuite", "TBC", "/specs/p03-07.jpg"),
  r("Plumbing & bathroom", "Toilet pan", "Ensuites\nPowder room", "Caroma Urbane II Bidet Cleanflush back-to-wall pan\nConcealed cistern with round dual flush plate and buttons\nGunmetal", "/specs/p03-08.jpg"),
  r("Plumbing & bathroom", "Toilet roll holder", "Ensuites\nPowder room", "Elysian toilet roll holder\nBrushed Gunmetal", "/specs/p04-01.jpg"),
  r("Plumbing & bathroom", "Wall shower", "Ensuites", "Round shower head, 250mm\nBrushed Gunmetal", "/specs/p04-02.jpg"),
  r("Plumbing & bathroom", "Hand shower", "Ensuites", "Sola hand shower set\nBrushed Gunmetal", "/specs/p04-03.jpg"),
  r("Plumbing & bathroom", "Shower mixer", "Ensuites", "Elysian Minimal mixer\nBrushed Gunmetal", "/specs/p04-04.jpg"),
  r("Plumbing & bathroom", "Floor waste", "Ensuites", "Pixi tile insert shower channel waste, 900mm\nBrushed Gunmetal", "/specs/p04-05.jpg"),
  r("Plumbing & bathroom", "Heated towel rail", "Ensuites", "Modi adjustable heated towel rail, 900mm\nBrushed Gunmetal", "/specs/p04-06.jpg"),
  r("Plumbing & bathroom", "Robe hook", "As nominated", "Elysian robe hook\nBrushed Gunmetal", "/specs/p04-07.jpg"),
  r("Hardware & joinery", "Pullout bin", "Kitchen", "Vauth-Sagel\n2 x 35L\nGrey", "/specs/p04-08.jpg"),
  r("Hardware & joinery", "Cutlery tray and utensils insert", "Kitchen", "Blum Orgaline\nTo suit drawer widths", "/specs/p05-01.jpg"),
  r("Hardware & joinery", "Door lever", "General", "Gilda on round rose\nGraphite Nickel", "/specs/p05-02.jpg"),
  r("Hardware & joinery", "Door lever", "Entry doors", "Prisma on round rose\nGraphite Nickel", "/specs/p05-03.jpg"),
  r("Hardware & joinery", "Door lock", "Entry door", "TBC"),
  r("Hardware & joinery", "Floor mounted door stop", "General swing doors", "Graphite Nickel", "/specs/p05-04.jpg"),
  r("Hardware & joinery", "Wall mounted door stop", "General swing doors", "Concealed skirting fix\nGraphite Nickel", "/specs/p05-05.jpg"),
  r("Hardware & joinery", "Magnetic door stop", "General swing doors", "Graphite Nickel"),
  r("Hardware & joinery", "Recessed flush pull", "Nominated doors", "To match Graphite Nickel", "/specs/p05-06.jpg"),
  r("Hardware & joinery", "Hinges & privacy snib lock", "Nominated doors", "Graphite Nickel"),
  r("Hardware & joinery", "Pivot hinges", "Nominated doors", "Concealed pivot mechanism"),
  r("Hardware & joinery", "Flush bolt", "Double doors", "To match Graphite Nickel"),
  r("Appliances", "Induction cooktop", "Kitchen", "Gaggenau", "/specs/p06-01.jpg"),
  r("Appliances", "Undermount rangehood", "Kitchen", "Qasair", "/specs/p06-02.jpg"),
  r("Appliances", "Wall oven", "Kitchen", "Gaggenau\nColour: Anthracite", "/specs/p06-03.jpg"),
  r("Appliances", "Combi-steam oven", "Pantry", "Gaggenau\nColour: Anthracite", "/specs/p06-04.jpg"),
  r("Appliances", "Combi-microwave oven", "Pantry", "Gaggenau combi-microwave oven\nAnthracite", "/specs/p06-05.jpg"),
  r("Appliances", "Warming drawer", "Kitchen", "Gaggenau\nColour: Anthracite", "/specs/p07-01.jpg"),
  r("Appliances", "Integrated fridge", "Pantry", "Gaggenau\nFully integrated", "/specs/p07-02.jpg"),
  r("Appliances", "Integrated freezer", "Pantry", "Gaggenau\nFully integrated", "/specs/p07-03.jpg"),
  r("Appliances", "Integrated fridge + freezer", "Kitchen", "Miele", "/specs/p07-04.jpg"),
  r("Appliances", "Wine cabinet", "Bar", "Miele\n34 bottles x 2", "/specs/p07-05.jpg"),
  r("Appliances", "Integrated dishwasher", "Kitchen", "Gaggenau 60cm 200 Series fully integrated dishwasher\nDF210500", "/specs/p07-06.jpg"),
  r("Appliances", "Integrated dishwasher", "Pantry", "Miele Gen 5000 fully integrated dishwasher\nG5263SCVIBK", "/specs/p07-07.jpg"),
  r("Appliances", "Fabric care cabinet", "Laundry", "Fisher & Paykel Series 11\n60cm Contemporary Fabric Care Cabinet\nFC1260H2", "/specs/p07-08.jpg"),
  r("Lighting & electrical", "Pendant light", "Dining", "Glass Bubble Pendant - 8 Rod\nFinish: Custom Bronze\nGlass: Fade Grey", "/specs/p08-01.jpg"),
  r("Lighting & electrical", "Wall light", "Main ensuite", "Melange Elongated Sconce\nFinish: Alabaster\nMetal: Bronze", "/specs/p08-02.jpg"),
  r("Lighting & electrical", "Wall light", "Ensuite 02", "Bebe 12 Ball Wall Lamp\n150mm", "/specs/p08-03.jpg"),
  r("Lighting & electrical", "Wall light", "Ensuite 03", "Crystal Capsule 615 Wall Lamp", "/specs/p08-04.jpg"),
  r("Lighting & electrical", "External wall light", "Driveway\nLandscaping", "Australian Wall Light\nAged Brass", "/specs/p08-05.jpg"),
  r("Lighting & electrical", "Downlight", "General", "Athena EVO High CRI LED gimbal downlight", "/specs/p08-06.jpg"),
  r("Lighting & electrical", "Strip light", "Nominated locations", "Finish to suit joinery for concealed finish", "/specs/p08-07.jpg"),
  r("Lighting & electrical", "Light switch", "General", "Slimline profile\nFinish: White\nBlack to black surfaces"),
  r("Lighting & electrical", "GPO", "General", "Slimline profile\nFinish: White"),
  r("Lighting & electrical", "ZETR GPO recessed", "Kitchen stone surfaces", "Double outlet & light switch recessed flush with stone", "/specs/p09-01.jpg"),
  r("Lighting & electrical", "Exhaust fan", "Bathrooms\nLaundry", "Finish: White", "/specs/p09-02.jpg"),
  r("Lighting & electrical", "Linear bar grille", "Throughout", "Custom flangeless bar grille\nPowdercoat to match wall", "/specs/p09-03.jpg"),
  r("Window coverings", "Window coverings", "Typical", "Roller blinds\nSunscreen fabric\nHardware: Dark Bronze"),
  r("Window coverings", "Window coverings", "Bedrooms", "Double roller blinds\nSunscreen + blockout\nHardware: Dark Bronze"),
];

const categories = ["All", ...Array.from(new Set(rows.map((row) => row.category)))];

export default function Home() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const filteredRows = useMemo(() => {
    const term = query.trim().toLowerCase();
    return rows.filter((row) => (category === "All" || row.category === category) && (!term || `${row.item} ${row.location} ${row.specification}`.toLowerCase().includes(term)));
  }, [category, query]);
  const visibleCategories = categories.slice(1).filter((name) => filteredRows.some((row) => row.category === name));
  const closeLightbox = useCallback(() => setSelectedIndex(null), []);
  const showPrevious = useCallback(() => setSelectedIndex((index) => index === null ? null : (index - 1 + filteredRows.length) % filteredRows.length), [filteredRows.length]);
  const showNext = useCallback(() => setSelectedIndex((index) => index === null ? null : (index + 1) % filteredRows.length), [filteredRows.length]);

  return (
    <main>
      <header className="topbar">
        <a className="brand" href="#top" aria-label="FourNineEight home">FourNineEight</a>
        <div className="topbar-actions">
          <button type="button" onClick={() => window.print()}>Print</button>
          <a href="/fournineeight-apartment-1-specifications.pdf" download>Download PDF</a>
        </div>
      </header>
      <section className="page-heading" id="top">
        <div><p>FourNineEight</p><h1>Apartment 1 Interior Specifications</h1></div>
        <span>{rows.length} items</span>
      </section>
      <section className="controls" aria-label="Specification filters">
        <label className="search-field">
          <span>Search</span>
          <input type="search" value={query} onChange={(event) => { setQuery(event.target.value); setSelectedIndex(null); }} placeholder="Search item, location or specification" />
        </label>
        <div className="category-filters" role="group" aria-label="Filter by category">
          {categories.map((name) => <button type="button" key={name} className={category === name ? "active" : ""} aria-pressed={category === name} onClick={() => { setCategory(name); setSelectedIndex(null); }}>{name}</button>)}
        </div>
        <p className="result-count">Showing {filteredRows.length} of {rows.length} items</p>
      </section>
      <section className="table-wrap" aria-label="Apartment 1 specification schedule">
        {filteredRows.length ? (
          <table>
            <colgroup><col className="item-col" /><col className="location-col" /><col className="spec-col" /><col className="reference-col" /></colgroup>
            <thead><tr><th>Item</th><th>Location</th><th>Specification</th><th>Reference</th></tr></thead>
            <tbody>{visibleCategories.map((name) => <CategoryRows key={name} name={name} rows={filteredRows.filter((row) => row.category === name)} onSelect={(row) => setSelectedIndex(filteredRows.indexOf(row))} />)}</tbody>
          </table>
        ) : (
          <div className="empty-state"><p>No specifications match “{query}”.</p><button type="button" onClick={() => { setQuery(""); setCategory("All"); }}>Clear filters</button></div>
        )}
      </section>
      <footer><span>FourNineEight</span><span>Apartment 1 Interior Specifications</span><a href="#top">Back to top</a></footer>
      {selectedIndex !== null ? (
        <Lightbox item={filteredRows[selectedIndex]} index={selectedIndex} total={filteredRows.length} onClose={closeLightbox} onPrevious={showPrevious} onNext={showNext} />
      ) : null}
    </main>
  );
}

function CategoryRows({ name, rows: categoryRows, onSelect }: { name: string; rows: SpecRow[]; onSelect: (row: SpecRow) => void }) {
  return <>
    <tr className="category-row"><th colSpan={4}>{name}<span>{categoryRows.length}</span></th></tr>
    {categoryRows.map((row, index) => <tr key={`${name}-${row.item}-${row.location}-${index}`}>
      <td className="item-cell"><button type="button" className="item-button" onClick={() => onSelect(row)}>{row.item}</button></td><td>{formatText(row.location)}</td><td>{formatText(row.specification)}</td>
      <td className="reference-cell">{row.image ? <button type="button" className="thumbnail-button" onClick={() => onSelect(row)} aria-label={`View ${row.item} details`}><img src={row.image} alt={`${row.item} reference`} loading="lazy" /></button> : <button type="button" className="no-image-button" onClick={() => onSelect(row)} aria-label={`View ${row.item} details`}>—</button>}</td>
    </tr>)}
  </>;
}

function formatText(value: string) { return value.split("\n").map((line, index) => <span key={`${line}-${index}`}>{line}</span>); }

function Lightbox({ item, index, total, onClose, onPrevious, onNext }: { item: SpecRow; index: number; total: number; onClose: () => void; onPrevious: () => void; onNext: () => void }) {
  const dialogRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") onPrevious();
      if (event.key === "ArrowRight") onNext();
      if (event.key === "Tab") {
        const focusable = dialogRef.current?.querySelectorAll<HTMLElement>("button:not([disabled]), a[href]");
        if (!focusable?.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && (document.activeElement === first || document.activeElement === dialogRef.current)) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
    };
  }, [onClose, onNext, onPrevious]);

  return (
    <div className="lightbox-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <section className="lightbox" role="dialog" aria-modal="true" aria-labelledby="lightbox-title" ref={dialogRef} tabIndex={-1}>
        <div className="lightbox-toolbar">
          <span>{index + 1} of {total}</span>
          <button type="button" onClick={onClose} aria-label="Close item details">Close ×</button>
        </div>
        <div className="lightbox-content">
          <div className="lightbox-image">
            {item.image ? <img src={item.image} alt={`${item.item} reference`} /> : <span>No reference image</span>}
          </div>
          <div className="lightbox-details">
            <p>{item.category}</p>
            <h2 id="lightbox-title">{item.item}</h2>
            <dl>
              <div><dt>Location</dt><dd>{formatText(item.location)}</dd></div>
              <div><dt>Specification</dt><dd>{formatText(item.specification)}</dd></div>
            </dl>
          </div>
        </div>
        <button type="button" className="lightbox-arrow previous" onClick={onPrevious} aria-label="Previous item">←</button>
        <button type="button" className="lightbox-arrow next" onClick={onNext} aria-label="Next item">→</button>
      </section>
    </div>
  );
}
