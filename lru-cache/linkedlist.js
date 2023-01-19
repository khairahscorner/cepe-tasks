class Node {
  constructor(element) {
    this.key = element.key;
    this.value = element.value;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
  }

  add(element) {
    // creates a new node
    var node = new Node(element);

    // to store current node
    var current;

    // if list is Empty add the
    // element and make it head
    if (this.head == null) this.head = node;
    else {
      current = this.head;

      // iterate to the end of the
      // list
      while (current.next) {
        current = current.next;
      }

      // add node
      current.next = node;
    }
    this.size++;
  }

  // removes an element from the
  // specified location
  removeFrom(index) {
    if (index < 0 || index >= this.size)
      return console.log("Please Enter a valid index");
    else {
      var curr,
        prev,
        it = 0;
      curr = this.head;
      prev = curr;

      // deleting first element
      if (index === 0) {
        this.head = curr.next;
      } else {
        // iterate over the list to the
        // position to removce an element
        while (it < index) {
          it++;
          prev = curr;
          curr = curr.next;
        }

        // remove the element
        prev.next = curr.next;
      }
      this.size--;

      // return the remove element
      return curr.key;
    }
  }

  // removes a given element from the list
  remove(key) {
    var current = this.head;
    var prev = null;

    // iterate over the list
    while (current != null) {
      // comparing element with current
      // element if found then remove the
      // and return true
      if (current.key === key) {
        if (prev == null) {
          this.head = current.next;
        } else {
          prev.next = current.next;
        }
        this.size--;
        return current.key;
      }
      prev = current;
      current = current.next;
    }
    return -1;
  }

  // prints the list items
  printList() {
    var curr = this.head;
    var str = "";
    while (curr) {
      str += curr.key + " v " + curr.value + "\n";
      curr = curr.next;
    }
    console.log(str);
  }
}

export { LinkedList, Node };
