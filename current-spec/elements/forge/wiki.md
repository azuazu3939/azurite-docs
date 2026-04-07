# 鍛造 Wiki

> [!TIP]
> 鍛造を触るときは、まず「入口」「素材」「手番」「最終計算」のどこを変えるのかを決めると迷いにくいです。

## クイックデータ

| 項目 | 内容 |
| --- | --- |
| 主役 | 鍛造セッション、品質、耐久、focus、研究、物流、Trade |
| 主設定 | `forge.yml`, `forge-content.yml`, `forge-actions.yml`, `forge-balance.yml` |
| 影響先 | Gear Score、売値、campaign 報酬、profession bonus |
| 変更難度 | 高 |

## 概要

鍛造は Azuriter の制作ループの中心です。  
素材投入と手番アクションでセッションを進め、品質や耐久の結果が装備価値へ反映されます。研究、物流、Trade も鍛造 runtime と強く結びつきます。

## プレイヤー体験

1. 鍛造入口からセッションを開始する
2. 素材や手番アクションで quality / durability / focus を動かす
3. 完成品の価値が装備評価や経済に反映される
4. 研究や物流が開くと鍛造ループの効率と導線が広がる

## 構成の見取り図

| レイヤー | 主な場所 | メモ |
| --- | --- | --- |
| 入口と基本設定 | `core/src/main/resources/forge.yml` | どこから鍛造に入るか |
| 素材と物流 | `core/src/main/resources/forge/forge-content.yml` | recipe 素材、物流報酬、研究素材 |
| 手番アクション | `core/src/main/resources/forge/forge-actions.yml` | 何を選ぶと progress / quality がどう動くか |
| 最終計算 | `core/src/main/resources/forge/forge-balance.yml` | 品質帯、耐久、最終的な評価 |
| セッション状態 | `ForgeService` | progress、quality、durability、focus を保持 |

## 編集フロー

1. 変更対象を 1 層に固定する  
   入口なのか、素材なのか、アクションなのか、最終計算なのかを先に切ります。
2. 評価の波及を見る  
   品質帯の変更は Gear Score、売値、報酬価値に効きます。
3. 研究と物流も見る  
   鍛造本体だけ直しても、研究や物流報酬が古いままだと体験がちぐはぐになります。

## よく触る変更パターン

### 鍛造アクションの手触りを変えたい

- `forge-actions.yml` を主入口にする
- focus や progress の増減を変えたら、最終品質とのバランスも確認する

### 素材や研究報酬を変えたい

- `forge-content.yml` を主入口にする
- profession や campaign の報酬側とズレないかを見る

### 品質帯の意味を変えたい

- `forge-balance.yml` を主入口にする
- Gear Score と売値への影響を必ず確認する

## 連動する要素

- [装備評価・仮想ロア・カスタムエンチャント](../gear-enchant/wiki.md)  
  鍛造装備の品質は装備表示と評価に直結します。
- [経済・コマース](../economy-commerce/wiki.md)  
  完成品価値や取引導線に影響します。
- [成長・クラス・専門職](../progression-professions/wiki.md)  
  profession bonus とアクセス条件が鍛造効率に関わります。

## FAQ

### どのファイルから読み始めればいいか

全体像は `forge.yml`、具体的な素材や報酬は `forge-content.yml`、手触りは `forge-actions.yml`、結果計算は `forge-balance.yml` が入口です。

### 品質帯だけ変えればよいか

それだけでは危険です。表示、売値、報酬価値までまとめて見ないと、見た目だけ強くて実利が弱いなどのズレが出ます。

### 鍛造と研究は別物か

責務は分かれていますが、プレイヤー導線上は連続しています。鍛造本体だけ見ていると研究や物流報酬が取り残されがちです。

## 関連

- [要素概要](./summary.md)
- [編集例](./examples.md)
- [Wiki執筆ガイド](../../wiki-editing-guide.md)
