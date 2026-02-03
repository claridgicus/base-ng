# Contributing to Base NG

Thank you for your interest in contributing to Base NG, the Angular port of [Base UI](https://base-ui.com/).

## Getting Started

1. Fork the repository
2. Clone your fork
3. Install dependencies: `npm install`
4. Start the development server: `ng serve`

## Development

### Running the docs site

```bash
ng serve docs
```

The documentation site will be available at `http://localhost:4200/`.

### Running tests

```bash
ng test
```

### Building the library

```bash
ng build @base-ng/ui
```

## Guidelines

- Follow Angular best practices and conventions
- Maintain API compatibility with the original Base UI where possible
- Write unit tests for new components
- Update documentation when adding or modifying components

## Component Porting

When porting a component from Base UI:

1. Study the original React implementation
2. Preserve the same public API and behavior
3. Use Angular idioms (signals, directives, etc.) appropriately
4. Ensure accessibility features are maintained
5. Add corresponding documentation and examples

## Code of Conduct

This project follows the [Contributor Covenant Code of Conduct](https://www.contributor-covenant.org/version/2/1/code_of_conduct/).

## License

By contributing to Base NG, you agree that your contributions will be licensed under the MIT License.
