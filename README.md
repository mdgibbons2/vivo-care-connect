# Vivo Care Connect - Interactive Prototype

A clickable proof-of-concept prototype for **Vivo Care Connect**, an internal operations tool that
lets [Vivo](https://vivofitness.com) (live virtual small-group strength training for adults 55+)
exchange exercise referrals and progress reports with healthcare systems using the
[HL7 FHIR Physical Activity Implementation Guide](https://build.fhir.org/ig/HL7/physical-activity/).

**Live demo:** https://mdgibbons2.github.io/vivo-care-connect/

## What it shows

Vivo acting as a **Light Service Provider** (per the PA IG):

- **Dashboard** - referral pipeline KPIs, connected care managers, activity feed
- **Referrals** - inbound referral inbox with status workflow (New, Accepted, In Progress, On Hold,
  Completed, Rejected), referral detail with patient/referral/messages panels, accept and decline flows
- **Enroll member** - 3-step wizard converting a referral into a Vivo member (plan, exercise level,
  baseline assessment, HubSpot/Momence sync)
- **Members** - referred-member roster and per-member attendance log with FHIR sync status
- **Submit progress report** - auto-calculated Exercise Vital Sign measures with FHIR JSON preview
- **Close out referral** - final report with measures vs baseline
- **Connections** - care manager FHIR endpoint management (SMART Backend Services)
- **FHIR activity log** - request/response log with full FHIR payloads

All patient data is fictional sample data.

## Running it

It is a static page - no build step. Open `index.html` in a browser, or serve the folder with any
static file server. React, ReactDOM, Babel standalone, and Remix Icon load from public CDNs.

## Notes

- Designed in [Claude Design](https://claude.ai/design) and exported as a handoff prototype; this is
  mockup-quality code intended for demos and implementation reference, not production use.
- `.nojekyll` is required so GitHub Pages serves the underscore-prefixed `_ds/` design-system folder.
