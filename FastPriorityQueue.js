/**
 * FastPriorityQueue.js : a fast heap-based priority queue  in JavaScript.
 * (c) the authors
 * Licensed under the Apache License, Version 2.0.
 *
 * Speed-optimized heap-based priority queue for modern browsers and JavaScript engines.
 *
 * Usage :
         Installation (in shell, if you use node):
         $ npm install fastpriorityqueue

         Running test program (in JavaScript):

         // var FastPriorityQueue = require("fastpriorityqueue");// in node
         var x = new FastPriorityQueue();
         x.add(1);
         x.add(0);
         x.add(5);
         x.add(4);
         x.add(3);
         x.peek(); // should return 0, leaves x unchanged
         x.size; // should return 5, leaves x unchanged
         while(!x.isEmpty()) {
           console.log(x.poll());
         } // will print 0 1 3 4 5
 */
'use strict';

var defaultcomparator = function(a, b) {
  return a < b;
};

// the provided comparator function should take a, b and return *true* when a < b
function FastPriorityQueue(comparator) {
  this.array = [];
  this.size = 0;
  this.compare =  comparator || defaultcomparator;
}

// Add an element the the queue
// runs in O(log n) time
FastPriorityQueue.prototype.add = function(myval) {
  var i = this.size;
  this.array[this.size++] = myval;
  var p = (i - 1) >> 1;
  for (; (i > 0) && (this.compare(myval, this.array[p]));
           i = p, p = (i - 1) >> 1) {
    this.array[i] = this.array[p];
  }
  this.array[i] = myval;
};

// replace the content of the heap by provided array and "heapifies it"
FastPriorityQueue.prototype.heapify = function(arr) {
  this.array = arr;
  this.size = arr.length;
  for (var i = (this.size >> 1); i >= 0; i--) { this._percolateDown(i); }
};

// for internal use
FastPriorityQueue.prototype._percolateUp = function(i) {
  var myval = this.array[i];
  var p = (i - 1) >> 1;
  for (; (i > 0) && (this.compare(myval, this.array[p]));
       i = p, p = (i - 1) >> 1) {
    this.array[i] = this.array[p];
  }
};
// for internal use
FastPriorityQueue.prototype._percolateDown = function(i) {
  var size = this.size;
  var ai = this.array[i];
  var l = (i << 1) + 1;
  while (l < size) {
    var r = l + 1;
    i = l;
    if (r < size) {
      if (this.compare(this.array[r], this.array[l])) {
        i = r;
      }
    }
    this.array[(i - 1) >> 1] = this.array[i];
    l = (i << 1) + 1;
  }
  var p = (i - 1) >> 1;
  for (; (i > 0) && (this.compare(ai, this.array[p]));
        i = p, p = (i - 1) >> 1) {
    this.array[i] = this.array[p];
  }
  this.array[i] = ai;
};

//Look at the top of the queue (a smallest element)
// executes in constant time
FastPriorityQueue.prototype.peek = function(t) {
  return this.array[0];
};

// remove the element on top of the heap (a smallest element)
// runs in logarithmic time
FastPriorityQueue.prototype.poll = function(i) {
  var ans = this.array[0];
  this.array[0] = this.array[--this.size];
  this._percolateDown(0 | 0);
  return ans;
};

// recover unused memory (for long-running priority queues)
FastPriorityQueue.prototype.trim = function() {
  this.array = this.array.slice(0,this.size);
};

// Check whether the heap is empty
FastPriorityQueue.prototype.isEmpty = function(i) {
  return this.size == 0;
};

// just for illustration purposes
var main = function() {
  // main code
  var x = new FastPriorityQueue(function(a, b) {return a > b;});
  x.add(1);
  x.add(0);
  x.add(5);
  x.add(4);
  x.add(3);
  while (!x.isEmpty()) {
    console.log(x.poll());
  }
};

if (require.main === module) {
  main();
}

module.exports = FastPriorityQueue;
