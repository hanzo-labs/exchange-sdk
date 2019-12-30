# Hanzo Exchange SDK
This is the Hanzo Exchange SDK, which enables anyone to integrate advanced trading functionality into an application. Includes a spec-compliant order matching engine and WS server for building exchange applications.

## Running tests

```sh
npm
npm test
npm test --watch
```

## Dev mode

When developing you can run:

```
npm run watch
```

This will regenerate the build files each time a source file is changed and serve on http://127.0.0.1:5000.

## References
> Basic Matching Engine based on [hyobyun/exchangeengine](https://github.com/hyobyun/exchangeengine) and [Ian Kaplan's Paper](https://github.com/IanLKaplan/matchingEngine/wiki/Market-Order-Matching-Engines)

