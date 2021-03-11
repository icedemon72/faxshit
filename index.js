function resCalc (ost, ni, xi, msum, arr, array) {//<- function that takes every single function that was written before as its arguments, 
    let resArr = [];                        //and then creates an object that is going to be used for data manipulation or sum shit
    ost.forEach((x, y) => resArr.push(x * ni[y] * xi[y]));
    let res = (resArr.reduce((a, b) => a + b));
    return {'ostalo': array, 'mod': arr, 'proizvodmod': msum, 'ostatak': ost, 'ni': ni, 'xi': xi, 'rezultati': resArr, 'rezultat': res};
}

function xiCalc(num, arrVal) { //Calculates x1, x2... xi
    let t = num % arrVal, i = 1;
    if(num % arrVal === 0 || arrVal % num === 0 || (num % 2 === 0 && arrVal % 2 === 0) ) {
        return 1;
    }
    if (t !== 1 || !t) {
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
    let res = moduleCalc(arr, array);
    let p = ((`${n1} = (${array[0].join(', ')})<br/>${n2} = (${array[1].join(', ')})<br/>[${n1} + ${n2}]<span class='small'>(${arr.join(', ')})
                    </span> = (<span class='bold'>${array[2].join(', ')}</span>)<br/><br/>
                    Mod = ${arr.join(' &#215 ')} = <span class='bold'>${res.proizvodmod}</span><br/><br/>
                    <span class='italic'>{Ni = Mod / mod Y}</span><br/>
                    ${res.ni.map((x, y) => `N<span class='small'>${[y + 1]}</span> = ${res.proizvodmod} / ${arr[y]} = <span class='bold'>${x}</span>`).join('<br/>')}<br/><br/>
                    <span class='italic'>{Ni Xi = 1(mod Y)}</span><br/>
                    ${res.xi.map((x, y) => `${res.ni[y]}x<span class='small'>${y + 1}</span> = 1(Mod ${arr[y]}) => Xi = <span class='bold'>${x}</span>`).join('<br/>')}<br/><br/>
                    <span class='italic'>{Rez<span class='small'>i</span> = Ostatak<span class='small'>i</span> &#215 Ni &#215 Xi}<br/>
                    ${res.rezultati.map((x, y) => `Rez<span class='small'>${y + 1}</span> = ${res.ostatak[y]} + ${res.ni[y]} + ${res.xi[y]} = <span class='bold'>${x}</span>`).join('<br/>')}<br/><br/>
                    Rezultat = (${res.rezultati.join(' + ')}) = <span class='bold'>${res.rezultat}</span>`));
    return [res, p]; 
}

function minus(n1, n2, arr) {//<- function that subtracts the numbers that were generated when the button was pressed
    arr.reverse();
    let array = [[], [], []];
    arr.forEach(function(x) {
        array[0].push(n1 % x);
        array[1].push(x - (n2 % x));
        array[2].push(((n1 % x) + (x - (n2 % x))) % x);
    });
    let res = moduleCalc(arr, array);
    let p = ((`${n1} = (${array[0].join(', ')})<br/>${n2} = (${array[1].join(', ')})<br/>[${n1} - ${n2}]<span class='small'>(${arr.join(', ')})
                    </span> = (<span class='bold'>${array[2].join(', ')}</span>)<br/><br/>
                    Mod = ${arr.join(' &#215 ')} = <span class='bold'>${res.proizvodmod}</span><br/><br/>
                    <span class='italic'>{Ni = Mod / mod Y}</span><br/>
                    ${res.ni.map((x, y) => `N<span class='small'>${[y + 1]}</span> = ${res.proizvodmod} / ${arr[y]} = <span class='bold'>${x}</span>`).join('<br/>')}<br/><br/>
                    <span class='italic'>{Ni Xi = 1(mod Y)}</span><br/>
                    ${res.xi.map((x, y) => `${res.ni[y]}x<span class='small'>${y + 1}</span> = 1(Mod ${arr[y]}) => Xi = <span class='bold'>${x}</span>`).join('<br/>')}<br/><br/>
                    <span class='italic'>{Rez<span class='small'>i</span> = Ostatak<span class='small'>i</span> &#215 Ni &#215 Xi}<br/>
                    ${res.rezultati.map((x, y) => `Rez<span class='small'>${y + 1}</span> = ${res.ostatak[y]} + ${res.ni[y]} + ${res.xi[y]} = <span class='bold'>${x}</span>`).join('<br/>')}<br/><br/>
                    Rezultat = (${res.rezultati.join(' + ')}) = <span class='bold'>${res.rezultat}</span>`));//
    return [res, p];
}

function puta(n1, n2, arr) { //<- function that multiplies the numbers that were generated when the button was pressed
    arr.reverse();
    let array = [[], [], []];
    arr.forEach(function(x) {
        array[0].push(n1 % x);
        array[1].push(n2 % x);
        array[2].push(((n1 % x) * (n2 % x)) % x); //remainder (with X) from the both numbers and their multiplication values
    });                                           //then that value is moduled with X
    let res = moduleCalc(arr, array);
    let  p = ((`${n1} = (${array[0].join(', ')})<br/>${n2} = (${array[1].join(', ')})<br/>[${n1} &#215 ${n2}]<span class='small'>(${arr.join(', ')})
                    </span> = (<span class='bold'>${array[2].join(', ')}</span>)<br/><br/>
                    Mod = ${arr.join(' &#215 ')} = <span class='bold'>${res.proizvodmod}</span><br/><br/>
                    <span class='italic'>{Ni = Mod / mod Y}</span><br/>
                    ${res.ni.map((x, y) => `N<span class='small'>${[y + 1]}</span> = ${res.proizvodmod} / ${arr[y]} = <span class='bold'>${x}</span>`).join('<br/>')}<br/><br/>
                    <span class='italic'>{Ni Xi = 1(mod Y)}</span><br/>
                    ${res.xi.map((x, y) => `${res.ni[y]}x<span class='small'>${y + 1}</span> = 1(Mod ${arr[y]}) => Xi = <span class='bold'>${x}</span>`).join('<br/>')}<br/><br/>
                    <span class='italic'>{Rez<span class='small'>i</span> = Ostatak<span class='small'>i</span> &#215 Ni &#215 Xi}<br/>
                    ${res.rezultati.map((x, y) => `Rez<span class='small'>${y + 1}</span> = ${res.ostatak[y]} + ${res.ni[y]} + ${res.xi[y]} = <span class='bold'>${x}</span>`).join('<br/>')}<br/><br/>
                    Rezultat = (${res.rezultati.join(' + ')}) = <span class='bold'>${res.rezultat}</span>`));
    return [res, p];
}
const sve = (n1, n2, arr) => [plus(n1, n2, arr), minus(n1, n2, arr.reverse()), puta(n1, n2, arr.reverse())];

function buildTable(data, is, znak = [''], p){ //<- This function should parse and create a html table
    if(!is) {
        data = [data], p = [p]; //creates arrays if there is only one input (that is, if 'EVERYTHING' isnt selected)
    }
    let div = document.querySelector('#rezultat'), divMeta = document.querySelector('#metadata');
    data.forEach((x, y) => {
        let metadata = ['mod', 'ostatak', 'ni', 'xi', 'rezultati'],
        proizvodMod = x.proizvodmod, rezultat = x.rezulat, ostalo = x.ostalo, 
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
        resArr.push([' ', ' ', ' ', ' ', ' ']); //hard-coded shit 
        resArr[resArr.length - 1][0] = proizvodMod, 
        resArr[resArr.length - 1][4] = data[y]['rezultat']; //injects results in multidimensional array
        createTable(resArr, div, y, p[y]);
    });
    return;
}
function createTable(tableData, div, id, para) { //copied from the fuckin stackoverflow, no idea how it works... magic probs
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
    let checkbox = document.getElementById('chbx'), p1 = document.createElement('p');
    if(checkbox.checked) {
        let p = document.createElement('p');
        p.innerHTML = para;
        p.classList = `para${id + 1}`;
        div.appendChild(p); //appends paragraph element before the table in order to show how the calculations were done
        p1.innerHTML = (`<span class='italic'>Provera: <span class='bold'>${tableData[tableData.length - 1][4]} = 
        ${tableData[tableData.length - 1][4] % tableData[tableData.length - 1][0]}(mod ${tableData[tableData.length - 1][0]})</span></span>
        <br/><br/>`); 
    }
    div.appendChild(table);
    if (checkbox.checked) div.appendChild(p1);
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
    }//this if statements checks if something is empty, and if it is it'll throw some random bullshit
    while(div.firstChild) div.removeChild(div.firstChild); //removes calculations from the div (if there were any)   
    let res = (znak === 'plus') ? plus(num1, num2, modul) : (znak === 'minus') ? minus(num1, num2, modul) : (znak === 'puta') ? puta(num1, num2, modul) : sve(num1, num2, modul);
    let isAll = false, znakfje;
    if(znak === 'sve') {
        isAll = true;
        znakfje = ['+', '-', 'x'];
        buildTable([res[0][0], res[1][0], res[2][0]], isAll, znakfje, [res[0][1], res[1][1], res[2][1]]);
        return 0;
    }//calling the other functions with some bullshit arguments idk 
    buildTable(res[0], isAll, znakfje, res[1]);
    return 0;
}
/*
~~Nemam jebeno pojma zasto jebeno ne radi~~ scratch that... I fucking did it
Created by Jovan Isailovic 2021.03.05 20:46 -> 2021.03.11 20:55
*/
