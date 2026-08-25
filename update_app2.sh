sed -i "s/import { TheSeaScreen } from '.\/components\/TheSeaScreen';/import { TheSeaScreen } from '.\/components\/TheSeaScreen';/g" src/App.tsx
sed -i "s/<TheSeaScreen openModal={openModal} \/>/<TheSeaScreen openModal={openModal as any} onSwitchToBuild={() => setActiveTab('build')} \/>/g" src/App.tsx
