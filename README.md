

# dpnopn [Deperecated]

dpnopn - The homepage opener for npm modules that your project depend on.


## This tool is no longer maintained
Please consider using [dpndon-cli](https://github.com/k4h4shi/dpndon/tree/master/packages/dpndon-cli) instead.

it provides same function as dpndon with opener command.

## Usage
```
# install dpnopn
npm install dpnopn -g

# move to your node project root
cd your/node/project

# run dpnopn to open homepage of your project's dependency.
dpnopn
```

## Option

By default, dpnopn only show choice for production dependencies.

You tell dpnopn to show other choices such as devDependencies with command options.

For example, `dpnopn -PD` will show chose of production and devDependencies.

available option is donw below.

- -h, --help: show help
- -P:         with productionDependencies
- -D:         with devDependencies
- -O:         with optionalDependencies
- -B:         with bundleDependencies

## License
MIT

## Author
[Kotaro Takahashi@k4h4shi](https://twitter.com/k4h4shi)