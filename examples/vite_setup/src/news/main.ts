import '../style.css'
import { News } from './news'
import { el } from '@lmoulanier/el/alien-deepsignals';

const root = document.querySelector<HTMLDivElement>('#app')!

root.appendChild(el('div', {children: News()}))