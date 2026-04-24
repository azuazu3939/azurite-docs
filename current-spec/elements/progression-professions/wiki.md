# 成長・クラス・専門職 Wiki

> [!NOTE]
> プレイヤー成長の土台になるページです。グローバルレベル、クラス、マナ、スキルツリー、profession milestone のつながりをここで把握します。

## クイックデータ

| 項目 | 内容 |
| --- | --- |
| 主役 | グローバルレベル、クラスレベル、マナ、スキルツリー、profession |
| 主設定 | `config.yml`, `classes/*/class.yml`, `classes/*/tree.yml`, `professions.yml` |
| 影響先 | 戦闘バランス、Frontier 解放、resourceworld 採集、Packet 釣り |
| 変更難度 | 中〜高 |

## 概要

この要素は「キャラクターの成長導線」をまとめています。  
レベル式やマナ式のような共通基礎と、クラスごとの差分、profession milestone による解放条件や各種 bonus が一体で動きます。

## プレイヤー体験

1. まずグローバルレベルが伸びて、ゲーム全体の基礎進行になる
2. 次にクラスレベルとスキルツリーで戦闘スタイルが分かれる
3. その上に profession が乗り、resourceworld の採掘・伐採・収穫・Packet 釣りで生活導線が伸びる

## 構成の見取り図

| レイヤー | 主な場所 | メモ |
| --- | --- | --- |
| 共通基礎式 | `core/src/main/resources/config.yml` | `level` と `mana` が全体の基礎式 |
| クラス定義 | `core/src/main/resources/classes/*/class.yml` | クラスの性格と基本設定 |
| スキルツリー | `core/src/main/resources/classes/*/tree.yml` | 解放順、報酬、進行段階 |
| profession milestone | `core/src/main/resources/professions.yml` | access-tag、yield bonus、speed bonus、permission |
| profession action | `core/src/main/kotlin/.../profession` / `.../fishing` | resourceworld 採集 EXP、Packet 魚出現、釣果 EXP |
| 保存状態 | MariaDB 側の各種テーブル | プロフィール、マナ、クラスレベル、報酬台帳を保持 |

## 編集フロー

1. 何を変えたいかを先に切る  
   レベル式調整なのか、クラス差分なのか、profession milestone なのかで触る場所が変わります。
2. 連動先を洗う  
   profession の access-tag は Frontier や Forge 側に波及しやすいです。
3. 既存キャラへの影響を考える  
   スキルツリーや報酬変更では `tree-version` をどう扱うかを先に決めます。

## よく触る変更パターン

### クラスの性格を変えたい

- `class.yml` 側でクラス定義を調整する
- 必要なら `tree.yml` の解放順や報酬も見直す
- マナや基礎式まで触るなら `config.yml` 側も確認する

### profession 解放条件を変えたい

- `professions.yml` の milestone を更新する
- access-tag の変更なら Frontier / Forge 側の利用条件も見る
- reward 導線がズレないかを確認する

### resourceworld の職業導線を確認したい

- `/profession` で自分の Lv、EXP、現在の収量倍率、次の節目を見る
- `/profession list` で採掘・伐採・収穫・釣りの獲得行動を確認する
- `/profession info mining` のように ID 指定で詳細を確認する

採掘・伐採・収穫は `resource_world` / `resource_nether` / `resource_the_end` など resourceworld 管理対象でのみ EXP を得ます。プレイヤーが置いたブロックは EXP 対象外です。
釣りは Iolite 側の釣り池が無い場合でも、resourceworld の自然水辺を仮想池として扱い、Packet 魚が出るようにします。
EXP 配分は mcMMO 最新 `experience.yml` の採掘・伐採・収穫・釣りテーブルを 1/10 にした値を使います。端数は内部で繰り越すため、低 EXP ブロックでも累積で進行します。

## 連動する要素

- [フロンティア・遠征・釣り戦闘](../frontier-fishing/wiki.md)  
  access-tag と profession 解放が冒険導線に効きます。
- [鍛造](../forge/wiki.md)  
  speed bonus や yield bonus が制作体感に影響します。

## FAQ

### `tree-version` はいつ上げるべきか

スキルツリーの解放順や報酬の意味が変わるときです。単なる文言修正ではなく、既存プレイヤーの進行再評価が必要になる更新で考えます。

### profession bonus の変更はどこまで波及するか

resourceworld の採集収量、Frontier の解放条件、釣りの出現魚と報酬体感まで影響することがあります。

### まず読むべきファイルはどれか

全体像は `config.yml`、個別差分は `class.yml` / `tree.yml`、解放系は `professions.yml` の順が追いやすいです。

## 関連

- [要素概要](./summary.md)
- [編集例](./examples.md)
- [Wiki執筆ガイド](../../wiki-editing-guide.md)
