const ssisbh = {
    // 소수인지 확인
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
    // 다음 소수
    nextSosu: function (number) {
        if ((number <= 1) | !Number.isInteger(number)) {
            return false;
        }
        result = number + 1;
        for (; !this.isSosu(result); result++) {}
        return result;
    },
    // 소인수분해
    sisbh: function (number) {
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
    // 소인수분해한 것 html로 변환
    sisbhToHTML: function (object) {
        const times = "&times;";

        keys = Object.keys(object);
        let result = "";
        keys.forEach(element => {
            if (object[element] <= 1) {
                result += `${element} ${times} `;
            } else {
                result += `${element}<sup>${object[element]}</sup> ${times} `;
            }
        });
        if (result) {
            result = result.slice(0, -1 - times.length);
        }
        return result;
    },
};

const inputInput = document.querySelector("input#input");
const resultP = document.querySelector("p#result");
const maxlength = 5;

resultP.innerHTML = "입력하세요.";
inputInput.addEventListener("input", () => {
    inputValue = inputInput.value;
    // 글자수 조정
    if (inputValue.length > maxlength) {
        inputInput.value = inputValue.substr(0, maxlength);
        inputValue = inputInput.value;
    }

    // 아무것도 입력 안했을떄
    if (inputValue === "") {
        resultP.innerHTML = "입력하세요.";
        return;
    }
    const inputValueInt = parseInt(inputValue);
    // 정수가 아닐때
    if (!(parseFloat(inputValue) % 1 === 0)) {
        resultP.innerHTML = "정수를 입력하세요.";
        return;
    }
    // 1보다 작거나 같을떄
    if (inputValue.length <= 1) {
        resultP.innerHTML = "2 이상의 수를 입력하세요.";
        return;
    }

    resultP.innerHTML = `${ssisbh.sisbhToHTML(ssisbh.sisbh(inputValueInt))}`;
    if (ssisbh.isSosu(inputValueInt)) {
        resultP.innerHTML += "<br>소수입니다.";
    }
});
