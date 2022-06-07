const {
    getExecutionCommandLine,
    executeSteadyStep,
    DRY_RUN_MODE,
} = require("../src/lib");

describe("src/lib.js", () => {
    test("executeSteadyStep:success", async () => {
        const stdout = "stdout log";
        const stderr = "stderr log";
        const exec = jest.fn(async () => ({ stdout, stderr }));
        const commandline = "command --test";
        const core = {
            info: jest.fn(),
            error: jest.fn(),
        };

        await executeSteadyStep({ commandline, core, exec });

        expect(exec).toHaveBeenCalledWith(commandline);
        expect(core.info).toHaveBeenCalledWith("stdout:", "stdout log");
        expect(core.error).toHaveBeenCalledWith("stderr:", "stderr log");
    });

    test("executeSteadyStep:failure", async () => {
        const exec = jest.fn(async () => {
            throw new Error();
        });
        const handleerror = jest.fn();

        await executeSteadyStep({ exec, handleerror });

        expect(handleerror).toHaveBeenCalled();
    });

    test("dry-run execution", async () => {
        const core = { getInput: jest.fn(() => "execute-stub.sh") };

        getExecutionCommandLine({ core, steadyStepActionMode: DRY_RUN_MODE });

        expect(core.getInput).toHaveBeenCalledTimes(1);
        expect(core.getInput).toHaveBeenCalledWith("stub");
        expect(core.getInput).toHaveReturnedWith("execute-stub.sh");
    });

    test("actual execution", async () => {
        const core = { getInput: jest.fn(() => "execute-run.sh") };

        getExecutionCommandLine({ core, steadyStepActionMode: undefined });

        expect(core.getInput).toHaveBeenCalledTimes(1);
        expect(core.getInput).toHaveBeenCalledWith("run");
        expect(core.getInput).toHaveReturnedWith("execute-run.sh");
    });
});
