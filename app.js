const STORAGE_KEY = "vyapaari.market.ready.v1";

const navItems = [
  ["dashboard", "Dashboard", "⌂"],
  ["billing", "Billing & POS", "₹"],
  ["ai", "AI Assistant", "AI"],
  ["inventory", "Inventory", "▦"],
  ["parties", "Parties", "◉"],
  ["accounting", "Accounting", "∑"],
  ["reports", "Reports", "◷"],
  ["ocr", "OCR Scan", "⌕"],
  ["store", "Online Store", "↗"],
  ["settings", "Launch Settings", "⚙"],
];

// Role-based access control. "all" grants every module; otherwise an allowlist of view ids.
const ROLE_ACCESS = {
  Admin: { modules: "all", label: "All modules", canManageUsers: true },
  Manager: { modules: ["dashboard", "billing", "ai", "inventory", "parties", "accounting", "reports", "ocr", "store"], label: "Everything except launch settings", canManageUsers: false },
  Cashier: { modules: ["dashboard", "billing", "inventory", "parties"], label: "Billing, POS, payments", canManageUsers: false },
  Accountant: { modules: ["dashboard", "accounting", "reports", "parties"], label: "Reports, accounting, GST", canManageUsers: false },
  Sales: { modules: ["dashboard", "billing", "store", "parties"], label: "Billing, online store", canManageUsers: false },
};
const ROLE_LIST = Object.keys(ROLE_ACCESS);
const SESSION_KEY = "vyapaari.session.v1";

const seedState = {
  view: "dashboard",
  business: {
    name: "Shree Lakshmi Traders",
    tagline: "Wholesale & Retail Distributors",
    gstin: "29AAZCS9478E1Z7",
    phone: "+91 98765 43210",
    address: "Bengaluru, Karnataka",
    invoicePrefix: "VYP",
    language: "English",
    bankName: "State Bank of India",
    accountName: "Shree Lakshmi Traders",
    accountNo: "1234 5678 9012",
    ifsc: "SBIN0001234",
    upiId: "shreelakshmi@sbi",
  },
  settings: {
    theme: "Classic GST",
    autoBackup: true,
    eInvoice: true,
    eWayBill: true,
    whatsapp: true,
    offlineMode: true,
    googleClientId: "",
    lastBackupAt: "",
  },
  users: [
    { id: "U-1", name: "Owner", role: "Admin", access: "All modules", active: true, pinHash: "", salt: "" },
    { id: "U-2", name: "Ravi", role: "Cashier", access: "Billing, POS, payments", active: true, pinHash: "", salt: "" },
    { id: "U-3", name: "Meena", role: "Accountant", access: "Reports, accounting, GST", active: true, pinHash: "", salt: "" },
  ],
  parties: [
    { id: "P-101", name: "Ankit Retail", type: "Customer", phone: "9876500011", balance: 18420, terms: 15 },
    { id: "P-102", name: "FreshMart Supply", type: "Supplier", phone: "9876500022", balance: -12200, terms: 7 },
    { id: "P-103", name: "Kumar Stores", type: "Customer", phone: "9876500033", balance: 5400, terms: 10 },
    { id: "P-104", name: "Metro Wholesale", type: "Supplier", phone: "9876500044", balance: -28600, terms: 5 },
  ],
  items: [
    { id: "I-1001", name: "Premium Rice 25kg", hsn: "1006", category: "Grocery", stock: 48, minStock: 18, unit: "bag", purchase: 1210, sale: 1399, gst: 5, batch: "R25-A", expiry: "2026-12-20" },
    { id: "I-1002", name: "Sunflower Oil 1L", hsn: "1512", category: "FMCG", stock: 16, minStock: 24, unit: "bottle", purchase: 112, sale: 139, gst: 5, batch: "SO-77", expiry: "2026-10-12" },
    { id: "I-1003", name: "LED Bulb 12W", hsn: "8539", category: "Electrical", stock: 92, minStock: 20, unit: "pcs", purchase: 62, sale: 110, gst: 18, batch: "LB-4", expiry: "" },
    { id: "I-1004", name: "Notebook A4", hsn: "4820", category: "Stationery", stock: 130, minStock: 35, unit: "pcs", purchase: 28, sale: 45, gst: 12, batch: "NB-22", expiry: "" },
    { id: "I-1005", name: "Masala Mix 500g", hsn: "0910", category: "FMCG", stock: 11, minStock: 18, unit: "pkt", purchase: 74, sale: 98, gst: 5, batch: "MM-9", expiry: "2026-08-25" },
  ],
  invoices: [
    { id: "VYP-1042", partyId: "P-101", date: "2026-07-07", status: "Paid", paymentMode: "UPI", lines: [{ itemId: "I-1001", qty: 2, discount: 0 }, { itemId: "I-1003", qty: 6, discount: 4 }] },
    { id: "VYP-1043", partyId: "P-103", date: "2026-07-06", status: "Pending", paymentMode: "Credit", lines: [{ itemId: "I-1002", qty: 24, discount: 2 }, { itemId: "I-1004", qty: 30, discount: 5 }] },
    { id: "VYP-1044", partyId: "Walk-in Customer", date: "2026-07-07", status: "Paid", paymentMode: "Cash", lines: [{ itemId: "I-1005", qty: 5, discount: 0 }, { itemId: "I-1003", qty: 2, discount: 0 }] },
  ],
  expenses: [
    { id: "E-201", date: "2026-07-07", category: "Rent", amount: 18000, gst: 0, note: "Shop rent" },
    { id: "E-202", date: "2026-07-06", category: "Transport", amount: 2800, gst: 5, note: "Delivery challan expenses" },
    { id: "E-203", date: "2026-07-05", category: "Staff", amount: 9200, gst: 0, note: "Weekly payout" },
  ],
  orders: [
    { id: "ORD-81", customer: "Asha Home Needs", amount: 12450, status: "Ready to invoice", channel: "Online store" },
    { id: "ORD-82", customer: "Ravi Kirana", amount: 6200, status: "Packed", channel: "WhatsApp" },
  ],
  journals: [
    { id: "J-501", date: "2026-07-07", debit: "Cash", credit: "Sales", amount: 1540, note: "POS cash sale" },
  ],
  purchases: [
    { id: "PUR-301", supplier: "FreshMart Supply", date: "2026-07-06", gstMode: "exclusive", lines: [{ itemId: "I-1002", qty: 24, price: 112, gst: 5 }] },
  ],
  ai: {
    memory: {
      itemAliases: { rice: "I-1001", oil: "I-1002", bulb: "I-1003", notebook: "I-1004", masala: "I-1005" },
      partyAliases: { ankit: "P-101", kumar: "P-103", freshmart: "P-102", metro: "P-104" },
      learned: [],
      itemSuggestions: {},
      partySuggestions: {},
    },
    messages: [
      { role: "assistant", text: "I can create sales invoices, purchase invoices, inventory items, reminders and bulk uploads. Try: sale Ankit Retail Premium Rice 25kg x2 paid upi inclusive" },
    ],
  },
  invoiceDraft: {
    partyId: "P-101",
    paymentMode: "UPI",
    status: "Paid",
    gstMode: "exclusive",
    paidAmount: 0,
    lines: [{ itemId: "I-1001", qty: 1, discount: 0, discountType: "percent" }],
  },
};

let state = loadState();

const app = document.getElementById("app");
const nav = document.getElementById("mainNav");
const viewTitle = document.getElementById("viewTitle");
const viewKicker = document.getElementById("viewKicker");
const primaryAction = document.getElementById("primaryAction");
const toast = document.getElementById("toast");

function loadState() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return structuredClone(seedState);
  try {
    return migrateState({ ...structuredClone(seedState), ...JSON.parse(saved) });
  } catch {
    return structuredClone(seedState);
  }
}

function migrateState(nextState) {
  nextState.invoiceDraft = { ...structuredClone(seedState.invoiceDraft), ...(nextState.invoiceDraft || {}) };
  nextState.invoiceDraft.gstMode = nextState.invoiceDraft.gstMode || "exclusive";
  nextState.invoices = (nextState.invoices || []).map((invoice) => ({ gstMode: "exclusive", ...invoice }));
  nextState.purchases = nextState.purchases || structuredClone(seedState.purchases);
  nextState.ai = {
    ...structuredClone(seedState.ai),
    ...(nextState.ai || {}),
    memory: { ...structuredClone(seedState.ai.memory), ...(nextState.ai?.memory || {}) },
    messages: nextState.ai?.messages?.length ? nextState.ai.messages : structuredClone(seedState.ai.messages),
  };
  nextState.ai.memory.itemSuggestions = nextState.ai.memory.itemSuggestions || {};
  nextState.ai.memory.partySuggestions = nextState.ai.memory.partySuggestions || {};
  nextState.settings = { ...structuredClone(seedState.settings), ...(nextState.settings || {}) };
  nextState.business = { ...structuredClone(seedState.business), ...(nextState.business || {}) };
  nextState.users = (nextState.users || structuredClone(seedState.users)).map((user, index) => ({
    id: user.id || `U-${index + 1}`,
    name: user.name,
    role: user.role || "Cashier",
    access: user.access || (ROLE_ACCESS[user.role] ? ROLE_ACCESS[user.role].label : "Billing"),
    active: user.active !== false,
    pinHash: user.pinHash || "",
    salt: user.salt || "",
  }));
  seedSuggestionsFromData(nextState);
  return nextState;
}

// Seed the suggestion memory from existing items/parties so autofill works immediately.
function seedSuggestionsFromData(target) {
  (target.items || []).forEach((item) => {
    const key = normalizeText(item.name);
    if (!key || target.ai.memory.itemSuggestions[key]) return;
    target.ai.memory.itemSuggestions[key] = {
      name: item.name, category: item.category, hsn: item.hsn, gst: item.gst,
      unit: item.unit, sale: item.sale, purchase: item.purchase, count: 1, lastUsed: item.expiry || "",
    };
  });
  (target.parties || []).forEach((party) => {
    const key = normalizeText(party.name);
    if (!key || target.ai.memory.partySuggestions[key]) return;
    target.ai.memory.partySuggestions[key] = {
      name: party.name, type: party.type, phone: party.phone, terms: party.terms, count: 1,
    };
  });
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

/* ============================================================
   AUTHENTICATION  (local, offline, role-based)
   ============================================================ */
const authGate = document.getElementById("authGate");
const appShell = document.getElementById("appShell");
let sessionUser = null;

function randomSalt() {
  const bytes = crypto.getRandomValues(new Uint8Array(16));
  return Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
}

async function hashPin(pin, salt) {
  const data = new TextEncoder().encode(`${salt}::${pin}`);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, "0")).join("");
}

function needsSetup() {
  return !state.users.some((user) => user.pinHash);
}

function readSession() {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY) || localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return state.users.find((user) => user.id === parsed.userId && user.active) || null;
  } catch {
    return null;
  }
}

function writeSession(userId, remember) {
  const payload = JSON.stringify({ userId, ts: Date.now() });
  sessionStorage.setItem(SESSION_KEY, payload);
  if (remember) localStorage.setItem(SESSION_KEY, payload);
  else localStorage.removeItem(SESSION_KEY);
}

function clearSession() {
  sessionStorage.removeItem(SESSION_KEY);
  localStorage.removeItem(SESSION_KEY);
  sessionUser = null;
}

function accessFor(role) {
  return ROLE_ACCESS[role] || ROLE_ACCESS.Cashier;
}

function canAccess(view, user = sessionUser) {
  if (!user) return false;
  const rules = accessFor(user.role);
  return rules.modules === "all" || rules.modules.includes(view);
}

function bootAuth() {
  sessionUser = readSession();
  if (sessionUser) {
    showApp();
  } else {
    renderAuthGate();
  }
}

function showApp() {
  authGate.hidden = true;
  appShell.hidden = false;
  if (!canAccess(state.view)) {
    const rules = accessFor(sessionUser.role);
    state.view = rules.modules === "all" ? "dashboard" : rules.modules[0];
  }
  render();
  renderUserChip();
}

function logout() {
  clearSession();
  appShell.hidden = true;
  authScreen = "auth";
  renderAuthGate();
  showToast("Signed out. Your data stays saved on this device.");
}

let authScreen = "landing";

function renderAuthGate() {
  authGate.hidden = false;
  authGate.classList.toggle("landing-mode", authScreen === "landing");
  authGate.innerHTML = authScreen === "landing" ? landingScreen() : needsSetup() ? setupScreen() : loginScreen();
  attachAuthHandlers();
}

// Public landing / home page shown before sign in.
function landingScreen() {
  const setup = needsSetup();
  const primaryCta = setup ? "Create free account" : "Open my business";
  return `
    <div class="landing">
      <header class="landing-nav">
        <div class="auth-brand"><div class="brand-mark">V</div><div><strong>Vyapaari</strong><span>Business OS</span></div></div>
        <div class="landing-nav-actions">
          <button class="ghost-btn" type="button" data-goto-auth>Sign in</button>
          <button class="primary-btn" type="button" data-goto-auth>${setup ? "Sign up free" : "Get started"}</button>
        </div>
      </header>

      <section class="landing-hero">
        <span class="kicker">GST Billing • Inventory • Accounting • POS</span>
        <h1>Run your entire business from one simple app</h1>
        <p>Vyapaari gives Indian small businesses GST invoices with UPI payment QR, live stock, customer khata with balances, and GSTR-ready reports. Works fully offline — your data stays on your device.</p>
        <div class="landing-cta">
          <button class="primary-btn" type="button" data-goto-auth>${primaryCta}</button>
          <button class="ghost-btn" type="button" data-goto-auth>Sign in</button>
        </div>
        <ul class="landing-trust">
          <li>Works 100% offline</li>
          <li>Data stays on your device</li>
          <li>Free forever for one store</li>
        </ul>
      </section>

      <section class="landing-stats" aria-label="What you get">
        <article><span>Invoice with</span><strong>UPI QR</strong><small>Customers scan & pay instantly</small></article>
        <article><span>GST reports</span><strong>GSTR-1 & 3B</strong><small>Tax breakup auto-calculated</small></article>
        <article><span>Customer khata</span><strong>Balances</strong><small>Partial payments tracked per customer</small></article>
        <article><span>Stock alerts</span><strong>Live</strong><small>Low-stock warnings as you bill</small></article>
      </section>

      <section class="landing-features" aria-label="Features">
        <article class="panel"><h3>GST invoices + payment QR</h3><p>Professional invoice format with your logo, bank details and a scannable UPI QR that pre-fills the amount due.</p></article>
        <article class="panel"><h3>Billing counter (POS)</h3><p>Fast item search with smart suggestions that learn what you sell most. Discounts in percent or rupees per line.</p></article>
        <article class="panel"><h3>Partial payments & balances</h3><p>Record what the customer paid now — Vyapaari tracks the balance customer-wise and reminds on WhatsApp.</p></article>
        <article class="panel"><h3>Inventory that updates itself</h3><p>Stock deducts on every sale automatically, with HSN, units, low-stock alerts and stock value reports.</p></article>
        <article class="panel"><h3>Accounting built in</h3><p>Every invoice posts journal entries automatically — receivables, sales and taxes stay reconciled.</p></article>
        <article class="panel"><h3>Backup you control</h3><p>Encrypted backup files plus optional Google Drive backup. Restore on any device in one click.</p></article>
      </section>

      <footer class="landing-footer">
        <span>Vyapaari Business OS — made for Indian SMBs</span>
        <button class="ghost-btn" type="button" data-goto-auth>${setup ? "Create your account" : "Sign in"}</button>
      </footer>
    </div>`;
}

