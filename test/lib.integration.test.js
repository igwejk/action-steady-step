const { executeSteadyStep } = require("../src/lib");

describe("src/lib.js", () => {
    test("actual execution", async () => {
        const expectedStringInStdout = "steady-tmp-dir-prefix";
        const core = {
            info: jest.fn(),
            error: jest.fn(),
        };
        const commandline = `ls -al "$(dirname "$(mktemp -d -t '${expectedStringInStdout}-XXXXXX')")" | grep '${expectedStringInStdout}'`;

        const { stdout: actualStdout } = await executeSteadyStep({ commandline, core });

        expect(actualStdout.trim()).toMatch(
            new RegExp(`^drwx------.+${expectedStringInStdout}.+$`, "m")
        );
    });
});
