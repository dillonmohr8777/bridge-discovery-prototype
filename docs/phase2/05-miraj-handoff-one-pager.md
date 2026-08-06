# Bridge — Miraj Handoff (Phase 2 → Phase 3 contract input)

**Date:** 2026-08-06  
**From:** Dillon (product / UX / front-end)  
**To:** Miraj (backend / platform)

## What is locked on the front-end side for review
- Five primary routes: Home, Community News, Create, My Profile, Explore
- Role/visibility matrix baseline (see `02-role-and-field-permission-matrix.md`)
- Journeys A–E with acceptance criteria
- Review prototype on Trusted Current stack (not Kimi)

## Entities to model
`User`, `Organization`, `Membership`, `RoleGrant`, `Verification`, `ProfileField`, `ResponsibleContact`,  
`Post`, `Asset`, `Audience`, `PostAudience`, `ModerationState`,  
`ExploreRecord`, `Location`, `Category`, `Product`, `Brand`, `Strain`, `Favorite`,  
`IntroductionRequest`

## Auth claims required
user ID, age eligibility, membership status, organization ID, organization verification state, role, delegated permissions, state/license eligibility, admin scope.

## API behaviors for vertical slice (Promotion + protected profile)
1. Return current user + verified authorization claims  
2. Create upload intent; validate type/size; scan; return processing state  
3. Persist post with one or more audiences; reject protected content targeted at public  
4. Return public vs protected profile projections  
5. Record responsible-contact confirmation (actor, time, next-due)  
6. Search Explore with filters + favorite state  
7. Create permissioned introduction request without revealing protected contacts  

## Storage / uploads
PNG, JPEG, WebP, PDF; max 25 MB in prototype rules; malware scan + processing state in production.

## Audience rules
Multi-select; protected detail disables Adults 21+; **server must enforce**.

## Non-goals for this handoff
Live marketplace data, production billing, HR module, final legal policy text.

## Ask from Miraj
1. Confirm or revise API behaviors  
2. Agree vertical slice + staging target date  
3. Publish auth claims list you will enforce  
