import CryptoJS from 'crypto-js'

const SECRET_KEY = process.env.ENCRYPTION_SECRET || 'stageone-wallet-secret-key'

export function encryptData(data) {
  return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString()
}

export function decryptData(encryptedData) {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY)
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
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
    const bytes = CryptoJS.AES.decrypt(encryptedBalance, SECRET_KEY)
    return parseFloat(bytes.toString(CryptoJS.enc.Utf8))
  } catch (error) {
    console.error('Balance decryption error:', error)
    return 0
  }
}