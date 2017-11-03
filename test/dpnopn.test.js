const chai = require('chai');

const Dpnopn = require('./../lib/dpnopn');

const { expect } = chai;

describe('Dpnopn', () => {
  it('can parse args', () => {
    const argv = [null, null, '-h', '-PD'];

    const cli = new Dpnopn(argv);
    expect(cli._argv.h).to.be.true;
    expect(cli._argv.P).to.be.true;
    expect(cli._argv.D).to.be.true;
  });

  describe('_createOptions', () => {
    it('create options with argv', () => {
      const argv = [
        null,
        null,
        '-n', 'dependon',
        '-PDOB'
      ];

      const expected = {
        dependencyTypes: [
          'dependencies',
          'devDependencies',
          'optionalDependencies',
          'bundleDependencies',
        ],
        props: ['name', 'homepage'],
      };

      const cli = new Dpnopn(argv);
      const actual = cli._createOption();

      expect(actual).to.deep.equal(expected);
    });
  })
});