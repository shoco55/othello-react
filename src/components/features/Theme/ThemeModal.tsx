import { useState, useEffect, VFC, ChangeEvent } from 'react';
import { css } from '@emotion/react';

import { Modal } from 'components/cummon/Modal/Modal';
import { ModalHeader } from 'components/cummon/Modal/ModalHeader';
import { ModalContent } from 'components/cummon/Modal/ModalContent';
import { ModalFooter } from 'components/cummon/Modal/ModalFooter';
import { Button } from 'components/cummon/Button/Button';
import { ThemeSample } from 'components/features/Theme/ThemeSample';

import { Theme } from 'types/theme';

import { THEME_COLORS } from 'constants';

interface Props {
  isThemeModalOpen: boolean;
  closeThemeModal: () => void;
  selectedTheme: Theme;
  updateSessionTheme: (theme: Theme) => void;
  updateTheme: (theme: Theme) => void;
}

export const ThemeModal: VFC<Props> = (props) => {
  const { isThemeModalOpen, closeThemeModal, selectedTheme, updateSessionTheme, updateTheme } = props;

  const [selectedThemeRadio, setSelectedThemeRadio] = useState<Theme | undefined>(undefined);

  useEffect(() => {
    setSelectedThemeRadio(selectedTheme ?? undefined);
  }, [selectedTheme, isThemeModalOpen]);

  const onChangeTheme = (e: ChangeEvent<HTMLInputElement>) => {
    const id = Number(e.target.value);
    const checkedTheme = THEME_COLORS.find((themeColor) => themeColor.id === id);
    setSelectedThemeRadio(checkedTheme);
  };

  const onClickUpdate = () => {
    if (selectedThemeRadio === undefined) return;
    updateSessionTheme(selectedThemeRadio);
    updateTheme(selectedThemeRadio);
    closeThemeModal();
  };

  return (
    <Modal
      isOpen={isThemeModalOpen}
      aria-labelledby="modalTitle"
      aria-describedby="modalDisc"
      onClose={closeThemeModal}
      width="90%">
      <>
        <ModalHeader htmlId="modalTitle" title="テーマを変更する" />

        <ModalContent htmlId="modalDisc">
          <div css={themes}>
            {THEME_COLORS.map((theme) => {
              return (
                <ThemeSample
                  key={theme.id}
                  theme={theme}
                  selectedThemeRadio={selectedThemeRadio}
                  onChangeTheme={onChangeTheme}
                />
              );
            })}
          </div>
        </ModalContent>

        <ModalFooter>
          <Button type="normal" onClick={closeThemeModal}>
            キャンセル
          </Button>
          <Button type="primary" onClick={onClickUpdate}>
            変更する
          </Button>
        </ModalFooter>
      </>
    </Modal>
  );
};

const themes = css`
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
`;
