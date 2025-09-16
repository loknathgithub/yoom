import { useCall, VideoPreview, DeviceSettings } from '@stream-io/video-react-sdk';
import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';

const MeetingSetup = ({setIsMeetingSetup}: {setIsMeetingSetup: (value: boolean) => void}) => {
  const [isMicCamToggledOn, setIsMicCamToggledOn] = useState(true);
  const call = useCall();

  if (!call) throw new Error('useCall must be used within a StreamCall component');

  useEffect(() => {
    if (!call) return;

    if (isMicCamToggledOn) {
      call.camera.enable();
      call.microphone.enable();
    } else {
      call.camera.disable();
      call.microphone.disable();
    }
  }, [isMicCamToggledOn, call]);

  return (
    <div className="flex-center h-screen w-full flex-col gap-6">
      <h1 className="text-2xl font-semibold">Setup Meeting</h1>
      <VideoPreview />

      <div className='flex-center gap-3 h-16'>
        <label className='flex-center gap-2'>
          <input type="checkbox" 
          checked={isMicCamToggledOn}
          onChange= {(e) => {setIsMicCamToggledOn(e.target.checked)}}
        />
              Microphone & Camera permission
        </label>
      <DeviceSettings />
      </div>

      <Button className="rounded-md bg-[var(--color-isActive)] px-4 py-2 text-white hover:bg-[var(--color-isActive-hover)] cursor-pointer" onClick={() => {
        call.join()
        setIsMeetingSetup(true)
      }}>
        Join Meeting
      </Button>
    </div>
  );
};

export default MeetingSetup;
