interface PersistOptions<D = any> {
    storage?: Storage;
    onStored?: (snap: D) => void;
    onInvalid?: () => void;
}
interface PersistJSON<T> {
    state: T;
}
declare function persist<T extends object, K extends keyof T, D extends Pick<T, K>>(proxyObject: T, storageKey: string, keys: K[], { storage, onStored, onInvalid }?: PersistOptions): void;

export { type PersistJSON, type PersistOptions, persist };
