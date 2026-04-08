# ポータブルシティ・キャンペーン・パーティー・クエスト看板

city node 運用、campaign rotation、community project、party 招待、questboard 受注導線をまとめる要素です。

## 現行仕様
- `portable-city.yml` で node heartbeat、rebalance、transfer、runtime を管理し、city role のときだけ本体 runtime を立てます。
- city ごとに `一般訪問` `メンバーfly` `訪問者fly` を持ち、`/city visit` と `setting` で公開運用を切り替えます。
- city spawn 半径 5 ブロックは絶対安全地帯で、設置・破壊・干渉を止めます。
- city 内で `Y < -64` まで落ちたプレイヤーは死亡せず、その city の spawn へ戻します。
- `progression-campaigns.yml` と `community-projects.yml` が週替わり campaign と恒久 project tier を管理します。
- `PartyService` は最大 8 人、招待 120 秒、`QuestBoardService` は 45 秒確認待ちを持ちます。
- questboard は 3x4 の固定掲示板を `packet-quest-boards.yml` で定義し、表示内容だけをプレイヤーごとに packet 差し替えします。
- 候補はカテゴリ切替ではなく、`player UUID + boardId + cycleId + progressionStage + serverSalt` 由来の seed で安定抽選します。
- 進捗段階、解放状況、受注中状態、受注 CT を見て 3〜5 件の候補を出し、看板右クリックか受付 NPC クリックで詳細確認へ入ります。
- `frontier-quest-boards.yml` のカテゴリ専用設置看板は互換用として残しつつ、ロビー導線は packet ボード前提へ寄せます。

## 主なファイル
- `core/src/main/resources/portable-city.yml`
- `core/src/main/resources/progression-campaigns.yml`
- `core/src/main/resources/community-projects.yml`
- `core/src/main/resources/packet-quest-boards.yml`

## 更新メモ
- city は運用設定、campaign は報酬倍率、party / board は導線設計として分けて考える。
- packet board は固定オブジェクトなので、world 配置と `packet-quest-boards.yml` の原点座標・向きが揃っているかを最初に見る。
- seed 周期、進捗段階、受注 CT が表示候補へ直結するので、単純なカテゴリ追加より先に抽選ルールを確認する。
- legacy のカテゴリ看板を残す場合でも、ロビー向け説明は packet board と NPC 導線に合わせて更新する。

## 関連
- [編集例](./examples.md)
- [Wiki](./wiki.md)
