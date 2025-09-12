import { useEffect, useRef, useState } from "react";
import { FaCheck, FaCircle, FaTimes } from "react-icons/fa";
import { useReactMediaRecorder } from "react-media-recorder";
import { useNavigate } from "react-router-dom";

const RecordingVideo = () => {
  const [mediaType, setMediaType] = useState("video");
  const [recordedVideo, setRecordedVideo] = useState(null);
  const videoRef = useRef(null);
  const navigate = useNavigate();

  const { status, startRecording, stopRecording, mediaBlobUrl } =
    useReactMediaRecorder({
      video: mediaType === "video",
      audio: true,
      onStop: (blobUrl, blob) => {
        console.log("Recording stopped", blobUrl);
        //creating form to send data to the backend
        setRecordedVideo(blob);
      },
    });

  useEffect(() => {
    let stream;
    if (mediaType === "video") {
      navigator.mediaDevices
        .getUserMedia({ video: { facingMode: "user" }, audio: true })
        .then((s) => {
          stream = s;
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch((err) => console.error("Error accessing camera:", err));
    }
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [mediaType]);

  const handleUploadVideo = async () => {
    if (!recordedVideo) {
      alert("Videos is not available to upload!!");
      return;
    }

    const formData = new FormData();
    formData.append("video", recordedVideo, "myRecordings.webm");

    try {
      const res = await fetch("http://localhost:4000/upload", {
        method: "POST",
        body: formData,
        credentials: "include",
      });
      const data = await res.json();
      console.log("Uploaded", data);
      alert(data.message);
      if (res.ok) {
        navigate("/myfeed");
      }
    } catch (err) {
      console.error("Upload failed:", err);
    }
  };

  return (
    <div className="relative h-screen w-screen bg-black overflow-hidden">
      {/* <h1 className="text-red-800 text-4xl">{status}</h1> */}

      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        className="h-full w-full"
      ></video>

      {/* footer */}
      <div className=" fixed bottom-6 left-0 right-0 flex justify-center items-center  space-x-18 ">
        <FaTimes
          onClick={() => navigate("/myfeed")}
          size={20}
          className="hover:text-red-900 cursor-pointer hover:scale-125 transition-all duration-100 ease-linear"
        />
        <button
          onClick={() => {
            if (status === "recording" && status !== "idle") {
              stopRecording();
            } else {
              startRecording();
              setTimeout(() => {
                stopRecording();
              }, 15000);
            }
          }}
          // disabled={status === "recording"}
          className={`border-2 rounded-full p-1 border-red-900 cursor-pointer
            ${
              status === "recording"
                ? "border-red-900 animate-spin border-t-red-600 border-r-transparent border-b-red-600 border-l-transparent"
                : "border-red-950"
            }
            `}
        >
          <FaCircle
            size={60}
            className={`${
              status === "recording" ? "fill-red-600" : "fill-red-900"
            }`}
          />
        </button>
        <button
          className="cursor-pointer hover:text-green-800 hover:scale-125 transition-all duration-100 ease-linear"
          onClick={handleUploadVideo}
          disabled={!recordedVideo}
        >
          <FaCheck size={20} />
        </button>
      </div>

      {mediaBlobUrl && (
        <video className="hidden" src={mediaBlobUrl} controls></video>
      )}
    </div>
  );
};

export default RecordingVideo;
