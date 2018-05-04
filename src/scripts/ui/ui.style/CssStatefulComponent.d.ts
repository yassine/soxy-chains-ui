import * as React from 'react';
import { CSSProps } from 'ui.base';

type ComponentStateCssMapper<P,S> = (props: P, state: S) => { [className: string]: (boolean | string) }

/**
 * A higher-order component that maps the (presentational) component state & props to
 * a CSS state.
 *
 * @param {Constructor<T & React.Component<P, S>>} TargetComponentClass
 * @param styles a class name dictionary (as per css modules)
 * @param {ComponentStateCssMapper<P, S>} mapComponentStateToCssState
 * @returns {Constructor<T & React.Component<P, S>>}
 * @constructor
 */
export function CssStatefulComponent<T,P,S> (TargetComponentClass: Constructor<T & React.Component<P,S>>,
                                             styles: Dictionary,
                                             mapComponentStateToCssState ?: ComponentStateCssMapper<P,S>)
  : Constructor<T & React.Component<P & CSSStatefulProps, S>>

export function CssStateful<T,P,S> (styles: Dictionary, mapComponentStateToCssState ?: ComponentStateCssMapper<P,S>)

/**
 *
 * @param {Constructor<T & React.Component<P, S>>} TargetComponentClass
 * @param {ComponentStateCssMapper<P, S>} mapComponentStateToCssState
 * @returns {(cssSheet: {[p: string]: string}) => Constructor<T & React.Component<P, S>>}
 * @constructor
 */
export function CssStatefulComponentFactory<T,P,S> (TargetComponentClass: Constructor<T & React.Component<P,S>>,
                                                            mapComponentStateToCssState: ComponentStateCssMapper<P,S>)
  : (cssSheet: {[key: string]: string}) => Constructor<T & React.Component<P & CSSStatefulProps, S>>

interface CSSStatefulProps extends CSSProps {
  permanentCSSState ?: {[key: string]: boolean | string}
  stylesheet ?: Dictionary
}

declare module 'react' {
  interface HTMLAttributes<T> {
    'css-ref'?: string;
  }
  interface SVGAttributes<T> {
    'css-ref'?: string;
  }
}
