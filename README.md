## Svelte TABLE

Sveltekit компонент таблицы с оформлением на **Bootstrap 6**.

Добавьте `<Table />` на свою страницу.

##

У компонента есть параметры:

- `title` - заголовок таблицы (опционально),
- `data` - данные, передаваемые в таблицу в формате массива объектов, например:

  ```ts
  let data = [
  	{
  		uid: 1,
  		name: 'Serge',
  		email: 'sergify@rr.r',
  		status: 'ok'
  	},
  	{
  		uid: 2,
  		name: 'Helen',
  		email: 'helen@rr.r',
  		status: 'go'
  	}
  ];
  ```

  , с нужным вам количеством полей,

- `titles` - заголовки колонок таблицы (опционально), если не указывать, то значения берутся из ключей объектов **data**,
- `grows` - массив **grow** значений (опционально), для задания каждой колонке доли ширины в таблице, например:

  `[2,1,1,1]`,
  если не указывать, то значения устанавливаются равными единице,

-`_class` и `_style` - для задания классов и стилей оформления в формате:

```ts
{ table?: string; header?: string; row?: string }
```

, где `table`, `header`, `row` оформляют всю таблицу, заголовки столбцов или строки таблицы соответственно.

##

Пример:

```ts
let data = [
	{
		uid: 1,
		name: 'Serge',
		email: 'sergify@rr.r',
		status: 'ok'
	},
	{
		uid: 2,
		name: 'Helen',
		email: 'helen@rr.r',
		status: 'go'
	}
];
```

```html
<table {data} grows="{[2,1,1,1]}" />
```

##

Вы можете отрендерить в ячейке таблицы сниппеты. Например, в качестве **status** предыдущего **data**, мы хотим добавить кнопку с указанием значения **name** из тойже **data**, т.е. хотим сделать как здесь:

![Пример таблицы](/assets/Table.png)

тогда:

- создаём сниппет:

  ```html
  {#snippet block(ob: { name: string })}
  <button class="btn">{ob.name}</button>
  {/snippet}
  ```

- и меняем в **data** **status** на название сниппета **block**, т.е.

  ```ts
  let data = [
  	{
  		uid: 1,
  		name: 'Serge',
  		email: 'sergify@rr.r',
  		status: block
  	},
  	{
  		uid: 2,
  		name: 'Helen',
  		email: 'helen@rr.r',
  		status: block
  	}
  ];
  ```

В сниппете в параметрах нужно указывать объект, а не отдельный параметр. Т.е. нужно

`{#snippet block(ob: { name: string })}`,

а не

`{#snippet block(name: string)}`

Второй вариант не сработает, т.к. внутри `<Table />` это рендерится приблизительно как `{@render cell?.(data[i])}`, где `data[i]` это объект вроде `{uid: 2, name: 'Helen', email: 'helen@rr.r', status: block}`.

Данные для подстановки в сниппет, берутся из объекта **data** (соответствующей ячейки).
