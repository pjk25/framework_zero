# framework_zero [![Build Status](https://travis-ci.org/pjk25/framework_zero.svg?branch=master)](https://travis-ci.org/pjk25/framework_zero)

Not so much a framework, but @raynos main-loop hooked up to virtual-dom, and a helper function to optimize pure render
functions used with immutable data structures.

## API

    type Action<T> = (state: T) => T;

    type Dispatcher<T> = (action: Action<T>) => void;

    type ErrorHandler<T> = (state: T, action: Action<T>, error: any) => T;

    type Renderer<T> = (state: T) => VirtualDOM.VNode;

    type RendererFactory<T> = (dispatcher: Dispatcher<T>) => Renderer<T>;

1. Build a UI loop based on an initial state, a function that produces a renderer from a dispatcher, and an optional error
   handler. Returns an DOM element and the dispatcher. The renderer should produce virtual-dom.

        function bootstrap<T>(initialState: T, makeRenderer: RendererFactory<T>, onError?: ErrorHandler<T>): {
            element: Element;
            dispatcher: Dispatcher<T>;
        };

## Demo

In order to run the mori demo against the local framework_zero:

1. `npm run build`
2. `npm link`
3. `cd demos/mori` or `cd demos/datascript`
4. `npm link framework_zero`
5. `npm start`
