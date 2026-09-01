# Вычислитель отличий (Gendiff)

[![Actions Status](https://github.com)](https://github.com)

## Описание
**Вычислитель отличий(Gendiff)** — программа, которая определяет разницу между двумя структурами данных. Это популярная задача, для которой существуют онлайн-сервисы вроде jsondiff; похожий механизм используется при выводе тестов и при отслеживании изменений в конфигурационных файлах.

Возможности утилиты:

-Поддержка разных входных форматов: YAML, JSON
-Генерация отчёта в форматах plain text, stylish и JSON

## Установка

Для работы утилиты необходим установленный [Node.js](https://nodejs.org).

```bash
git clone https://github.com
cd frontend-project-46
npm ci
npm link
```

## Использование

```bash
gendiff [options] <filePath1> <filePath2>
```

### Доступные опции:
* `-V, --version` — вывод версии программы
* `-h, --help` — вывод справочной информации
* `-f, --format <type>` — формат вывода результата (`stylish`, `plain`, `json`). По умолчанию: `stylish`.

---

## Тестирование

Для запуска автоматических тестов и проверки покрытия кода используются фреймворки **Vitest** и **ESLint**.

```bash
make test           # Запуск тестов
make test-coverage  # Запуск тестов с подсчетом покрытия (минимальный порог 80%)
make lint           # Проверка кода линтером
```

---

## Демонстрация работы (Asciinema)

### Сравнение плоских конфигурационных файлов (В формате Stylish)
**JSON**
[![asciicast](https://asciinema.org/a/x4TT2rkfcqpcE6O2.svg)](https://asciinema.org/a/x4TT2rkfcqpcE6O2)
**YAML**
[![asciicast](https://asciinema.org/a/NU3fhyHzoRDGNt8l.svg)](https://asciinema.org/a/NU3fhyHzoRDGNt8l)

### Рекурсивное сравнение вложенных структур (В формате Stylish)
[![asciicast](https://asciinema.org/a/H56VVyFzMoJSKuxU.svg)](https://asciinema.org/a/H56VVyFzMoJSKuxU)

### Вывод различий во внешнем плоском формате (В формате Plain)
[![asciicast](https://asciinema.org/a/2Fy90VIM86oSVVCw.svg)](https://asciinema.org/a/2Fy90VIM86oSVVCw)

### Вывод различий в структурированном виде (В формате JSON)
[![asciicast](https://asciinema.org/a/16XJVg7EOZAfEkNB.svg)](https://asciinema.org/a/16XJVg7EOZAfEkNB)