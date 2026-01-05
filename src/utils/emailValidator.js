/**
 * Centralized Email Validation Utility
 * Protects against fake, disposable, and generic email addresses
 */

// Common fake email patterns
const FAKE_PATTERNS = [
  /^test[\d]*@/i,
  /^admin[\d]*@/i,
  /^fake[\d]*@/i,
  /^dummy[\d]*@/i,
  /^sample[\d]*@/i,
  /^example[\d]*@/i,
  /^user[\d]*@/i,
  /^temp[\d]*@/i,
  /^demo[\d]*@/i,
  /^noreply[\d]*@/i,
  /^info[\d]*@/i,
  /^support[\d]*@/i,
  /^mail[\d]*@/i,
  /^email[\d]*@/i,
  /^contact[\d]*@/i,
  /^hello[\d]*@/i,
  /^hi[\d]*@/i,
  /^asdf[\d]*@/i,
  /^asdsaf[\d]*@/i, // Specific gibberish pattern
  /^qwerty[\d]*@/i,
  /^abc[\d]*@/i,
  /^123[\d]*@/i,
  /^\d+@/i, // Numbers only
  /^[a-z]{1,2}@/i, // Very short (1-2 chars)
];

// Gibberish and keyboard mashing patterns
const GIBBERISH_PATTERNS = [
  // Specific keyboard mashing sequences
  /^[asd]{3,}@/i,              // asdsaf, asdsdsa, dasdasd
  /^[qwe]{3,}@/i,              // qwerty, qweqwe, weqwe
  /^[zxc]{3,}@/i,              // zxczxc, cxzcxz
  /^[fgh]{3,}@/i,              // fghfgh, ghfgh
  /^[jkl]{3,}@/i,              // jkljkl, klj
  
  // Character repetition
  /^(.)\1{2,}@/i,              // aaa@, bbbb@, ccccc@
  /^([a-z]{2})\1+@/i,          // abab@, xoxo@, fafa@
  
  // Random character mixing patterns
  /^[a-z]{2}[a-z]{2}[a-z]+@/i, // Detects patterns like "asdsaf"
  /^[bcdfghjklmnpqrstvwxyz]{5,}@/i, // Too many consonants
  /^[aeiou]{4,}@/i,            // Too many vowels
  
  // Sequential alphabet
  /^(abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz)+@/i,
  
  // Number and letter random mixing
  /^[a-z]{1,3}\d{3,}@/i,       // abc123@, x999@
  /^\d{3,}[a-z]{1,3}@/i,       // 123abc@, 999x@
  
  // Common keyboard rows
  /^(qwertyuiop|asdfghjkl|zxcvbnm)+@/i,
];

// Known disposable email domains
const DISPOSABLE_DOMAINS = [
  '10minutemail.com',
  'temp-mail.org',
  'guerrillamail.com',
  'mailinator.com',
  'throwaway.email',
  'tempmail.com',
  'yopmail.com',
  'maildrop.cc',
  'sharklasers.com',
  'guerrillamailblock.com',
  'pokemail.net',
  'spam4.me',
  'dispostable.com',
  'tempail.com',
  'mohmal.com',
  'mytrashmail.com',
  'emailondeck.com',
  'fakeinbox.com',
  'tempinbox.com',
  'getnada.com',
  'inboxkitten.com',
  'temp-mail.io',
  'minuteinbox.com',
  'emailfake.com',
  'trashmail.com'
];

// Suspicious domain patterns
const SUSPICIOUS_DOMAIN_PATTERNS = [
  /test\d*\.com$/i,
  /fake\d*\.com$/i,
  /temp\d*\.com$/i,
  /example\d*\.com$/i,
  /sample\d*\.com$/i,
  /demo\d*\.com$/i
];

/**
 * Validates email format using RFC 5322 compliant regex
 */
function isValidEmailFormat(email) {
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return emailRegex.test(email);
}

/**
 * Checks if email matches fake patterns
 */
function isFakePattern(email) {
  return FAKE_PATTERNS.some(pattern => pattern.test(email));
}

/**
 * Checks if email matches gibberish patterns
 */
