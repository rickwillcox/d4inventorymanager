import tesseract from 'tesseract.js';
import affixes from './affixes';
import fs from 'fs';
import path from 'path';

console.clear();

async function ocrImage(image: any) {
  return (await tesseract.recognize(image)).data.text.toLowerCase();
}

// export function processItemStats(text: string, affixes: any, itemType: string) {
//   let preprocessedText = text
//     .replace(/\n\n/g, '<placeholder>')
//     .replace(/\n/g, ' ')
//     .replace(/<placeholder>/g, '\n');

//   const lines = preprocessedText.split('\n');
//   let results: any = {};
//   console.log(lines);

//   const segments = affixes[itemType];

//   let result: any = {};
//   //
//   for (let segment in segments) {
//     if (segment === 'implicit' || segment === 'aspect') {
//       for (let line of lines) {
//         if (line.includes(segments[segment])) {
//           const words = line.split(' ');
//           for (let word of words) {
//             let value = parseFloat(word.replace(',', '').replace('%', ''));
//             if (!isNaN(value)) {
//               result[segment] = value;
//               break;
//             }
//           }
//         }
//       }
//     } else {
//       for (let segmentClassification in segments[segment]) {
//         for (let affix of segments[segment][segmentClassification]) {
//           let affixFound = false;
//           for (let line of lines) {
//             if (line.toLowerCase().includes(affix.toLowerCase())) {
//               const words = line.split(' ');
//               for (let word of words) {
//                 let value = parseFloat(word.replace(',', '').replace('%', '').replace('+', ''));
//                 if (!isNaN(value)) {
//                   result[affix] = value;
//                   affixFound = true;
//                   break;
//                 }
//               }
//               if (affixFound) {
//                 break;
//               }
//             }
//           }
//         }
//       }
//     }
//   }

//   results[itemType] = result;

//   return results;
// }

// export function processItemStats(text: string, affixes: any, itemType: string) {
//   let preprocessedText = text
//     .replace(/\n\n/g, '<placeholder>')
//     .replace(/\n/g, ' ')
//     .replace(/<placeholder>/g, '\n');

//   const lines = preprocessedText.split('\n');
//   let results: any = {};

//   const segments = affixes[itemType];

//   let result: any = {
//     implicit: '',
//     explicit: {},
//     aspect: '',
//   };

//   for (let segment in segments) {
//     if (segment === 'implicit') {
//       result.implicit = processImplicitLines(lines, segments[segment]);
//     } else if (segment === 'aspect') {
//       result.aspect = processAspectLines(lines, segments[segment]);
//     } else {
//       result.explicit = processExplicitLines(lines, segments[segment]);
//     }
//   }

//   results[itemType] = result;

//   return results;
// }

export function processItemStats(text: string, affixes: any, itemType: string) {
  let preprocessedText = text
    .replace(/\n\n/g, '<placeholder>')
    .replace(/\n/g, ' ')
    .replace(/<placeholder>/g, '\n');

  const lines = preprocessedText.split('\n');
  let results: any = {};

  const segments = affixes[itemType];

  let result: any = {
    implicit: '',
    explicit: {},
    aspect: '',
  };

  result.implicit = processImplicitLines(lines, segments.implicit);
  result.explicit = processExplicitLines(lines, segments.explicit);
  result.aspect = processAspectLines(lines, segments.aspect);

  results[itemType] = result;

  return results;
}

function processImplicitLines(lines: string[], implicitAffixes: any[]): string {
  for (let implicitAffix of implicitAffixes) {
    let regexAffix = implicitAffix.replace('X%', '\\d+\\.?\\d*%?');
    let regex = new RegExp(regexAffix, 'i');
    for (let line of lines) {
      if (regex.test(line)) {
        return implicitAffix;
      }
    }
  }
  return '';
}

function processAspectLines(lines: string[], aspectAffixes: any): string {
  for (let aspectCategory in aspectAffixes) {
    const aspectAffixArray = aspectAffixes[aspectCategory];
    for (let aspectAffix of aspectAffixArray) {
      const regex = /\[[^\]]+\]/g;
      const cleanAffix = aspectAffix.replace(regex, '').replace('  ', ' ').toLowerCase();

      for (let line of lines) {
        const regexNew = /\d/g;
        const cleanedLine = line.replace(regex, '').replace(regexNew, '').replace('  ', ' ').replace('  ', ' ');

        if (cleanedLine.toLowerCase().includes(cleanAffix.toLowerCase())) {
          return aspectAffix;
        }
      }
    }
  }
  return '';
}

function processExplicitLines(lines: string[], segments: any): any {
  let result: any = {};

  for (let segmentClassification in segments) {
    for (let affix of segments[segmentClassification]) {
      for (let line of lines) {
        if (line.toLowerCase().includes(affix.toLowerCase())) {
          const words = line.split(' ');
          for (let word of words) {
            let value = parseFloat(word.replace(',', '').replace('%', '').replace('+', ''));
            if (!isNaN(value)) {
              result[affix] = value;
              break;
            }
          }
        }
      }
    }
  }

  return result;
}

function identifyItemType(text: string): string | null {
  const keys = Object.keys(affixes);
  for (let key of keys) {
    if (text.includes(key)) {
      return key;
    }
  }
  return null; // Return null if no matching key is found
}

async function main() {
  const d4image = fs.readFileSync(path.resolve(__dirname, './images/pants-1.png'));

  const ocrText = await ocrImage(d4image);
  const itemType = identifyItemType(ocrText) as string;
  // console.log(itemType);
  const processedItemStats = processItemStats(ocrText, affixes, itemType);
  console.log(JSON.stringify(processedItemStats, null, 2));
}

main();
