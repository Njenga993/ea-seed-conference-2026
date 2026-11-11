// components/Sponsors.tsx
import { useState } from "react";
import "../styles/sponsors.css";

// ── Logos ────────────────────────────────────────────────────────────────────
// Put the logo files in src/assets/sponsor/ with these names. If a file has a
// different name or extension (.svg, .webp, .jpg), just change the path here.
import seedChangeLogo from "../assets/sponsor/seedchange.png";
import swissaidLogo from "../assets/sponsor/swissaid.png";
import agroecologyFundLogo from "../assets/sponsor/agroecologyfund.png";
import landscapeAllianceLogo from "../assets/sponsor/landscape.png";
import rosaLuxemburgLogo from "../assets/sponsor/rosa.png";
import afsaLogo from "../assets/sponsor/afsa.png";
import eleventhHourLogo from "../assets/sponsor/11thHourLogo.svg";

// ── Data ─────────────────────────────────────────────────────────────────────
type TierId = "platinum" | "gold" | "silver" | "bronze";

interface Sponsor {
  name: string;
  logo: string;
  url?: string; // optional: add a website and the logo becomes a link
}

interface Tier {
  id: TierId;
  label: string; // shown on the tier header and on each card
  sponsors: Sponsor[];
}

// Each tier renders as its own labeled, static row. Card size still steps
// down by tier (Platinum biggest, Bronze smallest). One card per sponsor —
// no padding, no duplication.
const tiers: Tier[] = [
  {
    id: "platinum",
    label: "Platinum",
    sponsors: [
      { name: "SeedChange", logo: seedChangeLogo },
      { name: "Swissaid", logo: swissaidLogo },
      { name: "Agroecology Fund", logo: agroecologyFundLogo },
    ],
  },
  {
    id: "gold",
    label: "Gold",
    sponsors: [{ name: "Landscape Alliance", logo: landscapeAllianceLogo }],
  },
  {
    id: "silver",
    label: "Silver",
    sponsors: [{ name: "Rosa Luxemburg Foundation", logo: rosaLuxemburgLogo }],
  },
  {
    id: "bronze",
    label: "Bronze",
    sponsors: [
      { name: "AFSA", logo: afsaLogo },
      { name: "11th Hour Foundation", logo: eleventhHourLogo },
    ],
  },
];

interface Item {
  sponsor: Sponsor;
  tier: Tier;
}

// ── Single logo card ─────────────────────────────────────────────────────────
const SponsorCard = ({ item }: { item: Item }) => {
  const [failed, setFailed] = useState(false);
  const { sponsor, tier } = item;

  // If the image is missing or broken, show the sponsor's name instead of a
  // broken-image icon.
  const logo = failed ? (
    <span className="sp-fallback">{sponsor.name}</span>
  ) : (
    <img
      src={sponsor.logo}
      alt={sponsor.name}
      draggable={false}
      onError={() => setFailed(true)}
    />
  );

  const body = (
    <>
      <span className="sp-tier-label">{tier.label}</span>
      <span className="sp-logo">{logo}</span>
    </>
  );

  return (
    <li className={`sp-card sp-card--${tier.id}`}>
      {sponsor.url ? (
        <a
          href={sponsor.url}
          target="_blank"
          rel="noopener noreferrer"
          className="sp-card-inner"
          aria-label={`${sponsor.name}, ${tier.label} sponsor (opens in a new tab)`}
        >
          {body}
        </a>
      ) : (
        <div className="sp-card-inner">{body}</div>
      )}
    </li>
  );
};

// ── One tier row: header + static card row ──────────────────────────────────
interface TierRowProps {
  tier: Tier;
}

const TierRow = ({ tier }: TierRowProps) => {
  const items: Item[] = tier.sponsors.map((sponsor) => ({ sponsor, tier }));
  const count = tier.sponsors.length;

  return (
    <div className={`sp-tier sp-tier--${tier.id}`}>
      <div className="sp-tier-head">
        <span className="sp-tier-badge">{tier.label}</span>
        <span className="sp-tier-rule" />
        <span className="sp-tier-count">
          {count} {count === 1 ? "partner" : "partners"}
        </span>
      </div>

      {/* Static row of cards, one per sponsor. Wraps on small screens. */}
      <ul
        className={`sp-row sp-row--${count <= 2 ? "center" : "spread"}`}
        role="list"
        aria-label={`${tier.label} sponsors`}
      >
        {items.map((item, i) => (
          <SponsorCard item={item} key={`${tier.id}-${i}`} />
        ))}
      </ul>
    </div>
  );
};

// ── Component ────────────────────────────────────────────────────────────────
interface SponsorsProps {
  title?: string;
  subtitle?: string;
  showCta?: boolean; // the "become a sponsor" box at the bottom
  id?: string; // anchor id, e.g. for a #sponsors link
}

const Sponsors = ({
  title = "Our Sponsors",
  subtitle = "EA-ISC 2026 is made possible by the generous support of these organisations.",
  id = "sponsors",
}: SponsorsProps) => {
  return (
    <section id={id} className="sp-section" aria-labelledby="sp-heading">
      <div className="sp-container">
        <h2 id="sp-heading" className="sp-title">
          {title}
        </h2>
        <p className="sp-subtitle">{subtitle}</p>
      </div>

      {/* Each tier is its own labeled block. Tiers are stacked vertically with
          a hairline divider between them. */}
      <div className="sp-tiers">
        {tiers.map((tier) => (
          <TierRow tier={tier} key={tier.id} />
        ))}
      </div>


    </section>
  );
};

export default Sponsors;
