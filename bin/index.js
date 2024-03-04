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

        const outputExtensions = [
          'jpg',
          'png',
          'bmp',
          'tiff',
          'gif'
        ];

        if (!outputExtensions.includes(argv.format)) {
          message = chalk.red(`Error: Output format you specified is not supported. Possible values are: ${outputExtensions.join(',')}`);
          return console.log(boxen(message, boxenOptions));
        }

        // Check if the name of the file is provided
        let newFileName = `imagr-${Math.random().toString(36).slice(2)}.${argv.format}`;
        if (argv.name) {
          newFileName = `${argv.name}.${argv.format}`;
        }

        // Check for quality if provided
        let quality = 100;
        if (argv.quality) {
          quality = argv.quality;
        }

        if (isNaN(quality) || quality < 40 || quality > 100) {
          message = chalk.red(`Error: Output quality should be numeric and between 40-100.`);
          return console.log(boxen(message, boxenOptions));
        }

        // Write new image to disk
        image
          .quality(quality)
          .write(newFileName);

          message = chalk.green(`Success: Image named "${newFileName}" has been saved to the disk.`);
          return console.log(boxen(message, boxenOptions));
      })
      .catch((err) => {
        const errorMessage = err.message || 'An error occurred processing this file. Please select a different one and try again!';
        message = chalk.red(`Error: ${errorMessage}`);
        return console.log(boxen(message, boxenOptions));
      });
  })
  .option('f', { alias: 'format', describe: 'Format of the output image', type: 'string', demandOption: true })
  .option('n', { alias: 'name', describe: 'Name of the output image (without extension)', type: 'string' })
  .option('q', { alias: 'quality', describe: 'Specify quality of the output image (between 40-100)', number: true })
  .demandCommand(1)
  .parse();
