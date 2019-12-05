class Module {

    static capitalise(str = '') {
        var s = str.length ? str[0].toUpperCase() : s
        return str.length > 1 ? s + str.substr(1).toLowerCase() : s
    }

    static pad(str = '', pad, len) {
        var delim = ''
        var arr = str.split(delim).slice()
        var method = len > 0 ? 'push' : 'unshift'
        while(arr.length < Math.abs(len)) {
            arr[method](pad)
        }
        return arr.join(delim)
    }

}

module.exports = Module