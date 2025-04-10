import { getCompatibleVersions } from "baseline-browser-mapping";
import { writeFileSync, existsSync, mkdirSync } from 'node:fs'

const nameMapping = {
  chrome: 'c',
  chrome_android: 'ca',
  edge: 'e',
  firefox: 'f',
  firefox_android: 'fa',
  safari: 's',
  safari_ios: 'si',
  opera: 'o',
  opera_android: 'oa',
  samsunginternet_android: 'sa',
  webview_android: 'wa',
  ya_android: 'ya',
  qq_android: 'qa',
  uc_android: 'ua'
}

const flattenObject = (versionsArray) => {
  return versionsArray.map(version =>
    [
      nameMapping[version.browser],
      version.version,
      version.release_date,
      version.engine_version ?? null
    ]
  );
}

const currentWidelyAvailable = {
  c: flattenObject(getCompatibleVersions()),
  wd: flattenObject(getCompatibleVersions({ includeDownstreamBrowsers: true }))
}

writeFileSync(
  './public/data/wa/versions.json',
  JSON.stringify(currentWidelyAvailable)
);

let nextYear = new Date().getFullYear() + 1;

const yearArray = [...Array(nextYear).keys()].slice(2016);

const yearMinimumVersions = {};
yearArray.forEach((year) => {
  yearMinimumVersions[year] = {};
  yearMinimumVersions[year].c = flattenObject(getCompatibleVersions({ targetYear: year }));
  yearMinimumVersions[year].wd = flattenObject(getCompatibleVersions({ targetYear: year, includeDownstreamBrowsers: true }));
});

writeFileSync(
  './public/data/years/versions.json',
  JSON.stringify(yearMinimumVersions)
);

const waOnDates = {};

const startDate = new Date('2019-06-01');
const endDate = new Date();
endDate.setMonth(endDate.getMonth() + 30)

for (let i = startDate; i <= endDate;) {
  let dateString = i.toISOString().slice(0, 10);
  waOnDates[dateString] = {
    c: flattenObject(getCompatibleVersions({ widelyAvailableOnDate: dateString })),
    wd: flattenObject(getCompatibleVersions({ widelyAvailableOnDate: dateString, includeDownstreamBrowsers: true }))
  }
  i.setDate(i.getDate() + 1)
}

Object.entries(waOnDates).forEach(([date, versions]) => {
  writeFileSync(`./public/data/waOnDate/${date}.json`, JSON.stringify(versions));
});