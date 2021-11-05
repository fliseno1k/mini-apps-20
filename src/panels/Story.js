import React, { useEffect, useRef, useState } from 'react';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import View from '@vkontakte/vkui/dist/components/View/View';
import Text from '@vkontakte/vkui/dist/components/Typography/Text/Text';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import bridge from '@vkontakte/vk-bridge';
import Canvg, { presets } from 'canvg';
import ModalCard from '@vkontakte/vkui/dist/components/ModalCard/ModalCard';
import { ModalRootTouch } from '@vkontakte/vkui/dist/components/ModalRoot/ModalRoot';

import { ReactComponent as SuccessIcon } from '../images/success.svg';
import { ReactComponent as ErrorIcon } from '../images/error.svg';
import { ReactComponent as Push } from '../images/push.svg';
import { waveInit } from '../waveGenerator';


const modalTypes = {
    SUCCESS: 'success', 
    FAILED: 'failed',
};

const heightRange = {
    min: 100, 
    max: 150,
};

const complexityRange = {
    min: 2,
    max: 10, 
};

const layersCountRange = {
    min: 3, 
    max: 6, 
};

const defaultGradientColors = {
    first: '#d00117',
    last: '#1d2acf'
};

const defaultConfig = {
    width: 250, 
    height: 150, 
    segmentCount: (complexityRange.max + complexityRange.min) / 2,
    layersCount: (layersCountRange.max + layersCountRange.min) / 2, 
    variance: 0.75,
    strokeWidth: 0, 
    fillColor: '#fff0080',
    strokeColor: 'none',
    gradientColors: defaultGradientColors
};

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomHexColor() { 
    return '#' + Math.floor(Math.random()*16777215).toString(16);
}

