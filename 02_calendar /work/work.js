// 会社の出勤スケジュールURL
const worksUrl = "会社の出勤スケジュールURL";
// 個人用出勤スケジュールURL
const myUrl = "個人用出勤スケジュールURL";

// 会社の出勤スケジュールURLを開く
const openWorksUrl = SpreadsheetApp.openByUrl(worksUrl);
// 個人用出勤スケジュールURLを開く
const openMyUrl = SpreadsheetApp.openByUrl(myUrl);



// 会社のスプレットシートと個人のスプレットシートを同期
function synchronizationSheet() {
  
}