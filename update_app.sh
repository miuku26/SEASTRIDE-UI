sed -i "s/import { GameScreen } from '.\/components\/GameScreen';/import { ShipBuildScreen } from '.\/components\/ShipBuildScreen';\nimport { TheSeaScreen } from '.\/components\/TheSeaScreen';/g" src/App.tsx
sed -i "s/activeTab as 'home' | 'game'/activeTab as 'home' | 'build' | 'sea' | 'leaderboard'/g" src/App.tsx
sed -i "s/tab: 'home' | 'game'/tab: 'home' | 'build' | 'sea' | 'leaderboard'/g" src/App.tsx
sed -i "s/{activeTab === 'game' && <GameScreen openModal={openModal} \/>}/{activeTab === 'build' && <ShipBuildScreen openModal={openModal} \/>}\n              {activeTab === 'sea' && <TheSeaScreen openModal={openModal} \/>}/g" src/App.tsx
