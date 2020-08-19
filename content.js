document.querySelector('th[data-eng="17"]').textContent = "صف فروشنذگان"
document.querySelector('th[data-eng="15"]').textContent = "صف خریداران"
var chekValue = '18626347ce169fc4087ac7747df1fbd6';

var tblHtml = `
   <style>
        .sort_header_habil{
            cursor: pointer;
        }
          .all-buy-c {
            background: #cfe7ce !important;
        }
    </style>
    
    <div class="col-md-12 col-md-custom right">
        عبارت محاسباتی را وارد کنید :<input  class="input" type="text" name="عبارت محاسباتی را بنویسید" id="criteria">
        <button id="doCriteria" type="button" class="btn-outline-danger btn bt" >اعمال عبارت محاسباتی</button>
        <h3> کارهای مانده-> فعال سازی عبارت محاسباتی/ اصلاح فیلتر برای کاراکترهای مشکل دار/ذخیره رشته در بانک داده/نمودار تغییر درصد با خریدها/ محاسبات مالکیت بازار</h3>
    </div >
   

                            <div class="col-md-12 col-md-custom right">
                                <div class="tableFixedBuy" >
                                    <table class="table">
                                        <thead>
                                            <tr>
                                                <th class="sort_header_habil" data-eng="101">زمان آخرین معامله</th>
                                                <th class="sort_header_habil" data-eng="119">نماد</th>
                                                <th class="sort_header_habil" data-eng="103">جمع خریدهای درشت</th>
                                                <th class="sort_header_habil" data-eng="102">خریداران </th>
                                                <th class="sort_header_habil" data-eng="104">فروشنده ها</th>
                                                <th class="sort_header_habil" data-eng="105">جمع فروشهای درشت </th>
                                                <th class="sort_header_habil" data-eng="106">برآیند معاملات </th>
                                                <th class="sort_header_habil" data-eng="107">تکرار هشدار خرید</th>
                                                <th class="sort_header_habil" data-eng="108">تکرار هشدار فروش</th>
                                                <th class="sort_header_habil" data-eng="109">اندکس تکرار</th>
                                                <th class="sort_header_habil" data-eng="110">تمایل به خرید</th>
                                                <th class="sort_header_habil" data-eng="111">تمایل به فروش</th>
                                                
                                            </tr>
                                        </thead>
                                        <tbody id="s_buy_table">
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        `
document.querySelector("body > main > div > div > div.row > div:nth-child(1)").insertAdjacentHTML("afterend", tblHtml);


