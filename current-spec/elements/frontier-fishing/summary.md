# フロンティア・遠征・釣り戦闘

外へ出て危険と報酬を持ち帰る冒険側の要素です。  
既存 Frontier world、遠征契約、Quest Catalog、釣り池、魚種や竿戦闘がまとまり、日常導線の外側にある稼ぎ場と挑戦先を作ります。

ワールド生成 runtime 自体は撤去されており、`generator/*.yml` は route / biome / territory の frontier spec として quest や boss の参照先に残しています。

## この要素が担うこと
- 既存 Frontier world で通常エリアとは違う探索体験を作る
- 遠征契約で周回の目的と報酬を分かりやすくする
- 釣り戦闘で収集と戦闘の中間にある遊び方を用意する

## プレイヤーから見る流れ
- まず解放条件を満たして Frontier や遠征に向かう
- 探索、戦闘、釣りを通じて素材や報酬を持ち帰る
- 持ち帰った成果を制作、売買、次の契約準備へつなげる

## つながる要素
- profession の access 条件が入口を制御する
- 報酬は鍛造と経済・コマースへ流れる
- world boss や spawn 制御とは同じ危険度設計の上で噛み合う

## 関連
- [設定項目](./reference.md)
- [編集例](./examples.md)
- [Wiki](./wiki.md)
