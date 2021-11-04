import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import View from '@vkontakte/vkui/dist/components/View/View';
import Epic from '@vkontakte/vkui/dist/components/Epic/Epic';
import Tabbar from '@vkontakte/vkui/dist/components/Tabbar/Tabbar';
import TabbarItem from '@vkontakte/vkui/dist/components/TabbarItem/TabbarItem';
import { SplitLayout } from '@vkontakte/vkui/dist/components/SplitLayout/SplitLayout';
import { SplitCol } from '@vkontakte/vkui/dist/components/SplitCol/SplitCol';

import '@vkontakte/vkui/dist/vkui.css';
import List from './panels/List';
import Scanner from './panels/Scanner';
import Counter from './panels/Counter';

import { ReactComponent as Scan } from './images/scan.svg';
import { ReactComponent as Result } from './images/result.svg';
import { ReactComponent as History } from './images/history.svg';


const routes = {
	SCANNER: 'scanner', 
	COUNTER: 'counter', 
	LIST: 'list'
};

function App(){
	const [activePanel, setActivePanel] = useState(routes.SCANNER);

	return (
		<SplitLayout>
			<SplitCol>
				<Epic activeStory={activePanel} tabbar={
					<Tabbar>
						<TabbarItem
							onClick={() => setActivePanel(routes.SCANNER)}
							selected={activePanel === routes.SCANNER}
							data-story="scanner"
							text="Сканнер"
							style={{ paddingTop: "10px", paddingBottom: "10px" }}
						>
							<Scan className="w-6 h-6 fill-current text-gray-600" />
						</TabbarItem>
						<TabbarItem
							onClick={() => setActivePanel(routes.LIST)}
							selected={activePanel === routes.LIST}
							data-story="list"
							text="Список"
							style={{ paddingTop: "10px", paddingBottom: "10px" }}
						>
							<History className="w-6 h-6 fill-current text-gray-600" />
						</TabbarItem>
						<TabbarItem
							onClick={() => setActivePanel(routes.COUNTER)}
							selected={activePanel === routes.COUNTER}
							data-story="counter"
							text="Всего"
							style={{ paddingTop: "10px", paddingBottom: "10px" }}
						>
							<Result className="w-6 h-6 fill-current text-gray-600" />
						</TabbarItem>
					</Tabbar>
				}>
					<List id={routes.LIST} activePanel={routes.LIST} />
					<Scanner id={routes.SCANNER} activePanel={routes.SCANNER} />
					<Counter id={routes.COUNTER} activePanel={routes.COUNTER} />
				</Epic>
			</SplitCol>
		</SplitLayout>
	);
}

export default App;

