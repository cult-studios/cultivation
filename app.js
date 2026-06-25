// Cultivation marketing site — PRE-COMPILED (no Babel needed at runtime)
// Source: site.jsx, transpiled with @babel/preset-react. Edit site.jsx and recompile if you change anything.
// Cozy farming + soft-occult life sim set in Hollowbend, the Whispering Vale.
const {
  useState
} = React;
const serif = "var(--font-display)"; // Fraunces
const sans = "var(--font-sans-cv)"; // Inter
const mono = "var(--font-mono)";
const hand = "var(--font-hand)"; // Caveat

// ── night palette (sampled from the reference art) ──
const INK = "#0a0f0c"; // deepest
const NIGHT = "#0e1611"; // page base
const NIGHT2 = "#0b120e"; // alt section
const PANEL = "#17231d"; // card base
const PANEL_HI = "#1d2b24";
const LINE = "rgba(124,176,144,0.16)";
const CREAM = "#f0ead6"; // parchment text / headings
const BODY = "#c2ccbc"; // body copy
const MUTE = "#869184"; // muted labels
const TEAL = "#6fc6c4"; // lumen / bioluminescent glow
const PURPLE = "#b478e0"; // mushroom glow
const OCCULT = "#8456b0";
const MAGENTA = "#e85fb0";
const GOLD = "#e8a84d"; // lantern
const ENERGY = "#7fdf6a"; // green energy bar

const GLOW = {
  teal: TEAL,
  purple: PURPLE,
  gold: GOLD,
  magenta: MAGENTA,
  blue: "#8fb6e0",
  green: ENERGY
};

