// Original, editable Qubriant vector artwork. All dashboard values are demo data.
import { mkdir, writeFile } from 'node:fs/promises';

const root = new URL('./dist/assets/images/', import.meta.url);
const escape = value => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
const text = (x, y, value, size = 18, color = '#17274b', weight = 500) => `<text x="${x}" y="${y}" font-size="${size}" fill="${color}" font-weight="${weight}">${escape(value)}</text>`;
const rect = (x, y, w, h, fill = '#fff', r = 18, stroke = 'none') => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}" stroke="${stroke}"/>`;
const circle = (x, y, r, color) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${color}"/>`;
const line = (x1, y1, x2, y2, color = '#d5e0ef', width = 2) => `<path d="M${x1} ${y1}L${x2} ${y2}" stroke="${color}" stroke-width="${width}" fill="none"/>`;
const q = (x, y, size = 36, color = '#3467ff') => `<g transform="translate(${x} ${y}) scale(${size / 40})"><circle cx="19" cy="18" r="13" fill="none" stroke="${color}" stroke-width="7"/><path d="m24 24 11 11" stroke="${color}" stroke-width="7" stroke-linecap="round"/></g>`;
const pill = (x, y, label, color = '#3467ff', bg = '#e9efff', w = 120) => rect(x, y, w, 30, bg, 15) + text(x + 14, y + 20, label, 12, color, 700);
const bar = (x, y, w, color = '#dce5f3', h = 9) => rect(x, y, w, h, color, h / 2);
const iconPaths = {
  ai: 'M12 3 15 9 21 12 15 15 12 21 9 15 3 12 9 9Z',
  cloud: 'M6 18h12a4 4 0 0 0 0-8 6 6 0 0 0-12-1 4.5 4.5 0 0 0 0 9ZM12 10v7m-3-3 3 3 3-3',
  mobile: 'M7 2h10v20H7ZM10 18h4',
  code: 'm8 6-6 6 6 6m8-12 6 6-6 6m-3-15-2 18',
  grid: 'M3 3h7v7H3ZM14 3h7v7h-7ZM3 14h7v7H3ZM14 14h7v7h-7Z',
  team: 'M12 8a4 4 0 1 0-8 0 4 4 0 0 0 8 0ZM1 22v-4a7 7 0 0 1 14 0v4M17 4a4 4 0 0 1 0 8m1 3c4 0 5 3 5 7',
  healthcare: 'M12 5C2-4-6 9 12 22 30 9 22-4 12 5ZM5 12h4l2-4 3 8 2-4h4',
  fintech: 'M3 8 12 2 21 8ZM5 10v10m7-10v10m7-10v10M2 22h20',
  ecommerce: 'M4 7h16l1 15H3ZM8 7V5a4 4 0 0 1 8 0v2',
  logistics: 'M2 4h13v13H2ZM15 9h4l3 4v4h-7M8 19a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm12 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z',
  education: 'm1 8 11-6 11 6-11 6ZM5 11v7q7 6 14 0v-7M23 8v10',
  travel: 'M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM3 12h18M12 3q-8 9 0 18 8-9 0-18Z'
};
const icon = (name, x, y, size = 48, color = '#3467ff') => `<g transform="translate(${x} ${y}) scale(${size / 24})" fill="none" stroke="${color}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="${iconPaths[name] || iconPaths.grid}"/></g>`;

function svg(title, content, dark = false) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" role="img" aria-labelledby="title"><title id="title">${escape(title)} — Qubriant original concept illustration</title><defs><linearGradient id="bg" x2="1" y2="1"><stop stop-color="${dark ? '#071326' : '#eaf1ff'}"/><stop offset="1" stop-color="${dark ? '#183c63' : '#dfeaff'}"/></linearGradient><linearGradient id="accent" x2="1" y2="1"><stop stop-color="#3467ff"/><stop offset="1" stop-color="#06bfd0"/></linearGradient><pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0H0V40" fill="none" stroke="${dark ? '#c1d6ff0c' : '#3467ff0a'}"/></pattern><filter id="shadow" x="-20%" y="-20%" width="140%" height="160%"><feDropShadow dx="0" dy="18" stdDeviation="24" flood-color="#143866" flood-opacity=".13"/></filter></defs><g font-family="Arial, Helvetica, sans-serif">${rect(0, 0, 1200, 800, 'url(#bg)', 0)}${rect(0, 0, 1200, 800, 'url(#grid)', 0)}${circle(1120, 70, 260, dark ? '#3467ff14' : '#fff5')}${circle(10, 760, 220, dark ? '#00cfdb0d' : '#b5cfff33')}${content}</g></svg>`;
}

