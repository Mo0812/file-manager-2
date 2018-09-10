import React from 'react';
import ReactDOM from 'react-dom';
import {IntlProvider, addLocaleData} from 'react-intl';
import locale_en from 'react-intl/locale-data/en';
import locale_de from 'react-intl/locale-data/de';
import messages_en from "./translations/en.json";
import messages_de from "./translations/de.json";

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

addLocaleData([...locale_en, ...locale_de]);

const localeMessages = {
    'en': messages_en,
    'de': messages_de
};
const language = navigator.language.split(/[-_]/)[0];

ReactDOM.render(<IntlProvider locale={language} messages={localeMessages[language]}><App /></IntlProvider>, document.getElementById('root'));
registerServiceWorker();
