# solid-hex

A simple hexagon library using cube-coordinates. ⬡

This package is based on code from https://www.redblobgames.com/grids/hexagons/. 


## Install

```bash=
yarn add solid-hex
```

## Usage

```javascript=
import * as hex from 'solid-hex';

const a = hex.hex(2, 3);
const b = hex.scale(a, 10);
const c = hex.lerp(a, b, 0.5);

// etc... 
```
This library is designed to work best with the [pipeline operator](https://github.com/babel/babel/tree/master/packages/babel-plugin-proposal-pipeline-operator): 


```javascript=
import * as Hex from 'solid-hex';

const a = hex.hex(2, 3)
  |> hex.scale(10)
  |> hex.lerp(hex.hex(1, 2), 0.5))

// etc... 
```
