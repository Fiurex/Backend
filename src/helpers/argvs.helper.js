import { Command } from "commander";

const argvs = new Command();

argvs.option("--mode", "mode enviroment", "dev");

argvs.parse();
export default argvs.opts();
