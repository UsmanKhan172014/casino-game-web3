# Micro

### Description

A tiny template engine, with javascript execution isolation.

### Purpose

Just for fun.

### Installation

  [sudo] npm i micro-engine

### Usage API

#### Calling the module

  ```javascript
  var micro = require('micro-engine');
  ```

#### Definition

  ```javascript
  var content = micro('{{ message }}');
  ```

#### Compile

  ```javascript
  content.compile({ message: 'Hello World!' });
  // Hello World!
  ```

#### Run

  ```javascript
  var content = micro('{{ var result = firstValue + secondValue; }}');
  content.run({ 
    firstValue: 2, 
    secondValue: 3 
  });

  // { 
  //    firstValue: 2, 
  //    secondValue: 3, 
  //    result: 5, 
  //    _compiled: "var result = 2 + 3;" 
  // } 
  ```

#### Render

  ```javascript
  var content = micro('{{ var result = firstValue + secondValue; }}');
  content.render({ 
    firstValue: 2, 
    secondValue: 3 
  }, '{{ result, firstValue, secondValue }}');

  // 5, 2, 3
  ```

#### Working with files

  ```
  some-file.mic
  -------------

  {{ var result = firstValue + secondValue; }}
  ```

  ```javascript
  var content = micro.file( './some-file' );
  content.render({ 
    firstValue: 2, 
    secondValue: 3 
  }, '{{ result, firstValue, secondValue }}');

  // 5, 2, 3
  ```

### License

Under BSD
