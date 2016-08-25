![Cover Image](cover.gif)

# React TypeScript Frontend Starter

Getting a react application off the bat can get a bit complicated. There's *a lot of conflicting opinions* on what makes a React app work.

This project [doesn't try to solve that problem](https://xkcd.com/927/), but after playing around with competing technologies, this combination of tools is what I've settled with.

## Prior Art

There's been a few attempts to gather some strong opinions on how to develop with React, as the community slowly begins to coalesce into using the same or similar technologies. [Meetups](http://www.meetup.com/) around the world, [Conferences](https://facebook.github.io/react/docs/conferences.html) like [ReactEurope](http://www.react-europe.org/), [React.js Conf](http://conf2015.reactjs.org/), etc.

- [Shasta](https://github.com/shastajs) - A set of boilerplates featured by Dan Abramov and [JavaScript Jabber](https://devchat.tv/js-jabber/205-jsj-shasta-with-eric-schoffstall).
- [Roc](https://medium.com/@DZV/roc-one-solution-to-javascript-fatigue-b14ea07b9763#.cbvcukt0q) - A CLI to quickly generate apps.

And of course, there's projects similar to this one all over github:

- [React Redux JWT Example](https://github.com/joshgeller/react-redux-jwt-auth-example) - A method of creating a frontend with authentication flow.
- [React Webpack Node Express Boilerplate](https://github.com/theavish/wrne-boilerplate) - The name explains it all.

Of course, React isn't alone here, [reddit.com/r/javascript had a post which made fun of the tons of choices developers have.](https://www.reddit.com/r/javascript/comments/4fqmox/information_overload_thread_react_vs_ember_vs/):

> Information Overload Thread! React vs Ember vs Backbone vs Mithril vs Vue vs Knockout vs jQuery; Express vs Koa vs hapi; Apache vs Nginx; Underscore vs Lodash vs Sugar; Let's get this list rolling!

And don't get me started on [JavaScript Fatigue](https://medium.com/@ericclemmons/javascript-fatigue-48d4011b6fc4).

## Opinions

1. [TypeScript](http://typescriptlang.org) and it's suite of linting and polyfill tools is currently a more mature project than Flow or ESLint. Being able to catch issues immediately, having the assurance prior to pushing your code that it's been linted thoroughly is a happy feeling.

2. [React](https://facebook.github.io/react/) is a more mature project than Angular 2 or Ember. I honestly found it easier to use as a developer as well. That's not to say that you shouldn't used those technologies, use anything you like.

3. [Webpack](https://webpack.github.io/) is the defacto winner with regards to managing dependencies on the frontend, just use javascript modules to manage everything, no gulp task runners, just keep everything in your code.

## TypeScript Overview

**TypeScript** is a superset of JavaScript that supports the latest features of JavaScript as well as extra type related features like:

 - **Explicit Types** - You can say a function, class, or variable is of a certain type.

 - **Duck Typing** - If the structure of an interface is the same, you can use them interchangeably.

 - **Generics** - The same as C++ Templates, a generic type is one that can be told to the compiler.

 - **Declarations** - Declarations are compiler only code that describes an API. Even if you use a library that wasn't written in TypeScript, there may be user defined declarations at the [Typings Repo](https://github.com/typings/typings).

```ts

var x:string = "TypeScript is Cool!";

interface Point {
  x: number,
  y: number
}

interface Vector2D {
  x: number,
  y: number
}

//both are the same and can be duck typed.

interface Factory<P> { //That P is a generic!
    (props?: P & Attributes, ...children: ReactNode[]): ReactElement<P>;
}

// You can also declare module types
// For better autocomplete:

declare module "find" {
  export function file(path: string, callback: (files: string[]) => void)
  export function file(pattern: RegExp, path: string, callback: (files: string[]) => void)

  export function fileSync(path: string): string[]
  export function fileSync(pattern: RegExp, path: string): string[]
}
```

Everything else is pure ECMAScript 2017+, so spread operator, fat arrow functions, classes, modules, etc.

## React Overview

Jeremy Ashkenas in the 'Rise of Transpilers' said that:

> Someone is going to unify these three different syntaxes and write a language that just addresses the web-platform directly and it's going to be insanely popular.

React is that unifying library. You write in **JavaScript**, and all these different syntaxes, your CSS, your HTML, are all written in JavaScript Objects and Function Factories.

Everything is bound by Components, a design similar to Game Engines and the *Entity Component Relationship* or the *Actor Model*. Brad Frost's term [Atomic Design](http://bradfrost.com/blog/post/atomic-web-design/) became pretty popular.

- **Immutability** - The same as `const` in c++, an object that doesn't change, and only returns new instances of itself.

- **Higher Order Components** - Container components that encapsulate a logical component, like a function that checks authentication.

```js
import * as React from 'react';

const style = {
    background: '#0074D9'
};

class Button extends React.Component {
  static defaultProps = {style: {}};
  constructor(props) {
    super(props);
    this.state = {small: false};
  }
  smallify = () => {
    this.state = {small: !this.state.small};
  }
  render() {
      return (
        <button style={{...style, ...this.props.style, transform: `scale(${this.state.small ? 50 : 100}%)`}}>
          {this.props.children}
        </button>
      );
    }
}

export default Hero;

```

#### Advanced CSS

now it's a bit harder to do **CSS3** features like psudo-classes (hover, active), media queries. That's what the **Radium** package is for (in addition to serving as a autoprefixer).

```js
const style = {
    background: '#0074D9'
    ':hover': {
      background: '#555'
    }
};

@Radium // It's that easy.
class Button extends React.Component {

// ...
```

## Redux & The Flux Architecture

**Flux Architecture** is a means of separating the storage of persistent data from displaying a component by having it stored in a separate "Model Tree" that a component can pull information from.

As your data is stored in a separate tree, allowing you to group together concerns that change the state of your entire application. You can put your data in a singleton that you can reference from any component, so it's really easy to use!

All you need to do is get a reference to the store, add an event listener that checks if it's changed, and there you go!

```js
import * as React from 'react';
import store from './store';

class Header extends React.Component {
    componentDidMount() {
        store.addChangeListener(this._onChange);
    }
    _onChange = () => {
        this.setState(store.get());
    }
    render() {
        return (
            <h1>
                {this.state.username}
            </h1>
        );
    }
}
```

### Redux

**Redux** is an implementation of the flux architecture that simplifies this even further, there's no need to add listeners to your component, as it uses a higher order component called [connect()](https://github.com/reactjs/react-redux/blob/master/src/components/connect.js) to do that for you. It will also map your `props` to the store for you so you have less to worry about.

Redux is comprised of the following ideas that are taken from state management concepts from AI programming.

- **State** - A single immutable (const) JavaScript object that describes all the data in your application. `var state = {counter: 1};`.

- **Actions** - An single  immutable object that describes changes to your application, according to the `interface Action {type: string, ...otherdata};`.

- **Pure Functions** - Functions that take in consts and don't perform other actions besides their purpose (like calling database calls). `(x) => x * x;`.

- **Side Effects** - Other actions that a function does besides fufill it's purpose, like database calls.

- **Action Creators** - pure functions that create (return new) actions. `() => ({type: 'LOGIN', username: 'guest'})`.

- **Dispatch** - To delegate a task to another function. In Redux you would dispatch a function to modify the state. This function would be an action creator.

- **Reducers** - Similar to reduction in `map.reduce`, takes a previous state and a next state and returns the new one. `(prevState: any, action: any) => newState: any;`.

#### Project structure

```bash
|- app/
  |- state/
    |- reducers/
    |- actions/
    |- store/
  |- ...
```

Here's a possible directory structure for a project that uses Redux. You can organize your React app that uses Redux by type of file, [however that can get complicated quick](https://medium.com/@alexmngn/how-to-better-organize-your-react-applications-2fd3ea1920f1#.iu4scsv4y). So here's a great scalable organization solution.

```bash
|- app/ # The Root of your Application
  |- components/ # Components that can work anywhere in your app.
    |- button/
    |- notifications
      |- components
        |- button-dismiss  
          |- images
          |- locales
          |- specs
          |- index.tsx
          |- styles.scss
      |- index.js
      |- styles.scss

  |- views/  # Composite Components that make up a page in your app.
    |- home/
      |- components/
        |- button-like.tsx
      |- services/
        |- process-data.ts
      |- index.ts
      |- styles.ts
    |- sign-up/
      |- components/
        |- form-field/
      |- scenes/
        |- login/
        |- register/
          |- locales/
          |- specs/
          |- index.tsx
          |- styles.ts
  |- services/
    |- api/
    |- geolocation/
    |- session/
      /actions.ts
      /index.ts
      /reducer.ts
  |- main.ts
```

This project tries to be small so it doesn't overwhelm you with nested elements, *however you're free to follow this model to help structure your project when it grows larger.*

#### Subscribing to Changes

```js
import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../../actions';

// This will add a property called `posts` to your component's state.
const mapStateToProps = (state) =>  ({posts: state.posts});

// This will add a property called actions to your component's state,
// you can use it to call functions that modify your state.
const mapDispatchToProps = (dispatch) => ({ actions: bindActionCreators(actionCreators, dispatch) });

// Let's connect to redux with a simple decorator.
@connect(mapStateToProps, mapDispatchToProps)
export default class Blog extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      posts: []
    };
  }
  onComponentMount() {

    // Call the Action Creator (function)
    // fetchBlogPosts() to change the state.
    // The changes will propagate to this component
    // thanks to our @connect - ion.
    this.state.actions.fetchBlogPosts();
  }
  render() {
    // ...
  }
}
```

So all communication with your state is delegated to Redux. It's a bit difficult to wrap your head around, so I'd suggest checking out [Dan Abramov's Egghead videos on it](https://egghead.io/series/getting-started-with-redux).