function authBrand() {
  return `
    <div class="auth-brand">
      <div class="brand-mark">V</div>
      <div><strong>Vyapaari</strong><span>Business OS</span></div>
    </div>`;
}

function setupScreen() {
  return `
    <div class="auth-card">
      ${authBrand()}
      <span class="kicker">First-time setup</span>
      <h2>Create your admin account</h2>
      <p class="muted">This owner account has full access. Staff logins with limited roles can be added later from Launch Settings. Everything is stored securely on this device.</p>
      <form id="setupForm" class="auth-form">
        <div class="field"><label>Owner name</label><input name="name" value="Owner" required autocomplete="name" /></div>
        <div class="field"><label>Admin password</label><input name="pin" type="password" minlength="4" required autocomplete="new-password" placeholder="Minimum 4 characters" /></div>
        <div class="field"><label>Confirm password</label><input name="confirm" type="password" minlength="4" required autocomplete="new-password" /></div>
        <button class="primary-btn auth-submit" type="submit">Create admin account</button>
      </form>
      <button class="auth-back" type="button" data-back-landing>&larr; Back to home</button>
    </div>`;
}

function loginScreen() {
  const activeUsers = state.users.filter((user) => user.active && user.pinHash);
  const chips = activeUsers
    .map((user) => `<button type="button" class="user-pick ${accessFor(user.role).canManageUsers ? "admin" : ""}" data-pick="${user.id}"><span class="avatar">${escapeHtml(user.name.slice(0, 1).toUpperCase())}</span><span><strong>${escapeHtml(user.name)}</strong><small>${escapeHtml(user.role)}</small></span></button>`)
    .join("");
  return `
    <div class="auth-card">
      ${authBrand()}
      <span class="kicker">Secure sign in</span>
      <h2>Welcome back</h2>
      <p class="muted">Select your profile and enter your password to continue.</p>
      <div class="user-picker">${chips}</div>
      <form id="loginForm" class="auth-form">
        <input type="hidden" name="userId" />
        <div class="field"><label>Password</label><input name="pin" type="password" required autocomplete="current-password" placeholder="Enter password" /></div>
        <label class="remember"><input type="checkbox" name="remember" /> Keep me signed in on this device</label>
        <button class="primary-btn auth-submit" type="submit">Sign in</button>
      </form>
      <button class="auth-back" type="button" data-back-landing>&larr; Back to home</button>
    </div>`;
}

function attachAuthHandlers() {
  authGate.querySelectorAll("[data-goto-auth]").forEach((btn) => {
    btn.addEventListener("click", () => {
      authScreen = "auth";
      renderAuthGate();
    });
  });
  authGate.querySelector("[data-back-landing]")?.addEventListener("click", () => {
    authScreen = "landing";
    renderAuthGate();
  });
  document.getElementById("setupForm")?.addEventListener("submit", handleSetup);
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    const hidden = loginForm.querySelector("[name=userId]");
    const pickers = authGate.querySelectorAll("[data-pick]");
    const selectUser = (id) => {
      hidden.value = id;
      pickers.forEach((btn) => btn.classList.toggle("selected", btn.dataset.pick === id));
      loginForm.querySelector("[name=pin]").focus();
    };
    pickers.forEach((btn) => btn.addEventListener("click", () => selectUser(btn.dataset.pick)));
    if (pickers.length === 1) selectUser(pickers[0].dataset.pick);
    loginForm.addEventListener("submit", handleLogin);
  }
}

async function handleSetup(event) {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(event.target).entries());
  if (data.pin !== data.confirm) return showToast("Passwords do not match.");
  const salt = randomSalt();
  const pinHash = await hashPin(data.pin, salt);
  const admin = state.users.find((user) => user.role === "Admin") || state.users[0];
  admin.name = data.name || admin.name;
  admin.role = "Admin";
  admin.access = ROLE_ACCESS.Admin.label;
  admin.active = true;
  admin.salt = salt;
  admin.pinHash = pinHash;
  saveState();
  writeSession(admin.id, true);
  sessionUser = admin;
  showApp();
  showToast(`Admin account ready. Welcome, ${admin.name}.`);
}

async function handleLogin(event) {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(event.target).entries());
  if (!data.userId) return showToast("Select your profile first.");
  const user = state.users.find((row) => row.id === data.userId);
  if (!user || !user.pinHash) return showToast("This profile has no password set yet.");
  const attempt = await hashPin(data.pin, user.salt);
  if (attempt !== user.pinHash) return showToast("Incorrect password. Please try again.");
  writeSession(user.id, Boolean(data.remember));
  sessionUser = user;
  showApp();
  showToast(`Signed in as ${user.name} (${user.role}).`);
}

function renderUserChip() {
  const chip = document.getElementById("userChip");
  if (!chip || !sessionUser) return;
  chip.innerHTML = `
    <span class="avatar">${escapeHtml(sessionUser.name.slice(0, 1).toUpperCase())}</span>
    <span class="user-meta"><strong>${escapeHtml(sessionUser.name)}</strong><small>${escapeHtml(sessionUser.role)}</small></span>
    <button class="ghost-btn" type="button" data-logout>Sign out</button>`;
  chip.querySelector("[data-logout]")?.addEventListener("click", logout);
}

/* ============================================================
   SELF-LEARNING SUGGESTIONS
   Remembers items/parties the user enters and suggests them next time.
   ============================================================ */
function recordItemSuggestion(item) {
  const key = normalizeText(item.name);
  if (!key) return;
  const store = state.ai.memory.itemSuggestions;
  const prev = store[key] || { count: 0 };
  store[key] = {
    name: item.name,
    category: item.category ?? prev.category ?? "",
    hsn: item.hsn ?? prev.hsn ?? "",
    gst: item.gst ?? prev.gst ?? 0,
    unit: item.unit ?? prev.unit ?? "pcs",
    sale: item.sale ?? prev.sale ?? 0,
    purchase: item.purchase ?? prev.purchase ?? 0,
    count: prev.count + 1,
    lastUsed: today(),
  };
}

function recordPartySuggestion(party) {
  const key = normalizeText(party.name);
  if (!key) return;
  const store = state.ai.memory.partySuggestions;
  const prev = store[key] || { count: 0 };
  store[key] = {
    name: party.name,
    type: party.type ?? prev.type ?? "Customer",
    phone: party.phone ?? prev.phone ?? "",
    terms: party.terms ?? prev.terms ?? 7,
    count: prev.count + 1,
    lastUsed: today(),
  };
}

// Sort remembered entries by usage frequency then recency.
function rankedSuggestions(map) {
  return Object.values(map || {}).sort((a, b) => (b.count - a.count) || String(b.lastUsed || "").localeCompare(String(a.lastUsed || "")));
}

function findItemSuggestion(name) {
  return state.ai.memory.itemSuggestions[normalizeText(name)] || null;
}

function findPartySuggestion(name) {
  return state.ai.memory.partySuggestions[normalizeText(name)] || null;
}

function uniqueValues(map, prop) {
  const values = new Set();
  Object.values(map || {}).forEach((entry) => {
    if (entry[prop] !== undefined && entry[prop] !== null && String(entry[prop]).trim()) values.add(String(entry[prop]));
  });
  return Array.from(values);
}

function optionList(values) {
  return values.map((value) => `<option value="${escapeHtml(value)}"></option>`).join("");
}

// Datalist that shows "Name — Category • HSN 1006" style hints.
// Display label for an inventory item used inside the searchable line picker.
function itemLabel(itemId) {
  const item = byId(state.items, itemId);
  return item ? `${item.name} • ${money(item.sale)}` : "";
}

// Datalist of every inventory item for searchable line selection (name, price, stock).
function inventoryDatalist(id) {
  const options = state.items
    .map((item) => `<option value="${escapeHtml(item.name)} • ${money(item.sale)}">${escapeHtml(item.category || "")}${item.stock !== undefined ? ` • ${item.stock} ${escapeHtml(item.unit || "")} in stock` : ""}</option>`)
    .join("");
  return `<datalist id="${id}">${options}</datalist>`;
}

// Resolves a typed/selected item search string back to an inventory item id.
function resolveItemPick(text) {
  const value = String(text || "").trim();
  if (!value) return null;
  const base = normalizeText(value.split("•")[0]);
  return (
    state.items.find((item) => normalizeText(item.name) === base) ||
    state.items.find((item) => normalizeText(item.name).startsWith(base)) ||
    state.items.find((item) => normalizeText(item.name).includes(base)) ||
    findItemFromText(value) ||
    null
  );
}

function itemSuggestDatalist(id) {
  const options = rankedSuggestions(state.ai.memory.itemSuggestions)
    .map((entry) => `<option value="${escapeHtml(entry.name)}">${escapeHtml(entry.category || "")}${entry.hsn ? ` • HSN ${escapeHtml(entry.hsn)}` : ""}</option>`)
    .join("");
  return `<datalist id="${id}">${options}</datalist>`;
}

function partySuggestDatalist(id) {
  const options = rankedSuggestions(state.ai.memory.partySuggestions)
    .map((entry) => `<option value="${escapeHtml(entry.name)}">${escapeHtml(entry.type || "")}${entry.phone ? ` • ${escapeHtml(entry.phone)}` : ""}</option>`)
    .join("");
  return `<datalist id="${id}">${options}</datalist>`;
}

// Quick-fill chips showing the most-used remembered items.
function suggestionChips(target) {
  const top = rankedSuggestions(state.ai.memory.itemSuggestions).slice(0, 6);
  if (!top.length) return "";
  return `
    <div class="suggest-strip" aria-label="Frequently used items">
      <span class="suggest-label">Frequent</span>
      ${top.map((entry) => `<button type="button" class="suggest-chip" data-suggest-fill="${target}" data-name="${escapeHtml(entry.name)}"><strong>${escapeHtml(entry.name)}</strong><small>${escapeHtml(entry.category || "")}${entry.hsn ? ` • HSN ${escapeHtml(entry.hsn)}` : ""}</small></button>`).join("")}
    </div>`;
}

// Fill the inventory form fields from a remembered item.
function applyItemSuggestion(form, name) {
  const hit = findItemSuggestion(name);
  if (!form || !hit) return false;
  const set = (field, value) => {
    const el = form.querySelector(`[name=${field}]`);
    if (el && (!el.value || field !== "name")) el.value = value;
  };
  form.querySelector("[name=name]").value = hit.name;
  set("hsn", hit.hsn);
  set("category", hit.category);
  set("unit", hit.unit);
  if (hit.gst !== undefined) form.querySelector("[name=gst]").value = hit.gst;
  if (hit.purchase) form.querySelector("[name=purchase]").value = hit.purchase;
  if (hit.sale) form.querySelector("[name=sale]").value = hit.sale;
  return true;
}

function money(value) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value || 0);
}

function today() {
  return new Date().toISOString().slice(0, 10);
}

function formatDate(value) {
  const date = value ? new Date(value) : new Date();
  if (Number.isNaN(date.getTime())) return value || "";
  return date.toLocaleDateString("en-GB");
}

// Builds a UPI payment string so the QR opens the amount pre-filled in any UPI app.
function buildUpiString(amount) {
  const biz = state.business;
  if (!biz.upiId) return biz.name || "Vyapaari";
  const params = new URLSearchParams({ pa: biz.upiId, pn: biz.accountName || biz.name || "Vyapaari", cu: "INR" });
  if (amount > 0) params.set("am", Number(amount).toFixed(2));
  return `upi://pay?${params.toString()}`;
}

// Draws the payment QR onto the invoice canvas using the vendored qrcode generator.
function renderInvoiceQr(amount) {
  const canvas = document.getElementById("invoiceQr");
  if (!canvas || typeof qrcode !== "function") return;
  try {
    const qr = qrcode(0, "M");
    qr.addData(buildUpiString(amount));
    qr.make();
    const count = qr.getModuleCount();
    const size = canvas.width;
    const cell = Math.floor(size / count);
    const offset = Math.floor((size - cell * count) / 2);
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, size, size);
    ctx.fillStyle = "#111111";
    for (let r = 0; r < count; r += 1) {
      for (let c = 0; c < count; c += 1) {
        if (qr.isDark(r, c)) ctx.fillRect(offset + c * cell, offset + r * cell, cell, cell);
      }
    }
  } catch {
    /* QR is optional; ignore render errors */
  }
}

function byId(list, id) {
  return list.find((item) => item.id === id);
}

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
}

