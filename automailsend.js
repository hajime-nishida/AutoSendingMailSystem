function sendMailFromForm() {
    var title = "【参加申込完了】〇月〇日開催「〇〇セミナー」";    //メールタイトル
    var admin_name = "hogehoge@gmail.com";　//送信者名（このスクリプトエディタを作成したGoogleアカウント）
    //------------------------------------------------------------
    // 設定エリアここから
    //------------------------------------------------------------
    // 件名、本文、フッター
    var subject = title;
    // メール送信先
    var admin = "hogehoge@gmail.com";    // 管理者メールアドレス（必須）
    var cc    = "";    // Ccに入れるメールアドレス
    var bcc   = "hogehoge2@gmail.com,hogehoge3@gmail.com"; // Bccに入れるメールアドレス:
    var reply = ""; // Reply-Toに入れるメールアドレス:
    var to    = "";    // To: （入力者のアドレスが自動で入ります）

    //------------------------------------------------------------
    // 設定エリアここまで
    //------------------------------------------------------------

    try{
        // スプレッドシートの操作
        var sh   = SpreadsheetApp.getActiveSheet();
        var rows = sh.getLastRow();
        var cols = sh.getLastColumn();
        var rg   = sh.getDataRange();

        var dataList = {};

        // メール件名・本文作成と送信先メールアドレス取得
        for (var j = 1; j <= cols; j++ ) {
            var col_name  = rg.getCell(1, j).getValue();    // カラム名
            var col_value = rg.getCell(rows, j).getValue(); // 入力値
            dataList[col_name] = col_value;
        }

        //メール内で使用する関数の設定
        to = dataList["メールアドレス"]; 
        var customer = dataList["名前"];
        var day = dataList["参加日"];
        var body
        = customer + "　様\n"

    body+= "\n"
    　　　　　　 + "───────────────────────────────────\n"
        + "このメールはhogehogeイベント管理システムより\n"
        + "自動送信されています。このメールにお心当たりのない方は\n"
        + "hogehoge@gmail.comまでご連絡ください。\n"
        + "───────────────────────────────────\n"
        + "\n"
        + "この度は〇月〇日開催「〇〇セミナー」にお申込みいただき、誠にありがとうございます。\n"
        + customer + "　様のお申込みを確かに承りました。\n"
        + "当日のご来場を心よりお待ち申し上げております。\n"
        + "\n"
        + "=============================================================\n"
        + "\n"
        + "■ご参加日時\n"
        + day + " 13時00分〜16時00分\n"
        + "\n"
        + "■会場\n"
        + "hogehoge会館\n"
        + "（会場住所：東京都千代田区永田町１丁目７−１）\n"
        + "\n"
        + "■参加費\n"
        + "1000円\n"
        + "\n"
        + "■イベント詳細ページ\n"
        + "https://hogehoge.com/event/2018/02/\n"
        + "\n"
        + "=============================================================\n"
        + "また本メールは、参加お申し込みをいただいた方宛に配信される自動メール送信システムです。\n"
        + "本メールへの直接のご返信は受け付けておりませんのでご了承ください。\n"
        + "ご不明な点やご質問等ございましたら、hogehoge@gmail.comまでお問い合わせください。\n"
        + "===================================\n"
        + "\n"
        + "株式会社hogehoge 代表　hoge\n"
        + "\n"
        + "";

        // 送信先オプション
        var options = {};
        if ( cc )    options.cc      = cc;
        if ( bcc )   options.bcc     = bcc;
        if ( reply ) options.replyTo = reply;

        // メール送信
        if ( to ) {
            MailApp.sendEmail(to, subject, body, options);
        }else{
            MailApp.sendEmail(admin, "【失敗】Googleフォームにメールアドレスが指定されていません", body);
        }
    }catch(e){
        MailApp.sendEmail(admin, "【失敗】Googleフォームからメール送信中にエラーが発生", e.message);
    } 
}