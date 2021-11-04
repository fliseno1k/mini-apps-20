import React, { useEffect, useState } from 'react';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import View from '@vkontakte/vkui/dist/components/View/View';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import bridge from '@vkontakte/vk-bridge';
import Text from '@vkontakte/vkui/dist/components/Typography/Text/Text';
import Spinner from '@vkontakte/vkui/dist/components/Spinner/Spinner';
import CardGrid from '@vkontakte/vkui/dist/components/CardGrid/CardGrid';
import Card from '@vkontakte/vkui/dist/components/Card/Card';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
import ModalCard from '@vkontakte/vkui/dist/components/ModalCard/ModalCard';
import { ModalRootTouch } from '@vkontakte/vkui/dist/components/ModalRoot/ModalRoot';

import { ReactComponent as QRItemIcon } from '../images/qr-item.svg';


function QRContent({id}) {
    const [content, setContent] = useState(null);
    const [loading, setLoading] = useState(true);  
    
    useEffect(() => {
        const onGet = ({ detail: { type, data } }) => {
            if (type === 'VKWebAppStorageGetResult') {
                setLoading(false);
                setContent(data.keys[0].value);
            } else if (type === 'VKWebAppStorageGetFailed') {
                setLoading(false);
                setContent('Возникла ошибка при чтении данных qr-кода...');
            }
        };

        bridge.subscribe(onGet);

        return () => {
            bridge.unsubscribe(onGet);
        };
    });

    useEffect(() => {
        if (loading) {
            bridge.send('VKWebAppStorageGet', { keys: [id] });
        }
    }, [loading]);

    return (
        <Div className="bg-gray-50 shadow-inner mt-3 rounded-lg">
            { loading 
                ? (<Spinner size="medium" />)
                : (
                    <Text className="text-gray-800 text-xl" style={{marginTop: "8px", fontSize: "16px"}}>
                        { content }
                    </Text>
                )
            }
        </Div>
    )
}

function QRItem({id, onClick}) {
    return (
        <Card onClick={onClick}>
            <Div className="flex flex-col items-center justify-center" style={{paddingBottom: '20%'}}>
                <QRItemIcon className="w-10 h-10 opacity-60" />
                <Text className="text-gray-800" style={{marginTop: "8px", fontSize: "12px"}}>
                    {id}
                </Text>
            </Div>
        </Card>
    );
}

function List({id, activePanel, ...props}) {
    const [storageKeys, setStorageKeys] = useState(null);
    const [activeKey, setActiveKey] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (loading) {
            bridge.send('VKWebAppStorageGetKeys', { count: 20 })
                .then(({keys}) => setStorageKeys(keys.filter(key => key.startsWith('qr-')) || []))
                .catch(_ => {})
                .finally(() => setLoading(false));
        }
    }, [loading]);

    const modal = (
        <ModalRootTouch 
            activeModal={activeKey ? "review" : null}
            onClose={() => setActiveKey(null)}
        >
            <ModalCard 
                id="review"
                header="Отсканированный QR-код"
                subheader={`id: ${activeKey}`}
                onClose={() => setActiveKey(null)}
            >
                <QRContent id={activeKey} />
            </ModalCard>
        </ModalRootTouch>
    );

    return (
        <View 
            id={id} 
            activePanel={activePanel}
            modal={modal}
        >
            <Panel id={id}>
                <PanelHeader>Все QR-коды</PanelHeader>
                {
                    (!storageKeys || storageKeys.length === 0 || loading) ? (
                        <div className="w-full flex-grow flex justify-center items-center">
                            {
                                loading ? (
                                    <Spinner size="large" />
                                ) : (
                                    <Text className="text-gray-800" style={{marginTop: "8px", fontSize: "16px"}}>
                                        Допустим гав!
                                    </Text>
                                )
                            }
                        </div>
                    ) : (
                        <CardGrid size="s" style={{ marginTop: '30px' }}>
                            { storageKeys.map(key => <QRItem key={key} id={key} onClick={() => setActiveKey(key)} />)}
                        </CardGrid>
                    )
                }
            </Panel>
        </View>
    );
}

export default List;