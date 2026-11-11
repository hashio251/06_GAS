function labelSorting() {
  // 〇〇を含むメールアドレスを検索
  const inAdress = GmailApp.search('from:〇〇 -label:ラベル名');
  // ●●を含むメールを検索
  const inInclude = GmailApp.search('"●●" -label:"ラベル名"');
  // ◇◇か△△を含む全てのメールを検索（OR検索）
  const inOrInclude = GmailApp.search('{"◇◇" "△△"} -label:"ラベル名"');


  // 仕分けをしたいラベル名を取得
  const inAdressLabel = GmailApp.getUserLabelByName('ラベル名');
  const inIncludeLabel = GmailApp.getUserLabelByName('ラベル名');
  // 仕分けをしたいラベル名を取得（ラベルの直下にある子ラベル名を取得したい時）
  const inOrIncludeLabel = GmailApp.getUserLabelByName('ラベル名/ラベル名');


  // 全ての〇〇を含むメール（全ての〇〇を含むメールの変数名を記載）
  const inLabelList = [inAdress, inInclude, inOrInclude];
  // 全てのラベル（全てのラベルの変数名を記載）
  const labelList = [inAdressLabel, inIncludeLabel, inOrIncludeLabel];
  // ラベル名を含むメールそれぞれに各ラベルを付与
  inLabelList.forEach((threads, i) => {
    const label = labelList[i];

    if (!label) return;

    // 100件ずつに分割して処理
    for (let j = 0; j < threads.length; j += 100) {
      const batch = threads.slice(j, j + 100);
      label.addToThreads(batch);
    }
  });

  // Debug
  // 件数チェック
  // console.log('〇〇：' + inAdress.length + '件');
  // console.log('●●：' + inInclude.length + '件');
  // console.log('◇◇か△△：' + inOrInclude.length + '件');
  // ラベルが存在するかチェック
  // console.log('IDラベル：' + (inAdressLabel?.getName() ?? '存在しない'));
}

