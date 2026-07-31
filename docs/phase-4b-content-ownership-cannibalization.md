# Phase 4B.17 content ownership and cannibalization review

## Outcome

Each priority route now has one primary intent and a defined answer boundary in
`app/aeo-content-ownership.ts`. No new route was created.

## Definitive ownership

- Home owns the parent-brand introduction and journey routing.
- Experiences owns broad service selection and coordinated-provider comparison.
- Coffee Bar, Sweet Cart, and Seating Rentals own their respective mechanics.
- Events owns broad occasion selection and guest-flow principles.
- Each event page owns planning that is specific to that occasion.
- FAQ owns shared booking, payment, travel, venue, and operating policies.
- Gallery owns permissioned visual proof.
- Inquire owns inquiry preparation and the proposal handoff.

Supporting pages may state only enough context to help the reader decide whether
to follow a descriptive link to the definitive answer.

## Changes made in this step

The main FAQ previously contained full Coffee Bar, Sweet Cart, and Seating
Rentals categories. Those 21 service-mechanics answers were removed because the
three service pages already provide the definitive answers. The FAQ is now a
26-answer shared-policy resource covering booking, travel, setup and logistics,
and cross-service customization.

Complete retainer and payment terms were removed from Weddings and Private
Events. Generic setup and takedown answers were removed from Baby Showers,
Birthdays, and Private Events. Those pages already link to FAQ and retain only
occasion-specific operational context.

The FAQ description, page brief, answer count, and structured-data input now
follow the narrower ownership model. `FAQPage` data still derives from the
visible FAQ array, so visible answers and schema remain identical.

## Competing-intent review

All 16 priority routes were reviewed. No unresolved competing intent is recorded.
Similar phrases may remain when they perform different jobs—for example, a
service page explains what a setup includes while an event page explains where
that setup fits in the occasion. A complete shared answer must not be copied.

## Route controls

No long-tail, city-variant, or occasion-name-variant routes were added. Deeper
subjects remain future-resource candidates until they have a distinct user need,
first-party evidence, and a non-competing internal-link role.
