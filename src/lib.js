const DRY_RUN_MODE = "dry-run";

function getExecutionCommandLine({
    core = require("@actions/core"),
    steadyStepActionMode = process.env.STEADY_STEP_ACTION_MODE
} = {}) {
    return core.getInput(
        DRY_RUN_MODE === steadyStepActionMode ? "stub" : "run"
    );
}

async function executeSteadyStep({
    commandline,
    handleerror = handleError,
    core = require("@actions/core"),
    exec = require("util").promisify(require("child_process").exec),
} = {}) {
    try {
        const { stdout, stderr } = await exec(commandline);

        core.info("stdout:", stdout);
        core.error("stderr:", stderr);

        return { stdout, stderr, code: 0 };
    } catch (error) {
        handleerror(error);
    }
}

function handleError({
    message = "",
    process = global.process,
    stdout = "",
    stderr = "",
    code = 1,
    core = require("@actions/core"),
} = {}) {
    core.setFailed(message);

    core.info("stdout:", stdout);
    core.error("stderr:", stderr);

    process.exit(code);
}

module.exports = Object.seal({
    getExecutionCommandLine,
    executeSteadyStep,
    handleError,
    DRY_RUN_MODE,
});
