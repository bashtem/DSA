export class TreeNode<T> {
  private data: T;
  leftNode: TreeNode<T> | null;
  rightNode: TreeNode<T> | null;

  constructor(data: T) {
    this.data = data;
    this.leftNode = null;
    this.rightNode = null;
  }
}

export class Tree<T> {
  private root: TreeNode<T>;
  private capacity = 0;

  constructor(root: T | TreeNode<T>) {
    if (root instanceof TreeNode) this.root = root;
    else {
      this.root = new TreeNode<T>(root);
    }
  }

  public insert() {}

  public remove(data: T) {}

  public search(data: T): boolean {
    return true;
  }

  public get size(): number {
    return this.capacity;
  }
}