function itemTotal(line) {
  const item = byId(state.items, line.itemId);
  if (!item) return { subtotal: 0, discount: 0, taxable: 0, tax: 0, total: 0, profit: 0 };
  const mode = line.gstMode || state.invoiceDraft?.gstMode || "exclusive";
  const qty = Number(line.qty || 0);
  const rate = Number(line.price || item.sale || 0);
  const gstRate = Number(line.gst ?? item.gst ?? 0);
  const gross = rate * qty;
  const subtotal = gross;
  const discountType = line.discountType || "percent";
  const discountValue = Number(line.discount || 0);
  let discount = discountType === "amount" ? discountValue : gross * (discountValue / 100);
  discount = Math.min(Math.max(discount, 0), gross);
  let taxable;
  let tax;
  let total;
  if (mode === "inclusive") {
    total = gross - discount;
    taxable = total / (1 + gstRate / 100);
    tax = total - taxable;
  } else {
    taxable = gross - discount;
    tax = taxable * (gstRate / 100);
    total = taxable + tax;
  }
  const profit = total - tax - item.purchase * qty;
  return { subtotal, discount, taxable, tax, total, profit };
}

function invoiceTotal(invoice) {
  return invoice.lines.reduce(
    (acc, line) => {
      const row = itemTotal({ ...line, gstMode: line.gstMode || invoice.gstMode || "exclusive" });
      acc.subtotal += row.subtotal;
      acc.discount += row.discount;
      acc.taxable += row.taxable;
      acc.tax += row.tax;
      acc.total += row.total;
      acc.profit += row.profit;
      return acc;
    },
    { subtotal: 0, discount: 0, taxable: 0, tax: 0, total: 0, profit: 0 },
  );
}

// Derives payment status + label from the invoice total and amount received.
function paymentStatus(total, paid) {
  const t = Math.round(Number(total || 0) * 100) / 100;
  const p = Math.round(Number(paid || 0) * 100) / 100;
  if (p <= 0) return { key: "Pending", cls: "danger", label: "Unpaid" };
  if (p >= t) return { key: "Paid", cls: "ok", label: "Paid in full" };
  return { key: "Partial", cls: "low", label: `Partially paid • ${money(t - p)} due` };
}

// Returns paid amount / balance for a saved invoice (falls back to status for legacy records).
function invoicePayment(invoice) {
  const total = invoiceTotal(invoice).total;
  let paid = invoice.paidAmount;
  if (paid === undefined || paid === null) paid = invoice.status === "Paid" ? total : 0;
  paid = Math.min(Math.max(Number(paid || 0), 0), total);
  return { total, paid, balance: Math.max(0, Math.round((total - paid) * 100) / 100) };
}

function salesTotal() {
  return state.invoices.reduce((sum, invoice) => sum + invoiceTotal(invoice).total, 0);
}

function purchaseValue() {
  return state.items.reduce((sum, item) => sum + item.purchase * item.stock, 0);
}

function expenseTotal() {
  return state.expenses.reduce((sum, expense) => sum + Number(expense.amount || 0), 0);
}

function purchaseTotal(purchase) {
  return purchase.lines.reduce(
    (sum, line) => {
      const gross = Number(line.price || 0) * Number(line.qty || 0);
      const gst = Number(line.gst || 0);
      if ((purchase.gstMode || line.gstMode) === "inclusive") return sum + gross;
      return sum + gross + gross * (gst / 100);
    },
    0,
  );
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  window.setTimeout(() => toast.classList.remove("show"), 2600);
}

function setView(view) {
  if (!canAccess(view)) return showToast("Your role does not have access to that module.");
  state.view = view;
  saveState();
  render();
  closeMobileNav();
}

function statusClass(status) {
  const normal = String(status).toLowerCase();
  if (normal.includes("paid") || normal.includes("active") || normal.includes("ready")) return "ok";
  if (normal.includes("overdue") || normal.includes("expired")) return "danger";
  if (normal.includes("pending") || normal.includes("low") || normal.includes("packed")) return "low";
  return "pending";
}

function barcodeFor(text) {
  return `<span class="barcode" aria-label="Barcode ${text}">${String(text)
    .split("")
    .slice(0, 14)
    .map((char) => `<i style="height:${12 + (char.charCodeAt(0) % 20)}px"></i>`)
    .join("")}</span>`;
}

function renderNav() {
  nav.innerHTML = navItems
    .filter(([id]) => canAccess(id))
    .map(
      ([id, label, icon]) => `
        <button class="nav-item ${state.view === id ? "active" : ""}" type="button" data-view="${id}">
          <span class="nav-icon">${icon}</span>
          <span>${label}</span>
        </button>
      `,
    )
    .join("");
}

function metric(label, value, note, tone) {
  return `<article class="metric ${tone || ""}"><span>${label}</span><strong>${value}</strong><small>${note}</small></article>`;
}

function renderDashboard() {
  const lowStock = state.items.filter((item) => item.stock <= item.minStock);
  const due = state.invoices.filter((invoice) => invoice.status !== "Paid");
  const gst = state.invoices.reduce((sum, invoice) => sum + invoiceTotal(invoice).tax, 0);
  const profit = state.invoices.reduce((sum, invoice) => sum + invoiceTotal(invoice).profit, 0) - expenseTotal();

  return `
    <section class="hero-workspace">
      <div class="command-plane">
        <span class="kicker">GST billing + inventory + accounting</span>
        <h2>${state.business.name}</h2>
        <p>Run counter billing, stock movement, dues, GST reports, online orders, and staff access from one launch-ready workspace.</p>
        <div class="quick-actions no-print">
          <button type="button" data-go="billing">New GST invoice</button>
          <button type="button" data-go="inventory">Check low stock</button>
          <button type="button" data-go="reports">Open GST reports</button>
          <button type="button" data-go="store">Share online store</button>
        </div>
      </div>
      <aside class="today-panel">
        <span class="kicker">Opening register</span>
        <h2>${money(salesTotal())}</h2>
        <p class="muted">Total booked sales across invoices. Pending payments and stock movements are synced into accounting automatically.</p>
        <div class="timeline">
          <div class="timeline-row"><strong>08:00</strong><span>Mobile stock check synced to desktop.</span></div>
          <div class="timeline-row"><strong>11:00</strong><span>Cashier billing active with role-based access.</span></div>
          <div class="timeline-row"><strong>16:00</strong><span>Offline invoices can continue during network outages.</span></div>
          <div class="timeline-row"><strong>21:00</strong><span>Backup and GST summaries ready for the owner.</span></div>
        </div>
      </aside>
    </section>

    <section class="metric-grid">
      ${metric("Sales", money(salesTotal()), `${state.invoices.length} invoices created`, "pos")}
      ${metric("GST collected", money(gst), "GSTR-ready tax breakup", "net")}
      ${metric("Stock value", money(purchaseValue()), `${lowStock.length} low-stock alerts`, "net")}
      ${metric("Net profit", money(profit), "After expenses and item costs", profit >= 0 ? "pos" : "neg")}
    </section>

    <section class="three-col">
      <article class="panel">
        <div class="panel-title"><h3>Payment follow-ups</h3><button class="ghost-btn" data-go="parties" type="button">Parties</button></div>
        <div class="list">
          ${due.map((invoice) => {
            const party = byId(state.parties, invoice.partyId);
            return `<div class="list-row"><div><strong>${invoice.id}</strong><div class="table-sub">${party?.name || invoice.partyId}</div></div><span class="status ${statusClass(invoice.status)}">${money(invoiceTotal(invoice).total)}</span></div>`;
          }).join("") || `<p class="muted">No pending invoices.</p>`}
        </div>
      </article>
      <article class="panel">
        <div class="panel-title"><h3>Low stock</h3><button class="ghost-btn" data-go="inventory" type="button">Inventory</button></div>
        <div class="list">
          ${lowStock.map((item) => `<div class="list-row"><div><strong>${item.name}</strong><div class="table-sub">${item.stock} ${item.unit} left</div></div><span class="status low">Reorder</span></div>`).join("") || `<p class="muted">Stock is healthy.</p>`}
        </div>
      </article>
      <article class="panel">
        <div class="panel-title"><h3>Launch readiness</h3><span class="status ok">92%</span></div>
        <div class="list">
          <div class="list-row"><span>GST profile</span><strong>Ready</strong></div>
          <div class="list-row"><span>Invoice format</span><strong>${state.settings.theme}</strong></div>
          <div class="list-row"><span>Backup</span><strong>${state.settings.autoBackup ? "On" : "Off"}</strong></div>
          <div class="list-row"><span>Staff roles</span><strong>${state.users.length} users</strong></div>
        </div>
      </article>
    </section>
  `;
}

function renderBilling() {
  const draft = state.invoiceDraft;
  const totals = invoiceTotal(draft);
  const paid = Number(draft.paidAmount || 0);
  const balance = Math.max(0, Math.round((totals.total - paid) * 100) / 100);
  const payStatus = paymentStatus(totals.total, paid);
  const partyOptions = [`<option value="Walk-in Customer">Walk-in Customer</option>`]
    .concat(state.parties.filter((p) => p.type === "Customer").map((p) => `<option value="${p.id}" ${draft.partyId === p.id ? "selected" : ""}>${p.name}</option>`))
    .join("");

  return `
    <section class="billing-stack">
        <article class="panel">
          <div class="panel-title">
            <div><span class="kicker">Counter sale</span><h2>Create GST invoice</h2></div>
            <button class="ghost-btn" type="button" data-add-line>Add item</button>
          </div>
          <div class="form-grid three">
            <div class="field"><label>Customer</label><select data-draft="partyId">${partyOptions}</select></div>
            <div class="field"><label>Payment mode</label><select data-draft="paymentMode"><option>UPI</option><option>Cash</option><option>Card</option><option>Bank Transfer</option><option>Credit</option></select></div>
            <div class="field"><label>Status</label><input value="${payStatus.label}" readonly /></div>
            <div class="field full">
              <label>GST calculation</label>
              <div class="segmented" role="group" aria-label="GST calculation mode">
                <button class="${draft.gstMode === "exclusive" ? "active" : ""}" type="button" data-gst-mode="exclusive">Exclusive GST <span>Tax added above item rate</span></button>
                <button class="${draft.gstMode === "inclusive" ? "active" : ""}" type="button" data-gst-mode="inclusive">Inclusive GST <span>Item rate already includes tax</span></button>
              </div>
            </div>
          </div>
          <div class="quick-add" style="margin-top:16px">
            <input id="quickAddItem" list="billingItemSuggest" placeholder="Quick add: type an item name and press Enter" autocomplete="off" />
            <button class="ghost-btn" type="button" data-quick-add>Add</button>
          </div>
          ${itemSuggestDatalist("billingItemSuggest")}
          <div class="invoice-lines" style="margin-top:16px">
            ${draft.lines.map((line, index) => `
              <div class="invoice-line">
                <div class="field"><label>Item</label><input class="item-search" list="inventoryItemList" data-line="${index}" data-prop="itemPick" value="${escapeHtml(itemLabel(line.itemId))}" placeholder="Search item by name" autocomplete="off" /></div>
                <div class="field"><label>Qty</label><input data-line="${index}" data-prop="qty" type="number" min="1" value="${line.qty}" /></div>
                <div class="field"><label>Discount</label>
                  <div class="input-combo">
                    <input data-line="${index}" data-prop="discount" type="number" min="0" step="0.01" value="${line.discount}" />
                    <div class="combo-toggle" role="group" aria-label="Discount type">
                      <button type="button" class="${(line.discountType || "percent") === "percent" ? "active" : ""}" data-line="${index}" data-prop="discountType" data-value="percent">%</button>
                      <button type="button" class="${line.discountType === "amount" ? "active" : ""}" data-line="${index}" data-prop="discountType" data-value="amount">₹</button>
                    </div>
                  </div>
                </div>
                <button class="icon-btn" type="button" data-remove-line="${index}" aria-label="Remove item">×</button>
              </div>
            `).join("")}
          </div>
          ${inventoryDatalist("inventoryItemList")}
          <div class="pay-box" style="margin-top:18px">
            <div class="pay-head">
              <span class="kicker">Payment</span>
              <div class="pay-chips">
                <button type="button" class="pay-chip" data-pay-quick="full">Mark full paid</button>
                <button type="button" class="pay-chip" data-pay-quick="half">Half</button>
                <button type="button" class="pay-chip" data-pay-quick="none">Unpaid</button>
              </div>
            </div>
            <div class="form-grid three">
              <div class="field"><label>Invoice total</label><input value="${money(totals.total)}" readonly /></div>
              <div class="field"><label>Amount received</label><input data-draft="paidAmount" type="number" min="0" step="0.01" value="${draft.paidAmount || 0}" /></div>
              <div class="field"><label>Balance due</label><input class="${balance > 0 ? "balance-due" : "balance-clear"}" value="${money(balance)}" readonly /></div>
            </div>
            <p class="pay-status ${payStatus.cls}">${payStatus.label}</p>
          </div>
          <div class="topbar-actions" style="margin-top:18px; justify-content:flex-start">
            <button class="primary-btn" type="button" data-create-invoice>Save invoice</button>
            <button class="ghost-btn" type="button" data-print>Print preview</button>
            <button class="ghost-btn" type="button" data-share-whatsapp>WhatsApp reminder</button>
          </div>
        </article>

        <div class="invoice-preview-wrap">
          <div class="preview-toolbar no-print">
            <div><span class="kicker">Live preview</span><strong>Invoice document</strong></div>
            <button class="primary-btn" type="button" data-print>Print / Save PDF</button>
          </div>
          <div class="invoice-preview">
            ${renderInvoiceDocument(draft, totals, { number: `${state.business.invoicePrefix}-${1045 + state.invoices.length}`, date: today(), party: byId(state.parties, draft.partyId) })}
          </div>
          <p class="muted no-print" style="text-align:center;margin-top:12px">Includes automated GST, stock deduction, payment status, and accounting entries when saved.</p>
        </div>

        <article class="panel">
          <div class="panel-title"><h3>Recent invoices</h3><span class="muted">${state.invoices.length} records</span></div>
          ${invoiceTable(state.invoices)}
        </article>
    </section>
  `;
}

