# steady-step action

Enables the option for dry-run execution of a step, consequently facilitating integration testing of workflows.

## Inputs

### `run`

**Required** The command line to be executed as the step. `run` command line
will **_not_** be executed when STEADY_STEP_ACTION_MODE environment variable is
set to `dry-run`.

It is assumed that the command is compatible with the parent job's platform.

### `stub`

**required** Provided that the `STEADY_STEP_ACTION_MODE` environment variable is
set to `dry-run`, the `stub` command line will be executed to simulate the outcome
of `run` execution. The stub provides an opportunity to control the output of
the step, hence facilitating integration testing of workflows.

## Outputs

The output is dependent on the `run` or `stub` being executed, with respect to
the execution environment.

### `result`

This is reserved for action users to set arbitrary outputs.

### `stderr`

The standard error stream of `run` or `stub` is collected in this output.

### `stdout`

The standard output stream of `run` or `stub` is collected in this output.

## Example usage

### Example .1

```yaml
id: a-strong-step-forwards
name: Sparkle Deployment
uses: actions/steady-step@v0.0.2
with:
  run: >-
    ./.github/step/sprinkle-magic-on-deployment.sh
      --sparkle-level=${{ env.SPARKLE_LEVEL }}
      --zero-downtime=true
  stub: >-
    ./.github/step-stubs/sprinkle-magic-on-deployment.sh
      --sparkle-level=${{ env.SPARKLE_LEVEL }}
      --zero-downtime=true
```

### Example .2

This shows how to set output.

```yaml
- id: how-to-set-output
  name: Demonstration of how to set steady step output
  uses: actions/steady-step@v0.0.2
  with:
    run: >-
      echo 'result={ "actual": [ "json", "output" ] }' >> $GITHUB_OUTPUT
    stub: >-
      echo 'result={ "fake": [ "json", "output" ] }' >> $GITHUB_OUTPUT
- id: use-the-output
  name: Demonstration of how to use steady step output
  run: echo "steady step outcome: ${{ steps.how-to-set-output.outputs.result }}"
```
