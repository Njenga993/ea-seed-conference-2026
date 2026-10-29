// components/Accommodation.tsx
import { useMemo, useState } from "react";
import { Phone, Mail, MapPin, BadgeCheck, ChevronDown, Search } from "lucide-react";
import "../styles/Accommodation.css";

interface RoomOption {
  type: string;
  price: string;
}

interface AccommodationEntry {
  id: number;
  name: string;
  location?: string;
  phones: string[];
  emails: string[];
  rooms: RoomOption[];
  status?: string; // used when there's no formal room breakdown yet (e.g. "Visited and confirmed")
  etims: boolean | null; // null = not specified in the source list
  comments?: string;
}

const ACCOMMODATIONS: AccommodationEntry[] = [
  {
    id: 1,
    name: "Corat Africa",
    location: "Bogani Road",
    phones: ["+254 720 888800", "+254 733 600045", "+254 724 569660"],
    emails: ["emmanuel.waya@coratafrica.com", "reservations@coratafrica.com"],
    rooms: [],
    status: "Visited and confirmed",
    etims: true,
    comments: "Booked for farmers accommodation.",
  },
  {
    id: 2,
    name: "Royale Karen",
    location: "off Lang'ata South Road, Opp. Kenya School of Law",
    phones: ["+254 705 057299", "+254 794 587133"],
    emails: ["gm@royalkaren.co.ke"],
    rooms: [
      { type: "Single rooms (3)", price: "BB – KES 3,500/day" },
      { type: "Cottages (6)", price: "BB – KES 4,500/day" },
      { type: "Double rooms (3)", price: "BB – KES 6,000/day" },
      { type: "Triple rooms (1)", price: "BB – KES 7,500/day" },
    ],
    etims: true,
    comments: "Prices not negotiable.",
  },
  {
    id: 3,
    name: "Fair Acres Guest House",
    location: "Fair Acres Road, off Langata Road",
    phones: ["+254 727 729202", "+254 715 271433", "+254 701 139983"],
    emails: ["reservations@fairacres-nairobi.co.ke", "sales@fairacres-nairobi.co.ke"],
    rooms: [
      { type: "Single deluxe (27 rooms)", price: "BB KES 14,000 / HB KES 17,000 · Non-resident BB $140 / HB $170" },
      { type: "Double deluxe", price: "BB KES 17,000 / HB KES 23,000 · Non-resident BB $170 / HB $230" },
      { type: "Triple deluxe", price: "BB KES 24,000 / HB KES 33,000 · Non-resident BB $240 / HB $330" },
      { type: "1-bedroom cottage", price: "BB KES 21,000 / HB KES 24,000 · Non-resident BB $210 / HB $240" },
    ],
    etims: true,
  },
  {
    id: 4,
    name: "Roussel House",
    location: "Near Karen Centre, off Ngong Road",
    phones: ["+254 722 306030", "+254 739 309593"],
    emails: ["maisonroussel@yahoo.fr"],
    rooms: [
      { type: "70 rooms (Standard & Executive)", price: "BB – KES 5,500 + VAT/day" },
      { type: "Group sharing (80 pax)", price: "Meals – KES 2,000 + VAT" },
    ],
    etims: true,
    comments: "Owned by the Catholic Church. Prices not negotiable. Available on Google Maps.",
  },
  {
    id: 5,
    name: "Bankhouse Retreat Karen",
    location: "Ndege Road, off Langata Road",
    phones: ["+254 705 288510", "+254 731 717515"],
    emails: ["bankhousekaren@gmail.com"],
    rooms: [
      { type: "34 rooms (single & double)", price: "Standard BB – KES 4,500/day" },
      { type: "Shared rooms", price: "Deluxe BB – KES 5,000/day" },
    ],
    etims: true,
    comments: "Rooms are neat. Available on Google Maps.",
  },
  {
    id: 6,
    name: "Loreto Mary Ward Retreat Centre",
    phones: ["+254 713 895973"],
    emails: ["admin@marywardcentre.co.ke"],
    rooms: [
      { type: "40 rooms (single & double)", price: "BB – KES 3,132 + VAT/day" },
      { type: "Group sharing (44 pax)", price: "HB – KES 4,060 + VAT/day" },
    ],
    etims: true,
    comments: "Owned by the Catholic Church. Prices not negotiable. Available on Google Maps.",
  },
  {
    id: 7,
    name: "Don Bosco Youth Centre",
    location: "Windy Ridge, off Dagoretti Road, Karen",
    phones: ["+254 706 349971"],
    emails: ["dbs@donboscoeastafrica.org"],
    rooms: [
      { type: "22 rooms (single & double)", price: "HB – KES 3,000/day" },
      { type: "Group sharing (44 pax)", price: "Bed only – KES 2,500/day · BB – KES 3,000/day" },
    ],
    etims: true,
    comments: "Owned by the Catholic Church. Rooms are neat. Available on Google Maps.",
  },
  {
    id: 8,
    name: "Subiaco Center for Spirituality (Kenya)",
    location: "Windy Ridge, off Dagoretti Road, Karen",
    phones: ["+254 712 764978"],
    emails: ["prioprss@nairobi-priory.org"],
    rooms: [
      { type: "19 rooms (single & double)", price: "HB – KES 3,800/day" },
      { type: "Group sharing (40 pax)", price: "Bed only – KES 3,000/day" },
    ],
    etims: true,
    comments: "Owned by the Catholic Church. Rooms are neat. Available on Google Maps.",
  },
  {
    id: 9,
    name: "Mary Magdalene Retreat House",
    location: "Resurrection Garden, Karen",
    phones: ["+254 717 293658", "+254 723 106365", "+254 734 230672"],
    emails: ["stmarymagie@gmail.com"],
    rooms: [
      { type: "40 rooms (single & double)", price: "FB – KES 4,200/day" },
      { type: "Group sharing (52 pax)", price: "HB – KES 3,500/day · BB – KES 3,500/day" },
    ],
    etims: true,
    comments: "Owned by the Catholic Church. Rooms are neat. Available on Google Maps.",
  },
  {
    id: 10,
    name: "Dimesse Sisters Retreat",
    location: "Karen, Karen Road",
    phones: ["+254 724 939871"],
    emails: ["dimesse.retreatcentre@gmail.com"],
    rooms: [
      { type: "35 rooms (single & double)", price: "FB – KES 4,500/day" },
      { type: "Group sharing (2 pax/room)", price: "HB – KES 3,500/day · BB – KES 3,500/day" },
    ],
    etims: true,
    comments: "Owned by the Catholic Church. Rooms are neat. Available on Google Maps.",
  },
  {
    id: 11,
    name: "Radix Hotel Ltd – Apostles of Jesus",
    phones: ["+254 725 533983"],
    emails: ["irerijn65@jmail.com", "operationsmanager@gmail.com"],
    rooms: [
      { type: "100 single standard rooms", price: "Standard BB – KES 5,500/day" },
      { type: "50 deluxe rooms", price: "Deluxe BB – KES 6,000/day" },
      { type: "28 twin rooms", price: "Twin (2 pax) BB – KES 10,000/day" },
    ],
    etims: true,
    comments: "Walking distance to CUEA is 15–20 minutes.",
  },
  {
    id: 12,
    name: "Life in Abundance Hotel and Training Centre",
    location: "Karen, Silanga Road, off Langata Road",
    phones: ["+254 745 372630", "+254 20 4404403"],
    emails: ["reservations@lifeinabundance.org", "stay@liacenter.co.ke"],
    rooms: [
      { type: "Single standard (21 pax)", price: "BB KES 8,400 / HB KES 9,900 · NR BB $84 / HB $99" },
      { type: "Double standard (42 pax)", price: "BB KES 9,900 / HB KES 12,900 · NR BB $99 / HB $129" },
      { type: "Double deluxe", price: "BB KES 10,900 / HB KES 13,900 · NR BB $109 / HB $139" },
      { type: "Triple deluxe", price: "BB KES 13,900 / HB KES 17,900 · NR BB $139 / HB $179" },
      { type: "Single executive", price: "BB KES 10,400 / HB KES 11,900 · NR BB $104 / HB $119" },
      { type: "Double executive", price: "BB KES 11,900 / HB KES 14,900 · NR BB $119 / HB $149" },
    ],
    etims: true,
  },
  {
    id: 13,
    name: "South House Airbnb Hotel",
    phones: ["+254 721 410684"],
    emails: [],
    rooms: [
      { type: "Studio rooms (11)", price: "Bed only – KES 1,500" },
      { type: "One-bedroom rooms (3, up to 3 pax)", price: "Price on request" },
    ],
    etims: false,
    comments: "Airbnb listing. Budget accommodation.",
  },
  {
    id: 14,
    name: "The End, Karen",
    location: "Off Dagoretti Road, opposite Africa International University",
    phones: ["+254 706 307036"],
    emails: [],
    rooms: [{ type: "6 rooms (standard & deluxe)", price: "Price on request" }],
    etims: null,
    comments: "Rooms are neat.",
  },
  {
    id: 15,
    name: "Acacia Tree Lodge",
    location: "Marula Lane, off Karen Road",
    phones: ["+254 702 460460", "+254 702 360360", "+254 702 560560"],
    emails: ["acaciatreesuitesltd@gmail.com"],
    rooms: [
      { type: "7 rooms (standard & deluxe)", price: "BB $85 / HB $100" },
      { type: "Double/Twin (28 pax)", price: "BB $150 / HB $180" },
      { type: "Triple rooms", price: "BB $200 / HB $280" },
    ],
    etims: true,
    comments: "Very neat, executive rooms. Available on Google Maps.",
  },
  {
    id: 16,
    name: "Hermosa Hotel",
    location: "Marula Lane, off Karen Road",
    phones: ["+254 722 222299", "+254 111 033200"],
    emails: ["reservations@hermosanairobi.com"],
    rooms: [
      { type: "Deluxe rooms", price: "KES 22,500 (1pax) / 30,000 (2pax) · NR $315 / $420" },
      { type: "Executive rooms", price: "KES 28,300 (1pax) / 37,750 (2pax) · NR $400 / $535" },
      { type: "Garden suite", price: "KES 32,250 (1pax) / 43,000 (2pax) · NR $470 / $625" },
      { type: "Presidential suite", price: "KES 150,000 (1–2 pax) · NR $1,200" },
    ],
    etims: true,
  },
  {
    id: 17,
    name: "Red Brick House",
    phones: [],
    emails: [],
    rooms: [{ type: "21 rooms (single)", price: "Bed only – KES 2,500" }],
    etims: true,
  },
  {
    id: 18,
    name: "The Cycad Hotel",
    phones: ["+254 793 292237", "+254 768 241956", "+254 725 822540 (Purity)"],
    emails: ["info@thecycads.co.ke"],
    rooms: [
      { type: "18 rooms (deluxe, standard, superior)", price: "Standard BB – KES 8,000/day" },
      { type: "Double", price: "BB – KES 10,000/day" },
      { type: "Triple", price: "BB – KES 13,000/day" },
    ],
    etims: true,
    comments: "1-bedroom apartment-style accommodation. Rooms are neat. Available on Google Maps.",
  },
  {
    id: 19,
    name: "Cold Springs – Karen Boutique Hotel",
    location: "Marula Lane, off Karen Road",
    phones: ["+254 712 449429", "+254 732 758578"],
    emails: ["reception@karen.coldspringshotels.com"],
    rooms: [
      { type: "Single deluxe", price: "BB KES 12,000 / HB KES 15,000 · NR BB $120 / HB $144" },
      { type: "Double deluxe", price: "BB KES 15,000 / HB KES 21,000 · NR BB $144 / HB $192" },
      { type: "Triple deluxe", price: "BB KES 18,000 / HB KES 26,000 · NR BB $168 / HB $240" },
      { type: "Superior deluxe (single)", price: "BB KES 15,000 / HB KES 18,000 · NR BB $144 / HB $168" },
      { type: "Superior deluxe (double)", price: "BB KES 20,000 / HB KES 25,000 · NR BB $180 / HB $228" },
    ],
    etims: true,
  },
  {
    id: 20,
    name: "Hemingways, Karen",
    location: "Marula Lane, off Karen Road",
    phones: ["+254 20 5006200", "+254 711 032000"],
    emails: ["central.reservations@hemingways.co", "reception.nairobi@hemingways.co"],
    rooms: [
      { type: "Deluxe suites", price: "BB – KES 109,798" },
      { type: "Executive suites", price: "BB – KES 129,479" },
      { type: "Blixen suites", price: "BB – KES 215,972" },
      { type: "Hemingways suites", price: "BB – KES 308,679" },
    ],
    etims: true,
  },
  {
    id: 21,
    name: "Carmelite Community",
    location: "LRC Road, off Langata South Road",
    phones: ["+254 727 527677", "+254 740 580114 (Br. Francis)"],
    emails: [],
    rooms: [
      { type: "Self-contained rooms (5)", price: "FB – KES 3,000" },
      { type: "Shared rooms (3, 2 pax)", price: "FB – KES 3,000" },
      { type: "Single rooms (25, external washrooms)", price: "FB – KES 2,500" },
      { type: "Board rooms (2, 11 pax)", price: "FB – KES 2,500" },
    ],
    etims: false,
    comments: "Owned by the Catholic Church. Available on Google Maps.",
  },
  {
    id: 22,
    name: "Stedmak Gardens – Karen",
    location: "Mokoyeti Road East, off Langata Road",
    phones: ["+254 705 734780"],
    emails: ["info@stedmakgroupofhotels.co.ke"],
    rooms: [
      { type: "Standard rooms (24 pax)", price: "BB – KES 5,000 · Bed only – KES 4,000" },
      { type: "Deluxe rooms (8 pax)", price: "BB – KES 10,000 · Bed only – KES 8,000" },
    ],
    etims: true,
    comments: "Very nice rooms. Available on Google Maps.",
  },
  {
    id: 23,
    name: "Stedmak Gardens – Rongai",
    location: "Next to Quickmart, Ongata Rongai",
    phones: ["+254 723 338020"],
    emails: [],
    rooms: [{ type: "Standard rooms (20 pax)", price: "BB – KES 2,000" }],
    etims: null,
  },
  {
    id: 24,
    name: "Teresia van Miert Spirituality Centre",
    location: "Mukinduri Garden, Bomas",
    phones: ["+254 708 354734", "+254 740 253805 (Sr. Beryl)"],
    emails: [],
    rooms: [{ type: "Standard rooms (20, 20 pax)", price: "BB – KES 3,500" }],
    etims: true,
    comments: "Owned by the Catholic Church. Available on Google Maps.",
  },
  {
    id: 25,
    name: "Franciscan Family Association – Portiuncula Centre",
    location: "Bogani East Road",
    phones: ["+254 716 112376", "+254 737 047192", "+254 727 879511 (Harriet)"],
    emails: ["info@ffakenya.org"],
    rooms: [{ type: "Single standard rooms (33 pax)", price: "BB – KES 3,000 · HB – KES 4,000" }],
    etims: true,
    comments: "Owned by the Catholic Church. Available on Google Maps.",
  },
  {
    id: 26,
    name: "Balis Best Bar & Resort",
    location: "Along Magadi Road",
    phones: ["+254 702 078333"],
    emails: [],
    rooms: [
      { type: "Single standard rooms (15 pax)", price: "Bed only – KES 3,500 / KES 2,500" },
      { type: "Breakfast (add-on)", price: "KES 600" },
    ],
    etims: true,
    comments: "Very nice rooms. Available on Google Maps.",
  },
  {
    id: 27,
    name: "Longview Luxury Suites",
    location: "Along Magadi Road",
    phones: ["+254 717 755497"],
    emails: ["managerlongviewresort@gmail.com"],
    rooms: [
      { type: "Single standard rooms (32 pax)", price: "BB – KES 6,000" },
      { type: "Double rooms (2 pax)", price: "BB – KES 8,000" },
    ],
    etims: true,
    comments: "Rooms are 1-bedroom apartments. Available on Google Maps.",
  },
  {
    id: 28,
    name: "The Cottage Residence",
    location: "Banda Lane, off Magadi Road",
    phones: ["+254 795 380675"],
    emails: [],
    rooms: [
      { type: "Deluxe rooms (6 pax)", price: "BB – $60" },
      { type: "Superior room", price: "BB – $70" },
      { type: "1-bedroom", price: "BB – $90" },
    ],
    etims: false,
    comments: "Available on Google Maps.",
  },
];

