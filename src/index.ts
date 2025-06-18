import { subscribeKey } from 'valtio/utils'
import { snapshot } from 'valtio/vanilla'
import { isObject } from './utils/isObject'

export interface PersistOptions<D = any> {
    storage?: Storage
    onStored?: (snap: D) => void
    onInvalid?: () => void
}

export interface PersistJSON<T> {
    state: T
}

export function persist<
    T extends object,
    K extends keyof T,
    D extends Pick<T, K>
>(
    proxyObject: T,
    storageKey: string,
    keys: K[],
    { storage = localStorage, onStored, onInvalid }: PersistOptions = {}
): void {
    let data: PersistJSON<D>
    try {
        const json: string | null = storage.getItem(storageKey)
        if (json === null) throw 0

        data = JSON.parse(json)
        if (!isObject(data) || !isObject(data.state)) {
            onInvalid?.()
            throw 0
        }
    } catch {
        data = {
            state: {} as D
        }
    }
    for (const key of keys) {
        if (key in data.state) {
            proxyObject[key] = data.state[key as keyof object]
        }
    }
    for (const key of keys) {
        subscribeKey(proxyObject, key, (value) => {
            ;(data.state as unknown)[key] = value
            const json: string = JSON.stringify(data)
            storage.setItem(storageKey, json)
            onStored?.(snapshot(data.state))
        })
    }
}