// Renders the printable invoice document in the SL / Description / Price / Qty / Total format with a payment QR.
function renderInvoiceDocument(draft, totals, meta) {
  const biz = state.business;
  const party = meta.party;
  const docPaid = Math.min(Math.max(Number(draft.paidAmount || 0), 0), totals.total);
  const docPay = { paid: docPaid, balance: Math.max(0, Math.round((totals.total - docPaid) * 100) / 100) };
  const rows = draft.lines
    .map((line, index) => {
      const item = byId(state.items, line.itemId);
      const row = itemTotal(line);
      return `<tr>
        <td class="doc-sl">${index + 1}</td>
        <td class="doc-desc"><strong>${escapeHtml(item?.name || "Item")}</strong>${item?.hsn ? `<span>HSN ${escapeHtml(item.hsn)} • GST ${item?.gst || 0}%</span>` : ""}</td>
        <td class="doc-num">${money(item?.sale)}</td>
        <td class="doc-num">${line.qty}</td>
        <td class="doc-num">${money(row.total)}</td>
      </tr>`;
    })
    .join("");
  const partyBlock = party
    ? `<strong>${escapeHtml(party.name)}</strong>${party.phone ? `<span>${escapeHtml(party.phone)}</span>` : ""}${party.type ? `<span>${escapeHtml(party.type)}</span>` : ""}`
    : `<strong>Walk-in customer</strong><span>Add a party to personalise this bill</span>`;
  return `
    <div class="invoice-doc" id="invoiceDoc">
      <header class="doc-head">
        <div class="doc-brand">
          <div class="doc-logo">${escapeHtml((biz.name || "V").slice(0, 1).toUpperCase())}</div>
          <div class="doc-brand-text">
            <strong>${escapeHtml(biz.name || "Your Business")}</strong>
            <span>${escapeHtml(biz.tagline || "GST Billing & Distribution")}</span>
          </div>
        </div>
        <div class="doc-title">
          <h2>INVOICE</h2>
          <div class="doc-meta"><span>Invoice #: <strong>${escapeHtml(meta.number)}</strong></span><span>Date: <strong>${escapeHtml(formatDate(meta.date))}</strong></span></div>
        </div>
      </header>

      <section class="doc-billto">
        <span class="doc-label">Invoice To</span>
        <div class="doc-party">${partyBlock}</div>
      </section>

      <table class="doc-table">
        <colgroup>
          <col class="col-sl" />
          <col class="col-desc" />
          <col class="col-price" />
          <col class="col-qty" />
          <col class="col-total" />
        </colgroup>
        <thead>
          <tr><th class="doc-sl">SL.</th><th class="doc-desc">Item Description</th><th class="doc-num">Price</th><th class="doc-num">Qty.</th><th class="doc-num">Total</th></tr>
        </thead>
        <tbody>${rows || `<tr><td colspan="5" class="doc-empty">Add items to build the invoice</td></tr>`}</tbody>
      </table>

      <section class="doc-footer">
        <div class="doc-payment">
          <span class="doc-label">Payment Info</span>
          <div class="doc-pay-row"><span>Bank</span><strong>${escapeHtml(biz.bankName || "-")}</strong></div>
          <div class="doc-pay-row"><span>A/C No</span><strong>${escapeHtml(biz.accountNo || "-")}</strong></div>
          <div class="doc-pay-row"><span>A/C Name</span><strong>${escapeHtml(biz.accountName || biz.name || "-")}</strong></div>
          <div class="doc-pay-row"><span>IFSC</span><strong>${escapeHtml(biz.ifsc || "-")}</strong></div>
          <div class="doc-qr">
            <canvas id="invoiceQr" width="112" height="112" aria-label="Scan to pay via UPI"></canvas>
            <span>Scan to pay${biz.upiId ? ` • ${escapeHtml(biz.upiId)}` : ""}</span>
          </div>
        </div>
        <div class="doc-totals">
          <div class="doc-total-row"><span>Sub Total</span><strong>${money(totals.subtotal)}</strong></div>
          <div class="doc-total-row"><span>Discount</span><strong>- ${money(totals.discount)}</strong></div>
          <div class="doc-total-row"><span>Taxable</span><strong>${money(totals.taxable)}</strong></div>
          <div class="doc-total-row"><span>Tax (GST ${draft.gstMode})</span><strong>${money(totals.tax)}</strong></div>
          <div class="doc-total-row grand"><span>TOTAL</span><strong>${money(totals.total)}</strong></div>
          <div class="doc-total-row"><span>Paid</span><strong>${money(docPay.paid)}</strong></div>
          <div class="doc-total-row ${docPay.balance > 0 ? "due" : ""}"><span>Balance Due</span><strong>${money(docPay.balance)}</strong></div>
        </div>
      </section>
    </div>`;
}

function invoiceTable(invoices) {
  return `
    <div class="table-wrap">
      <table>
        <thead><tr><th>Invoice</th><th>Party</th><th>Date</th><th>Payment</th><th>Total</th><th>Paid</th><th>Balance</th><th>Status</th><th>Action</th></tr></thead>
        <tbody>
          ${invoices.map((invoice) => {
            const party = byId(state.parties, invoice.partyId);
            const pay = invoicePayment(invoice);
            const st = paymentStatus(pay.total, pay.paid);
            return `
              <tr>
                <td><strong>${invoice.id}</strong></td>
                <td>${party?.name || invoice.partyId}</td>
                <td>${invoice.date}</td>
                <td>${invoice.paymentMode}</td>
                <td><strong>${money(pay.total)}</strong></td>
                <td>${money(pay.paid)}</td>
                <td><strong class="${pay.balance > 0 ? "amount-due" : ""}">${money(pay.balance)}</strong></td>
                <td><span class="status ${st.cls === "ok" ? "ok" : st.cls === "low" ? "low" : "danger"}">${st.label}</span></td>
                <td>${pay.balance > 0 ? `<button class="ghost-btn" type="button" data-collect="${invoice.id}">Record payment</button>` : `<span class="muted">Settled</span>`}</td>
              </tr>`;
          }).join("")}
        </tbody>
      </table>
    </div>
  `;
}

