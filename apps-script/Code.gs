// Google Apps Script web app - deploy as Web App (Execute as: Me, Access: Anyone)
const API_SECRET = 'REPLACE_WITH_SAME_SECRET_AS_SERVER';

const CODES = (function(){
  // Pre-generated 100 codes - you can edit these if you want fixed codes.
  const arr = [];
  for (let i = 0; i < 100; i++) {
    arr.push(String(100000 + Math.floor(Math.random() * 900000)));
  }
  return arr;
})();

function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.getDataAsString());
    if (!payload || payload.secret !== API_SECRET) {
      return ContentService.createTextOutput(JSON.stringify({ ok:false, error: 'Unauthorized' })).setMimeType(ContentService.MimeType.JSON);
    }
    const email = payload.email;
    const code = payload.code;
    if (CODES.indexOf(String(code)) === -1) {
      return ContentService.createTextOutput(JSON.stringify({ ok:false, error: 'Invalid code' })).setMimeType(ContentService.MimeType.JSON);
    }
    const subject = 'Your login code';
    const body = 'Your login code is: ' + code + '\n\nDo not share this code with anyone.';
    MailApp.sendEmail(email, subject, body);
    return ContentService.createTextOutput(JSON.stringify({ ok:true })).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ ok:false, error: String(err) })).setMimeType(ContentService.MimeType.JSON);
  }
}
