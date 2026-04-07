# ポータブルシティ・キャンペーン・パーティー・クエスト看板

city node 運用、campaign rotation、community project、party 招待、questboard 受注導線をまとめる要素です。

## 現行仕様
- `portable-city.yml` で node heartbeat、rebalance、transfer、runtime を管理し、city role のときだけ本体 runtime を立てます。
- city ごとに `一般訪問` `メンバーfly` `訪問者fly` を持ち、`/city visit` と `setting` で公開運用を切り替えます。
- city spawn 半径 5 ブロックは絶対安全地帯で、設置・破壊・干渉を止めます。
- city 内で `Y < -64` まで落ちたプレイヤーは死亡せず、その city の spawn へ戻します。
- `progression-campaigns.yml` と `community-projects.yml` が週替わり campaign と恒久 project tier を管理します。
- `PartyService` は最大 8 人、招待 120 秒、`QuestBoardService` は 45 秒確認待ちと 10 分再出現を持ちます。
- frontier の questboard は `釣り` `収穫` `採掘` `伐採` の職種カテゴリ単位で専用看板を持ち、1枚の看板は1カテゴリだけを扱います。
- 通常看板の配布は `/questboard <category> [player]` で行い、設置済み看板は `frontier-quest-boards.yml` に `category` を保存します。

## 主なファイル
- `core/src/main/resources/portable-city.yml`
- `core/src/main/resources/progression-campaigns.yml`
- `core/src/main/resources/community-projects.yml`

## 更新メモ
- city は運用設定、campaign は報酬倍率、party/board は導線時間設計として分けて考える。
- 公開 city は「見学可・干渉不可」が基本で、建築や drop はメンバーだけが行う。
- campaign ID と project ID のずれは長期進行を壊しやすい。
- party 人数や board 時間変更は boss / frontier 導線にも効く。

## 関連
- [編集例](./examples.md)
- [Wiki](./wiki.md)
