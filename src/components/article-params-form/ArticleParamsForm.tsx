import { RadioGroup } from 'src/ui/radio-group';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';
import { useState, useRef } from 'react';
import { 
	ArticleStateType, 
	fontColors, 
	fontFamilyOptions, 
	fontSizeOptions, 
	OptionType, 
	backgroundColors, 
	contentWidthArr, 
	defaultArticleState,
} from 'src/constants/articleProps';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';
import clsx from 'clsx';
import { Separator } from 'src/ui/separator';
import { Select } from 'src/ui/select';
import { Text } from 'src/ui/text';

type ArticleParamsFormProps = {
	setCurrentArticleState: (param: ArticleStateType) => void;
	currentArticleState: ArticleStateType;
};

export const ArticleParamsForm = ({
	currentArticleState,
	setCurrentArticleState,
}: ArticleParamsFormProps) => {
	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
	const rootRef = useRef<HTMLDivElement>(null);
	const [selectArticleState, setSelectArticleState] =
		useState<ArticleStateType>(currentArticleState);

	const handleChange = (key: keyof ArticleStateType, value: OptionType) => {
		setSelectArticleState({...selectArticleState, [key]: value});
	};

	useOutsideClickClose({
		isMenuOpen,
		rootRef,
		onClose: () => setIsMenuOpen(false),
		onChange: setIsMenuOpen,
		event: 'mousedown',
	})


	return (
		<div ref={rootRef}>
			<ArrowButton isOpen={isMenuOpen} onClick={setIsMenuOpen} />
			<aside className={clsx(styles.container, isMenuOpen && styles.container_open)}>
				<form 
					className={styles.form} 
					onSubmit={(evt) => { evt.preventDefault(); setCurrentArticleState(selectArticleState);}}
					onReset={(evt) => {
						evt.preventDefault();
						setSelectArticleState(defaultArticleState);
						setCurrentArticleState(defaultArticleState);
					}}
				>
					<Text as="h2" size={22} weight={800} uppercase>
						Задайте параметры
					</Text>

					<Select
  						title="Шрифт"
  						options={fontFamilyOptions}
  						selected={selectArticleState.fontFamilyOption}
  						onChange={(option: OptionType)  => handleChange('fontFamilyOption', option)}
					/>

					<Select
  						title="Цвет шрифта"
  						options={fontColors}
  						selected={selectArticleState.fontColor}
  						onChange={(option: OptionType) => handleChange('fontColor', option)}
					/>					

					<RadioGroup
            			name="fontSize"
            			selected={selectArticleState.fontSizeOption}
            			onChange={(option) => handleChange('fontSizeOption', option)}
            			options={fontSizeOptions}
            			title="Размер шрифта"
          			/>

					<Separator />

					<Select
  						title="Цвет фона"
  						options={backgroundColors}
  						selected={selectArticleState.backgroundColor}
  						onChange={(option: OptionType) => handleChange('backgroundColor', option)}
					/>

					<Select
  						title="Ширина контента"
  						options={contentWidthArr}
  						selected={selectArticleState.contentWidth}
  						onChange={(option: OptionType) => handleChange('contentWidth', option)}
					/>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</div>
	);
};