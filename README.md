# eslint-plugin-feature-sliced

s

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm i eslint --save-dev
```

Next, install `eslint-plugin-feature-sliced`:

```sh
npm install eslint-plugin-feature-sliced --save-dev
```

## Usage

Add `feature-sliced` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
  "plugins": ["feature-sliced"]
}
```

Then configure the rules you want to use under the rules section.

```json
{
  "rules": {
    "feature-sliced/path-checker": [
      "error",
      {
        "alias": "@"
      }
    ]
  }
}
```

## Rules

<!-- begin auto-generated rules list -->

- `path-checker`

<!-- end auto-generated rules list -->
