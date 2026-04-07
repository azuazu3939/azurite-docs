const siteBaseUrl = new URL("./", window.location.href.split("#")[0]);
const manifestUrl = new URL("current-spec/manifest.json", siteBaseUrl);
const fallbackPath = "current-spec/overview.md";

const state = {
  manifest: null,
  currentPath: fallbackPath,
  filter: "",
  mode: localStorage.getItem("azuriter-doc-mode") || "wiki",
};

const sidebar = document.getElementById("sidebar");
const sidebarToggle = document.getElementById("sidebarToggle");
const modeSwitch = document.getElementById("modeSwitch");
const searchInput = document.getElementById("searchInput");
const navTree = document.getElementById("navTree");
const heroStats = document.getElementById("heroStats");
const preview = document.getElementById("preview");
const docTitle = document.getElementById("docTitle");
const docCategory = document.getElementById("docCategory");
const docMeta = document.getElementById("docMeta");
const rawLink = document.getElementById("rawLink");
const navSectionTemplate = document.getElementById("navSectionTemplate");
const navItemTemplate = document.getElementById("navItemTemplate");
const statCardTemplate = document.getElementById("statCardTemplate");

sidebarToggle?.addEventListener("click", () => {
  const open = !sidebar.classList.contains("is-open");
  sidebar.classList.toggle("is-open", open);
  sidebarToggle.setAttribute("aria-expanded", String(open));
});

searchInput?.addEventListener("input", () => {
  state.filter = searchInput.value.trim().toLowerCase();
  renderNav();
});

modeSwitch?.addEventListener("click", (event) => {
  const button = event.target.closest("[data-mode]");
  if (!button) return;
  state.mode = button.dataset.mode;
  localStorage.setItem("azuriter-doc-mode", state.mode);
  syncModeButtons();
  renderNav();
  renderMeta(resolveMeta(state.currentPath));
});

window.addEventListener("hashchange", () => loadRoute().catch(showError));

