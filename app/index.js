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
      'Welcome to the well-made ' + chalk.red('BrowserProject') + ' generator!'
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
    },{
      type: 'input',
      name: 'namespace',
      message: 'What namespace should be exposed?',
      default: 'test'
    }];

    this.prompt(prompts, function (props) {
      this.name = props.name;
      this.description = props.description;
      this.version = props.version;
      this.namespace = props.namespace;

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
      this.fs.copyTpl(
        this.templatePath('namespace.js'),
        this.destinationPath(this.name + '.js'),
        { namespace: this.namespace, description: this.description }
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
        this.templatePath('_gitignore'),
        this.destinationPath('.gitignore')
      );
      this.fs.copyTpl(
        this.templatePath('_gulpFile.js'),
        this.destinationPath('gulpFile.js'),
        { name: this.name }
      );
    }
  },

  install: function () {
    this.installDependencies({
      skipInstall: this.options['skip-install']
    });
  }
});