function Svg({ computedPath, config, svgRef }) {
    return (
        <svg 
            ref={svgRef}
            xmlns="http://www.w3.org/2000/svg" 
            style={{isolation: "isolate"}} 
            viewBox="0 0 264 174" 
            width="264px" 
            height="174px"
        >
            <defs>
                <clipPath id="_clipPath_nXu4N5GJYa3qzbLiGBhzOUqAOHskv9kE">
                    <rect width="264" height="174"/>
                </clipPath>
            </defs>
            <g clipPath="url(#_clipPath_nXu4N5GJYa3qzbLiGBhzOUqAOHskv9kE)">
                <defs>
                    <filter id="yrZqupRq8VYkcEJTDeGRSRT4gpfBXcdb" x="-200%" y="-200%" width="400%" height="400%" filterUnits="objectBoundingBox" color-interpolation-filters="sRGB">
                        <feGaussianBlur xmlns="http://www.w3.org/2000/svg" in="SourceGraphic" stdDeviation="2.146804531419514"/>
                        <feOffset xmlns="http://www.w3.org/2000/svg" dx="0" dy="2" result="pf_100_offsetBlur"/>
                        <feFlood xmlns="http://www.w3.org/2000/svg" flood-color="#000000" flood-opacity="0.4"/>
                        <feComposite xmlns="http://www.w3.org/2000/svg" in2="pf_100_offsetBlur" operator="in" result="pf_100_dropShadow"/>
                        <feBlend xmlns="http://www.w3.org/2000/svg" in="SourceGraphic" in2="pf_100_dropShadow" mode="normal"/>
                    </filter>
                </defs>
                <g filter="url(#yrZqupRq8VYkcEJTDeGRSRT4gpfBXcdb)">
                    <path d="M 23 5 L 241 5 C 249.831 5 257 12.169 257 21 L 257 139 C 257 147.831 249.831 155 241 155 L 23 155 C 14.169 155 7 147.831 7 139 L 7 21 C 7 12.169 14.169 5 23 5 Z" style={{ stroke: "none", fill: "#FFFFFF", strokeMiterlimit: 10 }}/>
                </g>
                <svg
                    x="7px"
                    y="8px"
                    width="250px"
                    height="150px"
                    viewBox={`0 0 250 ${computedPath.svg.height}`}
                    xmlns={computedPath.svg.xmlns}
                    className="f-full transition duration-500 ease-in-out delay-150"
                >
                    <mask id="rounded-rect">
                        <g clipPath="url(#_clipPath_H6t9y9s2SR7yCCQwq4GkRR6jeFAEGT5N)"><path d="M 16 0 L 234 0 C 242.831 0 250 7.169 250 16 L 250 134 C 250 142.831 242.831 150 234 150 L 16 150 C 7.169 150 0 142.831 0 134 L 0 16 C 0 7.169 7.169 0 16 0 Z" style={{stroke: "none", fill: "#EBEBEB", strokeMiterLimit: 10 }}/></g>
                    </mask>
                    <g mask="url(#rounded-rect)">
                        {
                            computedPath.svg.path.map((path, i) => {
                                const uniqueId = '_' + Math.random().toString(36).substr(2, 9);
                                return (
                                    <g key={i}>
                                        <defs>
                                            <linearGradient id={uniqueId}>
                                                <stop 
                                                    offset="5%" 
                                                    stopColor={config.gradientColors.first} 
                                                    stopOpacity={(i + 1) / computedPath.svg.path.length}
                                                />
                                                <stop 
                                                    offset="95%" 
                                                    stopColor={config.gradientColors.last} 
                                                    stopOpacity={(i + 1) / computedPath.svg.path.length}
                                                />
                                            </linearGradient>
                                        </defs>
                                        <path
                                            d={path.d}
                                            stroke={path.strokeColor}
                                            strokeWidth={path.strokeWidth}
                                            fill={`url(#${uniqueId})`}
                                            className="transition-all duration-500 ease-in-out"
                                        />
                                    </g>
                                );
                            })
                        }
                    </g>
                    <defs>
                        <clipPath id="_clipPath_9xL13ySNzPdgHEblMQCNvEyw3QELAKZO">
                        <path d="M0 0H264V164H0z"></path>
                        </clipPath>
                    </defs>
                    <g clipPath="url(#_clipPath_9xL13ySNzPdgHEblMQCNvEyw3QELAKZO)">
                        <defs>
                        <filter
                            id="t0V2CVR620iMMWjX4RBXMKEHkeU2qDqR"
                            width="400%"
                            height="400%"
                            x="-200%"
                            y="-200%"
                            colorInterpolationFilters="sRGB"
                            filterUnits="objectBoundingBox"
                        >
                            <feGaussianBlur
                            xmlns="http://www.w3.org/2000/svg"
                            in="SourceGraphic"
                            stdDeviation="0.859"
                            ></feGaussianBlur>
                            <feOffset
                            xmlns="http://www.w3.org/2000/svg"
                            result="pf_100_offsetBlur"
                            ></feOffset>
                            <feFlood
                            xmlns="http://www.w3.org/2000/svg"
                            floodColor="#000"
                            floodOpacity="0.22"
                            ></feFlood>
                            <feComposite
                            xmlns="http://www.w3.org/2000/svg"
                            in2="pf_100_offsetBlur"
                            operator="in"
                            result="pf_100_dropShadow"
                            ></feComposite>
                            <feBlend
                            xmlns="http://www.w3.org/2000/svg"
                            in="SourceGraphic"
                            in2="pf_100_dropShadow"
                            ></feBlend>
                        </filter>
                        </defs>
                        <g filter="url(#t0V2CVR620iMMWjX4RBXMKEHkeU2qDqR)">
                        <path
                            fill="#FFF"
                            d="M172.025 15h72.95A4.027 4.027 0 01249 19.025v11.95A4.027 4.027 0 01244.975 35h-72.95A4.027 4.027 0 01168 30.975v-11.95A4.027 4.027 0 01172.025 15z"
                        ></path>
                        </g>
                        <path
                        fill="#66298E"
                        d="M220.18 28.8h-1.15l-1.15-5.52 1.43-.11.48 3.19.71-3.07 1.17-.12.61 3.15.61-3.03 1.14-.06-1.29 5.57h-1.13l-.64-3.65-.79 3.65zm5.47.13q-.36 0-.65-.225-.29-.225-.45-.61-.16-.385-.16-.865 0-1.09.745-1.535.745-.445 1.735-.505 0-.54-.07-.8t-.34-.26q-.23 0-.35.18-.12.18-.15.46l-1.37-.24q.1-.77.63-1.1.53-.33 1.24-.33.91 0 1.365.48.455.48.455 1.25v2.91q0 .47.15 1l-1.37.12-.16-.69q-.18.32-.53.54-.35.22-.72.22zm.65-1q.17 0 .285-.08.115-.08.285-.26v-1.56q-.5 0-.8.27-.3.27-.3.84 0 .38.135.585.135.205.395.205zm5.43.87h-1.29l-1.57-5.51 1.68-.12.71 3.6.81-3.42 1.27-.12-1.61 5.57zm4.05.13q-1 0-1.53-.795t-.53-2.115q0-1.34.54-2.13.54-.79 1.57-.79.98 0 1.5.79t.52 2.13q0 .08-.03.115t-.03.045h-2.67q0 .65.17 1.185t.52.535q.39 0 .58-.45.19-.45.2-.47l1.06.4q-.21.72-.67 1.135-.46.415-1.2.415zm-.66-3.56h1.35q0-.6-.16-.95t-.5-.35q-.17 0-.33.17t-.26.47q-.1.3-.1.66zm-55.66 3.43h-1.61l-1.77-7.44 1.74-.06.99 5.18 1.04-5.12 1.41-.06-1.8 7.5zm4.27.13q-1 0-1.53-.795t-.53-2.115q0-1.34.54-2.13.54-.79 1.57-.79.98 0 1.5.79t.52 2.13q0 .08-.03.115t-.03.045h-2.67q0 .65.17 1.185t.52.535q.39 0 .58-.45.19-.45.2-.47l1.06.4q-.21.72-.67 1.135-.46.415-1.2.415zm-.66-3.56h1.35q0-.6-.16-.95t-.5-.35q-.17 0-.33.17t-.26.47q-.1.3-.1.66zm6.89 3.43h-3.48v-.88l1.89-3.65h-1.81l.12-1.1h3.25v.84l-1.86 3.68h2.01l-.12 1.11zm2.31.13q-1.62 0-1.62-2.94 0-1.53.4-2.21.4-.68 1.25-.68.36 0 .69.235.33.235.48.585v-2.44l1.41-.18v7.44l-1.06.12-.35-.76q-.1.37-.37.6-.27.23-.83.23zm.52-1q.3 0 .49-.335t.19-1.135v-1.88q-.29-.45-.68-.45-.33 0-.485.235-.155.235-.2.615-.045.38-.045 1.01 0 .64.045 1.04t.205.65q.16.25.48.25zm5.08 1q-1 0-1.53-.795t-.53-2.115q0-1.34.54-2.13.54-.79 1.57-.79.98 0 1.5.79t.52 2.13q0 .08-.03.115t-.03.045h-2.67q0 .65.17 1.185t.52.535q.39 0 .58-.45.19-.45.2-.47l1.06.4q-.21.72-.67 1.135-.46.415-1.2.415zm-.66-3.56h1.35q0-.6-.16-.95t-.5-.35q-.17 0-.33.17t-.26.47q-.1.3-.1.66zm7.82 3.14l-1.24.42-1.14-2.8-.46.61v2.06h-1.4v-7.32l1.4-.18v3.72l1.43-1.85h1.52l-1.58 2.03 1.47 3.31zm2.59.42q-1.01 0-1.555-.8-.545-.8-.545-2.13 0-1.32.54-2.11.54-.79 1.56-.79 1.01 0 1.565.79.555.79.555 2.11 0 1.32-.555 2.125-.555.805-1.565.805zm0-1.04q.45 0 .58-.55.13-.55.13-1.35t-.13-1.35q-.13-.55-.58-.55-.45 0-.57.52-.12.52-.12 1.27 0 .92.12 1.465t.57.545zm4.44 1.04q-1.62 0-1.62-2.94 0-1.53.4-2.21.4-.68 1.25-.68.36 0 .69.235.33.235.48.585v-2.44l1.41-.18v7.44l-1.06.12-.35-.76q-.1.37-.37.6-.27.23-.83.23zm.52-1q.3 0 .49-.335t.19-1.135v-1.88q-.29-.45-.68-.45-.33 0-.485.235-.155.235-.2.615-.045.38-.045 1.01 0 .64.045 1.04t.205.65q.16.25.48.25z"
                        ></path>
                    </g>
                </svg>
            </g>
        </svg>
    );
}

