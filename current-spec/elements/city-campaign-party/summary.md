# ポータブルシティ・キャンペーン・パーティー・クエスト看板

city node 運用、campaign rotation、community project、party 招待、questboard 受注導線をまとめる要素です。

## 現行仕様
- `portable-city.yml` で node heartbeat、rebalance、transfer、runtime を管理し、city role のときだけ本体 runtime を立てます。
- `progression-campaigns.yml` と `community-projects.yml` が週替わり campaign と恒久 project tier を管理します。
- `PartyService` は最大 8 人、招待 120 秒、`QuestBoardService` は 45 秒確認待ちと 10 分再出現を持ちます。

## 主なファイル
- `core/src/main/resources/portable-city.yml`
- `core/src/main/resources/progression-campaigns.yml`
- `core/src/main/resources/community-projects.yml`

## 更新メモ
- city は運用設定、campaign は報酬倍率、party/board は導線時間設計として分けて考える。
- campaign ID と project ID のずれは長期進行を壊しやすい。
- party 人数や board 時間変更は boss / frontier 導線にも効く。

## 関連
- [編集例](./examples.md)
- [Wiki](./wiki.md)
