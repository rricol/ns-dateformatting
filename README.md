# Webflow Date Formatting Script

This project provides a utility to format dates on a Webflow site using locale-specific formats based on the URL subdirectory or a default language. It is built using the [Finsweet Developer Starter](https://github.com/finsweet/developer-starter) environment.

## Features

- **Supported Languages**:

  - French (`fr`)
  - German (`de`)
  - Italian (`it`)
  - English (`en`)
  - Spanish (`es`)

- **Custom Date Formats**: Automatically formats elements with the `ns-date-format` attribute.

## Installation

1. Clone the [Finsweet Developer Starter](https://github.com/finsweet/developer-starter) and follow the instructions to set up the development environment.
2. Add the compiled JavaScript file to your Webflow site.
3. Include a script tag in your Webflow project like this:

```html
<script defer src="http://localhost:3000/index.js" data-default-lang="fr"></script>
```

In this example, the default language is set to French (fr).

## Usage

To format a date, add the ns-date-format attribute to any HTML element containing a date. The script will automatically format the date based on the locale and the specified format.

**Example**

```html
<span ns-date-format="MMMM DD, YYYY">2024-09-28</span>
```

This will format the date as September 28, 2024 in English or 28 septembre 2024 in French.

### Available Formats

| Format          | Example Output       |
| --------------- | -------------------- |
| `DD-MM-YYYY`    | `28-09-2024`         |
| `MMMM DD, YYYY` | `September 28, 2024` |
| `YYYY-MM-DD`    | `2024-09-28`         |
| `HH:mm`         | `13:45` (24-hour)    |
| `h:mm A`        | `1:45 PM` (12-hour)  |
| `DD/MM/YYYY`    | `28/09/2024`         |
| `DD.MM.YYYY`    | `28.09.2024`         |
| `D MMM YYYY`    | `28 Sep 2024`        |

## License

This project is licensed under the MIT License.
