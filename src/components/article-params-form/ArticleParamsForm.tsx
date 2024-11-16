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

type ArticleParamsFormProps = {
	setCurrentArticleState: (param: ArticleStateType) => void;
	currentArticleState: ArticleStateType;
};

export const ArticleParamsForm = ({
	currentArticleState,
	setCurrentArticleState,
}: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const rootRef = useRef<HTMLDivElement>(null);
	const [selectArticleState, setSelectArticleState] =
		useState<ArticleStateType>(currentArticleState);

	const handleChange = (key: keyof ArticleStateType, value: OptionType) => {
		setSelectArticleState({...selectArticleState, [key]: value});
	};

	useOutsideClickClose({
		isOpen,
		rootRef,
		onClose: () => setIsOpen(false),
		onChange: setIsOpen,
		event: 'mousedown',
	})


	return (
		<div ref={rootRef}>
			<ArrowButton isOpen={isOpen} onClick={setIsOpen} />
			<aside className={clsx(styles.container, isOpen && styles.container_open)}>
				<form 
					className={styles.form} 
					onSubmit={(evt) => { evt.preventDefault(); setCurrentArticleState(selectArticleState);}}
					onReset={(evt) => {
						evt.preventDefault();
						setSelectArticleState(defaultArticleState);
						setCurrentArticleState(defaultArticleState);
					}}
					style={{ gap: '50px' }}
				>

					<Select
  						title="Шрифт"
  						options={fontFamilyOptions}
  						selected={selectArticleState.fontFamilyOption}
  						onChange={(option: OptionType)  => handleChange('fontFamilyOption', option)}
					/>

					<label style={{ fontSize: '12px', fontWeight: '800', textTransform: 'uppercase', color: '#000000' }}>
						цвет шрифта
					</label>

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