#!/usr/bin/env node
import { program } from "commander";

// Define options and args
program
  .version("1.0.0")
  .description("A simple CLI application built with Node.js");

program.parse(process.argv);

program
  .command("greet <name>")
  .description("Greets the user with their name")
  .action((name) => {
    console.log(`Hello, ${name}!`);
  });

program.parse(process.argv);
