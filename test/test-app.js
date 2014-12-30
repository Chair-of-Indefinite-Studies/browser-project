'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');

describe('browser-project:app', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../app'))
      .inDir(path.join(os.tmpdir(), './temp-test'))
      .withOptions({ 'skip-install': true })
      .withPrompt({
        name: 'test-project',
        description: 'test description',
        version: '3.2.1',
        namespace: 'test'
      })
      .on('end', done);
  });

  it('creates files', function () {
    assert.file([
      'bower.json',
      'package.json',
      '.editorconfig',
      '.jshintrc',
      'README.md',
      'LICENSE',
      '.gitignore',
      'SpecRunner.html',
      'spec/setupSpec.js',
      'test-project.js'
    ]);
  });

  it('creates README with correct content', function () {
    assert.fileContent('README.md', /test-project/);
    assert.fileContent('README.md', /test description/);
  });

  it('creates package.json with correct content', function () {
    assert.fileContent('package.json', /"name":\s+"test-project"/);
    assert.fileContent('package.json', /"version":\s+"3.2.1"/);
  });

  it('creates bower.json with correct content', function () {
    assert.fileContent('bower.json', /"name":\s+"test-project"/);
    assert.fileContent('bower.json', /"version":\s+"3.2.1"/);
    assert.fileContent('bower.json', /"license":\s+"MIT"/);
  });
});
