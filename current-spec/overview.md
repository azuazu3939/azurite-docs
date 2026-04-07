# 現行仕様の要素別概要

このディレクトリは、`Azuriter` の今の実装を運用上まとめて扱いやすい 8 要素に整理したものです。

## この仕様が描く遊び方
Azuriter は、「成長して外へ出る」「素材や報酬を持ち帰る」「制作と流通で次の挑戦を用意する」を繰り返す長期進行型の RPG サイクルを前提にしています。

単発の戦闘だけで完結せず、クラス育成、専門職、採集、鍛造、売買、都市運用、週替わり campaign が互いの解放条件と報酬倍率をつないでいます。

## ゲームサイクル
1. [成長・クラス・専門職](./elements/progression-professions/summary.md) でクラスや profession を育て、使える手段と行ける導線を増やす。
2. [フロンティア・遠征・釣り戦闘](./elements/frontier-fishing/summary.md) と [スポーン制御・ワールドボス・Mythic AI](./elements/spawn-ai-worldboss/summary.md) で素材、討伐機会、territory 報酬を得る。
3. [レシピ・ストレージ・採集コレクション](./elements/recipe-gathering/summary.md) と [鍛造](./elements/forge/summary.md) で持ち帰った素材を装備、研究、unlock に変える。
4. [仮想ロア・売値表示・カスタムエンチャント](./elements/gear-enchant/summary.md) と [経済・コマース](./elements/economy-commerce/summary.md) で価値を見える化し、売買や保管へ流す。
5. [ポータブルシティ・キャンペーン・パーティー・クエスト看板](./elements/city-campaign-party/summary.md) が日常導線と週次目標を作り、個人進行をサーバー全体の進行へ接続する。

## システムサイクル
- progression / profession が access-tag と補正値を配り、frontier・forge・gathering の入口を制御する。
- frontier / spawn / boss が危険度と報酬期待値を作り、party や questboard の出番を作る。
- gathering / recipe / forge が素材を価値へ変換し、gear-enchant が装備判断と売却判断を補助する。
- economy が価値を通貨・倉庫・売買へ変換し、次の expedition や制作投資へ戻す。
- city / campaign / community project が日次・週次・長期目標を供給し、サーバー全体の進行速度を調整する。

## 初見プレイヤーの入り方
- まずは [成長・クラス・専門職](./elements/progression-professions/summary.md) でクラスと profession の前提を確認する。
- 次に [ポータブルシティ・キャンペーン・パーティー・クエスト看板](./elements/city-campaign-party/summary.md) の questboard か [フロンティア・遠征・釣り戦闘](./elements/frontier-fishing/summary.md) の遠征で、採集か戦闘を一周してみる。
- 持ち帰った素材は [レシピ・ストレージ・採集コレクション](./elements/recipe-gathering/summary.md) の Storage Box や [鍛造](./elements/forge/summary.md) に通し、装備化や納品先を確認する。
- 余剰品は [経済・コマース](./elements/economy-commerce/summary.md) へ流し、売却や共有倉庫を経由して次の周回資源に戻す。
- 慣れてきたら party / campaign / world boss に参加して、個人進行を週次導線へ接続する。

## 使い方
- まずこのページで対象要素を選ぶ
- 要素ごとの仕様の全体像は `summary.md`
- YAML の意味を追うときは `reference.md`
- 人が追記しやすいひな形は `examples.md`
- チーム共有向けの短縮版は `wiki.md`
- wiki の章立てを増やしたいときは [Wiki執筆ガイド](./wiki-editing-guide.md)

## 進行と装備
- [成長・クラス・専門職](./elements/progression-professions/summary.md) : グローバルレベル、クラス、マナ、スキルツリー、専門職の解放と補正を扱う。
- [設定項目](./elements/progression-professions/reference.md) / [編集例](./elements/progression-professions/examples.md) / [Wiki](./elements/progression-professions/wiki.md)
- [仮想ロア・売値表示・カスタムエンチャント](./elements/gear-enchant/summary.md) : 採集・鍛造・売値の仮想ロア表示と独自エンチャントを扱う。
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
