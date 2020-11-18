
var data = JSON.parse(localStorage.getItem("actorList"))
function getHotBuyers(namad) {
    return data[namad][buyers]
}

function getHotSellers(namad) {
    return data[namad][sellers]
}
function getBuyAlertC(namad) {
    return data[namad][buyAlertC]
}
function getSellAlertC(namad) {
    return data[namad][sellAlertC]
}

function getHotSellValue(namad) {
    return data[namad][sell]
}

function getHotBuyValue(namad) {
    return data[namad][buy]
}


//-----------------------------
var _text = document.querySelectorAll('script')[13].text
var chekValue = _text.substr(_text.search(/check=/) + 6, 32);
var scr = document.createElement("script")
scr.innerHTML = `
var actorLength = 0;
var socketActor = io('http://api.tablokhani.com/actorlist?check=7ef140c63fcd085c0f764371b21f46ef');
socketActor.on('actorList', function (actorList) {
    if (actorList.length == actorLength) {
        console.log("No update");
    } else {
        actorLength = actorList.length;
        //localStorage.setItem("actorList", JSON.stringify(mapper(actorList)))
        //localStorage.setItem("actorList", actorList)
        mapper(actorList)
        console.log("اطلاعات به روز شدند")

    }
});
function mapper(actorList) {
    var data = {}
    var actorsStr = actorList.lastIndexOf(";") == actorList.length - 1 ? actorList.substr(actorList.length - 1, 1) : actorList
    var actorsArray = actorsStr.split(";")
    actorsArray.forEach(element => {
        var inf = element.split(",")
        var namadName = inf[1]
        //var namadName = (mw.insRowsObj[inf[1]].LVal18AFC).toString()
        var parent = data[namadName]
        if (inf[3] > 0) {
            if (parent == undefined) {  //!Object.keys(data).includes(namadName)
                data[namadName] = {}
                if (inf[0] == "b") {

                    data[namadName] = {
                        buyAlertC: Number(inf[14]),
                        sellAlertC: Number(inf[15]),
                        cashflow: Number(inf[18]),
                        buy: parseInt(inf[3]) * parseInt(inf[4]),
                        sell: 0,
                        buyers: parseInt(inf[3]),
                        sellers: 0
                    }
                } else {
                
                    data[namadName] = {
                        buyAlertC: Number(inf[14]),
                        sellAlertC: Number(inf[15]),
                        cashflow: Number(inf[18]),
                        sell: parseInt(inf[3]) * parseInt(inf[4]),
                        buy: 0,
                        sellers: parseInt(inf[3]),
                        buyers: 0
                    }
                }
            } else {
                if (inf[0] == "b") {
                    data[namadName]["buyAlertC"] = Number(inf[14])
                    data[namadName]["sellAlertC"] = Number(inf[15])
                    data[namadName]["cashflow"] = Number(inf[18])
                    data[namadName]["buy"] += parseInt(inf[3]) * parseInt(inf[4])
                    data[namadName]["sell"] += 0;
                    data[namadName]["buyers"] += parseInt(inf[3])
                    data[namadName]["sellers"] += 0
                } else {
                    data[namadName]["buyAlertC"] = Number(inf[14])
                    data[namadName]["sellAlertC"] = Number(inf[15])
                    data[namadName]["cashflow"] = Number(inf[18])
                    data[namadName]["sell"] += parseInt(inf[3]) * parseInt(inf[4])
                    data[namadName]["buy"] += 0;
                    data[namadName]["sellers"] += parseInt(inf[3])
                    data[namadName]["buyers"] += 0
                }
            }
       }
    });
    //return data
    localStorage.setItem("actorArray", JSON.stringify(data))
}`
document.body.insertAdjacentElement("beforeend", scr)

/*
var scr = document.createElement("script")
scr.innerHTML=`var test={
    name:"habil",
    family:"Gr"
}
var socketActor = io('http://api.tablokhani.com/actorlist?check=7ef140c63fcd085c0f764371b21f46ef');
socketActor.on('actorList', function (actorList) {
    console.log(actorList.length)
    localStorage.setItem("test",JSON.stringify(test))
});
`

document.body.insertAdjacentElement("beforeend",scr)
*/

