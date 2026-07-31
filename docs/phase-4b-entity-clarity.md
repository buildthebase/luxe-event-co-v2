# Phase 4B.16 — Entity Clarity

Date: July 27, 2026  
Status: Implemented with a future parent-brand rename foundation

## Canonical entity vocabulary

The current public entity model is:

- **Luxe Event Co.** — the parent organization and coordinating inquiry point;
- **Luxe Coffee Bar** — the mobile coffee and espresso service division;
- **Luxe Sweet Cart** — the live dessert-cart service division;
- **Luxe Seating Rentals** — the event and seating-rental division;
- **Luxe Café Cart Experience** — the full public name for the intimate coffee
  format, with Café Cart Experience and Café Cart permitted after context is
  established; and
- **Luxe Signature Coffee Bar Experience** — the full public name for the
  larger coffee format, with Signature Coffee Bar Experience and Signature
  Coffee Bar permitted after context is established.

Toronto is the primary city. The Greater Toronto Area is the primary region,
with GTA permitted as the abbreviation after or alongside the complete regional
name. Southern Ontario is an extended-travel context for select larger events,
not a universal standard service area.

## Relationship model

Luxe Event Co. is the parent organization behind Luxe Coffee Bar, Luxe Sweet
Cart, and Luxe Seating Rentals. Each division can be requested independently.
Two or more divisions can be coordinated through one Luxe Event Co. inquiry and
proposal journey without becoming a fixed package.

The Café Cart Experience and Signature Coffee Bar Experience belong to Luxe
Coffee Bar. They are service formats, not separate organizations or parent-level
divisions.

The seven current event categories remain:

1. Weddings
2. Corporate Events
3. Brand Activations
4. Baby Showers
5. Bridal Showers
6. Birthdays
7. Private Events

These are service contexts and indexable page categories, not individual
publicly bookable `Event` entities.

## Public identity

Organization-level contact and service-area references continue to derive from
the shared site configuration:

- bookings@luxeeventco.ca
- +1 647-869-1352
- https://luxeeventco.ca
- Toronto and the approved Greater Toronto Area cities
- select larger events elsewhere in Southern Ontario, subject to review

Schema, metadata, visible copy, the footer, local-search configuration, and
inquiry guidance must continue to use these shared sources rather than creating
page-specific variants.

## Answer-first rule

Entity clarity supports an answer; it does not replace one. Question-led
content follows this order:

1. answer the prospect’s industry, planning, commercial, or logistical
   question;
2. explain the factors that affect the answer;
3. establish the relevant Luxe division or parent relationship naturally; and
4. link to the definitive service, event, policy, or inquiry page.

A corporate relationship statement should lead only when the relationship
itself is the question.

## Current corrections

- Independent and coordinated-booking answers now use the complete division
  names when establishing the relationship.
- Brand Activation copy now names Luxe Event Co. rather than using an ambiguous
  parent-company or standalone “Luxe” reference.
- The topic entity previously called “Multi-service packages” is now
  “Coordinated multi-service experiences.” This reflects the actual model and
  avoids suggesting a universal fixed package.

## Future parent-brand rename foundation

The current name remains Luxe Event Co. until a replacement is approved. The
entity system separates mutable public naming from stable internal identity.

Stable by default:

- canonical route structure;
- organization schema fragment identifiers;
- division and service internal keys;
- analytics event names; and
- event-category slugs.

Controlled during a future rename:

- public organization and site names;
- alternate names;
- metadata titles and descriptions;
- visible parent-brand references;
- Organization and WebSite schema names;
- logo, favicon, and social assets;
- public contact identity where applicable; and
- Google Business Profile, social, directory, and corporate-material records.

A future rename must receive an approved replacement name, punctuation, identity
assets, effective date, legal-versus-public-name decision, domain decision, and
external-profile plan. It must not silently change stable URLs or `@id` values
unless a separate migration decision requires it.

## Bloat and integrity controls

- No entity glossary or corporate-history section was added to public pages.
- No new route or schema type was created.
- No division was presented as a separate parent organization.
- No event category was converted into `Event` schema.
- No unsupported geography or contact detail was introduced.
