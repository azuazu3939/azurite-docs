# スポーン制御・ワールドボス・Mythic AI

spawn bundle、territory 計算、world boss state、AI telemetry/export/import をまとめる要素です。

## 現行仕様
- `mob-spawns` 配下の 3 ファイルを bundle 化し、Territory、WorldBoss、Mythic AI へ再配布します。
- `FrontierTerritoryService` が chunk ごとの所有者や報酬倍率を計算します。
- `MythicAiRuntime` は safe mode policy、telemetry export/import、spawn policy を持ちます。

## 主なファイル
- `core/src/main/resources/mob-spawns/00-spawn-director.yml`
- `core/src/main/resources/mythic-ai.yml`
- `core/src/main/resources/mythic-ai-drive.yml`

## 更新メモ
- spawn 条件、territory、boss state は連動する。
- AI policy だけ変えても出現条件が厳しいと何も起きない。
- Drive 同期を有効にするなら serverId と資格情報を先に決める。

## 関連
- [編集例](./examples.md)
- [Wiki](./wiki.md)