//var testData = "b,408934423224097,95855,1,2196856780,1.51,2.76,20840,154790896.55,102545304.00,21290,13489,25930,389,1,0,2196856780,0,2196856780;b,778253364357513,100245,1,2059751430,0.83,4.96,5290,180474680.02,216415540.15,5290,110782504,5340,19009,1,0,2059751430,0,2059751430;b,2328862017676109,92129,4,2096658000,1.14,4.96,13120,379618815.62,332592805.61,13120,9018009,14640,230,2,0,2098984832,0,10494924160;b,2328862017676109,105019,1,2108292160,1.28,4.96,13120,289703219.38,225996083.27,13120,9018009,14640,230,2,0,2098984832,0,10494924160;b,2400322364771558,90618,2,3043961760,7.96,4.98,30990,937268468.60,117702768.27,30990,188461361,33990,500,25,0,2832590889.230769,0,110471044680;b,2400322364771558,90618,3,2279097570,8.10,4.98,30990,943648004.74,116514062.20,30990,188461361,33990,500,25,0,2832590889.230769,0,110471044680;b,2400322364771558,91324,2,2387965440,8.72,4.98,30990,985059303.54,112939337.72,30990,188461361,33990,500,25,0,2832590889.230769,0,110471044680;b,2400322364771558,91324,2,2128470675,8.76,4.98,30990,988344968.41,112791833.63,30990,188461361,33990,500,25,0,2832590889.230769,0,110471044680;b,2400322364771558,91432,4,2592298005,8.79,4.98,30990,997510414.33,113471622.71,30990,188461361,33990,500,25,0,2832590889.230769,0,110471044680;b,2400322364771558,91804,2,2463426090,9.05,4.98,30990,990642454.80,109481842.99,30990,188461361,33990,500,25,0,2832590889.230769,0,110471044680;b,2400322364771558,92140,1,5666769420,9.26,4.98,30990,997481773.46,107757841.45,30990,188461361,33990,500,25,0,2832590889.230769,0,110471044680;b,2400322364771558,92623,1,2916066030,9.57,4.98,30990,1004576673.99,104928153.90,30990,188461361,33990,500,25,0,2832590889.230769,0,110471044680;b,2400322364771558,93059,3,2502287550,9.82,4.98,30990,1008928383.50,102767633.03,30990,188461361,33990,500,25,0,2832590889.230769,0,110471044680;b,2400322364771558,93319,2,3607220505,10.06,4.98,30990,1020067676.58,101445643.15,30990,188461361,33990,500,25,0,2832590889.230769,0,110471044680;b,2400322364771558,93436,1,3159399510,10.10,4.98,30990,1020756602.27,101083861.72,30990,188461361,33990,500,25,0,2832590889.230769,0,110471044680;b,2400322364771558,93526,1,2342720040,10.19,4.98,30990,1020893525.95,100176097.16,30990,188461361,33990,500,25,0,2832590889.230769,0,110471044680;b,2400322364771558,93913,2,2646267090,10.31,4.98,30990,1021220040.44,99090451.83,30990,188461361,33990,500,25,0,2832590889.230769,0,110471044680;b,2400322364771558,94026,1,2969461800,10.42,4.98,30990,1024684490.07,98297298.49,30990,188461361,33990,500,25,0,2832590889.230769,0,110471044680;b,2400322364771558,95100,1,4215600690,10.65,4.98,30990,1013671013.85,95180775.29,30990,188461361,33990,500,25,0,2832590889.230769,0,110471044680;b,2400322364771558,95653,1,2407489140,10.76,4.98,30990,1011333575.47,94005642.63,30990,188461361,33990,500,25,0,2832590889.230769,0,110471044680;b,2400322364771558,100728,1,3382279590,10.81,4.98,30990,1007063911.07,93187693.27,30990,188461361,33990,500,25,0,2832590889.230769,0,110471044680;b,2400322364771558,100833,1,3828163710,10.86,4.98,30990,1009552870.67,92953709.27,30990,188461361,33990,500,25,0,2832590889.230769,0,110471044680;b,2400322364771558,101215,1,2953966800,10.92,4.98,30990,1008463411.29,92333133.04,30990,188461361,33990,500,25,0,2832590889.230769,0,110471044680;b,2400322364771558,101545,1,2811102900,11.05,4.98,30990,1008420389.90,91230038.88,30990,188461361,33990,500,25,0,2832590889.230769,0,110471044680;b,2400322364771558,103851,1,2137380300,11.30,4.98,30990,996251933.69,88159250.58,30990,188461361,33990,500,25,0,2832590889.230769,0,110471044680;b,2400322364771558,105027,2,3646221420,11.51,4.98,30990,1002473633.34,87115031.89,30990,188461361,33990,500,25,0,2832590889.230769,0,110471044680;b,2400322364771558,113151,1,2030743710,11.33,4.98,30990,963868030.56,85057066.76,30990,188461361,33990,500,25,0,2832590889.230769,0,110471044680;b,2400322364771558,113151,1,2134808130,11.35,4.98,30990,964630857.99,84997150.05,30990,188461361,33990,500,25,0,2832590889.230769,0,110471044680;b,2400322364771558,113631,1,2954679570,11.16,4.98,30990,966681688.95,86638727.78,30990,188461361,33990,500,25,0,2832590889.230769,0,110471044680;b,2589887561569709,102315,2,2792110530,0.99,4.98,15180,211363312.84,213144805.16,15180,21411843,15250,100000,3,0,2649866340,0,10599465360;b,2589887561569709,105011,1,3010634220,1.03,4.98,15180,214108238.34,207595225.92,15180,21411843,15250,100000,3,0,2649866340,0,10599465360;b,2589887561569709,113152,1,2004610080,1.08,4.98,15180,221012306.04,205027328.15,15180,21411843,15250,100000,3,0,2649866340,0,10599465360;b,2944500421562364,90352,-24,2100271680,7.55,4.94,11040,565483236.92,74943259.35,10810,40652,10820,31899,1,2,2719164760,3120497780,-3521830800;s,2944500421562364,91649,1,3040110660,0.80,4.85,11030,217962819.83,271950202.77,10810,40652,10820,31899,1,2,2719164760,3120497780,-3521830800;b,2944500421562364,115853,1,2719164760,0.93,3.71,10910,190838339.89,205175738.49,10810,40652,10820,31899,1,2,2719164760,3120497780,-3521830800;s,2944500421562364,115853,1,3200884900,0.93,3.71,10910,192094799.44,206770897.78,10810,40652,10820,31899,1,2,2719164760,3120497780,-3521830800"

