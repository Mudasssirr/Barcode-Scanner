import React, { useState } from 'react';
import { useZxing } from 'react-zxing';
import { Camera, CameraOff } from 'lucide-react';
import beepSoundFile from '../assets/Scan-Beep.mp3';

export const BarcodeScanner = ({ onResult }) => {
    const [isEnabled, setIsEnabled] = useState(false);
    const beepSound = new Audio(beepSoundFile);

    const { ref } = useZxing({
        onDecodeResult(result) {
            onResult(result.getText());
            console.log(onResult(result.getText()));
            
            beepSound.play();

            setIsEnabled(false);
        },
        paused: !isEnabled,
    });

    return (
        <div className="w-full max-w-md mx-auto">
            <div className="relative">
                {isEnabled && (
                    <video
                        ref={ref}
                        className="w-full h-64 object-cover rounded-lg shadow-lg"
                    />
                )}

                <button
                    onClick={() => setIsEnabled(!isEnabled)}
                    className={`mt-4 flex items-center justify-center w-full px-4 py-2 text-white rounded-lg transition-colors ${isEnabled
                        ? 'bg-red-500 hover:bg-red-600'
                        : 'bg-blue-500 hover:bg-blue-600'
                        }`}
                >
                    {isEnabled ? (
                        <>
                            <CameraOff className="w-5 h-5 mr-2" />
                            Stop Scanner
                        </>
                    ) : (
                        <>
                            <Camera className="w-5 h-5 mr-2" />
                            Start Scanner
                        </>
                    )}
                </button>
            </div>
        </div>
    );
};
