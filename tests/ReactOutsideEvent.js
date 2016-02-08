import {
    expect
} from 'chai';

import React from 'react';
import ReactDOM from 'react-dom';
import jsdom from 'jsdom';
import sinon from 'sinon';
import ReactOutsideEvent from './../src';

describe('ReactOutsideEvent', () => {
    beforeEach(() => {
        global.document = jsdom.jsdom(`
            <!DOCTYPE html>
            <html>
            <head>
            </head>
            <body>
                <div id='app'></div>
            </body>
            </html>
        `);

        global.window = document.defaultView;
    });

    describe('when initialized with default parameter values', () => {
        describe('when target component does not define onOutsideEvent handler', () => {
            it('throws an error', () => {
                expect(() => {
                    let target,
                        WrappedComponent;

                    WrappedComponent = ReactOutsideEvent(class extends React.Component {
                        render () {
                            return <div />;
                        }
                    });

                    ReactDOM.render(<WrappedComponent />, document.querySelector('#app'));
                }).to.throw(Error, 'Component does not defined "onOutsideEvent" method.');
            });
        });
        describe('when event originates outside of the component', () => {
            it('captures "mousedown" event', () => {
                let target,
                    WrappedComponent,
                    spy;

                spy = sinon.spy();

                WrappedComponent = ReactOutsideEvent(class extends React.Component {
                    onOutsideEvent = (event) => {
                        spy(event.type);
                    };

                    render () {
                        return <div />;
                    }
                });

                ReactDOM.render(<div>
                    <WrappedComponent />
                    <div className='target'>!</div>
                </div>, document.querySelector('#app'));

                target = document.querySelector('.target');

                target.dispatchEvent(new window.MouseEvent('mousedown', {
                    bubbles: true,
                    cancelable: true
                }));

                expect(spy.callCount).to.equal(1);
                expect(spy.firstCall.args).to.deep.equal(['mousedown']);
            });
            ['click', 'mouseup', 'dblclick'].forEach((eventName) => {
                it('does not capture "' + eventName + '" event', () => {
                    let target,
                        WrappedComponent,
                        spy;

                    spy = sinon.spy();

                    WrappedComponent = ReactOutsideEvent(class extends React.Component {
                        onOutsideEvent = (event) => {
                            spy(event.type);
                        };

                        render () {
                            return <div />;
                        }
                    });

                    ReactDOM.render(<div>
                        <WrappedComponent />
                        <div className='target'>!</div>
                    </div>, document.querySelector('#app'));

                    target = document.querySelector('.target');

                    target.dispatchEvent(new window.MouseEvent(eventName, {
                        bubbles: true,
                        cancelable: true
                    }));

                    expect(spy.callCount).to.equal(0);
                });
            });
        });
        it('does not capture events that originate on the component', () => {
            let target,
                WrappedComponent,
                spy;

            spy = sinon.spy();

            WrappedComponent = ReactOutsideEvent(class extends React.Component {
                onOutsideEvent = (event) => {
                    spy(event.type);
                };

                render () {
                    return <div className='target'></div>;
                }
            }, ['click']);

            ReactDOM.render(<WrappedComponent />, document.querySelector('#app'));

            target = document.querySelector('.target');

            target.dispatchEvent(new window.MouseEvent('click', {
                bubbles: true,
                cancelable: true
            }));

            expect(spy.callCount).to.equal(0);
        });
        it('does not capture events that originate inside of the component', () => {
            let target,
                WrappedComponent,
                spy;

            spy = sinon.spy();

            WrappedComponent = ReactOutsideEvent(class extends React.Component {
                onOutsideEvent = (event) => {
                    spy(event.type);
                };

                render () {
                    return <div>
                        <div className='target'></div>
                    </div>;
                }
            }, ['click']);

            ReactDOM.render(<WrappedComponent />, document.querySelector('#app'));

            target = document.querySelector('.target');

            target.dispatchEvent(new window.MouseEvent('click', {
                bubbles: true,
                cancelable: true
            }));

            expect(spy.callCount).to.equal(0);
        });
    });
});
