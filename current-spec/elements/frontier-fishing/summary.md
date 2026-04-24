# 釣り戦闘・旧遠征残務

旧遠征の契約、進行管理、QuestBoard、受注 / 完了 / 解放条件は撤去済みです。
現在この要素に残る主機能は、resource world とも接続できる packet 釣り戦闘と、周辺機能が参照する route / world 名の互換情報です。

## この要素が担うこと
- `fishing-content.yml` で釣り池、魚種、ロッド戦闘、宝 / hazard / mob 釣りを管理する
- 旧 `frontier_world` 名と route 定義を、職業 access や既存データ互換の参照として残す
- 遠征契約や掲示板を経由せず、釣り戦闘を独立した収集・戦闘ループとして動かす

## 撤去済み
- `quests/frontier/frontier.yml` の遠征契約
- `ExpeditionService` の進行、目的地、BossBar、報告、報酬配布
- `/frontier` `/q` `/questboard` `/yes` `/no`
- QuestBoard / PacketQuestBoard runtime
- 旧遠征契約の objective-kind、完了条件、受注条件、掲示板抽選

## 関連
- [設定項目](./reference.md)
- [編集例](./examples.md)
- [Wiki](./wiki.md)