function isGibberishPattern(email) {
  return GIBBERISH_PATTERNS.some(pattern => pattern.test(email));
}

/**
 * Checks if domain is disposable
 */
function isDisposableDomain(domain) {
  return DISPOSABLE_DOMAINS.includes(domain.toLowerCase());
}

/**
 * Checks if domain matches suspicious patterns
 */
function isSuspiciousDomain(domain) {
  return SUSPICIOUS_DOMAIN_PATTERNS.some(pattern => pattern.test(domain));
}

/**
 * Scores email quality (0-100, higher is better)
 */
function getEmailQualityScore(email) {
  let score = 100;
  
  const [username, domain] = email.split('@');
  
  // Penalize very short usernames
  if (username.length <= 2) score -= 30;
  else if (username.length <= 3) score -= 15;
  
  // Penalize numbers-only usernames
  if (/^\d+$/.test(username)) score -= 40;
  
  // Penalize sequential patterns
  if (/123|abc|qwe/i.test(username)) score -= 25;
  
  // Penalize fake patterns
  if (isFakePattern(email)) score -= 50;
  
  // Penalize gibberish patterns (NEW)
  if (isGibberishPattern(email)) score -= 45;
  
  // Penalize disposable domains
  if (isDisposableDomain(domain)) score -= 60;
  
  // Penalize suspicious domains
  if (isSuspiciousDomain(domain)) score -= 35;
  
  // Bonus for longer, more complex usernames
  if (username.length >= 8 && /[a-zA-Z]/.test(username) && /\d/.test(username)) {
    score += 10;
  }
  
  return Math.max(0, Math.min(100, score));
}

/**
 * Main validation function
 * @param {string} email - Email to validate
 * @param {object} options - Validation options
 * @returns {object} - Validation result
 */
export function validateEmail(email, options = {}) {
  const {
    allowDisposable = false,
    minQualityScore = 60,
    checkMX = false // Future: for server-side MX checking
  } = options;
  
  // Basic format check
  if (!isValidEmailFormat(email)) {
    return {
      isValid: false,
      error: 'INVALID_FORMAT',
      message: 'Please enter a valid email address format.'
    };
  }
  
  const [username, domain] = email.split('@');
  
  // Check fake patterns
  if (isFakePattern(email)) {
    return {
      isValid: false,
      error: 'FAKE_EMAIL',
      message: 'Please provide a real email address.'
    };
  }
  
  // Check gibberish patterns (NEW)
  if (isGibberishPattern(email)) {
    return {
      isValid: false,
      error: 'GIBBERISH_EMAIL',
      message: 'Please provide a real email address.'
    };
  }
  
  // Check disposable domains
  if (!allowDisposable && isDisposableDomain(domain)) {
    return {
      isValid: false,
      error: 'DISPOSABLE_EMAIL',
      message: 'Temporary email addresses are not allowed.'
    };
  }
  
  // Check suspicious domains
  if (isSuspiciousDomain(domain)) {
    return {
      isValid: false,
      error: 'SUSPICIOUS_DOMAIN',
      message: 'Please use a valid business or personal email address.'
    };
  }
  
  // Quality score check
  const qualityScore = getEmailQualityScore(email);
  if (qualityScore < minQualityScore) {
    return {
      isValid: false,
      error: 'LOW_QUALITY',
      message: 'Please provide a professional email address.'
    };
  }
  
  return {
    isValid: true,
    qualityScore,
    message: 'Email is valid.'
  };
}

/**
 * Quick validation for basic checks only
 */
export function validateEmailBasic(email) {
  return validateEmail(email, { 
    allowDisposable: true, 
    minQualityScore: 30 
  });
}

/**
 * Strict validation for high-security forms
 */
export function validateEmailStrict(email) {
  return validateEmail(email, { 
    allowDisposable: false, 
    minQualityScore: 70 
  });
}

/**
 * Get list of blocked patterns (for debugging)
 */
export function getBlockedPatterns() {
  return {
    fakePatterns: FAKE_PATTERNS.map(p => p.source),
    disposableDomains: DISPOSABLE_DOMAINS,
    suspiciousDomains: SUSPICIOUS_DOMAIN_PATTERNS.map(p => p.source)
  };
}