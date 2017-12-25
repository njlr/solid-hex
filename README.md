# solid-hex

A simple hexagon library using cube-coordinates ⬡


## Install

```bash=
yarn add git+ssh://git@github.com:njlr/solid-hex.git
```

## Usage

```javascript=
import * as Hex from 'solid-hex';

const a = Hex.hex(2, 3);
const b = Hex.scale(a, 10);
const c = Hex.lerp(a, b, 0.5);

// etc... 
```
