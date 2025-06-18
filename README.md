# Valtio-partial-persist

A lightweight utility for selectively persisting parts of a Valtio store to storage.

## Usage

Install:

```shell
npm i valtio-partial-persist
```

## Example

```ts
import { persist } from 'valtio-partial'

interface Store {
    a: number
    b: number
}
const store = proxy<Store>({ a: 1, b: 2 })

persist<Store>(store, 'my-app', ['b'])
```

## License

This library is licensed under the MIT License.  
See the [LICENSE](./LICENSE) file for details.
