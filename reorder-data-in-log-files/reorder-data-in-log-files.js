#!/usr/bin/env node

/** 
 * source: https://leetcode.com/problems/reorder-data-in-log-files/
 * 
 * idea: 
 * 
 * Reorder the logs so that all of the letter-logs come before any digit-log.  
 * The letter-logs are ordered lexicographically ignoring identifier, with the identifier used in case of ties.  
 * The digit-logs should be put in their original order.
*/
'use strict';

const helper = require("../library/helper")

/**
 * a readable way, but fails for some reason on test# 23
 * 
 * @param {string[]} logs
 * @return {string[]}
 */
const reorderLogFilesProper = function (logs) {
    let items = {}
    let logData = []

    const logMe = (msg, result, a, b) => {
        logData.push(msg.concat(" = ", result, " - input: ", a.value, ", ", b.value))
    }

    // deconstruct the key into relevant parts and stores them in hash
    const itemizer = (key) => {
        if (key in items) {
            return items[key]
        }

        let parts = key.split(/ (.*)$/)
        const value = parts[1].toString()
        const isDigit = RegExp(/^[0-9 ]+$/).test(value)

        const itemDetail = {
            id: parts[0],
            value,
            isDigit
        }

        items[key] = itemDetail
        return itemDetail
    }

    // sort digit/let log combinations
    const digitSorter = (a, b) => {
        if (!b.isDigit) {
            return 1
        }

        if (!a.isDigit) {
            return -1
        }

        return 0
    }

    // indicates sort direction for unequal values
    const valueSorter = (a, b) => {
        if (a.value < b.value) {
            return -1
        }

        return 1
    }

    // indicates sort direction for unequal ids
    const idSorter = (a, b) => {
        if (a.id < b.id) {
            return -1
        }

        return 1
    }

    // custom sorter that considers all options
    const logSorter = (itemA, itemB) => {
        const a = itemizer(itemA)
        const b = itemizer(itemB)

        if (a.isDigit || b.isDigit) {
            logMe("DigitSorter", digitSorter(a, b), a, b)
            return digitSorter(a, b)
        }

        if (a.value != b.value) {
            logMe("ValueSorter", valueSorter(a, b), a, b)
            return valueSorter(a, b)
        }

        if (a.id !== b.id) {
            logMe("idSorter", idSorter(a, b), a, b)
            return idSorter(a, b)
        }

        logMe("Nothing to do", "--0--", a, b)
        return 0
    }

    const trackIt = logs[0] === "6p tzwmh ige mc"
    const result = logs.sort(logSorter)

    if (trackIt) {
        console.log("Hacked")
        console.log(logData)
        return logData
    }

    console.log("Standard", logs[0])
    return result
};

/*
* @param {string[]} logs
* @return {string[]}
*/
const reorderLogFiles = function (logs) {
    let items = {}
    let digits = []
    let letters = []

    // deconstruct the key into relevant parts and stores them in hash
    const itemizer = (key) => {
        if (key in items) {
            return items[key]
        }

        let parts = key.split(/ (.*)$/)
        const value = parts[1].toString()
        const isDigit = RegExp(/^[0-9 ]+$/).test(value)

        const itemDetail = {
            id: parts[0],
            value,
            isDigit
        }

        items[key] = itemDetail
        return itemDetail
    }

    const letterSorter = (a, b) => {
        const itemA = itemizer(a)
        const itemB = itemizer(b)

        if (itemA.value < itemB.value) {
            return -1
        }

        if (itemA.value > itemB.value) {
            return 1
        }

        if (itemA.id < itemB.id) {
            return -1
        }

        if (itemA.id > itemB.id) {
            return 1
        }

        return 0
    }

    // analyze and hash all items
    for (let i = 0; i < logs.length; i++) {
        const item = itemizer(logs[i])

        if (item.isDigit) {
            digits.push(logs[i])
            continue;
        }

        letters.push(logs[i])
    }

    const result = letters.sort(letterSorter).concat(digits)

    return result
}

// helper.assertEqualArray(
//     reorderLogFiles(["dig1 8 1 5 1", "let1 art can", "dig2 3 6", "let2 own kit dig", "let3 art zero"]),
//     ["let1 art can", "let3 art zero", "let2 own kit dig", "dig1 8 1 5 1", "dig2 3 6"]
// )

// helper.assertEqualArray(
//     reorderLogFiles(["a1 9 2 3 1", "g1 act car", "zo4 4 7", "ab1 off key dog", "a8 act zoo"]),
//     ["g1 act car", "a8 act zoo", "ab1 off key dog", "a1 9 2 3 1", "zo4 4 7"]
// )


// for some reason online environment sorts it as 
// ["ubd cujg j d yf", "u lrvmdt ykmox", "4 nivgc qo z i", "uhb rfrwt qzx r", "ys0 splqqxoflgx", "0 tllgmf qp znc", "6p tzwmh ige mc", "ns 566543603829", "ha6 1 938 376 5", "3yx 97 666 56 5", "d 84 34353 2249",                    "ah4 4209164350", "rap 7729 8 125", "apx 814023338 8", "s 1088746413789"]
// while local is correct
// ["ubd cujg j d yf", "u lrvmdt ykmox", "4 nivgc qo z i", "uhb rfrwt qzx r", "ys0 splqqxoflgx", "0 tllgmf qp znc", "6p tzwmh ige mc", "ns 566543603829", "ha6 1 938 376 5", "3yx 97 666 56 5", "d 84 34353 2249", "s 1088746413789", "ah4 4209164350", "rap 7729 8 125", "apx 814023338 8"]

