const sosu_soinsubunhae = {
    isSosu: function (number) {
        if ((number <= 1) | !Number.isInteger(number)) {
            return false;
        }

        for (let i = 2; i < number; i++) {
            if (number % i === 0) {
                return false;
            }
        }
        return true;
    },

    nextSosu: function (number) {
        if ((number <= 1) | !Number.isInteger(number)) {
            return false;
        }
        result = number + 1;
        for (; !this.isSosu(result); result++) {}
        console.log(result);
    },
    soinsubunhae: function (number) {
        let result = {};

        while (number % 2 == 0) {
            if (result[2] === undefined) {
                result[2] = 0;
            }
            result[2]++;
            number = number / 2;
        }
        for (var i = 3; i * i <= number; i = this.nextSosu(i)) {
            while (number % i == 0) {
                // console.log(i);
                if (result[i] === undefined) {
                    result[i] = 0;
                }
                result[i]++;
                number = number / i;
            }
        }
        if (number > 2) {
            if (result[number] === undefined) {
                result[number] = 0;
            }
            result[number]++;
        }
        return result;
    },
    soinsubunhaeToText: function (object) {},
};