function mapper(actorList) {
    var data = {}
    var actorsStr = actorList.lastIndexOf(";") == actorList.length - 1 ? actorList.substr(actorList.length - 1, 1) : actorList
    var actorsArray = actorsStr.split(";")
    actorsArray.forEach(element => {
        var inf = element.split(",")
        // var namadName = inf[1]
        var namadName = mw.insRowsObj[inf[1]].LVal18AFC
        var parent = data[namadName]
        if (inf[3] > 0) {
            if (parent == undefined) {  //!Object.keys(data).includes(namadName)
                data[namadName] = {}
                if (inf[0] == "b") {

                    data[namadName] = {
                        buyAlertC: Number(inf[14]),
                        sellAlertC: Number(inf[15]),
                        cashflow: Number(inf[18]),
                        buy: parseInt(inf[3]) * parseInt(inf[4]),
                        sell: 0,
                        buyers: parseInt(inf[3]),
                        sellers: 0
                    }
                } else {

                    data[namadName] = {
                        buyAlertC: Number(inf[14]),
                        sellAlertC: Number(inf[15]),
                        cashflow: Number(inf[18]),
                        sell: parseInt(inf[3]) * parseInt(inf[4]),
                        buy: 0,
                        sellers: parseInt(inf[3]),
                        buyers: 0
                    }
                }
            } else {
                if (inf[0] == "b") {
                    data[namadName]["buyAlertC"] = Number(inf[14])
                    data[namadName]["sellAlertC"] = Number(inf[15])
                    data[namadName]["cashflow"] = Number(inf[18])
                    data[namadName]["buy"] += parseInt(inf[3]) * parseInt(inf[4])
                    data[namadName]["sell"] += 0;
                    data[namadName]["buyers"] += parseInt(inf[3])
                    data[namadName]["sellers"] += 0
                } else {
                    data[namadName]["buyAlertC"] = Number(inf[14])
                    data[namadName]["sellAlertC"] = Number(inf[15])
                    data[namadName]["cashflow"] = Number(inf[18])
                    data[namadName]["sell"] += parseInt(inf[3]) * parseInt(inf[4])
                    data[namadName]["buy"] += 0;
                    data[namadName]["sellers"] += parseInt(inf[3])
                    data[namadName]["buyers"] += 0
                }
            }
        }
    });
    return data
}



