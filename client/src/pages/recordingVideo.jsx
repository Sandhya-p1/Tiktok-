import { useEffect, useRef, useState } from "react";
import { useReactMediaRecorder } from "react-media-recorder";

const RecordingVideo = () => {
  const [mediaType, setMediaType] = useState("video");
  const videoRef = useRef(null);

  const { status, startRecording, stopRecording, mediaBlobUrl } =
    useReactMediaRecorder({
      video: mediaType === "video",
      audio: true,
      onStop: async (blobUrl, blob) => {
        console.log("Recording stopped", blobUrl);
        //creating form to send data to the backend
        const formData = new FormData();
        formData.append("video", blob, "myRecordings.webm");

        try {
          const res = await fetch("http://localhost:4000/upload", {
            method: "POST",
            body: formData,
            credentials: "include",
          });
          const data = await res.json();
          console.log("Successfully Uploaded", data);
          alert(data.message);
        } catch (err) {
          console.error("Upload failed:", err);
        }
      },
    });

  useEffect(() => {
    if (mediaType === "video") {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch((err) => console.error("Error accessing camera:", err));
    }
  }, [mediaType]);
  return (
    <div>
      <nav>
        {/* <button>Add Friend</button> */}
        <button onClick={() => setMediaType("video")}>Video</button>
        <button onClick={() => setMediaType("audio")}>Audio</button>
        {/* <button onClick={() => setMediaType("screen")}>Screen</button> */}
      </nav>
      <h1 className="text-red-800 text-4xl">{status}</h1>
      <div>
        <div>
          <video ref={videoRef} autoPlay muted playsInline width="100%"></video>
        </div>
      </div>
      <div>
        <button
          onClick={() => {
            startRecording();
            setTimeout(() => {
              stopRecording();
            }, 15000);
          }}
          disabled={status === "recording"}
        >
          Start Recording{" "}
        </button>
        <button disabled={status !== "recording"} onClick={stopRecording}>
          Stop Recording
        </button>
      </div>
      <div className="m-10">
        <h3 className="text-3xl">Recorded Media</h3>
        <a href={mediaBlobUrl} download="recording.webm">
          <button>Download Recording</button>
        </a>
      </div>
      {mediaBlobUrl && <video src={mediaBlobUrl} controls></video>}
    </div>
  );
};

export default RecordingVideo;