function renderInventory() {
  const lowStock = state.items.filter((item) => item.stock <= item.minStock).length;
  const expiring = state.items.filter((item) => item.expiry && new Date(item.expiry) < new Date("2026-09-30")).length;
  return `
    <section class="section-stack">
      <div class="metric-grid">
        ${metric("Items", state.items.length, "Products and services")}
        ${metric("Stock value", money(purchaseValue()), "At purchase cost")}
        ${metric("Low stock", lowStock, "Needs reorder")}
        ${metric("Expiry alerts", expiring, "Before Sep 2026")}
      </div>

      <article class="panel">
        <div class="panel-title"><div><span class="kicker">Stock master</span><h2>Add item, barcode, GST and batch</h2></div><span class="muted">Type a name you have used before to auto-fill</span></div>
        ${suggestionChips("itemForm")}
        <form id="itemForm" class="form-grid three">
          <div class="field"><label>Name</label><input name="name" list="itemNameSuggest" required placeholder="Start typing, e.g. Premium Rice 25kg" autocomplete="off" /></div>
          <div class="field"><label>HSN</label><input name="hsn" list="hsnSuggest" required placeholder="HSN code" /></div>
          <div class="field"><label>Category</label><input name="category" list="categorySuggest" required placeholder="Category" /></div>
          <div class="field"><label>Stock</label><input name="stock" type="number" min="0" required /></div>
          <div class="field"><label>Min stock</label><input name="minStock" type="number" min="0" required /></div>
          <div class="field"><label>Unit</label><input name="unit" list="unitSuggest" value="pcs" required /></div>
          <div class="field"><label>Purchase price</label><input name="purchase" type="number" min="0" required /></div>
          <div class="field"><label>Sale price</label><input name="sale" type="number" min="0" required /></div>
          <div class="field"><label>GST %</label><input name="gst" type="number" min="0" required /></div>
          <div class="field"><label>Batch</label><input name="batch" placeholder="Optional" /></div>
          <div class="field"><label>Expiry</label><input name="expiry" type="date" /></div>
          <div class="field"><label>&nbsp;</label><button class="primary-btn" type="submit">Add item</button></div>
        </form>
        ${itemSuggestDatalist("itemNameSuggest")}
        <datalist id="categorySuggest">${optionList(uniqueValues(state.ai.memory.itemSuggestions, "category"))}</datalist>
        <datalist id="hsnSuggest">${optionList(uniqueValues(state.ai.memory.itemSuggestions, "hsn"))}</datalist>
        <datalist id="unitSuggest">${optionList(uniqueValues(state.ai.memory.itemSuggestions, "unit").concat(["pcs", "bag", "bottle", "pkt", "box", "kg", "litre"]).filter((v, i, a) => a.indexOf(v) === i))}</datalist>
      </article>

      <article class="panel">
        <div class="panel-title"><h3>Inventory register</h3><button class="ghost-btn" type="button" data-bulk-price>Bulk +5% price</button></div>
        <div class="table-wrap">
          <table>
            <thead><tr><th>Item</th><th>Barcode</th><th>Stock</th><th>Buy/Sell</th><th>GST</th><th>Batch</th><th>Expiry</th><th>Adjust</th></tr></thead>
            <tbody>
              ${state.items.map((item) => `
                <tr>
                  <td><strong>${item.name}</strong><div class="table-sub">${item.category} • HSN ${item.hsn}</div></td>
                  <td>${barcodeFor(item.id)}</td>
                  <td><span class="status ${item.stock <= item.minStock ? "low" : "ok"}">${item.stock} ${item.unit}</span></td>
                  <td>${money(item.purchase)} / <strong>${money(item.sale)}</strong></td>
                  <td>${item.gst}%</td>
                  <td>${item.batch || "—"}</td>
                  <td>${item.expiry || "—"}</td>
                  <td><button class="ghost-btn" data-stock="${item.id}" data-delta="5" type="button">+5</button> <button class="ghost-btn" data-stock="${item.id}" data-delta="-1" type="button">-1</button></td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      </article>
    </section>
  `;
}

function renderParties() {
  const receivable = state.parties.filter((p) => p.balance > 0).reduce((sum, p) => sum + p.balance, 0);
  const payable = Math.abs(state.parties.filter((p) => p.balance < 0).reduce((sum, p) => sum + p.balance, 0));
  return `
    <section class="section-stack">
      <div class="metric-grid">
        ${metric("Customers/Suppliers", state.parties.length, "Active parties")}
        ${metric("Receivable", money(receivable), "Customer dues")}
        ${metric("Payable", money(payable), "Supplier dues")}
        ${metric("Reminders", state.parties.filter((p) => p.balance > 0).length, "WhatsApp ready")}
      </div>
      <article class="panel">
        <div class="panel-title"><h2>Party management</h2><span class="muted">Customers, suppliers, terms and balances</span></div>
        <form id="partyForm" class="form-grid three">
          <div class="field"><label>Name</label><input name="name" list="partyNameSuggest" required autocomplete="off" placeholder="Start typing a saved party" /></div>
          <div class="field"><label>Type</label><select name="type"><option>Customer</option><option>Supplier</option></select></div>
          <div class="field"><label>Phone</label><input name="phone" required /></div>
          <div class="field"><label>Opening balance</label><input name="balance" type="number" value="0" /></div>
          <div class="field"><label>Credit days</label><input name="terms" type="number" value="7" /></div>
          <div class="field"><label>&nbsp;</label><button class="primary-btn" type="submit">Add party</button></div>
        </form>
        ${partySuggestDatalist("partyNameSuggest")}
      </article>
      <article class="panel">
        <div class="table-wrap">
          <table>
            <thead><tr><th>Party</th><th>Type</th><th>Phone</th><th>Terms</th><th>Balance</th><th>Operation</th></tr></thead>
            <tbody>
              ${state.parties.map((party) => `
                <tr>
                  <td><strong>${party.name}</strong><div class="table-sub">${party.id}</div></td>
                  <td>${party.type}</td>
                  <td>${party.phone}</td>
                  <td>${party.terms} days</td>
                  <td><strong class="${party.balance > 0 ? "amount-due" : ""}">${money(Math.abs(party.balance))}</strong><div class="table-sub">${party.balance >= 0 ? "Receivable" : "Payable"}</div></td>
                  <td><button class="ghost-btn" type="button" data-remind="${party.id}">Send reminder</button></td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      </article>
      ${renderCustomerAccounts()}
    </section>
  `;
}

// Customer-wise account cards: total billed, received and outstanding balance with an invoice statement.
function renderCustomerAccounts() {
  const customers = state.parties.filter((p) => p.type === "Customer");
  const active = state.customerAccountId || customers[0]?.id;
  const selected = customers.find((c) => c.id === active) || customers[0];
  if (!customers.length) return "";
  const rows = customers
    .map((party) => {
      const invoices = state.invoices.filter((inv) => inv.partyId === party.id);
      const acc = invoices.reduce((a, inv) => { const p = invoicePayment(inv); a.total += p.total; a.paid += p.paid; a.balance += p.balance; return a; }, { total: 0, paid: 0, balance: 0 });
      return { party, invoices, acc };
    })
    .sort((a, b) => b.acc.balance - a.acc.balance);
  const statement = selected ? rows.find((r) => r.party.id === selected.id) : null;
  return `
    <article class="panel">
      <div class="panel-title"><div><span class="kicker">Customer accounts</span><h2>Balances & statements</h2></div><span class="muted">Tap a customer to view their ledger</span></div>
      <div class="account-layout">
        <div class="account-list">
          ${rows.map((row) => `
            <button type="button" class="account-item ${selected && row.party.id === selected.id ? "active" : ""}" data-customer-account="${row.party.id}">
              <span class="account-name">${escapeHtml(row.party.name)}<small>${row.invoices.length} invoice${row.invoices.length === 1 ? "" : "s"}</small></span>
              <span class="account-bal ${row.acc.balance > 0 ? "amount-due" : "amount-clear"}">${money(row.acc.balance)}<small>${row.acc.balance > 0 ? "due" : "settled"}</small></span>
            </button>
          `).join("")}
        </div>
        <div class="account-detail">
          ${statement ? `
            <div class="account-summary">
              <div><span>Total billed</span><strong>${money(statement.acc.total)}</strong></div>
              <div><span>Received</span><strong>${money(statement.acc.paid)}</strong></div>
              <div><span>Outstanding</span><strong class="${statement.acc.balance > 0 ? "amount-due" : "amount-clear"}">${money(statement.acc.balance)}</strong></div>
            </div>
            <div class="table-wrap">
              <table>
                <thead><tr><th>Invoice</th><th>Date</th><th>Total</th><th>Paid</th><th>Balance</th><th>Status</th></tr></thead>
                <tbody>
                  ${statement.invoices.length ? statement.invoices.map((inv) => {
                    const p = invoicePayment(inv);
                    const st = paymentStatus(p.total, p.paid);
                    return `<tr>
                      <td><strong>${inv.id}</strong></td>
                      <td>${inv.date}</td>
                      <td>${money(p.total)}</td>
                      <td>${money(p.paid)}</td>
                      <td><strong class="${p.balance > 0 ? "amount-due" : ""}">${money(p.balance)}</strong></td>
                      <td><span class="status ${st.cls === "ok" ? "ok" : st.cls === "low" ? "low" : "danger"}">${st.label}</span></td>
                    </tr>`;
                  }).join("") : `<tr><td colspan="6" class="doc-empty">No invoices yet for this customer.</td></tr>`}
                </tbody>
              </table>
            </div>
          ` : `<p class="muted">Select a customer to see their statement.</p>`}
        </div>
      </div>
    </article>
  `;
}

function renderAccounting() {
  const gstOut = state.invoices.reduce((sum, invoice) => sum + invoiceTotal(invoice).tax, 0);
  const purchaseGst = state.purchases.reduce((sum, purchase) => {
    return sum + purchase.lines.reduce((lineSum, line) => {
      const gross = Number(line.price || 0) * Number(line.qty || 0);
      const gst = Number(line.gst || 0);
      return lineSum + ((purchase.gstMode || line.gstMode) === "inclusive" ? gross - gross / (1 + gst / 100) : gross * (gst / 100));
    }, 0);
  }, 0);
  const gstIn = purchaseGst + state.expenses.reduce((sum, expense) => sum + Number(expense.amount) * (Number(expense.gst) / 100), 0);
  const profit = state.invoices.reduce((sum, invoice) => sum + invoiceTotal(invoice).profit, 0) - expenseTotal();
  return `
    <section class="section-stack">
      <div class="metric-grid">
        ${metric("Income", money(salesTotal()), "From invoices")}
        ${metric("Expenses", money(expenseTotal()), "Recorded costs")}
        ${metric("GST payable", money(Math.max(gstOut - gstIn, 0)), "Output minus input")}
        ${metric("Profit/Loss", money(profit), "Real-time P&L")}
      </div>
      <section class="two-col">
        <article class="panel">
          <div class="panel-title"><h2>Record expense</h2><span class="muted">Transport, rent, staff, purchase charges</span></div>
          <form id="expenseForm" class="form-grid">
            <div class="field"><label>Category</label><input name="category" required /></div>
            <div class="field"><label>Amount</label><input name="amount" type="number" min="0" required /></div>
            <div class="field"><label>GST %</label><input name="gst" type="number" min="0" value="0" /></div>
            <div class="field"><label>Date</label><input name="date" type="date" value="${today()}" /></div>
            <div class="field full"><label>Note</label><textarea name="note" rows="3"></textarea></div>
            <div class="field full"><button class="primary-btn" type="submit">Save expense</button></div>
          </form>
        </article>
        <article class="panel">
          <div class="panel-title"><h2>Journal entry</h2><span class="muted">Audit-ready books</span></div>
          <form id="journalForm" class="form-grid">
            <div class="field"><label>Debit</label><input name="debit" required /></div>
            <div class="field"><label>Credit</label><input name="credit" required /></div>
            <div class="field"><label>Amount</label><input name="amount" type="number" min="0" required /></div>
            <div class="field"><label>Date</label><input name="date" type="date" value="${today()}" /></div>
            <div class="field full"><label>Note</label><textarea name="note" rows="3"></textarea></div>
            <div class="field full"><button class="primary-btn" type="submit">Post journal</button></div>
          </form>
        </article>
      </section>
      <section class="two-col">
        <article class="panel"><div class="panel-title"><h3>Expenses</h3></div>${expenseTable()}</article>
        <article class="panel"><div class="panel-title"><h3>Journal book</h3></div>${journalTable()}</article>
      </section>
      <article class="panel"><div class="panel-title"><h3>Purchase invoices</h3><span class="muted">${state.purchases.length} records</span></div>${purchaseTable()}</article>
    </section>
  `;
}

function expenseTable() {
  return `<div class="table-wrap"><table><thead><tr><th>Date</th><th>Category</th><th>GST</th><th>Amount</th></tr></thead><tbody>${state.expenses.map((expense) => `<tr><td>${expense.date}</td><td><strong>${expense.category}</strong><div class="table-sub">${expense.note}</div></td><td>${expense.gst}%</td><td>${money(expense.amount)}</td></tr>`).join("")}</tbody></table></div>`;
}

function journalTable() {
  return `<div class="table-wrap"><table><thead><tr><th>Date</th><th>Debit</th><th>Credit</th><th>Amount</th></tr></thead><tbody>${state.journals.map((row) => `<tr><td>${row.date}</td><td>${row.debit}</td><td>${row.credit}</td><td>${money(row.amount)}</td></tr>`).join("")}</tbody></table></div>`;
}

function purchaseTable() {
  return `<div class="table-wrap"><table><thead><tr><th>Purchase</th><th>Supplier</th><th>Date</th><th>GST</th><th>Items</th><th>Total</th></tr></thead><tbody>${state.purchases.map((purchase) => `<tr><td><strong>${purchase.id}</strong></td><td>${escapeHtml(purchase.supplier)}</td><td>${purchase.date}</td><td><span class="status pending">${purchase.gstMode || "exclusive"}</span></td><td>${purchase.lines.map((line) => `${escapeHtml(byId(state.items, line.itemId)?.name || line.itemId)} x${line.qty}`).join("<br>")}</td><td><strong>${money(purchaseTotal(purchase))}</strong></td></tr>`).join("")}</tbody></table></div>`;
}

function renderReports() {
  const taxable = state.invoices.reduce((sum, invoice) => sum + invoiceTotal(invoice).taxable, 0);
  const gst = state.invoices.reduce((sum, invoice) => sum + invoiceTotal(invoice).tax, 0);
  const profit = state.invoices.reduce((sum, invoice) => sum + invoiceTotal(invoice).profit, 0);
  const stockMoving = [...state.items].sort((a, b) => a.stock - b.stock).slice(0, 5);
  return `
    <section class="section-stack">
      <div class="metric-grid">
        ${metric("GSTR-1 taxable", money(taxable), "Sales taxable amount")}
        ${metric("GSTR tax", money(gst), "CGST/SGST/IGST summary")}
        ${metric("Bill-wise profit", money(profit), "Before expenses")}
        ${metric("Audit exports", "PDF / Excel", "Browser-ready CSV")}
      </div>
      <section class="two-col">
        <article class="panel">
          <div class="panel-title"><h2>GST report</h2><button class="ghost-btn" type="button" data-download-report="gst">Download CSV</button></div>
          ${invoiceTable(state.invoices)}
        </article>
        <aside class="panel">
          <div class="panel-title"><h3>Stock movement</h3></div>
          <div class="list">
            ${stockMoving.map((item) => `<div class="list-row"><div><strong>${item.name}</strong><div class="table-sub">Min ${item.minStock} • ${item.category}</div></div><span class="status ${item.stock <= item.minStock ? "low" : "ok"}">${item.stock}</span></div>`).join("")}
          </div>
          <hr />
          <h3>Sales ageing</h3>
          <div class="list">
            ${state.invoices.filter((i) => i.status !== "Paid").map((invoice) => `<div class="list-row"><span>${invoice.id}</span><strong>${money(invoiceTotal(invoice).total)}</strong></div>`).join("") || `<p class="muted">No overdue balance.</p>`}
          </div>
        </aside>
      </section>
    </section>
  `;
}

function renderOcr() {
  return `
    <section class="two-col">
      <article class="panel">
        <div class="panel-title"><div><span class="kicker">Purchase automation</span><h2>Scan bill to purchase entry</h2></div></div>
        <p class="muted">Upload a bill image/PDF. This launch build simulates OCR extraction so the workflow can be demoed without server processing.</p>
        <form id="ocrForm" class="form-grid">
          <div class="field full"><label>Supplier bill</label><input name="file" type="file" accept="image/*,.pdf" /></div>
          <div class="field"><label>Supplier</label><input name="supplier" value="FreshMart Supply" /></div>
          <div class="field"><label>Detected GSTIN</label><input name="gstin" value="29ABCDE1234F1Z5" /></div>
          <div class="field"><label>Taxable amount</label><input name="amount" type="number" value="4820" /></div>
          <div class="field"><label>GST %</label><input name="gst" type="number" value="5" /></div>
          <div class="field full"><label>Extracted items</label><textarea name="items" rows="4">Sunflower Oil 1L x 24, Masala Mix 500g x 15</textarea></div>
          <div class="field full"><button class="primary-btn" type="submit">Save scanned purchase</button></div>
        </form>
      </article>
      <aside class="panel">
        <div class="panel-title"><h3>OCR operations</h3><span class="status ok">Ready</span></div>
        <div class="list">
          <div class="list-row"><span>Auto-scan bills and receipts</span><strong>On</strong></div>
          <div class="list-row"><span>GSTIN / HSN / tax extraction</span><strong>On</strong></div>
          <div class="list-row"><span>One-tap purchase entry</span><strong>On</strong></div>
          <div class="list-row"><span>Document attachment</span><strong>On</strong></div>
          <div class="list-row"><span>Supported uploads</span><strong>JPG, PNG, PDF</strong></div>
        </div>
      </aside>
    </section>
  `;
}

function renderStore() {
  return `
    <section class="section-stack">
      <article class="panel">
        <div class="panel-title">
          <div><span class="kicker">Digital selling</span><h2>Online store and WhatsApp marketing</h2></div>
          <button class="primary-btn" type="button" data-copy-store>Copy store link</button>
        </div>
        <div class="store-grid">
          ${state.items.slice(0, 6).map((item) => `
            <article class="store-item">
              <div class="store-art">${item.name.slice(0, 1)}</div>
              <div><strong>${item.name}</strong><div class="table-sub">${item.stock} ${item.unit} available</div><p><strong>${money(item.sale)}</strong></p><button class="ghost-btn" data-promote="${item.id}" type="button">Create WhatsApp offer</button></div>
            </article>
          `).join("")}
        </div>
      </article>
      <section class="two-col">
        <article class="panel">
          <div class="panel-title"><h3>Online orders</h3><button class="ghost-btn" data-convert-order type="button">Convert first order</button></div>
          <div class="list">
            ${state.orders.map((order) => `<div class="list-row"><div><strong>${order.id}</strong><div class="table-sub">${order.customer} • ${order.channel}</div></div><span class="status ${statusClass(order.status)}">${order.status}</span><strong>${money(order.amount)}</strong></div>`).join("")}
          </div>
        </article>
        <article class="panel">
          <div class="panel-title"><h3>Smart ads</h3><span class="muted">Message generator</span></div>
          <p class="muted">Today’s campaign: “Fresh stock available with GST bill, UPI payment, and same-day delivery. Reply ORDER to book.”</p>
          <button class="primary-btn" type="button" data-broadcast>Send campaign</button>
        </article>
      </section>
    </section>
  `;
}

function renderAI() {
  const sampleRows = `sale,Ankit Retail,Premium Rice 25kg,2,,Paid,UPI,inclusive
sale,Kumar Stores,LED Bulb 12W,8,,Pending,Credit,exclusive
purchase,FreshMart Supply,Sunflower Oil 1L,24,112,Paid,Bank Transfer,exclusive
purchase,Metro Wholesale,Masala Mix 500g,30,74,Pending,Credit,inclusive`;
  const learned = state.ai.memory.learned.slice(-5);
  return `
    <section class="ai-layout">
      <article class="ai-hero panel">
        <div>
          <span class="kicker">Self-learning operations assistant</span>
          <h2>Tell Vyapaari what happened. The app will post it.</h2>
          <p class="muted">Create sales, purchases, items, reminders and bulk uploads from plain language or pasted rows. Learned aliases stay in this browser backup.</p>
        </div>
        <div class="ai-command-strip">
          <button class="ghost-btn" type="button" data-ai-example="sale Ankit Retail Premium Rice 25kg x2 paid upi inclusive">Sale invoice</button>
          <button class="ghost-btn" type="button" data-ai-example="purchase FreshMart Supply Sunflower Oil 1L x24 @112 gst 5 exclusive">Purchase invoice</button>
          <button class="ghost-btn" type="button" data-ai-example="remember item chawal = Premium Rice 25kg">Teach alias</button>
        </div>
      </article>

      <section class="two-col ai-main">
        <article class="panel chat-panel">
          <div class="panel-title"><h3>AI Chat</h3><span class="status ok">Local learning on</span></div>
          <div class="chat-log" id="chatLog">
            ${state.ai.messages.map((message) => `<div class="chat-bubble ${message.role}"><span>${message.role === "assistant" ? "Vyapaari AI" : "You"}</span><p>${escapeHtml(message.text)}</p></div>`).join("")}
          </div>
          <form id="aiChatForm" class="ai-input">
            <textarea name="prompt" rows="3" placeholder="Example: sale Kumar Stores Notebook A4 x30 pending credit exclusive"></textarea>
            <button class="primary-btn" type="submit">Run action</button>
          </form>
        </article>

        <aside class="panel">
          <div class="panel-title"><h3>What AI can do</h3><button class="ghost-btn" type="button" data-go="billing">Open billing</button></div>
          <div class="list">
            <div class="list-row"><span>Create sales invoice</span><strong>Stock - GST - ledger</strong></div>
            <div class="list-row"><span>Create purchase invoice</span><strong>Stock + supplier balance</strong></div>
            <div class="list-row"><span>Bulk sales upload</span><strong>CSV / paste rows</strong></div>
            <div class="list-row"><span>Bulk purchase upload</span><strong>Supplier invoices</strong></div>
            <div class="list-row"><span>Learn aliases</span><strong>${Object.keys(state.ai.memory.itemAliases).length + Object.keys(state.ai.memory.partyAliases).length} saved</strong></div>
          </div>
          <div class="learned-box">
            <strong>Recent learning</strong>
            ${learned.length ? learned.map((entry) => `<p>${escapeHtml(entry)}</p>`).join("") : `<p class="muted">No custom training yet.</p>`}
          </div>
        </aside>
      </section>

      <article class="panel">
        <div class="panel-title">
          <div><span class="kicker">Bulk upload</span><h3>Paste sales and purchase rows</h3></div>
          <label class="ghost-btn">Upload CSV <input id="aiBulkFile" type="file" accept=".csv,.txt" hidden /></label>
        </div>
        <textarea id="aiBulkText" class="bulk-box" rows="8">${sampleRows}</textarea>
        <div class="topbar-actions" style="justify-content:flex-start; margin-top:12px">
          <button class="primary-btn" type="button" data-run-bulk>Process bulk rows</button>
          <button class="ghost-btn" type="button" data-clear-ai>Clear chat</button>
        </div>
      </article>
    </section>
  `;
}

function renderSettings() {
  return `
    <section class="section-stack">
      <section class="two-col">
        <article class="panel">
          <div class="panel-title"><h2>Business profile</h2><span class="muted">Shown on invoices</span></div>
          <form id="businessForm" class="form-grid">
            <div class="field"><label>Business name</label><input name="name" value="${state.business.name}" /></div>
            <div class="field"><label>GSTIN</label><input name="gstin" value="${state.business.gstin}" /></div>
            <div class="field"><label>Phone</label><input name="phone" value="${state.business.phone}" /></div>
            <div class="field"><label>Invoice prefix</label><input name="invoicePrefix" value="${state.business.invoicePrefix}" /></div>
            <div class="field full"><label>Address</label><textarea name="address" rows="3">${state.business.address}</textarea></div>
            <div class="field full"><button class="primary-btn" type="submit">Save profile</button></div>
          </form>
        </article>
        <article class="panel">
          <div class="panel-title"><h2>Launch controls</h2><span class="status ok">Market-ready</span></div>
          <div class="list">
            ${settingRow("GST e-invoice", "eInvoice")}
            ${settingRow("E-way bill", "eWayBill")}
            ${settingRow("WhatsApp reminders", "whatsapp")}
            ${settingRow("Auto-backup reminder", "autoBackup")}
            ${settingRow("Offline billing", "offlineMode")}
          </div>
        </article>
      </section>

      ${renderBackupPanel()}
      ${renderUsersPanel()}
    </section>
  `;
}

function settingRow(label, key) {
  return `<div class="list-row"><span>${label}</span><button class="ghost-btn" type="button" data-setting="${key}">${state.settings[key] ? "On" : "Off"}</button></div>`;
}

function renderBackupPanel() {
  const last = state.settings.lastBackupAt ? new Date(state.settings.lastBackupAt).toLocaleString("en-IN") : "Never";
  const hasClientId = Boolean(String(state.settings.googleClientId || "").trim());
  return `
    <section class="two-col">
      <article class="panel">
        <div class="panel-title"><div><span class="kicker">Data safety</span><h2>Backup &amp; restore</h2></div><span class="muted">Last backup: ${last}</span></div>
        <p class="muted">Your business data lives on this device. Export a backup regularly and keep it somewhere safe such as Google Drive.</p>
        <div class="backup-grid">
          <button class="ghost-btn" type="button" data-export-json>Download backup (JSON)</button>
          <label class="ghost-btn file-btn">Restore JSON<input id="importJson" type="file" accept="application/json" hidden /></label>
          <button class="primary-btn" type="button" data-export-enc>Encrypted backup</button>
          <label class="ghost-btn file-btn">Restore encrypted<input id="importEnc" type="file" accept=".vyp,application/octet-stream,application/json" hidden /></label>
        </div>
      </article>
      <article class="panel">
        <div class="panel-title"><div><span class="kicker">Optional</span><h2>Google Drive backup</h2></div><span class="status ${hasClientId ? "ok" : "pending"}">${hasClientId ? "Configured" : "Not set"}</span></div>
        <p class="muted">Connect a Google account to save and restore backups from your private Drive app folder. Paste a Google OAuth Client ID (from Google Cloud Console) authorized for this site's URL.</p>
        <form id="googleForm" class="form-grid">
          <div class="field full"><label>Google OAuth Client ID</label><input name="googleClientId" value="${escapeHtml(state.settings.googleClientId || "")}" placeholder="xxxx.apps.googleusercontent.com" /></div>
          <div class="field full"><button class="ghost-btn" type="submit">Save Client ID</button></div>
        </form>
        <div class="backup-grid">
          <button class="primary-btn" type="button" data-google-backup ${hasClientId ? "" : "disabled"}>Connect &amp; back up</button>
          <button class="ghost-btn" type="button" data-google-restore ${hasClientId ? "" : "disabled"}>Restore from Drive</button>
        </div>
      </article>
    </section>`;
}

function renderUsersPanel() {
  const isAdmin = accessFor(sessionUser?.role).canManageUsers;
  const rows = state.users
    .map((user) => {
      const you = user.id === sessionUser?.id;
      const controls = isAdmin && !you
        ? `<button class="ghost-btn" type="button" data-toggle-user="${user.id}">${user.active ? "Disable" : "Enable"}</button>
           <button class="ghost-btn" type="button" data-reset-user="${user.id}">Reset password</button>
           <button class="danger-btn" type="button" data-remove-user="${user.id}">Remove</button>`
        : you ? `<span class="muted">Signed in</span>` : `<span class="muted">—</span>`;
      return `<tr>
        <td><strong>${escapeHtml(user.name)}</strong>${user.pinHash ? "" : ` <span class="status pending">No password</span>`}</td>
        <td>${escapeHtml(user.role)}</td>
        <td>${escapeHtml(accessFor(user.role).label)}</td>
        <td>${user.active ? `<span class="status ok">Active</span>` : `<span class="status danger">Disabled</span>`}</td>
        <td class="row-actions">${controls}</td>
      </tr>`;
    })
    .join("");
  const addForm = isAdmin
    ? `<form id="addUserForm" class="form-grid three">
        <div class="field"><label>Staff name</label><input name="name" required placeholder="e.g. Priya" /></div>
        <div class="field"><label>Role</label><select name="role">${ROLE_LIST.map((role) => `<option value="${role}">${role}</option>`).join("")}</select></div>
        <div class="field"><label>Password</label><input name="pin" type="password" minlength="4" required placeholder="Set a login password" /></div>
        <div class="field"><label>&nbsp;</label><button class="primary-btn" type="submit">Add staff login</button></div>
      </form>`
    : `<p class="muted">Only an Admin can add or manage staff logins.</p>`;
  return `
    <article class="panel">
      <div class="panel-title"><div><span class="kicker">Team</span><h2>Logins &amp; role-based access</h2></div><span class="muted">${state.users.filter((u) => u.active).length} active</span></div>
      ${addForm}
      <div class="table-wrap" style="margin-top:16px"><table><thead><tr><th>User</th><th>Role</th><th>Access</th><th>Status</th><th>Manage</th></tr></thead><tbody>${rows}</tbody></table></div>
    </article>`;
}

const renderers = {
  dashboard: ["Today", "Business Dashboard", renderDashboard],
  billing: ["GST invoice, POS, payments", "Billing & POS", renderBilling],
  ai: ["Chat, learn, bulk upload", "AI Assistant", renderAI],
  inventory: ["Stock, barcode, batches", "Inventory", renderInventory],
  parties: ["Customers, suppliers, dues", "Parties", renderParties],
  accounting: ["Expenses, journals, GST", "Accounting", renderAccounting],
  reports: ["GSTR, profit, stock", "Reports", renderReports],
  ocr: ["Scan purchase bills", "OCR Scan", renderOcr],
  store: ["Orders, ads, WhatsApp", "Online Store", renderStore],
  settings: ["Profile, roles, launch", "Launch Settings", renderSettings],
};

function render() {
  const [kicker, title, renderer] = renderers[state.view] || renderers.dashboard;
  renderNav();
  viewKicker.textContent = kicker;
  viewTitle.textContent = title;
  primaryAction.textContent = state.view === "billing" ? "Save invoice" : "Create invoice";
  app.innerHTML = renderer();
  attachViewHandlers();
  if (state.view === "billing") {
    const totals = invoiceTotal(state.invoiceDraft);
    renderInvoiceQr(totals.total);
  }
}

function attachViewHandlers() {
  document.querySelectorAll("[data-go]").forEach((button) => {
    button.addEventListener("click", () => setView(button.dataset.go));
  });

  document.querySelectorAll("[data-draft]").forEach((field) => {
    field.value = state.invoiceDraft[field.dataset.draft];
    field.addEventListener("change", () => {
      state.invoiceDraft[field.dataset.draft] = field.value;
      saveState();
      render();
    });
  });

  document.querySelectorAll("input[data-line], select[data-line]").forEach((field) => {
    if (field.dataset.prop === "itemPick") {
      // Searchable item picker: resolve the typed/selected label to an item id on change.
      field.addEventListener("change", () => {
        const index = Number(field.dataset.line);
        const item = resolveItemPick(field.value);
        if (!item) { showToast("No matching item. Pick one from the list."); field.value = itemLabel(state.invoiceDraft.lines[index].itemId); return; }
        state.invoiceDraft.lines[index].itemId = item.id;
        saveState();
        render();
      });
      return;
    }
    field.addEventListener("input", () => {
      const index = Number(field.dataset.line);
      const prop = field.dataset.prop;
      state.invoiceDraft.lines[index][prop] = prop === "itemId" ? field.value : Number(field.value);
      saveState();
      render();
    });
  });

  // Discount type (% or amount) toggle buttons per line.
  document.querySelectorAll("button[data-prop='discountType']").forEach((button) => {
    button.addEventListener("click", () => {
      const index = Number(button.dataset.line);
      state.invoiceDraft.lines[index].discountType = button.dataset.value;
      saveState();
      render();
    });
  });

  // Quick payment chips: full / half / unpaid.
  document.querySelectorAll("[data-pay-quick]").forEach((button) => {
    button.addEventListener("click", () => {
      const total = invoiceTotal(state.invoiceDraft).total;
      const mode = button.dataset.payQuick;
      state.invoiceDraft.paidAmount = mode === "full" ? Math.round(total * 100) / 100 : mode === "half" ? Math.round(total * 50) / 100 : 0;
      saveState();
      render();
    });
  });

  document.querySelector("[data-add-line]")?.addEventListener("click", () => {
    state.invoiceDraft.lines.push({ itemId: state.items[0].id, qty: 1, discount: 0, discountType: "percent" });
    saveState();
    render();
  });

  const quickAddInput = document.querySelector("#quickAddItem");
  const quickAdd = () => {
    const value = quickAddInput?.value.trim();
    if (!value) return;
    const item = findItemFromText(value) || state.items.find((row) => normalizeText(row.name) === normalizeText(value));
    if (!item) return showToast("No matching item found. Add it in Inventory first.");
    state.invoiceDraft.lines.push({ itemId: item.id, qty: 1, discount: 0, discountType: "percent" });
    saveState();
    render();
    showToast(`${item.name} added to the invoice.`);
  };
  document.querySelector("[data-quick-add]")?.addEventListener("click", quickAdd);
  quickAddInput?.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && !event.isComposing && event.keyCode !== 229) {
      event.preventDefault();
      quickAdd();
    }
  });

  document.querySelectorAll("[data-remove-line]").forEach((button) => {
    button.addEventListener("click", () => {
      if (state.invoiceDraft.lines.length === 1) return showToast("Invoice needs at least one item.");
      state.invoiceDraft.lines.splice(Number(button.dataset.removeLine), 1);
      saveState();
      render();
    });
  });

  document.querySelector("[data-create-invoice]")?.addEventListener("click", createInvoice);
  document.querySelector("[data-print]")?.addEventListener("click", () => window.print());
  document.querySelector("[data-share-whatsapp]")?.addEventListener("click", () => showToast("WhatsApp payment reminder prepared for the selected customer."));
  document.querySelectorAll("[data-gst-mode]").forEach((button) => {
    button.addEventListener("click", () => {
      state.invoiceDraft.gstMode = button.dataset.gstMode;
      saveState();
      render();
      showToast(`Invoice set to GST ${button.dataset.gstMode}.`);
    });
  });

  document.querySelectorAll("[data-collect]").forEach((button) => {
    button.addEventListener("click", () => {
      const invoice = state.invoices.find((row) => row.id === button.dataset.collect);
      if (!invoice) return;
      const pay = invoicePayment(invoice);
      const input = prompt(`Record payment for ${invoice.id}\nBalance due: ${money(pay.balance)}\nEnter amount received:`, String(pay.balance));
      if (input === null) return;
      const amount = Math.min(Math.max(Number(input) || 0, 0), pay.balance);
      if (amount <= 0) return showToast("Enter a valid amount.");
      invoice.paidAmount = pay.paid + amount;
      invoice.status = paymentStatus(pay.total, invoice.paidAmount).key;
      if (invoice.paymentMode === "Credit") invoice.paymentMode = "UPI";
      const party = byId(state.parties, invoice.partyId);
      if (party) party.balance = Math.max(0, Math.round(party.balance - amount));
      state.journals.unshift({ id: `J-${600 + state.journals.length}`, date: today(), debit: invoice.paymentMode, credit: "Accounts Receivable", amount: Math.round(amount), note: `${invoice.id} collection` });
      saveState();
      render();
      showToast(`${money(amount)} recorded for ${invoice.id}. ${paymentStatus(pay.total, invoice.paidAmount).label}.`);
    });
  });

  const itemForm = document.querySelector("#itemForm");
  itemForm?.addEventListener("submit", addItem);
  // Auto-fill remembered details when a known item name is entered.
  itemForm?.querySelector("[name=name]")?.addEventListener("change", (event) => {
    if (applyItemSuggestion(itemForm, event.target.value)) showToast("Auto-filled from your saved items.");
  });
  document.querySelectorAll("[data-suggest-fill]").forEach((chip) => {
    chip.addEventListener("click", () => {
      const form = document.querySelector(`#${chip.dataset.suggestFill}`);
      if (applyItemSuggestion(form, chip.dataset.name)) {
        showToast(`Loaded ${chip.dataset.name}. Set stock and prices, then save.`);
        form.querySelector("[name=stock]")?.focus();
      }
    });
  });
  const partyForm = document.querySelector("#partyForm");
  partyForm?.addEventListener("submit", addParty);
  partyForm?.querySelector("[name=name]")?.addEventListener("change", (event) => {
    const hit = findPartySuggestion(event.target.value);
    if (!hit) return;
    partyForm.querySelector("[name=name]").value = hit.name;
    if (hit.type) partyForm.querySelector("[name=type]").value = hit.type;
    if (hit.phone) partyForm.querySelector("[name=phone]").value = hit.phone;
    if (hit.terms !== undefined) partyForm.querySelector("[name=terms]").value = hit.terms;
    showToast("Auto-filled from your saved parties.");
  });
  document.querySelector("#expenseForm")?.addEventListener("submit", addExpense);
  document.querySelector("#journalForm")?.addEventListener("submit", addJournal);
  document.querySelector("#businessForm")?.addEventListener("submit", saveBusiness);
  document.querySelector("#ocrForm")?.addEventListener("submit", saveOcr);
  document.querySelector("#aiChatForm")?.addEventListener("submit", runAIChat);

  document.querySelectorAll("[data-stock]").forEach((button) => {
    button.addEventListener("click", () => {
      const item = byId(state.items, button.dataset.stock);
      item.stock = Math.max(0, item.stock + Number(button.dataset.delta));
      saveState();
      render();
    });
  });

  document.querySelector("[data-bulk-price]")?.addEventListener("click", () => {
    state.items = state.items.map((item) => ({ ...item, sale: Math.round(item.sale * 1.05) }));
    saveState();
    render();
    showToast("Sale prices increased by 5% for all items.");
  });

  document.querySelectorAll("[data-remind]").forEach((button) => {
    button.addEventListener("click", () => {
      const party = byId(state.parties, button.dataset.remind);
      showToast(`Payment reminder ready for ${party.name} on WhatsApp.`);
    });
  });

  document.querySelectorAll("[data-customer-account]").forEach((button) => {
    button.addEventListener("click", () => {
      state.customerAccountId = button.dataset.customerAccount;
      saveState();
      render();
    });
  });

  document.querySelector("[data-download-report]")?.addEventListener("click", downloadCsv);
  document.querySelector("[data-copy-store]")?.addEventListener("click", () => showToast("Store link copied: https://store.vyapaari.local/shree-lakshmi-traders"));
  document.querySelectorAll("[data-promote]").forEach((button) => button.addEventListener("click", () => showToast(`WhatsApp offer generated for ${byId(state.items, button.dataset.promote).name}.`)));
  document.querySelector("[data-convert-order]")?.addEventListener("click", convertOrder);
  document.querySelector("[data-broadcast]")?.addEventListener("click", () => showToast("Campaign queued for customers with opt-in consent."));
  document.querySelectorAll("[data-setting]").forEach((button) => {
    button.addEventListener("click", () => {
      state.settings[button.dataset.setting] = !state.settings[button.dataset.setting];
      saveState();
      render();
    });
  });
  document.querySelector("[data-export-json]")?.addEventListener("click", exportData);
  document.querySelector("#importJson")?.addEventListener("change", importData);
  document.querySelector("[data-export-enc]")?.addEventListener("click", exportEncrypted);
  document.querySelector("#importEnc")?.addEventListener("change", importEncrypted);
  document.querySelector("#googleForm")?.addEventListener("submit", (event) => {
    event.preventDefault();
    state.settings.googleClientId = new FormData(event.target).get("googleClientId").trim();
    saveState();
    render();
    showToast("Google Client ID saved.");
  });
  document.querySelector("[data-google-backup]")?.addEventListener("click", () => connectGoogle("backup"));
  document.querySelector("[data-google-restore]")?.addEventListener("click", () => connectGoogle("restore"));

  // Staff / user management (admin only)
  document.querySelector("#addUserForm")?.addEventListener("submit", addStaffUser);
  document.querySelectorAll("[data-toggle-user]").forEach((button) => {
    button.addEventListener("click", () => {
      const user = state.users.find((row) => row.id === button.dataset.toggleUser);
      if (user) { user.active = !user.active; saveState(); render(); showToast(`${user.name} ${user.active ? "enabled" : "disabled"}.`); }
    });
  });
  document.querySelectorAll("[data-reset-user]").forEach((button) => {
    button.addEventListener("click", () => resetUserPassword(button.dataset.resetUser));
  });
  document.querySelectorAll("[data-remove-user]").forEach((button) => {
    button.addEventListener("click", () => {
      const user = state.users.find((row) => row.id === button.dataset.removeUser);
      if (!user) return;
      if (!confirm(`Remove ${user.name}? They will no longer be able to sign in.`)) return;
      state.users = state.users.filter((row) => row.id !== user.id);
      saveState();
      render();
      showToast(`${user.name} removed.`);
    });
  });
  document.querySelectorAll("[data-ai-example]").forEach((button) => {
    button.addEventListener("click", () => {
      const input = document.querySelector("#aiChatForm textarea");
      if (input) input.value = button.dataset.aiExample;
    });
  });
  document.querySelector("[data-run-bulk]")?.addEventListener("click", () => processBulkRows(document.querySelector("#aiBulkText")?.value || ""));
  document.querySelector("[data-clear-ai]")?.addEventListener("click", () => {
    state.ai.messages = structuredClone(seedState.ai.messages);
    saveState();
    render();
  });
  document.querySelector("#aiBulkFile")?.addEventListener("change", loadAIBulkFile);
}

