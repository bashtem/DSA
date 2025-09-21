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
  private root: TreeNode<T> | null;
  private capacity;

  constructor() {
    this.root = null;
    this.capacity = 0;
  }

  public get size(): number {
    return this.capacity;
  }

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

  // recursive insert
  public insertRecursive(
    data: T,
    node: TreeNode<T> = this.root as TreeNode<T>
  ) {
    if (this.capacity === 0) {
      this.root = new TreeNode(data);
      this.capacity++;
      return this;
    }

    if (data === node.data) return this;

    if (this.capacity !== 0) {
      if (node.leftNode === null && data < node.data) {
        node.leftNode = new TreeNode(data);
        this.capacity++;
        return this;
      }
      if (node.rightNode === null && data > node.data) {
        node.rightNode = new TreeNode(data);
        this.capacity++;
        return this;
      }
    }

    if (data < node.data) {
      this.insertRecursive(data, node.leftNode as TreeNode<T>);
    }

    if (data > node.data) {
      this.insertRecursive(data, node.rightNode as TreeNode<T>);
    }
  }

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

  public remove(data: T) { //:Todo
    if (this.root === null) return false;

    let current = this.root;

    while (true) {}
  }
}
