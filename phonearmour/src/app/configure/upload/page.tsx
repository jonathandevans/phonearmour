"use client";

import Dropzone, { FileRejection } from "react-dropzone";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useUploadThing } from "@/lib/uploadthing";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch, faCloudArrowUp, faImage } from "@fortawesome/free-solid-svg-icons";
import styles from "./page.module.css";

const Page = () => {
  const [isDragOver, setIsDragOver] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const router = useRouter();

  const { startUpload, isUploading } = useUploadThing("imageUploader", {
    onClientUploadComplete: ([data]) => {
      const configId = data.serverData.configId;
      startTransition(() => {
        router.push(`/configure/design?id=${configId}`)
      });
    },
    onUploadProgress(p) {
        setUploadProgress(p)
    },
  })

  const onDropRejected = (rejectedFiles: FileRejection[]) => {
    const [file] = rejectedFiles;
    setIsDragOver(false);
    // TODO: Show error message
  };
  const onDropAccepted = (acceptedFiles: File[]) => {
    startUpload(acceptedFiles, { configId: undefined });
    setIsDragOver(false);
  };

  const [isPending, startTransition] = useTransition();
  
  return (
    <div className={styles.panel}>
      <Dropzone
        onDropRejected={onDropRejected}
        onDropAccepted={onDropAccepted}
        accept={{
          "image/png": [".png", ".PNG"],
          "image/jpeg": [".jpeg", ".JPEG"],
          "image/jpg": [".jpg", ".JPG"],
        }}
        onDragEnter={() => setIsDragOver(true)}
        onDragLeave={() => setIsDragOver(false)}
      >
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()} className={styles.dropzone}>
            <input {...getInputProps()} />

            {isDragOver ? <FontAwesomeIcon icon={faCloudArrowUp} className={styles.icon} />
              : isUploading || isPending ? <FontAwesomeIcon icon={faCircleNotch} className={`${styles.spinner} ${styles.icon}`} />
              : <FontAwesomeIcon icon={faImage} className={styles.icon} />}

              <div>
                {isUploading ? (
                  <div>
                    <p className={styles.text}>Uploading...{uploadProgress}%</p>
                  </div>
                ) : isPending ? (
                  <div>
                    <p className={styles.text}>Redirecting, please wait...</p>
                  </div>
                ) : isDragOver ? (
                  <p className={styles.text}><span>Drop file</span> to upload</p>
                ) : (
                  <p className={styles.text}><span>Click to upload</span> or drag and drop</p>
                )}
              </div>

              {isPending ? null : <p className={styles.small}>PNG, JPG, JPEG</p>}
          </div>
        )}
      </Dropzone>
    </div>
  );
};
export default Page;