// hand-drawn doodle SVGs, tinted (and softly glowing) via CSS filter
const DOODLE_FILTER = {
  teal: "invert(74%) sepia(30%) saturate(560%) hue-rotate(122deg) brightness(1.02)",
  green: "invert(72%) sepia(40%) saturate(420%) hue-rotate(75deg) brightness(1.05)",
  gold: "invert(78%) sepia(46%) saturate(720%) hue-rotate(355deg) brightness(1.02)",
  purple: "invert(64%) sepia(38%) saturate(1100%) hue-rotate(248deg) brightness(1.05)",
  magenta: "invert(55%) sepia(58%) saturate(1700%) hue-rotate(290deg)",
  blue: "invert(70%) sepia(26%) saturate(760%) hue-rotate(180deg)",
  cream: "invert(92%) sepia(10%) saturate(220%) hue-rotate(5deg)"
};
function Doodle({
  name,
  size = 26,
  tint = "teal",
  glow = false,
  style = {}
}) {
  const f = DOODLE_FILTER[tint] || "none";
  return /*#__PURE__*/React.createElement("img", {
    src: `assets/doodles/${name}.svg`,
    alt: "",
    draggable: false,
    style: {
      width: size,
      height: size,
      objectFit: "contain",
      filter: glow ? `${f} drop-shadow(0 0 7px ${GLOW[tint] || TEAL}aa)` : f,
      display: "block",
      ...style
    }
  });
}
const FEATURES = [{
  doodle: "leaf",
  tint: "teal",
  title: "Farm life",
  text: "Tend real crops through the seasons (carrots, chamomile, tomatoes, and the kind of plants you keep in the greenhouse). Every harvest is a small, smug victory."
}, {
  doodle: "hearts",
  tint: "magenta",
  title: "Community",
  text: "Hollowbend is full of warm, funny, deeply nosy people. Win them over for recipes, gossip, friendship, and the occasional alibi."
}, {
  doodle: "gem",
  tint: "gold",
  title: "Trade & craft",
  text: "Dry, brew, infuse, and roll your harvest into something worth selling, through the shop, the café, or a guy named Marlow."
}, {
  doodle: "moon",
  tint: "purple",
  title: "The Vale",
  text: "Glowing fungi. Instructive dreams. Forest paths that don't go where they should. The Whispering Vale is older than the town, and it's paying attention."
}];
const CHARACTERS = [{
  doodle: "flower",
  tint: "gold",
  name: "Granma Gem",
  role: "mentor · herbalist · baker",
  text: "Sweet, spacey ex-hippie with a secret wild past and suspiciously specific memories from the 70s. Will absolutely feed you."
}, {
  doodle: "leaf",
  tint: "teal",
  name: "Maple",
  role: "tea alchemist · they/them",
  text: "Runs The Drowsy Leaf. Brews tea, comfort, and the occasional mind-expanding concoction for dreamers and night owls."
}, {
  doodle: "star",
  tint: "blue",
  name: "Officer Buzz",
  role: "law · cynic · secret softie",
  text: "Deadpan, perpetually stressed, and slowly realizing not all plants are the enemy. World's Okayest Cop."
}, {
  doodle: "sparkle",
  tint: "purple",
  name: "Twig",
  role: "forest dweller · fungal lorekeeper",
  text: "Cryptic, barefoot, and ...mostly human. Speaks in riddles and communes with mushrooms that don't have names yet."
}, {
  doodle: "moon",
  tint: "magenta",
  name: "Marlow",
  role: "dealer · philosopher · friend",
  text: "Smooth-talking buyer who lives in the gray areas. Shadier than he looks, more loyal than he lets on."
}, {
  doodle: "crown",
  tint: "teal",
  name: "The D.A.R.E. Kids",
  role: "junior detectives · comic foil",
  text: "Four earnest kids who think they're mini cops, patrolling Hollowbend for 'criminals' and finding suspects absolutely everywhere. Adorable, dramatic, mostly ineffective."
}];
const SOCIAL = [["bsky", "Bluesky"], ["discord", "Discord"], ["instagram", "Instagram"], ["youtube", "YouTube"]];
function Nav() {
  const links = ["Home", "Game", "Characters", "Journal", "Shop"];
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: "sticky",
      top: 0,
      zIndex: 50,
      background: "rgba(10,15,12,0.82)",
      backdropFilter: "blur(12px)",
      borderBottom: `1px solid ${LINE}`
    }
  }, /*#__PURE__*/React.createElement("nav", {
    style: {
      maxWidth: 1100,
      margin: "0 auto",
      padding: "14px 28px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: serif,
      fontSize: 25,
      fontWeight: 600,
      color: CREAM,
      display: "flex",
      alignItems: "center",
      gap: 9,
      textShadow: `0 0 18px ${TEAL}40`
    }
  }, /*#__PURE__*/React.createElement(Doodle, {
    name: "leaf",
    size: 22,
    tint: "teal",
    glow: true
  }), " Cultivation"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 26,
      alignItems: "center"
    }
  }, links.map((l, i) => /*#__PURE__*/React.createElement("a", {
    key: l,
    href: "#",
    style: {
      textDecoration: "none",
      color: i === 4 ? CREAM : BODY,
      fontFamily: sans,
      fontWeight: 500,
      fontSize: 15,
      padding: i === 4 ? "8px 18px" : 0,
      background: i === 4 ? `${OCCULT}33` : "none",
      border: i === 4 ? `1px solid ${PURPLE}88` : "none",
      boxShadow: i === 4 ? `0 0 16px ${PURPLE}44` : "none",
      borderRadius: 999
    }
  }, l)))));
}
function HandNote({
  children,
  color = GOLD,
  size = 22,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: hand,
      fontSize: size,
      color,
      lineHeight: 1.1,
      textShadow: `0 0 14px ${color}55`,
      ...style
    }
  }, children);
}
function Hero() {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      textAlign: "center",
      padding: "96px 24px 78px",
      position: "relative",
      overflow: "hidden",
      background: `radial-gradient(70% 55% at 50% 8%, ${TEAL}1f, transparent 62%), radial-gradient(55% 50% at 88% 36%, ${PURPLE}22, transparent 60%), radial-gradient(45% 45% at 8% 30%, ${GOLD}16, transparent 60%), ${NIGHT}`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: "9%",
      top: "24%",
      opacity: 0.85,
      transform: "rotate(-12deg)"
    }
  }, /*#__PURE__*/React.createElement(Doodle, {
    name: "sparkle",
    size: 30,
    tint: "gold",
    glow: true
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      right: "11%",
      top: "26%",
      opacity: 0.85,
      transform: "rotate(10deg)"
    }
  }, /*#__PURE__*/React.createElement(Doodle, {
    name: "flower",
    size: 34,
    tint: "magenta",
    glow: true
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      right: "18%",
      bottom: "14%",
      opacity: 0.8
    }
  }, /*#__PURE__*/React.createElement(Doodle, {
    name: "moon",
    size: 26,
    tint: "purple",
    glow: true
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: "15%",
      bottom: "16%",
      opacity: 0.7,
      transform: "rotate(8deg)"
    }
  }, /*#__PURE__*/React.createElement(Doodle, {
    name: "sparkle",
    size: 20,
    tint: "teal",
    glow: true
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: mono,
      fontSize: 12,
      letterSpacing: "0.2em",
      textTransform: "uppercase",
      color: TEAL,
      margin: "0 0 18px",
      textShadow: `0 0 12px ${TEAL}66`
    }
  }, "a cozy farming & life sim"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: serif,
      fontSize: "clamp(48px, 8vw, 90px)",
      fontWeight: 600,
      color: CREAM,
      margin: 0,
      lineHeight: 0.98,
      textShadow: `0 0 34px ${TEAL}40, 0 0 60px ${PURPLE}30`
    }
  }, "Cultivation"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: serif,
      fontStyle: "italic",
      fontSize: 22,
      color: GOLD,
      marginTop: 14,
      textShadow: `0 0 16px ${GOLD}44`
    }
  }, "grow your story, one seed at a time"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: sans,
      fontSize: 17,
      color: BODY,
      maxWidth: 588,
      margin: "20px auto 14px",
      lineHeight: 1.65
    }
  }, "You never thought you'd be the caretaker of a scrappy little farm on the edge of ", /*#__PURE__*/React.createElement("strong", {
    style: {
      color: CREAM
    }
  }, "Hollowbend"), ", a small town in the Whispering Vale where everyone knows everyone, the crops are only sometimes legal, and the mushrooms occasionally give good advice."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 32
    }
  }, /*#__PURE__*/React.createElement(HandNote, {
    style: {
      transform: "rotate(-3deg)",
      display: "inline-block"
    }
  }, "grow a life. make some friends. try not to attract attention.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 14,
      justifyContent: "center",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#neighbors",
    style: {
      fontFamily: sans,
      fontWeight: 600,
      fontSize: 16,
      color: CREAM,
      textDecoration: "none",
      padding: "15px 34px",
      borderRadius: 999,
      background: "linear-gradient(135deg, #2f6e57, #3f9068)",
      border: `1px solid ${TEAL}66`,
      boxShadow: `0 0 26px ${TEAL}44, 0 6px 20px rgba(0,0,0,0.4)`
    }
  }, "meet the neighbors"))));
}
function Lift({
  children,
  pad = 24,
  radius = 18,
  glow = TEAL
}) {
  const [h, setH] = useState(false);
  return /*#__PURE__*/React.createElement("div", {
    onMouseEnter: () => setH(true),
    onMouseLeave: () => setH(false),
    style: {
      background: h ? PANEL_HI : PANEL,
      border: `1px solid ${h ? glow + "66" : LINE}`,
      borderRadius: radius,
      padding: pad,
      boxShadow: h ? `0 12px 32px rgba(0,0,0,0.5), 0 0 28px ${glow}33` : "0 6px 22px rgba(0,0,0,0.38)",
      transform: h ? "translateY(-5px)" : "none",
      transition: "all .3s var(--ease-out)"
    }
  }, children);
}
function SectionHead({
  kicker,
  title,
  sub,
  kickerColor = TEAL
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      marginBottom: 44
    }
  }, kicker && /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: mono,
      fontSize: 12,
      letterSpacing: "0.16em",
      textTransform: "uppercase",
      color: kickerColor,
      margin: "0 0 11px",
      textShadow: `0 0 12px ${kickerColor}55`
    }
  }, kicker), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: serif,
      fontSize: 40,
      fontWeight: 600,
      color: CREAM,
      margin: 0,
      textShadow: `0 0 24px ${kickerColor}30`
    }
  }, title), sub && /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: sans,
      fontSize: 16,
      color: BODY,
      maxWidth: 564,
      margin: "14px auto 0",
      lineHeight: 1.6
    }
  }, sub));
}
function Features() {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      padding: "78px 24px",
      background: `radial-gradient(50% 60% at 12% 0%, ${TEAL}14, transparent 60%), ${NIGHT2}`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1000,
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement(SectionHead, {
    kicker: "what you'll do",
    title: "a real farm, mostly legal"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
      gap: 20
    }
  }, FEATURES.map(f => /*#__PURE__*/React.createElement(Lift, {
    key: f.title,
    glow: GLOW[f.tint]
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement(Doodle, {
    name: f.doodle,
    size: 30,
    tint: f.tint,
    glow: true
  })), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: serif,
      fontSize: 22,
      color: CREAM,
      margin: "0 0 9px"
    }
  }, f.title), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: sans,
      fontSize: 15,
      color: BODY,
      lineHeight: 1.6,
      margin: 0
    }
  }, f.text))))));
}
function Characters() {
  return /*#__PURE__*/React.createElement("section", {
    id: "neighbors",
    style: {
      padding: "78px 24px",
      background: `radial-gradient(55% 55% at 85% 10%, ${PURPLE}1c, transparent 62%), ${NIGHT}`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1000,
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement(SectionHead, {
    kicker: "the cast",
    kickerColor: PURPLE,
    title: "meet the neighbors",
    sub: "Warm, funny, flawed, and a little strange. Everyone in Hollowbend has a secret, and most of them involve your farm."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
      gap: 18
    }
  }, CHARACTERS.map(c => /*#__PURE__*/React.createElement(Lift, {
    key: c.name,
    radius: 18,
    pad: 24,
    glow: GLOW[c.tint]
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 14,
      marginBottom: 13
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 48,
      height: 48,
      borderRadius: "50%",
      background: INK,
      border: `1px solid ${GLOW[c.tint]}77`,
      boxShadow: `0 0 16px ${GLOW[c.tint]}44, inset 0 0 12px ${GLOW[c.tint]}22`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement(Doodle, {
    name: c.doodle,
    size: 24,
    tint: c.tint,
    glow: true
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: serif,
      fontSize: 19,
      color: CREAM,
      margin: 0,
      lineHeight: 1.1
    }
  }, c.name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: mono,
      fontSize: 10.5,
      letterSpacing: "0.05em",
      textTransform: "uppercase",
      color: MUTE,
      marginTop: 4
    }
  }, c.role))), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: sans,
      fontSize: 14.5,
      color: BODY,
      lineHeight: 1.6,
      margin: 0
    }
  }, c.text))))));
}
function Journal() {
  const posts = ["Designing a town where everyone has a secret", "Marlow, and writing a bad influence you actually trust", "The Whispering Vale: cozy, but make it uncanny"];
  return /*#__PURE__*/React.createElement("section", {
    style: {
      padding: "78px 24px",
      background: `radial-gradient(45% 55% at 50% 0%, ${GOLD}12, transparent 60%), ${NIGHT2}`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1000,
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement(SectionHead, {
    kicker: "field notes",
    kickerColor: GOLD,
    title: "from the developer's garden"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
      gap: 20
    }
  }, posts.map(p => /*#__PURE__*/React.createElement(Lift, {
    key: p,
    radius: 16,
    glow: GOLD
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 7,
      fontFamily: mono,
      fontSize: 11,
      letterSpacing: "0.06em",
      textTransform: "uppercase",
      color: GOLD,
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement(Doodle, {
    name: "pencil",
    size: 14,
    tint: "gold"
  }), " coming soon"), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: serif,
      fontSize: 19,
      color: CREAM,
      margin: 0,
      lineHeight: 1.3
    }
  }, p))))));
}
function AfterDark() {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      padding: "84px 24px",
      position: "relative",
      overflow: "hidden",
      background: `radial-gradient(60% 70% at 78% 76%, ${OCCULT}33, transparent 60%), radial-gradient(48% 55% at 16% 18%, ${TEAL}1c, transparent 60%), ${INK}`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1000,
      margin: "0 auto",
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: mono,
      fontSize: 12,
      letterSpacing: "0.16em",
      textTransform: "uppercase",
      color: GOLD,
      margin: "0 0 11px",
      textShadow: `0 0 12px ${GOLD}66`
    }
  }, "after the market closes"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: serif,
      fontSize: 40,
      fontWeight: 600,
      color: CREAM,
      margin: 0,
      textShadow: `0 0 28px ${PURPLE}44`
    }
  }, "Hollowbend after dark"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: sans,
      fontSize: 16,
      color: BODY,
      maxWidth: 600,
      margin: "14px auto 0",
      lineHeight: 1.65
    }
  }, "When the string lights come on, the caf\xE9 keeps brewing, the back alley opens for business, and the woods begin to glow. Cozy, never grim, just a little uncanny.")), /*#__PURE__*/React.createElement("p", {
    style: {
      textAlign: "center",
      marginBottom: 46
    }
  }, /*#__PURE__*/React.createElement(HandNote, {
    color: TEAL,
    size: 24
  }, "the forest feels different at night.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))",
      gap: 44,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: mono,
      fontSize: 12,
      letterSpacing: "0.14em",
      textTransform: "uppercase",
      color: TEAL,
      margin: "0 0 18px",
      textShadow: `0 0 12px ${TEAL}55`
    }
  }, "two ways to play"), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: serif,
      fontSize: 23,
      color: CREAM,
      margin: "0 0 6px"
    }
  }, "Play it cozy."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: sans,
      fontSize: 15,
      color: BODY,
      lineHeight: 1.6,
      margin: "0 0 24px"
    }
  }, "Grow, craft, and sell at your own pace. No cops, no consequences, no stress. Just you, the dirt, and good company."), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: serif,
      fontSize: 23,
      color: CREAM,
      margin: "0 0 6px"
    }
  }, "Or take the risk."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: sans,
      fontSize: 15,
      color: BODY,
      lineHeight: 1.6,
      margin: 0
    }
  }, "Switch on a mode where not everything you grow is strictly legal, and a suspicion system means nosy neighbors (and the law) start to notice.")), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "assets/cultivation/ui/suspicion-meter.png",
    alt: "In-game suspicion meter: a vine-bordered parchment panel reading Suspicion 10%, folks are mostly at ease.",
    style: {
      width: "100%",
      maxWidth: 360,
      height: "auto",
      filter: `drop-shadow(0 0 28px ${PURPLE}55) drop-shadow(0 16px 26px rgba(0,0,0,0.6))`,
      transform: "rotate(-2deg)"
    }
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 20
    }
  }, /*#__PURE__*/React.createElement(HandNote, {
    color: GOLD,
    size: 20
  }, "(play it safe... or don't)"))))));
}
function SocialDot({
  f,
  label
}) {
  const [h, setH] = useState(false);
  return /*#__PURE__*/React.createElement("div", {
    onMouseEnter: () => setH(true),
    onMouseLeave: () => setH(false),
    title: `${label}: coming soon`,
    style: {
      position: "relative",
      width: 46,
      height: 46,
      borderRadius: "50%",
      background: PANEL,
      border: `1px solid ${h ? TEAL + "55" : LINE}`,
      boxShadow: h ? `0 0 14px ${TEAL}33` : "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "default",
      transition: "all .25s var(--ease-out)"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: `assets/icons/social/${f}.png`,
    alt: label,
    style: {
      width: 24,
      height: 24,
      objectFit: "contain",
      filter: h ? "grayscale(0.15) opacity(0.95)" : "grayscale(1) opacity(0.4)",
      transition: "all .25s var(--ease-out)"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      bottom: "calc(100% + 9px)",
      left: "50%",
      transform: `translateX(-50%) translateY(${h ? 0 : 4}px)`,
      opacity: h ? 1 : 0,
      pointerEvents: "none",
      whiteSpace: "nowrap",
      fontFamily: mono,
      fontSize: 10,
      letterSpacing: "0.08em",
      textTransform: "uppercase",
      color: GOLD,
      background: INK,
      border: `1px solid ${GOLD}55`,
      boxShadow: `0 0 12px ${GOLD}33`,
      borderRadius: 999,
      padding: "4px 11px",
      transition: "all .25s var(--ease-out)"
    }
  }, "coming soon"));
}
function Footer() {
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      background: INK,
      color: BODY,
      padding: "54px 24px 40px",
      textAlign: "center",
      borderTop: `1px solid ${LINE}`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: serif,
      fontSize: 23,
      marginBottom: 10,
      color: CREAM,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 9,
      textShadow: `0 0 16px ${TEAL}40`
    }
  }, /*#__PURE__*/React.createElement(Doodle, {
    name: "leaf",
    size: 20,
    tint: "teal",
    glow: true
  }), " Cultivation"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: sans,
      fontSize: 14,
      color: BODY,
      maxWidth: 480,
      margin: "0 auto 24px",
      lineHeight: 1.6
    }
  }, "Currently growing in Unreal Engine 5. A cozy game about plants, community, and questionable business decisions, set in Hollowbend and the Whispering Vale."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "center",
      gap: 14,
      marginBottom: 24
    }
  }, SOCIAL.map(([f, label]) => /*#__PURE__*/React.createElement(SocialDot, {
    key: f,
    f: f,
    label: label
  }))), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: mono,
      fontSize: 12,
      color: MUTE
    }
  }, "\xA9 2026 Cultivation \xB7 Cult Studios. grow responsibly."));
}
function Site() {
  return /*#__PURE__*/React.createElement("div", {
    "data-brand": "cultivation",
    style: {
      background: INK,
      minHeight: "100%"
    }
  }, /*#__PURE__*/React.createElement(Nav, null), /*#__PURE__*/React.createElement(Hero, null), /*#__PURE__*/React.createElement(Features, null), /*#__PURE__*/React.createElement(Characters, null), /*#__PURE__*/React.createElement(Journal, null), /*#__PURE__*/React.createElement(AfterDark, null), /*#__PURE__*/React.createElement(Footer, null));
}
ReactDOM.createRoot(document.getElementById("root")).render(/*#__PURE__*/React.createElement(Site, null));