function shell(name, section, items, body, accent = '#3467ff') {
  return svg(name, `${q(50, 32, 38, accent)}${text(100, 60, name, 28, '#17274b', 800)}${pill(955, 37, 'DEMO CONCEPT', accent, '#ffffffbb', 180)}<g filter="url(#shadow)">${rect(50, 105, 1100, 640, '#fff', 24)}</g>${rect(50, 105, 210, 640, '#f7f9fe', 24)}${rect(235, 105, 25, 640, '#f7f9fe', 0)}${text(78, 157, 'WORKSPACE', 11, '#91a0ba', 700)}${items.map((item, i) => `${i === 0 ? rect(68, 182 + i * 53, 174, 41, '#e9efff', 10) : ''}${rect(82, 195 + i * 53, 14, 14, i === 0 ? accent : '#c7d2e5', 4)}${text(108, 207 + i * 53, item, 14, i === 0 ? accent : '#72819c', i === 0 ? 700 : 500)}`).join('')}${q(82, 655, 24, '#9aaac4')}${text(116, 677, 'Qubriant', 14, '#72819c', 700)}${text(294, 152, section, 15, '#78869e')}${rect(852, 127, 214, 35, '#f3f6fc', 18)}${text(871, 150, 'Search workspace', 12, '#99a7bd')}${circle(1104, 145, 17, '#e4ecff')}${text(1095, 150, 'Q', 15, accent, 700)}${line(285, 179, 1120, 179, '#edf1f7')}${body}`);
}

function learn() {
  const cards = ['Product thinking', 'Interface foundations', 'Building for the web'];
  const colors = ['#4266ec', '#8b5fe6', '#10a8ac'];
  let b = text(294, 226, 'Make room for your next skill.', 29, '#17274b', 800) + text(294, 256, 'A focused learning space. One step forward, every day.', 15, '#7d8ca5');
  b += pill(965, 204, 'MY LEARNING', '#3467ff', '#e9efff', 151);
  cards.forEach((name, i) => {
    const x = 294 + i * 278;
    b += rect(x, 286, 258, 252, '#fff', 16, '#e4eaf4') + rect(x + 12, 298, 234, 125, ['#edf1ff', '#f3edff', '#e5f8f8'][i], 12);
    b += icon(['education', 'grid', 'code'][i], x + 101, 330, 58, colors[i]) + text(x + 18, 454, name, 17, '#253759', 700) + text(x + 18, 480, `${[8, 6, 10][i]} lessons · Self-paced`, 12, '#8290a6');
    b += bar(x + 18, 505, 222, '#edf1f7', 6) + bar(x + 18, 505, [159, 92, 45][i], colors[i], 6);
  });
  b += rect(294, 562, 536, 145, '#f6f9ff', 16) + text(318, 596, 'Your next session', 18, '#253759', 700) + text(318, 629, 'Designing a clearer user journey', 16) + text(318, 656, 'Workshop · 45 min · Example schedule', 12, '#8290a6') + pill(650, 616, 'CONTINUE', '#fff', '#3467ff', 143);
  b += rect(850, 562, 280, 145, '#10294a', 16) + text(876, 597, 'Small steps. Real progress.', 15, '#c1d5f5') + text(876, 651, '72%', 45, '#fff', 800) + text(982, 649, 'course progress', 12, '#90a8cc');
  return shell('Qubriant Learn', 'Learning / Overview', ['My learning', 'Explore courses', 'Assignments', 'Live sessions', 'Progress', 'Settings'], b);
}

function flow() {
  let b = text(294, 226, 'Bring the whole workflow together.', 28, '#17274b', 800) + text(294, 256, 'Plan, review and deliver with a shared view of the work.', 15, '#7d8ca5') + pill(968, 270, '+ NEW TASK', '#fff', '#7454d7', 150);
  const groups = [ ['PLANNED', '#3467ff', ['Map the customer journey', 'Outline the first release', 'Review integration needs']], ['IN PROGRESS', '#9761dd', ['Design the team workspace', 'Connect the approval flow']], ['READY TO REVIEW', '#12a6a4', ['Prototype key screens', 'Document the handover']] ];
  groups.forEach(([label, color, tasks], i) => {
    const x = 294 + i * 278;
    b += rect(x, 325, 258, 378, '#f5f7fc', 16) + circle(x + 22, 352, 5, color) + text(x + 36, 357, label, 12, '#536680', 700) + pill(x + 205, 337, tasks.length, color, '#fff', 35);
    tasks.forEach((task, j) => {
      const y = 380 + j * 101;
      b += rect(x + 12, y, 234, 89, '#fff', 10, '#e7edf5') + bar(x + 26, y + 14, 37, color, 4) + text(x + 26, y + 39, task, 12, '#334560', 700) + text(x + 26, y + 67, `QF-${104 + i * 3 + j}`, 11, '#99a5b8') + circle(x + 215, y + 62, 12, '#edf0fb') + text(x + 211, y + 66, 'Q', 10, color, 700);
    });
  });
  return shell('Qubriant Flow', 'Projects / Product launch', ['Project board', 'Inbox', 'Automations', 'Team', 'Reports', 'Settings'], b, '#7454d7');
}

