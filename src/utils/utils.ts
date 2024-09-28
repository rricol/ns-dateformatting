// List of predefined languages
const languages: string[] = ['fr', 'de', 'it', 'en', 'es'];

// Function to get the language from the script tag attribute or fallback
function getDefaultLanguage(): string {
  const scriptTag = document.querySelector('script[data-default-lang]') as HTMLScriptElement;
  if (scriptTag) {
    return scriptTag.getAttribute('data-default-lang') || 'fr-CH'; // Fallback to fr-CH
  }
  return 'fr-CH'; // Fallback if script tag is not found
}

// Function to get the language from URL subdirectory
function getLanguageFromURL(defaultLanguage: string): string {
  const path = window.location.pathname.split('/');
  const potentialLang = path[1]; // Subdirectory after the root
  if (languages.includes(potentialLang)) {
    return potentialLang;
  }
  return defaultLanguage;
}

// Function to format date based on the format and locale, including time
function formatDateElement(dateText: string, format: string, locale: string): string {
  const date = new Date(dateText);
  if (isNaN(date.getTime())) {
    return dateText; // Return original text if invalid date
  }

  // Get the options for the date formatting including time if applicable
  const options = getDateFormatOptions(format);
  return new Intl.DateTimeFormat(locale, options).format(date);
}

// Function to map format string to Intl.DateTimeFormat options, including time options
function getDateFormatOptions(format: string): Intl.DateTimeFormatOptions {
  switch (format) {
    // Date Formats
    case 'ddd': // Mon, Tue, etc.
      return { weekday: 'short' };
    case 'dddd': // Monday, Tuesday, etc.
      return { weekday: 'long' };
    case 'DD': // 01, 02, etc.
      return { day: '2-digit' };
    case 'D': // 1, 2, etc.
      return { day: 'numeric' };
    case 'MMM': // Jan, Feb, etc.
      return { month: 'short' };
    case 'MMMM': // January, February, etc.
      return { month: 'long' };
    case 'YY': // 21 (for 2021)
      return { year: '2-digit' };
    case 'YYYY': // 2021
      return { year: 'numeric' };
    case 'DD-MM': // 01-01
      return { day: '2-digit', month: '2-digit' };
    case 'DD-MM-YYYY': // 01-01-2021
      return { day: '2-digit', month: '2-digit', year: 'numeric' };
    case 'MMMM DD, YYYY': // January 01, 2021
      return { month: 'long', day: 'numeric', year: 'numeric' };
    case 'MM/DD/YYYY': // 01/01/2021 (commonly used in US English)
      return { month: '2-digit', day: '2-digit', year: 'numeric' };
    case 'DD/MM/YYYY': // 01/01/2021 (used in many European languages)
      return { day: '2-digit', month: '2-digit', year: 'numeric' };
    case 'YYYY-MM-DD': // 2021-01-01 (ISO format, common in tech contexts)
      return { year: 'numeric', month: '2-digit', day: '2-digit' };
    case 'D MMM YYYY': // 1 Jan 2021 (common in written forms)
      return { day: 'numeric', month: 'short', year: 'numeric' };
    case 'DD.MM.YYYY': // 01.01.2021 (common in German and Swiss formats)
      return { day: '2-digit', month: '2-digit', year: 'numeric' };
    case 'dddd, MMMM DD, YYYY': // Monday, January 01, 2021 (long-form format)
      return { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
    case 'D de MMMM de YYYY': // 1 de enero de 2021 (Spanish long form)
      return { day: 'numeric', month: 'long', year: 'numeric' };

    // Time Formats
    case 'HH:mm': // 24-hour time, no seconds
      return { hour: '2-digit', minute: '2-digit', hour12: false };
    case 'HH:mm:ss': // 24-hour time, with seconds
      return { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
    case 'h:mm A': // 12-hour time with AM/PM
      return { hour: 'numeric', minute: 'numeric', hour12: true };
    case 'h:mm:ss A': // 12-hour time with seconds and AM/PM
      return { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true };

    // Date and Time Formats
    case 'DD-MM-YYYY HH:mm': // 01-01-2021 13:45
      return {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      };
    case 'MMMM DD, YYYY h:mm A': // January 01, 2021 1:45 PM
      return {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
      };
    case 'DD/MM/YYYY HH:mm:ss': // 01/01/2021 13:45:30
      return {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      };
    case 'YYYY-MM-DDTHH:mm:ss': // 2021-01-01T13:45:30 (ISO 8601)
      return {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      };

    default:
      return {};
  }
}

// Function to update all elements with "ns-date-format" attribute
export function updateDateElements(): void {
  const defaultLanguage = getDefaultLanguage();
  const locale = getLanguageFromURL(defaultLanguage);
  const dateElements = document.querySelectorAll('[ns-date-format]');

  dateElements.forEach((element) => {
    const format = element.getAttribute('ns-date-format') as string;
    const dateText = element.textContent!.trim();
    const formattedDate = formatDateElement(dateText, format, locale);
    element.textContent = formattedDate;
  });
}
