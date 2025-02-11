const randomStringGenerate = (len = 100) => {
    const str = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let length = str.length;
    let random = "";
    for (let i = 0; i < length; i++) {
        let posn = Math.ceil(Math.random() * (length - 1));   // 0-1 random  => infinite => decimal
        random += str[posn];
    }
    return random;
}



module.exports = {
    randomStringGenerate
}