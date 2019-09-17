# StateFool
**The most easiest** State-Managment package for React.

From Now on, working with global states is a piece of cake!
Because I dislike working with Redux like many of you, I decided to write a very simple yet comprehensive package with just a few lines of code, so that we can easily manage the global states.

No extraordinary things has been used in this package. only **createContext** and **useState** from React has been used.

## Installation
```
npm i --save statefool
```
## Guide
### 1- Provider
First, we import a **Provider** from the statefool package.
```javascript
import {Provider} from 'statefool';
```
Each Provider should embrace components that use the states of this Provider.
```javascript
<Provider id="user" initialState={{ name: 'Hannan', family:'Std' }}>
  <TestComponent1/>
  <TestComponent2/>
</Provider>
```
In the above example, the `TestComponent1` and `TestComponent2` components, which are completely independent of each other, are commonly supposed to use the **state** related to the **user**, and one of them will change `name` and the other one will change `family` of the **user**.

We have considered a mandatory **id** for this Provider, so that we can later access the states of that Provider by calling the same id.

> We can have many different Providers for different tasks. because I want to edit user information here, so I set id="user". For example, I may want to have an other Provider later for the shopping cart, then I will put its id="cart".

Providers can both be used in parallel with each other and can be used inside each other, and we have not any limitations.

We also enter the initial value of our state inside `initialState` like we did in the Class-Components.
>  Of course, if you do not have the patience to type **initialState**, just type the **state** instead of **initialState** :)


### 2- Consumer
```javascript
import {Consumer} from 'statefool';
```
Now suppose that, inside the `TestComponent1` or the `TestComponent2`, whether they are Class-Component type or Functional-Component type, we want to access **state** and **setState** related to the **user**, we need to call the **id** related to the **user** inside jsx using the **Consumer**.
```javascript
<Consumer id="user">
  {user => (
    <>
      <span>{user.name} {user.family}</span>
      <button onClick={() => user.setState({ name: 'John' })}>
        Change Name to John
      </button>
    </>
  )}
</Consumer>
```
#### setState:
Interestingly, the `setState` method is exactly like the React setState. That is, we can pass either an **Object** or a **function that contains a previous state**. See the following examples:
```javascript
user.setState({ name: 'John' })
user.setState(prevState => ({ name: 'MR ' + prevState.name }))
```
Like the React setState, we can pass a **callback function** as a second argument, aslo with the advantage, we can access to the updated state in Callback:
```javascript
user.setState({ name: 'John' }, newState => alert('Hello:' + newState.name) )
```
### I can say that all things are almost finished. Easy Easy Finish Finish!

I put code of the above discussion in more detail below. **But if you are looking for something more interesting, go ahead the instruction.**
```javascript
//App.js
import React, { Component } from 'react';
import { render } from 'react-dom';
import { Provider } from 'statefool';
import TestComponent1 from './TestComponent1';
import TestComponent2 from './TestComponent2';

export default class App extends Component {
  render() {
    return (
      <Provider id="user" initialState={{ name: 'Hannan', family:'Std' }}>
        <TestComponent1 />
        <TestComponent2 />
      </Provider>
    );
  }
}

render(<App />, document.getElementById('root'));
```
```javascript
// TestComponent1.js -> Class-Component
export default class  TestComponent1 extends React.Component {
  render() {
    return (
      <Consumer id="user">
        {user => (
          <>
            <span>{user.name} {user.family}</span>
            <button onClick={() => user.setState({ name: 'John' })}>
              Change Name to John
            </button>
          </>
        )}
      </Consumer>
    );
  }
}
```
```javascript
//TestComponent2.js -> Functional-Component
const TestComponent2 = (props) => {
  return (
    <Consumer id="user">
      {user => (
        <>
          <span>{user.name} {user.family}</span>
          <button onClick={() => user.setState({ family: 'Doe' })}>
            Change Family to Doe
          </button>
        </>
      )}
    </Consumer>
  );
}
export default TestComponent2;
```
As I mentioned above, the things are well done in two topics of **Provider** and **Consumer**, but we'll explain the more advanced part.

### 3- Use as a Hook
For use in Functional-Components, in addition to the **Consumer**,  there is another option as `useStateFrom` that looks like **useState** of the React, except that its arguments are different. Since we set the initial values in the **Provider**, we will not apply the initial value here. we use it as follows:
```javascript
useStateFrom(ProviderID, stateName?);

const [name, setName]     = useStateFrom('user', 'name');
const [family, setFamily] = useStateFrom('user', 'family');
```
Examples of setting the state:
```javascript
setName('John');
setFamily('Doe');
setName(prevName=> 'MR ' + prevName);
```
But what happens if we don't pass the second parameter, i.e. stateName? Just the way of usage becomes as follows:
```javascript
const {name, family, setState} = useStateFrom('user');
console.log(name, family);
setState({name:'John'});
```
### 4- withState
Do you know what the problem is with the use of **Consumer**? The answer is that we use it in `render` or, in other words, in `jsx`. And what if we want to use it outside the render or jsx?
The hook mentioned above can simply be used for Functional-Components. But what about the Class-Components?
Well, we can here do this easily using the `withState`. Note the following example:

```javascript
import React from 'react';
import {withState} from 'statefool';

class Test extends React.Component {
  componentDidMount() {
    const { user } = this.props;
    console.log(user.name, user.family);
    user.setState({ name: 'John' }, ()=> alert('Yes, State is easy peasy'));
  }

  render() {
    const { user } = this.props;
    return (<span>Hey, {user.name + ' ' + user.family}</span>);
  }
}
export default withState(Test, ['user']);
```
We pass the component to the `withState` as the first parameter. In the second parameter, we pass an **array of the ids of Providers**, e.g. `['user', 'cart', etc.]` that we want to access them in the class by **this.props**.
> However, this withState is not only dedicated to the Class-Components and can also be used for Functional-Components. But when there is a **Hook**, why **HOC** to be used? :)

**Finish!**
