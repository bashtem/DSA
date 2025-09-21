export class HashMap<K, V> {
  private capacity = 0;
  private list: Array<V>;

  constructor() {
    this.  list = new Array();
  }

  public set(key: K, value: V) {}

  public get(): V {
    return null as V;
  }

  public has(): boolean {
    return true;
  }

  public delete(): boolean {
    return true;
  }

  public get size(): number {
    return this.capacity;
  }

  private _hash(key: K): number {
    return 0;
  }
}
