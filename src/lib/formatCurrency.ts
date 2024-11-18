
interface CurrencyConfig {
    locale: string;
    currency: string;
   }
   
   const getCurrencyConfigByCountry = (country: string): CurrencyConfig => {
    switch (country.toLowerCase()) {
      case 'ng':
      case 'nigeria':
        return { locale: 'en-NG', currency: 'NGN' };
      case 'gh':
      case 'ghana':
        return { locale: 'en-GH', currency: 'GHS' };
      default:
        return { locale: 'en-NG', currency: 'NGN' }; // Default to Nigeria
    }
   };
   
   export const detectUserCountry = (): string => {
    // Check timezone specifically for Nigeria and Ghana
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (timezone === 'Africa/Lagos') {
      return 'NG';
    }
    if (timezone === 'Africa/Accra') {
      return 'GH';
    }
    
    return 'NG'; // Default to Nigeria if unable to detect
   };
   
   export const formatCurrency = (amount: number): string => {
    const userCountry = detectUserCountry();
    const config = getCurrencyConfigByCountry(userCountry);
    
    return new Intl.NumberFormat(config.locale, {
      style: 'currency',
      currency: config.currency
    }).format(amount);
   };
   