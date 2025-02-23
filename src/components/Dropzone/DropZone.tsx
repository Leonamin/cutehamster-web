import styles from "./DropZone.module.css";

interface DropZoneProps {
    className?: string;
    rootProps?: React.HTMLProps<HTMLDivElement>;
    inputProps?: React.HTMLProps<HTMLInputElement>;
    isDragActive: boolean;
}

const DropZone = ({className, rootProps, inputProps, isDragActive }: DropZoneProps) => {
    return (
        <div {...rootProps} className={styles.dropzone +  ` ${isDragActive ? styles.active : ""} ${className}`}>
            <input {...inputProps} />
            {isDragActive ? <p>여기에 파일을 놓아 업로드하세요...</p> : <p>파일을 드래그하거나 클릭하여 업로드하세요</p>}
        </div>
    );
};

export default DropZone;