const AccommodationCard = ({ entry }: { entry: AccommodationEntry }) => {
  const [expanded, setExpanded] = useState(false);
  const visibleRooms = expanded ? entry.rooms : entry.rooms.slice(0, 2);
  const hasMore = entry.rooms.length > 2;
  const mapsQuery = encodeURIComponent(
    `${entry.name} ${entry.location ?? "Karen, Nairobi"}`,
  );

  return (
    <article className="accom-card" itemScope itemType="https://schema.org/LodgingBusiness">
      <div className="accom-card-header">
        <span className="accom-index" aria-hidden="true">
          {String(entry.id).padStart(2, "0")}
        </span>
        <div className="accom-card-heading">
          <h3 itemProp="name">{entry.name}</h3>
          {entry.location && (
            <p className="accom-location">
              <MapPin size={14} aria-hidden="true" />
              <span itemProp="address">{entry.location}</span>
            </p>
          )}
        </div>
        {entry.etims === true && (
          <span className="accom-badge accom-badge-verified">
            <BadgeCheck size={14} aria-hidden="true" />
            eTIMS
          </span>
        )}
      </div>

      {(entry.phones.length > 0 || entry.emails.length > 0) && (
        <div className="accom-contacts">
          {entry.phones.map((phone) => (
            <a
              key={phone}
              href={`tel:${phone.replace(/[^\d+]/g, "")}`}
              className="accom-contact-link"
            >
              <Phone size={14} aria-hidden="true" />
              {phone}
            </a>
          ))}
          {entry.emails.map((email) => (
            <a key={email} href={`mailto:${email}`} className="accom-contact-link">
              <Mail size={14} aria-hidden="true" />
              {email}
            </a>
          ))}
        </div>
      )}

      <div className="accom-rooms">
        {entry.status && <p className="accom-status">{entry.status}</p>}
        {visibleRooms.map((room, i) => (
          <div className="accom-room-row" key={i}>
            <span className="accom-room-type">{room.type}</span>
            <span className="accom-room-price">{room.price}</span>
          </div>
        ))}
        {entry.rooms.length === 0 && !entry.status && (
          <p className="accom-status accom-status-muted">Contact for rates</p>
        )}
      </div>

      {hasMore && (
        <button
          type="button"
          className="accom-toggle"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
        >
          <ChevronDown
            size={16}
            className={`accom-toggle-icon ${expanded ? "is-open" : ""}`}
            aria-hidden="true"
          />
          {expanded ? "Show fewer room options" : `Show all ${entry.rooms.length} room options`}
        </button>
      )}

      {entry.comments && <p className="accom-comment">{entry.comments}</p>}

      <a
        className="accom-map-link"
        href={`https://www.google.com/maps/search/?api=1&query=${mapsQuery}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        View on Google Maps
      </a>
    </article>
  );
};

const Accommodation = () => {
  const [query, setQuery] = useState("");
  const [verifiedOnly, setVerifiedOnly] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ACCOMMODATIONS.filter((entry) => {
      if (verifiedOnly && entry.etims !== true) return false;
      if (!q) return true;
      return (
        entry.name.toLowerCase().includes(q) ||
        (entry.location ?? "").toLowerCase().includes(q)
      );
    });
  }, [query, verifiedOnly]);

  return (
    <section className="accom-section" aria-labelledby="accommodation-heading">
      <div className="accom-container">
        <header className="accom-header">
          <span className="accom-tag">Where to Stay</span>
          <h2 className="accom-title" id="accommodation-heading">
            Accommodation Near the Venue
          </h2>
          <p className="accom-description">
            A list of {ACCOMMODATIONS.length} guest houses, retreat centres and hotels around
            the Catholic University of Eastern Africa (CUEA), compiled and verified by the
            conference secretariat. Rates and availability are set directly by each
            facility — please confirm before booking.
          </p>
        </header>

        <div className="accom-toolbar">
          <div className="accom-search">
            <Search size={18} aria-hidden="true" />
            <input
              type="text"
              placeholder="Search by name or location…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search accommodation by name or location"
            />
          </div>
          <label className="accom-filter">
            <input
              type="checkbox"
              checked={verifiedOnly}
              onChange={(e) => setVerifiedOnly(e.target.checked)}
            />
            eTIMS verified only
          </label>
          <span className="accom-count">
            {filtered.length} of {ACCOMMODATIONS.length} listed
          </span>
        </div>

        {filtered.length > 0 ? (
          <div className="accom-grid">
            {filtered.map((entry) => (
              <AccommodationCard entry={entry} key={entry.id} />
            ))}
          </div>
        ) : (
          <p className="accom-empty">No accommodation matches your search.</p>
        )}

        <div className="accom-note">
          <p>
            Prices shown are as supplied by each facility and are subject to change. BB =
            Bed &amp; Breakfast, HB = Half Board, FB = Full Board, NR = Non-resident rate.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Accommodation;