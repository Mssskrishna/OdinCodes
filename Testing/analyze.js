function analyze(array) {
    let sum = 0;
    let maxi = 0;
    let mini = Infinity
    array.forEach(element => {
        sum += element
        maxi = element > maxi ? element :maxi;
        mini = element < mini ? element : mini;
    })
    const average = sum / array.length;
    return {average,maxi,mini,"length":array.length}
}

module.exports = analyze;