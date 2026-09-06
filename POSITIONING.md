# LGO — Dead Quote Recovery: site positioning brief

Built 2026-09-05 from Gibby's offer doc, his cold-call script, and his six answers.

## The bar answer

"Detail and PPF shops send about sixty quotes a month and book twelve. The other forty-eight sit in the owner's phone forever. At a $2,400 ticket that's over a hundred grand a month of work they already paid to attract. I go get it back. If I don't book them ten appointments in three weeks, they don't pay me."

If they say "so you do marketing": "Every shop has marketing, they run ads. None of them have a sales department. I'm the sales department, and I only work people who already asked for a price."

## Why this framing and not the alternatives

- **Consultant, not marketer.** Gibby's answer to "why you over the alternative" was that the alternative is generic AI follow-up bots. So the site's enemy is the bot, not other agencies. He is positioned as the person who reads the quote and writes like the shop, which no bot can do. The About section leans on his outsider angle: never ran a shop, been inside dozens.
- **Money before mechanism.** Every number on the site is in dollars of quoted work, never "appointments." The calculator does this in the visitor's own numbers, which is the doc's core sales move (he does the math himself).
- **No dollar fee on the page.** The guarantee is stated in full because it is the biggest trust lever. The fee is saved for the call after he's seen the file, matching the script ("I'd still want to see the file first").
- **No proof section.** He has no results yet. Fabricating would violate the genuine-voice rule. The calculator and the side-by-side message comparison do the proof job for now. Add a scorecard case study the moment the first client finishes.
- **AI is invisible.** The word never appears except as the enemy. Product is booked appointments.
- **"When we'll tell you no."** Straight from the kill criteria in the doc. Reads as confidence and pre-qualifies out the shops that would expose the guarantee.

## Journey (single page, top to bottom)

1. Hero: "You already paid for the customer. He just went quiet." Live ledger animation shows grey dead quotes flipping to green booked slots.
2. Ticker: the last things customers say before disappearing. Instant recognition for any owner.
3. The number: three sliders, monthly and yearly unworked quote value, ten-bookings value at their ticket.
4. Why it sits there: four leaks (follow-up stops at one, owner is the sales dept, slow season, no scoreboard).
5. Bot vs. us: two phone mockups, generic sequence vs. a message with name, truck, package, price, what he said last.
6. How it works: five-step 21-day process, scroll-driven. Steps check off down a green track as the reader passes them. Nothing collapses, no clicks, no timer. Progress gauge on desktop only.
7. Three kinds of quiet: the three segments, each with a sample message.
8. The deal: four terms plus the "when we'll tell you no" box.
9. FAQ: the five objections from the script, answered in his voice.
10. About: the outsider line.
11. CTA to number.html.

## number.html

Name, email, cell, shop, software, bays, "how many went quiet last year" dropdown (his qualifying question), then three numbers. Result shows on screen instantly. Posts to Netlify Forms once deployed; swap the fetch block in site.js for the quiz/resource API later.

## Motion borrowed from auxia.io

Sequential workflow with check states (process section), variant cards (segments), touchpoint marquee (ticker), big-number callouts (calculator), scroll reveals throughout. Nothing else.

## Build notes

- Static HTML/CSS/JS, no build step. Deploy root = this folder.
- Verified in headless Chrome at 437px: zero layout shifts through the process section. Ledger row and footer heights are pinned so the hero animation never changes page height.
- The form result panel's `.done` rules are scoped to `.form-card` because the step components also use a `done` class. Do not unscope them.

## Open items for Gibby

- Brand: site uses "LGO" mark + "Dead Quote Recovery." Confirm or give a name and domain.
- Where form submissions should go (currently Netlify Forms; needs an email or sheet).
- The sample shop "Apex PPF" and "Dan" in the message mockups are placeholders. Fine as examples, or swap for a real early client.
- First real scorecard becomes the proof section.
