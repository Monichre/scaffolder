const { execSync } = require("child_process");
const { existsSync, readFileSync, readdirSync } = require("fs");
var rimraf = require("rimraf");

const execOnTestDir = (cmd, withEntryPoint = true) =>
  execSync(
    `node ${process.cwd()}/cli.js ${cmd} ${
      withEntryPoint ? `--entry-point ${__dirname}/results` : ""
    }`,
    {
      stdio: "inherit",
      stderr: "inherit",
      cwd: __dirname,
    }
  );

const cleanUp = (folder) => rimraf.sync(`${__dirname}/results/${folder}`);

const isFolderExists = (folder) => {
  try {
    return existsSync(`${__dirname}/results/${folder}`);
  } catch (e) {
    console.log("ERROR::", e);
    return false;
  }
};

const isFileContainsText = (path, content) =>
  readFileSync(path, "utf-8").includes(content);

const hasFileWithName = (path, fileName) =>
  readdirSync(path).some((name) => name.includes(fileName));

describe("e2e", () => {
  it("should create the template with the right values as keys", () => {
    execOnTestDir("create not-nested key1=awesome --folder not-nested");
    expect(isFolderExists("not-nested")).toBeTruthy();

    expect(
      hasFileWithName(`${__dirname}/results/not-nested`, "AWESOME.js")
    ).toBeTruthy();

    expect(
      isFileContainsText(
        `${__dirname}/results/not-nested/AWESOME.js`,
        "AWESOME"
      )
    ).toBeTruthy();

    cleanUp("not-nested");
  });

  it("runs all of the commands without throwing", () => {
    execOnTestDir("list");
    execOnTestDir("show not-nested", false);
    // execOnTestDir("show nested", false);
  });

  it("should create a nested template", () => {
    execOnTestDir("create nested key=awesome keyF=f2 --folder nested");
    expect(isFolderExists("nested")).toBeTruthy();
    expect(
      isFileContainsText(`${__dirname}/results/nested/awesome.js`, "awesome")
    ).toBeTruthy();
    expect(
      isFileContainsText(
        `${__dirname}/results/nested/F2/just-some-file.txt`,
        "lol"
      )
    ).toBeTruthy();

    expect(
      isFileContainsText(
        `${__dirname}/results/nested/nest/d/e/eep/shit.js`,
        "whattttt the awesome"
      )
    ).toBeTruthy();

    expect(
      hasFileWithName(`${__dirname}/results/nested`, "awesome.js")
    ).toBeTruthy();
    cleanUp("nested");
  });
});
