# Reproduction of Invariant Violation error with `renderToString` [FIXED]

`renderToString` does not work when using hooks

Verification (is fixed now):

1. `yarn` --> installs all needed dependencies
2. `yarn ssr` --> runs ssr on a component without hooks
3. `yarn ssr:hooks` --> runs ssr on the same (hookified) component

# Error

Before solving, this was the error output on `yarn ssr:hooks`:

```sh
Invariant Violation: Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://fb.me/react-invalid-hook-call for tips about how to debug and fix this problem.
# stack trace hidden #
```

Point 3 was actually what was happening. I did not set `react` and `react-dom` as external dependencies in the webpack configuration.

# Solution

If it happend to you too, simnply add these lines on the top level of your webpack config:

```js
module.exports = {
  // ...
  externals: {
    react: "react",
    "react-dom": "react-dom"
  }
  // ...
};
```
