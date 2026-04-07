# 現行仕様の要素別概要

このディレクトリは、`Azuriter` の今の実装を運用上まとめて扱いやすい 8 要素に整理したものです。

## 使い方
- まずこのページで対象要素を選ぶ
- 仕様の全体像は `summary.md`
- YAML の意味を追うときは `reference.md`
- 人が追記しやすいひな形は `examples.md`
- チーム共有向けの短縮版は `wiki.md`
- wiki の章立てを増やしたいときは [Wiki執筆ガイド](./wiki-editing-guide.md)

## 進行と装備
- [成長・クラス・専門職](./elements/progression-professions/summary.md) : グローバルレベル、クラス、マナ、スキルツリー、専門職の解放と補正を扱う。
- [設定項目](./elements/progression-professions/reference.md) / [編集例](./elements/progression-professions/examples.md) / [Wiki](./elements/progression-professions/wiki.md)
- [装備評価・仮想ロア・カスタムエンチャント](./elements/gear-enchant/summary.md) : Item Level 表示、Gear Score、売値表示、独自エンチャントを扱う。
- [設定項目](./elements/gear-enchant/reference.md) / [編集例](./elements/gear-enchant/examples.md) / [Wiki](./elements/gear-enchant/wiki.md)

## 制作と収集
- [鍛造](./elements/forge/summary.md) : 鍛造セッション、研究、物流、Trade、鍛造装備の品質と耐久を扱う。
- [設定項目](./elements/forge/reference.md) / [編集例](./elements/forge/examples.md) / [Wiki](./elements/forge/wiki.md)
- [レシピ・ストレージ・採集コレクション](./elements/recipe-gathering/summary.md) : カスタムレシピ、Storage Box、採集累積、報酬解放を扱う。
- [設定項目](./elements/recipe-gathering/reference.md) / [編集例](./elements/recipe-gathering/examples.md) / [Wiki](./elements/recipe-gathering/wiki.md)

## 流通とワールド
- [経済・コマース](./elements/economy-commerce/summary.md) : Vault、共有倉庫、ドロップ倉庫、直売、マーケット、Trade Shop を扱う。
- [設定項目](./elements/economy-commerce/reference.md) / [編集例](./elements/economy-commerce/examples.md) / [Wiki](./elements/economy-commerce/wiki.md)
- [フロンティア・遠征・釣り戦闘](./elements/frontier-fishing/summary.md) : Frontier world、遠征契約、ルート、釣り池、魚スポーンを扱う。
- [設定項目](./elements/frontier-fishing/reference.md) / [編集例](./elements/frontier-fishing/examples.md) / [Wiki](./elements/frontier-fishing/wiki.md)
- [スポーン制御・ワールドボス・Mythic AI](./elements/spawn-ai-worldboss/summary.md) : mob-spawns、territory、world boss、AI policy 同期を扱う。
- [設定項目](./elements/spawn-ai-worldboss/reference.md) / [編集例](./elements/spawn-ai-worldboss/examples.md) / [Wiki](./elements/spawn-ai-worldboss/wiki.md)

## 運用と長期進行
- [ポータブルシティ・キャンペーン・パーティー・クエスト看板](./elements/city-campaign-party/summary.md) : 都市運用、週替わり campaign、community project、party、questboard を扱う。
- [設定項目](./elements/city-campaign-party/reference.md) / [編集例](./elements/city-campaign-party/examples.md) / [Wiki](./elements/city-campaign-party/wiki.md)

## ローカル閲覧
- `docs/index.html`
- `pwsh -File docs/localweb/serve.ps1`
