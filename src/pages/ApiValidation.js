import "./Css/ApiValidation.css";

const GOOGLE_FORM_URL = "https://forms.gle/bpc8PRiZa68dkepe6";

const sampleResponse = `{
    "word": "abstract",
    "entries": [
      {
        "pos": "Noun",
        "definitions": [
          "The theoretical way of looking at things; something that exists only in idealized form. [First attested in the early 17 century.]",
          "(real estate) A summary title of the key points detailing a tract of land, for ownership; abstract of title.",
          "An abstraction; an abstract term; that which is abstract. [First attested in the mid 16 century.]",
          "Something that concentrates in itself the qualities of a larger item, or multiple items. [First attested in the mid 16 century.]",
          "(art) An abstract work of art. [First attested in the early 20 century.]",
          "An abridgement or summary of a longer publication. [First attested around 1350 to 1470.]"
        ],
        "examples": [
          "An analysis and abstract of every treatise he had read.",
          "Man, the abstract Of all perfection, which the workmanship Of Heaven hath modeled.",
          "Thus the concrete like has its abstract likeness; the concretes, father and son, have the abstracts, paternity and filiation."
        ]
      },
      {
        "pos": "Verb",
        "definitions": [
          "To separate; to disengage. [First attested around 1350 to 1470.]",
          "To summarize; to abridge; to epitomize. [First attested in the late 16 century.]"
        ],
        "examples": [
          "He was incapable of forming any opinion or resolution abstracted from his own prejudices.",
          "Von Rosen had quietly abstracted the bearing-reins from the harness.",
          "The lightning of the public burdens, which at present abstract a large proportion of profits and wages.",
          "Section 13 of the 1968 Act enacts a separate offence of dishonestly abstracting electricity. The separate offence is needed because electricity, like other forms of energy such as heat, is not property.",
          "The inlaid characters in diamond, and other precious stones, have been all abstracted away by the pelf-loving Jaut and Mahratta—leaving the walls defaced with the hollow marks of the chisel."
        ]
      },
      {
        "pos": "Adjective",
        "definitions": [
          "Pertaining comprehensively to, or representing, a class or group of objects, as opposed to any specific object; considered apart from any application to a particular object: general, generic, nonspecific; representational. [First attested by Locke in 1689.]",
          "(art) Pertaining to the formal aspect of art, such as the lines, colors, shapes, and the relationships among them. [First attested in the mid 19 century.]",
          "Difficult to understand; abstruse; hard to conceptualize. [First attested around 1350 to 1470.]",
          "Separately expressing a property or attribute of an object that is considered to be inherent to that object: attributive, ascriptive. [First attested around 1350 to 1470.]",
          "Not concrete: conceptual, ideal. [First attested around 1350 to 1470.]",
          "(object-oriented programming, of a class) Being a partial basis for subclasses rather than a complete template for objects."
        ],
        "examples": [
          "The more abstract we are from the body... the more fit we shall be to behold divine light.",
          "White and abstract -looking, he sat and ate his dinner.",
          "The politician gave a somewhat abstract answer when asked about their plans to cut spending.",
          "A concrete name is a name which stands for a thing; an abstract name which stands for an attribute of a thing...",
          "Her new film is an abstract piece, combining elements of magic realism, flashbacks, and animation but with very little in terms of plot construction."
        ]
      }
    ],
    "default_pos": "Adjective",
    "uk_ipa": "/ˈæbstrækt/",
    "us_ipa": "/ˈæbstrækt/",
    "synonyms": [
      "theoretic",
      "theoretical",
      "metaphysical",
      "conceptual",
      "mental"
    ],
    "antonyms": [
      "concrete",
      "physical",
      "tangible",
      "substantial",
      "visible"
    ],
    "syllables": [
      {
        "text": "abs",
        "stress": 0
      },
      {
        "text": "trakt",
        "stress": 1
      }
    ]
  }`;

function track(eventName) {
  if (typeof window !== "undefined" && window.umami) {
    window.umami.track(eventName);
  }
}

function openWaitlist() {
  track("waitlist_click");
  window.open(GOOGLE_FORM_URL, "_blank", "noopener,noreferrer");
}

