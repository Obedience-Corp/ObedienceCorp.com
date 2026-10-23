---
title: "Using Humanizer to Improve Blog Readability"
date: "2026-10-07"
author: "Lance Rogers"
summary: "I use AI to help write blog posts and recently started using Humanizer to improve draft readability. Here's how I use its hz CLI and decide which edits to keep."
canonical: "https://blockhead.consulting/blog/using-humanizer-to-improve-blog-readability"
---

> Humanizer can suggest edits to awkward prose. Its `hz` CLI keeps protected Markdown blocks out of the rewrite, so I can compare wording changes without rebuilding the post's structure.

I use AI to help write blog posts. Pure AI-generated content reads like shit, though. It pads a useful point with an introduction nobody needs, turns plain verbs into phrases, and repeats itself in the conclusion. Getting a draft onto the page still leaves editing to do.

I recently started using Humanizer to improve the readability of those drafts. I want useful alternatives for an awkward sentence or a paragraph that takes too long to get to the point. I still decide what the post says and which edits make it into the published version.

I tried the local Humanizer model on a blog draft. It rewrote the prose, but the YAML frontmatter disappeared and the headings lost their Markdown markers. I started thinking about a tool that would handle the document around the model.

The model's author already ships one. It's called [`hz`](https://github.com/sgaofen/humanizer-local-model), and it separates the prose from the parts of a document it should leave alone.

I installed it and ran it on a deliberately wordy example and a real draft from this blog. It handled the document structure much better than my whole-file model call. The writing results were mixed. Some wording gave me useful alternatives; other passages came back longer, choppier, or less precise. Here's the setup and how I decide which edits to keep.

## Install the CLI and start the model

My test used `hz 0.1.0`, Humanizer 12B Q8_0, and llama.cpp build 11429 on an Apple M4 Max with 128 GB of memory. I already had `uv`, `llama-server`, and the model file installed. This was a CLI installation and editing test, not a clean-machine installation test.

Install the current CLI from the upstream repository with `uv`:

```bash
uv tool install git+https://github.com/sgaofen/humanizer-local-model

hz --version
```

The [project README](https://github.com/sgaofen/humanizer-local-model#option-3-the-command-line-hz-for-agents-and-long-documents) has other installation options.

`hz` needs a running model. I used llama.cpp with my existing GGUF file. If you need the model, the upstream download-and-run command can fetch it from Hugging Face:

```bash
llama-server \
  --hf-repo jialinyyzz/humanizer \
  --hf-file humanizer-12b-Q8_0.gguf \
  -c 8192 -np 1 -ngl 99 \
  --host 127.0.0.1 --port 18084
```

Q8_0 is about 12.7 GB on disk. Check the upstream [model-size guide](https://github.com/sgaofen/humanizer-local-model/blob/main/docs/USAGE.md#2-pick-a-file) before choosing it for a smaller machine. I reused the same model from my existing installation instead of downloading another copy. For an existing file, replace the two `--hf-...` options with `-m /path/to/humanizer-12b-Q8_0.gguf`.

Leave that terminal running. In another terminal, check that the server is ready:

```bash
curl --fail --silent http://127.0.0.1:18084/health
```

Mine returned `{"status":"ok"}`. The explicit `--server` argument in the following commands points `hz` at this local server.

## See what will be rewritten

Start with a dry run:

```bash
hz draft.md --dry-run
```

This plans the rewrite without calling the model. It shows which passages will be rewritten and which blocks will be kept. On my controlled sample, it identified two prose passages and kept the frontmatter, two headings, a fenced code block, a table, and a blockquote.

That is the behavior I was missing when I sent an entire Markdown file straight to the model. The frontmatter stays outside the rewrite. So do the fenced commands. I can inspect the plan before generating anything.

Then write to a different file:

```bash
hz draft.md \
  --server http://127.0.0.1:18084 \
  -o draft.edited.md

git diff --no-index --word-diff=plain draft.md draft.edited.md
```

The diff works without adding either file to Git. It exits with status 1 when the files differ, which is expected here. `hz` also rejected an attempt to use the same input and output path in my test.

## What changed in the writing

I wrote a deliberately padded paragraph to see what the model would do with familiar AI filler. It began:

> In today's rapidly evolving landscape of AI-assisted writing, it is important to recognize that generating a draft is only the first step in the content creation journey.

The first rewrite began:

> With the current fast paced world of AI-aided writing it's important to remember that it's just the beginning of the content creation journey.

I would reject that edit. It kept the throat-clearing and made the subject less clear. The full paragraph grew from 78 to 85 words. `hz` reported no warnings for it.

My own edit would be:

> A local rewriting tool can suggest clearer wording. Compare its changes with the original before publishing.

That cuts the introduction and states the action. The model had produced another phrasing, but I still had to decide what the paragraph needed to say.

The real blog draft gave me a more useful phrase. My original said:

> The worker rushed the quality gates and the manager's reviews became surface checks.

The rewrite included:

> The worker was cutting corners on quality gates. The manager's reviews were more of a superficial glance.

I like “cutting corners on quality gates” as an alternative to “rushed the quality gates.” I'd still edit the second sentence. Elsewhere, the same run added awkward fragments and casual phrasing I wouldn't use. I would pull individual improvements into the draft instead of accepting that whole rewrite.

## Check formatting as well as meaning

The controlled sample preserved its YAML frontmatter, headings, fenced code, table, and blockquote exactly. It also changed this inline command:

```text
Before: Run `git diff --no-index before.md after.md` to compare the files.
After:  You can check by doing git diff --no-index before.md after.md.
```

The command text survived, but its backticks did not. The URL in the same paragraph survived, too. `hz` reported zero warnings for the sample, so a clean report would not have caught that formatting regression.

The upstream [document-handling notes](https://github.com/sgaofen/humanizer-local-model/blob/main/docs/USAGE.md#how-a-document-is-split) explain this distinction: protected blocks are kept, while inline formatting within rewritten prose can still be dropped.

These were my first saved runs, including the tool's automatic retries:

<div class="article-table" role="region" aria-label="Article data table" tabindex="0">

| Input | Observed result |
| --- | --- |
| Controlled Markdown sample | Protected blocks survived; one inline code span lost its backticks. |
| Real blog draft | Frontmatter, four headings, table, and link targets survived; some prose became choppier. |
| Standalone YAML file | Treated as prose and rewritten into invalid YAML. |

</div>

The real draft contained 1,244 words of prose selected for rewriting. `hz` split it into eight pieces, retried two, and finished in about 90 seconds on my machine with the model already loaded. Those numbers describe this run, not a speed promise for other hardware.

Keeping YAML frontmatter inside Markdown also does not mean `hz` is a YAML editor. My `.yaml` fixture went through as text. Keep configuration files out of this workflow.

## Read the warnings and the whole diff

For a report you can inspect or use in a script, add `--json`:

```bash
hz draft.md \
  --server http://127.0.0.1:18084 \
  -o draft.edited.md \
  --json > draft.report.json
```

The edited document goes to `draft.edited.md`, the JSON report goes to `draft.report.json`, and progress and warnings go to stderr. The report includes the number of pieces, retries, flagged passages, and per-piece issues.

On the real draft, the tool flagged `04` and `09` as added numbers. Looking at the diff showed that the model had changed written month names to numeric dates. That particular warning needed inspection, not an automatic rejection. The command still exited successfully with a flagged passage.

I also found a change the warning did not explain. My original described the three busiest months as “more than a year after the initial sprint.” The rewrite said “way more than 1 year.” The underlying number was there, but “way more” strengthened the claim. Checking whether numbers survived does not tell me whether the sentence still means the same thing.

For my next draft, I'll start with the paragraph that bothers me, run the dry pass, and save a separate rewrite. Then I'll compare the wording, check the claims and inline formatting, and move useful edits into the original. A sentence that is already clear can stay exactly as I wrote it.
