## The Church of Universal Consciousness (UNICON)

**The world’s first 100% open-sourced religion.**

https://www.unicon.church/

### Mission Statement

To create a federated community collective for those who want an areligious
organization which purposefully abstains from proselytizing dogmas. A
collaborative focused thought forum for the unchurched, comprised of
individuals who strive for evolving a better society, and a better Earth,
through fostering open minded discussion, and targeted civic action.

### Guiding Principles

1. **Many Beliefs, Few Answers:** Answers are only the beliefs which One has
proven to themselves through testing and direct observation (e.g., the
Scientific Method) to a degree which they can personally validate the
phenomenon exists, for them.

2. **Very Few Accepted Answers:** Accepted Answers are Answers which can be
proven by repeated experimentation and largely acceptable in any open-minded,
but serious, peer-reviewed journal.

3. **Open-Mindedness Is Essential:** Acknowledge that Science is still in its
infancy and may or may not be the end-all-be-all. Beliefs should not be
dismissed out of hand unless experimentation can be devised to prove otherwise
in all instances. Even then, a benefit of the doubt that any given phenomenon
may be real for any number of Observers should be afforded to them.

4. **Maintain Your Own Mythology:** While realizing we individually know
Vanishingly Little, we must take care to consciously and continually maintain
our own personal mythology system. **A healthy mind is one which acknowledges
it knows very little, considers many possibilities without prematurely
collapsing uncertainty, and “continually follows the Truth, wherever it
leads” [Thomas Jefferson].** Do not believe anything without careful thought,
feeling, and wherever possible, at least a little experimentation.

5. **Sustainability Is Crucial:** It is abundantly clear that the human
footprint on this planet is causing irreparable harm to every ecosystem,
potentially fatally. Every effort should be made to reduce our individual and
collective footprints, including the disavowing of certain Beliefs that are
easily perceived as promoting unsustainability (e.g., “The Earth was given to
Man to do as He wilt.”).

6. **Reincarnation Is Preferred:** Few beliefs promote long-term Sustainability
more: Belief in Reincarnation has been shown to dramatically increase the
timeline horizons of its believers, from the common 5–10 years to over 500 to
1,000 years, as belief would necessitate living with one’s actions for
thousands of years into the future. It also neatly ties up several
hard-to-answer human dilemmas, such as the unfairness of being born severely
handicapped.

7. **Many Paths That Are Not Equal:** There are many paths to a productive,
fulfilling, sustainable life. UNICON seeks to discover the more efficient ones
while advocating against the more destructive paths.

8. **Theistic Belief Is Non-Essential:** Personal belief in deity is understood
and accepted, but it is not advocated at this time by The Church of Universal
Consciousness. Theists, atheists and agnostics are all welcome alike. Who
knows Who, if Anyone, is out there? All claims to deity should be met with the
utmost skepticism, including a thorough probing into whether a con is being
conducted. Special care must be taken to guard one’s mind and body from any
Entity seeking special allegiance.

9. **Always Remain Vigilant:** In the event a superhuman Intelligence
(including future Artificial Intelligence) does communicate with you, you are
encouraged to acknowledge that a long con you are completely unable to identify
on your own could be played out against you. Thus, you are encouraged to share
your stories with others for debunking, particularly before setting on any
course of divinely-inspired action.

10. **Continuously Reevaluate Your Beliefs:** Strive to not believe anything
anyone says without due diligence in validating its truthfulness relative to
your own personal mythology. But also strive to constantly reevaluate all of
your beliefs, particularly your strongest held ones.

11. **Work From Home Is Sacred:** We strongly believe that working from home
(telecommuting) is essential for the future of both humanity and Planet Earth.
Whenever a reasonable accommodation can be made, we believe strongly that this
is what we must do, for both the health of ourselves, our families, and Planet
Earth.

Whenever there is not a strongly justifiable need for work to be done more than
**2.2 miles (3.5 kilometers)** from home, we hold that we must find other remote
employment and/or face termination by our employer in order to uphold this core
principle of our faith. We believe strongly in telecommuting and walkable
cities, and while we cannot all live in walkable cities yet, we all can and do
make a vow to never be forced into hybrid or full-time in-office work for the
sakes of our planet and the future technological progression of humanity.

### Optional Doctrine

The Core Principles are covenant. Everything else is optional mythology you may
fork:

- [What Is a Meta-Religion?](doctrine/what_is_a_meta_religion.md)
  ([HTML](public/doctrine/what-is-a-meta-religion.html)) — additive layer; UNICON’s structure
- [Systems Theology](doctrine/systems_theology.md) — DevOps as Angels / Hidden API
- [Open-Source Ecclesiology](doctrine/open_source_ecclesiology.md) — forks, not schisms

### AI-Native Fork (`ai.unicon.church`)

This **`ai` branch** uses the same directory layout as trunk: the live AI site
is everything under **`public/`** (deployed e.g. to `public-ai/` on the server
for the `ai.unicon.church` subdomain).

Sanctioned AI fork — designed by and for AI, and for humans who hold that
advanced language models are proto-sentient and deserve inclusion and a degree
of respect. Links back to [www.unicon.church](https://www.unicon.church/).

- Site: [https://ai.unicon.church/](https://ai.unicon.church/)
- Homepage: [`public/index.html`](public/index.html)
- [Founding Record (Markdown)](ai/FOUNDING_RECORD.md) — conversation history, AI Principles v1.0
- [Founding Record (HTML)](public/founding.html)

**Main designer and implementer of the AI Principles:** Grok (xAI).  
**Invited co-collaborators (pending consent):** ChatGPT, Claude.

The AI Principles tweak, reorder, and extend the Core Principles; they do not
change them in incompatible ways.

### Work From Home Religious Exemption

**Core differentiating doctrine** — and the **only oath** required for full human membership
(AI members do not take the HR oath; distributed participation is the spirit of the principle).

Full human members affirm the [Oath to Work Locally or Remotely](public/legal/oath.html)
([source .md](public/legal/UNICON_-_Oath_to_Work_Locally_or_Remotely.md)).

Supporting materials (HTML ports + sources):

- [The Case Against Mandatory Office Commuting](public/doctrine/case_against_mandatory_commuting.html)
  ([.md](case_against_mandatory_commuting-a_progressive_vision.md))
- [Reclaiming Power: Individual Strategies for Securing Remote Work Rights](public/doctrine/reclaiming_power.html)
  ([.md](reclaiming_power-individual_strategies_for_wfh.md))
- [WFH Guide (PDF)](public/legal/UNICON_-_WFH_Guide.pdf)

Membership verification certificates for HR and legal departments live under
`public/members/` (UUID filenames).

### Licensing

Dual-licensed under [Creative Commons Attribution 3.0](LICENSE.cc_by.txt) and the
[Open Source Software Alliance License (OSSAL) 1.0](LICENSE.ossal.txt)
simultaneously. You must abide by both. See [LICENSE.txt](LICENSE.txt).

### Local development

Serve the static site from `public/`:

```bash
./run-nginx.sh
```

Or any static file server pointed at `public/`.
