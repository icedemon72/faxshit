//const checkEmpty = (arr) => !arr.includes(1); //Self explanatory, idk why am I even writting this comment
function resCalc (ost, ni, xi, msum, arr, array) {//<- function that takes every single function that was written before as its arguments, 
    let resArr = [];                        //and then creates an object that is going to be used for data manipulation or sum shit
    ost.forEach((x, y) => resArr.push(x * ni[y] * xi[y]));
    let res = (resArr.reduce((a, b) => a + b));
    return {'ostalo': array, 'mod': arr, 'proizvodmod': msum, 'ostatak': ost, 'ni': ni, 'xi': xi, 'rezultati': resArr, 'rezultat': res};
}
//
function xiCalc(num, arrVal) { //Calculates x1, x2... xi
    let t = (num % arrVal === 0) ? 1 : num % arrVal, i = 1;
    /*if(num % 2 === 0 && arrVal % 2 === 0 && arrVal > num) {
        return num;
    }*/
    //console.log(`t: ${t}, num: ${num}, arrVal: ${arrVal}`)
    if(num % 2 === 0 && arrVal % 2 === 0) {
        return num;
    }
    if (t !== 1 || t !== 0) {
        while((t * i) % arrVal !== 1) {
            i++;
            if((t * i) % arrVal === 1 || (t * i) % arrVal === 0) break; //dont touch it, it works!
        }
    }
    return i; 
}

function moduleCalc(arr, array) { //<- function that calculates modules based on their value
    let moduleSum = arr.reduce((a, b) => a * b);
    let Ni = [], Xi = [], ost = array[2]; //ost is remainder
    arr.forEach(x => Ni.push(moduleSum / x)); //Ni is every Mod multiplied, and then that value is divided by every single Mod
    Ni.forEach((x, y) => Xi.push(xiCalc(x, arr[y])));
    //a = a.map(function(item) { return item == 3452 ? 1010 : item; });
    Xi = Xi.map(x => x === 0 ? 1 : x); //checks if, for some reason, Xi is 0 (it shouldnt be 0, please dont let it be 0)
    return(resCalc(ost, Ni, Xi, moduleSum, arr, array)); //calls resCalc() function (duuuh)
}

function plus(n1, n2, arr) {//<- function that adds the numbers that were generated when the button was pressed
    arr = arr.reverse();
    let array = [[], [], []], showArr = [];
    arr.forEach(function(x) {
        array[0].push(n1 % x);
        array[1].push(n2 % x);
        array[2].push(((n1 % x) + (n2 % x)) % x);
    });
    //console.log(array.join("\n").split(",").join(" ")); <- !!!!!!!!!!!!!Ovde sam stao!!!!!!!!!!!!!
    let res = moduleCalc(arr, array);
    return res; 
}

//{'Modul Rezultat': <res>, 'mod': [<res>], 'ost': [<res>], Ni...}
function minus(n1, n2, arr) {//<- function that subtracts the numbers that were generated when the button was pressed
    arr.reverse();
    let array = [[], [], []];
    arr.forEach(function(x) {
        array[0].push(n1 % x);
        array[1].push(x - (n2 % x));
        array[2].push(((n1 % x) + (x - (n2 % x))) % x);
    });
    let res = moduleCalc(arr, array);
    return res;
}

function puta(n1, n2, arr) { //<- function that multiplies the numbers that were generated when the button was pressed
    arr.reverse();
    let array = [[], [], []];
    arr.forEach(function(x) {
        array[2].push(((n1 % x) * (n2 % x)) % x); //remainder (with X) from the both numbers and their multiplication values
    });                                           //then that value is moduled with X
    let res = moduleCalc(arr, array);
    return res;
}
const sve = (n1, n2, arr) => [plus(n1, n2, arr), minus(n1, n2, arr.reverse()), puta(n1, n2, arr.reverse())];

function buildTable(data, is, znak = ['']){ //<- This function should parse and create a html table
    if(!is) {
        data = [data];
    }
    let div = document.querySelector('#rezultat'), divMeta = document.querySelector('#metadata');
    data.forEach((x, y) => {
        let metadata = ['mod', 'ostatak', 'ni', 'xi', 'rezultati'],
        proizvodMod = x.proizvodmod, rezultat = x.rezultat, ostalo = x.ostalo, 
        resArr = new Array(x.mod.length); //creates an empty array that's going to hold values for the table(s)
        for (var i = 0; i < resArr.length; i++) {
            resArr[i] = new Array();
        }
        for(let i = 0; i < x.mod.length; i++) { 
            for(let j = 0; j < metadata.length; j++) {
                resArr[i].push(x[metadata[j]][i]);
            }
        }
        resArr.unshift(['Mod', 'Ostatak', 'Ni', 'Xi', `Rez${znak[y]}`]), 
        resArr.push(['  ', ' ', ' ', ' ', ' ']); //hard-coded shit 
        resArr[resArr.length - 1][0] = proizvodMod, 
        resArr[resArr.length - 1][4] = rezultat; //injects results in multidimensional array
        createTable(resArr, div, y);
    });
    return;
}
function createTable(tableData, div, id) { //copied from the fuckin stackoverflow, no idea how it works... magic probs
    let table = document.createElement('table');
    let row = {};
    let cell = {};
    tableData.forEach(function(rowData) {
      row = table.insertRow(-1); // [-1] for last position in Safari
      rowData.forEach(function(cellData) {
        cell = row.insertCell();
        cell.textContent = cellData;
      });
    });
    table.setAttribute('id', `table${id + 1}`); //adding attributes (class) to tables in order to (maybe) manipulate them in css
    div.appendChild(table);
}

function randF(){ //<- function that is called when the button 'calculate' or whtvr is pressed
    div = document.getElementById('rezultat');
    let num1 = document.getElementById('number1').value, 
    num2 = document.getElementById('number2').value,
    znak = document.getElementById('znak').value,
    modulPre = document.getElementById('modul').value.split(',').map(x => x.replace(/\D/g,' ')).map(x => parseInt(x)).sort((x, y) => x - y);
    modul = modulPre.filter((x, y) => modulPre.indexOf(x) === y);
    if(!(num1 && num2 && znak && modul.length > 0) || modul.includes(NaN) || num1 < 0 || num2 < 0) {
        alert('Unesi u polja odgovarajuce brojeve/znakove!');
        return 0;
    }else if(modul.reduce((x, y) => x * y) > Number.MAX_SAFE_INTEGER) {
        alert('Ova kombinacija modula je prevelika!');
        return 0;
    }
    while(div.firstChild) div.removeChild(div.firstChild); //removes calculations from the div (if there were any)   
    //this if statements checks if something is empty, and if it is it'll throw some random bullshit
    let res = (znak === 'plus') ? plus(num1, num2, modul) : (znak === 'minus') ? minus(num1, num2, modul) : (znak === 'puta') ? puta(num1, num2, modul) : sve(num1, num2, modul);
    let isAll = false, znakfje;
    if(znak === 'sve') {
        isAll = true;
        znakfje = ['+', '-', '*']
    }//calling the other functions with some bullshit arguments idk 
    buildTable(res, isAll, znakfje);
    return 0;
}
/*
~~Nemam jebeno pojma zasto jebeno ne radi~~ scratch that... I fucking did it
Created by Jovan Isailovic 2021.03.05 20:46 -> 2021.03.06 18:57
*/