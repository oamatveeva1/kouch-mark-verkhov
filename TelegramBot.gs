// Google Apps Script — приём заявок с сайта и пересылка в Telegram бота.
// Инструкция по развёртыванию внизу файла (в комментарии).

const BOT_TOKEN = 'ВСТАВЬТЕ_ТОКЕН_БОТА_ОТ_BOTFATHER';
const CHAT_ID = 'ВСТАВЬТЕ_CHAT_ID_КУДА_СЛАТЬ';
const SITE_NAME = 'Сайт Марка Верхова';
const SITE_URL = '...ваш_домен...';

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const name = data.name || '—';
    const phone = data.phone || '—';
    const email = data.email || '—';
    const date = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'dd.MM.yyyy HH:mm');

    const text = '🖤 Новая заявка ' + SITE_NAME + '\n───────\n'
      + '🌐 Сайт: ' + SITE_URL + '\n'
      + '👤 Имя: ' + name + '\n'
      + '📧 Почта: ' + email + '\n'
      + '📞 Телефон: ' + phone + '\n'
      + '🕒 Дата: ' + date;

    const url = 'https://api.telegram.org/bot' + BOT_TOKEN + '/sendMessage';
    UrlFetchApp.fetch(url, {
      method: 'post',
      contentType: 'application/json',
      payload: JSON.stringify({
        chat_id: CHAT_ID,
        text: text
      })
    });

    return ContentService
      .createTextOutput(JSON.stringify({ok: true}))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ok: false, error: err.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/*
  Как развернуть:
  1. Создайте бота у @BotFather в Telegram и получите токен.
  2. Напишите боту любое сообщение, затем получите свой chat_id:
     перейдите в браузере https://api.telegram.org/bot<ТОКЕН>/getUpdates
     и возьмите число из поля chat.id.
  3. На script.google.com создайте новый проект и вставьте этот код.
  4. Замените BOT_TOKEN и CHAT_ID.
  5. Разверните: «Развернуть» → «Новое развертывание» → тип «Веб-приложение».
  6. В доступе выберите «Все» (Anyone), нажмите «Развернуть», разрешите права.
  7. Скопируйте URL веб-приложения и вставьте его в index.html
     в константу FORM_ENDPOINT.
*/