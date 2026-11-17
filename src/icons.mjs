// Line illustrations, one per service. 240×160, stroke = currentColor,
// accent shapes use the .a class (filled with the brand orange in CSS).

const wrap = (body) =>
  `<svg class="illo" viewBox="0 0 240 160" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${body}</svg>`;

export const illos = {
  software: wrap(`
    <rect x="46" y="22" width="148" height="104" rx="6"/>
    <path d="M46 40h148"/><circle cx="56" cy="31" r="2"/><circle cx="64" cy="31" r="2"/><circle cx="72" cy="31" r="2"/>
    <path d="M58 54h38M58 68h124M58 82h124M58 96h124M58 110h124" opacity=".5"/>
    <rect class="a" x="58" y="75" width="124" height="14" rx="2"/>
    <path d="M118 54h20M150 54h32" opacity=".5"/>
    <rect x="30" y="38" width="148" height="104" rx="6" opacity=".25"/>`),
  web: wrap(`
    <rect x="28" y="20" width="184" height="120" rx="6"/>
    <path d="M28 36h184"/><circle cx="38" cy="28" r="2"/><circle cx="46" cy="28" r="2"/>
    <rect x="100" y="25" width="68" height="6" rx="3" opacity=".4"/>
    <path d="M44 60h86M44 72h64" stroke-width="3"/>
    <path d="M44 86h96M44 94h80" opacity=".45"/>
    <rect class="a" x="44" y="106" width="44" height="14" rx="7"/>
    <rect x="148" y="52" width="48" height="72" rx="4" opacity=".6"/>
    <path d="M148 104l14-16 10 10 8-8 16 14" opacity=".6"/>`),
  mobile: wrap(`
    <rect x="88" y="12" width="64" height="136" rx="12"/>
    <rect x="110" y="18" width="20" height="5" rx="2.5"/>
    <rect x="98" y="34" width="44" height="30" rx="4" opacity=".6"/>
    <path d="M98 74h44M98 82h30M98 96h44M98 104h24" opacity=".45"/>
    <circle class="a" cx="134" cy="128" r="8"/>
    <rect x="40" y="40" width="34" height="58" rx="8" opacity=".25"/>
    <rect x="166" y="54" width="34" height="58" rx="8" opacity=".25"/>`),
  cloud: wrap(`
    <path d="M70 70h100M120 30v80M80 40l80 60M160 40l-80 60" opacity=".35"/>
    <circle cx="70" cy="70" r="10"/><circle cx="170" cy="70" r="10"/>
    <circle cx="120" cy="30" r="10"/><circle cx="120" cy="110" r="10"/>
    <circle cx="80" cy="40" r="6"/><circle cx="160" cy="40" r="6"/><circle cx="80" cy="100" r="6"/><circle cx="160" cy="100" r="6"/>
    <circle class="a" cx="120" cy="70" r="14"/>
    <path d="M60 140h120" opacity=".3"/><path d="M90 132v8M120 132v8M150 132v8" opacity=".3"/>`),
  data: wrap(`
    <path d="M36 132h168M36 132V24" opacity=".5"/>
    <rect x="52" y="96" width="16" height="36" rx="2"/><rect x="80" y="80" width="16" height="52" rx="2"/>
    <rect x="108" y="88" width="16" height="44" rx="2"/><rect x="136" y="60" width="16" height="72" rx="2"/>
    <rect class="a" x="164" y="40" width="16" height="92" rx="2"/>
    <path d="M60 84l28-20 28 10 28-30 28-14" stroke-dasharray="3 4"/>
    <circle cx="172" cy="30" r="3"/>`),
  security: wrap(`
    <circle cx="120" cy="80" r="66" opacity=".18"/><circle cx="120" cy="80" r="50" opacity=".3"/>
    <path d="M120 30l36 13v28c0 24-16 41-36 49-20-8-36-25-36-49V43z"/>
    <circle class="a" cx="120" cy="72" r="9"/>
    <path class="a-stroke" d="M120 80v16" stroke-width="5"/>`),
  seo: wrap(`
    <rect x="34" y="22" width="172" height="26" rx="13"/>
    <circle cx="54" cy="35" r="6"/><path d="M58 39l5 5"/>
    <path d="M72 35h60" opacity=".45"/>
    <rect class="a" x="34" y="62" width="172" height="22" rx="4"/>
    <rect x="34" y="92" width="172" height="22" rx="4" opacity=".55"/>
    <rect x="34" y="122" width="172" height="22" rx="4" opacity=".3"/>
    <path d="M46 99h70M46 129h52" opacity=".5"/>`),
  design: wrap(`
    <path d="M30 120C70 120 70 40 120 40s50 80 90 80"/>
    <path d="M120 40H80M120 40h40" opacity=".5"/>
    <rect x="76" y="36" width="8" height="8" opacity=".6"/><rect x="156" y="36" width="8" height="8" opacity=".6"/>
    <rect class="a" x="114" y="34" width="12" height="12"/>
    <circle cx="30" cy="120" r="4"/><circle cx="210" cy="120" r="4"/>
    <path d="M30 140h180M30 20h180" opacity=".18" stroke-dasharray="2 5"/>`),
};

export const arrow = `<svg class="arr" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M5 19L19 5M8 5h11v11"/></svg>`;
