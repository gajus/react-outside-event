import React from 'react';
import ReactOutsideEvent from './..';

class Player extends React.Component {
    constructor (...args) {
        super(...args);

        this.state = {
            lastEventName: null
        };
    }

    onOutsideEvent = (event) => {
        this.setState({
            lastEventName: event.type
        });
    };

    handleInsideEvent = () => {
        this.setState({
            lastEventName: null
        });
    };

    render () {
        let componentClassName;

        componentClassName = 'player';

        if (this.state.lastEventName) {
            componentClassName += ` active event-${this.state.lastEventName}`;
        }

        return <div
            className={componentClassName}
            onMouseDown={this.handleInsideEvent}
            onMouseUp={this.handleInsideEvent}
            onClick={this.handleInsideEvent}
            onDoubleClick={this.handleInsideEvent}
        >{this.props.children}</div>;
    }
}

export default ReactOutsideEvent(Player);
