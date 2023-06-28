/**
 * カレンダーの曜日列(<thead>要素)の下に挿入する日付行列(<tbody>要素)を返す関数です。
 * @param {Number} year 年
 * @param {Number} month 月
 * @returns {HTMLTableSectionElement} カレンダーの内容が書かれた<tbody>要素。
 */
function createCalendarTbodyElem(year, month){
    const tbody = document.createElement('tbody');
    const today = new Date();
    // 祝日の配列を取得
    const holidays = holiday_jp.between(new Date(year, month-1, 1), new Date(year, month+1, 31));
    // カレンダーの1行1列の日に該当するDateオブジェクトを生成
    const dateCount = new Date(year, month, 1-(new Date(year, month, 1).getDay()), 9, 0, 0);

    while(true) {
        // <tr>要素を生成
        const tr = document.createElement('tr');

        for(let i = 0; i < 7; i++){
            // <td>要素を生成
            const td = document.createElement('td');
            // class属性の追加
            let attr = '';
            if(dateCount.getMonth() !== month) {
                attr += 'prevNextMonth';
            }
            if(dateCount.toLocaleDateString() === today.toLocaleDateString()) {
                attr += ' today';
            }
            td.setAttribute('class', attr);
            // 日付(<strong>要素)の追加
            const strong = document.createElement('strong');
            strong.textContent = dateCount.getDate();
            td.append(strong);
            // 祝日の追加
            holidays.forEach(obj => {
                if(obj.date.getTime() === dateCount.getTime()) {
                    const span = document.createElement('span');
                    span.setAttribute('class', 'holiday');
                    span.textContent = obj.name;
                    td.append(span);
                }
            });
            // <tr>要素の配下に<td>要素を追加
            tr.append(td);
            // dateCountの日付カウントアップ
            dateCount.setDate(dateCount.getDate() + 1);
        }
        // <tbody>要素の配下に<tr>要素を追加
        tbody.append(tr);

        if(dateCount.getMonth() !== month) {
            break;
        }
    }
    return tbody;
}

/**
 * dateが存在する月のカレンダーをHTMLで表示する。
 * @param {Date} date 表示したい月のDateオブジェクト
 */
function showCalendar(date){
    // 年月をHTMLに書き込み
    document.getElementById('year').textContent = date.getFullYear();
    document.getElementById('month').textContent = date.getMonth() + 1;
    // <tbody>要素をHTMLに追加
    calendar = document.querySelector('table.calendar');
    calendar.replaceChild(createCalendarTbodyElem(date.getFullYear(), date.getMonth()), calendar.lastChild);
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

const holidays = holiday_jp.between(new Date('2010-05-01'), new Date('2010-05-31'));
console.log(holidays); // 敬老の日