// app/camera.tsx - REPLACE ENTIRE FILE
import { Colors } from '@/constants/theme';
import api from '@/services/api';
import { Ionicons } from '@expo/vector-icons';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { router } from 'expo-router';
import React, { useRef, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    StyleSheet,
    Text,
    TouchableOpacity,
    useColorScheme,
    View
} from 'react-native';

export default function CameraScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [permission, requestPermission] = useCameraPermissions();
  const [isProcessing, setIsProcessing] = useState(false);
  const cameraRef = useRef<CameraView>(null);

  if (!permission) {
    return <View style={{ flex: 1, backgroundColor: colors.background }} />;
  }

  if (!permission.granted) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={[styles.message, { color: colors.text }]}>
          We need camera access to analyze your food
        </Text>
        <TouchableOpacity
          style={[styles.permissionButton, { backgroundColor: colors.tint }]}
          onPress={requestPermission}
        >
          <Text style={styles.buttonText}>Grant Permission</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.cancelButton, { borderColor: colors.border }]}
          onPress={() => router.back()}
        >
          <Text style={[styles.cancelText, { color: colors.text }]}>Cancel</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const takePicture = async () => {
    if (!cameraRef.current || isProcessing) return;

    setIsProcessing(true);
    try {
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.8,
      });

      if (!photo?.uri) {
        Alert.alert('Error', 'Failed to capture photo');
        setIsProcessing(false);
        return;
      }

      // Convert to blob for API
      const response = await fetch(photo.uri);
      const blob = await response.blob();

      // Send to backend
      const result = await api.logFoodDirect(blob);

      if (result.error) {
        Alert.alert('Error', result.error);
      } else if (result.data) {
        Alert.alert(
          'Food Logged!',
          `${result.data.description}\n${result.data.calories} calories`,
          [{ text: 'OK', onPress: () => router.back() }]
        );
      }
    } catch (error) {
      console.error('Camera error:', error);
      Alert.alert('Error', 'Failed to process image');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Camera View - NO CHILDREN */}
      <CameraView 
        style={styles.camera} 
        facing="back" 
        ref={cameraRef}
      />
      
      {/* Overlay positioned absolutely OUTSIDE CameraView */}
      <View style={styles.overlay} pointerEvents="box-none">
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => router.back()}
            disabled={isProcessing}
          >
            <Ionicons name="close" size={32} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.title}>Point at your food</Text>
          <View style={{ width: 32 }} />
        </View>

        {/* Center Guide */}
        <View style={styles.centerGuide}>
          <View style={styles.guideBox} />
          <Text style={styles.guideText}>Center your food in the frame</Text>
        </View>

        {/* Bottom Controls */}
        <View style={styles.controls}>
          {isProcessing ? (
            <View style={styles.captureButton}>
              <ActivityIndicator size="large" color="#fff" />
            </View>
          ) : (
            <TouchableOpacity
              style={styles.captureButton}
              onPress={takePicture}
            >
              <View style={styles.captureInner} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  camera: {
    flex: 1,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  closeButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 22,
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  centerGuide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  guideBox: {
    width: 280,
    height: 280,
    borderWidth: 3,
    borderColor: '#fff',
    borderRadius: 20,
    backgroundColor: 'transparent',
  },
  guideText: {
    marginTop: 20,
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  controls: {
    paddingBottom: 50,
    alignItems: 'center',
  },
  captureButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#fff',
  },
  captureInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#fff',
  },
  // Permission screen styles
  message: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 40,
    paddingHorizontal: 40,
  },
  permissionButton: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    marginBottom: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  cancelButton: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    borderWidth: 2,
  },
  cancelText: {
    fontSize: 16,
    fontWeight: '600',
  },
});