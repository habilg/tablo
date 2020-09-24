var data = {

}

var tbodiesList = {

}

var tbodies = document.querySelectorAll('tbody')

tbodies.forEach(tbody => {
    if (tbody.id != "") {
        let element = tbody.parentElement.parentElement.previousElementSibling
        tbodiesList[tbody.id] = tbodiesList[tbody.id] = [element.textContent, getComputedStyle(element).color];
    }
})

Object.keys(tbodiesList).forEach(tbodyId => {

    let tbody_rows = document.querySelector(`#${tbodyId}`).childNodes //get rows 
    tbody_rows.forEach(row => {
        let insName = row.querySelector('a').text
        let filter = tbodiesList[tbodyId][0]
        let filterColor = tbodiesList[tbodyId][1]
        // console.log(insName,filter,filterColor);
        if (!data[insName]) {

            if (filterColor == 'rgb(255, 0, 0)') {
                data[insName] = {
                    badFilters: [filter],
                    goodFilters: []
                }
            } else {
                data[insName] = {
                    goodFilters: [filter],
                    badFilters: []
                }
            }
        } else {
            if (filterColor == 'rgb(255, 0, 0)') {
                data[insName].badFilters.push(filter)
            }
            else {
                data[insName].goodFilters.push(filter)
            }
        }
    })

})

//نماد | فیلتر مثبت | فیلتر منفی 

let goodFilters = ""
let badFilters = ""
let rows = ""

Object.keys(data).forEach(insCode => {
    
    data[insCode].goodFilters.forEach(goodFilter => {

        goodFilters += goodFilter + "<br>"
    })
    data[insCode].badFilters.forEach(badFilter => {

        badFilters += badFilter + "<br>"
    })
    rows +=
        `<tr><td>${insCode}</td>
        <td>${goodFilters}</td>
        <td>${badFilters}</td></tr>`
    goodFilters = "";
    badFilters=""

})

let tableStr =
    `<table class="table" style="height: 400px">
        <thead>
            <tr>
                <th >نماد </th>
                <th >فیلترهای مثبت</th>
                <th >فیلترهای منفی</th>
            </tr>
        </thead>
        <tbody id="s_buy_table">
        </tbody>
    </table>`
let target = document.querySelector("#wrapper > div:nth-child(6) > div")
target.insertAdjacentHTML("afterbegin", tableStr)


let target2 = document.querySelector("#s_buy_table")
target2.insertAdjacentHTML("afterbegin", rows)