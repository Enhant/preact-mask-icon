# prmi

# Usage
```jsx
import { h, Fragment } from 'preact';
import { ReactMask } from 'preact-mask-icon';

function PreactPhoneMask(props) {
  return (
    <ReactMask
      value={phone || ''}
      onChange={setPhone}
      disabled={disabledPhone}
      classnames={{
        container: styles.reactMaskContainer,
        select: styles.select,
        selectTitle: styles.selectTitle,
        selectImg: styles.dropdownElementImage,
        input: styles.input,
        dropdown: styles['dropdownMenu'],
        dropdownMenuElement: styles['dropdownMenuElement'],
        dropdownElementImg: styles['dropdownElementImage'],
        dropdownElementCountryName: styles['countyName'],
        dropdownElementLabel: styles['countyLabel'],
      }}
      dataTestIds={{
        mainInput: LOCATORS.PASSWORD_INPUT,
        container: LOCATORS.MASK_CONTAINER,
        select: LOCATORS.MASK_SELECT,
        selectTitle: LOCATORS.MASK_SELECT_TITLE,
        input: LOCATORS.MASK_INPUT,
        dropdown: LOCATORS.MASK_DROPDOWN,
        dropdownMenuElement: LOCATORS.dropdownMenuElement,
        dropdownElementImg: LOCATORS.dropdownElementImg,
        dropdownElementCountryName: LOCATORS.dropdownElementCountryName,
        dropdownElementLabel: LOCATORS.dropdownElementLabel,
        selectImg: LOCATORS.MASK_SELECT_IMG,
        containerError: LOCATORS.MASK_CONTAINER_ERROR,
      }}
    />
  )
}
```