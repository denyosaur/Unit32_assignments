class Maths {
    constructor(arr) {
        this.array = arr;
    }

    mean(arr) {
        let total = 0;
        for (let i = 0; i < arr.length; i++) {
            total += arr[i];
        }
        return (total / arr.length);
    }

    median(arr) {
        let sorted = arr.sort()
        let middleNum = Math.round(arr.length / 2);
        if (arr.length % 2 === 1) {
            return sorted[middleNum];
        } else {
            return this.mean([sorted[middleNum - 1], sorted[middleNum]])
        }
    }

    mode(arr) {
        let counter = {};
        let mostOften = 0;
        for (let num of arr) {
            let integer = parseInt(num)
            if (counter[integer]) {
                counter[integer] = counter[integer] + 1;
            } else {
                counter[integer] = 1;
            }
        }
        for (let key in counter) {
            if (counter[key] > mostOften) {
                mostOften = key;
            }
        }
        return mostOften;
    }

    validateInt(arr) {
        for (let num of arr) {
            let intNum = parseInt(num);
            if (!intNum) {
                return false;
            }
        }
        return true;
    }
}

function mean(arr) {
    let total = 0;
    for (let i = 0; i < arr.length; i++) {
        total += arr[i];
    }
    return (total / arr.length);
}

function median(arr) {
    let sorted = arr.sort()
    let middleNum = Math.round(arr.length / 2);
    if (arr.length % 2 === 1) {
        return sorted[middleNum];
    } else {
        mean([sorted[middleNum - 1], sorted[middleNum]])
    }
}

function mode(arr) {
    let counter = {};
    let mostOften;
    for (let num of arr) {
        if (mostOften[num]) {
            mostOften[num]++;
        } else {
            mostOften[num] = 1;
        }
    }
    for (let key in counter) {
        if (counter[key] > mostOften) {
            mostOften = counter[key]
        }
    }
    return mostOften;
}

function validateInt(arr) {
    for (let num of arr) {
        let intNum = parseInt(num);
        if (intNum === NaN) {
            return false;
        }
    }
    return true;
}

module.exports = Maths

// module.exports = {
//     mean,
//     median,
//     mode,
//     validateInt
// };