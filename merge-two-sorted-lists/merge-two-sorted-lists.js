#!/usr/bin/env node

/** 
 * source: https://leetcode.com/problems/merge-two-sorted-lists/
 * 
 * idea: 
 * 
 * Merge two sorted linked lists and return it as a new list. The new list should be made by splicing together the nodes of the first two lists.
*/
'use strict';

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */

const helper = require("../library/helper")

function ListNode(val) {
    this.val = val;
    this.next = null;
}

var assertMatchingListNode = function (n1, n2) {

}

var makeNodeList = function (values) {
    let head = null
    let previousNode = null

    for (var i = 1; i < values.length; i++) {
        let newNode = ListNode(values[i])

        if (previousNode) {
            previousNode.next = newNode
        }

        if (i == 0) {
            head = node
        }

        if (i == 1) {
            head.ne
        }


        if (i == 1) {

        }
    }


}

var mergeTwoLists = function (l1, l2) {
    return l1.concat(l2).sort()
}

makeNodeList([1, 2, 4])

// helper.assertMatchingListNode(
//     mergeTwoLists(
//         makeNodeList([1, 2, 4]),
//         makeNodeList([1, 3, 4])
//     ),
//     makeNodeList([1, 1, 2, 3, 4, 4])
// )
