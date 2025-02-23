type DividerType = "horizontal" | "vertical";

interface DividerProps {
    type?: DividerType;
    thickness?: number;
    color?: string;
    className?: string;
}

const Divider = (
    { type = "horizontal", thickness = 1, className, color, }: DividerProps
) => {
    const style: React.CSSProperties = {
        backgroundColor: color || "black",
    };

    if (type === "horizontal") {
        style.width = "100%";
        style.height = thickness;
    } else {
        style.width = thickness;
        style.height = "100%";
    }

    return <div className={className} style={style} />;
}

export default Divider;