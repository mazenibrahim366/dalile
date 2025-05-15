
const express = require('express');
const cors = require('cors');
const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

const excelFile = path.join(__dirname, 'messages.xlsx');

app.post('/api/messages', (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'جميع الحقول مطلوبة' });
  }

  let workbook;
  let worksheet;

  if (fs.existsSync(excelFile)) {
    workbook = XLSX.readFile(excelFile);
    worksheet = workbook.Sheets[workbook.SheetNames[0]];
  } else {
    workbook = XLSX.utils.book_new();
    worksheet = XLSX.utils.aoa_to_sheet([['Name', 'Email', 'Subject', 'Message']]);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Messages');
  }

  const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
  data.push([name, email, subject, message]);

  const newSheet = XLSX.utils.aoa_to_sheet(data);
  workbook.Sheets[workbook.SheetNames[0]] = newSheet;
  XLSX.writeFile(workbook, excelFile);

  res.json({ message: '✅ تم ارسال رد' });
});

app.listen(PORT, () => {
  console.log(`📡 API running on http://localhost:${PORT}`);
});
