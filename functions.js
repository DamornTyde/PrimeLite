document.getElementById("input").setAttribute("max", Number.MAX_SAFE_INTEGER);

document.addEventListener("keydown", function(e) {
    switch(e.key) {
        case "ArrowUp":
            setInput(1);
            break
        case "ArrowDown":
            setInput(-1);
            break
        case "Enter":
            document.getElementById("submit").click();
    }
});

function setInput(x) {
    if(document.activeElement.id != "input") {
        const field = document.getElementById("input")
        const i = Number(field.value) + x;
        if (Number.isSafeInteger(i) && i > 1) {
            field.value = i;
        }
    }
}

document.getElementById("submit").addEventListener("click", function () {
    const input = Number(document.getElementById("input").value);
    let test = input;
    if (Number.isSafeInteger(input) && input > 1) {
        const answer = [];
        let lastNumber = 2;
        while (lastNumber * lastNumber <= test) {
            if (test % lastNumber == 0) {
                answer.push(lastNumber);
                test = test / lastNumber;
            } else {
                lastNumber += (lastNumber % 2) + 1;
            }
        }
        answer.push(test);
        const output = document.createDocumentFragment();
        output.appendChild(document.createTextNode(`${input.toLocaleString()} = `));
        let i = 0;
        while (true) {
            const x = answer[i];
            output.appendChild(document.createTextNode(x.toLocaleString()));
            const y = answer.filter(z => z == x).length;
            if (y > 1) {
                const sup = document.createElement("sup");
                sup.appendChild(document.createTextNode(y.toLocaleString()));
                output.appendChild(sup);
            }
            i += y;
            if (i == answer.length) {
                const print = document.getElementById("print");
                print.innerHTML = "";
                print.appendChild(output);
                return;
            }
            output.appendChild(document.createTextNode(" * "));
        }
    }
    alert("Invalid input!");
});
