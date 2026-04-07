# 経済・コマース の編集例

運用メモと shop entry イメージで掴むのが向いています。

## サンプル
```yml
shop-id: "credit_shop"
entry:
  display-name: "配送クレジット x30"
  price:
    currency-type: "VAULT"
    amount: 300.0
```

```text
/commerce shop bind-npc credit_shop
  視線先が村人/行商人ならその個体へ固定
  視線先が Mythic NPC なら、その NPC 自身ではなく元の Spawner 名へバインド
```

## 押さえる点
- 実装は Kotlin 登録でも設計上はこの粒度で読むと分かりやすい。
- 価格と reward の釣り合いを先に見る。
- Vault 不在時の挙動も考える。
- Mythic 側で shop 窓口を増やしたい時は `mmid` を増やさず `Spawner` を分ける。

## 関連
- [要素概要](./summary.md)
- [Wiki](./wiki.md)
