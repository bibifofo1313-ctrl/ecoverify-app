import http from "node:http";
import { URL } from "node:url";

const PORT = Number(process.env.PORT || 8787);
const CACHE_TTL_MS = 10 * 60 * 1000;

const FALLBACK_ITEMS = [
  {
    id: "fallback-1",
    title: "EU expands SME sustainability reporting guidance",
    source: "Policy Monitor",
    summary:
      "New guidance clarifies phased reporting timelines for micro and small operators across the EU.",
    url: "",
    publishedAt: new Date().toISOString(),
  },
  {
    id: "fallback-2",
    title: "US states boost incentives for fleet electrification",
    source: "Regulatory Wire",
    summary:
      "Regional programs introduce fresh credits for low-emission fleet upgrades in 2026.",
    url: "",
    publishedAt: new Date().toISOString(),
  },
  {
    id: "fallback-3",
    title: "Circular sourcing standards tighten for imports",
    source: "Trade Insights",
    summary:
      "Material traceability requirements are expected to impact micro manufacturers.",
    url: "",
    publishedAt: new Date().toISOString(),
  },
];

let cache = {
  timestamp: 0,
  items: FALLBACK_ITEMS,
};

const normalizeArticles = (raw) => {
  if (!raw) return FALLBACK_ITEMS;

  const items =
    raw.items ||
    raw.articles ||
    raw.results ||
    raw.data ||
    [];

  if (!Array.isArray(items) || items.length === 0) {
    return FALLBACK_ITEMS;
  }

  return items.slice(0, 5).map((item, index) => ({
    id: item.id || item.url || `news-${index}`,
    title: item.title || "Untitled update",
    source: item.source?.name || item.source || "EcoVerify",
    summary: item.description || item.summary || "Summary unavailable.",
    url: item.url || "",
    publishedAt: item.publishedAt || item.date || new Date().toISOString(),
  }));
};

const fetchNews = async () => {
  const apiUrl = process.env.NEWS_API_URL;
  const apiKey = process.env.NEWS_API_KEY;

  if (!apiUrl) {
    return FALLBACK_ITEMS;
  }

  const response = await fetch(apiUrl, {
    headers: apiKey ? { "X-Api-Key": apiKey } : undefined,
  });

  if (!response.ok) {
    return FALLBACK_ITEMS;
  }

  const data = await response.json();
  return normalizeArticles(data);
};

const handleNews = async (res) => {
  const now = Date.now();
  if (now - cache.timestamp < CACHE_TTL_MS) {
    res.writeHead(200, {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "public, max-age=600",
    });
    res.end(JSON.stringify({ items: cache.items }));
    return;
  }

  const items = await fetchNews();
  cache = { timestamp: now, items };

  res.writeHead(200, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Cache-Control": "public, max-age=600",
  });
  res.end(JSON.stringify({ items }));
};

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url || "", `http://${req.headers.host}`);

  if (req.method === "GET" && url.pathname === "/api/news") {
    await handleNews(res);
    return;
  }

  res.writeHead(404, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  });
  res.end(JSON.stringify({ error: "Not found" }));
});

server.listen(PORT, () => {
  console.log(`EcoVerify news API running on http://localhost:${PORT}`);
});
