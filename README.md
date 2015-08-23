# React Outside Event

[![Travis build status](http://img.shields.io/travis/gajus/react-outside-event/master.svg?style=flat)](https://travis-ci.org/gajus/react-outside-event)
[![NPM version](http://img.shields.io/npm/v/react-outside-event.svg?style=flat)](https://www.npmjs.org/package/react-outside-event)

A higher order component that attaches an event listener for events that occur outside of the component element.

## Examples

* Refer to the [./examples](./examples) directory.

## Configuration

```js
/**
 * @param {ReactClass} Target The component that defines `onOutsideEvent` handler.
 * @param {String[]} supportedEvents A list of valid DOM event names. Default: ['mousedown'].
 * @return {ReactClass}
 */
```

## Usage

Define a component class and wrap it using `ReactOutsideEvent`, e.g.

```js
import React from 'react';
import ReactDOM from 'react-dom';
import ReactOutsideEvent from 'react-outside-event';

class Player extends React.Component {
    onOutsideEvent = () => {
        this.setState({
            lastEventName: event.type
        });
    }

    handleInsideEvent = (event) => {
        console.log('event', event.type);
    }

    render () {
        return <div>Hello, World!</div>;
    }
}

export default ReactOutsideEvent(Player, ['mousedown']);
```
