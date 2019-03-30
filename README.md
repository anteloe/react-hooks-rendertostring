# Reproduction repo

`renderToString` does not work when using hooks

Verification:

1. `yarn` --> installs all needed dependencies
2. `yarn ssr` --> runs ssr on a component without hooks
3. `yarn ssr:hooks` --> runs ssr on the same (hookified) component
