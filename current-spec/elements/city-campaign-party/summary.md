# ポータブルシティ・キャンペーン・パーティー・クエスト看板

city node 運用、campaign rotation、community project、party 招待、questboard 受注導線をまとめる要素です。

## 現行仕様
- `portable-city.yml` で node heartbeat、rebalance、transfer、runtime を管理し、city role のときだけ本体 runtime を立てます。
- city ごとに `一般訪問` `メンバーfly` `訪問者fly` を持ち、`/city visit` と `setting` で公開運用を切り替えます。
- city spawn 半径 5 ブロックは絶対安全地帯で、設置・破壊・干渉を止めます。
- city 内で `Y < -64` まで落ちたプレイヤーは死亡せず、その city の spawn へ戻します。
- `progression-campaigns.yml` と `community-projects.yml` が週替わり campaign と恒久 project tier を管理します。
- `PartyService` は最大 8 人、招待 120 秒、`QuestBoardService` は 45 秒確認待ちを持ちます。
- questboard は `packet-quest-boards.yml` で 3x5 固定掲示板を定義し、表示内容だけをプレイヤーごとに packet 差し替えします。
- 候補はカテゴリ切替ではなく、`player UUID + boardId + cycleId + progressionStage + serverSalt` 由来の seed と進捗で安定抽選します。
- 表示は `GUIDED` `ASSISTED` `TACTICAL` の閲覧モードへ進化し、同じ掲示板でも成熟度に応じて見え方と使い方が変わります。
- `ASSISTED` と `TACTICAL` は下段の閲覧軸セルか受付 NPC で `近場` `戦闘寄り` `未完了` `高報酬` などへ切り替えられます。
- `frontier-quest-boards.yml` のカテゴリ専用設置看板は互換用として残しつつ、ロビー導線は進化型 packet board 前提へ寄せます。

## 主なファイル
- `core/src/main/resources/portable-city.yml`
- `core/src/main/resources/progression-campaigns.yml`
- `core/src/main/resources/community-projects.yml`
- `core/src/main/resources/packet-quest-boards.yml`

## 更新メモ
- packet board は固定オブジェクトなので、world 配置と `packet-quest-boards.yml` の `position` / `facing` が揃っているかを最初に見る。
- 閲覧モードは進捗 stage と契約完了数で解放されるため、表示調整は `progression-profiles` の閾値から触る。
- 閲覧軸はカテゴリそのものではなく「何を前面に出すか」のレンズなので、`weight` や `min-stage/max-stage` より後段の見せ方として考える。
- legacy のカテゴリ看板を残す場合でも、ロビー向け説明は 3x5 進化型 board と NPC 導線に合わせて更新する。

## 関連
- [編集例](./examples.md)
- [Wiki](./wiki.md)
