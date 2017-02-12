# framework_zero

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

2. Optimize a render function by caching the virtual dom

        function memoize<T>(render: Renderer<T>): Renderer<T>;

## Demo

1. `npm build`
2. `npm link`
3. `cd demo`
4. `npm link framework_zero`
5. `npm start`