function openSampleResponse() {
  track("sample_response_view");
  const el = document.getElementById("sample-response-section");
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

const posData = [
  { label: "Noun", count: 43168 },
  { label: "Adjective", count: 17975 },
  { label: "Verb", count: 16424 },
  { label: "Adverb", count: 3857 },
  { label: "Other", count: 815 },
];

// CSS variable colours so dark mode works automatically
const posColors = ["#6e45e2", "#4a6cf7", "#8b5cf6", "#a78bfa", "#cbd5e1"];

const totalEntries = 82239;

function PieChart() {
  // Start at 12 o'clock: offset by -90deg = -PI/2
  let cumulativeAngle = -Math.PI / 2;

  const slices = posData.map((slice, i) => {
    const fraction = slice.count / totalEntries;
    const startAngle = cumulativeAngle;
    cumulativeAngle += fraction * 2 * Math.PI;
    const endAngle = cumulativeAngle;

    const x1 = Math.cos(startAngle);
    const y1 = Math.sin(startAngle);
    const x2 = Math.cos(endAngle);
    const y2 = Math.sin(endAngle);
    const largeArc = fraction > 0.5 ? 1 : 0;

    return (
      <path
        key={i}
        d={`M 0 0 L ${x1} ${y1} A 1 1 0 ${largeArc} 1 ${x2} ${y2} Z`}
        fill={posColors[i]}
      />
    );
  });

  return (
    <div className="pie-chart-container">
      <svg viewBox="-1.1 -1.1 2.2 2.2" className="pie-chart">
        {slices}
      </svg>
      <div className="pie-legend">
        {posData.map((slice, i) => (
          <div key={i} className="legend-item">
            <span className="legend-dot" style={{ background: posColors[i] }} />
            <span className="legend-label">{slice.label}</span>
            <span className="legend-pct">
              {((slice.count / totalEntries) * 100).toFixed(1)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ApiValidation() {
  return (
    <div className="api-page">
      {/* ── Hero ── */}
      <section className="api-hero">
        <div className="container">
          <div className="hero-content">
            <span className="api-badge">Developer API · Coming Soon</span>
            <h1>
              Dictionary Data
              <span> Built For Developers</span>
            </h1>
            <p>
              Access definitions, examples, IPA pronunciations, syllables,
              synonyms and antonyms through a simple REST API or downloadable
              JSON dataset.
            </p>
            <div className="hero-actions">
              <button className="primary-btn" onClick={openWaitlist}>
                Join Waitlist
              </button>
              <button className="secondary-btn" onClick={openSampleResponse}>
                View Sample Response
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-card">
              <h3>62,337</h3>
              <p>Words</p>
            </div>
            <div className="stat-card">
              <h3>163,674</h3>
              <p>Definitions</p>
            </div>
            <div className="stat-card">
              <h3>132,267</h3>
              <p>Examples</p>
            </div>
            <div className="stat-card">
              <h3>82,239</h3>
              <p>Dictionary Entries</p>
            </div>
          </div>

          <div className="data-insights">
            <div className="coverage-column">
              <p className="pos-heading">Coverage</p>
              <div className="coverage-item">
                <span className="coverage-label">Definitions</span>
                <div className="coverage-bar">
                  <div className="coverage-fill" style={{ width: "100%" }} />
                </div>
                <span className="coverage-pct">100%</span>
              </div>
              <div className="coverage-item">
                <span className="coverage-label">Examples</span>
                <div className="coverage-bar">
                  <div className="coverage-fill" style={{ width: "65.65%" }} />
                </div>
                <span className="coverage-pct">65.7%</span>
              </div>

              <p className="pos-heading" style={{ marginTop: "1.75rem" }}>
                Averages per entry
              </p>
              <div className="avg-row">
                <span className="avg-label">Definitions</span>
                <span className="avg-value">1.99</span>
              </div>
              <div className="avg-row">
                <span className="avg-label">Examples</span>
                <span className="avg-value">1.61</span>
              </div>
            </div>

            <div className="pos-chart-card">
              <p className="pos-heading">POS distribution</p>
              <PieChart />
            </div>
          </div>
        </div>
      </section>

      {/* ── Sample Response ── */}
      <section className="sample-section" id="sample-response-section">
        <div className="container">
          <div className="section-heading">
            <h2>Simple JSON Response</h2>
            <p>
              Designed for apps, AI tools, educational platforms and browser
              extensions.
            </p>
          </div>
          <pre className="code-block">
            <code>{sampleResponse}</code>
          </pre>
        </div>
      </section>

      {/* ── Use Cases ── */}
      <section className="use-cases">
        <div className="container">
          <div className="section-heading">
            <h2>Possible Use Cases</h2>
          </div>
          <div className="use-grid">
            <div className="use-card">
              <h3>Language Learning</h3>
              <p>
                Vocabulary builders, pronunciation tools and educational
                products.
              </p>
            </div>
            <div className="use-card">
              <h3>AI Applications</h3>
              <p>
                Enhance writing assistants and language-focused AI products.
              </p>
            </div>
            <div className="use-card">
              <h3>Browser Extensions</h3>
              <p>Instant definitions, IPA pronunciation and examples.</p>
            </div>
            <div className="use-card">
              <h3>Developer Tools</h3>
              <p>Integrate lexical data into your products quickly.</p>
            </div>
            <div className="use-card">
              <h3>Creative Writing</h3>
              <p>
                Help writers find the perfect word with synonyms, antonyms and
                contextual examples.
              </p>
            </div>
            <div className="use-card">
              <h3>Accessibility Tools</h3>
              <p>
                Help users understand complex text with plain definitions and
                IPA guides.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Social Proof ── */}
      <section className="validation-section">
        <div className="container">
          <div className="section-heading">
            <h2>What Developers Are Building</h2>
            <p>
              We're shaping the API around real use cases. Join the waitlist to
              tell us what you need.
            </p>
          </div>

          <div className="validation-grid">
            <div className="validation-card">
              <p className="validation-card-label">Preferred access method</p>
              <div className="option-list readonly">
                <div className="option-item">
                  <span className="radio-dot" />
                  <span>REST API</span>
                </div>
                <div className="option-item">
                  <span className="radio-dot" />
                  <span>Downloadable JSON Dataset</span>
                </div>
                <div className="option-item">
                  <span className="radio-dot active" />
                  <span>Both</span>
                </div>
              </div>
            </div>

            <div className="validation-card">
              <p className="validation-card-label">Use cases we're hearing</p>
              <div className="tag-grid">
                <span className="tag">Language Learning</span>
                <span className="tag">AI Application</span>
                <span className="tag">Browser Extension</span>
                <span className="tag">Educational Platform</span>
                <span className="tag">Writing Tool</span>
                <span className="tag">Other</span>
              </div>
            </div>
          </div>

          <p className="validation-cta-note">
            Tell us what you're building →{" "}
            <button className="inline-link" onClick={openWaitlist}>
              join the waitlist
            </button>
          </p>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-card">
            <h2>Interested?</h2>
            <p>
              We're validating demand before launch. Join the waitlist and tell
              us what you're building — it takes under a minute.
            </p>
            <button className="primary-btn" onClick={openWaitlist}>
              Join Waitlist
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ApiValidation;
