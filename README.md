# solid-hex

A simple hexagon library using cube-coordinates. ⬡

This package is based on code from https://www.redblobgames.com/grids/hexagons/. 


## Install

```bash=
yarn add solid-hex
```

## Usage

```javascript=
import * as Hex from 'solid-hex';

const a = Hex.hex(2, 3);
const b = Hex.scale(a, 10);
const c = Hex.lerp(a, b, 0.5);

// etc... 
```
This library is designed to work best with the [pipeline operator](https://github.com/babel/babel/tree/master/packages/babel-plugin-proposal-pipeline-operator): 


```javascript=
import * as Hex from 'solid-hex';

const a = Hex.hex(2, 3)
  |> (_ => Hex.scale(_, 10))
  |> (_ => Hex.lerp(_, Hex.hex(1, 2), 0.5))

// etc... 
```