var s = document.createElement("script");
s.textContent = `
var actorLength = 0;
mw.sortIndex = 1;


var socketActor = io('http://api.tablokhani.com/actorlist?check=${chekValue}');
socketActor.on('actorList', function (actorList) {
    if (actorList.length == actorLength) {
        console.log("No update");

    } else {
        actorLength = actorList.length;
        renderTable(mw.sortIndex)
    }

});

function mapper(filter) {
    // console.log("MAPPER IS LOADED filter = "+filter )
    mw.summerizedArray = []
    mw.insCodeArray = []
    for (var i in mw.actorList) {
        var solitaryObj = mw.actorList[i];
        var key = solitaryObj.InsCode;
        var index = mw.insCodeArray.indexOf(key);
        if (index == -1 || mw.insCodeArray.length == 0) {
            mw.insCodeArray.push(key);

            if (solitaryObj.type == 'b') {
                                        //ins, time                    ,mean buy value             , total buy                                  , seller                  , total sell                               , balance                                         ,buy count                  ,sell count                 , repeat index                                                                                  
                mw.summerizedArray.push([key, Number(solitaryObj.HEven), Number(solitaryObj.count), Number(solitaryObj.count) * solitaryObj.vol, 0                        , 0                                        ,  Number(solitaryObj.count) * solitaryObj.vol    ,Number(solitaryObj.buycc), Number(solitaryObj.sellcc), Number(solitaryObj.buycc) - Number(solitaryObj.sellcc), (solitaryObj.buySumVol / solitaryObj.sBuy).toFixed(2), (solitaryObj.sellSumVol / solitaryObj.sSell).toFixed(2)]);

            } else {
                mw.summerizedArray.push([key, Number(solitaryObj.HEven), 0                        ,0                                           , Number(solitaryObj.count), Number(solitaryObj.count)*solitaryObj.vol, (-1)*Number(solitaryObj.count) * solitaryObj.vol, Number(solitaryObj.buycc), Number(solitaryObj.sellcc), Number(solitaryObj.buycc) - Number(solitaryObj.sellcc), (solitaryObj.buySumVol / solitaryObj.sBuy).toFixed(2), (solitaryObj.sellSumVol / solitaryObj.sSell).toFixed(2)]);

            }

        } else {
            if (mw.summerizedArray[index][1] < Number(solitaryObj.HEven)) {
                mw.summerizedArray[index][1] = Number(solitaryObj.HEven)
            }


            if (solitaryObj.type == 'b') {
                mw.summerizedArray[index][2] += Number(solitaryObj.count);
                mw.summerizedArray[index][3] += Number(solitaryObj.count) * solitaryObj.vol;
            } else {
                mw.summerizedArray[index][4] += Number(solitaryObj.count);
                mw.summerizedArray[index][5] += Number(solitaryObj.count) * solitaryObj.vol;
            }
            
            mw.summerizedArray[index][6] =mw.summerizedArray[index][3]-mw.summerizedArray[index][5] ;
            mw.summerizedArray[index][7] = Number(solitaryObj.buycc);
            mw.summerizedArray[index][8] = Number(solitaryObj.sellcc);
            mw.summerizedArray[index][9] = Number(solitaryObj.buycc) - Number(solitaryObj.sellcc);
            mw.summerizedArray[index][10] = (solitaryObj.buySumVol / solitaryObj.sBuy).toFixed(2)
            mw.summerizedArray[index][11] = (solitaryObj.sellSumVol / solitaryObj.sSell).toFixed(2)
        }
    }
    if (typeof filter != undefined) {
        // console.log("FROM FILTER")
        var result;
        mw.summerizedArray.filter((item, index, array) => {
            if (item.includes(filter)) {
                result = array[index]
                // console.log(result);
                mw.summerizedArray = [];
        mw.summerizedArray.push(result)
            }
        })
        
        
    }
}


function formatTime(time) {
    if (time.length == 5) time = '0' + time;
    time = time.toString().slice(0, 2) + ':' + time.toString().slice(2, 4) + ':' + time.toString().slice(4, 6);
    return time;
}

function renderTable(sortIndex, filter) {
    mapper(filter);
    // console.log("renderTable IS LOADED")
    var myArray = mw.summerizedArray.sort((a, b) => b[sortIndex] - a[sortIndex])
    var tr_buy = "";
    myArray.forEach(item => {
        if (item[3] - item[5] > 0) {

            tr_buy += '<tr>';
            tr_buy += '<td style="background-color:#cfe7ce;">' + formatTime(item[1].toString()) + '</td>'
            tr_buy += '<td style="background-color:#cfe7ce; font-weight: bold;">' + mw.insRowsObj[item[0]].LVal18AFC + '</td>'
            tr_buy += '<td style="background-color:#cfe7ce;">' + volChange(item[3]) + '</td>'
            tr_buy += '<td style="background-color:#cfe7ce;">' + item[2] + '</td>'
            tr_buy += '<td style="background-color:#cfe7ce;">' + item[4] + '</td>'
            tr_buy += '<td style="background-color:#cfe7ce;">' + volChange(item[5]) + '</td>'
            tr_buy += '<td style="background-color:#cfe7ce; font-weight: bold;color: blue;">' + volChange(item[6]) + '</td>'
            tr_buy += '<td style="background-color:#cfe7ce;">' + item[7] + '</td>'
            tr_buy += '<td style="background-color:#cfe7ce;">' + item[8] + '</td>'
            tr_buy += '<td style="background-color:#cfe7ce;">' + item[9] + '</td>'
            tr_buy += '<td style="background-color:#cfe7ce;">' + item[10] + '</td>'
            tr_buy += '<td style="background-color:#cfe7ce;">' + item[11] + '</td>'
            tr_buy += '</tr>';
        } else {
            tr_buy += '<tr>';
            tr_buy += '<td>' + formatTime(item[1].toString()) + '</td>'
            tr_buy += '<td  style="font-weight: bold;">' + mw.insRowsObj[item[0]].LVal18AFC + '</td>'
            tr_buy += '<td>' + volChange(item[3]) + '</td>'
            tr_buy += '<td>' + item[2] + '</td>'
            tr_buy += '<td>' + item[4] + '</td>'
            tr_buy += '<td>' + volChange(item[5]) + '</td>'
            tr_buy += '<td style="font-weight: bold;color: red;">' + volChange((-1)*item[6]) + '</td>'
            tr_buy += '<td>' + item[7] + '</td>'
            tr_buy += '<td>' + item[8] + '</td>'
            tr_buy += '<td>' + item[9] + '</td>'
            tr_buy += '<td>' + item[10] + '</td>'
            tr_buy += '<td>' + item[11] + '</td>'
            tr_buy += '</tr>';
        }

    });
    document.body.querySelector('#s_buy_table').innerHTML = tr_buy;
    myArray = [];
}
function getInsCode(InsString) {
    for (var key in mw.insRowsObj) {
        var element = mw.insRowsObj[key]
        if (InsString === element.LVal18AFC) {
            console.log(key + " = " + InsString)
            return key
        }
    }
}

$(document).ready(function () {
    $(document).on('click', '.sort_header_habil', function (e) {
        e.preventDefault();
        var thisSortBy = $(this).attr('data-eng') - 100;
        mw.sortIndex = thisSortBy;
        console.log("Sorted base on column " + thisSortBy);
        renderTable(thisSortBy)
    });
});
$('#doCriteria').click(function (e) {
    e.preventDefault();
    var _criteria = $('#criteria').val();
    console.log("do search is working")

});
$(document).on('click', '#search_accept', function () {
    var value = $('#search_namad').val();
    if (value.length >= 2) {
        renderTable(mw.sortIndex, getInsCode(value));
    } else {
       console.log("نمادی وارد نکردید");

    }
});
$(document).on('click', '#search_all', function () {
    mw.filterText = 0;
    renderTable(mw.sortIndex)
});

`




document.body.appendChild(s)