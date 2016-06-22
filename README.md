# ItapeBus API

## Public API with schedules in the city buses of Itapetininga, SP - Brazil.

The data is extracted from the Company [Rosa turismo - http://www.rosaturismo.com.br/itapetininga/](http://www.rosaturismo.com.br/itapetininga/) site through a scrapper.

Currently API has three routes:

- List routes: `/routes`

```shell
curl https://itapebus-api.heroku.com/routes
```

- Show route: `/routes/:routeId`

```shell
curl https://itapebus-api.heroku.com/routes/:routeId
```

- Show schedules: `/schedules/:scheduleId`

```shell
curl https://itapebus-api.heroku.com/schedules/:scheduleId
```

## TODO

- [ ] Tests
- [ ] Routes
  - [ ] Linha 01 - Unimed X Vila Regina
  - [ ] Linha 02 - Taboãozinho X Bela Vista
  - [ ] Linha 03 - Chapada Grande X Chapadinha
  - [ ] Linha 04 - Nova Itapetininga X Vila Mazzei
  - [ ] Linha 05 - Piedade X Belo Horizonte
  - [x] Linha 06 - Bancários X Vila Prado
  - [x] Linha 07 - Alciate Alplan ate Parque Indústrial
  - [ ] Linha 08 - Presidio / Escola Agrícola
  - [ ] Linha 20 - Tupi
  - [ ] Linha 21 - Rechã
  - [ ] Linha 22 - Gramadinho
  - [ ] Linha 23 - Sao Roque Cantagalo
  - [ ] Linha 24 - Retiro Pescaria / Retiro Claros
  - [ ] Linha 25 - Espigão via Turvo dos Rodrigues / Catolicos / Sete Curvas
  - [ ] Linha 26 - Areião Viracopos
  - [ ] Linha 27 - Morro Alto
