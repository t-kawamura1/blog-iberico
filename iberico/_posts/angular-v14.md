---
title: '【待望】Angular v14で導入されたTyped Formsのご紹介！'
date: '2020-06-04'
---

つい先日、Angular v14がめでたくリリースされました:tada:

アップデートの概要は、[こちらの公式ブログ](https://blog.angular.io/angular-v14-is-now-available-391a6db736af)をご参照ください。

今回のメジャーアップデート、なんと言っても目玉は**Typed Forms**の導入でしょう！
これまでのAngularでは、Reactive Formsから得られるvalueの型を指定することができず、その型はすべて**any**となっていました。
TypeScriptを使用しているのにanyなんて……意味ないやん……と全Angularユーザーが不満を抱えていたことでしょう。
Typed Formsの導入で、ついにこの悩みが解消されそうです。

この記事では、Angular v13で作成したデモプロジェクトに、v14を適用してTyped Formsを試してみた結果をお届けします。

Type Formsの概要は[Angular公式](https://angular.io/guide/typed-forms#typed-forms)をご覧ください。この記事で紹介する以外にも有益な情報が載っています。必読です。


当記事の
- v13のソースコード全文は[こちら](https://github.com/t-kawamura1/ex-forms-angular-v13.1.3/blob/master/src/experiment-typed-forms/ex-forms.component.ts)
- v14のソースコード全文は[こちら](https://github.com/t-kawamura1/ex-forms-angular-v14/blob/master/src/experiment-typed-forms/ex-forms.component.ts)


## v13のReactive Forms
- テンプレート
```ts
<div class="wisky-container">
  <form [formGroup]="wisky">
    <label for="brand">銘柄</label>
    <input formControlName="brand">

    <label for="country">生産国</label>
    <select formControlName="country" type="select">
      <option *ngFor="let country of countryOptions" [value]="country.value">
        {{ country.name }}
      </option>
    </select>

    <label for="price">価格</label>
    <input formControlName="price" type="number">

    <label for="howToDrink">飲み方</label>
    <select formControlName="howToDrink" type="select" multiple>
      <option *ngFor="let how of howToDrinkOptions" [value]="how">
        {{ how }}
      </option>
    </select>
  </form>
</div>
```

- コンポーネント
```ts
export class ExFormsComponent {

  wisky = new FormGroup({
    brand: new FormControl('山崎'),
    country: new FormControl(''),
    price: new FormControl(0),
    howToDrink: new FormControl([])
  });

  countryOptions: CountryOption[] = [
    {
      value: 'japanese',
      name: '日本',
    },
    {
      value: 'scotch',
      name: 'スコットランド',
    },
    {
      value: 'bourbon',
      name: 'アメリカ',
    },
  ];

  howToDrinkOptions = [
    'スレート',
    'ハイボール',
    'ロック',
    'トワイスアップ',
  ];

  constructor() {
    this.wisky.controls['brand'].valueChanges.subscribe(value => {
      console.log(value);
    });
    this.wisky.controls['country'].valueChanges.subscribe(value => {
      console.log(value.indexOf('t'));
    });
    this.wisky.controls['price'].valueChanges.subscribe(value => {
      console.log(value.indexOf('1'));
    });
    this.wisky.controls['howToDrink'].valueChanges.subscribe(values => {
      values.map(v => console.log(v));
    });
    this.wisky.controls['unknown'].valueChanges.subscribe(value => {
      console.log(value);
    });
  }
}

type CountryOption = {
  value: string,
  name: string,
};

```

上のコードでは、コンストラクタの中で3つ問題が起こります。何だか分かりますか？

正解はこちら。

```ts
this.wisky.controls['price'].valueChanges.subscribe(value => {
  console.log(value.indexOf('1'));
});
// 問題1
// コンパイルエラーにならなず、ランタイムエラーになる。
// priceはnumberのはずなのに、stringのメソッドを呼び出している。
// TypeError: value.indexOf is not a function

this.wisky.controls['howToDrink'].valueChanges.subscribe(values => {
  values.map(v => console.log(v));
});
// 問題2
// こちらはコンパイルエラー。
// パラメーター 'v' の型は暗黙的に 'any' になります。ts(7006)

this.wisky.controls['unknown'].valueChanges.subscribe(value => {
  console.log(value);
});
// 問題3
// コンパイルエラーにならなず、実行時エラーになる。
// 存在しないプロパティにアクセスしている。
// TypeError: Cannot read properties of undefined (reading 'valueChanges')
```

という残念な結果に。
TypeScript使っているんだから、ランタイムエラーは極力発生させたくないですよね。
でもvalueの型がanyなせいで、なっちゃうんだなこれが…。

問題2に関してはコンパイルの時点でエラーなので、対応は可能です。
可能ですが、こうなります。

```ts
this.wisky.controls['howToDrink'].valueChanges.subscribe(values => {
  (values as string[]).map(v => console.log(v));
});
```

無理やり型アサーション。これだと何か勘違いして値の型を間違えていても、コンパイルの時点では気付くことができません。
なんと残念なことでしょう…。

でもついに、v14にアップデートすることで！頭を悩ますanyと（ついでにnullも）おさらばできます！
それでは、まずはこのままv14にアップデートしてみましょう！
アップデート方法については、[こちら](https://update.angular.io/?v=13.0-14.0)をご参照ください。

結果がこちら！

## v14移行直後のReactive Forms

- コンポーネント変更発生部抜粋（テンプレートに変更は生じません）
```ts
wisky = new UntypedFormGroup({
  brand: new UntypedFormControl('山崎'),
  country: new UntypedFormControl(''),
  price: new UntypedFormControl(0),
  howToDrink: new UntypedFormControl([])
});
```

従来の`FormGroup`, `FormControl`が自動的に`Untyped~`に変更されました。
これは従来の仕様と変わりません。既存のプロジェクトでアップデートした場合、このUntypedなフォームを漸次、型安全にしていく必要がありますね。
大規模なプロジェクトだと大変ですが、是が非でもanyは撲滅していきたいところです。

ではこれを、Typed Formsに移行しましょう。
まずはじめに、`Untyped`を削除します。

```ts
wisky = new FormGroup({
  brand: new FormControl('山崎'),
  country: new FormControl(''),
  price: new FormControl(0),
  howToDrink: new FormControl([])
});
```

その結果、以下4つのコンパイルエラーが生じます（コンパイルエラーの時点でガッツポーズ）

```ts
this.wisky.controls['country'].valueChanges.subscribe(value => {
  console.log(value.indexOf('t'));
});
// (parameter) value: string | null
// オブジェクトは 'null' である可能性があります。ts(2531)

this.wisky.controls['price'].valueChanges.subscribe(value => {
  console.log(value.indexOf('1'));
});
// (parameter) value: number | null
// オブジェクトは 'null' である可能性があります。ts(2531)
// プロパティ 'indexOf' は型 'number' に存在しません。ts(2339)

this.wisky.controls['howToDrink'].valueChanges.subscribe(values => {
  values.map(v => console.log(v));
});
// プロパティ 'indexOf' は型 'number' に存在しません。
// (parameter) values: never[] | null
// オブジェクトは 'null' である可能性があります。ts(2531)

this.wisky.controls['unknown'].valueChanges.subscribe(value => {
  console.log(value);
});
// プロパティ 'unknown' は型 '{ brand: FormControl<string | null>; country: FormControl<string | null>; price: FormControl<number | null>; howToDrink: FormControl<never[] | null>; }' に存在しません。ts(7053)
```

**素晴らしいですね。**
すべてコンパイルエラーになってくれました。
上記ご覧の通り、このままではフォームの値がnullである可能があります。これまでの仕様がNullableだったため、これは致し方ない部分です。
ではこれを、nullのない世界線へと変えましょう。

```ts
wisky = new FormGroup({
  brand: new FormControl('山崎', { nonNullable: true }),
  country: new FormControl('', { nonNullable: true }),
  price: new FormControl(0, { nonNullable: true }),
  howToDrink: new FormControl([''], { nonNullable: true })
});
// howToDrinkがnever[]となるため、初期値を['']としました。
```

`{ nonNullable: true }`オプションを追加することで、たとえば`string | null`だったところが`string`のみとなります。
これでついに、**Reactive Formsの入力値の`any`、さらには`null`から解放されることとなりました**
やったぜ！！

上記については、初期値の値からフォーム値の型が推論されていますが、より明示的に型を指定することもできます。

```ts
wisky = new FormGroup({
  brand: new FormControl<string>('山崎', { nonNullable: true }),
  country: new FormControl<string>('', { nonNullable: true }),
  price: new FormControl<number>(0, { nonNullable: true }),
  howToDrink: new FormControl<string[]>([''], { nonNullable: true })
});
```

こちらの方が、よりうっかりがないので良い気がしますね。
ちなみに、初期値の設定はほぼ必須です。
なぜ「ほぼ」かというと、設定しないとまたまた値がanyになるからです。
anyだとTyped Formsの意味がないので、ほぼ必須というわけです。

欲を言えば、初期値を指定しなくても型を指定できるようにしてほしかったところですが、これは今後の発展に期待しましょう。

さらに、すべてのFormControlに`{ nonNullable: true }`を設定するのがめんどくさい場合、[FormBuilderを使用する方法](https://angular.io/guide/typed-forms#formbuilder-and-nonnullableformbuilder)もあります。


さて、ざっくりですが、Typed Formsを紹介してみました。
いかがでしたでしょうか。Typed Formsの導入だけでも、v14に早速アップデートするメリットがあるのではないでしょうか。
Reactive Formsの背後につきまとうanyが嫌で嫌で仕方ない方は、早いところv14に移行しちゃいましょう。
移行したところで、とりあえずは`Untyped~`になるだけです。漸次、型安全にしていけばいいのです。

みなさまもよきAngularライフを！
