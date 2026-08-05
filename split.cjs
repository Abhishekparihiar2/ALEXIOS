const fs = require('fs');
const path = require('path');

const fileContent = fs.readFileSync('src/app/App.tsx', 'utf-8');
const lines = fileContent.split('\n');

const sections = [];
let currentSectionName = 'imports';
let currentSectionLines = [];

for (const line of lines) {
    if (line.startsWith('// ─── ')) {
        sections.push({ name: currentSectionName, lines: currentSectionLines });
        currentSectionName = line.replace('// ─── ', '').replace(/ ─+$/, '').trim();
        currentSectionLines = [line];
    } else {
        currentSectionLines.push(line);
    }
}
sections.push({ name: currentSectionName, lines: currentSectionLines });

const imports = sections.find(s => s.name === 'imports').lines.join('\n');

const mapping = {
    'Types': 'src/types/index.ts',
    'Mock Data': 'src/data/mockData.ts',
    'Detailed Mock Data for Dashboard Drawers': 'src/data/mockData.ts',
    'Scheduling Mock Data': 'src/data/mockData.ts',
    'Nav Config': 'src/data/navConfig.ts',
    'Status Badge': 'src/components/StatusBadge.tsx',
    'Activity Icon': 'src/components/ActivityIcon.tsx',
    'Login Page': 'src/pages/LoginPage.tsx',
    'Sidebar': 'src/components/Sidebar.tsx',
    'Top Header': 'src/components/TopHeader.tsx',
    'Dashboard': 'src/pages/Dashboard/index.tsx',
    'Placeholder Page': 'src/components/PlaceholderPage.tsx',
    'Clients & Sites': 'src/pages/Clients/index.tsx',
    'Checkpoints & Tour Routes Page': 'src/pages/Checkpoints/index.tsx',
    'Employees Page': 'src/pages/Employees/index.tsx',
    'Employee Profile Page': 'src/pages/Employees/Profile.tsx',
    'App Shell': 'src/AppShell.tsx',
    'Root App': 'src/app/App.tsx'
};

const dirs = ['src/types', 'src/data', 'src/components', 'src/pages/Dashboard', 'src/pages/Clients', 'src/pages/Checkpoints', 'src/pages/Employees', 'src/pages/Scheduling'];
dirs.forEach(d => fs.mkdirSync(d, { recursive: true }));

const declarations = {};

sections.forEach(section => {
    if (section.name === 'imports') return;
    const dest = mapping[section.name];
    if (!dest) return;
    
    section.lines.forEach(line => {
        const match = line.match(/^(?:export default )?(?:export )?(function|const|let|var|type|interface) ([A-Za-z0-9_]+)/);
        if (match) {
            declarations[match[2]] = dest;
        }
    });
});

const getImportsForFile = (destFile) => {
    const groups = {};
    for (const [decl, file] of Object.entries(declarations)) {
        if (file !== destFile) {
            if (!groups[file]) groups[file] = [];
            groups[file].push(decl);
        }
    }
    
    let importLines = '';
    for (const [file, decls] of Object.entries(groups)) {
        const destDir = path.dirname(destFile);
        let rel = path.relative(destDir, file).replace(/\\/g, '/').replace(/\.tsx?$/, '');
        if (!rel.startsWith('.')) rel = './' + rel;
        importLines += `import { ${decls.join(', ')} } from '${rel}';\n`;
    }
    return importLines;
}

const fileContents = {};

sections.forEach(section => {
    if (section.name === 'imports') return;
    const dest = mapping[section.name];
    if (!dest) return;
    
    const newLines = section.lines.map(line => {
        if (/^(function|const|let|var|type|interface) ([A-Za-z0-9_]+)/.test(line)) {
            return 'export ' + line;
        }
        return line;
    });

    if (!fileContents[dest]) fileContents[dest] = [];
    fileContents[dest].push(newLines.join('\n'));
});

for (const [file, content] of Object.entries(fileContents)) {
    let finalContent = imports + '\n\n' + getImportsForFile(file) + '\n\n' + content.join('\n\n');
    if (file === 'src/app/App.tsx') {
        finalContent = finalContent.replace('export export default function App', 'export default function App');
    }
    fs.writeFileSync(file, finalContent, 'utf-8');
}

console.log('Split complete!');
