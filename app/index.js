'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
  },

  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the well-made' + chalk.red('BrowserProject') + ' generator!'
    ));

    var prompts = [{
      type: 'input',
      name: 'name',
      message: 'What is the name of the project?',
      default: 'change-me'
    },{
      type: 'input',
      name: 'description',
      message: 'How would you describe the project?',
      default: 'Supercalifragilisticexpialidocious'
    },{
      type: 'input',
      name: 'version',
      message: 'What version should the project be on?',
      default: '1.0.0'
    }];

    this.prompt(prompts, function (props) {
      this.name = props.name;
      this.description = props.description;
      this.version = props.version;

      done();
    }.bind(this));
  },

  writing: {
    app: function () {
      this.fs.copyTpl(
        this.templatePath('_package.json'),
        this.destinationPath('package.json'),
        { name: this.name, version: this.version }
      );
      this.fs.copyTpl(
        this.templatePath('_bower.json'),
        this.destinationPath('bower.json'),
        { name: this.name, version: this.version }
      );
      this.fs.copy(
        this.templatePath('SpecRunner.html'),
        this.destinationPath('SpecRunner.html')
      );
      this.fs.copy(
        this.templatePath('setupSpec.js'),
        this.destinationPath('spec/setupSpec.js')
      );
    },

    projectfiles: function () {
      this.fs.copy(
        this.templatePath('editorconfig'),
        this.destinationPath('.editorconfig')
      );
      this.fs.copy(
        this.templatePath('jshintrc'),
        this.destinationPath('.jshintrc')
      );
      this.fs.copyTpl(
        this.templatePath('_README.md'),
        this.destinationPath('README.md'),
        { name: this.name, description: this.description }
      );
      this.fs.copy(
        this.templatePath('LICENSE'),
        this.destinationPath('LICENSE')
      );
      this.fs.copy(
        this.templatePath('.gitignore'),
        this.destinationPath('.gitignore')
      );
    }
  },

  install: function () {
    this.installDependencies({
      skipInstall: this.options['skip-install']
    });
  }
});
