import * as mainLoop from 'main-loop';
import {diff, patch, create} from 'virtual-dom';

export type Action<T> = (state: T) => T;
export type Dispatcher<T> = (action: Action<T>) => void;
export type ErrorHandler<T> = (state: T, action: Action<T>, error: any) => T;
export type Renderer<T> = (state: T) => VirtualDOM.VNode;
export type RendererFactory<T> = (dispatcher: Dispatcher<T>) => Renderer<T>;

export function bootstrap<T>(initialState: T, makeRenderer: RendererFactory<T>, onError: ErrorHandler<T> = state => state): {element: Element, dispatcher: Dispatcher<T>} {
    let state = initialState;

    function dispatcher(action) {
        try {
            state = action(state);
        } catch (error) {
            state = onError(state, action, error);
        } finally {
            loop.update(state);
        }
    }

    const render = makeRenderer(dispatcher);

    const loop = mainLoop(initialState, render, {
        create: create,
        diff: diff,
        patch: patch
    });

    return {
        element: loop.target,
        dispatcher: dispatcher
    };
}

export function memoize<T>(render: Renderer<T>): Renderer<T> {
    let tree, state;
    return newState => {
        if (newState !== state) {
            state = newState;
            tree = render(state);
        }
        return tree;
    };
}
