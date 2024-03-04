#!/usr/bin/env node
import fs from 'fs';
import chalk from 'chalk';
import boxen from 'boxen';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import Jimp from 'jimp';

// Define options and args
yargs(hideBin(process.argv))
  .command('convert <file_path>', 'Convert image to a desired format', () => {}, (argv) => {
    let message;

    const boxenOptions = {
      padding: 1,
      title: 'Imagr',
      titleAlignment: 'center',
      borderStyle: 'classic'
    };

    if (!fs.existsSync(argv.file_path)) {
      message = chalk.red(`Error: File "${argv.file_path}" does not exist. Please specify the correct path and try again.`);
      return console.log(boxen(message, boxenOptions));
    }

    // Read file for further processing
    Jimp.read(argv.file_path)
      .then((image) => {
        // Check for supported MIME
        const mime = image.getMIME();

        const supportedMimes = [
          Jimp.MIME_JPEG,
          Jimp.MIME_PNG,
          Jimp.MIME_BMP,
          Jimp.MIME_TIFF,
          Jimp.MIME_GIF,
          Jimp.MIME_X_MS_BMP
        ];

        if (!supportedMimes.includes(mime)) {
          message = chalk.red(`Error: MIME for file "${argv.file_path}" is not supported. Please use a different image and try again.`);
          return console.log(boxen(message, boxenOptions));
        }

        
      })
      .catch((err) => {
        const errorMessage = err.message || 'An error occurred processing this file. Please select a different one and try again!';
        message = chalk.red(`Error: ${errorMessage}`);
        return console.log(boxen(message, boxenOptions));
      });
  })
  .option('f', { alias: 'format', describe: 'Format of the output image', type: 'string', demandOption: true })
  .option('s', { alias: 'size', describe: 'Desired size of the output image', type: 'string' })
  .demandCommand(1)
  .parse();