var scr = document.createElement("script")
scr.innerHTML = `localStorage.setItem("inscodes",Object.keys(mw.insRowsObj))
`
document.body.insertAdjacentElement("beforeend", scr)






var scr = document.createElement("script")
scr.innerHTML = `
var actorLength = 0;
var socketActor = io('http://api.tablokhani.com/actorlist?check=7ef140c63fcd085c0f764371b21f46ef');
socketActor.on('actorList', function (actorList) {
    
        actorLength = actorList.length;
        var data = {}
        var actorsStr = actorList.lastIndexOf(";") == actorList.length - 1 ? actorList.substr(actorList.length - 1, 1) : actorList
        var actorsArray = actorsStr.split(";")
        actorsArray.forEach(element => {
            var inf = element.split(",")
             var namadName = inf[1]
            //var namadName = mw.insRowsObj[inf[1]].LVal18AFC
            var parent = data[namadName]
           // if (inf[3] > 0) {
                if (parent == undefined) {  //!Object.keys(data).includes(namadName)
                    data[namadName] = {}
                    if (inf[0] == "b") {

                        data[namadName] = {
                            buyAlertC: Number(inf[14]),
                            sellAlertC: Number(inf[15]),
                            cashflow: Number(inf[18]),
                            buy: parseInt(inf[3]) * parseInt(inf[4]),
                            sell: 0,
                            buyers: parseInt(inf[3]),
                            sellers: 0
                        }
                    } else {

                        data[namadName] = {
                            buyAlertC: Number(inf[14]),
                            sellAlertC: Number(inf[15]),
                            cashflow: Number(inf[18]),
                            sell: parseInt(inf[3]) * parseInt(inf[4]),
                            buy: 0,
                            sellers: parseInt(inf[3]),
                            buyers: 0
                        }
                    }
                } else {
                    if (inf[0] == "b") {
                        data[namadName]["buyAlertC"] = Number(inf[14])
                        data[namadName]["sellAlertC"] = Number(inf[15])
                        data[namadName]["cashflow"] = Number(inf[18])
                        data[namadName]["buy"] += parseInt(inf[3]) * parseInt(inf[4])
                        data[namadName]["sell"] += 0;
                        data[namadName]["buyers"] += parseInt(inf[3])
                        data[namadName]["sellers"] += 0
                    } else {
                        data[namadName]["buyAlertC"] = Number(inf[14])
                        data[namadName]["sellAlertC"] = Number(inf[15])
                        data[namadName]["cashflow"] = Number(inf[18])
                        data[namadName]["sell"] += parseInt(inf[3]) * parseInt(inf[4])
                        data[namadName]["buy"] += 0;
                        data[namadName]["sellers"] += parseInt(inf[3])
                        data[namadName]["buyers"] += 0
                    }
                }
            }
        });
        console.log(JSON.stringify(data))
        //localStorage.setItem("actorArray", JSON.stringify(data))
        console.log("اطلاعات به روز شدند")
    
});
`
document.body.insertAdjacentElement("beforeend", scr)
