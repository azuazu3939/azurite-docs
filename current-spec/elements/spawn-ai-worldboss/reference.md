# スポーン制御・ワールドボス・Mythic AI の設定項目

> [!WARNING]
> この要素は 2026-04-18 に退役しました。現行ビルドでは `mob-spawns/`、`mythic-ai.yml`、`mythic-ai-candidates.yml`、`world-boss-state.yml` を前提にした設定読込を行いません。

## 現在の扱い

- `worldboss` コマンド、boss quest board、`aipolicy` コマンドは現行仕様から外れています。
- `quests/boss/*.yml` と `mob-spawns/*.yml` は現行バンドルに含めません。
- `surface-acquisition.yml` と `gathering-stamina.yml` / `gathering-gui_*.yml` も現行バンドルから外しています。

## 置き換え先

- 旧遠征と questboard は撤去済みです。釣りや報酬導線だけを確認します。
- telemetry の保存先は既存の JSON 系が残る場合がありますが、world boss / Mythic AI 前提では扱いません。

## 関連

- [要素概要](./summary.md)
- [釣り戦闘・旧遠征残務](../frontier-fishing/summary.md)