function createInvoice() {
  const id = `${state.business.invoicePrefix}-${1045 + state.invoices.length}`;
  const draft = structuredClone(state.invoiceDraft);
  const total = invoiceTotal(draft).total;
  const paid = Math.min(Math.max(Number(draft.paidAmount || 0), 0), total);
  draft.paidAmount = paid;
  draft.status = paymentStatus(total, paid).key;
  const invoice = { id, date: today(), ...draft };
  postInvoice(invoice);
  state.invoiceDraft.lines = [{ itemId: state.items[0].id, qty: 1, discount: 0, discountType: "percent" }];
  state.invoiceDraft.paidAmount = 0;
  saveState();
  render();
  const st = paymentStatus(total, paid);
  showToast(`${id} saved • ${st.label}. Stock, GST and ledger updated.`);
}

function addItem(event) {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(event.target).entries());
  const item = {
    id: `I-${1001 + state.items.length}`,
    name: data.name,
    hsn: data.hsn,
    category: data.category,
    stock: Number(data.stock),
    minStock: Number(data.minStock),
    unit: data.unit,
    purchase: Number(data.purchase),
    sale: Number(data.sale),
    gst: Number(data.gst),
    batch: data.batch,
    expiry: data.expiry,
  };
  state.items.unshift(item);
  recordItemSuggestion(item);
  saveState();
  render();
  showToast("Item saved. Vyapaari will suggest it next time you type the name.");
}

