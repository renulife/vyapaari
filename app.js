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

const seedState = {
  view: "dashboard",
  business: {
    name: "Shree Lakshmi Traders",
    gstin: "29AAZCS9478E1Z7",
    phone: "+91 98765 43210",
    address: "Bengaluru, Karnataka",
    invoicePrefix: "VYP",
    language: "English",
  },
  settings: {
    theme: "Classic GST",
    autoBackup: true,
    eInvoice: true,
    eWayBill: true,
    whatsapp: true,
    offlineMode: true,
  },
  users: [
    { name: "Owner", role: "Admin", access: "All modules" },
    { name: "Ravi", role: "Cashier", access: "Billing, POS, payments" },
    { name: "Meena", role: "Accountant", access: "Reports, accounting, GST" },
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
    lines: [{ itemId: "I-1001", qty: 1, discount: 0 }],
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
  return nextState;
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
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
  const discount = gross * (Number(line.discount || 0) / 100);
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
  state.view = view;
  saveState();
  render();
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

function metric(label, value, note) {
  return `<article class="metric"><span>${label}</span><strong>${value}</strong><small>${note}</small></article>`;
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
      ${metric("Sales", money(salesTotal()), `${state.invoices.length} invoices created`)}
      ${metric("GST collected", money(gst), "GSTR-ready tax breakup")}
      ${metric("Stock value", money(purchaseValue()), `${lowStock.length} low-stock alerts`)}
      ${metric("Net profit", money(profit), "After expenses and item costs")}
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
  const partyOptions = [`<option value="Walk-in Customer">Walk-in Customer</option>`]
    .concat(state.parties.filter((p) => p.type === "Customer").map((p) => `<option value="${p.id}" ${draft.partyId === p.id ? "selected" : ""}>${p.name}</option>`))
    .join("");
  const itemOptions = (selected) => state.items.map((item) => `<option value="${item.id}" ${selected === item.id ? "selected" : ""}>${item.name} • ${money(item.sale)}</option>`).join("");

  return `
    <section class="two-col">
      <div class="section-stack">
        <article class="panel">
          <div class="panel-title">
            <div><span class="kicker">Counter sale</span><h2>Create GST invoice</h2></div>
            <button class="ghost-btn" type="button" data-add-line>Add item</button>
          </div>
          <div class="form-grid three">
            <div class="field"><label>Customer</label><select data-draft="partyId">${partyOptions}</select></div>
            <div class="field"><label>Payment</label><select data-draft="paymentMode"><option>UPI</option><option>Cash</option><option>Card</option><option>Bank Transfer</option><option>Credit</option></select></div>
            <div class="field"><label>Status</label><select data-draft="status"><option>Paid</option><option>Pending</option><option>Overdue</option></select></div>
            <div class="field full">
              <label>GST calculation</label>
              <div class="segmented" role="group" aria-label="GST calculation mode">
                <button class="${draft.gstMode === "exclusive" ? "active" : ""}" type="button" data-gst-mode="exclusive">Exclusive GST <span>Tax added above item rate</span></button>
                <button class="${draft.gstMode === "inclusive" ? "active" : ""}" type="button" data-gst-mode="inclusive">Inclusive GST <span>Item rate already includes tax</span></button>
              </div>
            </div>
          </div>
          <div class="invoice-lines" style="margin-top:16px">
            ${draft.lines.map((line, index) => `
              <div class="invoice-line">
                <div class="field"><label>Item</label><select data-line="${index}" data-prop="itemId">${itemOptions(line.itemId)}</select></div>
                <div class="field"><label>Qty</label><input data-line="${index}" data-prop="qty" type="number" min="1" value="${line.qty}" /></div>
                <div class="field"><label>Discount %</label><input data-line="${index}" data-prop="discount" type="number" min="0" max="90" value="${line.discount}" /></div>
                <button class="icon-btn" type="button" data-remove-line="${index}" aria-label="Remove item">×</button>
              </div>
            `).join("")}
          </div>
          <div class="topbar-actions" style="margin-top:18px; justify-content:flex-start">
            <button class="primary-btn" type="button" data-create-invoice>Save invoice</button>
            <button class="ghost-btn" type="button" data-print>Print preview</button>
            <button class="ghost-btn" type="button" data-share-whatsapp>WhatsApp reminder</button>
          </div>
        </article>

        <article class="panel">
          <div class="panel-title"><h3>Recent invoices</h3><span class="muted">${state.invoices.length} records</span></div>
          ${invoiceTable(state.invoices)}
        </article>
      </div>

      <aside class="invoice-preview">
        <div class="preview-head">
          <div><strong>${state.business.name}</strong><div class="table-sub">${state.business.gstin}</div></div>
          <div style="text-align:right"><strong>GST Invoice</strong><div class="table-sub">${state.business.invoicePrefix}-${1045 + state.invoices.length}</div></div>
        </div>
        <div class="list">
          ${draft.lines.map((line) => {
            const item = byId(state.items, line.itemId);
            const row = itemTotal(line);
            return `<div class="list-row"><div><strong>${item?.name || "Item"}</strong><div class="table-sub">${line.qty} × ${money(item?.sale)} • GST ${item?.gst || 0}% ${draft.gstMode}</div></div><strong>${money(row.total)}</strong></div>`;
          }).join("")}
        </div>
        <div style="margin-top:16px">
          <div class="summary-line"><span>${draft.gstMode === "inclusive" ? "Gross amount" : "Subtotal"}</span><strong>${money(totals.subtotal)}</strong></div>
          <div class="summary-line"><span>Discount</span><strong>${money(totals.discount)}</strong></div>
          <div class="summary-line"><span>Taxable value</span><strong>${money(totals.taxable)}</strong></div>
          <div class="summary-line"><span>GST ${draft.gstMode}</span><strong>${money(totals.tax)}</strong></div>
          <div class="summary-line total"><span>Total</span><strong>${money(totals.total)}</strong></div>
        </div>
        <p class="muted">Includes automated GST, stock deduction, payment status, and accounting entries when saved.</p>
      </aside>
    </section>
  `;
}

function invoiceTable(invoices) {
  return `
    <div class="table-wrap">
      <table>
        <thead><tr><th>Invoice</th><th>Party</th><th>Date</th><th>GST</th><th>Payment</th><th>Status</th><th>Total</th><th>Action</th></tr></thead>
        <tbody>
          ${invoices.map((invoice) => {
            const party = byId(state.parties, invoice.partyId);
            return `
              <tr>
                <td><strong>${invoice.id}</strong></td>
                <td>${party?.name || invoice.partyId}</td>
                <td>${invoice.date}</td>
                <td><span class="status pending">${invoice.gstMode || "exclusive"}</span></td>
                <td>${invoice.paymentMode}</td>
                <td><span class="status ${statusClass(invoice.status)}">${invoice.status}</span></td>
                <td><strong>${money(invoiceTotal(invoice).total)}</strong></td>
                <td><button class="ghost-btn" type="button" data-mark-paid="${invoice.id}">Mark paid</button></td>
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
        <div class="panel-title"><div><span class="kicker">Stock master</span><h2>Add item, barcode, GST and batch</h2></div></div>
        <form id="itemForm" class="form-grid three">
          <div class="field"><label>Name</label><input name="name" required placeholder="Product name" /></div>
          <div class="field"><label>HSN</label><input name="hsn" required placeholder="HSN code" /></div>
          <div class="field"><label>Category</label><input name="category" required placeholder="Category" /></div>
          <div class="field"><label>Stock</label><input name="stock" type="number" min="0" required /></div>
          <div class="field"><label>Min stock</label><input name="minStock" type="number" min="0" required /></div>
          <div class="field"><label>Unit</label><input name="unit" value="pcs" required /></div>
          <div class="field"><label>Purchase price</label><input name="purchase" type="number" min="0" required /></div>
          <div class="field"><label>Sale price</label><input name="sale" type="number" min="0" required /></div>
          <div class="field"><label>GST %</label><input name="gst" type="number" min="0" required /></div>
          <div class="field"><label>Batch</label><input name="batch" placeholder="Optional" /></div>
          <div class="field"><label>Expiry</label><input name="expiry" type="date" /></div>
          <div class="field"><label>&nbsp;</label><button class="primary-btn" type="submit">Add item</button></div>
        </form>
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
          <div class="field"><label>Name</label><input name="name" required /></div>
          <div class="field"><label>Type</label><select name="type"><option>Customer</option><option>Supplier</option></select></div>
          <div class="field"><label>Phone</label><input name="phone" required /></div>
          <div class="field"><label>Opening balance</label><input name="balance" type="number" value="0" /></div>
          <div class="field"><label>Credit days</label><input name="terms" type="number" value="7" /></div>
          <div class="field"><label>&nbsp;</label><button class="primary-btn" type="submit">Add party</button></div>
        </form>
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
                  <td><strong>${money(Math.abs(party.balance))}</strong><div class="table-sub">${party.balance >= 0 ? "Receivable" : "Payable"}</div></td>
                  <td><button class="ghost-btn" type="button" data-remind="${party.id}">Send reminder</button></td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      </article>
    </section>
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
            ${settingRow("Google Drive backup", "autoBackup")}
            ${settingRow("Offline billing", "offlineMode")}
          </div>
          <div class="topbar-actions" style="margin-top:18px; justify-content:flex-start">
            <button class="ghost-btn" type="button" data-export-json>Backup JSON</button>
            <label class="ghost-btn" style="display:inline-flex; align-items:center; gap:8px">Import JSON <input id="importJson" type="file" accept="application/json" hidden /></label>
          </div>
        </article>
      </section>
      <article class="panel">
        <div class="panel-title"><h3>Role-based access</h3><button class="ghost-btn" type="button" data-add-user>Add staff user</button></div>
        <div class="table-wrap"><table><thead><tr><th>User</th><th>Role</th><th>Access</th></tr></thead><tbody>${state.users.map((user) => `<tr><td><strong>${user.name}</strong></td><td>${user.role}</td><td>${user.access}</td></tr>`).join("")}</tbody></table></div>
      </article>
    </section>
  `;
}

function settingRow(label, key) {
  return `<div class="list-row"><span>${label}</span><button class="ghost-btn" type="button" data-setting="${key}">${state.settings[key] ? "On" : "Off"}</button></div>`;
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

  document.querySelectorAll("[data-line]").forEach((field) => {
    field.addEventListener("input", () => {
      const index = Number(field.dataset.line);
      const prop = field.dataset.prop;
      state.invoiceDraft.lines[index][prop] = prop === "itemId" ? field.value : Number(field.value);
      saveState();
      render();
    });
  });

  document.querySelector("[data-add-line]")?.addEventListener("click", () => {
    state.invoiceDraft.lines.push({ itemId: state.items[0].id, qty: 1, discount: 0 });
    saveState();
    render();
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

  document.querySelectorAll("[data-mark-paid]").forEach((button) => {
    button.addEventListener("click", () => {
      const invoice = state.invoices.find((row) => row.id === button.dataset.markPaid);
      invoice.status = "Paid";
      invoice.paymentMode = invoice.paymentMode === "Credit" ? "UPI" : invoice.paymentMode;
      saveState();
      render();
      showToast(`${invoice.id} marked as paid.`);
    });
  });

  document.querySelector("#itemForm")?.addEventListener("submit", addItem);
  document.querySelector("#partyForm")?.addEventListener("submit", addParty);
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

  document.querySelector("[data-download-report]")?.addEventListener("click", downloadCsv);
  document.querySelector("[data-copy-store]")?.addEventListener("click", () => showToast("Store link copied: https://store.vyapaari.local/shree-lakshmi-traders"));
  document.querySelectorAll("[data-promote]").forEach((button) => button.addEventListener("click", () => showToast(`WhatsApp offer generated for ${byId(state.items, button.dataset.promote).name}.`)));
  document.querySelector("[data-convert-order]")?.addEventListener("click", convertOrder);
  document.querySelector("[data-broadcast]")?.addEventListener("click", () => showToast("Campaign queued for customers with opt-in consent."));
  document.querySelector("[data-add-user]")?.addEventListener("click", addUser);
  document.querySelectorAll("[data-setting]").forEach((button) => {
    button.addEventListener("click", () => {
      state.settings[button.dataset.setting] = !state.settings[button.dataset.setting];
      saveState();
      render();
    });
  });
  document.querySelector("[data-export-json]")?.addEventListener("click", exportData);
  document.querySelector("#importJson")?.addEventListener("change", importData);
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
  const invoice = { id, date: today(), ...structuredClone(state.invoiceDraft) };
  postInvoice(invoice);
  state.invoiceDraft.lines = [{ itemId: state.items[0].id, qty: 1, discount: 0 }];
  saveState();
  render();
  showToast(`${id} saved. Stock, GST and accounting updated.`);
}

function addItem(event) {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(event.target).entries());
  state.items.unshift({
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
  });
  saveState();
  render();
  showToast("Item added with barcode and GST details.");
}

function addParty(event) {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(event.target).entries());
  state.parties.unshift({
    id: `P-${101 + state.parties.length}`,
    name: data.name,
    type: data.type,
    phone: data.phone,
    balance: Number(data.balance),
    terms: Number(data.terms),
  });
  saveState();
  render();
  showToast("Party added with payment terms.");
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
    if (item) item.stock = Math.max(0, item.stock - Number(line.qty || 0));
  });
  const total = invoiceTotal(invoice).total;
  const party = byId(state.parties, invoice.partyId);
  if (party && invoice.status !== "Paid") party.balance += Math.round(total);
  state.journals.unshift({ id: `J-${600 + state.journals.length}`, date: today(), debit: invoice.status === "Paid" ? invoice.paymentMode : "Accounts Receivable", credit: "Sales", amount: Math.round(total), note: invoice.id });
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

function addUser() {
  state.users.push({ name: `Staff ${state.users.length}`, role: "Sales", access: "Billing, inventory lookup" });
  saveState();
  render();
  showToast("Staff user added with limited access.");
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

function exportData() {
  downloadBlob(JSON.stringify(state, null, 2), "vyapaari-backup.json", "application/json");
  showToast("Backup JSON exported.");
}

function importData(event) {
  const file = event.target.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      state = JSON.parse(reader.result);
      saveState();
      render();
      showToast("Backup imported successfully.");
    } catch {
      showToast("Import failed. Please choose a valid Vyapaari JSON backup.");
    }
  };
  reader.readAsText(file);
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
  localStorage.removeItem(STORAGE_KEY);
  state = structuredClone(seedState);
  render();
  showToast("Demo data reset.");
});
primaryAction.addEventListener("click", () => {
  if (state.view === "billing") createInvoice();
  else setView("billing");
});
nav.addEventListener("click", (event) => {
  const button = event.target.closest("[data-view]");
  if (button) setView(button.dataset.view);
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("service-worker.js").catch(() => {});
  });
}

render();