function store() {
  let b = text(294, 226, 'A good day to grow your store.', 29, '#17274b', 800) + text(294, 256, 'Products, orders and stock. Connected in one place.', 15, '#7d8ca5');
  ['Orders today|24', 'Products active|128', 'Ready to ship|18'].forEach((v, i) => {
    const [label, value] = v.split('|'), x = 294 + i * 278;
    b += rect(x, 285, 258, 105, ['#eaf1ff', '#e8f6f3', '#fff4e6'][i], 15) + text(x + 20, 314, label, 13, '#6f819a') + text(x + 20, 365, value, 36, '#213657', 800) + icon('ecommerce', x + 193, 321, 40, ['#3467ff', '#0aa397', '#c69639'][i]);
  });
  b += text(294, 431, 'Featured collection', 19, '#253759', 700) + text(974, 431, 'SAMPLE CATALOGUE', 10, '#8594ab');
  ['Studio Lamp', 'Everyday Tote', 'Travel Mug'].forEach((name, i) => {
    const x = 294 + i * 278;
    b += rect(x, 451, 258, 250, '#fff', 16, '#e4eaf4') + rect(x + 12, 463, 234, 165, ['#e8eef8', '#f2ede5', '#e9f1ed'][i], 11);
    if (i === 0) b += `<path d="M${x + 98} 505h62l23 53h-108Z" fill="#7188ad"/>` + rect(x + 125, 558, 9, 42, '#294365', 3) + rect(x + 96, 599, 67, 7, '#294365', 4);
    if (i === 1) b += rect(x + 82, 515, 95, 93, '#c5a984', 8) + `<path d="M${x + 105} 523v-15a24 24 0 0 1 48 0v15" fill="none" stroke="#9b7d57" stroke-width="7"/>`;
    if (i === 2) b += rect(x + 94, 499, 74, 107, '#6e9b91', 14) + rect(x + 88, 494, 86, 15, '#284e46', 5) + rect(x + 104, 540, 54, 31, '#ddeae5', 6) + q(x + 121, 546, 20, '#6e9b91');
    b += text(x + 18, 658, name, 17, '#253759', 700) + text(x + 18, 682, 'In stock · Demo product', 12, '#7c8da5');
  });
  return shell('Qubriant Store', 'Commerce / Store overview', ['Overview', 'Products', 'Orders', 'Customers', 'Inventory', 'Settings'], b, '#0a9b8d');
}

function dispatch() {
  let b = text(294, 226, 'Every stop. One connected view.', 29, '#17274b', 800) + text(294, 256, 'A dispatch workspace for teams on the move.', 15, '#7d8ca5');
  b += rect(294, 286, 550, 420, '#ecf3f7', 18);
  for (let i = 0; i < 7; i++) b += `<path d="M${310 + i * 85} 290  ${330 + i * 65} 440 ${305 + i * 85} 705" stroke="#fff" stroke-width="15" fill="none"/>`;
  for (let i = 0; i < 5; i++) b += `<path d="M296 ${318 + i * 82} Q530 ${370 + i * 72} 843 ${308 + i * 82}" stroke="#fff" stroke-width="12" fill="none"/>`;
  b += `<path d="M500 286Q440 410 570 486T630 706" stroke="#b3dceb" stroke-width="40" fill="none"/><path d="M363 603 423 535 526 564 616 438 755 370" fill="none" stroke="#3467ff" stroke-width="6" stroke-linecap="round" stroke-dasharray="9 7"/>`;
  [[363, 603], [423, 535], [526, 564], [616, 438], [755, 370]].forEach(([x, y], i) => { b += circle(x, y, 18, '#fff') + circle(x, y, 12, i === 4 ? '#0caaa1' : '#3467ff') + text(x - 4, y + 4, i + 1, 11, '#fff', 800); });
  b += pill(315, 307, 'ILLUSTRATIVE ROUTE', '#526989', '#fff', 176) + rect(864, 286, 266, 420, '#fff', 16, '#e2eaf4') + text(885, 320, 'Dispatch board', 18, '#253759', 700);
  ['Morning route', 'City deliveries', 'Warehouse pickup', 'Afternoon route'].forEach((name, i) => {
    const y = 345 + i * 83;
    b += circle(899, y + 17, 14, '#eaf0ff') + icon('logistics', 889, y + 7, 20) + text(925, y + 15, name, 13, '#334560', 700) + text(925, y + 39, ['6 stops · On route', '4 stops · Scheduled', '2 stops · Ready', '8 stops · Scheduled'][i], 11, '#7e90a8') + line(885, y + 63, 1107, y + 63, '#edf1f7');
  });
  return shell('Qubriant Dispatch', 'Operations / Live planning', ['Dispatch board', 'Routes', 'Deliveries', 'Fleet', 'Analytics', 'Settings'], b, '#2379ce');
}

