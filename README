# Dekorator

### Do czego
Jeśli posiadasz zewnętrzne biblioteki lub masz własne, ale nie chcesz zmieniać ich wewnętrznego kodu to w większości
przypadków posiadają one możliwość rozszerzenia swojej funkcjonalności, jednak nie zawsze.

Tu z pomocą przychodzi klasa Dekorator - pozwala na zmianę danych wyjściowych bez konieczności zmiany kodu metody w klasie.
Prostym przykładam jest metoda `small()` Obiektu `String` która na wyjściu zwraca tekst opakowany w `<small>`, 
użycie dokoratora pozwoli na zmianę danych wyjściowych i np. pozwoli dodać atrybut `<small class="class-name">` zachowująć
bazowe właściwości metody `small()`.

## Sposób użycia

Konstruktor klasy potrzebuje Obiektu, na którym będzie dokonywał zmian na przykład `String`.
Dekorować będziemy metodę `small()`, tak by na danych wyjściowych uzyskać kolor tekstu `#FF0000`.


Dodanie do `String` możliwości dekorowania.
```javascript
var stringDecorator = new Decorator(String);
```

Przypisanie metodzie `small()` funkcji dekorującej o nazwie 'setColor'.
```javascript
stringDecorator.decoration({
            decorMethod: 'small',
            name: "setColor",
            fnDecor: function (color) {
                var text = $(String(this)).text();
                return '<small style="color:'+color+'">'+text+'</small>';
            }
        });
```

Użycie dekoratora
```javascript
var text = 'Example Text';
var htmlText = text.small().decorate('setColor',['#FF0000']);

$('body').append(htmlText);
```

Wynikiem w `htmlText` będzie `<small style="color:#FF0000">Example Text</small>`
