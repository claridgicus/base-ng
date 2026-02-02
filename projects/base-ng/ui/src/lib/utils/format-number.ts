/**
 * @fileoverview Angular port of Base UI number formatting utilities
 * @source https://github.com/mui/base-ui/blob/master/packages/react/src/utils/formatNumber.ts
 */

/**
 * Cache for Intl.NumberFormat instances to avoid repeated creation.
 */
export const numberFormatCache = new Map<string, Intl.NumberFormat>();

/**
 * Gets or creates a cached Intl.NumberFormat instance.
 *
 * @param locale - The locale to use for formatting
 * @param options - Number format options
 * @returns An Intl.NumberFormat instance
 */
export function getFormatter(
  locale?: Intl.LocalesArgument,
  options?: Intl.NumberFormatOptions,
): Intl.NumberFormat {
  const optionsString = JSON.stringify({ locale, options });
  const cachedFormatter = numberFormatCache.get(optionsString);

  if (cachedFormatter) {
    return cachedFormatter;
  }

  const formatter = new Intl.NumberFormat(locale, options);
  numberFormatCache.set(optionsString, formatter);

  return formatter;
}

/**
 * Formats a number using the specified locale and options.
 *
 * @param value - The number to format (or null)
 * @param locale - The locale to use for formatting
 * @param options - Number format options
 * @returns The formatted number string, or empty string if value is null
 */
export function formatNumber(
  value: number | null,
  locale?: Intl.LocalesArgument,
  options?: Intl.NumberFormatOptions,
): string {
  if (value == null) {
    return '';
  }
  return getFormatter(locale, options).format(value);
}

/**
 * Formats a number with maximum precision (up to 20 fraction digits).
 *
 * @param value - The number to format (or null)
 * @param locale - The locale to use for formatting
 * @param options - Number format options
 * @returns The formatted number string with max precision
 */
export function formatNumberMaxPrecision(
  value: number | null,
  locale?: Intl.LocalesArgument,
  options?: Intl.NumberFormatOptions,
): string {
  return formatNumber(value, locale, {
    ...options,
    maximumFractionDigits: 20,
  });
}

/**
 * Formats a number as a value, defaulting to percentage format.
 *
 * @param value - The number to format (or null)
 * @param locale - The locale to use for formatting
 * @param format - Number format options (defaults to percent)
 * @returns The formatted number string
 */
export function formatNumberValue(
  value: number | null,
  locale?: Intl.LocalesArgument,
  format?: Intl.NumberFormatOptions,
): string {
  if (value == null) {
    return '';
  }
  if (!format) {
    return formatNumber(value / 100, locale, { style: 'percent' });
  }

  return formatNumber(value, locale, format);
}
