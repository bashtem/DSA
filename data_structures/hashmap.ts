export class HashMap<K, V> {
  private capacity = 0;

  public set(key: K, value: V) {}

  public get(): V {
    return null as V;
  }

  public has(): boolean {
    return true;
  }

  public get size(): number {
    return this.capacity;
  }
}
