# 鍛造

鍛造セッション、研究、物流、Trade、鍛造装備の品質と耐久を扱う要素です。

## 現行仕様
- `forge.yml` が入口、`forge-content.yml` が素材と物流、`forge-actions.yml` が手番、`forge-balance.yml` が最終計算です。
- `ForgeService` が progress、quality、durability、focus を持つセッションを管理します。
- 研究、物流、Trade は別サービスに分かれ、profession や campaign にも接続します。

## 主なファイル
- `core/src/main/resources/forge.yml`
- `core/src/main/resources/forge/forge-content.yml`
- `core/src/main/resources/forge/forge-actions.yml`

## 更新メモ
- 入口・アクション・素材・最終計算のどこを変えるか先に決める。
- 品質帯変更は売値と Gear Score に波及する。
- 研究や物流報酬は Campaign と経済へ効く。

## 関連
- [編集例](./examples.md)
- [Wiki](./wiki.md)
