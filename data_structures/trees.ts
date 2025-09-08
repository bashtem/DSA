export class TreeNode<T> {
  data: T;
  leftNode: TreeNode<T> | null;
  rightNode: TreeNode<T> | null;

  constructor(data: T) {
    this.data = data;
    this.leftNode = null;
    this.rightNode = null;
  }
}

export class BinarySearchTree<T> {
  private root: TreeNode<T> | null = null;
  private capacity = 0;

  constructor() {}

  public insert(data: T) {
    let newNode = new TreeNode(data);

    if (this.root == null) return (this.root = newNode);

    let current = this.root;

    while (true) {
      if (newNode.data < current.data) {
        if (current.leftNode === null) {
          current.leftNode = newNode;
          this.capacity++;
          break;
        }
        current = current.leftNode;
      } else if (newNode.data > current.data) {
        if (current.rightNode === null) {
          current.rightNode = newNode;
          this.capacity++;
          break;
        }
        current = current.rightNode;
      } else break;
    }
    return this;
  }

  public remove(data: T) {}

  public search(data: T): boolean {
    if (this.root === null) return false;

    let current = this.root;
    while (current) {
      if (current.data === data) return true;

      if (data < current.data) current = current.leftNode as TreeNode<T>;
      else {
        current = current.rightNode as TreeNode<T>;
      }
    }
    return false;
  }

  public get size(): number {
    return this.capacity;
  }
}
