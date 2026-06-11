# Vivo Care Connect - Interactive Prototype

A clickable proof-of-concept prototype for **Vivo Care Connect**, an internal operations tool that
lets [Vivo](https://vivofitness.com) (live virtual small-group strength training for adults 55+)
exchange exercise referrals and progress reports with healthcare systems using the
[HL7 FHIR Physical Activity Implementation Guide](https://build.fhir.org/ig/HL7/physical-activity/).

**Live demo:** https://mdgibbons2.github.io/vivo-care-connect/

## What it shows

Vivo acting as a **Light Service Provider** (per the PA IG):

- **Dashboard** - referral pipeline KPIs, connected care managers, activity feed
- **Referrals** - one worklist for referred patients: referral status workflow (New, Accepted,
  In Progress, On Hold, Completed, Rejected) alongside Vivo membership status, classes attended,
  and next report due. The unified detail screen has patient/referral/messages panels, accept and
  decline flows, the attendance log with FHIR sync status, and the report actions
- **Enroll member** - 3-step wizard converting a referral into a Vivo member (plan, exercise level,
  baseline assessment, HubSpot/Momence sync)
- **Submit progress report** - Exercise Vital Sign measures computed live from the included class
  sessions, with an honest FHIR preview: a PA IG-conformant transaction Bundle (per-session
  activity-measure Observations, the three weekly EVS rollups with derivedFrom links, and the
  Task update carrying businessStatus and notes) built from the form state in real time. Warns
  when the selected week was already reported; sending appends to the report history
- **Submitted reports** - per-referral report history on the detail screen (sent date, type,
  period, measures) with a Details modal showing the FHIR Bundle as sent
- **Close out referral** - final report with measures vs baseline
- **Connections** - care manager FHIR endpoint management (SMART Backend Services)
- **FHIR activity log** - request/response log with full FHIR payloads

All patient data is fictional sample data.

## Running it locally

It is a static page - no build step - but it must be served over HTTP (Babel standalone fetches the
JSX files via XHR, which browsers block on `file://` URLs). From the repo folder:

```
python3 -m http.server 8080
```

then open http://localhost:8080/. Any other static server (`npx serve`, VS Code Live Server) works
too. An internet connection is required: React, ReactDOM, Babel standalone, and Remix Icon load
from public CDNs.

## Notes

- Designed in [Claude Design](https://claude.ai/design) and exported as a handoff prototype; this is
  mockup-quality code intended for demos and implementation reference, not production use.
- `.nojekyll` is required so GitHub Pages serves the underscore-prefixed `_ds/` design-system folder.
