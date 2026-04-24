# ポータブルシティ・キャンペーン・パーティー

日常導線と長期目標をまとめる運用側の要素です。  
city、campaign、community project、party がつながり、プレイヤー個人の進行をサーバー全体の流れへ接続します。

## この要素が担うこと
- city を拠点として初期足場、訪問、移動の基準を作る
- city メンバー向け建築ツールで日常の整地と面張りを軽くする
- campaign や project で週次・長期の目標を供給する
- party と campaign で「次に何をするか」を迷いにくくする
- party をサーバー間でも維持し、必要な時だけリーダーのサーバーへ集合しやすくする

## プレイヤーから見る流れ
- city を起点に日々の行動を始める
- 作成直後の city は 32x32 の草ブロック足場から始まり、足場下は空洞、world border は spawn 中心の 512 blocks になる
- city メンバーは `Azuriter_BuildTools` で見ている block を直線 / 面 / 階段として増設できる
- 建築ツールは packet preview で設置予定位置を追従表示するので、移動しながら形を確認できる
- campaign で今週の目的を選ぶ
- party や community project を通じて個人進行を協力プレイへ広げる

## つながる要素
- 旧 questboard は撤去済み。campaign と party が日常導線の入口になる
- campaign 報酬や project 進行は成長、制作、流通全体に波及する
- 都市運用や掲示板定義の詳細は [設定項目](./reference.md) を参照

## 関連
- [設定項目](./reference.md)
- [編集例](./examples.md)
- [Wiki](./wiki.md)