function addParty(event) {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(event.target).entries());
  const party = {
    id: `P-${101 + state.parties.length}`,
    name: data.name,
    type: data.type,
    phone: data.phone,
    balance: Number(data.balance),
    terms: Number(data.terms),
  };
  state.parties.unshift(party);
  recordPartySuggestion(party);
  saveState();
  render();
  showToast("Party saved and remembered for quick reuse.");
}

function addExpense(event) {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(event.target).entries());
  state.expenses.unshift({ id: `E-${201 + state.expenses.length}`, date: data.date, category: data.category, amount: Number(data.amount), gst: Number(data.gst), note: data.note });
  saveState();
  render();
  showToast("Expense recorded and reflected in P&L.");
}

function addJournal(event) {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(event.target).entries());
  state.journals.unshift({ id: `J-${501 + state.journals.length}`, date: data.date, debit: data.debit, credit: data.credit, amount: Number(data.amount), note: data.note });
  saveState();
  render();
  showToast("Journal entry posted.");
}

function saveBusiness(event) {
  event.preventDefault();
  state.business = { ...state.business, ...Object.fromEntries(new FormData(event.target).entries()) };
  saveState();
  render();
  showToast("Business profile saved.");
}

function saveOcr(event) {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(event.target).entries());
  state.expenses.unshift({ id: `E-${201 + state.expenses.length}`, date: today(), category: "Scanned Purchase", amount: Number(data.amount), gst: Number(data.gst), note: `${data.supplier}: ${data.items}` });
  saveState();
  setView("accounting");
  showToast("OCR purchase saved as an accounting entry.");
}

function runAIChat(event) {
  event.preventDefault();
  const prompt = new FormData(event.target).get("prompt")?.trim();
  if (!prompt) return;
  addAIMessage("user", prompt);
  const reply = processAICommand(prompt);
  addAIMessage("assistant", reply);
  saveState();
  render();
  showToast("AI action completed.");
}

function addAIMessage(role, text) {
  state.ai.messages.push({ role, text });
  state.ai.messages = state.ai.messages.slice(-24);
}

function normalizeText(value) {
  return String(value || "").trim().toLowerCase();
}

function words(value) {
  return normalizeText(value).replace(/[^a-z0-9\s]/g, " ").split(/\s+/).filter(Boolean);
}

function findItemFromText(text) {
  const normal = normalizeText(text);
  const aliasMatch = Object.entries(state.ai.memory.itemAliases).find(([alias]) => normal.includes(alias));
  if (aliasMatch) return byId(state.items, aliasMatch[1]);
  const tokens = words(text);
  return state.items.find((item) => normal.includes(normalizeText(item.name))) ||
    state.items.find((item) => words(item.name).every((token) => tokens.includes(token))) ||
    state.items.find((item) => words(item.name).some((token) => tokens.includes(token)));
}

function findPartyFromText(text, preferredType = "Customer") {
  const normal = normalizeText(text);
  const aliasMatch = Object.entries(state.ai.memory.partyAliases).find(([alias]) => normal.includes(alias));
  if (aliasMatch) return byId(state.parties, aliasMatch[1]);
  return state.parties.find((party) => normal.includes(normalizeText(party.name))) ||
    state.parties.find((party) => party.type === preferredType && words(party.name).some((token) => words(text).includes(token)));
}

function qtyFromText(text) {
  const match = String(text).match(/(?:x|qty\s*|quantity\s*)(\d+(?:\.\d+)?)/i) || String(text).match(/\b(\d+(?:\.\d+)?)\s*(?:pcs|piece|bag|bottle|pkt|unit|units)\b/i);
  return Number(match?.[1] || 1);
}

function priceFromText(text, fallback) {
  const match = String(text).match(/(?:@|rate\s*|price\s*)(\d+(?:\.\d+)?)/i);
  return Number(match?.[1] || fallback || 0);
}

function gstFromText(text, fallback) {
  const match = String(text).match(/gst\s*(\d+(?:\.\d+)?)/i);
  return Number(match?.[1] || fallback || 0);
}

function modeFromText(text) {
  return normalizeText(text).includes("inclusive") || normalizeText(text).includes("incl") ? "inclusive" : "exclusive";
}

function statusFromText(text) {
  const normal = normalizeText(text);
  if (normal.includes("overdue")) return "Overdue";
  if (normal.includes("pending") || normal.includes("credit")) return "Pending";
  return "Paid";
}

function paymentFromText(text) {
  const normal = normalizeText(text);
  if (normal.includes("cash")) return "Cash";
  if (normal.includes("card")) return "Card";
  if (normal.includes("bank")) return "Bank Transfer";
  if (normal.includes("credit")) return "Credit";
  return "UPI";
}

function ensureParty(name, type) {
  const existing = state.parties.find((party) => normalizeText(party.name) === normalizeText(name));
  if (existing) return existing;
  const party = { id: `P-${101 + state.parties.length}`, name: name || `${type} ${state.parties.length + 1}`, type, phone: "", balance: 0, terms: type === "Customer" ? 10 : 7 };
  state.parties.unshift(party);
  state.ai.memory.partyAliases[normalizeText(party.name).split(" ")[0]] = party.id;
  recordPartySuggestion(party);
  return party;
}

function processAICommand(prompt) {
  const normal = normalizeText(prompt);
  if (normal.startsWith("remember") || normal.startsWith("learn")) return rememberAI(prompt);
  if (normal.includes("bulk")) return processBulkRows(prompt.split("\n").slice(1).join("\n") || prompt);
  if (normal.includes("purchase") || normal.includes("supplier")) return createPurchaseFromText(prompt);
  if (normal.includes("sale") || normal.includes("invoice") || normal.includes("sell")) return createSaleFromText(prompt);
  if (normal.includes("stock") || normal.includes("low")) {
    const low = state.items.filter((item) => item.stock <= item.minStock).map((item) => `${item.name}: ${item.stock} ${item.unit}`).join(", ");
    return low ? `Low stock items: ${low}.` : "Stock is healthy. No item is below reorder level.";
  }
  if (normal.includes("report") || normal.includes("profit")) return `Sales ${money(salesTotal())}, expenses ${money(expenseTotal())}, stock value ${money(purchaseValue())}.`;
  return "I understood the text, but I need an operation word like sale, purchase, bulk, remember, stock or report.";
}

function rememberAI(prompt) {
  const match = prompt.match(/(?:remember|learn)\s+(item|party|customer|supplier)?\s*([^=]+)=\s*(.+)$/i);
  if (!match) return "Use this format: remember item shortname = Full Item Name, or remember party shortname = Full Party Name.";
  const type = normalizeText(match[1] || "item");
  const alias = normalizeText(match[2]);
  const target = match[3].trim();
  if (type.includes("party") || type.includes("customer") || type.includes("supplier")) {
    const party = findPartyFromText(target, type.includes("supplier") ? "Supplier" : "Customer") || ensureParty(target, type.includes("supplier") ? "Supplier" : "Customer");
    state.ai.memory.partyAliases[alias] = party.id;
    state.ai.memory.learned.push(`${alias} means party ${party.name}`);
    return `Learned: ${alias} means party ${party.name}.`;
  }
  const item = findItemFromText(target);
  if (!item) return `I could not find item "${target}". Add it in Inventory first, then teach me the alias.`;
  state.ai.memory.itemAliases[alias] = item.id;
  state.ai.memory.learned.push(`${alias} means item ${item.name}`);
  return `Learned: ${alias} means item ${item.name}.`;
}

