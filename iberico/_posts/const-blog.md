---
title: 'TypeScriptで意味的にまとまった定数を宣言する方法'
date: '2020-05-25'
---

実務と書籍で学んだことをまとめる。
他に方法をみつけ次第、随時更新する。

そもそも定数とは、

- 数カ所にわたって使い回す値で、そのすべての箇所で同じ値

- 用いる場面で言葉（数）の意味は同じだけど、その内容が変わり得る値

とする。

例として、「四季で異なるメニューの食材」を想定する（同じ旬でも年毎によく採れる・安い食材は変わるよね）。
また、モジュール間で共有することを想定して常にexportする。

## 0. 結論
1. enum
2. const enum
3. namespace
4. クラス
5. 配列
6. オブジェクト

の6パターンを紹介するが、今のところは**6のオブジェクトを使う方法が、最も取り回しよく適していると考えている。**
手っ取り早く知りたい方は6を参照のこと。

## 1. enumを使う

```ts
export enum Foodstuff {
  Onion,
  Cucumber,
  SweetPotato,
  Apple,
}
```

しかし、enumは明示的な割り当てがない場合、各メンバーの値として数値を自動的に推論する。
上の場合、実際の各値は数値(0-3)になる。
enumはそのキーと値どちらでもアクセスできるが、値でアクセスすると存在し得ない値でもアクセスできてしまう（**コンパイルエラーにならない**）。

```ts
const onion = Foodstuff.Onion;
const otherFood = Foodstuff[9]; // エラーにならない！
```

ということで安全ではない。


## 2. const enumを使う

```ts
export const enum Foodstuff {
  Cabbage,
  Cucumber,
  SweetPotato,
  Apple,
}
```

constを付与すると、１のような値でのアクセスができなくなるので少し安全。

```ts
const onion = Foodstuff[0]
// const 列挙型メンバーは、文字列リテラルを使用してのみアクセスできます。
const cucumber = Foodstuff.Cucumber
// 1
```

しかし相変わらず実際の値が数値のままである。
しかも残念なことに、すべての数値がenumに割り当てられてしまう。

```ts
const food: Foodstuff = 10;
```

これがエラーにならない。
しかも、これらの状態では食材しか表現できていない（四季が抜けている）。
ではこれをどう解決するか。キーの名前を四季にし、割り当てる値を文字列値にすればいい。

```ts
export const enum Foodstuff {
  Spring = 'onion',
  Summer = 'cucumber',
  Automn = 'sweetPotato',
  Winter = 'apple',
}

const food: Foodstuff = 10;
// 型 '10' を型 'Foodstuff' に割り当てることはできません。
```

ただ、enumの中に1つでも文字列値が与えられていなければ、そのenumは上記のようにたちまち安全ではなくなってしまう。
使用には注意が必要。


## 3. namespaceを使う

```ts
export namespace Foodstuff {
  export const Spring = 'onion'
  export const Summer = 'cucumber'
  export const Automn = 'sweetPotato'
  export const Winter = 'apple'
}

console.log(Foodstuff.Automn)
// sweetPotato
```

namespaceであれば、enumのように存在し得ないプロパティアクセスはできない。そもそも変数の集まりなので、当然といえば当然。存在しない変数にはアクセスできないので。
enumでは何気なく`型`として使用していたが、namespaceは型を生成しないので、下記のように型として使用することはできない。

```ts
const food: Foodstuff = 'onion'
// 名前空間 'Foodstuff' を型として使用することはできません。
```

型として使用しないのであれば、悪くない気がする。
ただ、`これらの値のいずれかだ`と宣言したい場面は出てくるだろうし、型として使えないのは手落ち感（別途作ればいいが、少しメンドイ）。


## 4. クラスを使う

```ts
export class Foodstuff {
  static readonly Spring = 'onion';
  static readonly Summer = 'cucumber';
  static readonly Automn = 'sweetPotato';
  static readonly Winter = 'apple';
}

console.log(Foodstuff.Summer)
// cucumber

const food: Foodstuff = 'apple'
```

静的プロパティ＋読み込み専用で定数化するやり方。
これも悪くない。クラスなら型と値の両方で使えるし。


## 5. 配列を使う

```ts
const Foodstuff = [
  'onion',
  'cucumber',
  'sweetPotato',
  'apple',
] as const

console.log(Foodstuff[0])
// onion

const food: Foodstuff = 'apple'
// 'Foodstuff' は値を参照していますが、ここでは型として使用されています。
```

`as const`を使えば、すべての要素をreadonlyとすることができるので、実質定数となる。
しかし、配列ではキーをつけられないので、`1. enumを使う`と同じ問題が生じる。
また、変数なので当然、型として使用できない。これを型として使用するに以下のように少し工夫が必要。

```ts
type Foodstuff = typeof Foodstuff[number]
// type Foodstuff = "onion" | "cucumber" | "sweetPotato" | "apple"
```

配列のインデックスとしてnumber型を与えることで、各要素のユニオン型として型を宣言できる。
識別するキーがないので定数として使うにはビミョーだが、下記のように定数ごとに処理を変えてループを回す、といった活用はできるので、使い所はある。

```ts
Foodstuff.forEach(food => {
  switch (food) {
    case 'apple':
      // 個別処理
      break
    case 'cucumber':
      // 個別処理…
  }
})
```


## 6. オブジェクトを使う

```ts
const Foodstuff = {
  Spring: 'onion',
  Summer: 'cucumber',
  Automn: 'sweetPotato',
  Winter: 'apple',
} as const

console.log(Foodstuff[0])
// onion

const food: Foodstuff = 'apple'
// 'Foodstuff' は値を参照していますが、ここでは型として使用されています。
```

配列と似たパターン。四季をキーにしてアクセスできるので、値としての使用はオブジェクトの方が適している。
型として使用する場合は、配列同様に少し工夫が必要。

```ts
type Foodstuff = typeof Foodstuff[keyof typeof Foodstuff]
// type Foodstuff = "onion" | "cucumber" | "sweetPotato" | "apple"
```

初めてみたときはウェッてなるかもだが、落ち着いて読み解けば理解できる。
右端から順に、

1. 値としての`Foodstuff`オブジェクトを型とする（`typeof Foodstuff`）

2. その型の各プロパティ名を文字列リテラルとしたユニオン型を取り出す（`keyof typeof Foodstuff`、つまり`"Spring" | "Summer" | "Automn" | "Winter"`）

3. 値`Foodstuff`から、2で取り出したプロパティ名で取り出す値、それを文字列リテラルとしたユニオン型、それが左辺の型エイリアスに代入される（上記のコメントアウトの型に収束する）。

個人的には、このパターンが今のところ一番適しているのではないかと考えている。

- enumは安全でない

- namespaceは型を作成しにくい

- 配列はキーがないので、各値の意味が伝わりにくい

クラスを使っても同様のことはできるが、ふるまいを定義しないのにクラスを使用する意味はない。
逆に、これらにふるまいを追加する（見込み）があるのであれば、クラスにすべき（もはやそれは定数のまとまりと呼べないが）。

### 参考書籍


