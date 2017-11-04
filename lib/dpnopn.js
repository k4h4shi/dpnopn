const minimist = require('minimist');
const figlet = require('figlet');
const chalk = require('chalk');
const CLI = require('clui');
const Spinner = CLI.Spinner;
const inquirer = require('inquirer');
const opn = require('opn');
const dpndon = require('dpndon');

/**
 * The homepage opener for npm modules that your project depend on.
 * @example
 * new Dpnopn(process.argv).exec();
 */
class Dpnopn {
  /**
   * Create instance.
   * @param {Object} argv - process.argv
   */
  constructor(argv) {
    this._argv = minimist(argv.slice(2));
    this._defaultOption = {
      dependencyTypes: [
        'dependencies',
      ],
      props: ['name', 'homepage'],
    };
  }

  /**
   * execute.
   */
  exec() {
    if (this._argv.h || this._argv.help) {
      this._showHelp();
    }
    
    this._showLogo();

    const msg = 'loading your dependencies, please wait...';
    const stopSpinner = this._createSpinner(msg);

    return dpndon(this._createOption())
        .then(stopSpinner)
        .then(this._createChoices)
        .then(this._createPrompt)
        .then(this._extractHomepage)
        .then(this._openHomepage)
        .catch((error) => {
          stopSpinner();
          console.error(error);
        });
  }

  /**
   * show logo.
   */
  _showLogo() {
    const title = figlet.textSync('dpnopn', { horizontalLayout: 'full' });
    console.log(chalk.green(title));
  }

  /**
   * show help
   */
  _showHelp() {
    console.log('Usage:');
    console.log('  dpnopn');
    console.log('');
    console.log('Description:');
    console.log('  An opener for your npm dependency.');
    console.log('');
    console.log('Options:');
    console.log('  -P', 'create choise from your dependencies.')
    console.log('  -D', 'create choise from your devDependencies.');
    console.log('  -O', 'create choise from your optionalDependencies.');
    console.log('  -B', 'create choise from your bundleDependencies.');
    process.exit(0);
  }

  /**
   * create option
   */
  _createOption() {
    const option = this._defaultOption;

    if(this._argv.O || this._argv.D) {
      if (!this._argv.P) {
        option.dependencyTypes = [];
      }
      if(this._argv.D) {
        option.dependencyTypes.push('devDependencies');
      }
      if(this._argv.O) {
        option.dependencyTypes.push('optionalDependencies');
      }
    }
    if(this._argv.B) {
      option.dependencyTypes.push('bundleDependencies');
    }
    return option;
  }

  /**
   * create spinner
   */
  _createSpinner(msg) {
    let status = new Spinner(msg);
    status.start();
    const stopSpinner = result => {
      status.stop();
      return result;
    }
    return stopSpinner;
  }

  /**
   * create choices for user
   * @param {Array} pkgs - that fetched.
   * @returns {Array} choices
   */
  _createChoices(pkgs) {
    return pkgs.filter(pkg => pkg.homepage)
    .map(pkg => `${pkg.name}: ${pkg.homepage}`);
  }

  /**
   * create prompt for user to chose one
   * @param {Array} choices 
   * @returns {Object} prompt
   */
  _createPrompt(choices) {
    return inquirer.prompt(
      [
        {
          type: 'list',
          name: 'dependency',
          message: 'Select which one you want open:',
          choices: choices
        }
      ]
    );
  }

  /**
   * extract homepage
   */
  _extractHomepage(answer) {
    const dependency = answer.dependency;
    const beginIndex = dependency.indexOf(':') + 2;
    const endIndex = dependency.length;
    const homepage = dependency.substring(beginIndex, endIndex);
    return homepage;
  }

  /**
   * open homepage
   * @param {*} homepage 
   */
  _openHomepage(homepage) {
    opn(homepage, {
      wait: false
    })
  }
}

module.exports = Dpnopn;