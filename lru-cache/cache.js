// We need to implement a Linked List to
// help with LRUCache
import { LinkedList, Node } from "../lru-cache/linkedlist.js";

export default class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = {};
    this.cache_vals = new LinkedList();
  }

  set(key, value) {
    this.evict_if_needed();
    let node = new Node({ key, value });
    this.cache_vals.add({ key, value });
    this.cache[key] = node;
    console.log("added: " + key);
  }

  get(key) {
    this.print();
    if (this.cache[key]) {
      let node = this.cache[key];
      this.cache_vals.remove(key);
      this.cache_vals.add(node);
      return node.value;
    } else {
      return -1;
    }
  }

  evict_if_needed() {
    if (this.cache_vals.size >= this.capacity) {
      const el = this.cache_vals.removeFrom(0);

      console.log("removed: " + el);
      delete this.cache[el];
      this.print();
    }
  }

  print() {
    for (const p in this.cache) {
      console.log(p);
    }
    console.log("-----");
    this.cache_vals.printList();
    console.log("---end");
  }
}