function createSaleFromText(text) {
  const item = findItemFromText(text);
  if (!item) return "I could not identify the item. Use an exact item name or teach me an alias.";
  const party = findPartyFromText(text, "Customer") || ensureParty("Walk-in Customer", "Customer");
  const invoice = {
    id: `${state.business.invoicePrefix}-${1045 + state.invoices.length}`,
    partyId: party.name === "Walk-in Customer" ? "Walk-in Customer" : party.id,
    date: today(),
    status: statusFromText(text),
    paymentMode: paymentFromText(text),
    gstMode: modeFromText(text),
    lines: [{ itemId: item.id, qty: qtyFromText(text), discount: 0 }],
  };
  postInvoice(invoice);
  return `Created ${invoice.gstMode} GST sale invoice ${invoice.id} for ${party.name}: ${item.name} x${invoice.lines[0].qty}, total ${money(invoiceTotal(invoice).total)}.`;
}

function createPurchaseFromText(text) {
  const item = findItemFromText(text);
  if (!item) return "I could not identify the purchase item. Use an exact item name or teach me an alias.";
  const supplier = findPartyFromText(text, "Supplier") || ensureParty("AI Supplier", "Supplier");
  const qty = qtyFromText(text);
  const price = priceFromText(text, item.purchase);
  const purchase = {
    id: `PUR-${301 + state.purchases.length}`,
    supplier: supplier.name,
    date: today(),
    gstMode: modeFromText(text),
    lines: [{ itemId: item.id, qty, price, gst: gstFromText(text, item.gst) }],
  };
  postPurchase(purchase);
  return `Created ${purchase.gstMode} GST purchase ${purchase.id} from ${supplier.name}: ${item.name} x${qty}, total ${money(purchaseTotal(purchase))}.`;
}

function postInvoice(invoice) {
  state.invoices.unshift(invoice);
  invoice.lines.forEach((line) => {
    const item = byId(state.items, line.itemId);
    if (item) {
      item.stock = Math.max(0, item.stock - Number(line.qty || 0));
      recordItemSuggestion(item);
    }
  });
  const invParty = byId(state.parties, invoice.partyId);
  if (invParty) recordPartySuggestion(invParty);
  const pay = invoicePayment(invoice);
  const party = byId(state.parties, invoice.partyId);
  if (party && pay.balance > 0) party.balance += Math.round(pay.balance);
  state.journals.unshift({ id: `J-${600 + state.journals.length}`, date: today(), debit: pay.paid > 0 ? invoice.paymentMode : "Accounts Receivable", credit: "Sales", amount: Math.round(pay.total), note: invoice.id });
}

function postPurchase(purchase) {
  state.purchases.unshift(purchase);
  purchase.lines.forEach((line) => {
    const item = byId(state.items, line.itemId);
    if (item) {
      item.stock += Number(line.qty || 0);
      item.purchase = Number(line.price || item.purchase);
    }
  });
  const total = purchaseTotal(purchase);
  const supplier = state.parties.find((party) => normalizeText(party.name) === normalizeText(purchase.supplier));
  if (supplier) supplier.balance -= Math.round(total);
  state.journals.unshift({ id: `J-${600 + state.journals.length}`, date: today(), debit: "Purchase", credit: purchase.supplier, amount: Math.round(total), note: purchase.id });
}

function processBulkRows(text) {
  const rows = String(text || "").split(/\n+/).map((row) => row.trim()).filter((row) => row && !row.toLowerCase().startsWith("type,"));
  let sales = 0;
  let purchases = 0;
  const skipped = [];
  rows.forEach((row) => {
    const parts = row.split(/[,\t|]/).map((part) => part.trim()).filter(Boolean);
    if (parts.length < 4) {
      skipped.push(row);
      return;
    }
    const [type, partyName, itemName, qty, price, status, payment, gstMode] = parts;
    const item = findItemFromText(itemName);
    if (!item) {
      skipped.push(row);
      return;
    }
    if (normalizeText(type).startsWith("p")) {
      const supplier = ensureParty(partyName, "Supplier");
      postPurchase({ id: `PUR-${301 + state.purchases.length}`, supplier: supplier.name, date: today(), gstMode: normalizeText(gstMode || "exclusive").includes("incl") ? "inclusive" : "exclusive", lines: [{ itemId: item.id, qty: Number(qty || 1), price: Number(price || item.purchase), gst: item.gst }] });
      purchases += 1;
    } else {
      const party = ensureParty(partyName, "Customer");
      postInvoice({ id: `${state.business.invoicePrefix}-${1045 + state.invoices.length}`, partyId: party.id, date: today(), status: status || "Paid", paymentMode: payment || "UPI", gstMode: normalizeText(gstMode || "exclusive").includes("incl") ? "inclusive" : "exclusive", lines: [{ itemId: item.id, qty: Number(qty || 1), discount: 0 }] });
      sales += 1;
    }
  });
  const reply = `Bulk upload completed: ${sales} sales invoices, ${purchases} purchase invoices${skipped.length ? `, ${skipped.length} skipped rows` : ""}.`;
  addAIMessage("assistant", reply);
  saveState();
  render();
  showToast(reply);
  return reply;
}

function loadAIBulkFile(event) {
  const file = event.target.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    const box = document.querySelector("#aiBulkText");
    if (box) box.value = reader.result;
  };
  reader.readAsText(file);
}

function convertOrder() {
  if (!state.orders.length) return showToast("No online orders to convert.");
  const order = state.orders.shift();
  state.invoices.unshift({ id: `${state.business.invoicePrefix}-${1045 + state.invoices.length}`, partyId: "Walk-in Customer", date: today(), status: "Pending", paymentMode: "Credit", lines: [{ itemId: state.items[0].id, qty: 1, discount: 0 }] });
  saveState();
  render();
  showToast(`${order.id} converted into an invoice draft record.`);
}

async function addStaffUser(event) {
  event.preventDefault();
  if (!accessFor(sessionUser?.role).canManageUsers) return showToast("Only an Admin can add staff.");
  const data = Object.fromEntries(new FormData(event.target).entries());
  const salt = randomSalt();
  const pinHash = await hashPin(data.pin, salt);
  state.users.push({
    id: `U-${Date.now()}`,
    name: data.name,
    role: data.role,
    access: accessFor(data.role).label,
    active: true,
    salt,
    pinHash,
  });
  saveState();
  render();
  showToast(`${data.name} added as ${data.role}.`);
}

async function resetUserPassword(userId) {
  if (!accessFor(sessionUser?.role).canManageUsers) return;
  const user = state.users.find((row) => row.id === userId);
  if (!user) return;
  const pin = window.prompt(`Set a new password for ${user.name}`);
  if (!pin || pin.length < 4) return showToast("Password must be at least 4 characters.");
  user.salt = randomSalt();
  user.pinHash = await hashPin(pin, user.salt);
  saveState();
  render();
  showToast(`Password updated for ${user.name}.`);
}

function downloadCsv() {
  const rows = [["Invoice", "Date", "Party", "Taxable", "GST", "Total", "Status"]];
  state.invoices.forEach((invoice) => {
    const total = invoiceTotal(invoice);
    const party = byId(state.parties, invoice.partyId);
    rows.push([invoice.id, invoice.date, party?.name || invoice.partyId, total.taxable, total.tax, total.total, invoice.status]);
  });
  const csv = rows.map((row) => row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(",")).join("\n");
  downloadBlob(csv, "vyapaari-gst-report.csv", "text/csv");
}

function markBackup() {
  state.settings.lastBackupAt = new Date().toISOString();
  saveState();
}

function exportData() {
  downloadBlob(JSON.stringify(state, null, 2), "vyapaari-backup.json", "application/json");
  markBackup();
  showToast("Backup JSON exported. Save it to Google Drive or any safe folder.");
}

function applyRestoredState(parsed) {
  state = migrateState({ ...structuredClone(seedState), ...parsed });
  saveState();
  if (sessionUser) sessionUser = state.users.find((user) => user.id === sessionUser.id) || sessionUser;
  render();
  renderUserChip();
}

function importData(event) {
  const file = event.target.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      applyRestoredState(JSON.parse(reader.result));
      showToast("Backup imported successfully.");
    } catch {
      showToast("Import failed. Please choose a valid Vyapaari JSON backup.");
    }
  };
  reader.readAsText(file);
}

/* ---------- Encrypted backup (AES-GCM + PBKDF2) ---------- */
function bytesToBase64(bytes) {
  let binary = "";
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    binary += String.fromCharCode.apply(null, bytes.subarray(i, i + chunk));
  }
  return btoa(binary);
}

function base64ToBytes(b64) {
  const binary = atob(b64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

async function deriveKey(passphrase, salt) {
  const material = await crypto.subtle.importKey("raw", new TextEncoder().encode(passphrase), "PBKDF2", false, ["deriveKey"]);
  return crypto.subtle.deriveKey(
    { name: "PBKDF2", salt, iterations: 120000, hash: "SHA-256" },
    material,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"],
  );
}

async function exportEncrypted() {
  const passphrase = window.prompt("Set a password for this encrypted backup. You will need it to restore.");
  if (!passphrase) return;
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const key = await deriveKey(passphrase, salt);
  const plain = new TextEncoder().encode(JSON.stringify(state));
  const cipher = new Uint8Array(await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, plain));
  const payload = { format: "vyapaari-enc-v1", salt: bytesToBase64(salt), iv: bytesToBase64(iv), data: bytesToBase64(cipher) };
  downloadBlob(JSON.stringify(payload), "vyapaari-secure-backup.vyp", "application/octet-stream");
  markBackup();
  showToast("Encrypted backup downloaded.");
}

function importEncrypted(event) {
  const file = event.target.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = async () => {
    try {
      const payload = JSON.parse(reader.result);
      if (payload.format !== "vyapaari-enc-v1") throw new Error("format");
      const passphrase = window.prompt("Enter the password for this encrypted backup.");
      if (!passphrase) return;
      const key = await deriveKey(passphrase, base64ToBytes(payload.salt));
      const plain = await crypto.subtle.decrypt({ name: "AES-GCM", iv: base64ToBytes(payload.iv) }, key, base64ToBytes(payload.data));
      applyRestoredState(JSON.parse(new TextDecoder().decode(plain)));
      showToast("Encrypted backup restored.");
    } catch {
      showToast("Restore failed. Check the file and password.");
    }
  };
  reader.readAsText(file);
}

/* ---------- Optional Google Drive backup ---------- */
let googleToken = null;

function loadScript(src) {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) return resolve();
    const el = document.createElement("script");
    el.src = src;
    el.onload = resolve;
    el.onerror = () => reject(new Error("script"));
    document.head.appendChild(el);
  });
}

async function connectGoogle(action) {
  const clientId = String(state.settings.googleClientId || "").trim();
  if (!clientId) return showToast("Add your Google OAuth Client ID in Google backup settings first.");
  try {
    await loadScript("https://accounts.google.com/gsi/client");
  } catch {
    return showToast("Could not load Google sign-in. Check your internet connection.");
  }
  try {
    const tokenClient = google.accounts.oauth2.initTokenClient({
      client_id: clientId,
      scope: "https://www.googleapis.com/auth/drive.appdata",
      callback: async (response) => {
        if (response.error) return showToast("Google sign-in was cancelled.");
        googleToken = response.access_token;
        if (action === "restore") await driveRestore();
        else await driveBackup();
      },
    });
    tokenClient.requestAccessToken();
  } catch {
    showToast("Google sign-in failed. Verify the Client ID and authorized origin.");
  }
}

async function findDriveFileId() {
  const res = await fetch("https://www.googleapis.com/drive/v3/files?spaces=appDataFolder&fields=files(id,name)", {
    headers: { Authorization: `Bearer ${googleToken}` },
  });
  const json = await res.json();
  return (json.files || []).find((f) => f.name === "vyapaari-backup.json")?.id || null;
}

async function driveBackup() {
  try {
    const existingId = await findDriveFileId();
    const metadata = { name: "vyapaari-backup.json", mimeType: "application/json" };
    if (!existingId) metadata.parents = ["appDataFolder"];
    const boundary = "vyapaari" + Date.now();
    const body =
      `--${boundary}\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n${JSON.stringify(metadata)}\r\n` +
      `--${boundary}\r\nContent-Type: application/json\r\n\r\n${JSON.stringify(state)}\r\n--${boundary}--`;
    const url = existingId
      ? `https://www.googleapis.com/upload/drive/v3/files/${existingId}?uploadType=multipart`
      : "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart";
    await fetch(url, {
      method: existingId ? "PATCH" : "POST",
      headers: { Authorization: `Bearer ${googleToken}`, "Content-Type": `multipart/related; boundary=${boundary}` },
      body,
    });
    markBackup();
    showToast("Backup saved to your Google Drive.");
  } catch {
    showToast("Google Drive backup failed. Please try again.");
  }
}

async function driveRestore() {
  try {
    const fileId = await findDriveFileId();
    if (!fileId) return showToast("No Vyapaari backup found in your Google Drive.");
    const res = await fetch(`https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`, {
      headers: { Authorization: `Bearer ${googleToken}` },
    });
    applyRestoredState(await res.json());
    showToast("Restored from your Google Drive backup.");
  } catch {
    showToast("Google Drive restore failed. Please try again.");
  }
}

function downloadBlob(content, filename, type) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

document.getElementById("exportBtn").addEventListener("click", exportData);
document.getElementById("seedBtn").addEventListener("click", () => {
  if (!confirm("Reset demo business data? Your login accounts will be kept.")) return;
  const keepUsers = structuredClone(state.users);
  state = structuredClone(seedState);
  state.users = keepUsers;
  saveState();
  showApp();
  showToast("Demo data reset. Accounts kept.");
});
primaryAction.addEventListener("click", () => {
  if (state.view === "billing") createInvoice();
  else setView("billing");
});
nav.addEventListener("click", (event) => {
  const button = event.target.closest("[data-view]");
  if (button) setView(button.dataset.view);
});

// Mobile navigation drawer
const navToggle = document.getElementById("navToggle");
const scrim = document.getElementById("scrim");
function openMobileNav() {
  document.body.classList.add("nav-open");
}
function closeMobileNav() {
  document.body.classList.remove("nav-open");
}
navToggle?.addEventListener("click", () => {
  document.body.classList.toggle("nav-open");
});
scrim?.addEventListener("click", closeMobileNav);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("service-worker.js").then((reg) => reg.update()).catch(() => {});
  });
  // When a new service worker takes control, reload once so users get the latest UI immediately.
  let swReloaded = false;
  navigator.serviceWorker.addEventListener("controllerchange", () => {
    if (swReloaded) return;
    swReloaded = true;
    window.location.reload();
  });
}

bootAuth();
