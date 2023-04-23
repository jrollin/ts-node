[![Test](https://github.com/jrollin/ts-zod/actions/workflows/test.yml/badge.svg)](https://github.com/jrollin/ts-zod/actions/workflows/test.yml)

![Zod logo](./zod.png)

# Typescript + Zod schema validation

Project to demonstrate Typescript Type validation at runtime thanks to [ Zod ](https://zod.dev/)

> Project used in [my article about TS + Zod (:fr:)](https://www.julienrollin.com/posts/typescript-zod-validation)

Libraries used :

- [Zod](https://zod.dev/) to ensure schema and type validation
- [Vitest](https://vitest.dev/) as test framework
- [cross-fetch](https://github.com/lquixada/cross-fetch) to provide `fetch` in browser and node context

## API Nobel Prize

URL : http://api.nobelprize.org/v1/prize.json

This API can be tricky to validate

### Expected Response schema

```json
{
  "prizes": [
    {
      "year": "2022",
      "category": "literature",
      "laureates": [
        {
          "id": "1017",
          "firstname": "Annie",
          "surname": "Ernaux",
          "motivation": "\"for the courage and clinical acuity with which she uncovers the roots, estrangements and  collective restraints of personal memory\"",
          "share": "1"
        }
      ]
    }
  ]
}
```

### Special Response

Sometimes, there are no laureate but a reason is provided in another key `overallMotivation` :

```json
{
  "year": "1939",
  "category": "peace",
  "overallMotivation": "\"No Nobel Prize was awarded this year. The prize money was with 1/3 allocated to the Main Fund and with 2/3 to the Special Fund of this prize section.\""
}
```
