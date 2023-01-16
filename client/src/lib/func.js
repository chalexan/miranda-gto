// генерация случайной строки

export const str_rand = () => {
    const i = 4;
    var rnd1 = '';
    var rnd2 = '';
    while (rnd1.length < i)
        rnd1 += Math.random().toString(36).substring(2);
    while (rnd2.length < i)
        rnd2 += Math.random().toString(36).substring(2);
    return rnd1.substring(0, i - 1) + "-" + rnd2.substring(0, i);
}