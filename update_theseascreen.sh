sed -i 's/interface TheSeaScreenProps {/interface TheSeaScreenProps {\n  onSwitchToBuild: () => void;/g' src/components/TheSeaScreen.tsx
sed -i 's/export const TheSeaScreen: React.FC<TheSeaScreenProps> = ({ openModal, onSelectTargetForAttack }) => {/export const TheSeaScreen: React.FC<TheSeaScreenProps> = ({ openModal, onSelectTargetForAttack, onSwitchToBuild }) => {/g' src/components/TheSeaScreen.tsx
sed -i 's/onSwitchToBuild={() => {}}/onSwitchToBuild={onSwitchToBuild}/g' src/components/TheSeaScreen.tsx
