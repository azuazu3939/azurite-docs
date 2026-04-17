# フロンティア・遠征・釣り戦闘 Wiki

> [!WARNING]
> route、quest 条件、profession access、釣り池 archetype は別々に見えて同じ冒険導線の一部です。片方だけ変えると既存 Frontier world 側と契約側がずれやすくなります。

## クイックデータ

| 項目 | 内容 |
| --- | --- |
| 主役 | Frontier spec、遠征契約、Quest Catalog、釣り池 archetype、魚種、竿戦闘 |
| 主設定 | `quests/frontier/*.yml`, `fishing-content.yml`, `nms/generator/*.yml` |
| 影響先 | profession 解放、報酬経済、campaign、探索導線 |
| 変更難度 | 高 |

## 概要

この要素は「どこへ行き、何を達成し、何を持ち帰るか」を決める冒険レイヤーです。  
既存 Frontier world を前提に、frontier spec、遠征契約、報酬、釣り戦闘がひとつの外遊びループとしてつながっています。

## プレイヤー体験

1. Frontier へ出る
2. 遠征契約に応じて採集、掃討、調査などの目的を進める
3. 水辺では釣り池 archetype と魚種に応じた釣り戦闘が始まる
4. 持ち帰った報酬が経済や campaign 導線へ戻る

## 構成の見取り図

| レイヤー | 主な場所 | メモ |
| --- | --- | --- |
| frontier spec | `nms/src/main/resources/generator/*.yml` | route / biome / territory の参照定義 |
| 遠征契約 | `core/src/main/resources/quests/frontier/frontier.yml` | 契約定義の入口 |
| 進行管理 | `ExpeditionService` | フェーズ進行と報酬担当 |
| 釣り設定 | `core/src/main/resources/fishing-content.yml` | settings、pond-archetypes、rods、species |
| runtime 起動条件 | Frontier role 有効時 | custom generator は立てず、spec だけ読む |

## 編集フロー

1. 変えたい対象を「frontier spec」「contract」「reward」「fishing」に切る
2. profession access と route 条件を同時に確認する
3. archetype 名を変えるなら既存 world との整合を見る

## よく触る変更パターン

### 遠征契約の内容を変えたい

- `quests/frontier/*.yml` から入り、条件と報酬の意味を整理する
- profession 解放や campaign 側の倍率とズレないかを見る

### 釣りの池や魚種を増やしたい

- `fishing-content.yml` の `pond-archetypes` と `species` を主入口にする
- archetype 名変更は既存 Frontier world 側と切れやすいので注意する

### 冒険報酬の体感を変えたい

- quest reward だけでなく economy への戻り先まで考える
- Frontier 単体で完結する変更にしない

## dryland 拡張メモ

- mixed surface では desert / mesa / badlands を乾燥地帯の主役にし、湿潤 pocket だけ oasis へ切り替わります。
- oasis は decorative 水たまりではなく大型 basin と fishing archetype `oasis_lake` を持つため、釣り・採集・木の密度がそこへ集中します。
- 乾燥地クエストの候補抽選は desert / mesa / badlands / oasis を拾い、表示名は oasis だけ個別に「オアシス」と出ます。
- surface quest のルート探索は入口から 2000m を超えない前提で調整されています。

## 連動する要素

- [成長・クラス・専門職](../progression-professions/wiki.md)  
  access-tag と profession 解放が遠征参加条件へ効きます。
- [経済・コマース](../economy-commerce/wiki.md)  
  持ち帰り報酬が市場へ流れます。
- [スポーン制御・ワールドボス・Mythic AI](../spawn-ai-worldboss/wiki.md)  
  spawn 条件や territory 制御が探索の密度を作ります。

## FAQ

### route と quest は別々に直してよいか

非推奨です。進行条件と frontier spec 側導線がずれると、到達できない契約や意味の薄いルートが生まれます。

### 釣りは Frontier と切り離して考えてよいか

体験上は別ループに見えても、報酬や world 上の配置は Frontier の外遊び導線に含まれます。

### generator 側だけ見れば足りるか

足りません。いまは world 生成 runtime を使っておらず、generator 側は route / biome / territory の spec です。契約定義と報酬の意味づけも一緒に見る必要があります。

## 関連

- [要素概要](./summary.md)
- [編集例](./examples.md)
- [Wiki執筆ガイド](../../wiki-editing-guide.md)
