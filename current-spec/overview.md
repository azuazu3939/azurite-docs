# 現行仕様の要素別概要

このディレクトリは、`Azuriter` の現行仕様を 8 つの要素に分けて見渡すための入口です。  
まずは各要素が「何を担うか」を短く掴み、必要になったら設定項目や Wiki へ掘り下げる読み方を想定しています。

## この仕様が描く流れ
Azuriter は、「育てる」「外へ出る」「持ち帰る」「加工して回す」を繰り返す長期進行型の RPG サイクルを前提にしています。

単発の戦闘だけで完結せず、成長、採集、鍛造、売買、都市運用、週替わり campaign が互いの解放条件と報酬導線をつないでいます。

## ゲームサイクル
1. [成長・クラス・専門職](./elements/progression-professions/summary.md) でクラスや profession を育て、使える手段と行ける導線を増やす。
2. [フロンティア・遠征・釣り戦闘](./elements/frontier-fishing/summary.md) と [スポーン制御・ワールドボス・Mythic AI](./elements/spawn-ai-worldboss/summary.md) で素材、討伐機会、territory 報酬を得る。
3. [レシピ・ストレージ・採集コレクション](./elements/recipe-gathering/summary.md) と [鍛造](./elements/forge/summary.md) で持ち帰った素材を装備、研究、unlock に変える。
4. [仮想ロア・売値表示・カスタムエンチャント](./elements/gear-enchant/summary.md) と [経済・コマース](./elements/economy-commerce/summary.md) で価値を見える化し、売買や保管へ流す。
5. [ポータブルシティ・キャンペーン・パーティー・クエスト看板](./elements/city-campaign-party/summary.md) が日常導線と週次目標を作り、個人進行をサーバー全体の進行へ接続する。

## 要素どうしのつながり
- 成長・専門職が各コンテンツの入口を開く
- Frontier と spawn 制御が危険度と報酬源を作る
- 採集、レシピ、鍛造が素材を装備や納品価値へ変える
- 仮想ロアと経済が価値を見える化し、売買や保管へ流す
- city、campaign、questboard が次の目的を提示する

## 初見での読み順
- まずは [成長・クラス・専門職](./elements/progression-professions/summary.md) で成長の土台を見る
- 次に [フロンティア・遠征・釣り戦闘](./elements/frontier-fishing/summary.md) か [ポータブルシティ・キャンペーン・パーティー・クエスト看板](./elements/city-campaign-party/summary.md) で日常導線を掴む
- そのあと [鍛造](./elements/forge/summary.md) と [経済・コマース](./elements/economy-commerce/summary.md) を見ると、持ち帰った成果の流れが分かりやすい

## 使い方
- まずこのページで対象要素を選ぶ
- 要素ごとの役割をつかむなら `summary.md`
- YAML の意味を追うときは `reference.md`
- 人が追記しやすいひな形は `examples.md`
- チーム共有向けの短縮版は `wiki.md`
- wiki の章立てを増やしたいときは [Wiki執筆ガイド](./wiki-editing-guide.md)

## 進行と装備
- [成長・クラス・専門職](./elements/progression-professions/summary.md) : プレイヤーの成長、役割、解放条件をまとめる基礎進行要素。
- [設定項目](./elements/progression-professions/reference.md) / [編集例](./elements/progression-professions/examples.md) / [Wiki](./elements/progression-professions/wiki.md)
- [仮想ロア・売値表示・カスタムエンチャント](./elements/gear-enchant/summary.md) : 装備やアイテムの価値を見やすく伝える表示と強化の要素。
- [設定項目](./elements/gear-enchant/reference.md) / [編集例](./elements/gear-enchant/examples.md) / [Wiki](./elements/gear-enchant/wiki.md)

## 制作と収集
- [鍛造](./elements/forge/summary.md) : 素材を装備や取引価値へ変える制作の中核要素。
- [設定項目](./elements/forge/reference.md) / [編集例](./elements/forge/examples.md) / [Wiki](./elements/forge/wiki.md)
- [レシピ・ストレージ・採集コレクション](./elements/recipe-gathering/summary.md) : 集めた素材をレシピ、保管、累積報酬へつなぐ収集要素。
- [設定項目](./elements/recipe-gathering/reference.md) / [編集例](./elements/recipe-gathering/examples.md) / [Wiki](./elements/recipe-gathering/wiki.md)

## 流通とワールド
- [経済・コマース](./elements/economy-commerce/summary.md) : 資源を保管し、売買し、次の行動資源へ戻す流通要素。
- [設定項目](./elements/economy-commerce/reference.md) / [編集例](./elements/economy-commerce/examples.md) / [Wiki](./elements/economy-commerce/wiki.md)
- [フロンティア・遠征・釣り戦闘](./elements/frontier-fishing/summary.md) : 外へ出て危険と報酬を持ち帰る冒険側の要素。
- [設定項目](./elements/frontier-fishing/reference.md) / [編集例](./elements/frontier-fishing/examples.md) / [Wiki](./elements/frontier-fishing/wiki.md)
- [スポーン制御・ワールドボス・Mythic AI](./elements/spawn-ai-worldboss/summary.md) : 敵の出現、支配状況、ボス戦を支えるワールド制御要素。
- [設定項目](./elements/spawn-ai-worldboss/reference.md) / [編集例](./elements/spawn-ai-worldboss/examples.md) / [Wiki](./elements/spawn-ai-worldboss/wiki.md)

## 運用と長期進行
- [ポータブルシティ・キャンペーン・パーティー・クエスト看板](./elements/city-campaign-party/summary.md) : 拠点運用と週次目標で日常導線を作る運用側の要素。
- [設定項目](./elements/city-campaign-party/reference.md) / [編集例](./elements/city-campaign-party/examples.md) / [Wiki](./elements/city-campaign-party/wiki.md)

## ローカル閲覧
- `docs/index.html`
- `pwsh -File docs/localweb/serve.ps1`
