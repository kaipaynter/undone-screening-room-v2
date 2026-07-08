/**
 * Secret Configuration
 * Centralized location for sensitive portal credentials
 * 
 * SECURITY NOTE: Base64 is NOT encryption. This is obfuscation for simple access control only.
 * For production, use environment variables and server-side authentication.
 */

// Base64 encoded password: "VU5ET05FMjAyNg==" decodes to "UNDONE2026"
// This is decoded at runtime to decouple from source code plaintext
const ENCODED_PASSWORD = 'VU5ET05FMjAyNg==';

/**
 * Safely decode the password from base64
 * Fails-closed: returns empty string on any error (access will be denied)
 */
export const getDecodedPassword = () => {
  try {
    if (typeof ENCODED_PASSWORD !== 'string' || !ENCODED_PASSWORD) {
      console.warn('[SecretConfig] Invalid password configuration');
      return '';
    }

    const decoded = atob(ENCODED_PASSWORD);

    // Validate the decoded result
    if (typeof decoded !== 'string' || decoded.length === 0) {
      console.warn('[SecretConfig] Password decode produced invalid result');
      return '';
    }

    return decoded;
  } catch (err) {
    console.error('[SecretConfig] Failed to decode password:', err);
    // Fail-closed: return empty string, which will deny all access
    return '';
  }
};

export { ENCODED_PASSWORD };
