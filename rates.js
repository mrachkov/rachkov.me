// Историческая таблица ключевой ставки ЦБ РФ (дата начала действия -> ставка % годовых)
const CBR_KEY_RATES = [
  { date: "2016-01-01", rate: 11.00 },
  { date: "2016-06-14", rate: 10.50 },
  { date: "2016-09-19", rate: 10.00 },
  { date: "2017-03-27", rate: 9.75 },
  { date: "2017-05-02", rate: 9.25 },
  { date: "2017-06-19", rate: 9.00 },
  { date: "2017-09-18", rate: 8.50 },
  { date: "2017-10-30", rate: 8.25 },
  { date: "2017-12-18", rate: 7.75 },
  { date: "2018-02-12", rate: 7.50 },
  { date: "2018-03-26", rate: 7.25 },
  { date: "2018-09-17", rate: 7.50 },
  { date: "2018-12-17", rate: 7.75 },
  { date: "2019-06-17", rate: 7.50 },
  { date: "2019-07-29", rate: 7.25 },
  { date: "2019-09-09", rate: 7.00 },
  { date: "2019-10-28", rate: 6.50 },
  { date: "2019-12-16", rate: 6.25 },
  { date: "2020-02-10", rate: 6.00 },
  { date: "2020-04-27", rate: 5.50 },
  { date: "2020-06-22", rate: 4.50 },
  { date: "2020-07-27", rate: 4.25 },
  { date: "2021-03-22", rate: 4.50 },
  { date: "2021-04-26", rate: 5.00 },
  { date: "2021-06-15", rate: 5.50 },
  { date: "2021-07-26", rate: 6.50 },
  { date: "2021-09-13", rate: 6.75 },
  { date: "2021-10-25", rate: 7.50 },
  { date: "2021-12-20", rate: 8.50 },
  { date: "2022-02-14", rate: 9.50 },
  { date: "2022-02-28", rate: 20.00 },
  { date: "2022-04-11", rate: 17.00 },
  { date: "2022-05-04", rate: 14.00 },
  { date: "2022-05-27", rate: 11.00 },
  { date: "2022-06-14", rate: 9.50 },
  { date: "2022-07-25", rate: 8.00 },
  { date: "2022-09-19", rate: 7.50 },
  { date: "2023-07-24", rate: 8.50 },
  { date: "2023-08-15", rate: 12.00 },
  { date: "2023-09-18", rate: 13.00 },
  { date: "2023-10-30", rate: 15.00 },
  { date: "2023-12-18", rate: 16.00 },
  { date: "2024-07-29", rate: 18.00 },
  { date: "2024-09-16", rate: 19.00 },
  { date: "2024-10-28", rate: 21.00 },
  { date: "2025-06-09", rate: 20.00 },
  { date: "2025-07-28", rate: 18.00 },
  { date: "2025-09-15", rate: 17.00 },
  { date: "2025-10-27", rate: 16.50 },
  { date: "2025-12-22", rate: 16.00 },
  { date: "2026-02-16", rate: 15.50 },
  { date: "2026-03-23", rate: 15.00 },
  { date: "2026-04-27", rate: 14.50 },
  { date: "2026-06-08", rate: 14.25 },
  { date: "2026-07-27", rate: 14.00 }
];

// Утилиты работы с датами (строго в UTC, чтобы исключить сдвиги часовых поясов)
function parseUTC(dateStr) {
  const [y, m, d] = dateStr.split("-").map(Number);
  return Date.UTC(y, m - 1, d);
}

function formatUTC(ms) {
  const d = new Date(ms);
  const yyyy = d.getUTCFullYear();
  const mm = String(d.getUTCMonth() + 1).padStart(2, "0");
  const dd = String(d.getUTCDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function formatRU(dateStr) {
  const [y, m, d] = dateStr.split("-");
  return `${d}.${m}.${y}`;
}

function addDays(dateStr, days) {
  return formatUTC(parseUTC(dateStr) + days * 86400000);
}

function diffDaysInclusive(startStr, endStr) {
  return Math.round((parseUTC(endStr) - parseUTC(startStr)) / 86400000) + 1;
}

function isLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

function daysInYear(year) {
  return isLeapYear(year) ? 366 : 365;
}

function getKeyRateOnDate(dateStr) {
  let current = CBR_KEY_RATES[0].rate;
  for (const item of CBR_KEY_RATES) {
    if (item.date <= dateStr) {
      current = item.rate;
    } else {
      break;
    }
  }
  return current;
}

function formatMoney(num) {
  return new Intl.NumberFormat("ru-RU", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(num);
}

function todayISO() {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}
