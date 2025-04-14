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

const coreBrowserShortNames = ['c', 'ca', 'e', 'f', 'fa', 's', 'si']

const flattenObject = (versionsArray) => {
  const versionsToReturn = versionsArray.map(version =>
    [
      nameMapping[version.browser],
      version.version,
      version.release_date,
      version.engine_version ?? null
    ]
  );
  return versionsToReturn.length === 7
    ? versionsToReturn
    : versionsToReturn.slice(7)
}

// write widely available
writeFileSync(
  './src/data/wa/versions.json',
  JSON.stringify({
    c: flattenObject(getCompatibleVersions()),
    d: flattenObject(getCompatibleVersions({ includeDownstreamBrowsers: true }))
  })
);

// write year files
let nextYear = new Date().getFullYear() + 1;
const yearArray = [...Array(nextYear).keys()].slice(2016);
yearArray.forEach((year) => {
  writeFileSync(
    `./src/data/years/${year}.json`,
    JSON.stringify({
      c: flattenObject(getCompatibleVersions({ targetYear: year })),
      d: flattenObject(getCompatibleVersions({ targetYear: year, includeDownstreamBrowsers: true }))
    })
  );
});

// write waOnDate files
const startDate = new Date('2019-06-01');
const endDate = new Date();
endDate.setMonth(endDate.getMonth() + 30)

for (let i = startDate; i <= endDate;) {
  let dateString = i.toISOString().slice(0, 10);
  writeFileSync(`./src/data/waOnDate/${dateString}.json`, JSON.stringify({
    c: flattenObject(getCompatibleVersions({ widelyAvailableOnDate: dateString })),
    d: flattenObject(getCompatibleVersions({ widelyAvailableOnDate: dateString, includeDownstreamBrowsers: true }))
  }));
  i.setDate(i.getDate() + 1)
}