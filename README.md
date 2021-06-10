# ARK Platform SDK

<p align="center">
    <img src="./banner.png" />
</p>

> Lead Maintainer: [Brian Faust](https://github.com/faustbrian)

## Usage

Documentation can be found [here](https://ark.dev/docs/platform-sdk).

## Development

> If you plan to contribute you'll need to ensure that you follow our [naming conventions](./NAMING_CONVENTIONS.md).

[Rush](https://rushjs.io/) and [pnpm](https://pnpm.js.org/en/) are required to be installed before starting. These tools are used to manage this monorepo.

### Run `lint` and `prettier`

```bash
rush format
```

### Apply `eslint` rules to source

```bash
rush lint
```

### Apply `eslint` rules to tests

```bash
rush lint:tests
```

### Apply `prettier` formatting

```bash
rush prettier
```

### Run tests with `jest`

```bash
rush test
```

### Bump the version of all packages and publish them

```bash
bash scripts/publish.sh VERSION YOUR_AUTH_TOKEN
```

## Security

If you discover a security vulnerability within this package, please send an e-mail to security@ark.io. All security vulnerabilities will be promptly addressed.

## Credits

This project exists thanks to all the people who [contribute](../../contributors).

## License

[MIT](LICENSE) © [ARK Ecosystem](https://ark.io)
