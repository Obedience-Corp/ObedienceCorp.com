---
title: "I Worked on 54 Repositories in One Month"
date: "2026-10-21"
author: "Lance Rogers"
summary: "Eighteen months with AI agents and Festival: 3,723 merged PRs, work across 151 code repositories, and hundreds of plans. How I kept that much work moving."
canonical: "https://blockhead.consulting/blog/a-year-of-festival-measuring-ai-development"
image: "/media/blog/festival-year/portfolio-overview.png"
---

In August 2026, I had commits landing in 54 different repositories. In September, 48. In the first three weeks of October, 37.

I'm one developer. I've been working with coding agents since April 2025, and for more than a year I've been building and using [Festival](https://fest.build) to keep the work organized across projects. By October 21, 2026, 3,723 pull requests opened through my personal and agent accounts during that period had been merged.

## Fifty-four repositories in a month

August accounted for 2,768 commits across those 54 repositories. Twenty-eight of them received at least ten commits that month. Over the full eighteen months, the local code scan found 19,679 commits by my identities.

These charts cover 151 repositories available on this machine where I or my agents made commits. They include repositories in Obedience Corp, Blockhead Consulting, Guild Ventures, and Shrapnel, plus my personal ones. I also worked on other machines, so these charts can miss work recorded elsewhere. A repository counts once per month when one of my identities has a commit in it.

<picture>
  <source media="(max-width: 600px)" srcset="/media/blog/festival-year/parallel-work-mobile.svg">
  <img src="/media/blog/festival-year/parallel-work.svg" alt="Monthly selected-author activity across all 151 scored local repositories, peaking at 54 active repositories in August 2026; October stops at October 21." loading="lazy">
</picture>

