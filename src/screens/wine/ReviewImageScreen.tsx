import Button from '@fair/components/common/Button';
import Input from '@fair/components/common/Input';
import Text from '@fair/components/common/Text';
import View from '@fair/components/common/View';
import { color } from '@fair/constants/Colors';
import * as React from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Image } from 'react-native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker'
import { useEffect, useRef, useState } from 'react';
import { Entypo, FontAwesome, Fontisto } from '@expo/vector-icons';
import { NavigationHelpersContext, useNavigation } from '@react-navigation/core';
import { useWineReviewContext } from '@fair/context/WineReviewContextProvider';
import { manipulateAsync, FlipType, SaveFormat } from 'expo-image-manipulator';



export default function ReviewImageScreen() {
    const unmounted = useRef(false);
    const { navigate } = useNavigation();
    const { storeWineImage, recognizeImage } = useWineReviewContext();
    const camera = useRef(null);
    const [hasPermission, setHasPermission] = useState(null);
    const [isCameraReady, setIsCameraReady] = useState(false);
    const [isPreview, setIsPreview] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [image, setImage] = useState(null);
    const [picked, setPicked] = useState(false);
    const onCameraReady = () => {
        setIsCameraReady(true)
    }
    const onSnap = async () => {
        if (camera.current) {
            const options = { quality: 1, base64: true }
            const data = await camera.current.takePictureAsync(options);
            const source = data.base64;

            if (source) {
                await camera.current.pausePreview();
                setIsPreview(true)
                storeWineImage(source)
            }
        }
    }
    const cancelPreview = async () => {
        if (camera.current) {
            await camera.current.resumePreview();
        }
        setPicked(false);
        setIsPreview(false);
    }
    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        const manipResult = await manipulateAsync(
            result.uri,
            [

            ],
            { compress: 1, base64: true, format: SaveFormat.JPEG }
        );
        if (!result.cancelled) {
            setImage(result.uri);
            setPicked(true)
            setIsPreview(true)
            storeWineImage(manipResult.base64)
        }
    };
    const commitImage = async () => {
        setIsProcessing(true)
        await recognizeImage()
        await cancelPreview()
        setIsProcessing(false)
        navigate("WineReview")
    }
    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestPermissionsAsync();
            if (!unmounted.current) {
                setHasPermission(status === 'granted');
            }
        })();
        return () => { unmounted.current = true }
    }, []);
    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }
    return (
        <View style={styles.container}>
            <View style={styles.header} safeArea>
            </View>
            {picked ? <>
                <Image source={{ uri: image }} style={styles.camera} />
            </> : <>
                <Camera style={styles.camera} type={type} ref={camera} onCameraReady={onCameraReady}>

                </Camera>
            </>}
            <View style={styles.buttonContainer}>
                {isProcessing ? <>
                    <View style={styles.centered}>
                        <ActivityIndicator size="large" color="#ffffff" />
                    </View>
                </> : <>
                    {!isPreview && (
                        <View row>
                            <View style={styles.centered}>
                                <Pressable onPress={() => navigate("Home")}>
                                    <Entypo name="cross" color={color.white} size={30} />
                                </Pressable>
                            </View>
                            <View style={styles.centered}>
                                <Pressable onPress={onSnap}>
                                    <Entypo name="camera" color={color.white} size={40} />
                                </Pressable>
                            </View>
                            <View style={styles.centered}>
                                <Pressable onPress={pickImage}>
                                    <FontAwesome name="picture-o" color={color.white} size={30} />
                                </Pressable>
                            </View>
                        </View>
                    )}
                    {isPreview && (
                        <View row>
                            <View style={styles.centered}><Pressable onPress={cancelPreview}><Entypo name="cross" color={color.white} size={30} /></Pressable></View>
                            <View style={styles.centered}>
                                <Pressable onPress={cancelPreview}>
                                    <Fontisto name="redo" color={color.white} size={40} />
                                </Pressable>
                            </View>

                            <View style={styles.centered}>
                                <Pressable onPress={() => commitImage()}>
                                    <FontAwesome name="check" color={color.white} size={30} />
                                </Pressable>
                            </View>
                        </View>
                    )}
                </>}
            </View>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        backgroundColor: color.brand,
    },
    buttonContainer: {
        backgroundColor: color.brand,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 0.7
    },
    camera: {
        flex: 1
    },
    centered: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 40,
        flex: 1
    }
});
