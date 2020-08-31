var data = {
        
}

var tbodiesList = {

}

// var tbodies = document.getElementsByTagName('tbody') //htmlcollection

var tbodies = document.querySelectorAll('tbody')

tbodies.forEach(tbody => {
    if (tbody.id != "") {
        tbodiesList[tbody.id] = tbody.parentElement.parentElement.previousElementSibling.textContent;
    }
})




Object.keys(tbodiesList).forEach(tbodyId => {

    let tbody_rows = document.querySelector(`#${tbodyId}`).childNodes //get rows 
    tbody_rows.forEach(row => {
        if (!data[row.querySelector('a').text]) {
            data[row.querySelector('a').text] = {
                present: [tbodiesList[tbodyId]]
            }
        } else {
            data[row.querySelector('a').text].present.push(tbodiesList[tbodyId])   
        }
    })

})






document.querySelector("#IndexTable15 > tr:nth-child(1) > td:nth-child(2)")





