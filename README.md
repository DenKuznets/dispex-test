Если я правильно понял, сервер жильцов квартир не сохраняет, поэтому на стороне клиента реализовал сохранение внутри стейта компонента. При закрытии квартиры, жильцы обнуляются, глобальный стейт с привязкой к квартирам делать не стал.

Поскольку при добавлении жильца на сервер, сервер возвращает один и тот же айди, при добавлении жильца в список в квартире присваивал ему рандомный айди, что бы при удалении не удалялись все сразу.