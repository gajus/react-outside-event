import React from 'react';
import ReactDOM from 'react-dom';

/**
 * @param {ReactClass} Target The component that defines `onOutsideEvent` handler.
 * @param {String[]} supportedEvents A list of valid DOM event names. Default: ['mousedown'].
 * @return {ReactClass}
 */
export default (Target, supportedEvents = ['mousedown']) => {
    return class ReactOutsideEvent extends React.Component {
        componentDidMount() {
            if (this.targetRef && !this.targetRef.onOutsideEvent) {
                throw new Error('Component does not define "onOutsideEvent" method.');
            }

            supportedEvents.forEach((eventName) => {
                window.addEventListener(eventName, this.handleEvent, false);
            });
        }

        componentWillUnmount() {
            supportedEvents.forEach((eventName) => {
                window.removeEventListener(eventName, this.handleEvent, false);
            });
        }

        handleEvent = (event) => {
            let targetElement = ReactDOM.findDOMNode(this.targetRef);
            if (targetElement != undefined && !targetElement.contains(event.target)) {
                this.targetRef.onOutsideEvent(event);
            }
        };
        
        getTargetRef = (ref) => (this.targetRef = ref);
        
        render() {
            return <Target ref={this.getTargetRef} {... this.props} />;
        }
    };
};
