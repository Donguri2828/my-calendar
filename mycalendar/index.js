class Calendar {
    static days = ['日', '月', '火', '水', '木', '金', '土'];

    constructor(current = new Date()){
        this.current = current;
    }

    _createCalendarHTML(year, month){
        let calendarHtml;
        const firstDate = new Date(year, month, 1);
        const lastDate = new Date(year, month + 1, 0);

        while(1 /*(仮)*/) {
            calendarHtml += '<tr>';
        }

        return calendarHtml;
    }

    showCalendar(){
        // 年月をHTMLに書き込み
        document.getElementById('year').textContent = this.current.getFullYear();
        document.getElementById('month').textContent = this.current.getMonth() + 1;
        // 日(カレンダー本体)をHTMLに書き込み
        // document.querySelector('calendarContent').innerHTML = this._createCalendarHTML();
    }
}

let calendar = new Calendar();
calendar._createCalendarHTML(2023, 5);
calendar.showCalendar();
