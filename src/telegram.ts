import TelegramService from '../framework/services/TelegramService'

async function checkTelegram() {
  try {
    await TelegramService.sendMessage('test message')
    console.log('Telegram message sent')
  } catch (e) {
    console.error('Error sending telegram message', e)
  }
}

checkTelegram()
