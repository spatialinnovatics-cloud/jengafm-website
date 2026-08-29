/* JengaFM — shared interactivity: mobile nav + services accordion + form */

document.addEventListener("DOMContentLoaded", () => {
  initNavToggle();
  renderServiceCategories();
  initContactForm();
  initStickyHeader();
  initScrollReveal();
  initCounters();
  initBackToTop();
  initScrollspy();
  initScrollProgress();
  initMobileStickyCta();
});

function initMobileStickyCta() {
  if (/contact\.html$/.test(window.location.pathname)) return;
  const hero = document.querySelector(".hero");
  if (!hero) return;

  const bar = document.createElement("div");
  bar.className = "mobile-sticky-cta";
  bar.innerHTML = '<a class="btn btn-primary btn-block" href="contact.html">Request a Quote</a>';
  document.body.appendChild(bar);
  document.body.classList.add("has-sticky-cta");

  const update = () => bar.classList.toggle("visible", hero.getBoundingClientRect().bottom < 0);
  update();
  window.addEventListener("scroll", update, { passive: true });
}

function initNavToggle() {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".main-nav");
  if (!toggle || !nav) return;

  const backdrop = document.createElement("div");
  backdrop.className = "nav-backdrop";
  document.body.appendChild(backdrop);

  const setOpen = (open) => {
    nav.classList.toggle("nav-open", open);
    toggle.classList.toggle("is-active", open);
    backdrop.classList.toggle("visible", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  };

  toggle.addEventListener("click", () => setOpen(!nav.classList.contains("nav-open")));
  backdrop.addEventListener("click", () => setOpen(false));
  nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => setOpen(false)));
}

function initScrollProgress() {
  const bar = document.createElement("div");
  bar.className = "scroll-progress";
  document.body.appendChild(bar);

  const update = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = pct + "%";
  };
  update();
  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
}

function renderServiceCategories() {
  const target = document.querySelector("[data-render='service-categories']");
  if (!target || typeof SERVICE_CATEGORIES === "undefined") return;

  const isHome = target.dataset.mode === "summary";

  if (isHome) {
    target.innerHTML = SERVICE_CATEGORIES.map((cat, i) => `
      <div class="card cat-card" data-reveal style="transition-delay:${(i % 4) * 70}ms">
        <div class="icon-badge">${cat.icon}</div>
        <span class="count">${cat.services.length} services</span>
        <h3>${cat.name}</h3>
        <p>${cat.description}</p>
        <a class="more" href="services.html#${cat.id}">View services ${ICONS.arrow}</a>
      </div>
    `).join("");
    return;
  }

  // Multirow layout for services.html — alternating icon panel / detail content per category
  target.innerHTML = SERVICE_CATEGORIES.map((cat) => `
    <div class="mr-row" id="${cat.id}">
      <div class="mr-visual" data-reveal>
        ${cat.icon}
        <div class="mr-count"><span class="num">${cat.services.length}</span><span>Services</span></div>
      </div>
      <div class="mr-content" data-reveal style="transition-delay:120ms">
        <span class="count">${cat.name}</span>
        <h3>${cat.name}</h3>
        <p>${cat.description}</p>
        <div class="mr-details">
          <div class="detail-block">
            <h4>Typical Examples of Work</h4>
            <ul>${cat.examples.map((e) => `<li>${ICONS.check}<span>${e}</span></li>`).join("")}</ul>
          </div>
          <div class="detail-block">
            <h4>Industries Served</h4>
            <ul>${cat.industries.map((e) => `<li>${ICONS.check}<span>${e}</span></li>`).join("")}</ul>
          </div>
          <div class="detail-block full">
            <h4>Benefits to the Client</h4>
            <ul>${cat.benefits.map((e) => `<li>${ICONS.check}<span>${e}</span></li>`).join("")}</ul>
          </div>
        </div>
        <div class="detail-block" style="margin-bottom:22px;">
          <h4>Services in this category</h4>
          <div class="service-tags">
            ${cat.services.map((s) => `<span class="service-tag">${s}</span>`).join("")}
          </div>
        </div>
        <div class="acc-footer">
          <p>Need <strong>${cat.name}</strong>? Get a tailored quote from our national team.</p>
          <a class="btn btn-primary btn-sm" href="contact.html?service=${encodeURIComponent(cat.name)}">Request a Quote ${ICONS.arrow}</a>
        </div>
      </div>
    </div>
  `).join("");
}

function initContactForm() {
  const form = document.querySelector("#quote-form");
  if (!form) return;

  const params = new URLSearchParams(window.location.search);
  const service = params.get("service");
  if (service) {
    const select = form.querySelector("select[name='service']");
    if (select) {
      const match = [...select.options].find((o) => o.value === service);
      if (match) select.value = service;
    }
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const feedback = form.querySelector(".form-feedback");
    if (feedback) {
      feedback.textContent = "Thanks — your request has been received. Our team will be in touch shortly.";
      feedback.style.display = "block";
    }
    form.reset();
  });
}

function initStickyHeader() {
  const header = document.querySelector(".site-header");
  if (!header) return;
  const update = () => header.classList.toggle("is-scrolled", window.scrollY > 10);
  update();
  window.addEventListener("scroll", update, { passive: true });
}

function initScrollReveal() {
  // Auto-tag common content blocks that weren't already marked in a render template
  document.querySelectorAll(".card, .cta-band, .contact-info-card, .hero-panel, .section-head")
    .forEach((el) => { if (!el.hasAttribute("data-reveal")) el.setAttribute("data-reveal", ""); });

  const targets = document.querySelectorAll("[data-reveal]");
  if (!targets.length) return;

  if (!("IntersectionObserver" in window)) {
    targets.forEach((el) => el.classList.add("in-view"));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: "0px 0px -60px 0px" });

  targets.forEach((el) => observer.observe(el));
}

function animateCount(el) {
  const raw = el.textContent.trim();
  const match = raw.match(/^(\d+)(.*)$/);
  if (!match) return;
  const target = parseInt(match[1], 10);
  const suffix = match[2];
  const duration = 900;
  const start = performance.now();

  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(eased * target) + suffix;
    if (progress < 1) {
      requestAnimationFrame(tick);
    } else {
      el.textContent = target + suffix;
      el.classList.add("count-pop");
    }
  }
  requestAnimationFrame(tick);
}

function initCounters() {
  const counters = document.querySelectorAll(".hero-stats strong, .mr-count .num");
  if (!counters.length) return;

  if (!("IntersectionObserver" in window)) {
    counters.forEach(animateCount);
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  counters.forEach((el) => observer.observe(el));
}

function initBackToTop() {
  const btn = document.createElement("button");
  btn.className = "back-to-top";
  btn.setAttribute("aria-label", "Back to top");
  btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>';
  document.body.appendChild(btn);

  window.addEventListener("scroll", () => {
    btn.classList.toggle("visible", window.scrollY > 600);
  }, { passive: true });

  btn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
}

function initScrollspy() {
  const pills = document.querySelectorAll(".toc-pill");
  const rows = document.querySelectorAll(".mr-row");
  if (!pills.length || !rows.length) return;

  const setActive = (id) => {
    pills.forEach((p) => p.classList.toggle("is-active", p.getAttribute("href") === `#${id}`));
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) setActive(entry.target.id);
    });
  }, { rootMargin: "-40% 0px -50% 0px", threshold: 0 });

  rows.forEach((row) => observer.observe(row));
}
