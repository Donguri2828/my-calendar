
/**
 * カレンダーの曜日行より下の行を表すHTMLの文字列を返す関数です。
 * @param {Number} year 年
 * @param {Number} month 月
 * @returns {String} カレンダーの内容が書かれた<tr>要素群の文字列。
 */
function createCalendarHTML(year, month){
    let calendarHtml = '';
    const firstDate = new Date(year, month, 1);

    // カレンダーの1行1列のDateオブジェクトを生成
    const dateCount = new Date(firstDate.getFullYear(), firstDate.getMonth(), 1 - firstDate.getDay());

    while(true) {
        calendarHtml += '<tr>';

        // --- 1行分の文字列生成 ---
        for(let i = 0; i < 7; i++){
            if(dateCount.getMonth() === month) {
                calendarHtml += '<td>'
            } else {
                calendarHtml += '<td class="prevNextMonth">'
            }
            calendarHtml += dateCount.getDate() + '</td>';
            dateCount.setDate(dateCount.getDate() + 1);
        }
        // -----------------------

        calendarHtml += '</tr>';
        if(dateCount.getMonth() !== month) {
            break;
        }
    }
    return calendarHtml;
}

/**
 * dateが存在する月のカレンダーをHTMLで表示する。
 * @param {Date} date 表示したい月のDateオブジェクト
 */
function showCalendar(date){
    // 年月をHTMLに書き込み
    document.getElementById('year').textContent = date.getFullYear();
    document.getElementById('month').textContent = date.getMonth() + 1;
    // 日(カレンダー本体)をHTMLに書き込み
    document.getElementById('calendarContent').innerHTML = createCalendarHTML(date.getFullYear(), date.getMonth());
}

const prevMonthBtn = document.getElementById('prevMonthBtn');
prevMonthBtn.addEventListener('click', function(){
    date.setMonth(date.getMonth() - 1);
    showCalendar(date);
})

const nextMonthBtn = document.getElementById('nextMonthBtn');
nextMonthBtn.addEventListener('click', function(){
    date.setMonth(date.getMonth() + 1);
    showCalendar(date);
})

const date = new Date();
showCalendar(date);