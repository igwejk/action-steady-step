const { executeSteadyStep, getExecutionCommandLine } = require("./src/lib");

(async () => await executeSteadyStep({ commandline: getExecutionCommandLine() }))();