The amount of work is absurd. In my [first post about this](https://blockhead.consulting/blog/1_million_per_week_with_claude_code), I described eight projects in seven weeks. I was working ten to fourteen hours a day on a backlog of things I'd wanted to build for years. Eighteen months in, I've kept taking on projects while continuing the ones I already had. Each new project adds to the releases, debugging, integration work, and maintenance I'm already handling.

## How I keep the work moving

In those first seven weeks, I was already trying to manage three to five projects at once with hundreds of Markdown documents. I kept telling agents where to find their instructions. I archived finished tasks by hand so the next session wouldn't pick up an obsolete plan.

With this many projects, keeping track of where each one stands becomes a job of its own. Each new session needs the goal, earlier decisions, what's finished, and what still needs checking. So do I when I come back to a project.

A [Festival camp workspace](https://docs.fest.build/cli-reference/camp/) keeps related repositories, research, decisions, and work records together. I track goals as [work items](https://docs.fest.build/methodology/work-items/). Intents capture work, designs lay out an approach, and explorations investigate questions. I can also define custom types. This article is a blog work item, with its drafts, research, and review history in one place.

A festival is the type of work item I use for larger goals. It breaks the work into phases, sequences, tasks, and checks, with a plan and progress record that carry across sessions. Smaller work can use a short description or a [standalone workflow](https://docs.fest.build/methodology/workflows-and-gates/#standalone-workflows).

I choose the structure based on how big the goal is, what could go wrong, and the model doing the work. Even a small change needs careful review if a mistake would be expensive. A different model may need a different task breakdown or more checkpoints for the same goal. Straightforward work can stay lightweight.

[`camp workitem`](https://docs.fest.build/cli-reference/camp/camp_workitem/) brings those types into one view, so I can find the goal and its records when I return. [Fest](https://docs.fest.build/cli-reference/fest/) supplies the next task or workflow step. The plan and progress stay in files with the project.

I run independent sessions on different projects. I decide what to build, work through the architecture, and review results. I can focus on another project while an agent continues its work, then step in when it needs a decision. When a session ends, the next one has a place to pick up.

The local inventory contains 451 festivals across 28 workspaces, with 302 marked complete. Intents, designs, explorations, and custom work items have not been tallied here. The festival inventory itself includes development plans, research, examples, and repeated workflow runs.

Festival Activity inspected 345 local repositories and found 30,302 commits and 41,619 Festival progress events in its broader scan. Those events record steps through the work; they are separate from the count of completed plans. The retained event history begins in December 2025.

<picture>
  <source media="(max-width: 600px)" srcset="/media/blog/festival-year/festival-work-mobile.svg">
  <img src="/media/blog/festival-year/festival-work.svg" alt="Monthly local commits and Festival progress events across 28 camps: 30,302 commits and 41,619 events through October 21, 2026." loading="lazy">
</picture>

## One developer, three GitHub identities

I created [obey-agent](https://github.com/obey-agent) and [veronica-agent](https://github.com/veronica-agent) to get the noise out of [my own GitHub account](https://github.com/lancekrogers). I was producing work at the scale of a large team, and I needed identities like a team for things like code reviews. In my experience, agents seem to catch more issues when they think they're reviewing someone else's code.

The separate identities have also come in handy for reviewing my own work: the reviewing account can request changes on PRs opened by another account. GitHub returns 1,055 pull-request review contributions for obey-agent in this period. These accounts are part of how I work, so the measurements include all three identities.

In a [manager-worker experiment](https://blockhead.consulting/blog/agent-teams-lose-to-single-sessions), I ended the run at 37 of 67 tasks because the worker rushed checks and I had to review the manager as well as the implementation. I usually give each project its own session and a work item I can inspect.

## What a festival looks like

The replay below shows a festival for building a coding-practice library in the [CodeSignal Practice Simulator](https://github.com/Festival-Examples/codesignal-practice-simulator). One goal is organized into seven phases, eight sequences, and 50 tasks.

The tree shows how the work fits together. Phases divide the goal into major stages, from understanding and planning the work through implementation, verification, and review. Within implementation phases, sequences group related tasks. As the replay runs, completed work gets checked off, active work is highlighted, and upcoming work stays visible.

Review gates are part of that same structure. The “Judge” rows show the [judge hook](https://docs.fest.build/cli-reference/fest/fest_workflow_judge/) checking evidence at approval checkpoints.

<figure class="retrospective-proof">
  <video controls muted playsinline preload="metadata" poster="/media/blog/festival-year/codesignal-practice-library-poster.png" aria-label="Recorded progress through the CodeSignal practice-library festival"><source src="/media/blog/festival-year/codesignal-practice-library.mp4" type="video/mp4"><a href="/media/blog/festival-year/codesignal-practice-library.gif">Open the recorded progress GIF</a></video>
  <figcaption>A festival's structure and progress, shown through the <a href="https://github.com/Festival-Examples/codesignal-practice-simulator/tree/main/festivals/codesignal-practice-library-CP0002">CodeSignal practice-library example</a>. This replay shows recorded progress. <a href="/media/blog/festival-year/codesignal-practice-library.gif">Open the full-size GIF.</a></figcaption>
</figure>

This gives me a record to return to when I switch projects: how the goal is divided, what's finished, and what still needs work or review. The [public azx camp](https://github.com/Festival-Examples/azx-camp) has another festival replay for work on [my Helix fork](https://github.com/lancekrogers/helix).

## What eighteen months added up to

Across the three accounts, I opened 3,826 pull requests between April 1, 2025 and October 21, 2026. By that date, 3,723 had merged, six were still open, and 97 had closed without merging.

I pulled those counts from GitHub across personal and organization repositories, including private ones each account could access. They don't depend on which repositories I have on this machine.

<div class="article-table" role="region" aria-label="Article data table" tabindex="0">

| GitHub identity | PRs opened | PRs merged |
| --- | ---: | ---: |
| [lancekrogers](https://github.com/lancekrogers) | 3,636 | 3,544 |
| [obey-agent](https://github.com/obey-agent) | 127 | 118 |
| [veronica-agent](https://github.com/veronica-agent) | 63 | 61 |
| **All three** | **3,826** | **3,723** |

</div>

GitHub records 41,055 contributions across those accounts, with activity on 470 distinct days. That includes private contribution counts.

Alongside Festival, I've been building a local voice assistant, connecting software to physical devices, and writing tools for running agents. The [CRE Risk Router](https://github.com/lancekrogers/cre-risk-router) took [second place in Autonomous Agents at Chainlink Convergence](https://chain.link/hackathon/winners/cre-risk-router).

In the first post I said development had become fun again. I got into software to build cool things, and a lot of the things I wanted to build were too much to take on alone. I'm still working through that backlog. The [CodeSignal build records](https://github.com/Festival-Examples/codesignal-practice-simulator/tree/main/festivals) and [azx camp](https://github.com/Festival-Examples/azx-camp) are public examples you can read and run.

## Appendix: the local code inventory

The table below lists every scored repository from the [`camp leverage-all`](https://github.com/Obedience-Corp/camp-leverage-all) scan I ran on this machine on October 21, 2026. I worked on other machines too, so this inventory covers the code available here and can omit work from elsewhere. The expanded scan found 166 repository identities across all 28 registered camps and returned 151 with commits by the selected identities. All 151 had activity in the reporting window. Repository ownership is unrestricted, and inactive camps are included, so Shrapnel’s Hermes and Hermes Infrastructure appear here too. The code and dollar columns measure the current checkout; the commit column covers each repository's full selected-author history, which reaches back to June 2023.

Across the reporting window, those repositories contain 19,679 commits by my identities, 13,427,862 text lines added, and 3,104,098 deleted. The additions include documentation, generated and imported files, and work I later replaced. The October 21 code inventory estimates 6,486,582 current code lines attributable to those identities. That includes code imported for existing-site work: two archived website exports account for 2.15 million lines. Thirteen repositories have more than 100,000 attributable code lines; another 39 have between 10,000 and 100,000.

Scroll within the table to see every row. The [downloadable report](/data/coding-agent-retrospective.json) also contains each repository's monthly activity.

### All scored repositories

<div class="article-table" role="region" aria-label="Repository inventory" tabindex="0">

| Repository | Code lines | COCOMO estimate | Commits, full history |
| --- | ---: | ---: | ---: |
| blockhead-consulting/drwise-plastix | 1,316,504 | &#36;50,931,752 | 3 |
| blockhead-consulting/drwisehair-plastix | 832,429 | &#36;31,474,576 | 2 |
| obedience-corp/obey | 493,889 | &#36;18,193,151 | 1,902 |
| guild-ventures/guild-core | 412,864 | &#36;15,115,039 | 572 |
| obedience-corp/camp | 404,126 | &#36;14,738,040 | 2,881 |
| obedience-corp/obey-voice | 357,261 | &#36;12,948,821 | 1,740 |
| obedience-corp/festival-app | 339,105 | &#36;12,258,751 | 1,861 |
| obedience-corp/fest | 230,065 | &#36;8,157,174 | 1,790 |
| obedience-corp/festival-activity | 132,257 | &#36;4,561,261 | 342 |
| blockhead-consulting/cryptofraud-ai-django | 119,193 | &#36;4,089,391 | 32 |
| blockhead-consulting/bizscraper | 109,367 | &#36;3,761,333 | 6 |
| obedience-corp/keepshot | 105,549 | &#36;3,599,334 | 701 |
| lancekrogers/habitat | 105,353 | &#36;3,592,316 | 299 |
| lancekrogers/codesignal-practice-simulator | 99,698 | &#36;3,390,128 | 49 |
| lancekrogers/guild | 75,623 | &#36;2,536,191 | 10 |
| brainyard-ai/brainyardapp | 71,472 | &#36;2,393,284 | 325 |
| obedience-corp/obey-voice-apple | 57,276 | &#36;1,894,378 | 339 |
| obedience-corp/guild-chat | 53,476 | &#36;1,762,634 | 238 |
| obedience-corp/campaign-companion-ios | 52,298 | &#36;1,721,887 | 174 |
| lancekrogers/clipsync | 51,075 | &#36;1,680,114 | 96 |
| lancekrogers/reachout | 48,288 | &#36;1,583,531 | 68 |
| obedience-corp/brainshare | 44,436 | &#36;1,464,644 | 119 |
| lancekrogers/claude-code-go | 44,244 | &#36;1,444,663 | 70 |
| lancekrogers/guild-v2 | 42,335 | &#36;1,379,208 | 9 |
| blockhead-consulting/blockhead.consulting | 40,091 | &#36;1,302,550 | 321 |
| lancekrogers/spotter | 39,192 | &#36;1,271,899 | 29 |
| obedience-corp/festival-installer | 38,682 | &#36;1,254,526 | 314 |
| blockhead-consulting/wp-migration-plastix | 32,442 | &#36;1,042,938 | 21 |
| obedience-corp/festival | 30,940 | &#36;992,305 | 741 |
| obedience-corp/agent-stream-dbg | 28,666 | &#36;915,864 | 192 |
| blockhead-consulting/algoscales | 28,203 | &#36;900,338 | 61 |
| lancekrogers/guild-scaffold | 26,226 | &#36;834,210 | 41 |
| obedience-corp/camp-scaffold | 26,225 | &#36;834,155 | 51 |
| obedience-corp/keepshot-editor | 25,383 | &#36;806,056 | 70 |
| lancekrogers/lance-thing3 | 22,197 | &#36;700,171 | 8 |
| lancekrogers/signal-harvester | 21,996 | &#36;693,516 | 69 |
| festival-examples/example-camp-hardening-festival | 19,378 | &#36;607,113 | 10 |
| blockhead-consulting/blogkit | 19,060 | &#36;596,656 | 4 |
| lancekrogers/job-search-automation | 18,430 | &#36;575,966 | 70 |
| obedience-corp/fest-direction | 17,680 | &#36;551,381 | 33 |
| obedience-corp/camp-graph | 17,321 | &#36;539,631 | 158 |
| obey-agent/obey-agent-code-reviewer | 16,770 | &#36;521,621 | 27 |
| neonmachine-shrapnel/hermes | 15,495 | &#36;510,019 | 667 |
| lancekrogers/technical_videos::projects/obey-campaign-activity-reel | 15,464 | &#36;479,053 | 4 |
| lancekrogers/jobsearchcampaign::projects/paxel | 15,347 | &#36;475,248 | 1 |
| lancekrogers/tcount | 13,869 | &#36;427,310 | 146 |
| lancekrogers/micbridge | 12,980 | &#36;398,603 | 45 |
| veronica-agent/cans | 12,952 | &#36;397,694 | 54 |
| lancekrogers/helix | 12,709 | &#36;440,269 | 56 |
| lancekrogers/lazysql | 12,205 | &#36;387,841 | 30 |
| lancekrogers/grok-go-sdk | 11,698 | &#36;357,365 | 109 |
| blockhead-consulting/agent-defi | 11,481 | &#36;350,408 | 55 |
| obedience-corp/obey-hub | 9,402 | &#36;284,104 | 22 |
| obedience-corp/camp-activity | 9,258 | &#36;279,536 | 13 |
| obedience-corp/obey-campaign::projects/prototypes | 9,174 | &#36;276,874 | 14 |
| obedience-corp/festival-app-design | 8,859 | &#36;266,900 | 41 |
| obedience-corp/agent-simulator | 8,653 | &#36;260,388 | 42 |
| obedience-corp/camp-app | 8,467 | &#36;254,514 | 30 |
| lancekrogers/codex-go | 8,396 | &#36;252,273 | 6 |
| lancekrogers/veronica-voice | 8,304 | &#36;249,372 | 77 |
| lancekrogers/portable-desktop | 8,027 | &#36;240,645 | 2 |
| blockhead-consulting/agent-coordinator | 7,928 | &#36;237,529 | 51 |
| obedience-corp/vercel-fx-go | 7,866 | &#36;235,579 | 25 |
| obedience-corp/obey-shared | 7,428 | &#36;221,825 | 56 |
| lancekrogers/algoscaleplanning | 7,395 | &#36;220,791 | 6 |
| obedience-corp/obey-voice-agent | 7,307 | &#36;218,033 | 16 |
| obedience-corp/obey-quality | 6,967 | &#36;207,439 | 24 |
| obedience-corp/keepshot-licensing | 6,748 | &#36;200,553 | 93 |
| obedience-corp/obc-license-server | 6,584 | &#36;195,438 | 21 |
| blockhead-consulting/dashboard | 6,188 | &#36;183,115 | 33 |
| obedience-corp/qwen3-tts-native | 5,828 | &#36;171,946 | 65 |
| blockhead-consulting/agent-inference | 4,998 | &#36;146,329 | 32 |
| lancekrogers/kindle-userspace | 4,942 | &#36;144,608 | 6 |
| lancekrogers/kotlin-ktor-realworld-example-app | 4,553 | &#36;134,860 | 63 |
| obedience-corp/obediencecorp.com | 4,523 | &#36;131,763 | 196 |
| obedience-corp/obediencecorp-web | 4,471 | &#36;130,173 | 37 |
| lancekrogers/yt_summarizer | 4,332 | &#36;125,927 | 29 |
| obedience-corp/build-util | 4,082 | &#36;118,307 | 8 |
| obedience-corp/obey-search | 3,944 | &#36;114,111 | 7 |
| obedience-corp/camp-buzz | 3,797 | &#36;109,650 | 41 |
| obedience-corp/protos | 3,726 | &#36;107,498 | 177 |
| obedience-corp/gaze | 3,410 | &#36;97,946 | 26 |
| lancekrogers/tree2scaffold | 3,363 | &#36;96,529 | 30 |
| obedience-corp/camp-gh | 3,209 | &#36;91,893 | 12 |
| lancekrogers/etsy-research | 3,031 | &#36;86,549 | 3 |
| [obedience-corp/camp-leverage-all](https://github.com/Obedience-Corp/camp-leverage-all) | 2,994 | &#36;85,445 | 36 |
| obedience-corp/obey-chat | 2,974 | &#36;84,841 | 13 |
| veronica-agent/pad | 2,960 | &#36;84,428 | 30 |
| lancekrogers/yt-channel-pattern-analyzer | 2,916 | &#36;83,104 | 5 |
| blockhead-consulting/cre-risk-router | 2,905 | &#36;82,775 | 32 |
| obedience-corp/obey-agent-economy-remotion-video | 2,825 | &#36;80,377 | 4 |
| lancekrogers/rhflow | 2,804 | &#36;79,756 | 4 |
| lancekrogers/work-index | 2,746 | &#36;78,024 | 45 |
| obedience-corp/festivalfrontend | 2,687 | &#36;76,631 | 81 |
| blockhead-consulting/hiero-plugin | 2,668 | &#36;75,699 | 20 |
| blockhead-consulting/contracts | 2,634 | &#36;74,686 | 16 |
| obedience-corp/festival-wails | 2,459 | &#36;69,485 | 6 |
| lancekrogers/algo-scales-nvim | 2,384 | &#36;67,262 | 9 |
| obedience-corp/fest-run | 2,308 | &#36;65,012 | 5 |
| lancekrogers/recurly-technical-challenge | 2,216 | &#36;62,294 | 17 |
| obedience-corp/fresh | 2,215 | &#36;62,264 | 19 |
| obedience-corp/obey-platform-monorepo | 2,135 | &#36;59,905 | 481 |
| obedience-corp/termcast | 2,094 | &#36;58,698 | 51 |
| obedience-corp/fest-gif | 2,048 | &#36;57,345 | 15 |
| obedience-corp/cursor-agent-go | 2,021 | &#36;56,551 | 28 |
| blockhead-consulting/obey-agent-economy::projects/obey-demo-video | 1,907 | &#36;53,206 | 5 |
| obedience-corp/keepshot-site | 1,761 | &#36;48,938 | 21 |
| obedience-corp/release-operator | 1,758 | &#36;48,850 | 3 |
| lancekrogers/resume | 1,559 | &#36;43,061 | 154 |
| obedience-corp/samantha-cli | 1,552 | &#36;43,287 | 13 |
| lancekrogers/gomod-rename | 1,530 | &#36;42,220 | 9 |
| lancekrogers/mermaider.nvim | 1,498 | &#36;42,657 | 3 |
| veronica-agent/obey-veronica | 1,496 | &#36;41,236 | 19 |
| blockhead-consulting/cryptofraud-ai | 1,340 | &#36;36,733 | 1 |
| lancekrogers/passenger-advocate | 1,253 | &#36;34,233 | 1 |
| lancekrogers/algo-scales-vim | 1,197 | &#36;32,628 | 6 |
| obedience-corp/corp-site | 1,144 | &#36;31,113 | 60 |
| obedience-corp/camp-marks | 1,041 | &#36;28,179 | 6 |
| veronica-agent/link | 1,023 | &#36;27,667 | 5 |
| lancekrogers/json_ical | 751 | &#36;19,999 | 3 |
| blockhead-consulting/website-2.0 | 749 | &#36;19,943 | 1 |
| blockhead-consulting/blogposts | 720 | &#36;19,156 | 6 |
| obedience-corp/marketplace | 697 | &#36;18,489 | 62 |
| lancekrogers/jobsearchcampaign::projects/rearc-ai-quest-original | 663 | &#36;17,546 | 1 |
| lancekrogers/nvim-token-counter | 589 | &#36;15,496 | 9 |
| lancekrogers/kindle-notes-sync | 563 | &#36;14,778 | 5 |
| neonmachine-shrapnel/hermes-infrastructure | 477 | &#36;14,191 | 23 |
| blockhead-consulting/blockhead-logo-extractor | 473 | &#36;12,308 | 2 |
| lancekrogers/openmontage | 449 | &#36;16,250 | 4 |
| lancekrogers/who-keeps-it | 431 | &#36;11,163 | 2 |
| obedience-corp/loop-lab | 415 | &#36;10,729 | 3 |
| obedience-corp/obedience.dev | 396 | &#36;10,214 | 1 |
| lancekrogers/lancekrogers-ai-resume-site | 334 | &#36;9,026 | 2 |
| lancekrogers/technical_videos::projects/camp-dungeon-crawl-2026-04-21 | 300 | &#36;7,631 | 2 |
| lancekrogers/interview-luna-test | 276 | &#36;6,991 | 3 |
| festival-examples/starter-todo-workflow | 249 | &#36;6,275 | 3 |
| lancekrogers/go-reddit | 166 | &#36;5,248 | 3 |
| blockhead-consulting/agent-prediction | 118 | &#36;2,865 | 2 |
| techops-recsys-lateral-hiring/aiengineer-llm-python | 69 | &#36;1,920 | 3 |
| blockhead-consulting/obey-platform | 62 | &#36;1,457 | 2 |
| blockhead-consulting/agent-bags | 56 | &#36;1,310 | 2 |
| ethanplusai/festcourse | 39 | &#36;1,154 | 1 |
| festival-examples/example-campaign::projects/todo-app | 21 | &#36;468 | 1 |
| lancekrogers/lancekrogers | 16 | &#36;351 | 40 |
| lancekrogers/ironwood-intent-escrow | 9 | &#36;192 | 2 |
| festival-examples/civic-permit-navigator | 5 | &#36;104 | 2 |
| festival-examples/community-tool-library | 5 | &#36;104 | 2 |
| festival-examples/research-evidence-map | 5 | &#36;104 | 2 |
| festival-examples/example-campaign-template | 2 | &#36;40 | 1 |
| lancekrogers/brainyard-planning::projects/discord_bot | 0 | &#36;0 | 1 |
| lancekrogers/superpowers | 0 | &#36;0 | 3 |
| **All 151 scored repositories** | **6,486,582** | **&#36;232,173,392** | **19,741** |

</div>

*Current code is attributed using the selected identities' share of Git blame. Dollar rows are rounded independently; the subtotal uses unrounded estimates. Separate repositories may share ancestry or copied code.*

## The native Camp reports

I also ran [`camp leverage --json --no-commit`](https://docs.fest.build/cli-reference/camp/camp_leverage/) in all 28 registered camps, including the three inactive ones. These are the native reports' project counts and code estimates. Projects can appear in more than one camp, and native code counts use a different scope from the personal attribution in [`camp leverage-all`](https://github.com/Obedience-Corp/camp-leverage-all). Adding these rows would overstate the portfolio. They are included so the per-camp output is available alongside the deduplicated scan.

### All 28 Camp reports

<div class="article-table" role="region" aria-label="Article data table" tabindex="0">

| Camp | Project entries | Code lines reported | COCOMO estimate |
| --- | ---: | ---: | ---: |
| obey-campaign | 52 | 2,682,689 | &#36;94,741,695 |
| My_Tools | 33 | 1,130,385 | &#36;33,156,028 |
| obedience-growth-rd | 18 | 2,622,738 | &#36;96,356,957 |
| Obey-Agent-Economy | 17 | 182,402 | &#36;5,977,996 |
| JobSearch | 16 | 238,793 | &#36;7,780,164 |
| BlockheadConsulting | 10 | 100,291 | &#36;3,172,118 |
| Veronica | 8 | 602,281 | &#36;21,433,555 |
| example-campaign | 6 | 287 | &#36;7,093 |
| technical_videos | 5 | 367,314 | &#36;13,163,484 |
| CC_GO_PLANNING | 4 | 68,371 | &#36;2,170,628 |
| Brainyard | 3 | 82,059 | &#36;2,718,246 |
| plastix (inactive) | 3 | 2,181,375 | &#36;83,449,266 |
| David-Overview | 2 | 237,394 | &#36;8,152,148 |
| MusicProd | 2 | 1,048,200 | &#36;39,932,362 |
| Shrapnel (inactive) | 2 | 58,934 | &#36;1,917,872 |
| market-research | 2 | 45,802 | &#36;1,447,058 |
| Brainshare-Planning | 1 | 53,453 | &#36;1,761,838 |
| amex | 1 | 6,295 | &#36;186,441 |
| azx | 1 | 144,714 | &#36;5,013,389 |
| ironman | 1 | 25,595 | &#36;813,127 |
| pair-programming (inactive) | 1 | 1,574 | &#36;43,496 |
| Festival Method Kit | 0 | 0 | &#36;0 |
| ObsidianVault | 0 | 0 | &#36;0 |
| festival | 0 | 0 | &#36;0 |
| festival-demo | 0 | 0 | &#36;0 |
| sarah | 0 | 0 | &#36;0 |
| simulation_campaign | 0 | 0 | &#36;0 |
| writing-books | 0 | 0 | &#36;0 |

</div>

## Numbers and sources

The first article reported 219,400 code lines across eight projects and a &#36;7.76 million COCOMO development-cost estimate. The current local inventory of 151 repositories is 6.49 million attributable code lines with a &#36;232.2 million estimate under the same kind of model. It includes older and archived work, imported site exports, and current development. That figure models the development effort represented by the code; it is not revenue, savings, or a valuation of the projects.

All current measurements were captured October 21, 2026. The activity window runs from April 1, 2025 through October 21, 2026. My first coding-agent project began April 28, 2025, so this is roughly eighteen months of use, displayed in nineteen calendar-month bins. October is partial in every chart.

The commands and raw output are retained in the campaign's article research. The [public measurement file](/data/coding-agent-retrospective.json) contains all 151 code-inventory rows, all 28 native Camp summaries, monthly activity, and coverage notes. Local paths, author email addresses, and raw private GitHub items are excluded from that export.

```sh
camp leverage-all --author-name lance --author-name obey-agent \
  --author-name veronica-agent --timeline month --json
camp leverage --json --no-commit
```

The code scan used [`camp leverage-all`](https://github.com/Obedience-Corp/camp-leverage-all) 0.3.0 and [`scc`](https://github.com/boyter/scc) 3.7.0. The initial command excluded inactive camps. For the expanded capture, I changed its registry discovery from [`camp list`](https://docs.fest.build/cli-reference/camp/camp_list/) to [`camp list --all`](https://docs.fest.build/cli-reference/camp/camp_list/), leaving scoring, identity resolution, and deduplication unchanged. The original output, source revision, and one-line patch are retained in the research. It estimates attributable code from selected authors' share of current Git blame, and scales each repository's organic COCOMO estimate by the same share. The model uses a &#36;56,286 annual wage and 2.4 overhead multiplier. The unrounded total is &#36;232,173,391.71. Working-tree changes can affect the snapshot, and the scan was not atomic across repositories.

The command reports 514.60× modeled “full leverage,” dividing 20,626.63 estimated person-months by 40.08 elapsed months of selected-author history. Elapsed calendar time is not measured working time. I have not used that ratio as a demonstrated productivity multiplier or charted its retrospective dollar allocations as earnings. The &#36;636 subscription cost from the first article covered seven weeks; I have not reconciled spending for the longer period.

The expanded scan includes Shrapnel, plastix, and pair-programming, the three inactive camps. It returned one error for a linked ClipSync checkout whose path capitalization differed from Git's reported root; the same remote was scored through My_Tools. One absent project path was reported as stale. The downloadable data preserves the scan's incomplete status and coverage notes. Code imported in a Git commit can be attributed to that commit's author: the two archived website exports contribute 2,148,933 lines to this inventory across five commits. That is existing code brought into the work, not a claim that agents wrote those lines.

The Camp and Festival Activity reports also cover records available on this machine. Festival Activity was rebuilt with all 28 registered roots, explicitly adding the inactive camps. Its 345 scanned repositories include workspaces and repositories without matching commits, so that is a coverage count. The 451 festivals are a current inventory that includes examples and repeated workflow runs; “completed” means marked complete in retained records. The manifest reported 59 warnings about malformed audit records, duplicate record IDs, and markers outside workflow directories, with no skipped sources. GitHub was queried separately as lancekrogers, obey-agent, and veronica-agent, with no repository-owner filter. PRs have one author, so those author counts are added once; status was checked at capture, and the creation window does not require every merge to have occurred inside it. The contribution-calendar total sums account activity and can include shared underlying work; active days are deduplicated by date. The review-contribution count uses GitHub's returned review category, which can omit restricted details.

Repository counts show breadth within a month, not how many agents ran simultaneously. GitHub contributions, PRs, local commits, current code size, and Festival records measure different things. The charts keep those measures separate.
