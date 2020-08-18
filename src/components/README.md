## Inputs
- Os inputs são definidos praticamente como os originais, com a diferença
de que acrescenta-se os props *getValue* e *testId* para buscar o valor e
estipular o data-testid respectivamente.

### Exemplo
- `<Input type="number" id="meuid" getValue={(value) => console.log(value)} />`
* O código acima cria um input do tipo número e usa o log para imprimir o valor
- `<Input type="text-area" testId="input-comentario" name="comentario" />`
* O código acima cria um input do tipo text-area e atribui um data-testid
- `<Input type="text-area" testId="input-comentario" name="comentario" />`

** Caso especial Select **
- Primeiramente é necessário definir o array de opções:
```sh
  const options = [
    {value: 'Luis', innerText: 'Lizzard'},
    {value: 'Mitchell', innerText: 'Alex'},
    {value: 'Ventura', innerText: 'Lucão'},
  ];
```
- Depois realize a tag
`<Select options={opt} getValue={(value) => console.log(value)} />`
