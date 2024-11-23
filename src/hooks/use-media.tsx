export const useMedia = () => {
  const getMediaResources = async () => {
    const displays = await window.ipcRenderer.invoke("getSources");
    const enumerateDevices = await window.navigator.mediaDevices.enumerateDevices();
    const audioInput = enumerateDevices.filter((device) => device.kind === "audioinput");
    console.log("Getting Sources", displays, audioInput);
    return { displays, audio:audioInput };
  };
  return { getMediaResources };
};