function technology(title, subtitle, kind = 'ai', dark = false) {
  const ink = dark ? '#e4eeff' : '#1d355a', muted = dark ? '#839dbc' : '#8293ae', panel = dark ? '#142c49' : '#fff', lineColor = dark ? '#294664' : '#e4ecf6';
  let content = q(65, 48, 43, dark ? '#79bdff' : '#3467ff') + text(122, 80, 'Qubriant', 32, ink, 800) + text(65, 155, title, 38, ink, 800) + text(66, 193, subtitle, 18, muted);
  content += `<g filter="url(#shadow)">${rect(155, 260, 890, 450, panel, 28)}</g>` + text(190, 302, 'QUBRIANT / DIGITAL POSSIBILITIES', 12, muted, 700) + line(188, 324, 1012, 324, lineColor);
  content += circle(600, 490, 121, dark ? '#1c4064' : '#edf3ff') + circle(600, 490, 89, dark ? '#173453' : '#e0ebff') + icon(kind, 551, 441, 98, dark ? '#85c4ff' : '#3467ff');
  const labels = kind === 'mobile' ? ['Explore', 'Design', 'Build', 'Release'] : kind === 'team' ? ['Product', 'Design', 'Engineering', 'Delivery'] : kind === 'cloud' ? ['Connect', 'Migrate', 'Deploy', 'Monitor'] : ['Discover', 'Connect', 'Build', 'Improve'];
  [[205, 369], [800, 369], [205, 545], [800, 545]].forEach(([x, y], i) => {
    content += line(x < 600 ? x + 190 : x, y + 53, x < 600 ? 490 : 710, 490, lineColor, 3) + rect(x, y, 190, 109, dark ? '#1a3655' : '#f5f8ff', 16, lineColor) + icon(['grid', 'cloud', 'code', 'ai'][i], x + 18, y + 16, 28, dark ? '#83c8ff' : '#5a7ee7') + text(x + 18, y + 80, labels[i], 19, ink, 700);
  });
  content += text(190, 675, 'Clear ideas. Connected experiences. Thoughtful engineering.', 15, muted);
  return svg(title, content, dark);
}

function atmosphere(title, subtitle, dark = true) {
  const c = `<g opacity=".28"><ellipse cx="600" cy="430" rx="470" ry="210" fill="none" stroke="#6ca8ff" stroke-width="2" transform="rotate(-22 600 430)"/><ellipse cx="600" cy="430" rx="400" ry="270" fill="none" stroke="#58d9e5" stroke-width="2" transform="rotate(30 600 430)"/><ellipse cx="600" cy="430" rx="310" ry="310" fill="none" stroke="#6ca8ff" stroke-width="2"/></g>${circle(600, 357, 102, dark ? '#163b61' : '#d9e6ff')}${q(540, 295, 120, dark ? '#8ad2ff' : '#3467ff')}${text(600, 529, 'Qubriant', 66, dark ? '#fff' : '#17365e', 800).replace('<text ', '<text text-anchor="middle" ')}${text(600, 585, title, 26, dark ? '#bbd6f5' : '#526f94', 700).replace('<text ', '<text text-anchor="middle" ')}${text(600, 625, subtitle, 17, dark ? '#7098c3' : '#7c95b3').replace('<text ', '<text text-anchor="middle" ')}`;
  return svg(title, c, dark);
}

const assets = new Map([
  ['project/qubriant-learn.svg', learn()], ['project/qubriant-flow.svg', flow()],
  ['project/qubriant-store.svg', store()], ['project/qubriant-dispatch.svg', dispatch()],
  ['qubriant-planning.svg', technology('Start with the right questions.', 'From discovery to a shared product direction.', 'team')],
  ['qubriant-engineering.svg', technology('Engineering with intention.', 'Clear architecture. Maintainable software.', 'code', true)],
  ['qubriant-mobile.svg', technology('Small screens. Clear priorities.', 'Useful experiences, wherever life happens.', 'mobile')],
  ['qubriant-workflow.svg', technology('Make everyday work flow.', 'Connect your tools, your people and your next idea.', 'ai', true)],
  ['qubriant-cta.svg', atmosphere('Your next idea starts here.', 'Let’s build something meaningful.')],
  ['qubriant-footer.svg', atmosphere('Thoughtful technology.', 'Made for the way you work.')]
]);
for (const [name, content] of assets) {
  const file = new URL(name, root);
  await mkdir(new URL('./', file), { recursive: true });
  await writeFile(file, content);
}
console.log(`Generated ${assets.size} original Qubriant illustrations.`);
