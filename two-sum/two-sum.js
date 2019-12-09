#!/usr/bin/env node

/** 
 * source: https://leetcode.com/problems/two-sum/
 * 
 * idea: 
 * 
 * Given an array of integers, return indices of the two numbers such that they add up to a specific target.
 * You may assume that each input would have exactly one solution, and you may not use the same element twice.
*/
'use strict';

var assertEqualArray = function (item1, item2) {
    const check = Array.isArray;

    if (!(check(item1) && check(item2))) {
        throw "Failed - one of the items is not an array."
    }

    console.log("Passed", item1, item2);
}

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
    for (var i = 0; i < nums.length; i++) {
        const a = nums[i];
        for (var j = i; i < nums.length; j++) {
            const b = nums[j];
            if (a + b == target) {
                return [i, j];
            }
        }
    }
};

var twoSumFast = function (nums, target) {
    let lookup = {}

    for (let i = 0; i < nums.length; i++) {
        const a = nums[i]
        const b = target - a

        if (lookup.hasOwnProperty(b)) {
            return [lookup[b], i]
        }

        lookup[a] = i
    }

    throw "Failed"
}

// [2, 7, 11, 15], target = 9
assertEqualArray(
    twoSumFast([2, 7, 11, 15], 9),
    [0, 1]
);

