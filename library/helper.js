module.exports = {
    assertEqualArray: function (item1, item2) {
        const check = Array.isArray;

        if (!(check(item1) && check(item2))) {
            throw "Failed - one of the items is not an array."
        }

        if (item1.length !== item2.length) {
            throw "Failed - array sizes do not match."
        }

        for (let i = 0; i < item1.length; i++) {
            if (item1[i] !== item2[i]) {
                throw "Failed - array items not the same"
            }
        }

        console.log("Passed", item1, item2);
    }
}