preview.addEventListener("click", (event) => {
  const tocButton = event.target.closest("[data-scroll-id]");
  if (tocButton) {
    const targetId = tocButton.getAttribute("data-scroll-id");
    const target = targetId ? document.getElementById(targetId) : null;
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    return;
  }
  const anchor = event.target.closest("a");
  if (!anchor) return;
  const href = anchor.getAttribute("href");
  if (!href || href.startsWith("#")) return;
  if (/\.md($|[#?])/.test(href)) {
    event.preventDefault();
    navigate(resolveRelative(state.currentPath, href));
  }
});

init().catch(showError);

async function init() {
  state.manifest = await fetchJson(manifestUrl);
  syncModeButtons();
  renderHeroStats();
  renderNav();
  await loadRoute();
}

async function loadRoute() {
  state.currentPath = normalizePath(decodeURIComponent(location.hash.replace(/^#/, "")) || fallbackPath);
  const meta = resolveMeta(state.currentPath);
  renderMeta(meta);
  highlightActive();

  const markdown = await fetchText(buildDocUrl(state.currentPath));
  rawLink.href = buildDocUrl(state.currentPath).href;
  preview.innerHTML = "";

  const doc = document.createElement("div");
  doc.className = "doc-card";
  doc.innerHTML = renderMarkdown(markdown, state.currentPath);

  const footer = document.createElement("div");
  footer.className = "doc-footer";
  footer.innerHTML = `表示中: <code>${escapeHtml(state.currentPath)}</code>`;
  doc.appendChild(footer);
  preview.appendChild(doc);
  preview.scrollTop = 0;

  renderNav();
  sidebar.classList.remove("is-open");
  sidebarToggle?.setAttribute("aria-expanded", "false");
}

function renderHeroStats() {
  heroStats.innerHTML = "";
  const elements = state.manifest.docs.filter((item) => item.kind === "element");
  const pageCount = state.manifest.docs.reduce((count, item) => {
    return count + (item.kind === "element" ? item.pages.length : 1);
  }, 0);
  const stats = [
    { label: "要素", value: elements.length },
    { label: "ページ", value: pageCount },
    { label: "Wiki", value: elements.flatMap((item) => item.pages).filter((page) => pageKind(page) === "wiki").length },
    { label: "ガイド", value: state.manifest.docs.filter((item) => item.kind === "guide").length },
  ];

  stats.forEach((entry) => {
    const card = statCardTemplate.content.firstElementChild.cloneNode(true);
    card.querySelector(".stat-label").textContent = entry.label;
    card.querySelector(".stat-value").textContent = String(entry.value);
    heroStats.appendChild(card);
  });
}

function renderNav() {
  navTree.innerHTML = "";
  const referenceGroups = groupBy(
    state.manifest.docs.filter((item) => item.kind !== "element"),
    (item) => item.category || kindLabel(item.kind),
  );

  Object.entries(referenceGroups).forEach(([category, items]) => {
    const visibleItems = items.filter((item) => {
      return matches([item.title, item.shortDescription || "", kindLabel(item.kind)], state.filter);
    });
    if (!visibleItems.length) return;

    const section = navSectionTemplate.content.firstElementChild.cloneNode(true);
    section.querySelector(".nav-section-title").textContent = category;
    const host = section.querySelector(".nav-items");
    const card = document.createElement("div");
    card.className = "nav-card";
    const links = document.createElement("div");
    links.className = "nav-page-links";
    links.style.paddingTop = "16px";
    links.style.paddingBottom = "16px";
    links.style.paddingLeft = "16px";
    links.style.paddingRight = "16px";
    visibleItems.forEach((item) => {
      links.appendChild(createPill(item.title, item.path, item.kind));
    });
    card.appendChild(links);
    host.appendChild(card);
    navTree.appendChild(section);
  });

  const groups = groupBy(
    state.manifest.docs.filter((item) => item.kind === "element"),
    (item) => item.category,
  );

  Object.entries(groups).forEach(([category, items]) => {
    const section = navSectionTemplate.content.firstElementChild.cloneNode(true);
    section.querySelector(".nav-section-title").textContent = category;
    const host = section.querySelector(".nav-items");

    items.forEach((item) => {
      const visiblePages = item.pages.filter((page) => {
        const kind = pageKind(page);
        return page.path === state.currentPath || state.mode === "all" || kind === state.mode;
      });
      const searchable = [item.title, item.shortDescription, ...item.pages.map((page) => `${page.label} ${pageKind(page)}`)];
      if (!visiblePages.length || !matches(searchable, state.filter)) return;

      const card = navItemTemplate.content.firstElementChild.cloneNode(true);
      card.querySelector(".nav-card-title").textContent = item.title;
      card.querySelector(".nav-card-desc").textContent = item.shortDescription;
      const links = card.querySelector(".nav-page-links");
      visiblePages.forEach((page) => links.appendChild(createPill(page.label, page.path, pageKind(page))));
      if (visiblePages.some((page) => page.path === state.currentPath)) {
        card.open = true;
      }
      host.appendChild(card);
    });

    if (host.childElementCount > 0) {
      navTree.appendChild(section);
    }
  });
}

function createPill(label, path, kind) {
  const link = document.createElement("a");
  link.className = "nav-page-link";
  link.href = `#${encodeURIComponent(path)}`;
  link.dataset.path = path;
  link.dataset.kind = kind;
  link.textContent = label;
  if (path === state.currentPath) {
    link.classList.add("is-active");
  }
  return link;
}

function renderMeta(meta) {
  docCategory.textContent = meta.category;
  docTitle.textContent = meta.title;

  const chips = [
    { label: meta.pageLabel, kind: meta.pageKind },
    { label: meta.slug ? `slug: ${meta.slug}` : meta.category, kind: "overview" },
  ];

  docMeta.innerHTML = "";
  chips.filter((chip) => chip.label).forEach((chip) => {
    const span = document.createElement("span");
    span.className = "meta-chip";
    span.dataset.kind = chip.kind;
    span.textContent = chip.label;
    docMeta.appendChild(span);
  });
}

function resolveMeta(path) {
  const normalizedPath = normalizePath(path);
  const generalDoc = state.manifest.docs.find((item) => item.kind !== "element" && normalizePath(item.path) === normalizedPath);
  if (generalDoc) {
    return {
      title: generalDoc.title,
      category: generalDoc.category || kindLabel(generalDoc.kind),
      pageLabel: kindLabel(generalDoc.kind),
      pageKind: generalDoc.kind,
      slug: null,
    };
  }

  for (const element of state.manifest.docs.filter((item) => item.kind === "element")) {
    for (const page of element.pages) {
      if (normalizePath(page.path) === normalizedPath) {
        return {
          title: `${element.title} / ${page.label}`,
          category: element.category,
          pageLabel: page.label,
          pageKind: pageKind(page),
          slug: element.slug,
        };
      }
    }
  }

  return {
    title: fileName(normalizedPath),
    category: "Markdown",
    pageLabel: "Markdown",
    pageKind: "overview",
    slug: null,
  };
}

function syncModeButtons() {
  document.querySelectorAll(".mode-pill").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.mode === state.mode);
  });
}

function navigate(path) {
  location.hash = encodeURIComponent(normalizePath(path));
}

function normalizePath(path) {
  if (!path) return fallbackPath;
  if (/^https?:\/\//.test(path)) return path;

  let clean = String(path).trim();
  clean = clean.replace(/^\/+/, "");
  clean = clean.replace(/^docs\//, "");
  if (!clean) return fallbackPath;
  if (clean.startsWith("current-spec/") || clean === "PUBLISHING.md") return clean;

  const base = state.currentPath.split("/").slice(0, -1).join("/");
  return new URL(clean, `https://local/${base}/`).pathname.replace(/^\/+/, "");
}

function buildDocUrl(path) {
  return new URL(normalizePath(path), siteBaseUrl);
}

function highlightActive() {
  document.querySelectorAll(".nav-page-link").forEach((link) => {
    link.classList.toggle("is-active", link.dataset.path === state.currentPath);
  });
}

function renderMarkdown(markdown, docPath) {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const html = [];
  const headings = [];
  const headingCounts = new Map();
  let index = 0;

  while (index < lines.length) {
    const line = lines[index];

    if (!line.trim()) {
      index += 1;
      continue;
    }

    if (line.startsWith("```")) {
      const language = line.slice(3).trim();
      index += 1;
      const code = [];
      while (index < lines.length && !lines[index].startsWith("```")) {
        code.push(lines[index]);
        index += 1;
      }
      if (index < lines.length) index += 1;
      html.push(`<pre><code class="language-${escapeHtml(language)}">${escapeHtml(code.join("\n"))}</code></pre>`);
      continue;
    }

    if (/^---+$/.test(line.trim())) {
      html.push("<hr />");
      index += 1;
      continue;
    }

    if (line.includes("|") && index + 1 < lines.length && isTableSeparator(lines[index + 1])) {
      const headers = parseTableRow(line);
      const rows = [];
      index += 2;
      while (index < lines.length && lines[index].trim().includes("|") && !isTableSeparator(lines[index])) {
        rows.push(parseTableRow(lines[index]));
        index += 1;
      }
      html.push(renderTable(headers, rows, docPath));
      continue;
    }

    const heading = line.match(/^(#{1,6})\s+(.*)$/);
    if (heading) {
      const level = heading[1].length;
      const plainText = stripMarkdown(heading[2]);
      const headingId = makeHeadingId(plainText, headingCounts);
      headings.push({ level, text: plainText, id: headingId });
      html.push(`<h${level} id="${escapeHtml(headingId)}">${renderInline(heading[2], docPath)}</h${level}>`);
      index += 1;
      continue;
    }

    if (line.startsWith(">")) {
      const quote = [];
      while (index < lines.length && lines[index].startsWith(">")) {
        quote.push(lines[index].replace(/^>\s?/, ""));
        index += 1;
      }
      const callout = quote[0]?.match(/^\[!(NOTE|TIP|WARNING|INFO)\]\s*(.*)$/i);
      if (callout) {
        const kind = callout[1].toLowerCase();
        const label = callout[1].toUpperCase();
        const body = [callout[2], ...quote.slice(1)].filter(Boolean).join(" ");
        html.push(
          `<div class="callout callout-${escapeHtml(kind)}"><p class="callout-label">${escapeHtml(label)}</p><p>${renderInline(body, docPath)}</p></div>`,
        );
      } else {
        html.push(`<blockquote>${renderInline(quote.join(" "), docPath)}</blockquote>`);
      }
      continue;
    }

    if (/^(-|\d+\.)\s+/.test(line)) {
      const ordered = /^\d+\.\s+/.test(line);
      const tag = ordered ? "ol" : "ul";
      const items = [];
      while (index < lines.length && /^(-|\d+\.)\s+/.test(lines[index])) {
        items.push(`<li>${renderInline(lines[index].replace(/^(-|\d+\.)\s+/, ""), docPath)}</li>`);
        index += 1;
      }
      html.push(`<${tag}>${items.join("")}</${tag}>`);
      continue;
    }

    const paragraph = [];
    while (
      index < lines.length &&
      lines[index].trim() &&
      !lines[index].startsWith("```") &&
      !/^(#{1,6})\s+/.test(lines[index]) &&
      !/^(-|\d+\.)\s+/.test(lines[index]) &&
      !lines[index].startsWith(">") &&
      !/^---+$/.test(lines[index].trim())
    ) {
      paragraph.push(lines[index]);
      index += 1;
    }
    html.push(`<p>${renderInline(paragraph.join(" "), docPath)}</p>`);
  }

  const toc = renderToc(headings);
  return `${toc}${html.join("\n")}`;
}

function renderInline(text, docPath) {
  let output = escapeHtml(text);
  const codeTokens = [];

  output = output.replace(/`([^`]+)`/g, (_, code) => {
    const token = `%%CODE${codeTokens.length}%%`;
    codeTokens.push({
      token,
      html: `<code>${escapeHtml(code)}</code>`,
    });
    return token;
  });

  output = output.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, label, href) => {
    const target = /\.md($|[#?])/.test(href)
      ? `#${encodeURIComponent(resolveRelative(docPath, href))}`
      : escapeHtml(href);
    return `<a href="${target}">${label}</a>`;
  });

  output = output.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");

  codeTokens.forEach(({ token, html }) => {
    output = output.replace(token, html);
  });
  return output;
}

function resolveRelative(fromPath, targetPath) {
  if (targetPath.startsWith("/")) {
    return normalizePath(targetPath);
  }
  if (targetPath.startsWith("docs/")) {
    return normalizePath(targetPath);
  }
  const base = normalizePath(fromPath).split("/").slice(0, -1).join("/");
  return new URL(targetPath, `https://local/${base}/`).pathname.replace(/^\/+/, "");
}

function renderToc(headings) {
  const visibleHeadings = headings.filter((entry) => entry.level >= 2 && entry.level <= 3);
  if (visibleHeadings.length < 3) return "";
  const links = visibleHeadings.map((entry) => {
    return `<button class="toc-link toc-link-level-${entry.level}" type="button" data-scroll-id="${escapeHtml(entry.id)}">${escapeHtml(entry.text)}</button>`;
  }).join("");
  return `<section class="wiki-toc"><p class="wiki-toc-title">このページの目次</p><div class="wiki-toc-links">${links}</div></section>`;
}

function renderTable(headers, rows, docPath) {
  const headHtml = headers.map((cell) => `<th>${renderInline(cell, docPath)}</th>`).join("");
  const bodyHtml = rows.map((row) => {
    const cells = headers.map((_, index) => `<td>${renderInline(row[index] || "", docPath)}</td>`).join("");
    return `<tr>${cells}</tr>`;
  }).join("");
  return `<div class="table-wrap"><table><thead><tr>${headHtml}</tr></thead><tbody>${bodyHtml}</tbody></table></div>`;
}

function isTableSeparator(line) {
  return /^\s*\|?(?:\s*:?-{3,}:?\s*\|)+\s*:?-{3,}:?\s*\|?\s*$/.test(line);
}

function parseTableRow(line) {
  return line.trim().replace(/^\|/, "").replace(/\|$/, "").split("|").map((cell) => cell.trim());
}

function stripMarkdown(text) {
  return String(text)
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1")
    .trim();
}

function makeHeadingId(text, counts) {
  const base = Array.from(String(text).toLowerCase()).map((char) => {
    return /[\p{Letter}\p{Number}]/u.test(char) ? char : "-";
  }).join("").replace(/-+/g, "-").replace(/^-|-$/g, "") || "section";
  const seen = counts.get(base) || 0;
  counts.set(base, seen + 1);
  return seen === 0 ? base : `${base}-${seen + 1}`;
}

function pageKind(page) {
  const label = page.label.toLowerCase();
  if (label.includes("wiki")) return "wiki";
  if (label.includes("編集")) return "examples";
  return "summary";
}

function kindLabel(kind) {
  if (kind === "overview") return "Overview";
  if (kind === "guide") return "Guide";
  return "Reference";
}

function groupBy(items, keySelector) {
  return items.reduce((acc, item) => {
    const key = keySelector(item);
    acc[key] ??= [];
    acc[key].push(item);
    return acc;
  }, {});
}

function matches(values, filter) {
  if (!filter) return true;
  return values.join(" ").toLowerCase().includes(filter);
}

async function fetchJson(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`manifest の取得に失敗しました: ${response.status}`);
  }
  return response.json();
}

async function fetchText(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Markdown の取得に失敗しました: ${response.status}`);
  }
  return response.text();
}

function fileName(path) {
  return path.split("/").at(-1) || path;
}

function showError(error) {
  console.error(error);
  docCategory.textContent = "Error";
  docTitle.textContent = "表示に失敗しました";
  docMeta.innerHTML = "";
  preview.innerHTML = `<div class="empty-state"><h2>読み込みエラー</h2><p>${escapeHtml(error?.message || "不明なエラー")}</p></div>`;
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
