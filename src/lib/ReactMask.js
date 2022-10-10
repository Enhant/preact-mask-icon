// @ts-nocheck
import { h, Fragment } from 'preact';
import {
  useState,
  useEffect,
  useRef,
} from "preact/hooks";
import { forwardRef } from 'preact/compat';

import countryData from './data';

import styles from './styles.module.css';

const Caret = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 6L7.5 10.5L12 6" stroke="#858585" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const debounce = (func, wait) => {
  let timeout;
  return function(...args) {
    const context = this;
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      timeout = null;
      func.apply(context, args);
    }, wait);
  };
};
const ReactMask = forwardRef(({
  classnames = {
    container: '',
    select: '',
    selectTitle: '',
    input: '',
    dropdown: '',
    dropdownMenuElement: '',
    dropdownElementImg: '',
    dropdownElementCountryName: '',
    dropdownElementLabel: '',
    selectImg: '',
    containerError: '',
  },
  CaretComponent = Caret,
  name = '',
  dropdownData = countryData,
  errors,
  value = '',
  onChange,
  disabled,
  dataTestIds = {
    container: '',
    select: '',
    selectTitle: '',
    input: '',
    dropdown: '',
    dropdownMenuElement: () => '',
    dropdownElementImg: () => '',
    dropdownElementCountryName: () => '',
    dropdownElementLabel: () => '',
    selectImg: '',
    containerError: '',
    mainInput: '',
  },
  onKeyDown = (e) => (e.key === 'e' || e.key === '-' || e.key === '.' || e.key === '+' || e.key === ',') && e.preventDefault()}, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedData, setSelectedData] = useState(dropdownData[0]);
    const [inputValue, setInputValue] = useState(value.slice(2));

    const dropdownMenuRef = useRef(null);

    const handleClickOutside = (event) => {
      if (dropdownMenuRef && !dropdownMenuRef.current?.contains(event.target)) {
        debounce(() => setIsOpen(false), 300);
      }
    }

    useEffect(() => {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleChangeInput = (e) => {
      if (e.target.validity.valid) {
        const value = e.target.value;
        setInputValue(value);
        onChange(selectedData.code + value);
      }
    }

    const handleSelectDropdown = (index) => () => {
      setSelectedData(dropdownData[index]);
      setIsOpen(false);
      onChange(dropdownData[index].code + inputValue);
    };

    const handleToggleDropdown = debounce(() => setIsOpen(!isOpen), 300);

    return (
      <Fragment>
        <div
          className={`
            ${styles['container']} ${classnames.container}
            ${errors?.length ? (styles['container-error'] || classnames.containerError) : null}`
          }
          data-testid={dataTestIds.container}
        >
          <div
            data-testid={dataTestIds.select}
            className={`${styles['select']} ${classnames.select}`}
            onClick={handleToggleDropdown}
          >
            <CaretComponent />
            <img
              alt={`flag-${selectedData?.countryName}`}
              src={selectedData?.icon}
              className={`${classnames.selectImg} ${styles['dropdownElementImage']}`}
              data-testid={dataTestIds.selectImg}
            />
            <div
              className={`${styles['select__title']} ${classnames.selectTitle}`}
              data-testid={dataTestIds.selectTitle}
            >
              {selectedData?.code}
            </div>
          </div>
          <input
            value={inputValue}
            onInput={handleChangeInput}
            className={`${styles['input']} ${classnames.input}`}
            type="number"
            pattern="[0-9]+"
            data-testid={dataTestIds.input}
            onKeyDown={onKeyDown}
            disabled={disabled}
          />
        </div>
        {isOpen && (
          <div
            className={`${styles['dropdown_menu']} ${classnames.dropdown}`}
            data-testid={dataTestIds.dropdown}
          >
            <div
              ref={dropdownMenuRef}
            >
              {dropdownData.map(({ code, countryName, icon }, index) => (
                <div
                  className={`${styles['dropdown_menu__element']} ${classnames.dropdownMenuElement}`}
                  onClick={handleSelectDropdown(index)}
                  key={countryName}
                  data-testid={dataTestIds.dropdownMenuElement?.(index)}
                >
                  <img
                    alt={`flag-${countryName}`} src={icon}
                    className={`${classnames.dropdownElementImg} ${styles['dropdownElementImage']}`} 
                    data-testid={dataTestIds.dropdownElementImg?.(index)}/>
                  <div
                    className={`${styles['countyName']} ${classnames.dropdownElementCountryName}`}
                    data-testid={dataTestIds.dropdownElementCountryName?.(index)}
                  >
                    {countryName}
                  </div>
                  <div
                    className={`${styles['countyLabel']} ${classnames.dropdownElementLabel}`}
                    data-testid={dataTestIds.dropdownElementLabel?.(index)}
                  >
                    {code}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        <input
          style={{ display: 'none' }}
          name={name}
          value={selectedData?.code + inputValue}
          data-testid={dataTestIds.mainInput}
          readOnly
        />
      </Fragment>
    );
});

export default ReactMask;