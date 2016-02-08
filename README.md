# React Outside Event

[![Travis build status](http://img.shields.io/travis/gajus/react-outside-event/master.svg?style=flat)](https://travis-ci.org/gajus/react-outside-event)
[![NPM version](http://img.shields.io/npm/v/react-outside-event.svg?style=flat)](https://www.npmjs.org/package/react-outside-event)

A higher order React component that attaches an event listener for events that occur outside of the component element.

All DOM events that bubble are supported. By default, only "mousedown" event listener is attached. See `supportedEvents` parameter of the `ReactOutsideEvent` function.

## Examples

* Refer to the [./examples](./examples) directory.
* [Example JSBin](http://jsbin.com/zowupojoqo/1/edit?html,output).

## Configuration

```js
/**
 * @param {ReactClass} Target The component that defines `onOutsideEvent` handler.
 * @param {String[]} supportedEvents A list of valid DOM event names. Default: ['mousedown'].
 * @return {ReactClass}
 */
```

## Usage

Define a component class and wrap it using `ReactOutsideEvent`. Your class must define `onOutsideEvent` method that will be invoked when an outside event occurs, e.g.

```js
import React from 'react';
import ReactDOM from 'react-dom';
import ReactOutsideEvent from 'react-outside-event';

class Player extends React.Component {
    onOutsideEvent = (event) => {
        // Handle the event.
    }

    render () {
        return <div>Hello, World!</div>;
    }
}

export default ReactOutsideEvent(Player, ['click']);
```

You can attach multiple event listeners at once and selectively handle events with a simple conditional logic, e.g.

```js
import React from 'react';
import ReactDOM from 'react-dom';
import ReactOutsideEvent from 'react-outside-event';

class Player extends React.Component {
    onOutsideEvent = (event) => {
        if (event.type === 'mousedown') {

        } else if (event.type === 'mouseup') {

        }
    }

    render () {
        return <div>Hello, World!</div>;
    }
}

export default ReactOutsideEvent(Player, ['mousedown', 'mouseup']);
```

## Lint, Test, Build

```sh
npm run lint
npm run test
npm run build
```

## Running the example

```sh
npm run build
npm install webpack-dev-server -g
webpack-dev-server
```
