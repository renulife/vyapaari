# Vyapaari Business OS

Vyapaari is a launch-ready browser web app for Indian SMEs: GST billing, POS, inventory, parties, accounting, reports, OCR-style purchase entry, online store operations, staff roles, and backup/export.

## Run locally

Use the built-in static server:

```bash
npm start
```

Then visit `http://127.0.0.1:3000`.

## Included operations

- GST/non-GST invoice workflow with discounts, payment mode, status, GST totals and print preview
- POS-style fast billing with stock deduction and accounting journal creation
- Inventory master with HSN, GST, barcode, batch, expiry, low-stock alerts and bulk pricing
- Party management for customers/suppliers, balances, credit terms and reminders
- Accounting for expenses, journals, GST payable and profit/loss
- Reports with GST CSV export, stock movement and sales ageing
- OCR scan simulation for purchase bills and expense entry
- Online store catalog, aorder conversion, WhatsApp campaign actions and smart ad copy
- Business profile, role-based access, launch toggles, JSON backup/import and PWA manifest

This is a front-end product build using browser storage. For production, connect the same workflows to authenticated backend APIs, payment provider webhooks, GST/e-invoice APIs, cloud backup, and role-based server permissions.
