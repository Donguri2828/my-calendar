/**
 * カレンダーの曜日列(<thead>要素)の下に挿入する日付行列(<tbody>要素)を返す。
 * @param {Number} year 年
 * @param {Number} month 月
 * @returns {HTMLTableSectionElement} カレンダーの内容が書かれた<tbody>要素。
 */
function createCalendarTbodyElem(year, month){
    const tbody = document.createElement('tbody');
    const today = new Date();
    // 祝日の配列を取得
    const holidays = holiday_jp.between(new Date(year, month-1, 1), new Date(year, month+1, 31));
    // カレンダーの1行1列目の日に該当するDateオブジェクトを生成
    const dateCount = new Date(year, month, 1-(new Date(year, month, 1).getDay()), 9, 0, 0);

    while(true) {
        // <tr>要素を生成
        const tr = document.createElement('tr');

        for(let i = 0; i < 7; i++){
            // <td>要素を生成
            const td = document.createElement('td');
            // class属性の設定
            let attr = '';
            if(dateCount.getMonth() !== month) {
                attr += 'text-black-50';
            }
            if(dateCount.toLocaleDateString() === today.toLocaleDateString()) {
                attr += ' table-danger';
            }
            td.setAttribute('class', attr);

            // 日付要素の追加
            const dateElem = document.createElement('div');
            dateElem.setAttribute('class', 'fw-bold')
            dateElem.textContent = dateCount.getDate();
            td.append(dateElem);

            // 祝日の追加
            const holidayElem = document.createElement('div');
            // ライブラリから祝日を取得
            holidays.forEach(obj => {
                if(obj.date.getTime() === dateCount.getTime()) {
                    holidayElem.setAttribute('class', 'holiday bg-success text-white');
                    holidayElem.textContent = obj.name;
                }
            });
            td.append(holidayElem);

            // <tr>要素の配下に<td>要素を追加
            tr.append(td);
            // dateCountの日付をカウントアップ
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