// helper.assertEqualArray(
//     reorderLogFiles(["a1 9 2 3 1", "g1 act car", "zo4 4 7", "ab1 off key dog", "a8 act zoo", "a2 act car"]),
//     ["a2 act car", "g1 act car", "a8 act zoo", "ab1 off key dog", "a1 9 2 3 1", "zo4 4 7"]
// )

helper.assertEqualArray(
    reorderLogFiles(
        ["6p tzwmh ige mc", "ns 566543603829", "ubd cujg j d yf", "ha6 1 938 376 5", "3yx 97 666 56 5", "d 84 34353 2249", "0 tllgmf qp znc", "s 1088746413789", "ys0 splqqxoflgx", "uhb rfrwt qzx r", "u lrvmdt ykmox", "ah4 4209164350", "rap 7729 8 125", "4 nivgc qo z i", "apx 814023338 8"]
    ),
    ["ubd cujg j d yf", "u lrvmdt ykmox", "4 nivgc qo z i", "uhb rfrwt qzx r", "ys0 splqqxoflgx", "0 tllgmf qp znc", "6p tzwmh ige mc", "ns 566543603829", "ha6 1 938 376 5", "3yx 97 666 56 5", "d 84 34353 2249", "s 1088746413789", "ah4 4209164350", "rap 7729 8 125", "apx 814023338 8"]
)

// for some reason online sort fails with these results if the reorderLogFilesProper is used

// [ 'DigitSorter = -1 - input: tzwmh ige mc, 814023338 8',
//   'DigitSorter = -1 - input: tzwmh ige mc, 1088746413789',
//   'DigitSorter = 0 - input: 814023338 8, 1088746413789',
//   'DigitSorter = -1 - input: cujg j d yf, 814023338 8',
//   'DigitSorter = 0 - input: 1 938 376 5, 814023338 8',
//   'DigitSorter = 0 - input: 97 666 56 5, 814023338 8',
//   'DigitSorter = 0 - input: 84 34353 2249, 814023338 8',
//   'DigitSorter = -1 - input: tllgmf qp znc, 814023338 8',
//   'DigitSorter = 0 - input: 566543603829, 814023338 8',
//   'DigitSorter = -1 - input: splqqxoflgx, 814023338 8',
//   'DigitSorter = -1 - input: rfrwt qzx r, 814023338 8',
//   'DigitSorter = -1 - input: lrvmdt ykmox, 814023338 8',
//   'DigitSorter = 0 - input: 4209164350, 814023338 8',
//   'DigitSorter = 0 - input: 7729 8 125, 814023338 8',
//   'DigitSorter = -1 - input: nivgc qo z i, 814023338 8',
//   'ValueSorter = 1 - input: tzwmh ige mc, cujg j d yf',
//   'ValueSorter = 1 - input: tzwmh ige mc, tllgmf qp znc',
//   'ValueSorter = -1 - input: cujg j d yf, tllgmf qp znc',
//   'ValueSorter = 1 - input: tzwmh ige mc, splqqxoflgx',
//   'ValueSorter = 1 - input: tllgmf qp znc, splqqxoflgx',
//   'ValueSorter = -1 - input: cujg j d yf, splqqxoflgx',
//   'ValueSorter = 1 - input: tzwmh ige mc, rfrwt qzx r',
//   'ValueSorter = 1 - input: tllgmf qp znc, rfrwt qzx r',
//   'ValueSorter = 1 - input: splqqxoflgx, rfrwt qzx r',
//   'ValueSorter = -1 - input: cujg j d yf, rfrwt qzx r',
//   'ValueSorter = 1 - input: tzwmh ige mc, lrvmdt ykmox',
//   'ValueSorter = 1 - input: tllgmf qp znc, lrvmdt ykmox',
//   'ValueSorter = 1 - input: splqqxoflgx, lrvmdt ykmox',
//   'ValueSorter = 1 - input: rfrwt qzx r, lrvmdt ykmox',
//   'ValueSorter = -1 - input: cujg j d yf, lrvmdt ykmox',
//   'ValueSorter = 1 - input: tzwmh ige mc, nivgc qo z i',
//   'ValueSorter = 1 - input: tllgmf qp znc, nivgc qo z i',
//   'ValueSorter = 1 - input: splqqxoflgx, nivgc qo z i',
//   'ValueSorter = 1 - input: rfrwt qzx r, nivgc qo z i',
//   'ValueSorter = -1 - input: lrvmdt ykmox, nivgc qo z i' ]

//   ["ubd cujg j d yf","u lrvmdt ykmox","4 nivgc qo z i","uhb rfrwt qzx r","ys0 splqqxoflgx","0 tllgmf qp znc","6p tzwmh ige mc","ns 566543603829","ha6 1 938 376 5","3yx 97 666 56 5","d 84 34353 2249","ah4 4209164350","rap 7729 8 125","apx 814023338 8","s 1088746413789"]
