# Quality Gates

Every implementation sequence in Festival Methodology ends with mandatory quality gates.

## The Standard Gates

```
01_build_feature/
├── 01_implement.md          # Build it
├── 02_testing_and_verify.md # Test it
├── 03_code_review.md        # Review it
├── 04_review_results_iterate.md  # Fix issues
└── 05_commit.md             # Commit it
```

**Testing and Verification**
- Run test suite
- Verify requirements met
- Check edge cases
- Document any failures

**Code Review**
- Self-review for quality
- Check style guidelines
- Verify best practices
- Note concerns

**Review Results & Iterate**
- Address test failures
- Fix review issues
- Iterate until passing
- Document changes

**Commit**
- Only after gates pass
- With meaningful message
- Changes are atomic
- Ready for next sequence

## Why Gates Matter

**Without Gates**

- AI implements features but skips testing
- Quality issues compound
- Problems discovered late
- Technical debt accumulates

**With Gates**

- Every feature is tested
- Issues caught early
- Quality maintained
- Debt prevented

## Applying Gates

Use the fest CLI to add gates:

```bash
# Add gates to a sequence
fest gates apply 002_IMPLEMENTATION/01_build_feature

# Creates testing, review, iterate, commit tasks
```

Gates are applied automatically to implementation sequences.

## Gate Behavior

**Testing Task**

```markdown
# Task: testing_and_verify

## Objective
Verify the implementation meets requirements.

## Requirements
- [ ] All tests pass
- [ ] Edge cases covered
- [ ] No regressions
- [ ] Performance acceptable

## Implementation Steps
1. Run existing tests
2. Write new tests for feature
3. Verify requirements checklist
4. Document any issues found
```

**Code Review Task**

```markdown
# Task: code_review

## Objective
Review code quality and adherence to standards.

## Requirements
- [ ] Follows style guide
- [ ] No obvious bugs
- [ ] Clear naming
- [ ] Appropriate abstraction

## Implementation Steps
1. Review all changes
2. Check style compliance
3. Verify patterns used correctly
4. Document any concerns
```

**Iteration Task**

```markdown
# Task: review_results_iterate

## Objective
Address issues found in testing and review.

## Requirements
- [ ] All test failures fixed
- [ ] Review concerns addressed
- [ ] Documentation updated
- [ ] Ready for commit

## Implementation Steps
1. Review findings from testing
2. Address each issue
3. Re-run tests
4. Confirm all gates pass
```

## Sequence Flow

```
implement → test → fails → fix → test → passes → review → concerns → fix → review → approved → commit
```

The sequence doesn't end until all gates pass.

## Customizing Gates

Different sequence types may have different gates:

**Implementation Sequences**
- Test, review, iterate, commit

**Research Sequences**
- Verify, document

**Deployment Sequences**
- Test, stage, verify, deploy

Gates match the work type.

## The Result

Quality isn't optional. It's structural.

Every implementation is tested. Every change is reviewed. Issues are fixed before commit.

Quality through process, not hope.
