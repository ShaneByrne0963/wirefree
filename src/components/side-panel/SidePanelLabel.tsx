type SidePanelLabelProps = {
    text: string;
    color: string;
};

function SidePanelLabel(props: SidePanelLabelProps) {
    return (
        <div className={"side-panel-label " + props.color + "-text text-darken-4"}>{props.text}</div>
    )
}

export default SidePanelLabel;