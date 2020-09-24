[![Build Status](https://travis-ci.org/abdennour/binding.svg?branch=master)](https://travis-ci.org/abdennour/binding)
[![Coverage Status](https://coveralls.io/repos/github/abdennour/binding/badge.svg?branch=master)](https://coveralls.io/github/abdennour/binding?branch=master)

# Overview :

Binding system which includes any valid binding :

- Bind value to variable.

- Bind value to namespace.  (DONE)

- Bind model to view and view to model (MVVM)

- And many ideas

# Install

```bash
npm install binding --save;
```

or using CDN :

```js
<script src="https://cdn.rawgit.com/abdennour/binding/master/cdn/binding-latest.min.js"></script>
```

# Use Cases :

1. Bind namespace to value :

```js
import binding from 'binding';

const person = binding('name.firstname', 'Ahmed');
// console.log(person.name.firstname) // Ahmed
```

2. Bind namespace to value and attach the object :

```js
binding('person.name.firstname', 'Ahmed', window);
// console.log(person.name.firstname) // Ahmed
```

# License:

MIT .
