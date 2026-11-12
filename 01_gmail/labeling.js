
// メールアドレスの一部1を含むメールアドレスを検索
const inAdress1 = GmailApp.search('from:メールアドレスの一部1 -label:親ラベル名/子ラベル名');
// メールアドレスの一部2を含むメールアドレスを検索
const inAdress2 = GmailApp.search('from:メールアドレスの一部2 -label:親ラベル名/子ラベル名');
// メールアドレスの一部3を含むメールアドレスを検索
const inAdress3 = GmailApp.search('from:メールアドレスの一部3 -label:親ラベル名/子ラベル名');
// メールアドレスの一部4を含むメールアドレスを検索
const inAdress4 = GmailApp.search('from:メールアドレスの一部4 -label:親ラベル名/子ラベル名');
// メールアドレスの一部（複数指定）を含むメールアドレスを検索
const inAdreesOR1 = GmailApp.search('from:{メールアドレスの一部 メールアドレスの一部 メールアドレスの一部 メールアドレスの一部 メールアドレスの一部 メールアドレスの一部} -label:親ラベル名/子ラベル名')
// 検索したい文字列（１つだけ）を含むメールを検索
const inText1 = GmailApp.search('"検索したい文字列" -label:親ラベル名/子ラベル名');
// 複数の文字列を含むメールを検索（OR検索）
const inTextOR1 = GmailApp.search('{"検索したい文字列" "検索したい文字列" "検索したい文字列" "検索したい文字列" "検索したい文字列" "検索したい文字列"} -label:_deleteTarget');


// 仕分けをしたいラベル名を取得
const inAdressLabel1 = GmailApp.getUserLabelByName('親ラベル名/子ラベル名');
const inAdressLabel2 = GmailApp.getUserLabelByName('親ラベル名/子ラベル名');
const inAdressLabel3 = GmailApp.getUserLabelByName('親ラベル名/子ラベル名');
const inAdressLabel4 = GmailApp.getUserLabelByName('親ラベル名/子ラベル名');
const inAdressORLabel1 = GmailApp.getUserLabelByName('親ラベル名/子ラベル名')
const inTextLabel1 = GmailApp.getUserLabelByName('[親ラベル名/子ラベル名');
const inTextORLabel1 = GmailApp.getUserLabelByName('_deleteTarget');


// 全ての〇〇を含むメール（全ての〇〇を含むメールの変数名を記載）
const inLabelList = [inAdress1, inAdress2, inAdress3, inAdress4, inAdreesOR1, inText1, inTextOR1];
// 全てのラベル（全てのラベルの変数名を記載）
const labelList = [inAdressLabel1, inAdressLabel2, inAdressLabel3, inAdressLabel4, inAdressORLabel1, inTextLabel1, inTextORLabel1];


function labelSorting() {
  // ラベル名を含むメールそれぞれに各ラベルを付与
  inLabelList.forEach((threads, i) => {
    const label = labelList[i];

    if (!label) {
      console.error(`ラベルが見つかりません：${i}番目`);
      return;
    }

    // 100件ずつに分割して処理
    for (let j = 0; j < threads.length; j += 100) {
      const batch = threads.slice(j, j + 100);
      label.addToThreads(batch);
    }
  });

  // Debug
  // 件数チェック
  // console.log('手嶋さんからのメール：' + inAdressTeshima.length + '件');
  // console.log('git/Run Failed：' + inRunFailed.length + '件');
  // ラベルが存在するかチェック
  // console.log('IDラベル：' + (moneyIdLabel?.getName() ?? '存在しない'));
}



// 削除対象のメールを確認
function previewDelete() {
  const threads = GmailApp.search(
    'label:_deleteTarget -in:trash',
    0,
    100
  );

  console.log(`削除対象（最大100件表示）：${threads.length}件`);

  threads.forEach((thread) => {
    console.log(thread.getFirstMessageSubject());
  });
}



// _deleteTargetのスレッドをゴミ箱に移動
function messageDelete() {
  const label = GmailApp.getUserLabelByName('_deleteTarget');

  if (!label) {
    console.error('ラベルが見つかりません');
    return;
  }

  let total = 0;

  while (true) {
    // ゴミ箱にない対象スレッドを100件取得
    const threads = GmailApp.search(
      'label:_deleteTarget -in:trash',
      0,
      100
    );

    if (threads.length === 0) break;

    // ゴミ箱に移動
    GmailApp.moveThreadsToTrash(threads);
    total += threads.length;
  }

  console.log(`${total}件のスレッドをゴミ箱に移動しました`);
}