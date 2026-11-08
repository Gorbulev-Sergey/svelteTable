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

Вы можете отрендерить в ячейке таблицы сниппеты. Тогда нам нужно изменить **data** следующим образом:

```ts
let data = [
	{
		uid: 1,
		name: 'Max',
		email: 'max@rr.r',
		status: 'ok',
		picture: {
			snippet: pictureSnippet,
			url: 'https://avatars.mds.yandex.net/i?id=70ac3804623c28aefe512774776838b4_l-16338923-images-thumbs&n=13',
			title: 'Привет'
		}
	},
	{
		uid: 2,
		name: 'Helen',
		email: 'helen@rr.r',
		status: 'ok',
		picture: {
			snippet: pictureSnippet,
			url: 'https://avatars.mds.yandex.net/i?id=dbb82f339bab80491528cf7c02428ee4_l-10752576-images-thumbs&n=13',
			title: 'Как дела'
		}
	}
];
```

Здесь мы добавили к данным в **data** поле `picture`, которое содержит поля `snippet`, `url`, `title`. Поле `snippet` в данном случае обязательное, если мы хотим отрендерить этот `picture`, оно равно нашему сниппету. А поля `url`, `title` - это данные, которые мы передаём в сниппет.

Вот пример нашего сниппета:

```ts
{#snippet pictureSnippet(obj: { picture: { url: string; title: string } })}
	<div class="d-flex flex-column gap-1 rounded-3 overflow-hidden">
		<div>{obj.picture.title}</div>
		<img class="img-fluid rounded-3" src={obj.picture.url} alt={obj.picture.title} />
	</div>
{/snippet}
```

В сниппете в параметрах нужно указывать объект, а не отдельные параметры. Т.е. нужно

```ts
{#snippet pictureSnippet(obj: { picture: { url: string; title: string } })}
```

, а не

```ts
{#snippet pictureSnippet(picture: { url: string; title: string } )}
```

, и не

```ts
{#snippet pictureSnippet(url: string; title: string )}
```

Последние варианты не сработают, т.к. внутри `<Table />` это рендерится приблизительно как `{@render cell?.(data[i])}`, где `data[i]` это объект вроде

```ts
{
	uid: 2,
	name: 'Helen',
	email: 'helen@rr.r',
	status: 'ok',
	picture: {
		snippet: pictureSnippet,
		url: 'https://avatars.mds.yandex.net/i?id=dbb82f339bab80491528cf7c02428ee4_l-10752576-images-thumbs&n=13',
		title: 'Как дела'
	}
}
```
