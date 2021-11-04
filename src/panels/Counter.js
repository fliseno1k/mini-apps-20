import React, { useState, useEffect } from 'react';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import View from '@vkontakte/vkui/dist/components/View/View';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
import Text from '@vkontakte/vkui/dist/components/Typography/Text/Text';
import bridge from '@vkontakte/vk-bridge';
import Spinner from '@vkontakte/vkui/dist/components/Spinner/Spinner';


function Counter({ id, activePanel }) {
    const [requestsCount, setRequestsCount] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (loading === true) {
            if (bridge.supports('VKWebAppStorageGetKeys')) {
                bridge.send('VKWebAppStorageGetKeys', { count: 20 })
                    .then(({ keys }) => setRequestsCount(keys.filter(key => key.startsWith('qr-')).length || 0))
                    .catch(_ => setRequestsCount(0))
                    .finally(() => setLoading(false));
            } else {
                setRequestsCount(0);
                setLoading(false);
            }
        }
    }, [loading]);

    return (
        <View id={id} activePanel={activePanel}>
            <Panel id={id} centered={true}>
                <PanelHeader>Всего отсканировано</PanelHeader>
                <Div className="flex justify-center flex-col items-center flex-grow">
                    {loading && <Spinner size="large" />}
                    {requestsCount > 0 && (
                        <>
                            <Text className="text-gray-800" style={{marginTop: "8px", fontSize: "16px"}}>
                                Количество сканирований:
                            </Text>
                            <Text className="text-gray-800 mt-4" style={{marginTop: "8px", fontSize: "84px", fontWeight: 600, lineHeight: "84px"}}>
                                {requestsCount}
                            </Text>
                        </>
                    )}
                    {requestsCount === 0 && (
                        <Text className="text-gray-800" style={{marginTop: "8px", fontSize: "16px"}}>
                            А вы что-то сканировали?
                        </Text>
                    )}
                </Div>
            </Panel>
        </View>
    );
}

export default Counter;