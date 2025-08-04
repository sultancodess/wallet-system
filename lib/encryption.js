import CryptoJS from 'crypto-js'

const SECRET_KEY = process.env.ENCRYPTION_SECRET || 'wallet-system-secret-key'

export function encryptData(data) {
  return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString()
}

export function decryptData(encryptedData) {
  try {
    if (!encryptedData) return null
    const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY)
    const decrypted = bytes.toString(CryptoJS.enc.Utf8)
    return decrypted ? JSON.parse(decrypted) : null
  } catch (error) {
    console.error('Decryption error:', error)
    return null
  }
}

export function encryptBalance(balance) {
  return CryptoJS.AES.encrypt(balance.toString(), SECRET_KEY).toString()
}

export function decryptBalance(encryptedBalance) {
  try {
    if (!encryptedBalance) return 0
    const bytes = CryptoJS.AES.decrypt(encryptedBalance, SECRET_KEY)
    const decrypted = bytes.toString(CryptoJS.enc.Utf8)
    return decrypted ? parseFloat(decrypted) : 0
  } catch (error) {
    console.error('Balance decryption error:', error)
    return 0
  }
}
  