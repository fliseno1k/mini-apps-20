import React, { useEffect, useState } from 'react';
import bridge from '@vkontakte/vk-bridge';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import View from '@vkontakte/vkui/dist/components/View/View';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import ModalCard from '@vkontakte/vkui/dist/components/ModalCard/ModalCard';
import { ModalRootTouch } from '@vkontakte/vkui/dist/components/ModalRoot/ModalRoot';
import Text from '@vkontakte/vkui/dist/components/Typography/Text/Text';

import QRCodeIcon from '../images/qr-code.png';
import { ReactComponent as SuccessIcon } from '../images/success.svg';
import { ReactComponent as ErrorIcon } from '../images/error.svg';

const routes = {
	SCANNER: 'scanner', 
	COUNTER: 'counter', 
	LIST: 'list'
};

const modalTypes = {
    SUCCESS: 'success', 
    FAILED: 'failed',
};

const uniqueId = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
}

const Scanner = ({id, activePanel}) => {
    const [scannedData, setScannedData] = useState('');
    const [activeModal, setActiveModal] = useState(null);

    const handleScanClick = () => {
        const onSuccess = (data) => {
            setScannedData(data);
            setActiveModal(modalTypes.SUCCESS);

            bridge.send('VKWebAppStorageSet', { key: 'qr-' + uniqueId(), value: data });
        };

        const onError = (data) => {
            setScannedData(data);
            setActiveModal(modalTypes.FAILED);
        };

        if (bridge.supports("VKWebAppOpenCodeReader")) {
            bridge.send("VKWebAppOpenCodeReader")
                .then(({ code_data }) => onSuccess(code_data))
                .catch(({ error_data }) => onError(error_data.error_reason));

        } else {
            onError("Функция сканирования QR-кода не поддерживается на вашем устройстве");
        }
    };

    const modal = (
        <ModalRootTouch 
            activeModal={activeModal}
            onClose={() => setActiveModal(null)}
        >
            <ModalCard 
                id={modalTypes.SUCCESS}
                icon={<SuccessIcon className="w-12 h-12" />}
                header="Сканирование QR-кода выполнено успешно"
                subheader="Полученные данные занесены в историю сканнирования"
                onClose={() => setActiveModal(null)}
            >
                <Text style={{marginTop: "8px"}}>{scannedData}</Text>
            </ModalCard>
            <ModalCard 
                id={modalTypes.FAILED} 
                icon={<ErrorIcon className="w-12 h-12" />}
                header="Возникла ошибка при сканировании QR-кода"
                subheader="Убедитесь, что ваше устройство поддерживает сканирование qr-кода или qr-код является валидным"
                onClose={() => setActiveModal(null)}
            >
                <Div className="bg-gray-50 shadow-inner mt-3 rounded-lg">
                    <Text className="text-gray-800 text-xl" style={{marginTop: "8px", fontSize: "16px"}}>{scannedData}</Text>
                </Div>
            </ModalCard>
        </ModalRootTouch>
    );

    return (
        <View 
            id={id} 
            modal={modal}
            activePanel={activePanel}
        >
            <Panel id={id} centered={true}>
                <PanelHeader>Сканер</PanelHeader>
                <Div className="h-full flex justify-center flex-col items-center">
                    <div className="mb-4">
                        <img
                            src={QRCodeIcon} 
                            alt="qr-code" 
                            style={{ width: '128px', height: '128px' }}
                        ></img>
                    </div>
                    <Button 
                        mode="commerce" 
                        size="l"
                        onClick={handleScanClick}
                    >Сканировать</Button> 
                </Div>
            </Panel>
        </View>
    );
}

export default Scanner;