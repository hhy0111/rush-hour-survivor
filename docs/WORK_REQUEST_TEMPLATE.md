# WORK_REQUEST_TEMPLATE

Use this exact block when handing work from one agent to another.

```md
- task_name:
- objective:
- scope_in:
- scope_out:
- required_inputs:
- dependencies:
- done_criteria:
- output_files:
- risks_to_watch:
- escalation_if_blocked:
```

## Result Output Format

Every agent result should end with:

```md
- summary:
- inputs:
- decisions:
- todo:
- risks:
- artifacts_changed:
- handoff_to:
- handoff_notes:
- done_check:
```