function Story({id, activePanel, ...props}) {
    const [config, setConfig] = useState(defaultConfig);
    const [computedPath, setComputedPath] = useState(waveInit(config));
    const [activeModal, setActiveModal] = useState(null);
    const svgRef = useRef();

    const randomizeConfig = () => {
        const newConfig = {
            ...config,
            segmentCount: getRandomInt(complexityRange.min, complexityRange.max),
            layersCount: getRandomInt(layersCountRange.min, layersCountRange.max),
            gradientColors: {
                first: getRandomHexColor(),
                last: getRandomHexColor()
            },
        };

        setConfig(newConfig);
    };

    const pushStory = async () => {
        try {
            const svgString = new XMLSerializer().serializeToString(svgRef.current);
            const canvas = new OffscreenCanvas(264, 164);
            const ctx = canvas.getContext('2d');
            const v = await Canvg.fromString(ctx, svgString, presets.offscreen());
            await v.render();

            const blob = await canvas.convertToBlob();
            const blobToBase64 = async (blob) => {
                const reader = new FileReader();
                reader.readAsDataURL(blob);
                return new Promise(resolve => {
                    reader.onloadend = () => {
                    resolve(reader.result);
                };
            })};

            let base64Blob;
            await blobToBase64(blob).then(res => {
                base64Blob = res;
            });

            const storyBoxObject = {
                background_type: "image", 
                locked: true, 
                url: "https://images.unsplash.com/photo-1604147706283-d7119b5b822c?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fHdoaXRlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
                stickers: [
                    {
                        sticker_type: "renderable",
                        sticker: {
                            content_type: "image",
                            blob: base64Blob,
                            original_width: 264, 
                            original_height:174, 
                            clickable_zones: [
                                {
                                    action_type: "app",
                                    action: {
                                        app_id: 7993288
                                    },
                                    clickable_area: [
                                        { x: 0, y: 0 }, 
                                        { x: 264 , y: 0 },
                                        { x: 264, y: 174 },
                                        { x: 0, y: 174 }, 
                                    ]
                                }
                            ]
                        }
                    }
                ]
            };

            bridge.send("VKWebAppShowStoryBox", storyBoxObject)
            .then(({ data }) => {
                setActiveModal(modalTypes.SUCCESS);
            })  
            .catch((data) => {
                setActiveModal(modalTypes.FAILED)
            });
        } catch(e) {
            setActiveModal(modalTypes.FAILED);
        }
    };

    useEffect(() => {
        setComputedPath(waveInit(config));
    }, [config]);

    const modal = (
        <ModalRootTouch 
            activeModal={activeModal}
            onClose={() => setActiveModal(null)}
        >
            <ModalCard 
                id={modalTypes.SUCCESS}
                icon={<SuccessIcon className="w-12 h-12" />}
                header="История успешно опубликована"
                onClose={() => setActiveModal(null)}
            />
            <ModalCard 
                id={modalTypes.FAILED} 
                icon={<ErrorIcon className="w-12 h-12" />}
                header="Возникла ошибка при создании истории"
                onClose={() => setActiveModal(null)}
            />
        </ModalRootTouch>
    );

    return (
        <View 
            id={id} 
            modal={modal}
            activePanel={activePanel}
        >
            <Panel id={id} centered={true}>
                <PanelHeader>Добавить историю</PanelHeader>
                <Div className="h-full flex justify-center flex-col items-center">
                    <div className="relative mb-4 flex items-end" style={{width: "264px", height: "164px"}}>
                        <Svg computedPath={computedPath} config={config} svgRef={svgRef} />
                    </div>
                    <div className="relative flex justify-center">
                        <Button 
                            mode="primary" 
                            size="l"
                            onClick={randomizeConfig}
                            style={{ marginRight: "10px"}}
                        >Сгенерировать</Button> 
                        <Button 
                            mode="primary"
                            size="l"
                            before={<Push className="w-6 h-6 fill-current text-white" />}
                            onClick={pushStory}
                        ></Button>
                    </div>
                </Div>
            </Panel>
        </View>
    );
}

export default Story;